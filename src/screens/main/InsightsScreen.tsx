/**
 * InsightsScreen
 * Mood analytics, calendar, and insights
 * Reference: Figma screen 99-light-insights.png
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../theme';
import { MoodHistory, type MoodEntry } from '../../components';

// Sample data for demonstration
const sampleMoodEntries: MoodEntry[] = [
  {
    id: '1',
    mood: 'happy',
    note: 'Had a great workout this morning! Feeling energized and positive.',
    tags: ['🏋️ Exercise', '😴 Sleep'],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    mood: 'neutral',
    note: 'Just a regular day at work.',
    tags: ['💼 Work'],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: '3',
    mood: 'calm',
    note: 'Meditation session was really helpful today.',
    tags: ['🎯 Goals'],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    mood: 'energetic',
    note: 'Got a lot done today! Feeling productive.',
    tags: ['💼 Work', '🎯 Goals'],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000), // 1 day 3 hours ago
  },
];

export function InsightsScreen() {
  const [moodEntries] = useState<MoodEntry[]>(sampleMoodEntries);

  const handleEntryPress = (entry: MoodEntry) => {
    // TODO: Navigate to mood entry detail or edit screen
    console.log('Entry pressed:', entry);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Insights</Text>
        <Text style={styles.subtitle}>
          Track your mood patterns and wellness journey
        </Text>
      </View>

      <MoodHistory entries={moodEntries} onEntryPress={handleEntryPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  header: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
});
