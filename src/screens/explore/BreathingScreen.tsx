/**
 * BreathingScreen
 * Browse and practice breathing exercises
 * Reference: Figma screen 54-light-explore-breathing.png
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { Card } from '../../components';

interface BreathingExercise {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  technique: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  breathPattern: {
    inhale: number;
    hold: number;
    exhale: number;
    pause: number;
  };
}

const breathingExercises: BreathingExercise[] = [
  {
    id: '1',
    title: 'Box Breathing',
    description: 'Equal parts breathing for calm and focus',
    duration: 5,
    technique: '4-4-4-4',
    difficulty: 'beginner',
    benefits: ['Reduces stress', 'Improves focus', 'Calms nervous system'],
    breathPattern: {
      inhale: 4,
      hold: 4,
      exhale: 4,
      pause: 4,
    },
  },
  {
    id: '2',
    title: '4-7-8 Breathing',
    description: 'Natural tranquilizer for the nervous system',
    duration: 3,
    technique: '4-7-8',
    difficulty: 'beginner',
    benefits: ['Promotes sleep', 'Reduces anxiety', 'Manages cravings'],
    breathPattern: {
      inhale: 4,
      hold: 7,
      exhale: 8,
      pause: 0,
    },
  },
  {
    id: '3',
    title: 'Alternate Nostril',
    description: 'Balance your energy and calm your mind',
    duration: 10,
    technique: 'Nadi Shodhana',
    difficulty: 'intermediate',
    benefits: ['Balances energy', 'Clears mind', 'Reduces stress'],
    breathPattern: {
      inhale: 4,
      hold: 4,
      exhale: 4,
      pause: 0,
    },
  },
  {
    id: '4',
    title: 'Resonant Breathing',
    description: 'Maximize heart rate variability',
    duration: 10,
    technique: '5-5',
    difficulty: 'beginner',
    benefits: ['Improves HRV', 'Reduces stress', 'Enhances wellbeing'],
    breathPattern: {
      inhale: 5,
      hold: 0,
      exhale: 5,
      pause: 0,
    },
  },
  {
    id: '5',
    title: 'Energizing Breath',
    description: 'Boost your energy and alertness',
    duration: 5,
    technique: 'Kapalabhati',
    difficulty: 'advanced',
    benefits: ['Increases energy', 'Improves focus', 'Detoxifies'],
    breathPattern: {
      inhale: 2,
      hold: 0,
      exhale: 1,
      pause: 0,
    },
  },
];

export function BreathingScreen() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredExercises = breathingExercises.filter(
    (exercise) =>
      selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty
  );

  const handleExercisePress = (exercise: BreathingExercise) => {
    // TODO: Navigate to breathing player
    console.log('Exercise pressed:', exercise.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Breathing</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Banner */}
        <Card variant="elevated" style={styles.infoBanner}>
          <Text style={styles.infoBannerIcon}>🫁</Text>
          <View style={styles.infoBannerContent}>
            <Text style={styles.infoBannerTitle}>
              Control Your Breath, Control Your Mind
            </Text>
            <Text style={styles.infoBannerText}>
              Regular breathing practice can reduce stress, improve focus, and
              enhance overall wellbeing
            </Text>
          </View>
        </Card>

        {/* Difficulty Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {['all', 'beginner', 'intermediate', 'advanced'].map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.filterChip,
                selectedDifficulty === difficulty && styles.filterChipActive,
              ]}
              onPress={() => setSelectedDifficulty(difficulty)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedDifficulty === difficulty && styles.filterChipTextActive,
                ]}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exercises List */}
        <View style={styles.exercisesList}>
          {filteredExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => handleExercisePress(exercise)}
              activeOpacity={0.7}
            >
              <Card variant="elevated" style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                    <Text style={styles.exerciseDescription}>
                      {exercise.description}
                    </Text>
                  </View>
                  <View style={styles.breathIcon}>
                    <Text style={styles.breathIconText}>🫁</Text>
                  </View>
                </View>

                {/* Breath Pattern */}
                <View style={styles.breathPattern}>
                  <View style={styles.patternLabel}>
                    <Text style={styles.patternTitle}>Breath Pattern</Text>
                    <Text style={styles.patternTechnique}>{exercise.technique}</Text>
                  </View>
                  <View style={styles.patternSteps}>
                    {exercise.breathPattern.inhale > 0 && (
                      <View style={styles.patternStep}>
                        <Text style={styles.patternStepLabel}>Inhale</Text>
                        <Text style={styles.patternStepValue}>
                          {exercise.breathPattern.inhale}s
                        </Text>
                      </View>
                    )}
                    {exercise.breathPattern.hold > 0 && (
                      <View style={styles.patternStep}>
                        <Text style={styles.patternStepLabel}>Hold</Text>
                        <Text style={styles.patternStepValue}>
                          {exercise.breathPattern.hold}s
                        </Text>
                      </View>
                    )}
                    {exercise.breathPattern.exhale > 0 && (
                      <View style={styles.patternStep}>
                        <Text style={styles.patternStepLabel}>Exhale</Text>
                        <Text style={styles.patternStepValue}>
                          {exercise.breathPattern.exhale}s
                        </Text>
                      </View>
                    )}
                    {exercise.breathPattern.pause > 0 && (
                      <View style={styles.patternStep}>
                        <Text style={styles.patternStepLabel}>Pause</Text>
                        <Text style={styles.patternStepValue}>
                          {exercise.breathPattern.pause}s
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Meta Info */}
                <View style={styles.exerciseMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>⏱️</Text>
                    <Text style={styles.metaText}>{exercise.duration} min</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>📊</Text>
                    <Text style={styles.metaText}>
                      {exercise.difficulty.charAt(0).toUpperCase() +
                        exercise.difficulty.slice(1)}
                    </Text>
                  </View>
                </View>

                {/* Benefits */}
                <View style={styles.benefits}>
                  {exercise.benefits.slice(0, 2).map((benefit, index) => (
                    <View key={index} style={styles.benefitTag}>
                      <Text style={styles.benefitText}>✓ {benefit}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: theme.colors.text.primary,
    fontWeight: '300',
  },

  title: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
  },

  placeholder: {
    width: 40,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  infoBanner: {
    flexDirection: 'row',
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.accent[50],
  },

  infoBannerIcon: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },

  infoBannerContent: {
    flex: 1,
  },

  infoBannerTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  infoBannerText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },

  filtersScroll: {
    marginBottom: theme.spacing.md,
  },

  filtersContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },

  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    marginRight: theme.spacing.sm,
  },

  filterChipActive: {
    backgroundColor: theme.colors.primary.DEFAULT,
    borderColor: theme.colors.primary.DEFAULT,
  },

  filterChipText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },

  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  exercisesList: {
    paddingHorizontal: theme.spacing.lg,
  },

  exerciseCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },

  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },

  exerciseInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },

  exerciseTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },

  exerciseDescription: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },

  breathIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent[50],
    justifyContent: 'center',
    alignItems: 'center',
  },

  breathIconText: {
    fontSize: 24,
  },

  breathPattern: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.base,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },

  patternLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },

  patternTitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    fontWeight: '600',
  },

  patternTechnique: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
  },

  patternSteps: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  patternStep: {
    flex: 1,
    alignItems: 'center',
  },

  patternStepLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginBottom: 2,
  },

  patternStepValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },

  exerciseMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metaIcon: {
    fontSize: 14,
  },

  metaText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },

  benefitTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
    backgroundColor: theme.colors.background.light,
  },

  benefitText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
});
