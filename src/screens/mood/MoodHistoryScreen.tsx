import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface MoodEntry {
  id: string;
  date: string;
  time: string;
  emoji: string;
  label: string;
  note?: string;
}

const MOCK_MOOD_HISTORY: MoodEntry[] = [
  { id: '1', date: 'Today', time: '2:30 PM', emoji: '😊', label: 'Good', note: 'Had a great meditation session' },
  { id: '2', date: 'Today', time: '9:00 AM', emoji: '😄', label: 'Amazing', note: 'Feeling energized!' },
  { id: '3', date: 'Yesterday', time: '8:00 PM', emoji: '😐', label: 'Okay' },
  { id: '4', date: 'Yesterday', time: '3:15 PM', emoji: '😊', label: 'Good' },
  { id: '5', date: 'Nov 16', time: '6:30 PM', emoji: '😔', label: 'Bad', note: 'Stressful day at work' },
  { id: '6', date: 'Nov 16', time: '11:00 AM', emoji: '😐', label: 'Okay' },
  { id: '7', date: 'Nov 15', time: '7:00 PM', emoji: '😊', label: 'Good' },
];

export const MoodHistoryScreen = () => {
  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Mood History</Text>
          <Text style={styles.subtitle}>Track your emotional journey</Text>
        </View>

        <View style={styles.streakCard}>
          <LinearGradient
            colors={[colors.accent.lime, colors.accent.brightLime]}
            style={styles.streakGradient}
          >
            <Text style={styles.streakNumber}>7</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </LinearGradient>
        </View>

        <View style={styles.entriesSection}>
          {MOCK_MOOD_HISTORY.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <View style={styles.entryMood}>
                  <Text style={styles.entryEmoji}>{entry.emoji}</Text>
                  <View>
                    <Text style={styles.entryLabel}>{entry.label}</Text>
                    <Text style={styles.entryTime}>{entry.date} at {entry.time}</Text>
                  </View>
                </View>
              </View>
              {entry.note && (
                <Text style={styles.entryNote}>{entry.note}</Text>
              )}
            </View>
          ))}
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
    padding: spacing.xl,
    paddingTop: spacing['4xl'],
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  streakCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  streakGradient: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.cobaltBlue,
    marginBottom: spacing.xs,
  },
  streakLabel: {
    ...typography.h2,
    color: colors.primary.cobaltBlue,
  },
  entriesSection: {
    padding: spacing.xl,
    paddingTop: 0,
  },
  entryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  entryHeader: {
    marginBottom: spacing.sm,
  },
  entryMood: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryEmoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  entryLabel: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  entryTime: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  entryNote: {
    ...typography.body,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
});
