/**
 * Rediscover Talk - Color Palette
 * Based on Coolors palette: https://coolors.co/004ba7-eef2f5-c7f600-0088dd-0043a7
 */

export const Colors = {
  // Primary Colors
  primary: {
    DEFAULT: '#004BA7', // Cobalt Blue
    light: '#0088DD',   // Bleu de France
    dark: '#0043A7',    // Cobalt Blue Dark
    100: '#bbd9ff',
    200: '#76b4ff',
    300: '#328eff',
    400: '#006aed',
    500: '#004BA7',
    600: '#003d87',
    700: '#002d65',
    800: '#001e43',
    900: '#000f22',
  },

  // Accent Colors
  accent: {
    DEFAULT: '#C7F600',  // Lime
    light: '#d8ff2b',
    dark: '#a0c400',
    100: '#f5ffca',
    200: '#ecff95',
    300: '#e2ff60',
    400: '#d8ff2b',
    500: '#C7F600',
    600: '#a0c400',
    700: '#789300',
    800: '#506200',
    900: '#283100',
  },

  // Neutral Colors
  background: {
    light: '#EEF2F5',    // Anti-flash White
    DEFAULT: '#FFFFFF',
    dark: '#1A1A1A',
    paper: '#FFFFFF',
  },

  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#0088DD',

  // Mood Colors (for mood tracking)
  mood: {
    veryHappy: '#10B981',   // Green
    happy: '#C7F600',       // Lime
    neutral: '#F59E0B',     // Orange
    sad: '#0088DD',         // Blue
    verySad: '#6366F1',     // Indigo
    anxious: '#EF4444',     // Red
    calm: '#10B981',        // Green
    energetic: '#C7F600',   // Lime
    tired: '#6B7280',       // Gray
  },

  // Gradients
  gradients: {
    primary: ['#004BA7', '#0088DD'],
    accent: ['#C7F600', '#a0c400'],
    sunset: ['#0088DD', '#004BA7'],
    calm: ['#EEF2F5', '#FFFFFF'],
  },

  // Shadows
  shadow: {
    light: 'rgba(0, 75, 167, 0.1)',
    medium: 'rgba(0, 75, 167, 0.2)',
    dark: 'rgba(0, 75, 167, 0.3)',
  },
} as const;

export type ColorScheme = typeof Colors;
