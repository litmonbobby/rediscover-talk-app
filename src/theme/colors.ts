/**
 * Brand Color Palette
 * Primary: Cobalt Blue (#004BA7) - Trust, calm, professionalism
 * Accent: Lime (#C7F600) - Energy, positivity, growth
 */

export const colors = {
  // ==================== Primary Colors ====================
  primary: {
    DEFAULT: '#004BA7',
    50: '#E6F0FF',
    100: '#CCDEFF',
    200: '#99BDFF',
    300: '#669CFF',
    400: '#337BFF',
    500: '#004BA7', // Base
    600: '#003D87',
    700: '#002D65',
    800: '#001E43',
    900: '#000F22',
  },

  // ==================== Accent Colors ====================
  accent: {
    DEFAULT: '#C7F600',
    50: '#FAFFEB',
    100: '#F5FFD6',
    200: '#ECFFAD',
    300: '#E2FF84',
    400: '#D8FF5B',
    500: '#C7F600', // Base
    600: '#9FC500',
    700: '#779400',
    800: '#4F6200',
    900: '#283100',
  },

  // ==================== Background Colors ====================
  background: {
    light: '#FFFFFF',
    dark: '#0A0E27',
    paper: '#F5F7FA',
    gradient: ['#001E43', '#004BA7'], // Dark blue to cobalt
  },

  // ==================== Text Colors ====================
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    disabled: '#D1D5DB',
  },

  // ==================== Semantic Colors ====================
  success: '#10B981', // Green
  warning: '#F59E0B', // Orange
  error: '#EF4444', // Red
  info: '#3B82F6', // Blue

  // ==================== Mood Colors ====================
  mood: {
    'very-happy': '#10B981', // Bright green
    happy: '#34D399', // Green
    neutral: '#F59E0B', // Orange
    sad: '#60A5FA', // Light blue
    'very-sad': '#3B82F6', // Blue
    anxious: '#EF4444', // Red
    calm: '#34D399', // Calm green
    energetic: '#C7F600', // Lime
    tired: '#6B7280', // Gray
  },

  // ==================== UI Elements ====================
  border: {
    light: '#E5E7EB',
    DEFAULT: '#D1D5DB',
    dark: '#9CA3AF',
  },

  divider: '#E5E7EB',

  overlay: 'rgba(0, 0, 0, 0.5)',

  // ==================== Component-specific ====================
  card: {
    background: '#FFFFFF',
    border: '#E5E7EB',
  },

  input: {
    background: '#F9FAFB',
    border: '#D1D5DB',
    borderFocus: '#004BA7',
    placeholder: '#9CA3AF',
  },

  badge: {
    background: '#F3F4F6',
    text: '#6B7280',
  },
};

export type ColorScheme = typeof colors;
