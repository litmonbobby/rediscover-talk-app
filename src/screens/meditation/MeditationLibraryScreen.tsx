import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface Meditation {
  id: string;
  title: string;
  duration: string;
  category: string;
  emoji: string;
}

const MEDITATIONS: Meditation[] = [
  { id: '1', title: 'Morning Calm', duration: '10 min', category: 'Morning', emoji: '🌅' },
  { id: '2', title: 'Stress Relief', duration: '15 min', category: 'Anxiety', emoji: '🧘' },
  { id: '3', title: 'Deep Sleep', duration: '20 min', category: 'Sleep', emoji: '😴' },
  { id: '4', title: 'Body Scan', duration: '12 min', category: 'Mindfulness', emoji: '🫁' },
  { id: '5', title: 'Gratitude Practice', duration: '8 min', category: 'Gratitude', emoji: '🙏' },
  { id: '6', title: 'Focus & Clarity', duration: '15 min', category: 'Focus', emoji: '🎯' },
];

export const MeditationLibraryScreen = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Meditation Library</Text>
          <Text style={styles.subtitle}>Find peace and clarity</Text>
        </View>

        <View style={styles.mediationList}>
          {MEDITATIONS.map((meditation) => (
            <TouchableOpacity
              key={meditation.id}
              style={styles.meditationCard}
              onPress={() => navigation.navigate('MeditationPlayer', { meditation })}
            >
              <LinearGradient
                colors={[colors.primary.lightBlue, colors.primary.cobaltBlue]}
                style={styles.cardGradient}
              >
                <Text style={styles.meditationEmoji}>{meditation.emoji}</Text>
                <Text style={styles.meditationTitle}>{meditation.title}</Text>
                <Text style={styles.meditationCategory}>{meditation.category}</Text>
                <Text style={styles.meditationDuration}>{meditation.duration}</Text>
              </LinearGradient>
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
  mediationList: {
    padding: spacing.xl,
    paddingTop: 0,
  },
  meditationCard: {
    marginBottom: spacing.md,
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: spacing.lg,
  },
  meditationEmoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  meditationTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  meditationCategory: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  meditationDuration: {
    ...typography.bodyBold,
    color: colors.accent.lime,
  },
});
