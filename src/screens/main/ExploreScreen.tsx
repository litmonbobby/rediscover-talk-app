/**
 * ExploreScreen
 * Explore meditation, breathing, articles, and wellness content
 * Reference: Figma screen 41-light-explore.png
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { Card } from '../../components';

interface ExploreCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  itemCount?: number;
}

const categories: ExploreCategory[] = [
  {
    id: 'meditations',
    title: 'Meditations',
    description: 'Guided meditation sessions for peace and mindfulness',
    icon: '🧘',
    color: theme.colors.primary.DEFAULT,
    itemCount: 24,
  },
  {
    id: 'breathing',
    title: 'Breathing',
    description: 'Breathing exercises to calm your mind and body',
    icon: '🫁',
    color: theme.colors.accent.DEFAULT,
    itemCount: 12,
  },
  {
    id: 'articles',
    title: 'Articles',
    description: 'Expert articles on mental health and wellness',
    icon: '📰',
    color: '#8B5CF6',
    itemCount: 45,
  },
  {
    id: 'tests',
    title: 'Mental Health Tests',
    description: 'Assess your mental health with professional tests',
    icon: '📋',
    color: '#EC4899',
    itemCount: 8,
  },
  {
    id: 'journal',
    title: 'Smart Journal',
    description: 'AI-guided journaling with personalized prompts',
    icon: '📝',
    color: '#F59E0B',
  },
  {
    id: 'notepad',
    title: 'Notepad',
    description: 'Quick notes for your thoughts and ideas',
    icon: '📔',
    color: '#10B981',
  },
  {
    id: 'affirmations',
    title: 'Affirmations',
    description: 'Positive affirmations to boost your mindset',
    icon: '✨',
    color: '#06B6D4',
    itemCount: 30,
  },
  {
    id: 'quotes',
    title: 'Quotes',
    description: 'Inspirational quotes to motivate your day',
    icon: '💭',
    color: '#6366F1',
    itemCount: 50,
  },
  {
    id: 'tips',
    title: 'Daily Tips',
    description: 'Practical wellness tips for everyday life',
    icon: '💡',
    color: '#EF4444',
    itemCount: 40,
  },
];

export function ExploreScreen() {
  const handleCategoryPress = (categoryId: string) => {
    // TODO: Navigate to category screen
    console.log('Category pressed:', categoryId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>
            Discover wellness content to support your mental health journey
          </Text>
        </View>

        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCardWrapper}
              onPress={() => handleCategoryPress(category.id)}
              activeOpacity={0.7}
            >
              <Card variant="elevated" style={styles.categoryCard}>
                <View
                  style={[styles.iconContainer, { backgroundColor: `${category.color}15` }]}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                </View>
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription} numberOfLines={2}>
                    {category.description}
                  </Text>
                  {category.itemCount !== undefined && (
                    <Text style={styles.itemCount}>{category.itemCount} items</Text>
                  )}
                </View>
                <Text style={styles.arrow}>›</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured This Week</Text>
          <Card variant="elevated" style={styles.featuredCard}>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTag}>FEATURED</Text>
              <Text style={styles.featuredTitle}>
                5-Minute Stress Relief Meditation
              </Text>
              <Text style={styles.featuredDescription}>
                A quick meditation to help you release tension and find calm
              </Text>
              <View style={styles.featuredMeta}>
                <Text style={styles.featuredMetaText}>🧘 Meditation</Text>
                <Text style={styles.featuredMetaText}>• 5 min</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  header: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },

  categoriesGrid: {
    paddingHorizontal: theme.spacing.lg,
  },

  categoryCardWrapper: {
    marginBottom: theme.spacing.sm,
  },

  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },

  categoryIcon: {
    fontSize: 28,
  },

  categoryContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },

  categoryTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },

  categoryDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },

  itemCount: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    fontSize: 11,
  },

  arrow: {
    fontSize: 24,
    color: theme.colors.text.tertiary,
  },

  featuredSection: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  featuredCard: {
    padding: theme.spacing.lg,
  },

  featuredContent: {
    gap: theme.spacing.sm,
  },

  featuredTag: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
    letterSpacing: 1,
  },

  featuredTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
  },

  featuredDescription: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },

  featuredMeta: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },

  featuredMetaText: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },
});
