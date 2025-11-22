/**
 * MoodCalendar Component
 * Monthly calendar view with mood indicators
 * Reference: Figma screen 101-light-insights-mood-calendar.png
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import type { MoodType } from '../types';

export interface MoodCalendarEntry {
  date: Date;
  mood: MoodType;
}

export interface MoodCalendarProps {
  entries: MoodCalendarEntry[];
  onDatePress?: (date: Date, entry?: MoodCalendarEntry) => void;
  selectedDate?: Date;
}

const moodColors: Record<MoodType, string> = {
  'very-happy': theme.colors.mood['very-happy'],
  'happy': theme.colors.mood.happy,
  'neutral': theme.colors.mood.neutral,
  'sad': theme.colors.mood.sad,
  'very-sad': theme.colors.mood['very-sad'],
  'anxious': theme.colors.mood.anxious,
  'calm': theme.colors.mood.calm,
  'energetic': theme.colors.mood.energetic,
  'tired': theme.colors.mood.tired,
};

const moodEmojis: Record<MoodType, string> = {
  'very-happy': '😄',
  'happy': '😊',
  'neutral': '😐',
  'sad': '😔',
  'very-sad': '😭',
  'anxious': '😰',
  'calm': '😌',
  'energetic': '⚡',
  'tired': '😴',
};

export function MoodCalendar({ entries, onDatePress, selectedDate }: MoodCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getMoodForDate = (date: Date): MoodCalendarEntry | undefined => {
    return entries.find((entry) => isSameDay(entry.date, date));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: JSX.Element[] = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const moodEntry = getMoodForDate(date);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isToday = isSameDay(date, new Date());

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isToday && styles.todayCell,
            isSelected && styles.selectedCell,
          ]}
          onPress={() => onDatePress?.(date, moodEntry)}
        >
          <Text
            style={[
              styles.dayNumber,
              isToday && styles.todayText,
              isSelected && styles.selectedText,
            ]}
          >
            {day}
          </Text>
          {moodEntry && (
            <View
              style={[
                styles.moodIndicator,
                { backgroundColor: moodColors[moodEntry.mood] },
              ]}
            >
              <Text style={styles.moodEmoji}>{moodEmojis[moodEntry.mood]}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      {/* Month Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>{monthName}</Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Day Headers */}
      <View style={styles.weekRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <View key={day} style={styles.dayHeader}>
            <Text style={styles.dayHeaderText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendar}>{renderCalendarDays()}</View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Mood Legend</Text>
        <View style={styles.legendGrid}>
          {Object.entries(moodEmojis).slice(0, 5).map(([mood, emoji]) => (
            <View key={mood} style={styles.legendItem}>
              <View
                style={[
                  styles.legendIndicator,
                  { backgroundColor: moodColors[mood as MoodType] },
                ]}
              >
                <Text style={styles.legendEmoji}>{emoji}</Text>
              </View>
              <Text style={styles.legendText}>
                {mood.charAt(0).toUpperCase() + mood.slice(1).replace('-', ' ')}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.light,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },

  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.base,
    backgroundColor: theme.colors.background.secondary,
  },

  navButtonText: {
    fontSize: 24,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },

  monthTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
  },

  weekRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },

  dayHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },

  dayHeaderText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },

  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dayCell: {
    width: '14.285%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    position: 'relative',
  },

  todayCell: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.base,
  },

  selectedCell: {
    backgroundColor: theme.colors.primary.DEFAULT,
    borderRadius: theme.borderRadius.base,
  },

  dayNumber: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },

  todayText: {
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
  },

  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  moodIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  moodEmoji: {
    fontSize: 12,
  },

  legend: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },

  legendTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    width: '48%',
  },

  legendIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  legendEmoji: {
    fontSize: 10,
  },

  legendText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
});
