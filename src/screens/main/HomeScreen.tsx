/**
 * HomeScreen
 * Main home screen with mood tracking and daily tasks
 * Reference: Figma screens 35-light-home.png, 36-light-home-with-daily-task.png
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { theme } from '../../theme';
import { Card, Button } from '../../components';
import { MoodCheckInModal } from '../modals';
import type { MoodType } from '../../types';

export function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [tasksCompleted, setTasksCompleted] = useState<boolean[]>([false, false, false]);
  const [showMoodModal, setShowMoodModal] = useState(false);

  const moods: Array<{ emoji: string; label: string; value: MoodType }> = [
    { emoji: '😭', label: 'Very Sad', value: 'very-sad' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😄', label: 'Very Happy', value: 'very-happy' },
  ];

  const dailyTasks = [
    { id: '1', title: 'Morning Meditation', duration: '10 min', icon: '🧘' },
    { id: '2', title: 'Gratitude Journal', duration: '5 min', icon: '📝' },
    { id: '3', title: 'Breathing Exercise', duration: '5 min', icon: '🫁' },
  ];

  const handleMoodSelect = (moodValue: MoodType) => {
    setSelectedMood(moodValue);
    setShowMoodModal(true);
  };

  const handleMoodSubmit = (mood: MoodType, note?: string, tags?: string[]) => {
    setSelectedMood(mood);
    // TODO: Save mood entry to backend with note and tags
    console.log('Mood saved:', { mood, note, tags });
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasksCompleted];
    newTasks[index] = !newTasks[index];
    setTasksCompleted(newTasks);
    // TODO: Save task completion to backend
  };

  const completedCount = tasksCompleted.filter(Boolean).length;
  const allTasksComplete = completedCount === dailyTasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.username}>Welcome Back!</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Mood Check-In Card */}
        <Card style={styles.moodCard}>
          <Text style={styles.sectionTitle}>How are you feeling today?</Text>
          <View style={styles.moodGrid}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.value}
                style={[
                  styles.moodButton,
                  selectedMood === mood.value && styles.moodButtonActive,
                ]}
                onPress={() => handleMoodSelect(mood.value)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Daily Tasks Card */}
        <Card style={styles.tasksCard}>
          <View style={styles.tasksHeader}>
            <Text style={styles.sectionTitle}>Daily Wellness Tasks</Text>
            <View style={styles.progressBadge}>
              <Text style={styles.progressText}>
                {completedCount}/{dailyTasks.length}
              </Text>
            </View>
          </View>

          {dailyTasks.map((task, index) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskItem}
              onPress={() => toggleTask(index)}
            >
              <View style={styles.taskLeft}>
                <View
                  style={[
                    styles.checkbox,
                    tasksCompleted[index] && styles.checkboxChecked,
                  ]}
                >
                  {tasksCompleted[index] && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.taskIcon}>{task.icon}</Text>
                <View>
                  <Text
                    style={[
                      styles.taskTitle,
                      tasksCompleted[index] && styles.taskTitleCompleted,
                    ]}
                  >
                    {task.title}
                  </Text>
                  <Text style={styles.taskDuration}>{task.duration}</Text>
                </View>
              </View>
              <Text style={styles.taskArrow}>›</Text>
            </TouchableOpacity>
          ))}

          {allTasksComplete && (
            <View style={styles.congratsBanner}>
              <Text style={styles.congratsText}>
                🎉 Great job! You've completed all your daily tasks!
              </Text>
            </View>
          )}
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>🧘</Text>
              <Text style={styles.quickActionLabel}>Meditate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>📝</Text>
              <Text style={styles.quickActionLabel}>Journal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>💬</Text>
              <Text style={styles.quickActionLabel}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>😴</Text>
              <Text style={styles.quickActionLabel}>Sleep</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Recommendation */}
        <Card style={styles.recommendationCard}>
          <Text style={styles.recommendationTag}>Recommended for you</Text>
          <Text style={styles.recommendationTitle}>
            5-Minute Breathing Exercise
          </Text>
          <Text style={styles.recommendationDescription}>
            Calm your mind and reduce stress with this simple breathing technique
          </Text>
          <Button title="Start Now" onPress={() => {}} style={styles.startButton} />
        </Card>
      </ScrollView>

      {/* Mood Check-In Modal */}
      <MoodCheckInModal
        visible={showMoodModal}
        onClose={() => setShowMoodModal(false)}
        onSubmit={handleMoodSubmit}
        initialMood={selectedMood || undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },

  greeting: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },

  username: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xs,
  },

  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationIcon: {
    fontSize: 20,
  },

  moodCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },

  moodButton: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  moodButtonActive: {
    borderColor: theme.colors.primary.DEFAULT,
    backgroundColor: theme.colors.primary[50],
  },

  moodEmoji: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },

  moodLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  tasksCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },

  progressBadge: {
    backgroundColor: theme.colors.primary.DEFAULT,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
  },

  progressText: {
    ...theme.typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: theme.colors.primary.DEFAULT,
    borderColor: theme.colors.primary.DEFAULT,
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  taskIcon: {
    fontSize: 24,
  },

  taskTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },

  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.text.tertiary,
  },

  taskDuration: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  taskArrow: {
    fontSize: 24,
    color: theme.colors.text.tertiary,
  },

  congratsBanner: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.accent[50],
    borderRadius: theme.borderRadius.base,
    borderWidth: 1,
    borderColor: theme.colors.accent.DEFAULT,
  },

  congratsText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },

  quickActions: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  quickActionsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  quickActionCard: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },

  quickActionIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },

  quickActionLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
  },

  recommendationCard: {
    marginHorizontal: theme.spacing.lg,
  },

  recommendationTag: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },

  recommendationTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  recommendationDescription: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },

  startButton: {
    marginTop: theme.spacing.sm,
  },
});
