import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

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
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: typography.fontWeight.bold
          }]}>
            Sleep Sounds
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Peaceful sounds for better rest
          </Text>
        </Animated.View>

        <View style={styles.soundsGrid}>
          {SOUNDS.map((sound, index) => (
            <Animated.View
              key={sound.id}
              entering={FadeInUp.delay(200 + index * 60).springify().damping(15)}
              style={styles.soundCardWrapper}
            >
              <TouchableOpacity
                style={[styles.soundCard, {
                  backgroundColor: colors.background.card,
                  borderRadius: borderRadius.xl,
                  ...shadows.md
                }]}
                onPress={() => navigation.navigate('SoundPlayer', { sound })}
                activeOpacity={0.7}
              >
                <Text style={styles.soundEmoji}>{sound.emoji}</Text>
                <Text style={[styles.soundTitle, {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.semibold
                }]}>
                  {sound.title}
                </Text>
                <Text style={[styles.soundCategory, {
                  color: colors.text.tertiary,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  {sound.category}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 24,
    paddingTop: 0,
  },
  soundCardWrapper: {
    width: '47%',
  },
  soundCard: {
    padding: 20,
    alignItems: 'center',
  },
  soundEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  soundTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  soundCategory: {
    fontSize: 12,
  },
});
