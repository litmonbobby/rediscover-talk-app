/**
 * Rediscover Talk - Design System
 * Central export for all design constants
 */

export { Colors } from './colors';
export { Typography } from './typography';
export { Spacing, BorderRadius, Shadows } from './spacing';

export const Layout = {
  window: {
    width: 375,  // iPhone standard width
    height: 812, // iPhone standard height
  },
  isSmallDevice: false,
  tabBarHeight: 60,
  headerHeight: 56,
} as const;
