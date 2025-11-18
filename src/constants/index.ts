/**
 * Rediscover Talk - Design System
 * Central export for all design constants
 */

// Export design constants directly from their source files
export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';

export const Layout = {
  window: {
    width: 375,  // iPhone standard width
    height: 812, // iPhone standard height
  },
  isSmallDevice: false,
  tabBarHeight: 60,
  headerHeight: 56,
} as const;
