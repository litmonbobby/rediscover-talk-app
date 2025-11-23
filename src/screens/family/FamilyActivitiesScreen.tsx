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
import { useTheme } from '../../theme/useTheme';
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
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const handleActivityPress = (activity: Activity) => {
    navigation.navigate('ActivityDetail', { activity });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Animated.View
        entering={FadeInUp.delay(100).springify()}
        style={[styles.header, { backgroundColor: colors.primary.main, borderRadius: borderRadius.xl }]}
      >
        <Text style={[styles.headerTitle, {
          color: colors.text.inverse,
          fontFamily: typography.fontFamily.secondary,
          fontWeight: typography.fontWeight.bold
        }]}>
          Family Activities
        </Text>
        <Text style={[styles.headerSubtitle, {
          color: colors.text.inverse,
          fontFamily: typography.fontFamily.primary
        }]}>
          Strengthen bonds through meaningful conversations
        </Text>
      </Animated.View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {ACTIVITIES.map((activity, index) => (
          <Animated.View
            key={activity.id}
            entering={FadeInUp.delay(200 + index * 80).springify().damping(15)}
          >
            <TouchableOpacity
              style={[styles.activityCard, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.xl,
                ...shadows.md
              }]}
              onPress={() => handleActivityPress(activity)}
              activeOpacity={0.7}
            >
            <View style={styles.activityHeader}>
              <Text style={styles.activityEmoji}>{activity.emoji}</Text>
              <View style={styles.activityInfo}>
                <Text style={[styles.activityTitle, {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.bold
                }]}>
                  {activity.title}
                </Text>
                <Text style={[styles.activityDescription, {
                  color: colors.text.secondary,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  {activity.description}
                </Text>
              </View>
            </View>

            <View style={styles.activityMeta}>
              <View style={styles.metaItem}>
                <Text style={[styles.metaLabel, {
                  color: colors.text.tertiary,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  ⏱️ {activity.duration}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={[styles.metaLabel, {
                  color: colors.text.tertiary,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  👥 {activity.participants}
                </Text>
              </View>
              <View
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor: activity.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.15)' :
                                    activity.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.15)' :
                                    'rgba(239, 68, 68, 0.15)',
                    borderRadius: borderRadius.md
                  }
                ]}
              >
                <Text style={[styles.difficultyText, {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.semibold
                }]}>
                  {activity.difficulty}
                </Text>
              </View>
            </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <Animated.View
          entering={FadeIn.delay(600).springify()}
          style={[styles.tipCard, {
            backgroundColor: colors.primary.main + '15',
            borderColor: colors.primary.main + '30',
            borderRadius: borderRadius.xl
          }]}
        >
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={[styles.tipTitle, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.bold
          }]}>
            Tip
          </Text>
          <Text style={[styles.tipText, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
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
  },
  header: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  activityCard: {
    padding: 20,
    marginBottom: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 14,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 'auto',
  },
  difficultyText: {
    fontSize: 12,
  },
  tipCard: {
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
  },
  tipEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
