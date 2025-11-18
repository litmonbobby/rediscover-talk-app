import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export const MeditationPlayerScreen = ({ route, navigation }: any) => {
  const { meditation } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.emoji}>{meditation.emoji}</Text>
        <Text style={styles.title}>{meditation.title}</Text>
        <Text style={styles.category}>{meditation.category}</Text>
        <Text style={styles.duration}>{meditation.duration}</Text>

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

        <Text style={styles.instruction}>
          {isPlaying ? 'Breathe deeply and relax...' : 'Press play to begin'}
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
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  category: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  duration: {
    ...typography.bodyBold,
    color: colors.accent.lime,
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
  instruction: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
