/**
 * ArticleDetailScreen
 * Full article content view
 * Reference: Figma screen 66-light-explore-article-detail.png
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
import { Card, Button } from '../../components';

interface ArticleDetail {
  id: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: number;
  content: string[];
  keyTakeaways: string[];
  relatedArticles?: Array<{
    id: string;
    title: string;
    category: string;
  }>;
}

// Sample article data
const sampleArticle: ArticleDetail = {
  id: '1',
  title: 'Understanding Anxiety: A Complete Guide',
  category: 'Anxiety',
  author: 'Dr. Sarah Mitchell',
  publishedDate: '2024-01-15',
  readTime: 8,
  content: [
    'Anxiety is a natural human emotion that everyone experiences from time to time. However, when anxiety becomes persistent and overwhelming, it can significantly impact your quality of life.',
    'In this comprehensive guide, we\'ll explore the science behind anxiety, its common symptoms, and evidence-based strategies to manage it effectively.',
    'Understanding the root causes of anxiety is the first step toward managing it. Anxiety often stems from a combination of genetic, environmental, and psychological factors. Your brain\'s amygdala, the center for emotional processing, can become hyperactive during periods of stress.',
    'Common symptoms of anxiety include restlessness, rapid heartbeat, difficulty concentrating, sleep disturbances, and persistent worry. Recognizing these symptoms early can help you take proactive steps to address them.',
    'Evidence-based treatments for anxiety include cognitive behavioral therapy (CBT), mindfulness practices, regular exercise, and in some cases, medication prescribed by a healthcare professional.',
    'Remember, seeking help for anxiety is a sign of strength, not weakness. If your anxiety is interfering with daily activities, consider reaching out to a mental health professional.',
  ],
  keyTakeaways: [
    'Anxiety is a natural emotion that can become problematic when persistent',
    'Understanding the biological basis helps demystify the experience',
    'Multiple evidence-based treatments are available and effective',
    'Professional help is valuable and encouraged when needed',
  ],
  relatedArticles: [
    {
      id: '2',
      title: 'The Power of Mindfulness in Daily Life',
      category: 'Mindfulness',
    },
    {
      id: '5',
      title: 'Managing Stress at Work',
      category: 'Stress',
    },
  ],
};

export function ArticleDetailScreen() {
  const [isSaved, setIsSaved] = useState(false);
  const article = sampleArticle;

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Save article to favorites
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share article');
  };

  const handleRelatedArticlePress = (articleId: string) => {
    // TODO: Navigate to related article
    console.log('Related article pressed:', articleId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSave}>
            <Text style={styles.icon}>{isSaved ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Text style={styles.icon}>⤴️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image */}
        <View style={styles.headerImage}>
          <Text style={styles.headerImageIcon}>📰</Text>
        </View>

        {/* Article Header */}
        <View style={styles.articleHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{article.category}</Text>
          </View>
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>By {article.author}</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaText}>{article.readTime} min read</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaText}>
              {new Date(article.publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Article Content */}
        <View style={styles.contentSection}>
          {article.content.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Key Takeaways */}
        <Card style={styles.takeawaysCard}>
          <Text style={styles.takeawaysTitle}>Key Takeaways</Text>
          <View style={styles.takeawaysList}>
            {article.keyTakeaways.map((takeaway, index) => (
              <View key={index} style={styles.takeawayItem}>
                <Text style={styles.takeawayBullet}>•</Text>
                <Text style={styles.takeawayText}>{takeaway}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Author Info */}
        <Card style={styles.authorCard}>
          <View style={styles.authorHeader}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorInitials}>
                {article.author.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{article.author}</Text>
              <Text style={styles.authorTitle}>Mental Health Expert</Text>
            </View>
          </View>
          <Text style={styles.authorBio}>
            Specializing in anxiety disorders and cognitive behavioral therapy with over
            15 years of clinical experience.
          </Text>
        </Card>

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>Related Articles</Text>
            {article.relatedArticles.map((related) => (
              <TouchableOpacity
                key={related.id}
                onPress={() => handleRelatedArticlePress(related.id)}
                activeOpacity={0.7}
              >
                <Card variant="default" style={styles.relatedCard}>
                  <View style={styles.relatedContent}>
                    <View style={styles.relatedInfo}>
                      <View style={styles.relatedCategoryBadge}>
                        <Text style={styles.relatedCategoryText}>
                          {related.category}
                        </Text>
                      </View>
                      <Text style={styles.relatedTitle}>{related.title}</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
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

  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.background.secondary,
  },

  icon: {
    fontSize: 20,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  headerImage: {
    width: '100%',
    height: 240,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerImageIcon: {
    fontSize: 80,
  },

  articleHeader: {
    padding: theme.spacing.lg,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary.DEFAULT,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing.md,
  },

  categoryBadgeText: {
    ...theme.typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 11,
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  metaText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  metaDivider: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginHorizontal: 6,
  },

  contentSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  paragraph: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 26,
    marginBottom: theme.spacing.lg,
  },

  takeawaysCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.accent[50],
  },

  takeawaysTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  takeawaysList: {
    gap: theme.spacing.sm,
  },

  takeawayItem: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  takeawayBullet: {
    ...theme.typography.body,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
  },

  takeawayText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },

  authorCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
  },

  authorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },

  authorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },

  authorInitials: {
    ...theme.typography.heading3,
    color: '#FFFFFF',
  },

  authorInfo: {
    flex: 1,
  },

  authorName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },

  authorTitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  authorBio: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },

  relatedSection: {
    paddingHorizontal: theme.spacing.lg,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  relatedCard: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },

  relatedContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  relatedInfo: {
    flex: 1,
  },

  relatedCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.base,
    marginBottom: 4,
  },

  relatedCategoryText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontSize: 10,
  },

  relatedTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },

  arrow: {
    fontSize: 24,
    color: theme.colors.text.tertiary,
  },
});
