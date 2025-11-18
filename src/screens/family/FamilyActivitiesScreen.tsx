import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  emoji: string;
}

const ACTIVITIES: Activity[] = [
  { id: '1', title: 'Gratitude Circle', description: 'Share what you are grateful for', duration: '15 min', emoji: '🌟' },
  { id: '2', title: 'Rose, Bud, Thorn', description: 'Share highs and lows of your day', duration: '20 min', emoji: '🌹' },
  { id: '3', title: 'Story Time', description: 'Tell stories from your past', duration: '30 min', emoji: '📖' },
  { id: '4', title: 'Dream Discussion', description: 'Share your dreams and goals', duration: '25 min', emoji: '💭' },
  { id: '5', title: 'Appreciation Round', description: 'Express appreciation for each other', duration: '15 min', emoji: '❤️' },
];

export const FamilyActivitiesScreen = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Family Activities</Text>
          <Text style={styles.subtitle}>Strengthen family bonds</Text>
        </View>

        <View style={styles.activitiesList}>
          {ACTIVITIES.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              onPress={() => navigation.navigate('ActivityDetail', { activity })}
            >
              <Text style={styles.activityEmoji}>{activity.emoji}</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityDuration}>{activity.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  header: {
    padding: spacing.xl,
    paddingTop: spacing['4xl'],
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  activitiesList: {
    padding: spacing.xl,
    paddingTop: 0,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityEmoji: {
    fontSize: 48,
    marginRight: spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  activityDescription: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  activityDuration: {
    ...typography.caption,
    color: colors.accent.lime,
  },
});
