#!/usr/bin/env node

/**
 * Download Figma Component Images
 * Downloads PNG exports of all components for reference and assets
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_ID = 'JOHUFqUJurNsq8Qx05JFNF';

// Validate token
if (!FIGMA_TOKEN) {
  console.error('❌ Error: FIGMA_TOKEN environment variable is required');
  console.error('Set it with: export FIGMA_TOKEN=your_token_here');
  process.exit(1);
}
const SUMMARY_FILE = path.join(__dirname, '../src/figma-extracted/extraction-summary.json');
const OUTPUT_DIR = path.join(__dirname, '../src/figma-extracted/assets');

// Load extraction summary
const loadSummary = () => {
  const data = fs.readFileSync(SUMMARY_FILE, 'utf8');
  return JSON.parse(data);
};

// Get image URLs from Figma API
const getImageUrls = async (nodeIds) => {
  return new Promise((resolve, reject) => {
    const ids = nodeIds.join(',');
    const url = `https://api.figma.com/v1/images/${FILE_ID}?ids=${ids}&format=png&scale=2`;

    https.get(url, {
      headers: { 'X-Figma-Token': FIGMA_TOKEN }
    }, (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

// Download image from URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', reject);
    }).on('error', reject);
  });
};

// Sanitize filename
const sanitizeFilename = (name) => {
  return name
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
};

// Download components in batches
const downloadComponents = async (components, category) => {
  console.log(`\n📥 Downloading ${category} (${components.length} components)...`);

  // Create category directory
  const categoryDir = path.join(OUTPUT_DIR, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  // Process in batches of 10 to avoid API limits
  const batchSize = 10;
  let downloaded = 0;

  for (let i = 0; i < components.length; i += batchSize) {
    const batch = components.slice(i, i + batchSize);
    const nodeIds = batch.map(c => c.id);

    try {
      // Get image URLs
      const result = await getImageUrls(nodeIds);

      if (result.err) {
        console.error(`  ❌ API Error: ${result.err}`);
        continue;
      }

      // Download each image
      for (const component of batch) {
        const imageUrl = result.images[component.id];

        if (!imageUrl) {
          console.log(`  ⚠️  No image for: ${component.name}`);
          continue;
        }

        const filename = `${sanitizeFilename(component.name)}.png`;
        const filepath = path.join(categoryDir, filename);

        await downloadImage(imageUrl, filepath);
        downloaded++;

        if (downloaded % 10 === 0) {
          console.log(`  ├─ Downloaded: ${downloaded}/${components.length}`);
        }
      }

      // Rate limiting - wait 1 second between batches
      if (i + batchSize < components.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } catch (error) {
      console.error(`  ❌ Batch error:`, error.message);
    }
  }

  console.log(`  ✅ ${category}: ${downloaded}/${components.length} images downloaded`);
  return downloaded;
};

// Main download process
const main = async () => {
  console.log('📸 Mindify Image Download Starting...\n');

  // Load summary
  const summary = loadSummary();

  console.log(`📦 Content to download:`);
  console.log(`  ├─ Design System Components: ${summary.components.design.length}`);
  console.log(`  ├─ Light Theme Components: ${summary.components.light.length}`);
  console.log(`  ├─ Dark Theme Components: ${summary.components.dark.length}`);
  console.log(`  ├─ Light Theme Screens: ${summary.screens?.light?.length || 0}`);
  console.log(`  └─ Dark Theme Screens: ${summary.screens?.dark?.length || 0}`);

  let totalDownloaded = 0;

  // Download design system components (limit to first 100 for now)
  if (summary.components.design.length > 0) {
    const designComponents = summary.components.design.slice(0, 100);
    const count = await downloadComponents(designComponents, 'design-system');
    totalDownloaded += count;
  }

  // Download light theme components
  if (summary.components.light.length > 0) {
    const count = await downloadComponents(summary.components.light, 'light-theme');
    totalDownloaded += count;
  }

  // Download dark theme components
  if (summary.components.dark.length > 0) {
    const count = await downloadComponents(summary.components.dark, 'dark-theme');
    totalDownloaded += count;
  }

  // Download light theme screens
  if (summary.screens?.light?.length > 0) {
    const count = await downloadComponents(summary.screens.light, 'screens/light-theme');
    totalDownloaded += count;
  }

  // Download dark theme screens
  if (summary.screens?.dark?.length > 0) {
    const count = await downloadComponents(summary.screens.dark, 'screens/dark-theme');
    totalDownloaded += count;
  }

  console.log(`\n✅ Download Complete!`);
  console.log(`  ├─ Total Downloaded: ${totalDownloaded} images`);
  console.log(`  └─ Output: ${OUTPUT_DIR}\n`);

  console.log('📦 Next Step:');
  console.log('  Generate React Native components: node scripts/generate-components.js\n');
};

// Run download
main().catch(console.error);
