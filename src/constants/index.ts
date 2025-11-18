/**
 * Rediscover Talk - Design System
 * Central export for all design constants
 */

// Export design constants directly from their source files
export { colors, Colors } from './colors';
export { typography, Typography } from './typography';
export { spacing, Spacing, BorderRadius, Shadows } from './spacing';

export const Layout = {
  window: {
    width: 375,  // iPhone standard width
    height: 812, // iPhone standard height
  },
  isSmallDevice: false,
  tabBarHeight: 60,
  headerHeight: 56,
} as const;
