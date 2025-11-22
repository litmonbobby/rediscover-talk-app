/**
 * Typography System
 * Font sizes based on 8px grid system
 */

export const typography = {
  // ==================== Font Families ====================
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // ==================== Font Sizes ====================
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
    '4xl': 40,
    '5xl': 48,
  },

  // ==================== Font Weights ====================
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // ==================== Line Heights ====================
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // ==================== Text Styles ====================
  heading1: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 1.2,
  },
  heading2: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 1.2,
  },
  heading3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 1.3,
  },
  heading4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 1.4,
  },

  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 1.5,
  },
  bodyMedium: {
    fontSize: 17,
    fontWeight: '500' as const,
    lineHeight: 1.5,
  },
  bodyBold: {
    fontSize: 17,
    fontWeight: '700' as const,
    lineHeight: 1.5,
  },

  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 1.4,
  },
  captionMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 1.4,
  },

  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 1.5,
  },

  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 1.4,
  },
};

export type Typography = typeof typography;
