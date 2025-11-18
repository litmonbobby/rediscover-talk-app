import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface MeditationCategory {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
  sessions: number;
}

const meditationCategories: MeditationCategory[] = [
  {
    id: 'sleep',
    title: 'Sleep',
    description: 'Guided meditations for restful sleep',
    duration: '10-30 min',
    icon: '🌙',
    color: colors.mood.neutral,
    sessions: 12,
  },
  {
    id: 'stress',
    title: 'Stress Relief',
    description: 'Calm your mind and reduce anxiety',
    duration: '5-15 min',
    icon: '🧘',
    color: colors.mood.good,
    sessions: 15,
  },
  {
    id: 'focus',
    title: 'Focus',
    description: 'Improve concentration and clarity',
    duration: '10-20 min',
    icon: '🎯',
    color: colors.accent.lime,
    sessions: 10,
  },
  {
    id: 'morning',
    title: 'Morning',
    description: 'Start your day with positive energy',
    duration: '5-10 min',
    icon: '☀️',
    color: colors.mood.happy,
    sessions: 8,
  },
  {
    id: 'breathwork',
    title: 'Breathwork',
    description: 'Breathing exercises for relaxation',
    duration: '3-10 min',
    icon: '💨',
    color: colors.accent.softLime,
    sessions: 20,
  },
  {
    id: 'healing',
    title: 'Healing',
    description: 'Emotional healing and self-care',
    duration: '15-25 min',
    icon: '💚',
    color: colors.mood.good,
    sessions: 9,
  },
];

export const MeditationLibraryScreen = ({ navigation }: any) => {
  const handleCategoryPress = (category: MeditationCategory) => {
    // TODO: Navigate to category detail screen
    console.log('Selected category:', category.id);
  };

  return (
    <LinearGradient
      colors={[colors.primary.cobaltBlue, colors.primary.deepBlue]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Meditation Library</Text>
          <Text style={styles.subtitle}>Find your perfect practice</Text>
        </View>

        {/* Featured Section */}
        <View style={styles.featuredContainer}>
          <LinearGradient
            colors={[colors.accent.lime, colors.accent.brightLime]}
            style={styles.featuredCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.featuredContent}>
              <Text style={styles.featuredBadge}>NEW</Text>
              <Text style={styles.featuredTitle}>Daily Mindfulness</Text>
              <Text style={styles.featuredDescription}>
                7-day guided journey to build a meditation habit
              </Text>
              <TouchableOpacity style={styles.featuredButton}>
                <Text style={styles.featuredButtonText}>Start Journey →</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.featuredEmoji}>🌟</Text>
          </LinearGradient>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {meditationCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.categoryGradient}
                >
                  <View
                    style={[
                      styles.categoryIconContainer,
                      { backgroundColor: category.color + '33' },
                    ]}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryDescription} numberOfLines={2}>
                      {category.description}
                    </Text>
                    <View style={styles.categoryMeta}>
                      <Text style={styles.categoryMetaText}>⏱ {category.duration}</Text>
                      <Text style={styles.categoryMetaText}>
                        • {category.sessions} sessions
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Start Section */}
        <View style={styles.quickStartContainer}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <View style={styles.quickStartCards}>
            <TouchableOpacity style={styles.quickStartCard}>
              <LinearGradient
                colors={['rgba(199, 246, 0, 0.2)', 'rgba(199, 246, 0, 0.05)']}
                style={styles.quickStartGradient}
              >
                <Text style={styles.quickStartEmoji}>⚡</Text>
                <Text style={styles.quickStartTitle}>5-Minute Calm</Text>
                <Text style={styles.quickStartSubtitle}>Quick reset</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickStartCard}>
              <LinearGradient
                colors={['rgba(199, 246, 0, 0.2)', 'rgba(199, 246, 0, 0.05)']}
                style={styles.quickStartGradient}
              >
                <Text style={styles.quickStartEmoji}>🌊</Text>
                <Text style={styles.quickStartTitle}>Body Scan</Text>
                <Text style={styles.quickStartSubtitle}>Deep relaxation</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    ...typography.h2,
    color: colors.text.primary,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  featuredContainer: {
    marginBottom: spacing.xl,
  },
  featuredCard: {
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredContent: {
    flex: 1,
  },
  featuredBadge: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primary.cobaltBlue,
    backgroundColor: 'rgba(0, 75, 167, 0.3)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: spacing.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  featuredTitle: {
    ...typography.h2,
    color: colors.primary.cobaltBlue,
    marginBottom: spacing.xs,
  },
  featuredDescription: {
    ...typography.body,
    color: colors.primary.deepBlue,
    marginBottom: spacing.md,
  },
  featuredButton: {
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    ...typography.bodyBold,
    color: colors.primary.cobaltBlue,
  },
  featuredEmoji: {
    fontSize: 64,
  },
  categoriesContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  categoriesGrid: {
    gap: spacing.md,
  },
  categoryCard: {
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  categoryGradient: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  categoryDescription: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  categoryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryMetaText: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginRight: spacing.xs,
  },
  quickStartContainer: {
    marginBottom: spacing.xl,
  },
  quickStartCards: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickStartCard: {
    flex: 1,
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
  },
  quickStartGradient: {
    padding: spacing.md,
    alignItems: 'center',
  },
  quickStartEmoji: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  quickStartTitle: {
    ...typography.bodyBold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs / 2,
  },
  quickStartSubtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
