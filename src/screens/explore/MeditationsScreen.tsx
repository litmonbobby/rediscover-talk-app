/**
 * MeditationsScreen
 * Browse and filter meditation sessions
 * Reference: Figma screen 42-light-explore-meditations.png
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { theme } from '../../theme';
import { Card, Input } from '../../components';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  imageUrl?: string;
  audioUrl: string;
}

const sampleMeditations: Meditation[] = [
  {
    id: '1',
    title: 'Morning Mindfulness',
    description: 'Start your day with clarity and focus',
    duration: 10,
    category: 'Mindfulness',
    difficulty: 'beginner',
    isPremium: false,
    audioUrl: 'morning-mindfulness.mp3',
  },
  {
    id: '2',
    title: 'Stress Relief',
    description: 'Release tension and find inner peace',
    duration: 15,
    category: 'Stress',
    difficulty: 'beginner',
    isPremium: false,
    audioUrl: 'stress-relief.mp3',
  },
  {
    id: '3',
    title: 'Deep Sleep Meditation',
    description: 'Guided meditation for restful sleep',
    duration: 20,
    category: 'Sleep',
    difficulty: 'intermediate',
    isPremium: true,
    audioUrl: 'deep-sleep.mp3',
  },
  {
    id: '4',
    title: 'Anxiety Relief',
    description: 'Calm your anxious thoughts',
    duration: 12,
    category: 'Anxiety',
    difficulty: 'beginner',
    isPremium: false,
    audioUrl: 'anxiety-relief.mp3',
  },
  {
    id: '5',
    title: 'Body Scan Meditation',
    description: 'Connect with your body and release tension',
    duration: 25,
    category: 'Mindfulness',
    difficulty: 'intermediate',
    isPremium: true,
    audioUrl: 'body-scan.mp3',
  },
  {
    id: '6',
    title: 'Loving Kindness',
    description: 'Cultivate compassion for yourself and others',
    duration: 15,
    category: 'Compassion',
    difficulty: 'intermediate',
    isPremium: false,
    audioUrl: 'loving-kindness.mp3',
  },
];

const categories = ['All', 'Mindfulness', 'Stress', 'Sleep', 'Anxiety', 'Compassion'];

export function MeditationsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeditations = sampleMeditations.filter((meditation) => {
    const matchesCategory =
      selectedCategory === 'All' || meditation.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meditation.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMeditationPress = (meditation: Meditation) => {
    // TODO: Navigate to meditation detail screen
    console.log('Meditation pressed:', meditation.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meditations</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search meditations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Text style={styles.searchIcon}>🔍</Text>}
          />
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <Text style={styles.resultsCount}>
          {filteredMeditations.length} meditation{filteredMeditations.length !== 1 ? 's' : ''}
        </Text>

        {/* Meditations List */}
        <View style={styles.meditationsList}>
          {filteredMeditations.map((meditation) => (
            <TouchableOpacity
              key={meditation.id}
              onPress={() => handleMeditationPress(meditation)}
              activeOpacity={0.7}
            >
              <Card variant="elevated" style={styles.meditationCard}>
                <View style={styles.meditationContent}>
                  <View style={styles.meditationInfo}>
                    {meditation.isPremium && (
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumText}>PRO</Text>
                      </View>
                    )}
                    <Text style={styles.meditationTitle}>{meditation.title}</Text>
                    <Text style={styles.meditationDescription} numberOfLines={2}>
                      {meditation.description}
                    </Text>
                    <View style={styles.meditationMeta}>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>⏱️</Text>
                        <Text style={styles.metaText}>{meditation.duration} min</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>📊</Text>
                        <Text style={styles.metaText}>
                          {meditation.difficulty.charAt(0).toUpperCase() +
                            meditation.difficulty.slice(1)}
                        </Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>🏷️</Text>
                        <Text style={styles.metaText}>{meditation.category}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.playButton}>
                    <Text style={styles.playIcon}>▶</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {filteredMeditations.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No meditations found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: theme.colors.text.primary,
    fontWeight: '300',
  },

  title: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
  },

  placeholder: {
    width: 40,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },

  searchIcon: {
    fontSize: 18,
  },

  categoriesScroll: {
    marginBottom: theme.spacing.md,
  },

  categoriesContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },

  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    marginRight: theme.spacing.sm,
  },

  categoryChipActive: {
    backgroundColor: theme.colors.primary.DEFAULT,
    borderColor: theme.colors.primary.DEFAULT,
  },

  categoryChipText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },

  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  resultsCount: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  meditationsList: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },

  meditationCard: {
    marginBottom: theme.spacing.sm,
  },

  meditationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  meditationInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },

  premiumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing.xs,
  },

  premiumText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '700',
    fontSize: 10,
  },

  meditationTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },

  meditationDescription: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },

  meditationMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metaIcon: {
    fontSize: 12,
  },

  metaText: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },

  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 2,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
    paddingHorizontal: theme.spacing.lg,
  },

  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
  },

  emptyTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
