/**
 * Insights Screen - Functional with Real Data
 * Mood Tracker and Calendar connected to moodStore
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Circle, G, Text as SvgText, Rect, Line } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { useMoodStore, MoodEntry, MoodName } from '../../store/moodStore';

const { width } = Dimensions.get('window');
const PROGRESS_SIZE = (width - 80) / 3; // 3 circles per row with gaps

type InsightsStackParamList = {
  Insights: undefined;
  MoodHistory: undefined;
  MoodCalendar: undefined;
};

type NavigationProp = NativeStackNavigationProp<InsightsStackParamList, 'Insights'>;

// Figma-extracted assets
const assets = {
  logo: require('../../../assets/images/conversation-logo.png'),
  menu: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-category.png'),

  // Mood indicators
  moodBad: require('../../figma-extracted/assets/components/mood-indicators/mood-bad-component-mood-indicator.png'),
  moodNotGood: require('../../figma-extracted/assets/components/mood-indicators/mood-not-good-component-mood-indicator.png'),
  moodOkay: require('../../figma-extracted/assets/components/mood-indicators/mood-okay-component-mood-indicator.png'),
  moodGood: require('../../figma-extracted/assets/components/mood-indicators/mood-good-component-mood-indicator.png'),
  moodGreat: require('../../figma-extracted/assets/components/mood-indicators/mood-great-component-mood-indicator.png'),

  // Mood tracker chart
  moodTrackerChart: require('../../figma-extracted/assets/components/mood-indicators/insight-mood-tracker-bar-chart-dark-false-component-insights.png'),

  // Mood calendar
  moodCalendar: require('../../figma-extracted/assets/components/mood-indicators/insight-mood-calendar-dark-false-component-insights.png'),
};

// Period tabs
const periodTabs = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

// Growth area categories (values will be calculated from mood data)
const growthAreaLabels = [
  { id: '1', label: 'Mental Health' },
  { id: '2', label: 'Growth Mindset' },
  { id: '3', label: 'Relationships' },
  { id: '4', label: 'Personal Development' },
  { id: '5', label: 'Self-awareness' },
  { id: '6', label: 'Stress Management' },
];

// Recent mood tags (default if no data)
const defaultMoodTags = ['Work', 'Health', 'Friends', 'Happy', 'Relaxed', 'Inspired'];

// Mood level to value mapping for chart
const moodLevelValues: Record<MoodName, number> = {
  'Bad': 1,
  'Not Good': 2,
  'Okay': 3,
  'Good': 4,
  'Great': 5,
};

// Mood colors
const moodColors: Record<MoodName, string> = {
  'Bad': '#FF6B6B',
  'Not Good': '#FFA06B',
  'Okay': '#FFD36B',
  'Good': '#9EB567',
  'Great': '#6BCB77',
};

// Days of week abbreviations
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Month abbreviations
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Circular Progress Component
interface CircularProgressProps {
  value: number;
  label: string;
  color: string;
  size: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, label, color, size }) => {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - value) / 100) * circumference;
  const center = size / 2;

  return (
    <View style={styles.progressContainer}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E8E8E8"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
        {/* Center text */}
        <SvgText
          x={center}
          y={center + 5}
          textAnchor="middle"
          fontSize={16}
          fontWeight="600"
          fill="#333333"
        >
          {value}
        </SvgText>
      </Svg>
      <Text style={styles.progressLabel} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
};

// Mini Bar Chart Component for mood data (supports weekly, monthly, yearly)
interface MiniBarChartProps {
  data: { day: string; value: number; color: string }[];
}

