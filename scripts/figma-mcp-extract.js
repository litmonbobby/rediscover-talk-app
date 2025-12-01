#!/usr/bin/env node

/**
 * Figma MCP Component Extractor
 * Uses the Figma MCP WebSocket server to extract all components
 */

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const WS_URL = 'ws://localhost:3055';
const CHANNEL = process.argv[2] || '54if12n8';
const OUTPUT_DIR = path.join(__dirname, '../src/figma-extracted/assets/components');

// Ensure output directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Connect to WebSocket server and join channel
const connect = () => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(WS_URL);

    ws.on('open', () => {
      console.log('✅ Connected to Figma MCP WebSocket server');

      // Join the channel first
      ws.send(JSON.stringify({
        type: 'join',
        channel: CHANNEL
      }));
    });

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'system' && msg.message && msg.message.includes('Joined channel')) {
          console.log('✅ Joined channel:', CHANNEL);
          resolve(ws);
        }
      } catch (e) {
        // ignore
      }
    });

    ws.on('error', (error) => {
      reject(error);
    });

    // Timeout for connection
    setTimeout(() => {
      reject(new Error('Timeout joining channel'));
    }, 10000);
  });
};

// Send command to Figma plugin and wait for response
const sendCommand = (ws, command, params = {}) => {
  return new Promise((resolve, reject) => {
    const messageId = Date.now().toString();
    let resolved = false;

    const handler = (data) => {
      if (resolved) return;
      try {
        const response = JSON.parse(data.toString());

        // Skip system messages and our own broadcasts
        if (response.type === 'system') return;

        // Check for broadcast messages from Figma plugin
        // Format: { type: "broadcast", sender: "User", message: {...}, channel: "..." }
        if (response.type === 'broadcast' && response.sender === 'User' && response.message) {
          const msg = response.message;
          // Response from Figma has nested message with result
          if (msg.id === messageId && msg.message && msg.message.result !== undefined) {
            resolved = true;
            ws.off('message', handler);
            resolve(msg.message.result);
            return;
          }
          if (msg.id === messageId && msg.result !== undefined) {
            resolved = true;
            ws.off('message', handler);
            resolve(msg.result);
            return;
          }
        }

        // Check for direct response with nested message format
        // Format: { id: "...", type: "message", channel: "...", message: { id: "...", result: {...} }}
        if (response.type === 'message' && response.message) {
          const msg = response.message;
          if (msg.id === messageId && msg.result !== undefined) {
            resolved = true;
            ws.off('message', handler);
            resolve(msg.result);
            return;
          }
        }

        // Direct response format
        if (response.id === messageId && response.result !== undefined) {
          resolved = true;
          ws.off('message', handler);
          resolve(response.result);
          return;
        }
      } catch (e) {
        // Not JSON, ignore
      }
    };

    ws.on('message', handler);

    // Send command as a message to be broadcast to Figma plugin
    const message = JSON.stringify({
      type: 'message',
      channel: CHANNEL,
      message: {
        id: messageId,
        command,
        params
      }
    });

    ws.send(message);

    // Timeout after 60 seconds
    setTimeout(() => {
      if (!resolved) {
        ws.off('message', handler);
        reject(new Error(`Timeout waiting for response to ${command}`));
      }
    }, 60000);
  });
};

// Save base64 image to file
const saveImage = (base64Data, filePath) => {
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filePath, buffer);
  console.log(`  ✅ Saved: ${path.basename(filePath)}`);
};

// Main extraction function
const extractComponents = async () => {
  console.log('🎨 Figma MCP Component Extractor\n');
  console.log(`📡 Channel: ${CHANNEL}`);
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);

  try {
    const ws = await connect();

    // Get document info
    console.log('📄 Getting document info...');
    const docInfo = await sendCommand(ws, 'get_document_info');
    console.log(`Document: ${docInfo.name || 'Unknown'}\n`);

    // Get all local components
    console.log('🧩 Getting local components...');
    const components = await sendCommand(ws, 'get_local_components');

    if (!components || !Array.isArray(components)) {
      console.log('No components found or invalid response');
      console.log('Response:', JSON.stringify(components, null, 2));
      ws.close();
      return;
    }

    console.log(`Found ${components.length} components\n`);

    // Categorize components
    const categories = {};
    components.forEach(comp => {
      const name = comp.name || 'unknown';
      let category = 'other';

      if (name.toLowerCase().includes('mood')) category = 'mood-indicators';
      else if (name.toLowerCase().includes('icon')) category = 'icons';
      else if (name.toLowerCase().includes('button')) category = 'buttons';
      else if (name.toLowerCase().includes('card')) category = 'cards';
      else if (name.toLowerCase().includes('illustration')) category = 'illustrations';
      else if (name.toLowerCase().includes('badge')) category = 'badges';
      else if (name.toLowerCase().includes('menu')) category = 'menus';
      else if (name.toLowerCase().includes('nav')) category = 'navigation';

      if (!categories[category]) categories[category] = [];
      categories[category].push(comp);
    });

    console.log('📊 Components by category:');
    Object.entries(categories).forEach(([cat, comps]) => {
      console.log(`   ${cat}: ${comps.length}`);
    });
    console.log('');

    // Export each component as PNG
    let exported = 0;
    for (const [category, comps] of Object.entries(categories)) {
      const categoryDir = path.join(OUTPUT_DIR, category);
      ensureDir(categoryDir);

      console.log(`\n📥 Exporting ${category} (${comps.length} components)...`);

      for (const comp of comps) {
        try {
          const result = await sendCommand(ws, 'export_node_as_image', {
            nodeId: comp.id,
            format: 'PNG',
            scale: 2  // 2x for retina
          });

          if (result && result.imageData) {
            const safeName = (comp.name || comp.id)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');

            const filePath = path.join(categoryDir, `${safeName}.png`);
            saveImage(result.imageData, filePath);
            exported++;
          }

          // Small delay to avoid overwhelming Figma
          await new Promise(r => setTimeout(r, 100));

        } catch (err) {
          console.log(`  ❌ Failed to export ${comp.name}: ${err.message}`);
        }
      }
    }

    console.log(`\n✅ Export Complete!`);
    console.log(`   Total Exported: ${exported} images`);
    console.log(`   Output Directory: ${OUTPUT_DIR}`);

    ws.close();

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Run extraction
extractComponents();
