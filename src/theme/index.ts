/**
 * RediscoverTalk Design System
 * Based on Mindify Figma UI Kit
 *
 * Typography Hierarchy:
 * 1. Urbanist - Primary (UI, body, buttons)
 * 2. Playfair Display - Secondary (headings, emphasis)
 * 3. Roboto Flex - Tertiary (specific uses)
 */

// COLORS - Extracted from Figma (Light + Dark Themes)
export const lightColors = {
  // Primary - Olive Green Theme
  primary: {
    main: '#9eb567',
    light: '#b5c889',
    dark: '#87a055',
  },

  // Backgrounds
  background: {
    primary: '#FFFFFF',
    secondary: '#EEEEEE',
    tertiary: '#F8F8F8',
    card: '#F5F5F5',
  },

  // Text
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#FFFFFF',
  },

  // Borders
  border: {
    light: '#F0F0F0',
    main: '#E0E0E0',
    dark: '#CCCCCC',
  },

  // Status
  status: {
    success: '#9eb567',
    error: '#E74C3C',
    warning: '#F39C12',
    info: '#3498DB',
  },

  // Social
  social: {
    google: '#DB4437',
    apple: '#000000',
    facebook: '#1877F2',
    twitter: '#000000',
  },
} as const;

export const darkColors = {
  // Primary - Olive Green Theme (same as light)
  primary: {
    main: '#9eb567',
    light: '#b5c889',
    dark: '#87a055',
  },

  // Backgrounds - Dark variants
  background: {
    primary: '#1A1A1A',
    secondary: '#2A2A2A',
    tertiary: '#333333',
    card: '#242424',
  },

  // Text - Dark variants
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    tertiary: '#999999',
    inverse: '#1A1A1A',
  },

  // Borders - Dark variants
  border: {
    light: '#3A3A3A',
    main: '#4A4A4A',
    dark: '#5A5A5A',
  },

  // Status (same as light)
  status: {
    success: '#9eb567',
    error: '#E74C3C',
    warning: '#F39C12',
    info: '#3498DB',
  },

  // Social (same as light)
  social: {
    google: '#DB4437',
    apple: '#FFFFFF',
    facebook: '#1877F2',
    twitter: '#FFFFFF',
  },
} as const;

// Export light colors as default 'colors' for backwards compatibility
export const colors = lightColors;

// TYPOGRAPHY - Extracted from Figma
export const typography = {
  // Font Families
  fontFamily: {
    primary: 'Urbanist',
    secondary: 'Playfair Display',
    tertiary: 'Roboto Flex',
  },

  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
    '6xl': 48,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
} as const;

// SPACING - 8px grid system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

// BORDER RADIUS
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// SHADOWS
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

// ANIMATION PRESETS
export const animations = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  spring: {
    damping: 15,
    stiffness: 100,
  },
} as const;

// Export everything as default
export default {
  colors,
  lightColors,
  darkColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
};
