import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

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
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary
          }]}>
            Mood History
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Track your emotional journey
          </Text>
        </Animated.View>

        {/* Streak Card */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={[styles.streakCard, {
            backgroundColor: colors.primary.main,
            borderRadius: borderRadius.xl,
            ...shadows.lg
          }]}
        >
          <Text style={[styles.streakNumber, {
            color: colors.text.inverse,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: typography.fontWeight.bold
          }]}>
            7
          </Text>
          <Text style={[styles.streakLabel, {
            color: colors.text.inverse,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.semibold
          }]}>
            Day Streak
          </Text>
        </Animated.View>

        {/* Mood Entries */}
        <View style={styles.entriesSection}>
          {MOCK_MOOD_HISTORY.map((entry, index) => (
            <Animated.View
              key={entry.id}
              entering={FadeInUp.delay(300 + index * 50).springify()}
              style={[styles.entryCard, {
                backgroundColor: colors.background.card,
                borderColor: colors.border.light,
                borderRadius: borderRadius.lg,
                ...shadows.sm
              }]}
            >
              <View style={styles.entryHeader}>
                <View style={styles.entryMood}>
                  <Text style={styles.entryEmoji}>{entry.emoji}</Text>
                  <View>
                    <Text style={[styles.entryLabel, {
                      color: colors.text.primary,
                      fontFamily: typography.fontFamily.primary,
                      fontWeight: typography.fontWeight.semibold
                    }]}>
                      {entry.label}
                    </Text>
                    <Text style={[styles.entryTime, {
                      color: colors.text.tertiary,
                      fontFamily: typography.fontFamily.primary
                    }]}>
                      {entry.date} at {entry.time}
                    </Text>
                  </View>
                </View>
              </View>
              {entry.note && (
                <Text style={[styles.entryNote, {
                  color: colors.text.secondary,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  {entry.note}
                </Text>
              )}
            </Animated.View>
          ))}
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
  header: {
    padding: 20,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  streakCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 48,
    marginBottom: 8,
  },
  streakLabel: {
    fontSize: 20,
  },
  entriesSection: {
    padding: 20,
    paddingTop: 0,
  },
  entryCard: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  entryHeader: {
    marginBottom: 8,
  },
  entryMood: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  entryLabel: {
    fontSize: 16,
  },
  entryTime: {
    fontSize: 12,
    marginTop: 2,
  },
  entryNote: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
