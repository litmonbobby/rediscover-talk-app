#!/usr/bin/env node

/**
 * Figma MCP Frame-based Component Extractor
 * Extracts components by traversing frame hierarchy instead of using get_local_components
 */

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const WS_URL = 'ws://localhost:3055';
const CHANNEL = process.argv[2] || '54if12n8';
const OUTPUT_DIR = path.join(__dirname, '../src/figma-extracted/assets/components');

// Known frame IDs from document structure
const FRAME_IDS = {
  'elements': '560:15288',
  'components': '432:3907',
  'iconography': '430:2959',
  'my-profile': '1140:18595',
  'colors': '430:2166',
  'typography-urbanist': '430:2167',
  'typography-playfair': '3373:16455',
  'typography-roboto': '3373:16689'
};

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
      console.log('Connected to Figma MCP WebSocket server');
      ws.send(JSON.stringify({ type: 'join', channel: CHANNEL }));
    });

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'system' && msg.message && msg.message.includes('Joined channel')) {
          console.log('Joined channel:', CHANNEL);
          resolve(ws);
        }
      } catch (e) {}
    });

    ws.on('error', reject);
    setTimeout(() => reject(new Error('Timeout joining channel')), 15000);
  });
};

// Send command to Figma plugin and wait for response
const sendCommand = (ws, command, params = {}) => {
  return new Promise((resolve, reject) => {
    const messageId = Date.now().toString() + Math.random().toString(36).substring(2, 7);
    let resolved = false;
    let timeoutId;

    const handler = (data) => {
      if (resolved) return;
      try {
        const response = JSON.parse(data.toString());
        if (response.type === 'system') return;

        // Match response by ID in various formats
        const checkId = (obj) => {
          if (!obj) return false;
          if (obj.id === messageId) return obj.result !== undefined ? obj.result : obj;
          if (obj.message && obj.message.id === messageId) {
            return obj.message.result !== undefined ? obj.message.result : obj.message;
          }
          return false;
        };

        // Check broadcast format
        if (response.type === 'broadcast' && response.sender === 'User') {
          const result = checkId(response.message);
          if (result !== false) {
            resolved = true;
            clearTimeout(timeoutId);
            ws.off('message', handler);
            resolve(result);
            return;
          }
        }

        // Check direct message format
        if (response.type === 'message') {
          const result = checkId(response);
          if (result !== false) {
            resolved = true;
            clearTimeout(timeoutId);
            ws.off('message', handler);
            resolve(result);
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

    timeoutId = setTimeout(() => {
      if (!resolved) {
        ws.off('message', handler);
        reject(new Error(`Timeout: ${command}`));
      }
    }, 30000);
  });
};

// Save base64 image to file
const saveImage = (base64Data, filePath) => {
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filePath, buffer);
  console.log(`  Saved: ${path.basename(filePath)}`);
};

// Safe name for files
const safeName = (name) => {
  return (name || 'unknown')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Get children of a frame
const getFrameChildren = async (ws, nodeId, maxDepth = 2, currentDepth = 0) => {
  if (currentDepth >= maxDepth) return [];

  try {
    const nodeInfo = await sendCommand(ws, 'get_node_info', { nodeId });
    const children = [];

    if (nodeInfo && nodeInfo.children) {
      for (const child of nodeInfo.children) {
        children.push({
          id: child.id,
          name: child.name,
          type: child.type
        });

        // Recurse into FRAME and GROUP types
        if ((child.type === 'FRAME' || child.type === 'GROUP') && currentDepth < maxDepth - 1) {
          const grandChildren = await getFrameChildren(ws, child.id, maxDepth, currentDepth + 1);
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

// Export a single node
const exportNode = async (ws, nodeId, category, name) => {
  try {
    const result = await sendCommand(ws, 'export_node_as_image', {
      nodeId,
      format: 'PNG',
      scale: 2
    });

    if (result && result.imageData) {
      const categoryDir = path.join(OUTPUT_DIR, category);
      ensureDir(categoryDir);
      const filePath = path.join(categoryDir, `${safeName(name)}.png`);
      saveImage(result.imageData, filePath);
      return true;
    }
    return false;
  } catch (err) {
    console.log(`  Failed: ${name} - ${err.message}`);
    return false;
  }
};

// Main extraction function
const extractComponents = async () => {
  console.log('\n=== Figma MCP Frame Extractor ===\n');
  console.log(`Channel: ${CHANNEL}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  try {
    const ws = await connect();
    let exported = 0;
    let failed = 0;

    // Priority frames to extract
    const targetFrames = [
      { id: FRAME_IDS.iconography, name: 'icons', depth: 3 },
      { id: FRAME_IDS.elements, name: 'elements', depth: 3 },
      { id: FRAME_IDS.components, name: 'components', depth: 3 },
    ];

    for (const frame of targetFrames) {
      console.log(`\nExtracting: ${frame.name} (${frame.id})...`);

      const children = await getFrameChildren(ws, frame.id, frame.depth);
      console.log(`  Found ${children.length} items`);

      // Export each child
      for (const child of children) {
        // Skip frames/groups, only export leaf nodes (COMPONENT, INSTANCE, VECTOR, TEXT, etc.)
        if (child.type !== 'FRAME' && child.type !== 'GROUP' && child.type !== 'SECTION') {
          const success = await exportNode(ws, child.id, frame.name, child.name);
          if (success) exported++;
          else failed++;

          // Small delay to avoid overwhelming Figma
          await new Promise(r => setTimeout(r, 200));
        }
      }
    }

    console.log(`\n=== Export Complete ===`);
    console.log(`Exported: ${exported}`);
    console.log(`Failed: ${failed}`);
    console.log(`Output: ${OUTPUT_DIR}`);

    ws.close();

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

// Run
extractComponents();
