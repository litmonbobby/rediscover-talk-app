/**
 * Quotes Screen - Inspirational quotes for mental wellness
 * Updated to use comprehensive quotes data file with 77+ quotes
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Share,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import {
  quotes,
  Quote,
  QuoteCategory,
  getQuotesByCategory,
  getDailyQuote,
  getCategoryLabel,
} from '../../data/quotes';
import { favoritesService } from '../../services/FavoritesService';

const { width } = Dimensions.get('window');

// Figma-extracted assets
const assets = {
  search: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-search.png'),
  heart: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-heart.png'),
  share: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-send.png'),
};

// Category tabs - includes all 11 categories
const categories: { id: QuoteCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'resilience', label: 'Resilience' },
  { id: 'growth', label: 'Growth' },
  { id: 'self-care', label: 'Self-Care' },
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'mental-health', label: 'Mental Health' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'courage', label: 'Courage' },
  { id: 'gratitude', label: 'Gratitude' },
  { id: 'wisdom', label: 'Wisdom' },
  { id: 'hope', label: 'Hope' },
  { id: 'love', label: 'Love' },
];

// Back Arrow Icon
const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Heart Icon for favorites
const HeartIcon: React.FC<{ size?: number; color?: string; filled?: boolean }> = ({
  size = 20,
  color = '#9EB567',
  filled = false,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? color : 'transparent'}
    />
  </Svg>
);

export const QuotesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState<QuoteCategory | 'all'>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const dailyQuote = getDailyQuote();

  // Load favorites when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const allFavorites = await favoritesService.getAllFavorites();
      const quoteFavorites = allFavorites
        .filter(f => f.type === 'quote')
        .map(f => f.id);
      setFavorites(new Set(quoteFavorites));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (quote: Quote) => {
    try {
      const isFavorited = await favoritesService.toggleFavorite({
        id: quote.id,
        type: 'quote',
        title: `Quote by ${quote.author}`,
        subtitle: getCategoryLabel(quote.category),
        metadata: {
          message: quote.text,
          author: quote.author,
          category: quote.category,
        },
      });

      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (isFavorited) {
          newFavorites.add(quote.id);
        } else {
          newFavorites.delete(quote.id);
        }
        return newFavorites;
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleShare = async (quote: Quote) => {
    try {
      await Share.share({
        message: `💭 "${quote.text}"\n\n— ${quote.author}\n\n— Rediscover Talk`,
        title: 'Inspirational Quote',
      });
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    console.log('Search quotes');
  };

  const handleFavoritesView = () => {
    navigation.navigate('Favorites' as any);
  };

  // Filter quotes by category
  const filteredQuotes = useMemo(() => {
    if (activeCategory === 'all') {
      return quotes;
    }
    return getQuotesByCategory(activeCategory);
  }, [activeCategory]);

  const renderQuoteCard = (quote: Quote) => (
    <View
      key={quote.id}
      style={[styles.quoteCard, { backgroundColor: colors.background.card }]}
    >
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{getCategoryLabel(quote.category)}</Text>
      </View>
      <Text style={[styles.quoteText, { color: colors.text.primary }]}>
        "{quote.text}"
      </Text>
      <View style={styles.quoteFooter}>
        <Text style={[styles.authorText, { color: colors.text.secondary }]}>
          — {quote.author}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => toggleFavorite(quote)} style={styles.actionButton}>
            <HeartIcon
              size={18}
              color={favorites.has(quote.id) ? '#FF6B6B' : colors.text.tertiary}
              filled={favorites.has(quote.id)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare(quote)} style={styles.actionButton}>
            <Image
              source={assets.share}
              style={[styles.shareIcon, { tintColor: colors.text.tertiary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Daily Quotes</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={handleSearch}>
            <Image
              source={assets.search}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleFavoritesView}>
            <Image
              source={assets.heart}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              activeCategory === category.id && styles.categoryTabActive,
              { backgroundColor: activeCategory === category.id ? '#9EB567' : colors.background.card },
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryTabText,
                {
                  color: activeCategory === category.id ? '#FFFFFF' : colors.text.secondary,
                },
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Featured Quote of the Day */}
        <TouchableOpacity
          style={[styles.featuredCard, { backgroundColor: '#9EB567' }]}
          onPress={() => handleShare(dailyQuote)}
          activeOpacity={0.9}
        >
          <Text style={styles.quoteOfDay}>Quote of the Day</Text>
          <Text style={styles.featuredQuote}>"{dailyQuote.text}"</Text>
          <View style={styles.featuredFooter}>
            <Text style={styles.featuredAuthor}>— {dailyQuote.author}</Text>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>{getCategoryLabel(dailyQuote.category)}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {activeCategory === 'all'
              ? 'All Quotes'
              : categories.find((c) => c.id === activeCategory)?.label}
          </Text>
          <Text style={[styles.sectionCount, { color: colors.text.secondary }]}>
            {filteredQuotes.length} quotes
          </Text>
        </View>

        {/* Quotes List */}
        <View style={styles.quotesList}>
          {filteredQuotes.map(renderQuoteCard)}
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },

  // Categories
  categoriesContainer: {
    maxHeight: 48,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoryTabActive: {
    backgroundColor: '#9EB567',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '500',
  },

  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },

  // Featured Card
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
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredAuthor: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
    flex: 1,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionCount: {
    fontSize: 13,
  },

  // Quotes List
  quotesList: {
    gap: 12,
  },

  // Quote Card
  quoteCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  shareIcon: {
    width: 18,
    height: 18,
  },
});

export default QuotesScreen;
