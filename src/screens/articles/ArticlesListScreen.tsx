/**
 * Articles List Screen - Matches Figma design
 * Browse wellness and mental health articles
 * Supports both light and dark themes
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path } from 'react-native-svg';

type ArticlesStackParamList = {
  ArticlesList: undefined;
  ArticleDetail: { article: Article };
};

type NavigationProp = NativeStackNavigationProp<ArticlesStackParamList, 'ArticlesList'>;

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
}

// Mock articles data
const articles: Article[] = [
  {
    id: 1,
    title: '5 Ways to Practice Mindfulness Daily',
    excerpt: 'Simple techniques to bring mindfulness into your everyday routine...',
    category: 'Mindfulness',
    readTime: '5 min read',
    image: 'mindfulness',
    author: 'Dr. Sarah Chen',
  },
  {
    id: 2,
    title: 'Understanding Anxiety and How to Manage It',
    excerpt: 'Learn about the science behind anxiety and effective coping strategies...',
    category: 'Mental Health',
    readTime: '8 min read',
    image: 'anxiety',
    author: 'Dr. Michael Torres',
  },
  {
    id: 3,
    title: 'The Power of Gratitude Journaling',
    excerpt: 'Discover how writing down what you are grateful for can transform your mindset...',
    category: 'Wellness',
    readTime: '4 min read',
    image: 'gratitude',
    author: 'Emma Williams',
  },
  {
    id: 4,
    title: 'Better Sleep: A Complete Guide',
    excerpt: 'Everything you need to know about improving your sleep quality...',
    category: 'Sleep',
    readTime: '10 min read',
    image: 'sleep',
    author: 'Dr. James Park',
  },
  {
    id: 5,
    title: 'Building Healthy Habits That Stick',
    excerpt: 'The science-backed approach to creating lasting positive changes...',
    category: 'Habits',
    readTime: '6 min read',
    image: 'habits',
    author: 'Lisa Johnson',
  },
];

const categories = ['All', 'Mindfulness', 'Mental Health', 'Wellness', 'Sleep', 'Habits'];

// Search Icon
const SearchIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Bookmark Icon
const BookmarkIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Clock Icon
const ClockIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 6V12L16 14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArticlesListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, typography, isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const handleArticlePress = (article: Article) => {
    navigation.navigate('ArticleDetail', { article });
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background.primary }]}
        edges={['top']}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize['2xl'],
              },
            ]}
          >
            Articles
          </Text>
          <TouchableOpacity style={styles.headerButton}>
            <SearchIcon color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === category
                      ? colors.primary.main
                      : colors.background.secondary,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === category
                        ? '#FFFFFF'
                        : colors.text.secondary,
                  },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Featured Article */}
          {filteredArticles.length > 0 && (
            <TouchableOpacity
              style={[
                styles.featuredCard,
                { backgroundColor: colors.primary.main },
              ]}
              onPress={() => handleArticlePress(filteredArticles[0])}
              activeOpacity={0.9}
            >
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>FEATURED</Text>
              </View>
              <Text style={styles.featuredTitle}>{filteredArticles[0].title}</Text>
              <Text style={styles.featuredExcerpt}>{filteredArticles[0].excerpt}</Text>
              <View style={styles.featuredMeta}>
                <Text style={styles.featuredAuthor}>{filteredArticles[0].author}</Text>
                <View style={styles.readTimeContainer}>
                  <ClockIcon color="rgba(255,255,255,0.8)" />
                  <Text style={styles.featuredReadTime}>
                    {filteredArticles[0].readTime}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* Article List */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            Latest Articles
          </Text>

          {filteredArticles.slice(1).map((article) => (
            <TouchableOpacity
              key={article.id}
              style={[
                styles.articleCard,
                {
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.light,
                },
              ]}
              onPress={() => handleArticlePress(article)}
              activeOpacity={0.8}
            >
              <View style={styles.articleContent}>
                {/* Top row: Category badge + Bookmark */}
                <View style={styles.articleTopRow}>
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: colors.primary.main + '20' },
                    ]}
                  >
                    <Text style={[styles.categoryBadgeText, { color: colors.primary.main }]}>
                      {article.category}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.bookmarkButton}>
                    <BookmarkIcon color={colors.text.tertiary} />
                  </TouchableOpacity>
                </View>

                {/* Title */}
                <Text
                  style={[
                    styles.articleTitle,
                    {
                      color: colors.text.primary,
                      fontFamily: typography.fontFamily.primary,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {article.title}
                </Text>

                {/* Bottom row: Author + Read time */}
                <View style={styles.articleMeta}>
                  <Text style={[styles.articleAuthor, { color: colors.text.secondary }]}>
                    {article.author}
                  </Text>
                  <View style={styles.readTimeContainer}>
                    <ClockIcon color={colors.text.tertiary} />
                    <Text style={[styles.articleReadTime, { color: colors.text.tertiary }]}>
                      {article.readTime}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Bottom spacing */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontWeight: '700',
  },
  headerButton: {
    padding: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  featuredCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 30,
  },
  featuredExcerpt: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredAuthor: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredReadTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  articleCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  articleContent: {
    flex: 1,
  },
  articleTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 22,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  articleAuthor: {
    fontSize: 13,
  },
  articleReadTime: {
    fontSize: 12,
  },
  bookmarkButton: {
    padding: 4,
  },
});

export default ArticlesListScreen;
