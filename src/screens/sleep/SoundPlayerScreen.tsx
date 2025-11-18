import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export const SoundPlayerScreen = ({ route }: any) => {
  const { sound } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.emoji}>{sound.emoji}</Text>
        <Text style={styles.title}>{sound.title}</Text>
        <Text style={styles.category}>{sound.category}</Text>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <LinearGradient
            colors={[colors.accent.lime, colors.accent.brightLime]}
            style={styles.playButtonGradient}
          >
            <Text style={styles.playButtonText}>{isPlaying ? '⏸' : '▶'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.volumeSection}>
          <Text style={styles.volumeLabel}>Volume: {volume}%</Text>
        </View>

        <Text style={styles.instruction}>
          {isPlaying ? 'Playing...' : 'Tap to play'}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emoji: {
    fontSize: 100,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  category: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing['4xl'],
  },
  playButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  playButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 40,
    color: colors.primary.cobaltBlue,
  },
  volumeSection: {
    marginBottom: spacing.xl,
  },
  volumeLabel: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  instruction: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
