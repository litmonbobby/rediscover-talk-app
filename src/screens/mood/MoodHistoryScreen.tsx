/**
 * Mood History Screen - Functional with Real Data
 * Shows mood tracking history, trends chart, and mood entries from store
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
import Svg, { Path, Rect, Line, G, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { useMoodStore, MoodEntry as StoreMoodEntry, MoodName } from '../../store/moodStore';

const { width } = Dimensions.get('window');

type MoodHistoryStackParamList = {
  MoodHistory: undefined;
  MoodCheckIn: undefined;
  MoodCalendar: undefined;
};

type NavigationProp = NativeStackNavigationProp<MoodHistoryStackParamList, 'MoodHistory'>;

// Figma-extracted assets
const assets = {
  logo: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-category.png'),
  arrowLeft: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-left.png'),
  calendar: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-calendar.png'),
  moodBad: require('../../figma-extracted/assets/components/mood-indicators/mood-bad-component-mood-indicator.png'),
  moodNotGood: require('../../figma-extracted/assets/components/mood-indicators/mood-not-good-component-mood-indicator.png'),
  moodOkay: require('../../figma-extracted/assets/components/mood-indicators/mood-okay-component-mood-indicator.png'),
  moodGood: require('../../figma-extracted/assets/components/mood-indicators/mood-good-component-mood-indicator.png'),
  moodGreat: require('../../figma-extracted/assets/components/mood-indicators/mood-great-component-mood-indicator.png'),
};

// Period tabs
const periodTabs = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

// Mood types
type MoodType = 'bad' | 'notGood' | 'okay' | 'good' | 'great';

// Display entry format (formatted from store entry)
interface DisplayEntry {
  id: string;
  mood: MoodType;
  moodLabel: string;
  date: string;
  time: string;
  tags: string[];
  note?: string;
}

// Mood level to value mapping for chart
const moodLevelValues: Record<MoodName, number> = {
  'Bad': 1,
  'Not Good': 2,
  'Okay': 3,
  'Good': 4,
  'Great': 5,
};

// Convert MoodName to MoodType for display
const moodNameToType = (name: MoodName): MoodType => {
  const mapping: Record<MoodName, MoodType> = {
    'Bad': 'bad',
    'Not Good': 'notGood',
    'Okay': 'okay',
    'Good': 'good',
    'Great': 'great',
  };
  return mapping[name];
};

// Mood image mapping
const moodImages: Record<MoodType, any> = {
  bad: assets.moodBad,
  notGood: assets.moodNotGood,
  okay: assets.moodOkay,
  good: assets.moodGood,
  great: assets.moodGreat,
};

// Mood color mapping
const moodColors: Record<MoodType, string> = {
  bad: '#FF6B6B',
  notGood: '#FFA06B',
  okay: '#FFD36B',
  good: '#9EB567',
  great: '#6BCB77',
};

// Back Arrow Icon
const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Mini Area Chart Component
interface MiniAreaChartProps {
  data: { value: number; color: string }[];
}

const MiniAreaChart: React.FC<MiniAreaChartProps> = ({ data }) => {
  const chartWidth = width - 40;
  const chartHeight = 150;
  const padding = 20;
  const graphWidth = chartWidth - padding * 2;
  const graphHeight = chartHeight - padding * 2;
  const maxValue = 5;

  if (data.length === 0) return null;

  // Create path for area chart
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * graphWidth;
    const y = chartHeight - padding - (item.value / maxValue) * graphHeight;
    return { x, y, color: item.color };
  });

  // Create line path
  const linePath = points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${path} L ${point.x} ${point.y}`;
  }, '');

  // Create area path (close to bottom)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Grid lines */}
        {[1, 2, 3, 4, 5].map((level) => (
          <Line
            key={level}
            x1={padding}
            y1={chartHeight - padding - (level / maxValue) * graphHeight}
            x2={chartWidth - padding}
            y2={chartHeight - padding - (level / maxValue) * graphHeight}
            stroke="#E8E8E8"
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}

        {/* Area fill */}
        <Path d={areaPath} fill="rgba(158, 181, 103, 0.2)" />

        {/* Line */}
        <Path d={linePath} fill="none" stroke="#9EB567" strokeWidth={2} strokeLinecap="round" />

        {/* Points */}
        {points.map((point, index) => (
          <G key={index}>
            <Rect
              x={point.x - 4}
              y={point.y - 4}
              width={8}
              height={8}
              rx={4}
              fill={point.color}
            />
          </G>
        ))}
      </Svg>
    </View>
  );
};

