import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type Affirmation = {
  id: string;
  text: string;
  category: string;
  isFavorite: boolean;
};

export const AffirmationsScreen = ({ navigation }: any) => {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([
    {
      id: '1',
      text: 'I am worthy of love and respect, exactly as I am.',
      category: 'Self-Love',
      isFavorite: false,
    },
    {
      id: '2',
      text: 'Every day, I am becoming a better version of myself.',
      category: 'Growth',
      isFavorite: true,
    },
    {
      id: '3',
      text: 'I choose to focus on what I can control and let go of what I cannot.',
      category: 'Control',
      isFavorite: false,
    },
    {
      id: '4',
      text: 'My mental health is a priority, and I give myself permission to rest.',
      category: 'Self-Care',
      isFavorite: true,
    },
    {
      id: '5',
      text: 'I am stronger than my challenges and braver than I believe.',
      category: 'Strength',
      isFavorite: false,
    },
    {
      id: '6',
      text: 'I release negative thoughts and embrace positivity.',
      category: 'Positivity',
      isFavorite: false,
    },
    {
      id: '7',
      text: 'I am grateful for this moment and all the good in my life.',
      category: 'Gratitude',
      isFavorite: true,
    },
    {
      id: '8',
      text: 'I trust the journey, even when I don\'t understand it.',
      category: 'Trust',
      isFavorite: false,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Self-Love', 'Growth', 'Control', 'Self-Care', 'Strength', 'Positivity', 'Gratitude', 'Trust'];

  const toggleFavorite = (id: string) => {
    setAffirmations(prev => prev.map(aff =>
      aff.id === id ? { ...aff, isFavorite: !aff.isFavorite } : aff
    ));
  };

  const shareAffirmation = async (text: string) => {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAffirmations = selectedCategory === 'All'
    ? affirmations
    : affirmations.filter(aff => aff.category === selectedCategory);

  const dailyAffirmation = affirmations[0]; // In production, this would be based on the current date

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Affirmations</Text>
          <Text style={styles.subtitle}>Positive thoughts for your mind</Text>
        </View>

        {/* Daily Affirmation Card */}
        <View style={styles.dailyCard}>
          <LinearGradient
            colors={[colors.accent.lime, colors.accent.brightLime]}
            style={styles.dailyGradient}
          >
            <Text style={styles.dailyLabel}>✨ Today's Affirmation</Text>
            <Text style={styles.dailyText}>{dailyAffirmation.text}</Text>
            <View style={styles.dailyActions}>
              <TouchableOpacity
                style={styles.dailyButton}
                onPress={() => toggleFavorite(dailyAffirmation.id)}
              >
                <Text style={styles.dailyButtonText}>
                  {dailyAffirmation.isFavorite ? '♥' : '♡'} Favorite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dailyButton}
                onPress={() => shareAffirmation(dailyAffirmation.text)}
              >
                <Text style={styles.dailyButtonText}>⬆ Share</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          style={styles.categoriesScroll}
          showsHorizontalScrollIndicator={false}
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
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Affirmations List */}
        <View style={styles.affirmationsList}>
          {filteredAffirmations.map((affirmation) => (
            <View key={affirmation.id} style={styles.affirmationCard}>
              <View style={styles.affirmationHeader}>
                <Text style={styles.categoryBadge}>{affirmation.category}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(affirmation.id)}>
                  <Text style={styles.favoriteIcon}>
                    {affirmation.isFavorite ? '♥' : '♡'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.affirmationText}>{affirmation.text}</Text>
              <View style={styles.affirmationActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => shareAffirmation(affirmation.text)}
                >
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  dailyCard: {
    margin: spacing.md,
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: colors.accent.lime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dailyGradient: {
    padding: spacing.xl,
  },
  dailyLabel: {
    ...typography.h3,
    color: colors.primary.darkBlue,
    marginBottom: spacing.md,
  },
  dailyText: {
    ...typography.h2,
    fontSize: 20,
    color: colors.primary.darkBlue,
    marginBottom: spacing.lg,
    lineHeight: 28,
  },
  dailyActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dailyButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 75, 167, 0.2)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.borderRadius.md,
    alignItems: 'center',
  },
  dailyButtonText: {
    ...typography.bodyBold,
    color: colors.primary.darkBlue,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.md,
    maxHeight: 50,
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.full,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryChipActive: {
    backgroundColor: colors.accent.lime,
  },
  categoryChipText: {
    ...typography.body,
    color: colors.text.primary,
  },
  categoryChipTextActive: {
    ...typography.bodyBold,
    color: colors.primary.darkBlue,
  },
  affirmationsList: {
    padding: spacing.md,
    gap: spacing.md,
  },
  affirmationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  affirmationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    ...typography.caption,
    color: colors.accent.lime,
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.borderRadius.sm,
  },
  favoriteIcon: {
    fontSize: 24,
    color: colors.accent.lime,
  },
  affirmationText: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  affirmationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.md,
  },
  actionButtonText: {
    ...typography.bodyBold,
    color: colors.accent.lime,
  },
});
