import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

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
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary
          }]}>
            Meditation Library
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Find peace and clarity
          </Text>
        </Animated.View>

        {/* Meditation Cards */}
        <View style={styles.mediationList}>
          {MEDITATIONS.map((meditation, index) => (
            <Animated.View
              key={meditation.id}
              entering={FadeInUp.delay(200 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[styles.meditationCard, {
                  backgroundColor: colors.primary.main,
                  borderRadius: borderRadius.lg,
                  ...shadows.md
                }]}
                onPress={() => navigation.navigate('MeditationPlayer', { meditation })}
                activeOpacity={0.8}
              >
                <Text style={styles.meditationEmoji}>{meditation.emoji}</Text>
                <Text style={[styles.meditationTitle, {
                  color: colors.text.inverse,
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.bold
                }]}>
                  {meditation.title}
                </Text>
                <Text style={[styles.meditationCategory, {
                  color: colors.text.inverse,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  {meditation.category}
                </Text>
                <Text style={[styles.meditationDuration, {
                  color: colors.text.inverse,
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.semibold
                }]}>
                  {meditation.duration}
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
  header: {
    padding: 20,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  mediationList: {
    padding: 20,
    paddingTop: 0,
  },
  meditationCard: {
    padding: 20,
    marginBottom: 12,
  },
  meditationEmoji: {
    fontSize: 36,
    marginBottom: 12,
  },
  meditationTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  meditationCategory: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.8,
  },
  meditationDuration: {
    fontSize: 16,
  },
});
