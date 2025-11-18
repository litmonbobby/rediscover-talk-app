import React from 'react';
import { View, Text, ScrollView, StyleSheet, Share, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export const ArticleDetailScreen = ({ route, navigation }: any) => {
  const { article } = route.params;

  const shareArticle = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.excerpt}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Sample article content
  const articleContent = `
Mental health is just as important as physical health, yet it's often overlooked or stigmatized. Understanding anxiety and its effects on our daily lives is the first step toward managing it effectively.

## What is Anxiety?

Anxiety is a natural response to stress. It's that feeling of fear or apprehension about what's to come. While occasional anxiety is normal, persistent anxiety that interferes with daily activities may be a sign of an anxiety disorder.

## Common Symptoms

- Feeling nervous, restless, or tense
- Having a sense of impending danger or doom
- Increased heart rate
- Rapid breathing (hyperventilation)
- Sweating and trembling
- Difficulty concentrating

## Effective Management Strategies

1. **Practice Mindfulness**: Regular meditation can help calm your mind and reduce anxiety symptoms.

2. **Exercise Regularly**: Physical activity releases endorphins, which are natural mood lifters.

3. **Get Adequate Sleep**: Aim for 7-9 hours of quality sleep each night.

4. **Limit Caffeine and Alcohol**: Both can trigger or worsen anxiety symptoms.

5. **Talk to Someone**: Whether it's a friend, family member, or therapist, sharing your feelings can help.

## When to Seek Professional Help

If anxiety is significantly impacting your daily life, work, or relationships, it's important to seek professional help. A mental health professional can provide the support and treatment you need.

Remember, seeking help is a sign of strength, not weakness. Your mental health matters, and you deserve to feel your best.
  `.trim();

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>{article.image}</Text>
          <Text style={styles.categoryBadge}>{article.category}</Text>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.meta}>⏱ {article.readTime}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.bodyText}>{articleContent}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.shareButton} onPress={shareArticle}>
            <LinearGradient
              colors={[colors.accent.lime, colors.accent.brightLime]}
              style={styles.shareGradient}
            >
              <Text style={styles.shareButtonText}>⬆ Share Article</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    padding: spacing.lg,
    paddingTop: spacing['4xl'],
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    ...typography.bodyBold,
    color: colors.accent.lime,
  },
  heroSection: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  categoryBadge: {
    ...typography.caption,
    color: colors.accent.lime,
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.borderRadius.full,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  meta: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  content: {
    padding: spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: spacing.md,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  bodyText: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 26,
  },
  actions: {
    padding: spacing.xl,
  },
  shareButton: {
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  shareGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  shareButtonText: {
    ...typography.h3,
    color: colors.primary.darkBlue,
  },
});
