#!/usr/bin/env node

/**
 * Figma MCP Design Token Extractor
 * Extracts typography, colors, spacing, shadows, and component styles
 */

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const WS_URL = 'ws://localhost:3055';
const CHANNEL = process.argv[2] || '54if12n8';
const OUTPUT_DIR = path.join(__dirname, '../src/figma-extracted/design-system');

// Frame IDs from Figma document
const FRAMES = {
  colors: '430:2166',
  typographyUrbanist: '430:2167',
  typographyPlayfair: '3373:16455',
  typographyRoboto: '3373:16689',
  elements: '560:15288',
  components: '432:3907',
};

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Connect to WebSocket
const connect = () => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(WS_URL);
    
    ws.on('open', () => {
      console.log('Connected to Figma MCP');
      ws.send(JSON.stringify({ type: 'join', channel: CHANNEL }));
    });
    
    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'system' && msg.message?.includes('Joined channel')) {
          console.log('Joined channel:', CHANNEL);
          resolve(ws);
        }
      } catch (e) {}
    });
    
    ws.on('error', reject);
    setTimeout(() => reject(new Error('Connection timeout')), 15000);
  });
};

// Send command and wait for response
const sendCommand = (ws, command, params = {}) => {
  return new Promise((resolve, reject) => {
    const messageId = Date.now().toString() + Math.random().toString(36).substring(2, 7);
    let resolved = false;

    const handler = (data) => {
      if (resolved) return;
      try {
        const response = JSON.parse(data.toString());
        if (response.type === 'system') return;

        // Check for response
        if (response.type === 'broadcast' && response.sender === 'User') {
          const msg = response.message;
          if (msg?.id === messageId || msg?.message?.id === messageId) {
            resolved = true;
            ws.off('message', handler);
            resolve(msg.result || msg.message?.result || msg);
            return;
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
    }, 30000);
  });
};

// Extract color from Figma fill
const extractColor = (fills) => {
  if (!fills || !fills[0]) return null;
  const fill = fills[0];
  if (fill.type === 'SOLID' && fill.color) {
    const { r, g, b } = fill.color;
    const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }
  return null;
};

// Extract text style
const extractTextStyle = (node) => {
  if (!node || node.type !== 'TEXT') return null;
  return {
    fontFamily: node.fontName?.family || 'System',
    fontWeight: node.fontName?.style || 'Regular',
    fontSize: node.fontSize || 16,
    lineHeight: node.lineHeight?.value || node.fontSize * 1.5,
    letterSpacing: node.letterSpacing?.value || 0,
    textAlign: node.textAlignHorizontal || 'LEFT',
  };
};

// Recursively get all children
const getAllChildren = async (ws, nodeId, depth = 0, maxDepth = 3) => {
  if (depth >= maxDepth) return [];
  
  try {
    const nodeInfo = await sendCommand(ws, 'get_node_info', { nodeId });
    const children = [];
    
    if (nodeInfo && nodeInfo.children) {
      for (const child of nodeInfo.children) {
        children.push({
          id: child.id,
          name: child.name,
          type: child.type,
          ...child,
        });
        
        if (child.children || ['FRAME', 'GROUP', 'COMPONENT'].includes(child.type)) {
          const grandChildren = await getAllChildren(ws, child.id, depth + 1, maxDepth);
          children.push(...grandChildren);
        }
      }
    }
    
    return children;
  } catch (err) {
    console.log(`  Error getting children of ${nodeId}: ${err.message}`);
    return [];
  }
};

// Main extraction
const extractDesignTokens = async () => {
  console.log('\n=== Figma Design Token Extractor ===\n');
  
  try {
    const ws = await connect();
    const designSystem = {
      colors: {},
      typography: {
        urbanist: {},
        playfair: {},
        roboto: {},
      },
      spacing: {},
      borderRadius: {},
      shadows: {},
      components: {
        buttons: {},
        cards: {},
        inputs: {},
      },
    };

    // Extract Colors
    console.log('\n1. Extracting Colors...');
    try {
      const colorChildren = await getAllChildren(ws, FRAMES.colors, 0, 4);
      console.log(`   Found ${colorChildren.length} color nodes`);
      
      for (const node of colorChildren) {
        if (node.fills && node.fills.length > 0) {
          const color = extractColor(node.fills);
          if (color && node.name) {
            const name = node.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
            designSystem.colors[name] = color;
          }
        }
      }
      console.log(`   Extracted ${Object.keys(designSystem.colors).length} colors`);
    } catch (err) {
      console.log(`   Error: ${err.message}`);
    }

    // Extract Typography - Urbanist
    console.log('\n2. Extracting Urbanist Typography...');
    try {
      const urbanistChildren = await getAllChildren(ws, FRAMES.typographyUrbanist, 0, 4);
      console.log(`   Found ${urbanistChildren.length} typography nodes`);
      
      for (const node of urbanistChildren) {
        if (node.type === 'TEXT' && node.fontName) {
          const style = extractTextStyle(node);
          if (style && node.name) {
            const name = node.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
            designSystem.typography.urbanist[name] = style;
          }
        }
      }
      console.log(`   Extracted ${Object.keys(designSystem.typography.urbanist).length} styles`);
    } catch (err) {
      console.log(`   Error: ${err.message}`);
    }

    // Extract Typography - Playfair
    console.log('\n3. Extracting Playfair Typography...');
    try {
      const playfairChildren = await getAllChildren(ws, FRAMES.typographyPlayfair, 0, 4);
      console.log(`   Found ${playfairChildren.length} typography nodes`);
      
      for (const node of playfairChildren) {
        if (node.type === 'TEXT' && node.fontName) {
          const style = extractTextStyle(node);
          if (style && node.name) {
            const name = node.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
            designSystem.typography.playfair[name] = style;
          }
        }
      }
      console.log(`   Extracted ${Object.keys(designSystem.typography.playfair).length} styles`);
    } catch (err) {
      console.log(`   Error: ${err.message}`);
    }

    // Extract Elements for component styles
    console.log('\n4. Extracting Component Styles...');
    try {
      const elementChildren = await getAllChildren(ws, FRAMES.elements, 0, 3);
      console.log(`   Found ${elementChildren.length} element nodes`);
      
      for (const node of elementChildren) {
        const nameLower = (node.name || '').toLowerCase();
        
        // Extract button styles
        if (nameLower.includes('button')) {
          const btnStyle = {
            name: node.name,
            width: node.width,
            height: node.height,
            cornerRadius: node.cornerRadius,
            fills: node.fills,
            backgroundColor: extractColor(node.fills),
          };
          const key = nameLower.replace(/[^a-z0-9]+/g, '_');
          designSystem.components.buttons[key] = btnStyle;
        }
        
        // Extract card styles
        if (nameLower.includes('card')) {
          const cardStyle = {
            name: node.name,
            width: node.width,
            height: node.height,
            cornerRadius: node.cornerRadius,
            fills: node.fills,
            backgroundColor: extractColor(node.fills),
            effects: node.effects,
          };
          const key = nameLower.replace(/[^a-z0-9]+/g, '_');
          designSystem.components.cards[key] = cardStyle;
        }
        
        // Extract input styles
        if (nameLower.includes('input') || nameLower.includes('field') || nameLower.includes('text')) {
          const inputStyle = {
            name: node.name,
            width: node.width,
            height: node.height,
            cornerRadius: node.cornerRadius,
            fills: node.fills,
            backgroundColor: extractColor(node.fills),
            strokes: node.strokes,
          };
          const key = nameLower.replace(/[^a-z0-9]+/g, '_');
          designSystem.components.inputs[key] = inputStyle;
        }
        
        // Extract border radius values
        if (node.cornerRadius !== undefined) {
          designSystem.borderRadius[node.name || 'unknown'] = node.cornerRadius;
        }
        
        // Extract shadow/effects
        if (node.effects && node.effects.length > 0) {
          for (const effect of node.effects) {
            if (effect.type === 'DROP_SHADOW') {
              designSystem.shadows[node.name || 'default'] = {
                offsetX: effect.offset?.x || 0,
                offsetY: effect.offset?.y || 0,
                radius: effect.radius || 0,
                color: effect.color ? extractColor([{ type: 'SOLID', color: effect.color }]) : '#000000',
                opacity: effect.color?.a || 0.1,
              };
            }
          }
        }
      }
      
      console.log(`   Buttons: ${Object.keys(designSystem.components.buttons).length}`);
      console.log(`   Cards: ${Object.keys(designSystem.components.cards).length}`);
      console.log(`   Inputs: ${Object.keys(designSystem.components.inputs).length}`);
      console.log(`   Border Radius: ${Object.keys(designSystem.borderRadius).length}`);
      console.log(`   Shadows: ${Object.keys(designSystem.shadows).length}`);
    } catch (err) {
      console.log(`   Error: ${err.message}`);
    }

    // Save design tokens
    const outputPath = path.join(OUTPUT_DIR, 'design-tokens.json');
    fs.writeFileSync(outputPath, JSON.stringify(designSystem, null, 2));
    console.log(`\n✅ Saved design tokens to: ${outputPath}`);

    // Generate TypeScript file
    const tsContent = `/**
 * Figma Design Tokens
 * Auto-extracted from Mindify Figma file
 */

export const colors = ${JSON.stringify(designSystem.colors, null, 2)} as const;

export const typography = {
  urbanist: ${JSON.stringify(designSystem.typography.urbanist, null, 2)},
  playfair: ${JSON.stringify(designSystem.typography.playfair, null, 2)},
  roboto: ${JSON.stringify(designSystem.typography.roboto, null, 2)},
} as const;

export const borderRadius = ${JSON.stringify(designSystem.borderRadius, null, 2)} as const;

export const shadows = ${JSON.stringify(designSystem.shadows, null, 2)} as const;

export const components = {
  buttons: ${JSON.stringify(designSystem.components.buttons, null, 2)},
  cards: ${JSON.stringify(designSystem.components.cards, null, 2)},
  inputs: ${JSON.stringify(designSystem.components.inputs, null, 2)},
} as const;

export default {
  colors,
  typography,
  borderRadius,
  shadows,
  components,
};
`;

    const tsPath = path.join(OUTPUT_DIR, 'design-tokens.ts');
    fs.writeFileSync(tsPath, tsContent);
    console.log(`✅ Saved TypeScript file to: ${tsPath}`);

    ws.close();
    console.log('\n=== Extraction Complete ===\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

extractDesignTokens();
