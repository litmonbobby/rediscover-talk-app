import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface Sound {
  id: string;
  title: string;
  category: string;
  emoji: string;
}

const SOUNDS: Sound[] = [
  { id: '1', title: 'Rain Sounds', category: 'Nature', emoji: '🌧' },
  { id: '2', title: 'Ocean Waves', category: 'Nature', emoji: '🌊' },
  { id: '3', title: 'Forest Ambience', category: 'Nature', emoji: '🌲' },
  { id: '4', title: 'White Noise', category: 'Ambient', emoji: '🔊' },
  { id: '5', title: 'Thunderstorm', category: 'Nature', emoji: '⛈' },
  { id: '6', title: 'Campfire', category: 'Nature', emoji: '🔥' },
];

export const SleepSoundsScreen = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Sleep Sounds</Text>
          <Text style={styles.subtitle}>Peaceful sounds for better rest</Text>
        </View>

        <View style={styles.soundsGrid}>
          {SOUNDS.map((sound) => (
            <TouchableOpacity
              key={sound.id}
              style={styles.soundCard}
              onPress={() => navigation.navigate('SoundPlayer', { sound })}
            >
              <LinearGradient
                colors={[colors.mood.neutral, colors.primary.deepBlue]}
                style={styles.cardGradient}
              >
                <Text style={styles.soundEmoji}>{sound.emoji}</Text>
                <Text style={styles.soundTitle}>{sound.title}</Text>
                <Text style={styles.soundCategory}>{sound.category}</Text>
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
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    padding: spacing.xl,
    paddingTop: 0,
  },
  soundCard: {
    width: '47%',
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  soundEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  soundTitle: {
    ...typography.bodyBold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  soundCategory: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
});
