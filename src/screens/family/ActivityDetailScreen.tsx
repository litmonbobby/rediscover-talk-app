import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FamilyStackParamList } from '../../navigation/stacks/FamilyStack';

type Props = NativeStackScreenProps<FamilyStackParamList, 'ActivityDetail'>;

export const ActivityDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { activity } = route.params;
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    // TODO: Implement actual timer functionality
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  // Activity-specific instructions
  const getInstructions = () => {
    switch (activity.id) {
      case '1': // Gratitude Circle
        return [
          'Gather everyone in a comfortable circle or around a table',
          'Each person takes turns sharing 2-3 things they\'re grateful for',
          'Encourage specific details rather than general statements',
          'Listen actively without interrupting',
          'Allow time for reflection between shares',
          'Close with a group moment of appreciation',
        ];
      case '2': // Rose, Bud, Thorn
        return [
          'Explain the concept: Rose (high), Bud (hope), Thorn (challenge)',
          'Each person shares their rose - something good from the day',
          'Then their bud - something they\'re looking forward to',
          'Finally their thorn - a challenge they faced',
          'Encourage honest sharing in a supportive environment',
          'Offer support and encouragement for thorns shared',
        ];
      case '3': // Story Time
        return [
          'Choose a theme (childhood, first times, funny moments, etc.)',
          'Take turns sharing personal stories related to the theme',
          'Encourage vivid details and emotional honesty',
          'Ask clarifying questions to deepen engagement',
          'Connect stories to find common themes',
          'End with reflections on what was learned',
        ];
      case '4': // Dream Discussion
        return [
          'Create a safe, judgment-free space for sharing',
          'Each person shares a dream or aspiration',
          'Discuss what steps could be taken toward these dreams',
          'Offer encouragement and practical support',
          'Explore any obstacles and brainstorm solutions',
          'Commit to supporting each other\'s goals',
        ];
      case '5': // Appreciation Round
        return [
          'Sit in a circle where everyone can see each other',
          'Each person takes a turn being appreciated',
          'Others share specific things they appreciate about that person',
          'Focus on actions, qualities, and contributions',
          'The person being appreciated simply listens',
          'Close with a group expression of gratitude',
        ];
      default:
        return ['Follow the activity instructions', 'Engage with openness and honesty'];
    }
  };

  const instructions = getInstructions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.primary.cobaltBlue, colors.primary.darkBlue]}
          style={styles.activityHeader}
        >
          <Animated.Text
            style={styles.activityEmoji}
            entering={ZoomIn.springify().damping(12)}
          >
            {activity.emoji}
          </Animated.Text>
          <Animated.Text
            style={styles.activityTitle}
            entering={FadeInUp.delay(200).springify()}
          >
            {activity.title}
          </Animated.Text>
          <Animated.Text
            style={styles.activityDescription}
            entering={FadeInUp.delay(300).springify()}
          >
            {activity.description}
          </Animated.Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>⏱️ {activity.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>👥 {activity.participants}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>📊 {activity.difficulty}</Text>
            </View>
          </View>
        </LinearGradient>

        <Animated.View
          style={styles.section}
          entering={FadeInUp.delay(400).springify()}
        >
          <Text style={styles.sectionTitle}>How to Play</Text>
          {instructions.map((instruction, index) => (
            <Animated.View
              key={index}
              style={styles.instructionItem}
              entering={FadeInUp.delay(500 + index * 80).springify().damping(15)}
            >
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </Animated.View>
          ))}
        </Animated.View>

        <Animated.View
          style={styles.section}
          entering={FadeInDown.delay(900).springify()}
        >
          <Text style={styles.sectionTitle}>Tips for Success</Text>
          <Animated.View
            style={styles.tipItem}
            entering={FadeInUp.delay(1000).springify()}
          >
            <Text style={styles.tipIcon}>🎯</Text>
            <Text style={styles.tipText}>
              Create a distraction-free environment
            </Text>
          </Animated.View>
          <Animated.View
            style={styles.tipItem}
            entering={FadeInUp.delay(1100).springify()}
          >
            <Text style={styles.tipIcon}>🤝</Text>
            <Text style={styles.tipText}>
              Practice active listening without judgment
            </Text>
          </Animated.View>
          <Animated.View
            style={styles.tipItem}
            entering={FadeInUp.delay(1200).springify()}
          >
            <Text style={styles.tipIcon}>💬</Text>
            <Text style={styles.tipText}>
              Encourage everyone to participate equally
            </Text>
          </Animated.View>
          <Animated.View
            style={styles.tipItem}
            entering={FadeInUp.delay(1300).springify()}
          >
            <Text style={styles.tipIcon}>⏰</Text>
            <Text style={styles.tipText}>
              Respect the suggested time to keep energy high
            </Text>
          </Animated.View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            isTimerRunning && styles.stopButton,
          ]}
          onPress={isTimerRunning ? handleStopTimer : handleStartTimer}
        >
          <Text style={styles.startButtonText}>
            {isTimerRunning ? 'Stop Activity' : 'Start Activity'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.DEFAULT,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    paddingVertical: spacing.sm,
  },
  backButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary.DEFAULT,
    fontWeight: typography.fontWeight.semibold,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  activityHeader: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  activityEmoji: {
    fontSize: 72,
    marginBottom: spacing.md,
  },
  activityTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.inverse,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  activityDescription: {
    fontSize: typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metaItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.full,
  },
  metaLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.medium,
  },
  section: {
    padding: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.DEFAULT,
  },
  instructionText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: typography.fontSize.base * 1.6,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  tipText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * 1.5,
  },
  footer: {
    padding: spacing.xl,
    paddingBottom: spacing['2xl'],
    backgroundColor: colors.background.DEFAULT,
    borderTopWidth: 1,
    borderTopColor: colors.background.light,
  },
  startButton: {
    backgroundColor: colors.accent.DEFAULT,
    borderRadius: spacing.borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  stopButton: {
    backgroundColor: colors.mood.veryBad,
  },
  startButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.DEFAULT,
  },
});
