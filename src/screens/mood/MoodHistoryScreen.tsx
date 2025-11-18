import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type MoodType = 'amazing' | 'good' | 'okay' | 'bad' | 'terrible';

interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
}

// Mock data - will be replaced with Supabase data
const mockMoodData: MoodEntry[] = [
  { date: '2025-01-15', mood: 'amazing', note: 'Great meditation session!' },
  { date: '2025-01-14', mood: 'good' },
  { date: '2025-01-13', mood: 'okay', note: 'Feeling neutral today' },
  { date: '2025-01-12', mood: 'bad' },
  { date: '2025-01-11', mood: 'good' },
  { date: '2025-01-10', mood: 'amazing' },
  { date: '2025-01-09', mood: 'okay' },
  { date: '2025-01-08', mood: 'good' },
];

const moodEmojis: Record<MoodType, string> = {
  amazing: '😄',
  good: '😊',
  okay: '😐',
  bad: '😔',
  terrible: '😢',
};

const moodColors: Record<MoodType, string> = {
  amazing: colors.mood.happy,
  good: colors.mood.good,
  okay: colors.mood.neutral,
  bad: colors.mood.sad,
  terrible: colors.mood.veryBad,
};

export const MoodHistoryScreen = ({ navigation }: any) => {
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getMoodStats = () => {
    const total = mockMoodData.length;
    const moodCounts = mockMoodData.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<MoodType, number>);

    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood: mood as MoodType,
      percentage: Math.round((count / total) * 100),
    }));
  };

  return (
    <LinearGradient
      colors={[colors.primary.cobaltBlue, colors.primary.deepBlue]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Mood History</Text>
          <Text style={styles.subtitle}>Track your emotional journey</Text>
        </View>

        {/* Mood Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Mood This Week</Text>
          <View style={styles.statsGrid}>
            {getMoodStats().map((stat) => (
              <View key={stat.mood} style={styles.statItem}>
                <Text style={styles.statEmoji}>{moodEmojis[stat.mood]}</Text>
                <View style={styles.statBar}>
                  <View
                    style={[
                      styles.statBarFill,
                      { width: `${stat.percentage}%`, backgroundColor: moodColors[stat.mood] },
                    ]}
                  />
                </View>
                <Text style={styles.statPercentage}>{stat.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Calendar View */}
        <View style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          {mockMoodData.map((entry, index) => (
            <TouchableOpacity
              key={`${entry.date}-${index}`}
              style={styles.entryCard}
              onPress={() => setSelectedEntry(entry)}
              activeOpacity={0.7}
            >
              <View style={styles.entryLeft}>
                <View
                  style={[
                    styles.entryMoodCircle,
                    { backgroundColor: moodColors[entry.mood] },
                  ]}
                >
                  <Text style={styles.entryEmoji}>{moodEmojis[entry.mood]}</Text>
                </View>
                <View style={styles.entryInfo}>
                  <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                  {entry.note && (
                    <Text style={styles.entryNote} numberOfLines={1}>
                      {entry.note}
                    </Text>
                  )}
                </View>
              </View>
              <Text style={styles.entryArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {mockMoodData.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📊</Text>
            <Text style={styles.emptyTitle}>No mood entries yet</Text>
            <Text style={styles.emptySubtitle}>
              Start tracking your mood to see your emotional patterns
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('MoodCheckIn')}
            >
              <LinearGradient
                colors={[colors.accent.lime, colors.accent.brightLime]}
                style={styles.emptyButtonGradient}
              >
                <Text style={styles.emptyButtonText}>Check In Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    ...typography.h2,
    color: colors.text.primary,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  statsTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    gap: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statEmoji: {
    fontSize: 24,
    width: 32,
  },
  statBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: spacing.borderRadius.sm,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: spacing.borderRadius.sm,
  },
  statPercentage: {
    ...typography.caption,
    color: colors.text.secondary,
    width: 40,
    textAlign: 'right',
  },
  calendarContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  entryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  entryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  entryMoodCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  entryEmoji: {
    fontSize: 24,
  },
  entryInfo: {
    flex: 1,
  },
  entryDate: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  entryNote: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  entryArrow: {
    ...typography.h2,
    color: colors.text.tertiary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyButton: {
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  emptyButtonText: {
    ...typography.button,
    color: colors.primary.cobaltBlue,
  },
});
