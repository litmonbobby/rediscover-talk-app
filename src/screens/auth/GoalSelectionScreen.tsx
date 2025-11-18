import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'GoalSelection'>;

const GOALS = [
  { id: '1', title: 'Reduce Stress', emoji: '😌' },
  { id: '2', title: 'Sleep Better', emoji: '😴' },
  { id: '3', title: 'Practice Mindfulness', emoji: '🧘' },
  { id: '4', title: 'Manage Anxiety', emoji: '💆' },
  { id: '5', title: 'Improve Mood', emoji: '😊' },
  { id: '6', title: 'Build Resilience', emoji: '💪' },
];

export const GoalSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary.DEFAULT, Colors.primary.light]}
        style={styles.header}
      >
        <Text style={styles.title}>What are your goals?</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.goalsGrid}>
          {GOALS.map(goal => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                onPress={() => toggleGoal(goal.id)}
              >
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <Text style={[styles.goalTitle, isSelected && styles.goalTitleSelected]}>
                  {goal.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, selectedGoals.length === 0 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.DEFAULT,
  },
  header: {
    paddingTop: Spacing['4xl'],
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  goalCard: {
    width: '47%',
    backgroundColor: Colors.background.paper,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background.light,
    ...Shadows.sm,
  },
  goalCardSelected: {
    borderColor: Colors.accent.DEFAULT,
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
  },
  goalEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  goalTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  goalTitleSelected: {
    color: Colors.primary.DEFAULT,
    fontWeight: Typography.fontWeight.bold,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },
  continueButton: {
    backgroundColor: Colors.accent.DEFAULT,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.md,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.background.light,
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.DEFAULT,
  },
});
