/**
 * Mood Icons Asset Mapping
 * Real Figma-extracted mood indicator icons
 */

// Mood indicator face icons (individual)
export const moodIcons = {
  great: require('../figma-extracted/assets/components/mood-indicators/mood-great-component-mood-indicator.png'),
  good: require('../figma-extracted/assets/components/mood-indicators/mood-good-component-mood-indicator.png'),
  okay: require('../figma-extracted/assets/components/mood-indicators/mood-okay-component-mood-indicator.png'),
  notGood: require('../figma-extracted/assets/components/mood-indicators/mood-not-good-component-mood-indicator.png'),
  bad: require('../figma-extracted/assets/components/mood-indicators/mood-bad-component-mood-indicator.png'),
};

// Complete mood indicator set (all 5 faces in one image)
export const moodIndicatorSet = require('../figma-extracted/assets/components/mood-indicators/elements-mood-indicator.png');

// Mood tracker components
export const moodTrackerComponents = {
  // Full mood tracker element
  full: require('../figma-extracted/assets/components/mood-indicators/elements-mood-tracker.png'),

  // Mood meter (light theme)
  meterLight: require('../figma-extracted/assets/components/mood-indicators/element-mood-meter-selected-false-dark-false-component-mood-tracker.png'),
  // Mood meter (dark theme)
  meterDark: require('../figma-extracted/assets/components/mood-indicators/element-mood-meter-selected-false-dark-true-component-mood-tracker.png'),

  // Mood reasons & feelings (light theme)
  reasonsLight: require('../figma-extracted/assets/components/mood-indicators/element-mood-reason-feelings-selected-false-dark-false-component-mood-tracker.png'),
  // Mood reasons & feelings (dark theme)
  reasonsDark: require('../figma-extracted/assets/components/mood-indicators/element-mood-reason-feelings-selected-false-dark-true-component-mood-tracker.png'),
  // Mood reasons selected (light theme)
  reasonsSelectedLight: require('../figma-extracted/assets/components/mood-indicators/element-mood-reason-feelings-selected-true-dark-false-component-mood-tracker.png'),
};

// Mood insight charts
export const moodInsightCharts = {
  // Mood calendar (light theme)
  calendarLight: require('../figma-extracted/assets/components/mood-indicators/insight-mood-calendar-dark-false-component-insights.png'),
  // Mood calendar (dark theme)
  calendarDark: require('../figma-extracted/assets/components/mood-indicators/insight-mood-calendar-dark-true-component-insights.png'),

  // Mood area chart (light theme)
  areaChartLight: require('../figma-extracted/assets/components/mood-indicators/insight-mood-tracker-area-chart-dark-false-component-insights.png'),
  // Mood area chart (dark theme)
  areaChartDark: require('../figma-extracted/assets/components/mood-indicators/insight-mood-tracker-area-chart-dark-true-component-insights.png'),

  // Mood bar chart (light theme)
  barChartLight: require('../figma-extracted/assets/components/mood-indicators/insight-mood-tracker-bar-chart-dark-false-component-insights.png'),
  // Mood bar chart (dark theme)
  barChartDark: require('../figma-extracted/assets/components/mood-indicators/insight-mood-tracker-bar-chart-dark-true-component-insights.png'),
};

// Mood icon by key (for programmatic access)
export type MoodKey = 'great' | 'good' | 'okay' | 'notGood' | 'bad';

export const getMoodIcon = (mood: MoodKey) => moodIcons[mood];

// Mood labels for UI
export const moodLabels: Record<MoodKey, string> = {
  great: 'Great',
  good: 'Good',
  okay: 'Okay',
  notGood: 'Not Good',
  bad: 'Bad',
};

// Mood colors (matching Figma design)
export const moodColors: Record<MoodKey, string> = {
  great: '#4CAF50',   // Green
  good: '#8BC34A',    // Light Green
  okay: '#FFC107',    // Amber
  notGood: '#FF9800', // Orange
  bad: '#F44336',     // Red
};
