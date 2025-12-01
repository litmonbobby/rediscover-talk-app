/**
 * Rediscover Talk - Typography System
 * Using Urbanist (primary), Playfair Display (display), Roboto (system)
 * Matching Mindify Figma design system
 */

import { FontFamily } from '../hooks/useFonts';

/**
 * Typography scale based on Mindify Figma design
 */
export const typography = {
  // Display Headings (Playfair Display)
  display1: {
    fontFamily: FontFamily.playfair.bold,
    fontSize: 48,
    lineHeight: 58,
    letterSpacing: -0.5,
  },
  display2: {
    fontFamily: FontFamily.playfair.semiBold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.3,
  },

  // Headings (Urbanist Bold)
  h1: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: 0,
  },
  h2: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: 0,
  },
  h3: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0,
  },
  h5: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  h6: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },

  // Body Text (Urbanist)
  bodyXL: {
    fontFamily: FontFamily.urbanist.regular,
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontFamily: FontFamily.urbanist.regular,
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
  body: {
    fontFamily: FontFamily.urbanist.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: FontFamily.urbanist.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyXS: {
    fontFamily: FontFamily.urbanist.regular,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Body Bold variants
  bodyXLBold: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0,
  },
  bodyLargeBold: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodyBold: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmallBold: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyXSBold: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Body Medium variants
  bodyXLMedium: {
    fontFamily: FontFamily.urbanist.medium,
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0,
  },
  bodyLargeMedium: {
    fontFamily: FontFamily.urbanist.medium,
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: FontFamily.urbanist.medium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmallMedium: {
    fontFamily: FontFamily.urbanist.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyXSMedium: {
    fontFamily: FontFamily.urbanist.medium,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Body SemiBold variants
  bodyXLSemiBold: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0,
  },
  bodyLargeSemiBold: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodySemiBold: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmallSemiBold: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyXSSemiBold: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Caption & Labels
  caption: {
    fontFamily: FontFamily.urbanist.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  captionMedium: {
    fontFamily: FontFamily.urbanist.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  captionBold: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  label: {
    fontFamily: FontFamily.urbanist.medium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  overline: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },

  // Button Text
  buttonLarge: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  button: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  buttonSmall: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
  },
  buttonXS: {
    fontFamily: FontFamily.urbanist.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },

  // Link Text
  link: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    textDecorationLine: 'underline' as const,
  },
  linkSmall: {
    fontFamily: FontFamily.urbanist.semiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    textDecorationLine: 'underline' as const,
  },

  // Font Families (for direct use)
  fontFamily: {
    urbanist: {
      thin: FontFamily.urbanist.thin,
      extraLight: FontFamily.urbanist.extraLight,
      light: FontFamily.urbanist.light,
      regular: FontFamily.urbanist.regular,
      medium: FontFamily.urbanist.medium,
      semiBold: FontFamily.urbanist.semiBold,
      bold: FontFamily.urbanist.bold,
      extraBold: FontFamily.urbanist.extraBold,
      black: FontFamily.urbanist.black,
    },
    playfair: {
      regular: FontFamily.playfair.regular,
      medium: FontFamily.playfair.medium,
      semiBold: FontFamily.playfair.semiBold,
      bold: FontFamily.playfair.bold,
      extraBold: FontFamily.playfair.extraBold,
      black: FontFamily.playfair.black,
    },
    roboto: {
      thin: FontFamily.roboto.thin,
      light: FontFamily.roboto.light,
      regular: FontFamily.roboto.regular,
      medium: FontFamily.roboto.medium,
      bold: FontFamily.roboto.bold,
      black: FontFamily.roboto.black,
    },
  },

  // Font Sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 22,
    '3xl': 26,
    '4xl': 34,
    '5xl': 40,
    '6xl': 48,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
} as const;

export type TypographyScheme = typeof typography;
export default typography;
