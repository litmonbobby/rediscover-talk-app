#!/usr/bin/env node

/**
 * Figma to React Native Extractor
 * Extracts Mindify design system and generates React Native components
 */

const fs = require('fs');
const path = require('path');

const FIGMA_FILE = '/tmp/figma-mindify-full.json';
const OUTPUT_DIR = path.join(__dirname, '../src/figma-extracted');

// Create output directories
const createDirs = () => {
  const dirs = [
    OUTPUT_DIR,
    path.join(OUTPUT_DIR, 'design-system'),
    path.join(OUTPUT_DIR, 'light-theme'),
    path.join(OUTPUT_DIR, 'dark-theme'),
    path.join(OUTPUT_DIR, 'components'),
    path.join(OUTPUT_DIR, 'assets'),
    path.join(OUTPUT_DIR, 'screens'),
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Parse Figma file
const loadFigmaFile = () => {
  console.log('📖 Loading Figma file...');
  const data = fs.readFileSync(FIGMA_FILE, 'utf8');
  return JSON.parse(data);
};

// Extract colors from design system
const extractColors = (designSystemPage) => {
  const colors = {};

  // Find color styles
  const traverse = (node) => {
    if (node.type === 'RECTANGLE' && node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID' && node.name) {
        const { r, g, b, a = 1 } = fill.color;
        const hex = rgbToHex(r, g, b);
        colors[node.name] = { hex, rgba: { r, g, b, a } };
      }
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  traverse(designSystemPage);
  return colors;
};

// RGB to Hex converter
const rgbToHex = (r, g, b) => {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16).padStart(2, '0');
    return hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Extract typography
const extractTypography = (designSystemPage) => {
  const typography = {};

  const traverse = (node) => {
    if (node.type === 'TEXT' && node.style) {
      const { fontFamily, fontWeight, fontSize, lineHeightPx, letterSpacing } = node.style;
      typography[node.name] = {
        fontFamily,
        fontWeight,
        fontSize,
        lineHeight: lineHeightPx,
        letterSpacing,
      };
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  traverse(designSystemPage);
  return typography;
};

// Extract components from a page
const extractComponents = (page) => {
  const components = [];

  const traverse = (node, depth = 0) => {
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
      components.push({
        id: node.id,
        name: node.name,
        type: node.type,
        width: node.absoluteBoundingBox?.width,
        height: node.absoluteBoundingBox?.height,
        children: node.children?.length || 0,
      });
    }

    if (node.children) {
      node.children.forEach(child => traverse(child, depth + 1));
    }
  };

  traverse(page);
  return components;
};

// Extract screens from Light/Dark theme pages
const extractScreens = (page, theme) => {
  const screens = [];

  const traverse = (node, depth = 0) => {
    // Capture all top-level FRAME nodes directly under the page
    // These represent the actual screen designs (e.g., "138_Light_logout", "137_Light_settings")
    if (node.type === 'FRAME' && depth === 1) {
      screens.push({
        id: node.id,
        name: node.name,
        theme,
        width: node.absoluteBoundingBox?.width,
        height: node.absoluteBoundingBox?.height,
        children: node.children?.length || 0,
      });
    }

    if (node.children) {
      node.children.forEach(child => traverse(child, depth + 1));
    }
  };

  traverse(page, 0);
  return screens;
};

// Generate React Native theme file
const generateThemeFile = (colors, typography) => {
  const themeCode = `/**
 * Mindify Design System - Auto-generated from Figma
 * Do not edit manually - regenerate using extract-figma.js
 */

export const colors = ${JSON.stringify(colors, null, 2)};

export const typography = ${JSON.stringify(typography, null, 2)};

export const theme = {
  colors,
  typography,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export default theme;
`;

  return themeCode;
};

// Main extraction process
const main = () => {
  console.log('🎨 Mindify Figma Extraction Starting...\n');

  // Create directories
  createDirs();

  // Load Figma file
  const figmaData = loadFigmaFile();
  console.log(`✅ Loaded: ${figmaData.name}`);
  console.log(`📄 Pages: ${figmaData.document.children.length}\n`);

  // Find pages
  const pages = figmaData.document.children;
  const designSystemPage = pages.find(p => p.name.includes('Design System'));
  const lightThemePage = pages.find(p => p.name.includes('Light Theme'));
  const darkThemePage = pages.find(p => p.name.includes('Dark Theme'));

  // Extract Design System
  console.log('🎨 Extracting Design System...');
  const colors = extractColors(designSystemPage);
  const typography = extractTypography(designSystemPage);
  const designComponents = extractComponents(designSystemPage);

  console.log(`  ├─ Colors: ${Object.keys(colors).length}`);
  console.log(`  ├─ Typography: ${Object.keys(typography).length}`);
  console.log(`  └─ Components: ${designComponents.length}\n`);

  // Extract Light Theme
  console.log('🔆 Extracting Light Theme...');
  const lightComponents = extractComponents(lightThemePage);
  const lightScreens = extractScreens(lightThemePage, 'light');

  console.log(`  ├─ Components: ${lightComponents.length}`);
  console.log(`  └─ Screens: ${lightScreens.length}\n`);

  // Extract Dark Theme
  console.log('🌙 Extracting Dark Theme...');
  const darkComponents = extractComponents(darkThemePage);
  const darkScreens = extractScreens(darkThemePage, 'dark');

  console.log(`  ├─ Components: ${darkComponents.length}`);
  console.log(`  └─ Screens: ${darkScreens.length}\n`);

  // Generate theme file
  console.log('📝 Generating React Native theme...');
  const themeCode = generateThemeFile(colors, typography);
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'theme.ts'),
    themeCode
  );
  console.log('  ✅ theme.ts generated\n');

  // Save extraction summary
  const summary = {
    extractedAt: new Date().toISOString(),
    fileId: figmaData.id || 'JOHUFqUJurNsq8Qx05JFNF',
    fileName: figmaData.name,
    pages: pages.map(p => p.name),
    designSystem: {
      colors: Object.keys(colors).length,
      typography: Object.keys(typography).length,
      components: designComponents.length,
    },
    lightTheme: {
      components: lightComponents.length,
      screens: lightScreens.length,
    },
    darkTheme: {
      components: darkComponents.length,
      screens: darkScreens.length,
    },
    components: {
      design: designComponents,
      light: lightComponents,
      dark: darkComponents,
    },
    screens: {
      light: lightScreens,
      dark: darkScreens,
    },
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'extraction-summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('📊 Extraction Summary:');
  console.log(`  ├─ Total Components: ${designComponents.length + lightComponents.length + darkComponents.length}`);
  console.log(`  ├─ Total Screens: ${lightScreens.length + darkScreens.length}`);
  console.log(`  ├─ Output: ${OUTPUT_DIR}`);
  console.log(`  └─ Summary: extraction-summary.json\n`);

  console.log('✅ Extraction Complete!');
  console.log('\n📦 Next Steps:');
  console.log('  1. Review extracted theme in src/figma-extracted/theme.ts');
  console.log('  2. Check extraction-summary.json for component list');
  console.log('  3. Download images with: node scripts/download-figma-images.js');
  console.log('  4. Generate components with: node scripts/generate-components.js\n');
};

// Run extraction
main();