export const MoodHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [activePeriod, setActivePeriod] = useState('weekly');

  // Get mood data from store
  const { entries, stats, initialize, isInitialized } = useMoodStore();

  // Initialize store on mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized]);

  // Get chart data based on period
  const chartData = useMemo(() => {
    const now = new Date();
    let daysToShow = 7;

    if (activePeriod === 'monthly') daysToShow = 30;
    if (activePeriod === 'yearly') daysToShow = 365;

    const data: { value: number; color: string }[] = [];

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const entry = entries.find((e: StoreMoodEntry) => e.date === dateStr);

      if (entry) {
        data.push({
          value: moodLevelValues[entry.name],
          color: moodColors[moodNameToType(entry.name)],
        });
      }
    }

    return data;
  }, [entries, activePeriod]);

  // Format entry for display
  const formatEntryForDisplay = (entry: StoreMoodEntry): DisplayEntry => {
    const entryDate = new Date(entry.date + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let dateLabel = entryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (entry.date === today.toISOString().split('T')[0]) dateLabel = 'Today';
    else if (entry.date === yesterday.toISOString().split('T')[0]) dateLabel = 'Yesterday';

    const time = new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return {
      id: entry.id,
      mood: moodNameToType(entry.name),
      moodLabel: entry.name,
      date: dateLabel,
      time,
      tags: [...entry.reasons, ...entry.feelings].slice(0, 4),
      note: entry.notes,
    };
  };

  // Get sorted entries (most recent first)
  const sortedEntries = useMemo(() => {
    return [...entries]
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(formatEntryForDisplay);
  }, [entries]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCalendar = () => {
    navigation.navigate('MoodCalendar');
  };

  const handleAddMood = () => {
    navigation.navigate('MoodCheckIn');
  };

  const renderMoodEntry = (entry: DisplayEntry) => (
    <View
      key={entry.id}
      style={[styles.moodEntryCard, { backgroundColor: colors.background.card }]}
    >
      <View style={styles.moodEntryLeft}>
        <Image source={moodImages[entry.mood]} style={styles.moodImage} resizeMode="contain" />
      </View>
      <View style={styles.moodEntryContent}>
        <View style={styles.moodEntryHeader}>
          <Text style={[styles.moodLabel, { color: moodColors[entry.mood] }]}>
            {entry.moodLabel}
          </Text>
          <Text style={[styles.moodTime, { color: colors.text.secondary }]}>
            {entry.date} • {entry.time}
          </Text>
        </View>
        <View style={styles.tagsContainer}>
          {entry.tags.map((tag, index) => (
            <View
              key={index}
              style={[styles.tag, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

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
          <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
            <BackIcon size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Mood History
          </Text>
          <TouchableOpacity style={styles.headerButton} onPress={handleCalendar}>
            <Image
              source={assets.calendar}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
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

        {/* Mood Trends Chart Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Mood Trends
            </Text>
          </View>
          <View style={[styles.chartCard, { backgroundColor: colors.background.card }]}>
            {chartData.length > 0 ? (
              <MiniAreaChart data={chartData} />
            ) : (
              <View style={styles.emptyChart}>
                <Text style={[styles.emptyChartText, { color: colors.text.secondary }]}>
                  No mood data for this period
                </Text>
                <Text style={[styles.emptyChartSubtext, { color: colors.text.secondary }]}>
                  Log your moods to see trends here
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Average Mood Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
            <Text style={[styles.statValue, { color: '#9EB567' }]}>
              {stats.averageMood ? stats.averageMood.toFixed(1) : '--'}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Average Mood</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
            <Text style={[styles.statValue, { color: '#9EB567' }]}>{stats.totalEntries}</Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Total Entries</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
            <Text style={[styles.statValue, { color: '#9EB567' }]}>{stats.currentStreak}</Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Day Streak</Text>
          </View>
        </View>

        {/* Mood Entries List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Recent Entries
            </Text>
            <TouchableOpacity onPress={handleCalendar}>
              <Text style={styles.viewAllText}>Calendar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.entriesList}>
            {sortedEntries.length > 0 ? (
              sortedEntries.slice(0, 10).map(renderMoodEntry)
            ) : (
              <View style={[styles.emptyCard, { backgroundColor: colors.background.card }]}>
                <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                  No mood entries yet
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.text.secondary }]}>
                  Tap + to log your first mood
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating Add Mood Button */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={handleAddMood}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },

  // Period Tabs
  periodTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    padding: 4,
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

  // Section
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9EB567',
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
    height: 180,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
  },

  // Entries List
  entriesList: {
    gap: 12,
  },
  moodEntryCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  moodEntryLeft: {
    marginRight: 14,
  },
  moodImage: {
    width: 48,
    height: 48,
  },
  moodEntryContent: {
    flex: 1,
  },
  moodEntryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  moodTime: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9EB567',
  },

  // Empty States
  emptyChart: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChartText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  emptyChartSubtext: {
    fontSize: 14,
  },
  emptyCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
  },

  // FAB Button
  fabButton: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9EB567',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9EB567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    lineHeight: 34,
  },
});

export default MoodHistoryScreen;
