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
  // Self-Love (18 affirmations)
  { id: '1', text: 'I am worthy of love and respect', category: 'Self-Love', icon: '❤️' },
  { id: '2', text: 'I accept myself unconditionally', category: 'Self-Love', icon: '❤️' },
  { id: '3', text: 'I am enough just as I am', category: 'Self-Love', icon: '❤️' },
  { id: '4', text: 'I honor my needs and boundaries', category: 'Self-Love', icon: '❤️' },
  { id: '5', text: 'I deserve kindness from myself and others', category: 'Self-Love', icon: '❤️' },
  { id: '6', text: 'I embrace my unique qualities', category: 'Self-Love', icon: '❤️' },
  { id: '7', text: 'I forgive myself and learn from my mistakes', category: 'Self-Love', icon: '❤️' },
  { id: '8', text: 'I am proud of who I am becoming', category: 'Self-Love', icon: '❤️' },
  { id: '9', text: 'I treat myself with compassion and understanding', category: 'Self-Love', icon: '❤️' },
  { id: '10', text: 'My self-worth comes from within', category: 'Self-Love', icon: '❤️' },
  { id: '89', text: 'I celebrate my individuality', category: 'Self-Love', icon: '❤️' },
  { id: '90', text: 'I am gentle with myself on difficult days', category: 'Self-Love', icon: '❤️' },
  { id: '91', text: 'I love and accept all parts of myself', category: 'Self-Love', icon: '❤️' },
  { id: '92', text: 'My flaws make me beautifully human', category: 'Self-Love', icon: '❤️' },
  { id: '93', text: 'I prioritize my well-being without guilt', category: 'Self-Love', icon: '❤️' },
  { id: '94', text: 'I am my own best friend', category: 'Self-Love', icon: '❤️' },
  { id: '95', text: 'I speak to myself with love and encouragement', category: 'Self-Love', icon: '❤️' },
  { id: '96', text: 'I am whole and complete on my own', category: 'Self-Love', icon: '❤️' },

  // Confidence (18 affirmations)
  { id: '11', text: 'I am confident in my abilities', category: 'Confidence', icon: '💪' },
  { id: '12', text: 'I trust myself to make good decisions', category: 'Confidence', icon: '💪' },
  { id: '13', text: 'I am capable of achieving my goals', category: 'Confidence', icon: '💪' },
  { id: '14', text: 'I believe in my potential', category: 'Confidence', icon: '💪' },
  { id: '15', text: 'I face challenges with courage', category: 'Confidence', icon: '💪' },
  { id: '16', text: 'My voice matters and deserves to be heard', category: 'Confidence', icon: '💪' },
  { id: '17', text: 'I am skilled and talented', category: 'Confidence', icon: '💪' },
  { id: '18', text: 'I embrace new opportunities with confidence', category: 'Confidence', icon: '💪' },
  { id: '19', text: 'I trust my intuition and inner wisdom', category: 'Confidence', icon: '💪' },
  { id: '20', text: 'I am becoming more confident every day', category: 'Confidence', icon: '💪' },
  { id: '97', text: 'I stand tall in my truth', category: 'Confidence', icon: '💪' },
  { id: '98', text: 'I have valuable contributions to make', category: 'Confidence', icon: '💪' },
  { id: '99', text: 'I am proud of my accomplishments', category: 'Confidence', icon: '💪' },
  { id: '100', text: 'I step out of my comfort zone with ease', category: 'Confidence', icon: '💪' },
  { id: '101', text: 'My opinions and ideas are valuable', category: 'Confidence', icon: '💪' },
  { id: '102', text: 'I am capable of learning anything I set my mind to', category: 'Confidence', icon: '💪' },
  { id: '103', text: 'I believe in myself completely', category: 'Confidence', icon: '💪' },
  { id: '104', text: 'I walk confidently toward my dreams', category: 'Confidence', icon: '💪' },

  // Peace (18 affirmations)
  { id: '21', text: 'I am calm and at peace', category: 'Peace', icon: '🕊️' },
  { id: '22', text: 'I release all tension and worry', category: 'Peace', icon: '🕊️' },
  { id: '23', text: 'I choose peace over worry', category: 'Peace', icon: '🕊️' },
  { id: '24', text: 'I find serenity in the present moment', category: 'Peace', icon: '🕊️' },
  { id: '25', text: 'My mind is clear and tranquil', category: 'Peace', icon: '🕊️' },
  { id: '26', text: 'I let go of what I cannot control', category: 'Peace', icon: '🕊️' },
  { id: '27', text: 'Peace flows through my body and mind', category: 'Peace', icon: '🕊️' },
  { id: '28', text: 'I breathe in calm and exhale stress', category: 'Peace', icon: '🕊️' },
  { id: '29', text: 'I create peaceful spaces in my life', category: 'Peace', icon: '🕊️' },
  { id: '30', text: 'Inner peace is my natural state', category: 'Peace', icon: '🕊️' },
  { id: '105', text: 'I am anchored in stillness', category: 'Peace', icon: '🕊️' },
  { id: '106', text: 'I trust the timing of my life', category: 'Peace', icon: '🕊️' },
  { id: '107', text: 'I am patient with myself and others', category: 'Peace', icon: '🕊️' },
  { id: '108', text: 'Serenity surrounds me always', category: 'Peace', icon: '🕊️' },
  { id: '109', text: 'I accept things as they are', category: 'Peace', icon: '🕊️' },
  { id: '110', text: 'My thoughts are peaceful and harmonious', category: 'Peace', icon: '🕊️' },
  { id: '111', text: 'I respond to challenges with calmness', category: 'Peace', icon: '🕊️' },
  { id: '112', text: 'I am at ease with uncertainty', category: 'Peace', icon: '🕊️' },

  // Gratitude (18 affirmations)
  { id: '31', text: 'I am grateful for this moment', category: 'Gratitude', icon: '🙏' },
  { id: '32', text: 'I appreciate all the good in my life', category: 'Gratitude', icon: '🙏' },
  { id: '33', text: 'I am thankful for my journey', category: 'Gratitude', icon: '🙏' },
  { id: '34', text: 'Every day brings new blessings', category: 'Gratitude', icon: '🙏' },
  { id: '35', text: 'I am grateful for my health and well-being', category: 'Gratitude', icon: '🙏' },
  { id: '36', text: 'I appreciate the love in my life', category: 'Gratitude', icon: '🙏' },
  { id: '37', text: 'I see beauty and abundance around me', category: 'Gratitude', icon: '🙏' },
  { id: '38', text: 'I am thankful for lessons learned', category: 'Gratitude', icon: '🙏' },
  { id: '39', text: 'Gratitude fills my heart with joy', category: 'Gratitude', icon: '🙏' },
  { id: '40', text: 'I acknowledge and celebrate small victories', category: 'Gratitude', icon: '🙏' },
  { id: '113', text: 'I am blessed with amazing opportunities', category: 'Gratitude', icon: '🙏' },
  { id: '114', text: 'I appreciate the simple pleasures in life', category: 'Gratitude', icon: '🙏' },
  { id: '115', text: 'I am thankful for my body and all it does', category: 'Gratitude', icon: '🙏' },
  { id: '116', text: 'I find reasons to be grateful every day', category: 'Gratitude', icon: '🙏' },
  { id: '117', text: 'I am grateful for the people who support me', category: 'Gratitude', icon: '🙏' },
  { id: '118', text: 'I appreciate my past experiences that shaped me', category: 'Gratitude', icon: '🙏' },
  { id: '119', text: 'I am thankful for new beginnings', category: 'Gratitude', icon: '🙏' },
  { id: '120', text: 'My heart overflows with gratitude', category: 'Gratitude', icon: '🙏' },

  // Strength (18 affirmations)
  { id: '41', text: 'I am strong and resilient', category: 'Strength', icon: '⚡' },
  { id: '42', text: 'I can handle whatever comes my way', category: 'Strength', icon: '⚡' },
  { id: '43', text: 'I overcome challenges with grace', category: 'Strength', icon: '⚡' },
  { id: '44', text: 'My strength grows with every obstacle', category: 'Strength', icon: '⚡' },
  { id: '45', text: 'I am braver than I think', category: 'Strength', icon: '⚡' },
  { id: '46', text: 'I have survived 100% of my worst days', category: 'Strength', icon: '⚡' },
  { id: '47', text: 'I am powerful beyond measure', category: 'Strength', icon: '⚡' },
  { id: '48', text: 'Difficult times help me grow stronger', category: 'Strength', icon: '⚡' },
  { id: '49', text: 'I trust in my ability to persevere', category: 'Strength', icon: '⚡' },
  { id: '50', text: 'My inner strength carries me forward', category: 'Strength', icon: '⚡' },
  { id: '121', text: 'I am unshakeable in my core', category: 'Strength', icon: '⚡' },
  { id: '122', text: 'Challenges reveal my hidden strengths', category: 'Strength', icon: '⚡' },
  { id: '123', text: 'I have the courage to keep going', category: 'Strength', icon: '⚡' },
  { id: '124', text: 'My spirit is unconquerable', category: 'Strength', icon: '⚡' },
  { id: '125', text: 'I am stronger than my fears', category: 'Strength', icon: '⚡' },
  { id: '126', text: 'I bounce back from setbacks', category: 'Strength', icon: '⚡' },
  { id: '127', text: 'My determination is unwavering', category: 'Strength', icon: '⚡' },
  { id: '128', text: 'I rise above adversity with grace', category: 'Strength', icon: '⚡' },

  // Success (18 affirmations)
  { id: '51', text: 'I am worthy of success', category: 'Success', icon: '🌟' },
  { id: '52', text: 'Success flows to me naturally', category: 'Success', icon: '🌟' },
  { id: '53', text: 'I create my own opportunities', category: 'Success', icon: '🌟' },
  { id: '54', text: 'I am aligned with my purpose', category: 'Success', icon: '🌟' },
  { id: '55', text: 'My potential is limitless', category: 'Success', icon: '🌟' },
  { id: '56', text: 'I celebrate my achievements', category: 'Success', icon: '🌟' },
  { id: '57', text: 'I attract abundance and prosperity', category: 'Success', icon: '🌟' },
  { id: '58', text: 'Every step forward is progress', category: 'Success', icon: '🌟' },
  { id: '59', text: 'I am focused and determined', category: 'Success', icon: '🌟' },
  { id: '60', text: 'My dreams are within reach', category: 'Success', icon: '🌟' },
  { id: '129', text: 'I am destined for greatness', category: 'Success', icon: '🌟' },
  { id: '130', text: 'I make progress every single day', category: 'Success', icon: '🌟' },
  { id: '131', text: 'My hard work pays off abundantly', category: 'Success', icon: '🌟' },
  { id: '132', text: 'I am open to infinite possibilities', category: 'Success', icon: '🌟' },
  { id: '133', text: 'Success is my birthright', category: 'Success', icon: '🌟' },
  { id: '134', text: 'I turn my vision into reality', category: 'Success', icon: '🌟' },
  { id: '135', text: 'I am worthy of all my achievements', category: 'Success', icon: '🌟' },
  { id: '136', text: 'My success inspires others', category: 'Success', icon: '🌟' },

  // Healing (18 affirmations)
  { id: '61', text: 'I am healing and growing every day', category: 'Healing', icon: '🌱' },
  { id: '62', text: 'I release what no longer serves me', category: 'Healing', icon: '🌱' },
  { id: '63', text: 'I am becoming my best self', category: 'Healing', icon: '🌱' },
  { id: '64', text: 'Each day brings new healing', category: 'Healing', icon: '🌱' },
  { id: '65', text: 'I give myself permission to heal at my own pace', category: 'Healing', icon: '🌱' },
  { id: '66', text: 'My past does not define me', category: 'Healing', icon: '🌱' },
  { id: '67', text: 'I am transforming pain into wisdom', category: 'Healing', icon: '🌱' },
  { id: '68', text: 'I welcome positive change in my life', category: 'Healing', icon: '🌱' },
  { id: '69', text: 'I am creating a brighter future', category: 'Healing', icon: '🌱' },
  { id: '70', text: 'Healing is a journey, and I am on my way', category: 'Healing', icon: '🌱' },
  { id: '137', text: 'I am stronger in my broken places', category: 'Healing', icon: '🌱' },
  { id: '138', text: 'Every breath brings me closer to wholeness', category: 'Healing', icon: '🌱' },
  { id: '139', text: 'I trust the process of my healing', category: 'Healing', icon: '🌱' },
  { id: '140', text: 'I am gentle with my healing heart', category: 'Healing', icon: '🌱' },
  { id: '141', text: 'New growth comes from letting go', category: 'Healing', icon: '🌱' },
  { id: '142', text: 'I honor my healing process', category: 'Healing', icon: '🌱' },
  { id: '143', text: 'I am evolving into my highest self', category: 'Healing', icon: '🌱' },
  { id: '144', text: 'My wounds are becoming my wisdom', category: 'Healing', icon: '🌱' },

  // Positivity (18 affirmations)
  { id: '71', text: 'I choose joy and happiness', category: 'Positivity', icon: '😊' },
  { id: '72', text: 'Positive energy flows through me', category: 'Positivity', icon: '😊' },
  { id: '73', text: 'I attract positivity into my life', category: 'Positivity', icon: '😊' },
  { id: '74', text: 'Today is filled with possibilities', category: 'Positivity', icon: '😊' },
  { id: '75', text: 'I radiate positive vibes', category: 'Positivity', icon: '😊' },
  { id: '76', text: 'Good things are coming my way', category: 'Positivity', icon: '😊' },
  { id: '77', text: 'I focus on what I can control', category: 'Positivity', icon: '😊' },
  { id: '78', text: 'My positive mindset creates positive outcomes', category: 'Positivity', icon: '😊' },
  { id: '79', text: 'I see opportunities instead of obstacles', category: 'Positivity', icon: '😊' },
  { id: '80', text: 'Optimism guides my thoughts and actions', category: 'Positivity', icon: '😊' },
  { id: '81', text: 'I am surrounded by love and support', category: 'Positivity', icon: '😊' },
  { id: '82', text: 'Every moment is a fresh start', category: 'Positivity', icon: '😊' },
  { id: '83', text: 'I choose to see the good in every situation', category: 'Positivity', icon: '😊' },
  { id: '84', text: 'My life is filled with joy and abundance', category: 'Positivity', icon: '😊' },
  { id: '85', text: 'I embrace each day with enthusiasm', category: 'Positivity', icon: '😊' },
  { id: '86', text: 'Happiness is my natural state of being', category: 'Positivity', icon: '😊' },
  { id: '87', text: 'I am open to receiving all the good life offers', category: 'Positivity', icon: '😊' },
  { id: '88', text: 'My positive attitude is contagious', category: 'Positivity', icon: '😊' },
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
