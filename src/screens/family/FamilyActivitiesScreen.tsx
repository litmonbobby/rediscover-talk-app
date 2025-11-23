import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FamilyStackParamList } from '../../navigation/stacks/FamilyStack';

type Props = NativeStackScreenProps<FamilyStackParamList, 'FamilyActivities'>;

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  participants: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Gratitude Circle',
    description: 'Share what you\'re grateful for with your family',
    duration: '15 min',
    emoji: '🙏',
    difficulty: 'Easy',
    participants: '2-6 people',
  },
  {
    id: '2',
    title: 'Rose, Bud, Thorn',
    description: 'Share your high, hope, and challenge from the day',
    duration: '20 min',
    emoji: '🌹',
    difficulty: 'Easy',
    participants: '2-8 people',
  },
  {
    id: '3',
    title: 'Story Time',
    description: 'Take turns sharing personal stories and memories',
    duration: '30 min',
    emoji: '📖',
    difficulty: 'Medium',
    participants: '2-6 people',
  },
  {
    id: '4',
    title: 'Dream Discussion',
    description: 'Share and explore your dreams and aspirations',
    duration: '25 min',
    emoji: '✨',
    difficulty: 'Medium',
    participants: '2-5 people',
  },
  {
    id: '5',
    title: 'Appreciation Round',
    description: 'Express appreciation for each family member',
    duration: '15 min',
    emoji: '❤️',
    difficulty: 'Easy',
    participants: '2-8 people',
  },
];

export const FamilyActivitiesScreen: React.FC<Props> = ({ navigation }) => {
  const handleActivityPress = (activity: Activity) => {
    navigation.navigate('ActivityDetail', { activity });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary.cobaltBlue, colors.primary.darkBlue]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Family Activities</Text>
        <Text style={styles.headerSubtitle}>
          Strengthen bonds through meaningful conversations
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {ACTIVITIES.map((activity, index) => (
          <Animated.View
            key={activity.id}
            entering={FadeInUp.delay(index * 100).springify().damping(15)}
          >
            <TouchableOpacity
              style={styles.activityCard}
              onPress={() => handleActivityPress(activity)}
              activeOpacity={0.7}
            >
            <View style={styles.activityHeader}>
              <Text style={styles.activityEmoji}>{activity.emoji}</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>
                  {activity.description}
                </Text>
              </View>
            </View>

            <View style={styles.activityMeta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>⏱️ {activity.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>👥 {activity.participants}</Text>
              </View>
              <View
                style={[
                  styles.difficultyBadge,
                  activity.difficulty === 'Easy' && styles.difficultyEasy,
                  activity.difficulty === 'Medium' && styles.difficultyMedium,
                  activity.difficulty === 'Advanced' && styles.difficultyAdvanced,
                ]}
              >
                <Text style={styles.difficultyText}>{activity.difficulty}</Text>
              </View>
            </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <Animated.View
          style={styles.tipCard}
          entering={FadeIn.delay(600).springify()}
        >
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipTitle}>Tip</Text>
          <Text style={styles.tipText}>
            Set aside dedicated time for family activities. Turn off distractions
            and create a comfortable, judgment-free environment where everyone
            feels safe to share.
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.DEFAULT,
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  headerTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.inverse,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  activityCard: {
    backgroundColor: colors.background.paper,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  activityEmoji: {
    fontSize: 48,
    marginRight: spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  activityDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * 1.5,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.borderRadius.md,
    marginLeft: 'auto',
  },
  difficultyEasy: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  difficultyMedium: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  difficultyAdvanced: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  difficultyText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  tipCard: {
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(199, 246, 0, 0.2)',
  },
  tipEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  tipTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  tipText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * 1.5,
  },
});
