import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

export const MeditationPlayerScreen = ({ route, navigation }: any) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
  const { meditation } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.content}>
        <Animated.Text entering={FadeInUp.delay(100).springify()} style={styles.emoji}>
          {meditation.emoji}
        </Animated.Text>

        <Animated.Text entering={FadeInUp.delay(200).springify()} style={[styles.title, {
          color: colors.text.primary,
          fontFamily: typography.fontFamily.secondary
        }]}>
          {meditation.title}
        </Animated.Text>

        <Animated.Text entering={FadeInUp.delay(250).springify()} style={[styles.category, {
          color: colors.text.secondary,
          fontFamily: typography.fontFamily.primary
        }]}>
          {meditation.category}
        </Animated.Text>

        <Animated.Text entering={FadeInUp.delay(300).springify()} style={[styles.duration, {
          color: colors.primary.main,
          fontFamily: typography.fontFamily.primary,
          fontWeight: typography.fontWeight.semibold
        }]}>
          {meditation.duration}
        </Animated.Text>

        <Animated.View entering={FadeInUp.delay(400).springify()}>
          <TouchableOpacity
            style={[styles.playButton, {
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.full,
              ...shadows.lg
            }]}
            onPress={() => setIsPlaying(!isPlaying)}
            activeOpacity={0.8}
          >
            <Text style={[styles.playButtonText, {
              color: colors.text.inverse
            }]}>
              {isPlaying ? '⏸' : '▶'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text entering={FadeInUp.delay(500).springify()} style={[styles.instruction, {
          color: colors.text.secondary,
          fontFamily: typography.fontFamily.primary
        }]}>
          {isPlaying ? 'Breathe deeply and relax...' : 'Press play to begin'}
        </Animated.Text>
      </View>
    </SafeAreaView>
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
    padding: 32,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    marginBottom: 12,
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    marginBottom: 8,
  },
  duration: {
    fontSize: 18,
    marginBottom: 64,
  },
  playButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  playButtonText: {
    fontSize: 40,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
  },
});
