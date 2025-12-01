/**
 * Mood Components Index
 * Figma-extracted mood tracking UI components
 */

const MOOD_PATH = '../figma-extracted/assets/components/mood-indicators';

// Mood indicator icons
export const moodIndicators = {
  great: require(`${MOOD_PATH}/mood-great-component-mood-indicator.png`),
  good: require(`${MOOD_PATH}/mood-good-component-mood-indicator.png`),
  okay: require(`${MOOD_PATH}/mood-okay-component-mood-indicator.png`),
  bad: require(`${MOOD_PATH}/mood-bad-component-mood-indicator.png`),
  notGood: require(`${MOOD_PATH}/mood-not-good-component-mood-indicator.png`),
};

// Mood tracker UI components
export const moodTrackerUI = {
  // Mood meter (light/dark variants)
  meterLight: require(`${MOOD_PATH}/element-mood-meter-selected-false-dark-false-component-mood-tracker.png`),
  meterDark: require(`${MOOD_PATH}/element-mood-meter-selected-false-dark-true-component-mood-tracker.png`),
  
  // Mood reason/feelings selector
  reasonLight: require(`${MOOD_PATH}/element-mood-reason-feelings-selected-false-dark-false-component-mood-tracker.png`),
  reasonDark: require(`${MOOD_PATH}/element-mood-reason-feelings-selected-false-dark-true-component-mood-tracker.png`),
  reasonSelectedLight: require(`${MOOD_PATH}/element-mood-reason-feelings-selected-true-dark-false-component-mood-tracker.png`),
  
  // Full component previews
  indicatorSet: require(`${MOOD_PATH}/elements-mood-indicator.png`),
  trackerSet: require(`${MOOD_PATH}/elements-mood-tracker.png`),
};

// Mood insights/charts
export const moodInsights = {
  // Calendar view
  calendarLight: require(`${MOOD_PATH}/insight-mood-calendar-dark-false-component-insights.png`),
  calendarDark: require(`${MOOD_PATH}/insight-mood-calendar-dark-true-component-insights.png`),
  
  // Area chart
  areaChartLight: require(`${MOOD_PATH}/insight-mood-tracker-area-chart-dark-false-component-insights.png`),
  areaChartDark: require(`${MOOD_PATH}/insight-mood-tracker-area-chart-dark-true-component-insights.png`),
  
  // Bar chart
  barChartLight: require(`${MOOD_PATH}/insight-mood-tracker-bar-chart-dark-false-component-insights.png`),
  barChartDark: require(`${MOOD_PATH}/insight-mood-tracker-bar-chart-dark-true-component-insights.png`),
};

// Helper to get mood icon by key
export type MoodLevel = 'great' | 'good' | 'okay' | 'bad' | 'notGood';

export const getMoodIndicator = (level: MoodLevel) => moodIndicators[level];

// Theme-aware getters
export const getMoodMeter = (isDark: boolean) => 
  isDark ? moodTrackerUI.meterDark : moodTrackerUI.meterLight;

export const getMoodCalendar = (isDark: boolean) => 
  isDark ? moodInsights.calendarDark : moodInsights.calendarLight;

export const getMoodAreaChart = (isDark: boolean) => 
  isDark ? moodInsights.areaChartDark : moodInsights.areaChartLight;

export const getMoodBarChart = (isDark: boolean) => 
  isDark ? moodInsights.barChartDark : moodInsights.barChartLight;

export default {
  indicators: moodIndicators,
  tracker: moodTrackerUI,
  insights: moodInsights,
};
