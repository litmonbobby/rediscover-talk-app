/**
 * Rediscover Talk - Design System
 * Central export for all design constants
 */

// Export legacy constants for backwards compatibility
export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';

// Export comprehensive design system
export {
  colors as designColors,
  typography as designTypography,
  spacing as designSpacing,
  layout,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
  components,
  screen,
  designSystem,
} from './design-system';

// Export Figma colors
export { figmaColors } from './figma-colors';

// Re-export uppercase versions for legacy compatibility
export { colors as Colors } from './colors';
export { typography as Typography } from './typography';
export { spacing as Spacing } from './spacing';
export { borderRadius as BorderRadius } from './design-system';
export { shadows as Shadows } from './design-system';

export const Layout = {
  window: {
    width: 375,  // iPhone standard width
    height: 812, // iPhone standard height
  },
  isSmallDevice: false,
  tabBarHeight: 60,
  headerHeight: 56,
} as const;
