/**
 * MoodHistory Component
 * Timeline view of mood entries
 * Reference: Figma screen 100-light-insights-mood-history.png
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { Card } from './Card';
import type { MoodType } from '../types';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  note?: string;
  tags?: string[];
  timestamp: Date;
}

export interface MoodHistoryProps {
  entries: MoodEntry[];
  onEntryPress?: (entry: MoodEntry) => void;
}

const moodConfig: Record<MoodType, { emoji: string; label: string; color: string }> = {
  'very-happy': { emoji: '😄', label: 'Very Happy', color: theme.colors.mood['very-happy'] },
  'happy': { emoji: '😊', label: 'Happy', color: theme.colors.mood.happy },
  'neutral': { emoji: '😐', label: 'Neutral', color: theme.colors.mood.neutral },
  'sad': { emoji: '😔', label: 'Sad', color: theme.colors.mood.sad },
  'very-sad': { emoji: '😭', label: 'Very Sad', color: theme.colors.mood['very-sad'] },
  'anxious': { emoji: '😰', label: 'Anxious', color: theme.colors.mood.anxious },
  'calm': { emoji: '😌', label: 'Calm', color: theme.colors.mood.calm },
  'energetic': { emoji: '⚡', label: 'Energetic', color: theme.colors.mood.energetic },
  'tired': { emoji: '😴', label: 'Tired', color: theme.colors.mood.tired },
};

export function MoodHistory({ entries, onEntryPress }: MoodHistoryProps) {
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const groupEntriesByDate = (entries: MoodEntry[]) => {
    const groups: { [key: string]: MoodEntry[] } = {};

    entries.forEach((entry) => {
      const dateKey = entry.timestamp.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(entry);
    });

    return groups;
  };

  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📊</Text>
        <Text style={styles.emptyTitle}>No Mood Entries Yet</Text>
        <Text style={styles.emptyText}>
          Start tracking your mood to see your history here
        </Text>
      </View>
    );
  }

  const groupedEntries = groupEntriesByDate(entries);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {Object.entries(groupedEntries).map(([dateKey, dateEntries]) => (
        <View key={dateKey} style={styles.dateGroup}>
          <Text style={styles.dateHeader}>{dateKey}</Text>
          {dateEntries.map((entry) => {
            const config = moodConfig[entry.mood];
            return (
              <TouchableOpacity
                key={entry.id}
                onPress={() => onEntryPress?.(entry)}
                activeOpacity={0.7}
              >
                <Card variant="default" style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <View style={styles.moodInfo}>
                      <View
                        style={[
                          styles.moodIndicator,
                          { backgroundColor: config.color },
                        ]}
                      >
                        <Text style={styles.moodEmoji}>{config.emoji}</Text>
                      </View>
                      <View>
                        <Text style={styles.moodLabel}>{config.label}</Text>
                        <Text style={styles.timestamp}>{formatTime(entry.timestamp)}</Text>
                      </View>
                    </View>
                    <Text style={styles.timeAgo}>{formatDate(entry.timestamp)}</Text>
                  </View>

                  {entry.note && (
                    <Text style={styles.note} numberOfLines={2}>
                      {entry.note}
                    </Text>
                  )}

                  {entry.tags && entry.tags.length > 0 && (
                    <View style={styles.tagContainer}>
                      {entry.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    paddingBottom: theme.spacing.xl,
  },

  dateGroup: {
    marginBottom: theme.spacing.lg,
  },

  dateHeader: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.secondary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  entryCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },

  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },

  moodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  moodIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  moodEmoji: {
    fontSize: 24,
  },

  moodLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },

  timestamp: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },

  timeAgo: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  note: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },

  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },

  tag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
    backgroundColor: theme.colors.background.secondary,
  },

  tagText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
    paddingHorizontal: theme.spacing.lg,
  },

  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
  },

  emptyTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },

  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
