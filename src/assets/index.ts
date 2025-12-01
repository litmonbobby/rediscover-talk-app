/**
 * Assets Index
 * Central export point for all Figma-extracted assets
 * 1,986 PNG files across icons, illustrations, and UI components
 */

// =============================================================================
// MOOD ICONS (Emoji-style mood indicators)
// =============================================================================
export {
  moodIcons,
  moodIndicatorSet,
  moodTrackerComponents,
  moodInsightCharts,
  getMoodIcon,
  moodLabels,
  moodColors,
} from './moodIcons';
export type { MoodKey } from './moodIcons';

// =============================================================================
// MOOD UI COMPONENTS (Figma-extracted mood tracker UI)
// =============================================================================
export {
  moodIndicators,
  moodTrackerUI,
  moodInsights,
  getMoodIndicator,
  getMoodMeter,
  getMoodCalendar,
  getMoodAreaChart,
  getMoodBarChart,
} from './moodComponents';
export type { MoodLevel } from './moodComponents';

// =============================================================================
// ILLUSTRATIONS (40+ Figma illustrations)
// =============================================================================
export {
  illustrations,
  successIllustrations,
  illustrationSet,
  featureIllustrations,
  getIllustration,
} from './illustrations';

// =============================================================================
// ICONLY ICONS (1,900+ icons across 18 styles)
// =============================================================================
export { getIcon, Icons } from './iconIndex';
export type { IconStyle, IconName } from './iconIndex';

// =============================================================================
// QUICK USAGE GUIDE
// =============================================================================
/**
 * Icons:
 *   import { Icons, getIcon } from '@/assets';
 *   <Image source={Icons.home} />
 *   <Image source={getIcon('heart', 'curved-bold')} />
 *
 * Mood:
 *   import { moodIcons, getMoodIndicator } from '@/assets';
 *   <Image source={moodIcons.happy} />
 *   <Image source={getMoodIndicator('great')} />
 *
 * Illustrations:
 *   import { illustrations, featureIllustrations } from '@/assets';
 *   <Image source={illustrations.illustration10} />
 *   <Image source={featureIllustrations.meditation} />
 */
