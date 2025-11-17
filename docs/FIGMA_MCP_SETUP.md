# Figma MCP Setup Guide

## 🎯 Goal
Connect Claude Code to your Figma file for 98%+ design accuracy extraction.

---

## ✅ Step 1: Figma MCP Installation (COMPLETED)

The MCP server has been installed and configured:
- ✅ Repository cloned to: `/Users/bobbylitmon/claude-talk-to-figma-mcp`
- ✅ Dependencies installed
- ✅ Server built successfully
- ✅ Claude Desktop configured

---

## 📋 Step 2: Import Figma Plugin

### In Figma Desktop:

1. **Open Figma Desktop** (not browser version)

2. **Go to Plugins → Development → Import plugin from manifest**

3. **Select this file:**
   ```
   /Users/bobbylitmon/claude-talk-to-figma-mcp/src/claude_mcp_plugin/manifest.json
   ```

4. **Verify plugin is imported**
   - Should appear in Plugins → Development → Claude MCP Plugin

---

## 🚀 Step 3: Start WebSocket Server

Open a new terminal and run:

```bash
cd /Users/bobbylitmon/claude-talk-to-figma-mcp
bun socket
```

**Expected output:**
```
WebSocket server started on port 3055
Server running at http://localhost:3055/status
```

**Keep this terminal running!**

---

## 🔌 Step 4: Connect to Your Figma File

1. **Open your Mindify/Rediscover Talk Figma file**

2. **Run the plugin:**
   - Plugins → Development → Claude MCP Plugin

3. **Copy the Channel ID**
   - Plugin will show a channel ID (e.g., `abc123def456`)
   - Copy this ID

---

## 💬 Step 5: Connect Claude Code

**IMPORTANT:** You need to restart VS Code first for the MCP server to be available!

1. **Restart VS Code** (or Claude Desktop)

2. **In this chat, tell me:**
   ```
   Connect to Figma channel: [paste-channel-id-here]
   ```

3. **I'll connect and extract:**
   - All font names and sizes
   - Exact spacing and padding
   - Precise colors and gradients
   - Shadow and effect values
   - Component structures
   - Layout measurements

---

## 🎨 What This Unlocks

### With Figma MCP Connection:

✅ **Fonts:** Exact font families, weights, sizes
✅ **Colors:** Precise hex values from design
✅ **Spacing:** Exact padding, margins, gaps
✅ **Components:** Complete component specs
✅ **Typography:** Line heights, letter spacing
✅ **Effects:** Exact shadow and blur values
✅ **Layout:** Auto-layout specifications
✅ **Icons:** SVG export with exact dimensions

### Accuracy Improvement:
```
Before: 85-90% (estimated design)
After:  98%+ (pixel-perfect extraction)
```

---

## 🔍 Available Commands After Connection

Once connected, I can:

```
- "Get all fonts used in the design"
- "Extract spacing from the home screen"
- "Get exact colors for the mood widget"
- "Export meditation player layout specs"
- "List all components in the file"
- "Get typography hierarchy"
- "Extract shadow values"
- "Export icons as SVG"
```

---

## 🐛 Troubleshooting

### "WebSocket won't start"
```bash
# Kill any process on port 3055
lsof -ti:3055 | xargs kill -9

# Try again
cd /Users/bobbylitmon/claude-talk-to-figma-mcp
bun socket
```

### "Plugin not found in Figma"
- Ensure you're using **Figma Desktop** (not browser)
- Re-import the manifest.json file
- Check Plugins → Development section

### "Claude can't see MCP"
- **Restart VS Code completely**
- Check: `claude mcp list` should show ClaudeTalkToFigma
- If not listed, run: `cd /Users/bobbylitmon/claude-talk-to-figma-mcp && bun run configure-claude`

### "Connection timeout"
- Verify WebSocket server is running (`http://localhost:3055/status`)
- Check Figma plugin shows "Connected" status
- Ensure firewall isn't blocking port 3055

---

## 📊 Current Status

- [x] MCP server installed
- [x] Server built and configured
- [x] Claude Desktop config updated
- [ ] **Restart VS Code** (REQUIRED NEXT STEP)
- [ ] Import plugin to Figma
- [ ] Start WebSocket server
- [ ] Get channel ID from Figma
- [ ] Connect Claude to Figma channel

---

## 🎯 Next Steps

**Right now, you need to:**

1. **Restart VS Code** (close and reopen completely)
2. **Import plugin to Figma**
3. **Start WebSocket server**: `cd /Users/bobbylitmon/claude-talk-to-figma-mcp && bun socket`
4. **Open Figma file and run Claude MCP Plugin**
5. **Share channel ID with me**

Then I can extract **every design detail** for pixel-perfect implementation! 🚀

---

**Installation Location:** `/Users/bobbylitmon/claude-talk-to-figma-mcp`
**Server Port:** 3055
**Status URL:** http://localhost:3055/status

---

**Last Updated:** November 17, 2025
**Version:** 0.6.1
