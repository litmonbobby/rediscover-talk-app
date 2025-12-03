/**
 * Affirmations Screen - Exact Figma Recreation
 * Matches 87-light-explore-affirmations.png design
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { affirmations, Affirmation, AffirmationCategory, getAffirmationsByCategory } from '../../data/affirmations';

const { width } = Dimensions.get('window');

type AffirmationsStackParamList = {
  Affirmations: undefined;
  AffirmationDetail: { id: string; title: string; category: string };
};

type NavigationProp = NativeStackNavigationProp<AffirmationsStackParamList, 'Affirmations'>;

// Figma-extracted assets
const assets = {
  // Header icons
  logo: require('../../../assets/images/conversation-logo.png'),
  arrowLeft: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-left.png'),
  search: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-search.png'),
  heart: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-heart.png'),
  share: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-send.png'),

  // Affirmation illustrations - using various from illustrations set
  selfWorth1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-26-component-illustrations-set.png'),
  selfWorth2: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-27-component-illustrations-set.png'),
  confidence1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-20-component-illustrations-set.png'),
  confidence2: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-21-component-illustrations-set.png'),
  growth1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-24-component-illustrations-set.png'),
  growth2: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-25-component-illustrations-set.png'),
  gratitude1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-22-component-illustrations-set.png'),
  gratitude2: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-23-component-illustrations-set.png'),
  calm1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-14-component-illustrations-set.png'),
  calm2: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-15-component-illustrations-set.png'),
};

// Category tabs - now includes all 11 categories
const categories: { id: AffirmationCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'self-worth', label: 'Self-Worth' },
  { id: 'confidence', label: 'Confidence' },
  { id: 'growth', label: 'Growth' },
  { id: 'gratitude', label: 'Gratitude' },
  { id: 'calm', label: 'Calm' },
  { id: 'strength', label: 'Strength' },
  { id: 'success', label: 'Success' },
  { id: 'love', label: 'Love' },
  { id: 'health', label: 'Health' },
  { id: 'morning', label: 'Morning' },
  { id: 'evening', label: 'Evening' },
];

// Map categories to illustrations
const getIllustrationForCategory = (category: string) => {
  const illustrationMap: Record<string, any> = {
    'self-worth': assets.selfWorth1,
    confidence: assets.confidence1,
    growth: assets.growth1,
    gratitude: assets.gratitude1,
    calm: assets.calm1,
    strength: assets.confidence2,
    success: assets.growth2,
    love: assets.selfWorth2,
    health: assets.calm2,
    morning: assets.gratitude2,
    evening: assets.calm1,
  };
  return illustrationMap[category] || assets.selfWorth1;
};

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

export const AffirmationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState<AffirmationCategory | 'all'>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    console.log('Search affirmations');
  };

  const handleFavorites = () => {
    console.log('View favorites');
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleShare = async (affirmation: Affirmation) => {
    try {
      await Share.share({
        message: `✨ ${affirmation.message}\n\n— Rediscover Talk Affirmations`,
        title: affirmation.title,
      });
    } catch (error) {
      console.error('Error sharing affirmation:', error);
    }
  };

  const handleAffirmationPress = (affirmation: Affirmation) => {
    console.log('View affirmation detail:', affirmation.title);
  };

  // Filter affirmations by category using the new data
  const filteredAffirmations = useMemo(() => {
    if (activeCategory === 'all') {
      return affirmations;
    }
    return getAffirmationsByCategory(activeCategory);
  }, [activeCategory]);

  const renderAffirmationCard = (affirmation: Affirmation) => {
    return (
      <TouchableOpacity
        key={affirmation.id}
        style={[styles.affirmationCard, { backgroundColor: colors.background.card }]}
        onPress={() => handleAffirmationPress(affirmation)}
        activeOpacity={0.7}
      >
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={getIllustrationForCategory(affirmation.category)}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text.primary }]} numberOfLines={1}>
              {affirmation.title}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleToggleFavorite(affirmation.id)}
              >
                <HeartIcon
                  size={18}
                  color={favorites.has(affirmation.id) ? '#FF6B6B' : colors.text.tertiary}
                  filled={favorites.has(affirmation.id)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(affirmation)}
              >
                <Image
                  source={assets.share}
                  style={[styles.shareIcon, { tintColor: colors.text.tertiary }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={[styles.cardMessage, { color: colors.text.secondary }]}
            numberOfLines={3}
          >
            {affirmation.message}
          </Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>
              {categories.find((c) => c.id === affirmation.category)?.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          Affirmations
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={handleSearch}>
            <Image
              source={assets.search}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleFavorites}>
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
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryTabText,
                {
                  color:
                    activeCategory === category.id ? '#FFFFFF' : colors.text.secondary,
                },
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Affirmations List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {activeCategory === 'all'
              ? 'All Affirmations'
              : categories.find((c) => c.id === activeCategory)?.label}
          </Text>
          <Text style={[styles.sectionCount, { color: colors.text.secondary }]}>
            {filteredAffirmations.length} affirmations
          </Text>
        </View>

        {/* Affirmation Cards */}
        <View style={styles.affirmationsList}>
          {filteredAffirmations.map(renderAffirmationCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
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
    backgroundColor: '#F5F5F5',
  },
  categoryTabActive: {
    backgroundColor: '#9EB567',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
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

  // Affirmations List
  affirmationsList: {
    gap: 16,
  },

  // Affirmation Card
  affirmationCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  illustrationContainer: {
    width: 80,
    height: 80,
    marginRight: 14,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 70,
    height: 70,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  cardActions: {
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
  cardMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(158, 181, 103, 0.15)',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9EB567',
  },
});

export default AffirmationsScreen;
