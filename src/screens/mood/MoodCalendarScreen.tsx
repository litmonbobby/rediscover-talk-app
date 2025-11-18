import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type MoodEntry = {
  date: number;
  mood: 1 | 2 | 3 | 4 | 5;
  emoji: string;
  color: string;
};

export const MoodCalendarScreen = ({ navigation }: any) => {
  const [currentMonth] = useState(new Date());

  // Sample mood data - replace with real data
  const moodEntries: { [key: number]: MoodEntry } = {
    5: { date: 5, mood: 4, emoji: '😊', color: colors.mood.good },
    8: { date: 8, mood: 5, emoji: '😄', color: colors.mood.veryHappy },
    12: { date: 12, mood: 3, emoji: '😐', color: colors.mood.neutral },
    15: { date: 15, mood: 4, emoji: '😊', color: colors.mood.good },
    17: { date: 17, mood: 2, emoji: '😔', color: colors.mood.sad },
    20: { date: 20, mood: 5, emoji: '😄', color: colors.mood.veryHappy },
    23: { date: 23, mood: 4, emoji: '😊', color: colors.mood.good },
    25: { date: 25, mood: 3, emoji: '😐', color: colors.mood.neutral },
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get days in month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate average mood
  const moodValues = Object.values(moodEntries).map(e => e.mood);
  const avgMood = moodValues.length > 0
    ? (moodValues.reduce((a, b) => a + b, 0) / moodValues.length).toFixed(1)
    : '0.0';

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>Mood Calendar</Text>
            <Text style={styles.subtitle}>{monthName}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Stats Summary */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{moodValues.length}</Text>
            <Text style={styles.statLabel}>Entries</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{avgMood}</Text>
            <Text style={styles.statLabel}>Avg Mood</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendar}>
          {/* Week day headers */}
          <View style={styles.weekRow}>
            {weekDays.map((day) => (
              <View key={day} style={styles.weekDayCell}>
                <Text style={styles.weekDayText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar days */}
          <View style={styles.daysContainer}>
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.dayCell} />
            ))}

            {/* Actual days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const dayNumber = index + 1;
              const moodEntry = moodEntries[dayNumber];
              const isToday = dayNumber === new Date().getDate() &&
                             currentMonth.getMonth() === new Date().getMonth();

              return (
                <TouchableOpacity
                  key={dayNumber}
                  style={[
                    styles.dayCell,
                    isToday && styles.todayCell,
                  ]}
                  onPress={() => {
                    if (!moodEntry) {
                      navigation.navigate('MoodCheckIn');
                    }
                  }}
                >
                  <Text style={[
                    styles.dayNumber,
                    isToday && styles.todayText,
                  ]}>
                    {dayNumber}
                  </Text>
                  {moodEntry && (
                    <View style={[styles.moodDot, { backgroundColor: moodEntry.color }]}>
                      <Text style={styles.moodEmoji}>{moodEntry.emoji}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Mood Legend</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.mood.veryHappy }]} />
              <Text style={styles.legendText}>😄 Amazing</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.mood.good }]} />
              <Text style={styles.legendText}>😊 Good</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.mood.neutral }]} />
              <Text style={styles.legendText}>😐 Okay</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.mood.sad }]} />
              <Text style={styles.legendText}>😔 Bad</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.mood.veryBad }]} />
              <Text style={styles.legendText}>😢 Terrible</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingTop: spacing['4xl'],
  },
  backButton: {
    ...typography.h2,
    color: colors.text.primary,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  placeholder: {
    width: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: spacing.md,
    borderRadius: spacing.borderRadius.md,
    minWidth: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    ...typography.h2,
    color: colors.accent.lime,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  calendar: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  weekDayText: {
    ...typography.bodyBold,
    color: colors.text.secondary,
    fontSize: 12,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  todayCell: {
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
    borderRadius: spacing.borderRadius.sm,
  },
  dayNumber: {
    ...typography.body,
    color: colors.text.primary,
    fontSize: 12,
  },
  todayText: {
    color: colors.accent.lime,
    fontWeight: 'bold',
  },
  moodDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  moodEmoji: {
    fontSize: 16,
  },
  legend: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  legendTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  legendItems: {
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
