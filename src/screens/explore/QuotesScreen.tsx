/**
 * QuotesScreen
 * Inspirational quotes for motivation
 * Reference: Figma screen 80-light-explore-quotes.png
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

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
}

const quotes: Quote[] = [
  // Mindfulness
  { id: '1', text: 'The present moment is the only moment available to us, and it is the door to all moments.', author: 'Thích Nhất Hạnh', category: 'Mindfulness' },
  { id: '2', text: 'Be happy in the moment, that\'s enough. Each moment is all we need, not more.', author: 'Mother Teresa', category: 'Mindfulness' },
  // Strength
  { id: '3', text: 'You are braver than you believe, stronger than you seem, and smarter than you think.', author: 'A.A. Milne', category: 'Strength' },
  { id: '4', text: 'It is during our darkest moments that we must focus to see the light.', author: 'Aristotle', category: 'Strength' },
  // Growth
  { id: '5', text: 'The only impossible journey is the one you never begin.', author: 'Tony Robbins', category: 'Growth' },
  { id: '6', text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.', author: 'Ralph Waldo Emerson', category: 'Growth' },
  // Peace
  { id: '7', text: 'Peace comes from within. Do not seek it without.', author: 'Buddha', category: 'Peace' },
  { id: '8', text: 'Nothing can bring you peace but yourself.', author: 'Ralph Waldo Emerson', category: 'Peace' },
  // Hope
  { id: '9', text: 'Hope is being able to see that there is light despite all of the darkness.', author: 'Desmond Tutu', category: 'Hope' },
  { id: '10', text: 'Once you choose hope, anything is possible.', author: 'Christopher Reeve', category: 'Hope' },
  // Self-Love
  { id: '11', text: 'To love oneself is the beginning of a lifelong romance.', author: 'Oscar Wilde', category: 'Self-Love' },
  { id: '12', text: 'You yourself, as much as anybody in the entire universe, deserve your love and affection.', author: 'Buddha', category: 'Self-Love' },
  // Courage
  { id: '13', text: 'Courage doesn\'t always roar. Sometimes courage is the quiet voice at the end of the day saying, "I will try again tomorrow."', author: 'Mary Anne Radmacher', category: 'Courage' },
  { id: '14', text: 'You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.', author: 'Eleanor Roosevelt', category: 'Courage' },
  // Gratitude
  { id: '15', text: 'Gratitude turns what we have into enough.', author: 'Aesop', category: 'Gratitude' },
  { id: '16', text: 'The more grateful I am, the more beauty I see.', author: 'Mary Davis', category: 'Gratitude' },
  // Happiness
  { id: '17', text: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama', category: 'Happiness' },
  { id: '18', text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama', category: 'Happiness' },
  // Wisdom
  { id: '19', text: 'Knowing yourself is the beginning of all wisdom.', author: 'Aristotle', category: 'Wisdom' },
  { id: '20', text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates', category: 'Wisdom' },
];

const categories = ['All', 'Mindfulness', 'Strength', 'Growth', 'Peace', 'Hope', 'Self-Love', 'Courage', 'Gratitude', 'Happiness', 'Wisdom'];

export function QuotesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentQuote, setCurrentQuote] = useState(0);

  const filteredQuotes = quotes.filter(
    (quote) => selectedCategory === 'All' || quote.category === selectedCategory
  );

  const dailyQuote = filteredQuotes[currentQuote % filteredQuotes.length];

  const handleNext = () => {
    setCurrentQuote((prev) => (prev + 1) % filteredQuotes.length);
  };

  const handlePrevious = () => {
    setCurrentQuote((prev) =>
      prev === 0 ? filteredQuotes.length - 1 : prev - 1
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
    // TODO: Save to backend
  };

  const handleShare = (quote: Quote) => {
    // TODO: Implement share functionality
    console.log('Share quote:', quote.text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Quotes</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quote of the Day */}
        <Card variant="elevated" style={styles.dailyCard}>
          <Text style={styles.dailyLabel}>Quote of the Day</Text>
          <Text style={styles.quoteSymbol}>"</Text>
          <Text style={styles.dailyText}>{dailyQuote.text}</Text>
          <View style={styles.dailyAuthor}>
            <Text style={styles.dailyAuthorText}>— {dailyQuote.author}</Text>
          </View>
          <View style={styles.dailyCategory}>
            <Text style={styles.dailyCategoryText}>{dailyQuote.category}</Text>
          </View>
          <View style={styles.dailyActions}>
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>
            <View style={styles.centerActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleFavorite(dailyQuote.id)}
              >
                <Text style={styles.actionIcon}>
                  {favorites.includes(dailyQuote.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(dailyQuote)}
              >
                <Text style={styles.actionIcon}>📤</Text>
              </TouchableOpacity>
            </View>
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
                setCurrentQuote(0);
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

        {/* All Quotes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Quotes' : selectedCategory}
          </Text>
          <Text style={styles.sectionCount}>
            {filteredQuotes.length} quotes
          </Text>
          {filteredQuotes.map((quote) => (
            <Card key={quote.id} variant="default" style={styles.quoteCard}>
              <View style={styles.quoteContent}>
                <View style={styles.quoteTextContainer}>
                  <Text style={styles.quoteText}>{quote.text}</Text>
                  <Text style={styles.quoteAuthor}>— {quote.author}</Text>
                  <View style={styles.quoteCategoryBadge}>
                    <Text style={styles.quoteCategoryText}>{quote.category}</Text>
                  </View>
                </View>
                <View style={styles.quoteActions}>
                  <TouchableOpacity
                    style={styles.quoteActionButton}
                    onPress={() => toggleFavorite(quote.id)}
                  >
                    <Text style={styles.quoteActionIcon}>
                      {favorites.includes(quote.id) ? '❤️' : '🤍'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.quoteActionButton}
                    onPress={() => handleShare(quote)}
                  >
                    <Text style={styles.quoteActionIcon}>📤</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
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
    backgroundColor: theme.colors.primary[50],
  },

  dailyLabel: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },

  quoteSymbol: {
    fontSize: 72,
    color: theme.colors.primary[200],
    textAlign: 'center',
    lineHeight: 72,
    marginBottom: -theme.spacing.md,
  },

  dailyText: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 32,
    fontStyle: 'italic',
  },

  dailyAuthor: {
    marginBottom: theme.spacing.md,
  },

  dailyAuthorText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  dailyCategory: {
    backgroundColor: theme.colors.primary.DEFAULT,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg,
    alignSelf: 'center',
  },

  dailyCategoryText: {
    ...theme.typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  dailyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  centerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionIcon: {
    fontSize: 24,
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

  quoteCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },

  quoteContent: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  quoteTextContainer: {
    flex: 1,
  },

  quoteText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontStyle: 'italic',
    marginBottom: theme.spacing.sm,
    lineHeight: 24,
  },

  quoteAuthor: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },

  quoteCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.base,
  },

  quoteCategoryText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontSize: 11,
  },

  quoteActions: {
    gap: theme.spacing.xs,
  },

  quoteActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quoteActionIcon: {
    fontSize: 18,
  },
});
