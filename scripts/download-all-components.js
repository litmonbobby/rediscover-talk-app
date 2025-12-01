#!/usr/bin/env node

/**
 * Download ALL Figma Design System Components
 * This script downloads EVERY component, not just the first 100
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_ID = 'JOHUFqUJurNsq8Qx05JFNF';

if (!FIGMA_TOKEN) {
  console.error('❌ Error: FIGMA_TOKEN environment variable is required');
  console.error('Set it with: export FIGMA_TOKEN=your_token_here');
  process.exit(1);
}

const SUMMARY_FILE = path.join(__dirname, '../src/figma-extracted/extraction-summary.json');
const OUTPUT_DIR = path.join(__dirname, '../src/figma-extracted/assets/components');

// Priority components to download first
const PRIORITY_CATEGORIES = [
  'Mood',           // Mood Indicator icons
  'Illustrations',  // Custom illustrations
  'Icons',          // All icon sets
  'Button',         // Button components
  'Badge',          // Achievement badges
  'Sound',          // Sound/audio icons
  'Home',           // Home screen elements
  'Card',           // Card components
  'Menu',           // Menu components
  'Breathing',      // Breathing animation
  'Background',     // Background images
];

const loadSummary = () => {
  const data = fs.readFileSync(SUMMARY_FILE, 'utf8');
  return JSON.parse(data);
};

const getImageUrls = async (nodeIds) => {
  return new Promise((resolve, reject) => {
    const ids = nodeIds.join(',');
    const url = `https://api.figma.com/v1/images/${FILE_ID}?ids=${ids}&format=png&scale=3`;

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

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }

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

const sanitizeFilename = (name) => {
  return name
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
};

const categorizeComponent = (name) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('mood')) return 'mood-indicators';
  if (lowerName.includes('illustration')) return 'illustrations';
  if (lowerName.includes('icon')) return 'icons';
  if (lowerName.includes('button')) return 'buttons';
  if (lowerName.includes('badge')) return 'badges';
  if (lowerName.includes('sound')) return 'sounds';
  if (lowerName.includes('breathing')) return 'breathing';
  if (lowerName.includes('background')) return 'backgrounds';
  if (lowerName.includes('card')) return 'cards';
  if (lowerName.includes('menu')) return 'menus';
  if (lowerName.includes('home')) return 'home';
  if (lowerName.includes('explore')) return 'explore';
  if (lowerName.includes('insight')) return 'insights';
  if (lowerName.includes('sleep')) return 'sleep';
  if (lowerName.includes('subscription')) return 'subscriptions';
  if (lowerName.includes('payment')) return 'payments';
  if (lowerName.includes('notification')) return 'notifications';
  if (lowerName.includes('calendar')) return 'calendar';
  if (lowerName.includes('chart')) return 'charts';

  return 'other';
};

const downloadComponents = async (components, outputDir) => {
  // Group by category
  const categorized = {};
  components.forEach(c => {
    const category = categorizeComponent(c.name);
    if (!categorized[category]) categorized[category] = [];
    categorized[category].push(c);
  });

  console.log('\n📊 Components by category:');
  Object.entries(categorized).forEach(([cat, items]) => {
    console.log(`   ${cat}: ${items.length}`);
  });

  let totalDownloaded = 0;
  const batchSize = 10;

  // Download priority categories first
  const sortedCategories = Object.keys(categorized).sort((a, b) => {
    const aIndex = PRIORITY_CATEGORIES.findIndex(p => a.includes(p.toLowerCase()));
    const bIndex = PRIORITY_CATEGORIES.findIndex(p => b.includes(p.toLowerCase()));
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  for (const category of sortedCategories) {
    const items = categorized[category];
    const categoryDir = path.join(outputDir, category);

    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    console.log(`\n📥 Downloading ${category} (${items.length} components)...`);
    let categoryDownloaded = 0;

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const nodeIds = batch.map(c => c.id);

      try {
        const result = await getImageUrls(nodeIds);

        if (result.err) {
          console.error(`   ❌ API Error: ${result.err}`);
          continue;
        }

        for (const component of batch) {
          const imageUrl = result.images[component.id];

          if (!imageUrl) {
            continue;
          }

          const filename = `${sanitizeFilename(component.name)}.png`;
          const filepath = path.join(categoryDir, filename);

          try {
            await downloadImage(imageUrl, filepath);
            categoryDownloaded++;
            totalDownloaded++;
          } catch (e) {
            console.error(`   ❌ Failed: ${component.name}`);
          }
        }

        // Progress update every 20 items
        if (categoryDownloaded % 20 === 0 && categoryDownloaded > 0) {
          console.log(`   ├─ Progress: ${categoryDownloaded}/${items.length}`);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`   ❌ Batch error:`, error.message);
      }
    }

    console.log(`   ✅ ${category}: ${categoryDownloaded}/${items.length} downloaded`);
  }

  return totalDownloaded;
};

const main = async () => {
  console.log('🎨 Mindify Complete Component Download\n');
  console.log('This will download ALL design system components.\n');

  const summary = loadSummary();
  const allComponents = summary.components.design || [];

  console.log(`📦 Total components in design system: ${allComponents.length}`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const downloaded = await downloadComponents(allComponents, OUTPUT_DIR);

  console.log(`\n✅ Download Complete!`);
  console.log(`   Total Downloaded: ${downloaded} images`);
  console.log(`   Output Directory: ${OUTPUT_DIR}\n`);

  // Create index file
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  const categories = fs.readdirSync(OUTPUT_DIR)
    .filter(f => fs.statSync(path.join(OUTPUT_DIR, f)).isDirectory())
    .map(cat => ({
      name: cat,
      count: fs.readdirSync(path.join(OUTPUT_DIR, cat)).length
    }));

  fs.writeFileSync(indexPath, JSON.stringify({
    downloadedAt: new Date().toISOString(),
    total: downloaded,
    categories
  }, null, 2));

  console.log('📋 Component index created at:', indexPath);
};

main().catch(console.error);
