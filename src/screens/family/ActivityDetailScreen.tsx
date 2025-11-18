import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export const ActivityDetailScreen = ({ route, navigation }: any) => {
  const { activity } = route.params;

  const handleStart = () => {
    // TODO: Start activity timer/tracking
    console.log('Starting activity:', activity.title);
  };

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.emoji}>{activity.emoji}</Text>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.description}>{activity.description}</Text>
        <Text style={styles.duration}>Duration: {activity.duration}</Text>

        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>How to play:</Text>
          <Text style={styles.instructionsText}>
            1. Gather your family in a comfortable space{'\n'}
            2. Each person takes turns participating{'\n'}
            3. Listen actively and show appreciation{'\n'}
            4. Keep the atmosphere positive and supportive
          </Text>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <LinearGradient
            colors={[colors.accent.lime, colors.accent.brightLime]}
            style={styles.startButtonGradient}
          >
            <Text style={styles.startButtonText}>Start Activity</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    padding: spacing.xl,
    paddingTop: spacing['4xl'],
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  duration: {
    ...typography.bodyBold,
    color: colors.accent.lime,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  instructionsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  instructionsTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  instructionsText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  startButton: {
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  startButtonGradient: {
    padding: spacing.md,
    alignItems: 'center',
  },
  startButtonText: {
    ...typography.h2,
    color: colors.primary.cobaltBlue,
  },
});
