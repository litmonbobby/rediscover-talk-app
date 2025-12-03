/**
 * Quotes Screen - Inspirational quotes for mental wellness
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

const { width } = Dimensions.get('window');

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
}

const quotes: Quote[] = [
  {
    id: '1',
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Resilience",
  },
  {
    id: '2',
    text: "Your present circumstances don't determine where you can go; they merely determine where you start.",
    author: "Nido Qubein",
    category: "Growth",
  },
  {
    id: '3',
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
    category: "Self-Care",
  },
  {
    id: '4',
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
    category: "Mindfulness",
  },
  {
    id: '5',
    text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
    author: "Noam Shpancer",
    category: "Mental Health",
  },
];

export const QuotesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    const newLiked = new Set(liked);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLiked(newLiked);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Daily Quotes</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Featured Quote */}
        <View style={[styles.featuredCard, { backgroundColor: '#9EB567' }]}>
          <Text style={styles.quoteOfDay}>Quote of the Day</Text>
          <Text style={styles.featuredQuote}>"{quotes[0].text}"</Text>
          <Text style={styles.featuredAuthor}>— {quotes[0].author}</Text>
        </View>

        {/* All Quotes */}
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          More Inspiration
        </Text>

        {quotes.slice(1).map((quote) => (
          <View
            key={quote.id}
            style={[styles.quoteCard, { backgroundColor: colors.background.card }]}
          >
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{quote.category}</Text>
            </View>
            <Text style={[styles.quoteText, { color: colors.text.primary }]}>
              "{quote.text}"
            </Text>
            <View style={styles.quoteFooter}>
              <Text style={[styles.authorText, { color: colors.text.secondary }]}>
                — {quote.author}
              </Text>
              <TouchableOpacity onPress={() => toggleLike(quote.id)}>
                <Text style={[styles.likeButton, liked.has(quote.id) && styles.liked]}>
                  {liked.has(quote.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  featuredCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  quoteOfDay: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  featuredQuote: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 26,
    marginBottom: 16,
  },
  featuredAuthor: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quoteCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(158, 181, 103, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 11,
    color: '#9EB567',
    fontWeight: '600',
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  quoteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  likeButton: {
    fontSize: 20,
  },
  liked: {
    transform: [{ scale: 1.1 }],
  },
});

export default QuotesScreen;
