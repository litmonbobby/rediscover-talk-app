# Mindify Design System - Figma Extraction

Complete design system and components extracted from the **Mindify - AI Mental Health App UI Kit** Figma file.

## 📦 Contents

### Design System
- **45 Colors** - Complete color palette with hex and RGBA values
- **574 Typography Styles** - Font families, weights, sizes, line heights
- **3,678 Components** - Navigation, buttons, cards, forms, and more

### Assets
- **100 Component Images** (2x PNG) - High-quality exports of key components
- All components from the Design System page
- Light and dark theme variants included in components

### File Structure

```
figma-extracted/
├── README.md                    # This file
├── theme.ts                     # React Native theme (colors, typography, spacing)
├── extraction-summary.json       # Complete component inventory
│
├── assets/
│   └── design-system/           # 100 component images (PNG @2x)
│
├── components/                  # (Reserved for generated React Native components)
├── screens/                     # (Reserved for screen layouts)
├── design-system/              # (Reserved for design tokens)
├── light-theme/                # (Reserved for light theme specifics)
└── dark-theme/                 # (Reserved for dark theme specifics)
```

## 🎨 Using the Theme

Import the theme in your React Native components:

```typescript
import theme, { colors, typography } from './figma-extracted/theme';

// Use colors
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['Rectangle 1'].hex, // #9eb567
  },
  title: {
    ...typography['Heading 1'],
    color: colors['Primary Text'].hex,
  },
});

// Use full theme
const Button = () => (
  <TouchableOpacity
    style={{
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.md,
    }}
  >
    <Text style={typography['Button Text']}>Press Me</Text>
  </TouchableOpacity>
);
```

## 📊 Extraction Details

**Source File:**
- **Name:** Mindify - AI Mental Health App UI Kit
- **File ID:** JOHUFqUJurNsq8Qx05JFNF
- **Pages:** 4 (Get Started, Light Theme, Dark Theme, Design System)

**Extracted:**
- **Date:** 2025-11-21
- **Method:** Figma REST API
- **Token:** (Secured with read-only access)

**Component Breakdown:**
- Navigation Bars: Light/Dark variants with progress indicators
- Buttons: Primary, secondary, text, icon variants
- Cards: Content cards, stat cards, info cards
- Forms: Input fields, dropdowns, checkboxes, radio buttons
- Modals: Alerts, dialogs, bottom sheets
- Lists: Horizontal/vertical, with avatars and icons
- Charts: Progress indicators, graphs, stats

## 🔧 Scripts

### Extract Design System
```bash
node scripts/extract-figma.js
```
- Parses Figma JSON file
- Extracts colors, typography, components
- Generates `theme.ts` and `extraction-summary.json`

### Download Component Images
```bash
node scripts/download-figma-images.js
```
- Downloads PNG exports (@2x) of all components
- Organizes by category (design-system, light-theme, dark-theme)
- Rate-limited to respect Figma API limits

### Generate React Native Components (Coming Soon)
```bash
node scripts/generate-components.js
```
- Will generate React Native component code
- Will include TypeScript types
- Will support light/dark theme variants

## 📝 Component Categories

Based on the extracted components, here are the main categories:

### Navigation
- Navbar (Default, Full, Progress Bar variants)
- Tab Bars
- Breadcrumbs

### Buttons
- Primary, Secondary, Tertiary
- Icon Buttons
- Floating Action Buttons
- Button Groups

### Cards
- Content Cards
- Stat Cards
- Profile Cards
- Feature Cards

### Forms
- Text Inputs
- Dropdowns
- Checkboxes & Radio Buttons
- Switches & Toggles
- Date/Time Pickers

### Modals & Overlays
- Alerts
- Dialogs
- Bottom Sheets
- Toasts/Snackbars

### Lists & Tables
- List Items
- Table Rows
- Grid Layouts

### Media
- Image Placeholders
- Video Players
- Avatar Components

## 🌙 Theme Variants

The design system includes comprehensive light and dark theme support:

- **Light Theme:** Clean, bright interface with subtle shadows
- **Dark Theme:** Modern dark mode with proper contrast ratios
- **Auto-switch:** Can be configured to follow system preferences

## 🔄 Re-extraction

To update the extraction with the latest Figma changes:

1. Update the Figma file in Figma (if needed)
2. Run extraction: `node scripts/extract-figma.js`
3. Download new images: `node scripts/download-figma-images.js`
4. Review changes in `extraction-summary.json`
5. Commit updates to Git

## 📱 Integration with RediscoverTalk

This design system is ready to be integrated into the RediscoverTalk React Native app:

1. Import theme: `import theme from './figma-extracted/theme';`
2. Use design tokens for consistent styling
3. Reference component images for implementation
4. Follow design system guidelines for spacing, colors, typography

## 📖 Additional Resources

- **Figma File:** https://www.figma.com/design/JOHUFqUJurNsq8Qx05JFNF/
- **Light Theme:** node-id=727-25421
- **Dark Theme:** node-id=751-16280
- **Design System:** node-id=3-2

## 🤝 Credits

Design by: Mindify - AI Mental Health App UI Kit
Extraction: Automated via Figma REST API
Project: RediscoverTalk Mental Wellness App

---

Last updated: November 21, 2025
