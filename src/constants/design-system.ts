/**
 * Rediscover Talk - Comprehensive Design System
 * Based on Mindify AI Mental Health App UI Kit from Figma
 *
 * This file consolidates all design tokens for consistent UI implementation
 */

import { Platform, Dimensions } from 'react-native';
import { figmaColors } from './figma-colors';
import { typography } from './typography';
import { FontFamily } from '../hooks/useFonts';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Primary Brand Colors (Olive Green Theme)
  primary: {
    50: '#F4F7ED',
    100: '#E8EFDB',
    200: '#D1DFB7',
    300: '#BACF93',
    400: '#A3BF6F',
    500: '#9EB567', // Main brand color
    600: '#87A055',
    700: '#6A7D43',
    800: '#4D5A31',
    900: '#30371F',
  },

  // Secondary Colors
  secondary: {
    50: '#F5F5F5',
    100: '#EEEEEE',
    200: '#E0E0E0',
    300: '#BDBDBD',
    400: '#9E9E9E',
    500: '#757575',
    600: '#616161',
    700: '#424242',
    800: '#212121',
    900: '#121212',
  },

  // Accent Colors
  accent: {
    blue: '#3498DB',
    purple: '#9B59B6',
    teal: '#1ABC9C',
    orange: '#E67E22',
    pink: '#E91E63',
  },

  // Mood Colors (for mood tracking)
  mood: {
    excellent: '#9EB567',  // Primary green - feeling great
    good: '#A8C977',       // Light green - feeling good
    okay: '#F39C12',       // Yellow/orange - neutral
    notGood: '#E67E22',    // Orange - not great
    terrible: '#E74C3C',   // Red - feeling bad
  },

  // Semantic Colors
  semantic: {
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#EEEEEE',
    card: '#FFFFFF',
    modal: 'rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#9E9E9E',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
    link: '#3498DB',
  },

  // Border Colors
  border: {
    light: '#F0F0F0',
    default: '#E0E0E0',
    dark: '#BDBDBD',
    focus: '#9EB567',
  },

  // Social Colors
  social: {
    google: '#DB4437',
    facebook: '#1877F2',
    apple: '#000000',
    twitter: '#1DA1F2',
  },

  // Utility
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',

  // Import Figma extracted colors
  ...figmaColors,
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  // Base unit: 4px
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

// Semantic spacing aliases
export const layout = {
  screenPadding: spacing[4],      // 16px
  cardPadding: spacing[4],        // 16px
  sectionSpacing: spacing[6],     // 24px
  itemSpacing: spacing[3],        // 12px
  buttonPadding: {
    horizontal: spacing[6],       // 24px
    vertical: spacing[3],         // 12px
  },
  inputPadding: {
    horizontal: spacing[4],       // 16px
    vertical: spacing[3],         // 12px
  },
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },
  avatarSize: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
    xxl: 120,
  },
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  full: 9999,

  // Component-specific
  button: 12,
  card: 16,
  modal: 24,
  input: 12,
  chip: 20,
  avatar: 9999,
  bottomSheet: 24,
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
  },

  // Component-specific shadows
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    shadowColor: '#9EB567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
  dropdown: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

// ============================================================================
// ANIMATION
// ============================================================================

export const animation = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
  },
  easing: {
    linear: [0, 0, 1, 1] as const,
    easeIn: [0.4, 0, 1, 1] as const,
    easeOut: [0, 0, 0.2, 1] as const,
    easeInOut: [0.4, 0, 0.2, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
  },
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: 0,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
} as const;

// ============================================================================
// Z-INDEX
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// ============================================================================
// COMPONENT STYLES
// ============================================================================

export const components = {
  // Button Styles
  button: {
    primary: {
      backgroundColor: colors.primary[500],
      textColor: colors.white,
      borderRadius: borderRadius.button,
      ...shadows.button,
    },
    secondary: {
      backgroundColor: colors.white,
      textColor: colors.primary[500],
      borderColor: colors.primary[500],
      borderWidth: 1.5,
      borderRadius: borderRadius.button,
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: colors.primary[500],
      borderRadius: borderRadius.button,
    },
    disabled: {
      backgroundColor: colors.secondary[200],
      textColor: colors.secondary[400],
      borderRadius: borderRadius.button,
    },
    sizes: {
      sm: { height: 36, paddingHorizontal: spacing[4], fontSize: 14 },
      md: { height: 48, paddingHorizontal: spacing[6], fontSize: 16 },
      lg: { height: 56, paddingHorizontal: spacing[8], fontSize: 18 },
    },
  },

  // Card Styles
  card: {
    default: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.card,
      padding: spacing[4],
      ...shadows.card,
    },
    outlined: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.card,
      borderWidth: 1,
      borderColor: colors.border.default,
      padding: spacing[4],
    },
    elevated: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.card,
      padding: spacing[4],
      ...shadows.lg,
    },
  },

  // Input Styles
  input: {
    default: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.input,
      borderWidth: 1,
      borderColor: colors.border.default,
      height: 52,
      paddingHorizontal: spacing[4],
    },
    focused: {
      borderColor: colors.primary[500],
      borderWidth: 2,
    },
    error: {
      borderColor: colors.semantic.error,
      borderWidth: 2,
    },
  },

  // Chip/Tag Styles
  chip: {
    default: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.chip,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1.5],
    },
    selected: {
      backgroundColor: colors.primary[500],
      borderRadius: borderRadius.chip,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1.5],
    },
  },

  // Avatar Styles
  avatar: {
    sizes: layout.avatarSize,
    borderRadius: borderRadius.avatar,
    backgroundColor: colors.background.secondary,
  },

  // Modal Styles
  modal: {
    backdrop: {
      backgroundColor: colors.background.modal,
    },
    container: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.modal,
      ...shadows.modal,
    },
  },

  // Bottom Sheet Styles
  bottomSheet: {
    handle: {
      width: 40,
      height: 4,
      backgroundColor: colors.secondary[300],
      borderRadius: borderRadius.full,
    },
    container: {
      backgroundColor: colors.white,
      borderTopLeftRadius: borderRadius.bottomSheet,
      borderTopRightRadius: borderRadius.bottomSheet,
      ...shadows.modal,
    },
  },

  // Tab Bar Styles
  tabBar: {
    backgroundColor: colors.white,
    height: Platform.OS === 'ios' ? 84 : 64,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    activeColor: colors.primary[500],
    inactiveColor: colors.secondary[400],
  },

  // Navigation Header Styles
  header: {
    backgroundColor: colors.white,
    height: Platform.OS === 'ios' ? 44 : 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
} as const;

// ============================================================================
// SCREEN DIMENSIONS
// ============================================================================

export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmall: SCREEN_WIDTH < 375,
  isMedium: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLarge: SCREEN_WIDTH >= 414,
} as const;

// ============================================================================
// EXPORT CONSOLIDATED DESIGN SYSTEM
// ============================================================================

export const designSystem = {
  colors,
  typography,
  spacing,
  layout,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
  components,
  screen,
  fontFamily: FontFamily,
} as const;

export type DesignSystem = typeof designSystem;
export default designSystem;
