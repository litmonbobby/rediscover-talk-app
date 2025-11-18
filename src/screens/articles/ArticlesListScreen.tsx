import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
};

export const ArticlesListScreen = ({ navigation }: any) => {
  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: A Comprehensive Guide',
      excerpt: 'Learn about the science behind anxiety and practical strategies to manage it effectively.',
      category: 'Mental Health',
      readTime: '5 min read',
      image: '📚',
    },
    {
      id: '2',
      title: 'The Power of Mindfulness Meditation',
      excerpt: 'Discover how mindfulness can transform your daily life and reduce stress.',
      category: 'Mindfulness',
      readTime: '7 min read',
      image: '🧘',
    },
    {
      id: '3',
      title: 'Building Healthy Sleep Habits',
      excerpt: 'Expert tips for improving your sleep quality and establishing a bedtime routine.',
      category: 'Sleep',
      readTime: '6 min read',
      image: '😴',
    },
    {
      id: '4',
      title: 'Journaling for Mental Clarity',
      excerpt: 'How writing down your thoughts can help process emotions and gain insights.',
      category: 'Self-Care',
      readTime: '4 min read',
      image: '📝',
    },
    {
      id: '5',
      title: 'Managing Stress at Work',
      excerpt: 'Practical strategies to reduce workplace stress and maintain work-life balance.',
      category: 'Stress Management',
      readTime: '8 min read',
      image: '💼',
    },
  ];

  const categories = ['All', 'Mental Health', 'Mindfulness', 'Sleep', 'Self-Care', 'Stress Management'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Articles & Resources</Text>
          <Text style={styles.subtitle}>Expert insights on mental wellness</Text>
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

        {/* Articles List */}
        <View style={styles.articlesList}>
          {filteredArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => navigation.navigate('ArticleDetail', { article })}
              activeOpacity={0.8}
            >
              <View style={styles.articleImage}>
                <Text style={styles.articleEmoji}>{article.image}</Text>
              </View>
              <View style={styles.articleContent}>
                <Text style={styles.categoryBadge}>{article.category}</Text>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
                <View style={styles.articleMeta}>
                  <Text style={styles.readTime}>⏱ {article.readTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  categoriesScroll: {
    paddingHorizontal: spacing.md,
    maxHeight: 50,
    marginBottom: spacing.md,
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
  articlesList: {
    padding: spacing.md,
    gap: spacing.md,
  },
  articleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  articleImage: {
    height: 120,
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleEmoji: {
    fontSize: 48,
  },
  articleContent: {
    padding: spacing.lg,
  },
  categoryBadge: {
    ...typography.caption,
    color: colors.accent.lime,
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  articleTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  articleExcerpt: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
});
