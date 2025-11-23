import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
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
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Animated.View
        entering={FadeInUp.delay(100).springify()}
        style={[styles.header, { backgroundColor: colors.primary.main }]}
      >
        <Text style={[styles.title, {
          color: colors.text.inverse,
          fontFamily: typography.fontFamily.secondary
        }]}>
          What are your goals?
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.text.inverse,
          fontFamily: typography.fontFamily.primary
        }]}>
          Select all that apply
        </Text>
      </Animated.View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Animated.View
          entering={FadeIn.delay(200).duration(500)}
          style={styles.goalsGrid}
        >
          {GOALS.map((goal, index) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <Animated.View
                key={goal.id}
                entering={FadeInUp.delay(300 + index * 50).springify()}
              >
                <TouchableOpacity
                  style={[
                    styles.goalCard,
                    {
                      backgroundColor: colors.background.card,
                      borderColor: isSelected ? colors.primary.main : colors.border.light,
                      borderRadius: borderRadius.lg,
                      ...shadows.sm
                    }
                  ]}
                  onPress={() => toggleGoal(goal.id)}
                >
                  <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                  <Text style={[styles.goalTitle, {
                    color: isSelected ? colors.primary.main : colors.text.primary,
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: isSelected ? typography.fontWeight.bold : typography.fontWeight.medium
                  }]}>
                    {goal.title}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.View>
      </ScrollView>

      <Animated.View
        entering={FadeInUp.delay(400).springify()}
        style={styles.footer}
      >
        <TouchableOpacity
          style={[styles.continueButton, {
            backgroundColor: selectedGoals.length === 0 ? colors.border.main : colors.primary.main,
            borderRadius: borderRadius.xl,
            opacity: selectedGoals.length === 0 ? 0.5 : 1,
            ...shadows.lg
          }]}
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
        >
          <Text style={[styles.continueButtonText, {
            color: colors.text.inverse,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.bold
          }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  goalCard: {
    width: '47%',
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
  },
  goalEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
  },
  continueButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
  },
});
