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
import { useTheme } from '../../theme/useTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FamilyStackParamList } from '../../navigation/stacks/FamilyStack';

type Props = NativeStackScreenProps<FamilyStackParamList, 'ActivityDetail'>;

export const ActivityDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={[styles.header, { backgroundColor: colors.background.primary }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: colors.background.secondary, borderRadius: borderRadius.lg }]}
        >
          <Text style={[styles.backButtonText, { color: colors.text.primary, fontFamily: typography.fontFamily.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[styles.activityHeader, { backgroundColor: colors.primary.main, borderRadius: borderRadius.xl }]}
          entering={FadeInUp.delay(100).springify()}
        >
          <Animated.Text
            style={styles.activityEmoji}
            entering={ZoomIn.springify().damping(12)}
          >
            {activity.emoji}
          </Animated.Text>
          <Animated.Text
            style={[styles.activityTitle, { color: colors.text.inverse, fontFamily: typography.fontFamily.secondary, fontWeight: typography.fontWeight.bold }]}
            entering={FadeInUp.delay(200).springify()}
          >
            {activity.title}
          </Animated.Text>
          <Animated.Text
            style={[styles.activityDescription, { color: colors.text.inverse, fontFamily: typography.fontFamily.primary }]}
            entering={FadeInUp.delay(300).springify()}
          >
            {activity.description}
          </Animated.Text>

          <View style={styles.metaRow}>
            <View style={[styles.metaItem, { backgroundColor: colors.primary.dark, borderRadius: borderRadius.full }]}>
              <Text style={[styles.metaLabel, { color: colors.text.inverse, fontFamily: typography.fontFamily.primary, fontWeight: typography.fontWeight.medium }]}>
                ⏱️ {activity.duration}
              </Text>
            </View>
            <View style={[styles.metaItem, { backgroundColor: colors.primary.dark, borderRadius: borderRadius.full }]}>
              <Text style={[styles.metaLabel, { color: colors.text.inverse, fontFamily: typography.fontFamily.primary, fontWeight: typography.fontWeight.medium }]}>
                👥 {activity.participants}
              </Text>
            </View>
            <View style={[styles.metaItem, { backgroundColor: colors.primary.dark, borderRadius: borderRadius.full }]}>
              <Text style={[styles.metaLabel, { color: colors.text.inverse, fontFamily: typography.fontFamily.primary, fontWeight: typography.fontWeight.medium }]}>
                📊 {activity.difficulty}
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={styles.section}
          entering={FadeInUp.delay(400).springify()}
        >
          <Text style={[styles.sectionTitle, { color: colors.text.primary, fontFamily: typography.fontFamily.primary, fontWeight: typography.fontWeight.bold }]}>
            How to Play
          </Text>
          {instructions.map((instruction, index) => (
            <Animated.View
              key={index}
              style={styles.instructionItem}
              entering={FadeInUp.delay(500 + index * 80).springify().damping(15)}
            >
              <View style={[styles.stepNumber, { backgroundColor: colors.primary.light, borderRadius: borderRadius.full }]}>
                <Text style={[styles.stepNumberText, { color: colors.primary.main, fontFamily: typography.fontFamily.primary, fontWeight: typography.fontWeight.bold }]}>
                  {index + 1}
                </Text>
              </View>
              <Text style={[styles.instructionText, { color: colors.text.primary, fontFamily: typography.fontFamily.primary }]}>
                {instruction}
              </Text>
            </Animated.View>
          ))}
        </Animated.View>

        <Animated.View
          style={styles.section}
          entering={FadeInDown.delay(900).springify()}
        >
          <Text style={[styles.sectionTitle, { color: colors.text.primary, fontFamily: typography.fontFamily.primary, fontWeight: typography.fontWeight.bold }]}>
            Tips for Success
          </Text>
          <Animated.View
            style={styles.tipItem}
            entering={FadeInUp.delay(1000).springify()}
          >
            <Text style={styles.tipIcon}>🎯</Text>
            <Text style={[styles.tipText, { color: colors.text.secondary, fontFamily: typography.fontFamily.primary }]}>
              Create a distraction-free environment
            </Text>
          </Animated.View>
          <Animated.View
            style={styles.tipItem}
            entering={FadeInUp.delay(1100).springify()}
          >
            <Text style={styles.tipIcon}>🤝</Text>
            <Text style={[styles.tipText, { color: colors.text.secondary, fontFamily: typography.fontFamily.primary }]}>
              Practice active listening without judgment
            </Text>
          </Animated.View>
          <Animated.View
            style={styles.tipItem}
            entering={FadeInUp.delay(1200).springify()}
          >
            <Text style={styles.tipIcon}>💬</Text>
            <Text style={[styles.tipText, { color: colors.text.secondary, fontFamily: typography.fontFamily.primary }]}>
              Encourage everyone to participate equally
            </Text>
          </Animated.View>
          <Animated.View
            style={styles.tipItem}
            entering={FadeInUp.delay(1300).springify()}
          >
            <Text style={styles.tipIcon}>⏰</Text>
            <Text style={[styles.tipText, { color: colors.text.secondary, fontFamily: typography.fontFamily.primary }]}>
              Respect the suggested time to keep energy high
            </Text>
          </Animated.View>
        </Animated.View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background.primary, borderTopColor: colors.border.light }]}>
        <TouchableOpacity
          style={[
            styles.startButton,
            {
              backgroundColor: isTimerRunning ? colors.status.error : colors.primary.main,
              borderRadius: borderRadius.xl,
              ...shadows.lg
            }
          ]}
          onPress={isTimerRunning ? handleStopTimer : handleStartTimer}
        >
          <Text style={[styles.startButtonText, { color: colors.text.inverse, fontFamily: typography.fontFamily.primary, fontWeight: typography.fontWeight.bold }]}>
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  activityHeader: {
    padding: 24,
    marginHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  activityEmoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  activityDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metaItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  metaLabel: {
    fontSize: 14,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    paddingBottom: 24,
    borderTopWidth: 1,
  },
  startButton: {
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
  },
});
