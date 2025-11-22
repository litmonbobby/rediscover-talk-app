/**
 * AffirmationsScreen
 * Positive affirmations for daily motivation
 * Reference: Figma screen 78-light-explore-affirmations.png
 */

import React, { useState } from 'react';
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

interface Affirmation {
  id: string;
  text: string;
  category: string;
  icon: string;
}

const affirmations: Affirmation[] = [
  // Self-Love
  { id: '1', text: 'I am worthy of love and respect', category: 'Self-Love', icon: '❤️' },
  { id: '2', text: 'I accept myself unconditionally', category: 'Self-Love', icon: '❤️' },
  { id: '3', text: 'I am enough just as I am', category: 'Self-Love', icon: '❤️' },
  // Confidence
  { id: '4', text: 'I am confident in my abilities', category: 'Confidence', icon: '💪' },
  { id: '5', text: 'I trust myself to make good decisions', category: 'Confidence', icon: '💪' },
  { id: '6', text: 'I am capable of achieving my goals', category: 'Confidence', icon: '💪' },
  // Peace
  { id: '7', text: 'I am calm and at peace', category: 'Peace', icon: '🕊️' },
  { id: '8', text: 'I release all tension and worry', category: 'Peace', icon: '🕊️' },
  { id: '9', text: 'I choose peace over worry', category: 'Peace', icon: '🕊️' },
  // Gratitude
  { id: '10', text: 'I am grateful for this moment', category: 'Gratitude', icon: '🙏' },
  { id: '11', text: 'I appreciate all the good in my life', category: 'Gratitude', icon: '🙏' },
  { id: '12', text: 'I am thankful for my journey', category: 'Gratitude', icon: '🙏' },
  // Strength
  { id: '13', text: 'I am strong and resilient', category: 'Strength', icon: '⚡' },
  { id: '14', text: 'I can handle whatever comes my way', category: 'Strength', icon: '⚡' },
  { id: '15', text: 'I overcome challenges with grace', category: 'Strength', icon: '⚡' },
  // Success
  { id: '16', text: 'I am worthy of success', category: 'Success', icon: '🌟' },
  { id: '17', text: 'Success flows to me naturally', category: 'Success', icon: '🌟' },
  { id: '18', text: 'I create my own opportunities', category: 'Success', icon: '🌟' },
  // Healing
  { id: '19', text: 'I am healing and growing every day', category: 'Healing', icon: '🌱' },
  { id: '20', text: 'I release what no longer serves me', category: 'Healing', icon: '🌱' },
  { id: '21', text: 'I am becoming my best self', category: 'Healing', icon: '🌱' },
  // Positivity
  { id: '22', text: 'I choose joy and happiness', category: 'Positivity', icon: '😊' },
  { id: '23', text: 'Positive energy flows through me', category: 'Positivity', icon: '😊' },
  { id: '24', text: 'I attract positivity into my life', category: 'Positivity', icon: '😊' },
];

const categories = ['All', 'Self-Love', 'Confidence', 'Peace', 'Gratitude', 'Strength', 'Success', 'Healing', 'Positivity'];

export function AffirmationsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  const filteredAffirmations = affirmations.filter(
    (aff) => selectedCategory === 'All' || aff.category === selectedCategory
  );

  const todaysAffirmation = filteredAffirmations[currentAffirmation % filteredAffirmations.length];

  const handleNext = () => {
    setCurrentAffirmation((prev) => (prev + 1) % filteredAffirmations.length);
  };

  const handlePrevious = () => {
    setCurrentAffirmation((prev) =>
      prev === 0 ? filteredAffirmations.length - 1 : prev - 1
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
    // TODO: Save to backend
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Affirmations</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Affirmation */}
        <Card variant="elevated" style={styles.dailyCard}>
          <Text style={styles.dailyLabel}>Today's Affirmation</Text>
          <View style={styles.dailyIconContainer}>
            <Text style={styles.dailyIcon}>{todaysAffirmation.icon}</Text>
          </View>
          <Text style={styles.dailyText}>{todaysAffirmation.text}</Text>
          <View style={styles.dailyCategory}>
            <Text style={styles.dailyCategoryText}>{todaysAffirmation.category}</Text>
          </View>
          <View style={styles.dailyActions}>
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(todaysAffirmation.id)}
            >
              <Text style={styles.favoriteIcon}>
                {favorites.includes(todaysAffirmation.id) ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Category Filter */}
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
              onPress={() => {
                setSelectedCategory(category);
                setCurrentAffirmation(0);
              }}
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

        {/* All Affirmations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Affirmations' : selectedCategory}
          </Text>
          <Text style={styles.sectionCount}>
            {filteredAffirmations.length} affirmations
          </Text>
          {filteredAffirmations.map((affirmation) => (
            <Card key={affirmation.id} variant="default" style={styles.affirmationCard}>
              <View style={styles.affirmationContent}>
                <View style={styles.affirmationIconSmall}>
                  <Text style={styles.affirmationIconText}>{affirmation.icon}</Text>
                </View>
                <Text style={styles.affirmationText}>{affirmation.text}</Text>
                <TouchableOpacity
                  style={styles.favoriteButtonSmall}
                  onPress={() => toggleFavorite(affirmation.id)}
                >
                  <Text style={styles.favoriteIconSmall}>
                    {favorites.includes(affirmation.id) ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoIcon}>✨</Text>
          <Text style={styles.infoTitle}>How to Use Affirmations</Text>
          <Text style={styles.infoText}>
            • Repeat affirmations daily, ideally in the morning{'\n'}
            • Say them out loud or in your mind{'\n'}
            • Believe in the words as you say them{'\n'}
            • Feel the positive emotions they bring{'\n'}
            • Be patient and consistent
          </Text>
        </Card>
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

  dailyCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
  },

  dailyLabel: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: theme.spacing.md,
  },

  dailyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },

  dailyIcon: {
    fontSize: 48,
  },

  dailyText: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 32,
  },

  dailyCategory: {
    backgroundColor: theme.colors.primary.DEFAULT,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg,
  },

  dailyCategoryText: {
    ...theme.typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  dailyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },

  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navButtonText: {
    fontSize: 28,
    color: theme.colors.text.primary,
  },

  favoriteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteIcon: {
    fontSize: 32,
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

  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
  },

  sectionCount: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },

  affirmationCard: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },

  affirmationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  affirmationIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  affirmationIconText: {
    fontSize: 16,
  },

  affirmationText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    flex: 1,
    lineHeight: 22,
  },

  favoriteButtonSmall: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteIconSmall: {
    fontSize: 20,
  },

  infoCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.accent[50],
  },

  infoIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },

  infoTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  infoText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
});