const MiniBarChart: React.FC<MiniBarChartProps> = ({ data }) => {
  const chartWidth = width - 72;
  const chartHeight = 120;
  const dataCount = data.length;
  const maxValue = 5;

  // Adjust bar gap and width based on data count
  const isMonthly = dataCount === 30;
  const barGap = isMonthly ? 1 : 4;
  const totalBarSpace = chartWidth - 32;
  const singleBarWidth = (totalBarSpace - (dataCount - 1) * barGap) / dataCount;

  return (
    <View style={styles.miniChartContainer}>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Background grid lines */}
        {[1, 2, 3, 4, 5].map((level) => (
          <Line
            key={level}
            x1={0}
            y1={chartHeight - 24 - ((level / maxValue) * (chartHeight - 40))}
            x2={chartWidth}
            y2={chartHeight - 24 - ((level / maxValue) * (chartHeight - 40))}
            stroke="#E8E8E8"
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (chartHeight - 40);
          const x = 16 + index * (singleBarWidth + barGap);
          const y = chartHeight - 24 - barHeight;
          const displayBarWidth = isMonthly ? singleBarWidth : Math.min(singleBarWidth * 0.7, 24);
          const barRadius = isMonthly ? 2 : 4;

          return (
            <G key={index}>
              <Rect
                x={x + (singleBarWidth - displayBarWidth) / 2}
                y={item.value > 0 ? y : chartHeight - 24 - 2}
                width={displayBarWidth}
                height={Math.max(barHeight, 2)}
                rx={barRadius}
                ry={barRadius}
                fill={item.value > 0 ? item.color : '#E0E0E0'}
              />
              {item.day !== '' && (
                <SvgText
                  x={x + singleBarWidth / 2}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  fontSize={isMonthly ? 8 : (dataCount > 7 ? 9 : 11)}
                  fill="#666666"
                >
                  {item.day}
                </SvgText>
              )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

// Mini Calendar Component
interface MiniCalendarProps {
  moodData: Record<number, MoodName>;
  currentMonth: number;
  currentYear: number;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ moodData, currentMonth, currentYear }) => {
  const calendarWidth = width - 72;
  const cellSize = (calendarWidth - 16) / 7;

  const getCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);

    return days;
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const getMoodDotColor = (day: number) => {
    const mood = moodData[day];
    return mood ? moodColors[mood] : 'transparent';
  };

  return (
    <View style={styles.miniCalendarContainer}>
      {/* Weekday headers */}
      <View style={styles.miniCalendarHeader}>
        {WEEKDAYS.map((day, i) => (
          <Text key={i} style={[styles.miniCalendarWeekday, { width: cellSize }]}>{day}</Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.miniCalendarGrid}>
        {getCalendarDays().map((day, index) => (
          <View key={index} style={[styles.miniCalendarCell, { width: cellSize, height: cellSize }]}>
            {day !== null && (
              <>
                <Text style={[
                  styles.miniCalendarDay,
                  isToday(day) && styles.miniCalendarDayToday,
                ]}>
                  {day}
                </Text>
                {moodData[day] && (
                  <View style={[styles.moodDot, { backgroundColor: getMoodDotColor(day) }]} />
                )}
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export const InsightsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [activePeriod, setActivePeriod] = useState('weekly');

  // Get mood data from store
  const { entries, getMoodsByMonth, stats, initialize, isInitialized } = useMoodStore();

  // Initialize store on mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized]);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Get weekly chart data (last 7 days)
  const weeklyChartData = useMemo(() => {
    const data: { day: string; value: number; color: string }[] = [];
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const entry = entries.find((e: MoodEntry) => e.date === dateStr);

      data.push({
        day: dayNames[date.getDay()],
        value: entry ? moodLevelValues[entry.name] : 0,
        color: entry ? moodColors[entry.name] : '#E8E8E8',
      });
    }

    return data;
  }, [entries]);

  // Get monthly chart data (last 30 days, showing every 5th day label)
  const monthlyChartData = useMemo(() => {
    const data: { day: string; value: number; color: string }[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const entry = entries.find((e: MoodEntry) => e.date === dateStr);

      // Show label every 5 days for readability
      const dayLabel = (29 - i) % 5 === 0 ? String(date.getDate()) : '';

      data.push({
        day: dayLabel,
        value: entry ? moodLevelValues[entry.name] : 0,
        color: entry ? moodColors[entry.name] : '#E8E8E8',
      });
    }

    return data;
  }, [entries]);

  // Get yearly chart data (last 12 months)
  const yearlyChartData = useMemo(() => {
    const data: { day: string; value: number; color: string }[] = [];

    for (let monthOffset = 11; monthOffset >= 0; monthOffset--) {
      const date = new Date();
      date.setMonth(date.getMonth() - monthOffset);
      const targetMonth = date.getMonth();
      const targetYear = date.getFullYear();

      // Get entries for this month
      const monthEntries = entries.filter((e: MoodEntry) => {
        const entryDate = new Date(e.date);
        return entryDate.getMonth() === targetMonth && entryDate.getFullYear() === targetYear;
      });

      // Calculate average mood for the month
      const avgValue = monthEntries.length > 0
        ? monthEntries.reduce((sum: number, e: MoodEntry) => sum + moodLevelValues[e.name], 0) / monthEntries.length
        : 0;

      // Get dominant mood color
      const dominantMood = monthEntries.length > 0
        ? monthEntries.reduce((acc: Record<string, number>, e: MoodEntry) => {
            acc[e.name] = (acc[e.name] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        : null;
      const topMood = dominantMood
        ? Object.entries(dominantMood).sort((a, b) => b[1] - a[1])[0]?.[0] as MoodName
        : null;

      data.push({
        day: MONTHS[targetMonth].substring(0, 1),
        value: Math.round(avgValue * 10) / 10,
        color: topMood ? moodColors[topMood] : '#E8E8E8',
      });
    }

    return data;
  }, [entries]);

  // Get current chart data based on active period
  const currentChartData = useMemo(() => {
    switch (activePeriod) {
      case 'monthly':
        return monthlyChartData;
      case 'yearly':
        return yearlyChartData;
      default:
        return weeklyChartData;
    }
  }, [activePeriod, weeklyChartData, monthlyChartData, yearlyChartData]);

  // Get calendar mood data for current month
  const calendarMoodData = useMemo(() => {
    const monthEntries = getMoodsByMonth(currentYear, currentMonth);
    const data: Record<number, MoodName> = {};

    monthEntries.forEach((entry: MoodEntry) => {
      const day = parseInt(entry.date.split('-')[2], 10);
      data[day] = entry.name;
    });

    return data;
  }, [currentMonth, currentYear, entries]);

  // Get recent mood entry
  const recentMoodEntry = useMemo(() => {
    if (entries.length === 0) return null;
    // Sort by timestamp descending and get the most recent
    const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);
    return sortedEntries[0];
  }, [entries]);

  // Calculate growth area values from mood data
  const growthAreas = useMemo(() => {
    if (entries.length === 0) {
      // Default values when no data
      return growthAreaLabels.map(area => ({
        ...area,
        value: 0,
        color: '#9EB567',
      }));
    }

    // Get entries from last 30 days
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const recentEntries = entries.filter((e: MoodEntry) => e.timestamp > thirtyDaysAgo);

    // Calculate average mood score (1-5 scale)
    const avgMoodScore = recentEntries.length > 0
      ? recentEntries.reduce((sum: number, e: MoodEntry) => sum + moodLevelValues[e.name], 0) / recentEntries.length
      : 0;

    // Count positive moods (Good or Great)
    const positiveMoods = recentEntries.filter((e: MoodEntry) =>
      e.name === 'Good' || e.name === 'Great'
    ).length;

    // Count total days logged in last 30 days
    const daysLogged = recentEntries.length;
    const maxDays = 30;

    // Count entries with reasons (self-awareness)
    const entriesWithReasons = recentEntries.filter((e: MoodEntry) =>
      e.reasons && e.reasons.length > 0
    ).length;

    // Count entries with social-related tags (relationships)
    const socialTags = ['Family', 'Friends', 'Partner', 'Social', 'Love', 'Support'];
    const socialEntries = recentEntries.filter((e: MoodEntry) =>
      (e.reasons || []).some((r: string) => socialTags.some(t => r.toLowerCase().includes(t.toLowerCase()))) ||
      (e.feelings || []).some((f: string) => socialTags.some(t => f.toLowerCase().includes(t.toLowerCase())))
    ).length;

    // Count entries with growth-related tags
    const growthTags = ['Growth', 'Learning', 'Progress', 'Goal', 'Achievement', 'Productive'];
    const growthEntries = recentEntries.filter((e: MoodEntry) =>
      (e.reasons || []).some((r: string) => growthTags.some(t => r.toLowerCase().includes(t.toLowerCase()))) ||
      (e.feelings || []).some((f: string) => growthTags.some(t => f.toLowerCase().includes(t.toLowerCase())))
    ).length;

    // Calculate scores (0-100)
    const mentalHealthScore = Math.min(100, Math.round((avgMoodScore / 5) * 80 + (positiveMoods / Math.max(1, daysLogged)) * 20));
    const growthMindsetScore = Math.min(100, Math.round((growthEntries / Math.max(1, daysLogged)) * 60 + (daysLogged / maxDays) * 40));
    const relationshipsScore = Math.min(100, Math.round((socialEntries / Math.max(1, daysLogged)) * 70 + (positiveMoods / Math.max(1, daysLogged)) * 30));
    const personalDevScore = Math.min(100, Math.round((daysLogged / maxDays) * 50 + (entriesWithReasons / Math.max(1, daysLogged)) * 50));
    const selfAwarenessScore = Math.min(100, Math.round((entriesWithReasons / Math.max(1, daysLogged)) * 60 + (daysLogged / maxDays) * 40));
    const stressManagementScore = Math.min(100, Math.round((avgMoodScore / 5) * 50 + ((maxDays - Math.min(maxDays, entries.filter((e: MoodEntry) => e.name === 'Bad' || e.name === 'Not Good').length)) / maxDays) * 50));

    return [
      { id: '1', label: 'Mental Health', value: mentalHealthScore, color: '#9EB567' },
      { id: '2', label: 'Growth Mindset', value: growthMindsetScore, color: '#9EB567' },
      { id: '3', label: 'Relationships', value: relationshipsScore, color: '#9EB567' },
      { id: '4', label: 'Personal Development', value: personalDevScore, color: '#9EB567' },
      { id: '5', label: 'Self-awareness', value: selfAwarenessScore, color: '#9EB567' },
      { id: '6', label: 'Stress Management', value: stressManagementScore, color: '#9EB567' },
    ];
  }, [entries]);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Navigation handlers
  const handleViewMoodHistory = () => {
    navigation.navigate('MoodHistory');
  };

  const handleViewMoodCalendar = () => {
    navigation.navigate('MoodCalendar');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={assets.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Insights
          </Text>
          <TouchableOpacity style={styles.headerButton}>
            <Image
              source={assets.menu}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Growth Area Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Growth Area
          </Text>
          <View style={styles.growthGrid}>
            {growthAreas.map((area) => (
              <CircularProgress
                key={area.id}
                value={area.value}
                label={area.label}
                color={area.color}
                size={PROGRESS_SIZE - 16}
              />
            ))}
          </View>
        </View>

        {/* Mood Tracker Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Mood Tracker
            </Text>
            <TouchableOpacity onPress={handleViewMoodHistory}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {/* Period Tabs */}
          <View style={[styles.periodTabs, { backgroundColor: colors.background.secondary }]}>
            {periodTabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.periodTab,
                  activePeriod === tab.id && styles.periodTabActive,
                ]}
                onPress={() => setActivePeriod(tab.id)}
              >
                <Text
                  style={[
                    styles.periodTabText,
                    { color: activePeriod === tab.id ? '#FFFFFF' : colors.text.secondary },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Mood Chart - Real Data */}
          <View style={[styles.chartCard, { backgroundColor: colors.background.card }]}>
            {entries.length > 0 ? (
              <MiniBarChart data={currentChartData} />
            ) : (
              <View style={styles.emptyChartContainer}>
                <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                  No mood data yet
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.text.secondary }]}>
                  Start tracking your mood to see trends
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Mood Calendar Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Mood Calendar
            </Text>
            <TouchableOpacity onPress={handleViewMoodCalendar}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {/* Calendar - Real Data */}
          <TouchableOpacity
            style={[styles.calendarCard, { backgroundColor: colors.background.card }]}
            onPress={handleViewMoodCalendar}
            activeOpacity={0.8}
          >
            <MiniCalendar
              moodData={calendarMoodData}
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          </TouchableOpacity>
        </View>

        {/* Recent Mood Entry Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Recent Mood Entry
          </Text>

          {recentMoodEntry ? (
            <View style={[styles.moodEntryCard, { backgroundColor: colors.background.card }]}>
              <View style={styles.moodEntryHeader}>
                <Image
                  source={
                    recentMoodEntry.name === 'Bad' ? assets.moodBad :
                    recentMoodEntry.name === 'Not Good' ? assets.moodNotGood :
                    recentMoodEntry.name === 'Okay' ? assets.moodOkay :
                    recentMoodEntry.name === 'Good' ? assets.moodGood :
                    assets.moodGreat
                  }
                  style={styles.moodEmoji}
                />
                <View style={styles.moodEntryInfo}>
                  <Text style={[styles.moodEntryMood, { color: moodColors[recentMoodEntry.name] }]}>
                    {recentMoodEntry.name}
                  </Text>
                  <Text style={[styles.moodEntryDate, { color: colors.text.secondary }]}>
                    {formatDate(recentMoodEntry.date)}
                  </Text>
                </View>
              </View>

              {/* Tags from reasons and feelings */}
              <View style={styles.tagsContainer}>
                {[...recentMoodEntry.reasons, ...recentMoodEntry.feelings].slice(0, 6).map((tag, index) => (
                  <View
                    key={index}
                    style={[styles.tag, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Note preview if available */}
              {recentMoodEntry.notes && (
                <Text
                  style={[styles.moodNote, { color: colors.text.secondary }]}
                  numberOfLines={2}
                >
                  "{recentMoodEntry.notes}"
                </Text>
              )}
            </View>
          ) : (
            <View style={[styles.moodEntryCard, { backgroundColor: colors.background.card }]}>
              <View style={styles.emptyMoodEntry}>
                <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                  No mood entries yet
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.text.secondary }]}>
                  Check in with your mood to start tracking
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLogo: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerButton: {
    padding: 4,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },

  // Section
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9EB567',
  },

  // Growth Area Grid
  growthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  progressContainer: {
    alignItems: 'center',
    width: PROGRESS_SIZE - 16,
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },

  // Period Tabs
  periodTabs: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  periodTabActive: {
    backgroundColor: '#9EB567',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Chart Card
  chartCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartImage: {
    width: '100%',
    height: 200,
  },

  // Calendar Card
  calendarCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarImage: {
    width: '100%',
    height: 300,
  },

  // Mood Entry Card
  moodEntryCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  moodEntryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodEmoji: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  moodEntryInfo: {
    flex: 1,
  },
  moodEntryMood: {
    fontSize: 18,
    fontWeight: '600',
  },
  moodEntryDate: {
    fontSize: 13,
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9EB567',
  },

  // Mini Chart Styles
  miniChartContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  emptyChartContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
  },

  // Mini Calendar Styles
  miniCalendarContainer: {
    paddingHorizontal: 4,
  },
  miniCalendarHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  miniCalendarWeekday: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
  },
  miniCalendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  miniCalendarCell: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  miniCalendarDay: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
  },
  miniCalendarDayToday: {
    color: '#9EB567',
    fontWeight: '700',
  },
  moodDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },

  // Empty Mood Entry
  emptyMoodEntry: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  // Mood Note Preview
  moodNote: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 12,
    lineHeight: 18,
  },
});

export default InsightsScreen;
