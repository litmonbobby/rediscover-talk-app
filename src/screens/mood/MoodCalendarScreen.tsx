/**
 * Mood Calendar Screen - Exact Figma Recreation
 * Shows monthly calendar with mood indicators for each day
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
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { useMoodStore, MoodEntry, MoodName, MoodLevel } from '../../store/moodStore';

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 48) / 7; // 7 columns with padding

type MoodCalendarStackParamList = {
  MoodCalendar: undefined;
  MoodHistory: undefined;
  MoodCheckIn: undefined;
};

type NavigationProp = NativeStackNavigationProp<MoodCalendarStackParamList, 'MoodCalendar'>;

// Figma-extracted assets
const assets = {
  logo: require('../../../assets/icon.png'),
  arrowLeft: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-left.png'),
  arrowRight: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-right-2.png'),
  moodBad: require('../../figma-extracted/assets/components/mood-indicators/mood-bad-component-mood-indicator.png'),
  moodNotGood: require('../../figma-extracted/assets/components/mood-indicators/mood-not-good-component-mood-indicator.png'),
  moodOkay: require('../../figma-extracted/assets/components/mood-indicators/mood-okay-component-mood-indicator.png'),
  moodGood: require('../../figma-extracted/assets/components/mood-indicators/mood-good-component-mood-indicator.png'),
  moodGreat: require('../../figma-extracted/assets/components/mood-indicators/mood-great-component-mood-indicator.png'),
};

// Mood types
type MoodType = 'bad' | 'notGood' | 'okay' | 'good' | 'great' | null;

// Days of the week
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Mood image mapping
const moodImages: Record<Exclude<MoodType, null>, any> = {
  bad: assets.moodBad,
  notGood: assets.moodNotGood,
  okay: assets.moodOkay,
  good: assets.moodGood,
  great: assets.moodGreat,
};

// Mood color mapping
const moodColors: Record<Exclude<MoodType, null>, string> = {
  bad: '#FF6B6B',
  notGood: '#FFA06B',
  okay: '#FFD36B',
  good: '#9EB567',
  great: '#6BCB77',
};

// Convert MoodName to MoodType
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

// Chevron Icon for month navigation
const ChevronIcon: React.FC<{ direction: 'left' | 'right'; size?: number; color?: string }> = ({
  direction,
  size = 20,
  color = '#333',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d={direction === 'left' ? 'M15 18L9 12L15 6' : 'M9 18L15 12L9 6'}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MoodCalendarScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();

  // Get mood data from store
  const { entries, getMoodsByMonth, stats, initialize, isInitialized, addMoodForDate } = useMoodStore();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  // Initialize store on mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, []);

  // Get mood data for current month from store
  const moodData = useMemo(() => {
    const monthEntries = getMoodsByMonth(currentYear, currentMonth);
    const data: Record<number, MoodType> = {};

    monthEntries.forEach((entry: MoodEntry) => {
      const day = parseInt(entry.date.split('-')[2], 10);
      data[day] = moodNameToType(entry.name);
    });

    return data;
  }, [currentMonth, currentYear, entries]);

  // Get selected day entry for detailed view
  const selectedDayEntry = useMemo(() => {
    if (!selectedDay) return null;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    return entries.find((e: MoodEntry) => e.date === dateStr);
  }, [selectedDay, currentMonth, currentYear, entries]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
  };

  const handleAddMood = () => {
    navigation.navigate('MoodCheckIn');
  };

  // Handle tapping on a mood in the legend to add to selected day
  const handleLegendMoodPress = async (moodType: Exclude<MoodType, null>) => {
    if (!selectedDay) return;

    // Don't allow future dates
    const selectedDate = new Date(currentYear, currentMonth, selectedDay);
    if (selectedDate > today) return;

    // Map mood type to level and name
    const moodMapping: Record<Exclude<MoodType, null>, { level: MoodLevel; name: MoodName }> = {
      'bad': { level: 1, name: 'Bad' },
      'notGood': { level: 2, name: 'Not Good' },
      'okay': { level: 3, name: 'Okay' },
      'good': { level: 4, name: 'Good' },
      'great': { level: 5, name: 'Great' },
    };

    const { level, name } = moodMapping[moodType];
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

    await addMoodForDate(dateStr, level, name);
  };

  // Check if selected day allows mood editing (not in the future)
  const canEditSelectedDay = useMemo(() => {
    if (!selectedDay) return false;
    const selectedDate = new Date(currentYear, currentMonth, selectedDay);
    return selectedDate <= today;
  }, [selectedDay, currentMonth, currentYear]);

  // Get calendar data
  const getCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = getCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isToday = (day: number) => {
    const todayDate = new Date();
    return (
      day === todayDate.getDate() &&
      currentMonth === todayDate.getMonth() &&
      currentYear === todayDate.getFullYear()
    );
  };

  const selectedMood = selectedDay ? moodData[selectedDay] : null;

  // Format time from timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
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
          <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
            <BackIcon size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Mood Calendar
          </Text>
          <View style={styles.headerButton} />
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity style={styles.monthNavButton} onPress={handlePrevMonth}>
            <ChevronIcon direction="left" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.monthTitle, { color: colors.text.primary }]}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          <TouchableOpacity style={styles.monthNavButton} onPress={handleNextMonth}>
            <ChevronIcon direction="right" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Weekday Headers */}
        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((day) => (
            <View key={day} style={styles.weekdayCell}>
              <Text style={[styles.weekdayText, { color: colors.text.secondary }]}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={[styles.calendarCard, { backgroundColor: colors.background.card }]}>
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  day === selectedDay && styles.dayCellSelected,
                  day === selectedDay && { borderColor: '#9EB567' },
                ]}
                onPress={() => day && handleDayPress(day)}
                disabled={!day}
                activeOpacity={0.7}
              >
                {day !== null ? (
                  <>
                    <Text
                      style={[
                        styles.dayNumber,
                        { color: isToday(day) ? '#9EB567' : colors.text.primary },
                        isToday(day) && styles.dayNumberToday,
                      ]}
                    >
                      {day}
                    </Text>
                    {moodData[day] && (
                      <Image
                        source={moodImages[moodData[day]!]}
                        style={styles.dayMoodImage}
                        resizeMode="contain"
                      />
                    )}
                  </>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mood Legend */}
        <View style={styles.legendSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {selectedDay && canEditSelectedDay ? 'Tap a mood to log it' : 'Mood Legend'}
          </Text>
          <View style={styles.legendGrid}>
            {(['bad', 'notGood', 'okay', 'good', 'great'] as const).map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.legendItem,
                  selectedDay && canEditSelectedDay && styles.legendItemActive,
                  selectedMood === mood && styles.legendItemSelected,
                ]}
                onPress={() => handleLegendMoodPress(mood)}
                disabled={!selectedDay || !canEditSelectedDay}
                activeOpacity={0.7}
              >
                <Image
                  source={moodImages[mood]}
                  style={styles.legendMoodImage}
                  resizeMode="contain"
                />
                <Text style={[
                  styles.legendText,
                  { color: colors.text.secondary },
                  selectedMood === mood && styles.legendTextSelected,
                ]}>
                  {mood === 'notGood' ? 'Not Good' : mood.charAt(0).toUpperCase() + mood.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Day Detail */}
        {selectedDay && (
          <View style={styles.selectedDaySection}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              {monthNames[currentMonth]} {selectedDay}, {currentYear}
            </Text>
            <View style={[styles.selectedDayCard, { backgroundColor: colors.background.card }]}>
              {selectedMood ? (
                <View style={styles.selectedMoodContent}>
                  <Image
                    source={moodImages[selectedMood]}
                    style={styles.selectedMoodImage}
                    resizeMode="contain"
                  />
                  <View style={styles.selectedMoodInfo}>
                    <Text
                      style={[
                        styles.selectedMoodLabel,
                        { color: moodColors[selectedMood] },
                      ]}
                    >
                      {selectedMood === 'notGood' ? 'Not Good' : selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}
                    </Text>
                    <Text style={[styles.selectedMoodTime, { color: colors.text.secondary }]}>
                      {selectedDayEntry ? `Logged at ${formatTime(selectedDayEntry.timestamp)}` : 'Logged today'}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.noMoodContent}>
                  <Text style={[styles.noMoodText, { color: colors.text.secondary }]}>
                    No mood logged for this day
                  </Text>
                  {canEditSelectedDay && (
                    <Text style={[styles.noMoodHint, { color: colors.text.tertiary }]}>
                      {isToday(selectedDay)
                        ? 'Tap a mood above or use the button below'
                        : 'Tap a mood above to log it for this day'}
                    </Text>
                  )}
                  {isToday(selectedDay) && (
                    <TouchableOpacity
                      style={styles.logMoodButton}
                      onPress={handleAddMood}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.logMoodButtonText}>Log Full Mood</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Stats Summary */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Monthly Summary
          </Text>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
              <Text style={[styles.statValue, { color: '#9EB567' }]}>
                {Object.values(moodData).filter(m => m !== null).length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
                Days Logged
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
              <Text style={[styles.statValue, { color: '#9EB567' }]}>
                {stats.mostFrequentMood || 'N/A'}
              </Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
                Avg Mood
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
              <Text style={[styles.statValue, { color: '#9EB567' }]}>
                {Object.values(moodData).filter(m => m === 'good' || m === 'great').length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
                Good Days
              </Text>
            </View>
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

  // Month Navigation
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  monthNavButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  // Weekday Headers
  weekdayRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  weekdayCell: {
    width: CELL_SIZE,
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Calendar Card
  calendarCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: CELL_SIZE - 4,
    height: CELL_SIZE + 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayCellSelected: {
    backgroundColor: 'rgba(158, 181, 103, 0.1)',
    borderWidth: 2,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  dayNumberToday: {
    fontWeight: '700',
  },
  dayMoodImage: {
    width: 24,
    height: 24,
  },

  // Legend Section
  legendSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  legendGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
  },
  legendItemActive: {
    backgroundColor: 'rgba(158, 181, 103, 0.1)',
  },
  legendItemSelected: {
    backgroundColor: 'rgba(158, 181, 103, 0.25)',
    borderWidth: 2,
    borderColor: '#9EB567',
  },
  legendMoodImage: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '500',
  },
  legendTextSelected: {
    color: '#9EB567',
    fontWeight: '600',
  },

  // Selected Day Section
  selectedDaySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  selectedDayCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedMoodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedMoodImage: {
    width: 56,
    height: 56,
    marginRight: 16,
  },
  selectedMoodInfo: {
    flex: 1,
  },
  selectedMoodLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedMoodTime: {
    fontSize: 14,
  },
  noMoodContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  noMoodText: {
    fontSize: 14,
    marginBottom: 8,
  },
  noMoodHint: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  logMoodButton: {
    backgroundColor: '#9EB567',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  logMoodButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Stats Section
  statsSection: {
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
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

export default MoodCalendarScreen;
