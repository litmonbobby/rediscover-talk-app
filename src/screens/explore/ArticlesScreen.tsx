/**
 * ArticlesScreen
 * Browse wellness and mental health articles
 * Reference: Figma screen 65-light-explore-articles.png
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
import { Card, Input } from '../../components';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number; // in minutes
  author: string;
  publishedDate: string;
  imageUrl?: string;
  isFeatured?: boolean;
}

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Understanding Anxiety: A Complete Guide',
    excerpt: 'Learn about the science behind anxiety and evidence-based strategies to manage it effectively.',
    category: 'Anxiety',
    readTime: 8,
    author: 'Dr. Sarah Mitchell',
    publishedDate: '2024-01-15',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'The Power of Mindfulness in Daily Life',
    excerpt: 'Discover how mindfulness practices can transform your everyday experiences and reduce stress.',
    category: 'Mindfulness',
    readTime: 6,
    author: 'James Chen',
    publishedDate: '2024-01-12',
  },
  {
    id: '3',
    title: 'Sleep Hygiene: Tips for Better Rest',
    excerpt: 'Improve your sleep quality with these scientifically-backed habits and routines.',
    category: 'Sleep',
    readTime: 5,
    author: 'Dr. Emily Rodriguez',
    publishedDate: '2024-01-10',
  },
  {
    id: '4',
    title: 'Building Emotional Resilience',
    excerpt: 'Learn practical techniques to bounce back from life\'s challenges and build mental strength.',
    category: 'Resilience',
    readTime: 7,
    author: 'Michael Thompson',
    publishedDate: '2024-01-08',
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Managing Stress at Work',
    excerpt: 'Expert strategies for maintaining your mental health in high-pressure work environments.',
    category: 'Stress',
    readTime: 6,
    author: 'Lisa Anderson',
    publishedDate: '2024-01-05',
  },
  {
    id: '6',
    title: 'The Science of Gratitude',
    excerpt: 'Explore how practicing gratitude can rewire your brain for greater happiness and wellbeing.',
    category: 'Happiness',
    readTime: 5,
    author: 'Dr. David Kim',
    publishedDate: '2024-01-03',
  },
];

const categories = ['All', 'Anxiety', 'Mindfulness', 'Sleep', 'Stress', 'Resilience', 'Happiness'];

export function ArticlesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = sampleArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter((a) => a.isFeatured);
  const regularArticles = filteredArticles.filter((a) => !a.isFeatured);

  const handleArticlePress = (article: Article) => {
    // TODO: Navigate to article detail
    console.log('Article pressed:', article.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Articles</Text>
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
            placeholder="Search articles..."
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

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Articles</Text>
            {featuredArticles.map((article) => (
              <TouchableOpacity
                key={article.id}
                onPress={() => handleArticlePress(article)}
                activeOpacity={0.7}
              >
                <Card variant="elevated" style={styles.featuredCard}>
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>FEATURED</Text>
                  </View>
                  <View style={styles.articleImagePlaceholder}>
                    <Text style={styles.articleImageIcon}>📰</Text>
                  </View>
                  <Text style={styles.featuredTitle}>{article.title}</Text>
                  <Text style={styles.featuredExcerpt} numberOfLines={2}>
                    {article.excerpt}
                  </Text>
                  <View style={styles.articleMeta}>
                    <Text style={styles.metaText}>By {article.author}</Text>
                    <Text style={styles.metaDivider}>•</Text>
                    <Text style={styles.metaText}>{article.readTime} min read</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Regular Articles */}
        <View style={styles.section}>
          {featuredArticles.length > 0 && (
            <Text style={styles.sectionTitle}>All Articles</Text>
          )}
          {regularArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              onPress={() => handleArticlePress(article)}
              activeOpacity={0.7}
            >
              <Card variant="default" style={styles.articleCard}>
                <View style={styles.articleContent}>
                  <View style={styles.articleInfo}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{article.category}</Text>
                    </View>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Text style={styles.articleExcerpt} numberOfLines={2}>
                      {article.excerpt}
                    </Text>
                    <View style={styles.articleMeta}>
                      <Text style={styles.metaText}>By {article.author}</Text>
                      <Text style={styles.metaDivider}>•</Text>
                      <Text style={styles.metaText}>{article.readTime} min</Text>
                      <Text style={styles.metaDivider}>•</Text>
                      <Text style={styles.metaText}>
                        {new Date(article.publishedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.articleThumbnail}>
                    <Text style={styles.thumbnailIcon}>📄</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {filteredArticles.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No articles found</Text>
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
    marginBottom: theme.spacing.lg,
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
    marginBottom: theme.spacing.md,
  },

  featuredCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },

  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing.md,
  },

  featuredBadgeText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '700',
    fontSize: 10,
  },

  articleImagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.base,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },

  articleImageIcon: {
    fontSize: 64,
  },

  featuredTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  featuredExcerpt: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    lineHeight: 22,
  },

  articleCard: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },

  articleContent: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  articleInfo: {
    flex: 1,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary[50],
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing.xs,
  },

  categoryBadgeText: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
    fontSize: 10,
  },

  articleTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },

  articleExcerpt: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    fontSize: 13,
    marginBottom: theme.spacing.xs,
    lineHeight: 18,
  },

  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  metaText: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },

  metaDivider: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginHorizontal: 4,
  },

  articleThumbnail: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.base,
    justifyContent: 'center',
    alignItems: 'center',
  },

  thumbnailIcon: {
    fontSize: 32,
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
