/**
 * Figma Design System Colors - RediscoverTalk
 * Extracted from Mindify - AI Mental Health App UI Kit
 */

export const figmaColors = {
  // Primary Palette - Olive Green Theme
  primary: {
    DEFAULT: '#9eb567',      // Soft olive green (main brand color)
    light: '#b5c889',        // Lighter green
    dark: '#87a055',         // Darker green
    olive: '#9eb567',        // Same as default
  },

  // Background Colors
  background: {
    DEFAULT: '#FFFFFF',      // White
    light: '#EEEEEE',        // Light gray
    card: '#F8F8F8',         // Card background
    secondary: '#F5F5F5',    // Secondary background
  },

  // Text Colors
  text: {
    primary: '#1A1A1A',      // Almost black
    secondary: '#666666',    // Medium gray
    tertiary: '#999999',     // Light gray
    inverse: '#FFFFFF',      // White text
    success: '#9eb567',      // Green text
  },

  // UI Elements
  border: {
    DEFAULT: '#E0E0E0',      // Light gray border
    light: '#F0F0F0',        // Very light border
    dark: '#CCCCCC',         // Medium border
  },

  // Status Colors
  status: {
    success: '#9eb567',      // Green
    error: '#E74C3C',        // Red
    warning: '#F39C12',      // Orange
    info: '#3498DB',         // Blue
  },

  // Social Login Colors
  social: {
    google: '#DB4437',
    apple: '#000000',
    facebook: '#1877F2',
    twitter: '#000000',
  },

  // Component-specific
  checkbox: {
    active: '#9eb567',
    inactive: '#E0E0E0',
    border: '#CCCCCC',
  },

  // Mood colors (if different from status)
  mood: {
    excellent: '#9eb567',
    good: '#A8C977',
    neutral: '#F39C12',
    bad: '#E67E22',
    terrible: '#E74C3C',
  },
} as const;

export type FigmaColors = typeof figmaColors;
export default figmaColors;
