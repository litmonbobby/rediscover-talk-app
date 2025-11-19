/**
 * Rediscover Talk - Design System
 * Modern design patterns with original blue + lime brand colors
 * Professional dark theme with proper depth and hierarchy
 */

export const theme = {
  // Color Palette - Original Blue + Lime (Brand Colors)
  colors: {
    // Backgrounds - Blue gradients (original brand)
    background: {
      primary: '#001E43',      // Dark blue
      secondary: '#002D65',    // Deep blue
      tertiary: '#004BA7',     // Cobalt blue
      gradient: ['#001E43', '#004BA7'], // Dark to Cobalt
      card: 'rgba(255, 255, 255, 0.08)', // Semi-transparent white for cards
      cardElevated: 'rgba(255, 255, 255, 0.12)', // More prominent cards
    },

    // Primary - Blue (original palette)
    primary: {
      50: '#bbd9ff',
      100: '#76b4ff',
      200: '#328eff',
      300: '#006aed',
      400: '#0088DD',     // Light Blue
      500: '#004BA7',     // Cobalt Blue (main)
      600: '#003d87',
      700: '#002d65',
      800: '#001e43',
      900: '#000f22',
    },

    // Accent - Lime (original palette)
    accent: {
      50: '#f5ffca',
      100: '#ecff95',
      200: '#e2ff60',
      300: '#d8ff2b',
      400: '#C7F600',     // Lime (main)
      500: '#a0c400',
      600: '#789300',
      700: '#506200',
      800: '#283100',
      900: '#1a2000',
    },

    // Text - White on dark backgrounds
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.9)',
      tertiary: 'rgba(255, 255, 255, 0.7)',
      inverse: '#1A1A1A',
      disabled: 'rgba(255, 255, 255, 0.4)',
    },

    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#0088DD',

    // Mood colors (keeping original with enhancements)
    mood: {
      amazing: '#10B981',    // Green
      good: '#C7F600',       // Lime
      okay: '#F59E0B',       // Orange
      bad: '#0088DD',        // Blue
      terrible: '#EF4444',   // Red
      veryHappy: '#10B981',
      happy: '#C7F600',
      neutral: '#F59E0B',
      sad: '#0088DD',
      verySad: '#6366F1',
    },

    // UI Elements
    border: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      dark: 'rgba(255, 255, 255, 0.3)',
      accent: '#C7F600',
    },

    // Overlay
    overlay: {
      light: 'rgba(0, 0, 0, 0.3)',
      medium: 'rgba(0, 0, 0, 0.5)',
      dark: 'rgba(0, 0, 0, 0.7)',
    },
  },

  // Typography - Modern, clean
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    fontWeight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing - 8px grid system
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },

  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  // Shadows - Enhanced for dark theme
  shadows: {
    none: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 10,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.4,
      shadowRadius: 24,
      elevation: 16,
    },
    // Glow effects for dark theme
    glow: {
      lime: {
        shadowColor: '#C7F600',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 0,
      },
      blue: {
        shadowColor: '#0088DD',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 0,
      },
    },
  },

  // Component Sizes
  sizes: {
    icon: {
      sm: 16,
      base: 24,
      lg: 32,
      xl: 48,
    },
    button: {
      sm: 36,
      base: 44,
      lg: 52,
      xl: 60,
    },
    avatar: {
      sm: 32,
      base: 40,
      lg: 56,
      xl: 80,
    },
  },
} as const;

export type Theme = typeof theme;
