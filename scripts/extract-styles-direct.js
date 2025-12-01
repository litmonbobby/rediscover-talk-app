#!/usr/bin/env node

/**
 * Direct Figma Style Extractor
 * Uses get_local_styles to extract text and color styles
 */

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const WS_URL = 'ws://localhost:3055';
const CHANNEL = process.argv[2] || '54if12n8';
const OUTPUT_DIR = path.join(__dirname, '../src/figma-extracted/design-system');

// Connect to WebSocket
const connect = () => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(WS_URL);
    ws.on('open', () => {
      ws.send(JSON.stringify({ type: 'join', channel: CHANNEL }));
    });
    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'system' && msg.message?.includes('Joined channel')) {
          resolve(ws);
        }
      } catch (e) {}
    });
    ws.on('error', reject);
    setTimeout(() => reject(new Error('Timeout')), 15000);
  });
};

// Send command
const sendCommand = (ws, command, params = {}) => {
  return new Promise((resolve, reject) => {
    const messageId = Date.now().toString() + Math.random().toString(36).substring(2, 7);
    let resolved = false;

    const handler = (data) => {
      if (resolved) return;
      try {
        const response = JSON.parse(data.toString());
        if (response.type === 'broadcast' && response.sender === 'User') {
          const msg = response.message;
          if (msg?.id === messageId || msg?.message?.id === messageId) {
            resolved = true;
            ws.off('message', handler);
            resolve(msg.result || msg.message?.result || msg);
          }
        }
      } catch (e) {}
    };

    ws.on('message', handler);
    ws.send(JSON.stringify({
      type: 'message',
      channel: CHANNEL,
      message: { id: messageId, command, params }
    }));

    setTimeout(() => {
      if (!resolved) {
        ws.off('message', handler);
        reject(new Error(`Timeout: ${command}`));
      }
    }, 60000);
  });
};

const main = async () => {
  console.log('\n=== Figma Style Extractor ===\n');
  
  try {
    const ws = await connect();
    console.log('Connected to Figma MCP\n');

    // Get local styles
    console.log('1. Getting local text styles...');
    let textStyles = [];
    try {
      textStyles = await sendCommand(ws, 'get_local_styles', { type: 'TEXT' });
      console.log(`   Found ${textStyles?.length || 0} text styles`);
      if (textStyles?.length > 0) {
        console.log('   Sample:', JSON.stringify(textStyles[0], null, 2).substring(0, 200));
      }
    } catch (err) {
      console.log(`   Error: ${err.message}`);
    }

    console.log('\n2. Getting local color styles...');
    let colorStyles = [];
    try {
      colorStyles = await sendCommand(ws, 'get_local_styles', { type: 'PAINT' });
      console.log(`   Found ${colorStyles?.length || 0} color styles`);
      if (colorStyles?.length > 0) {
        console.log('   Sample:', JSON.stringify(colorStyles[0], null, 2).substring(0, 200));
      }
    } catch (err) {
      console.log(`   Error: ${err.message}`);
    }

    console.log('\n3. Getting local effect styles...');
    let effectStyles = [];
    try {
      effectStyles = await sendCommand(ws, 'get_local_styles', { type: 'EFFECT' });
      console.log(`   Found ${effectStyles?.length || 0} effect styles`);
    } catch (err) {
      console.log(`   Error: ${err.message}`);
    }

    // Get selection info for debugging
    console.log('\n4. Getting current selection...');
    try {
      const selection = await sendCommand(ws, 'get_selection');
      console.log(`   Selection: ${JSON.stringify(selection, null, 2).substring(0, 500)}`);
    } catch (err) {
      console.log(`   Error: ${err.message}`);
    }

    // Build comprehensive design system
    const designSystem = {
      textStyles: textStyles || [],
      colorStyles: colorStyles || [],
      effectStyles: effectStyles || [],
      extractedAt: new Date().toISOString(),
    };

    // Save raw output
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'figma-styles-raw.json'),
      JSON.stringify(designSystem, null, 2)
    );
    console.log('\n✅ Saved raw styles to figma-styles-raw.json');

    // Process colors into usable format
    const colors = {};
    if (colorStyles && colorStyles.length > 0) {
      colorStyles.forEach(style => {
        if (style.name && style.paints && style.paints[0]) {
          const paint = style.paints[0];
          if (paint.type === 'SOLID' && paint.color) {
            const { r, g, b } = paint.color;
            const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
            const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
            const key = style.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
            colors[key] = hex;
          }
        }
      });
    }

    // Process typography
    const typography = {};
    if (textStyles && textStyles.length > 0) {
      textStyles.forEach(style => {
        if (style.name) {
          const key = style.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
          typography[key] = {
            fontFamily: style.fontName?.family || 'System',
            fontWeight: style.fontName?.style || 'Regular',
            fontSize: style.fontSize || 16,
            lineHeight: style.lineHeight?.value || (style.fontSize * 1.5),
            letterSpacing: style.letterSpacing?.value || 0,
          };
        }
      });
    }

    // Process effects (shadows)
    const shadows = {};
    if (effectStyles && effectStyles.length > 0) {
      effectStyles.forEach(style => {
        if (style.name && style.effects) {
          style.effects.forEach(effect => {
            if (effect.type === 'DROP_SHADOW') {
              const key = style.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
              shadows[key] = {
                offsetX: effect.offset?.x || 0,
                offsetY: effect.offset?.y || 0,
                blurRadius: effect.radius || 0,
                spreadRadius: effect.spread || 0,
                color: effect.color ? `rgba(${Math.round(effect.color.r * 255)}, ${Math.round(effect.color.g * 255)}, ${Math.round(effect.color.b * 255)}, ${effect.color.a || 0.1})` : 'rgba(0,0,0,0.1)',
              };
            }
          });
        }
      });
    }

    // Save processed design system
    const processedSystem = { colors, typography, shadows };
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'design-system-processed.json'),
      JSON.stringify(processedSystem, null, 2)
    );

    // Generate TypeScript
    const tsContent = `/**
 * Figma Design System
 * Auto-extracted from Mindify Figma file
 * Generated: ${new Date().toISOString()}
 */

export const figmaColors = ${JSON.stringify(colors, null, 2)} as const;

export const figmaTypography = ${JSON.stringify(typography, null, 2)} as const;

export const figmaShadows = ${JSON.stringify(shadows, null, 2)} as const;

export default {
  colors: figmaColors,
  typography: figmaTypography,
  shadows: figmaShadows,
};
`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'figma-design-system.ts'), tsContent);
    console.log('✅ Saved processed TypeScript to figma-design-system.ts');

    console.log('\n=== Summary ===');
    console.log(`Colors: ${Object.keys(colors).length}`);
    console.log(`Typography: ${Object.keys(typography).length}`);
    console.log(`Shadows: ${Object.keys(shadows).length}`);

    ws.close();

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

main();
