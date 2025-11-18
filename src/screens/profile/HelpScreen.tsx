import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const HelpScreen = ({ navigation }: any) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I track my mood?',
      answer: 'Tap the mood widget on the home screen or navigate to Mood Calendar. Select your current emotional state from 5 levels (Amazing to Terrible), add an optional note, and save.',
      category: 'Mood Tracking',
    },
    {
      id: '2',
      question: 'Is my data private and secure?',
      answer: 'Yes! All your data is encrypted and stored securely. We never share your personal information with third parties. Your journal entries and mood data are HIPAA-compliant.',
      category: 'Privacy',
    },
    {
      id: '3',
      question: 'How does the AI coach work?',
      answer: 'Our AI coach uses advanced natural language processing to provide supportive, evidence-based mental health guidance. It\'s available 24/7 for compassionate conversations.',
      category: 'AI Coach',
    },
    {
      id: '4',
      question: 'Can I use the app offline?',
      answer: 'Most features work offline including mood tracking, journaling, breathwork exercises, and meditation playback. AI coach and insights require internet connection.',
      category: 'Features',
    },
    {
      id: '5',
      question: 'How do I cancel my subscription?',
      answer: 'Go to Profile > Settings > Subscription. Tap "Manage Subscription" and follow the prompts. You can cancel anytime and retain access until the end of your billing period.',
      category: 'Subscription',
    },
    {
      id: '6',
      question: 'What\'s included in the free version?',
      answer: 'Free users get 3 AI messages/day, 5 guided meditations, basic mood tracking, and limited insights. Premium unlocks unlimited access to all features.',
      category: 'Subscription',
    },
  ];

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>Frequently asked questions</Text>
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

        {/* FAQs */}
        <View style={styles.faqsList}>
          {filteredFAQs.map((faq) => (
            <View key={faq.id} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.expandIcon}>{expandedId === faq.id ? '−' : '+'}</Text>
              </TouchableOpacity>
              {expandedId === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Contact Support */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <LinearGradient
              colors={[colors.accent.lime, colors.accent.brightLime]}
              style={styles.contactGradient}
            >
              <Text style={styles.contactButtonText}>📧 Contact Support</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>📖 View Documentation</Text>
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
    padding: spacing.xl,
    paddingTop: spacing['4xl'],
  },
  backText: {
    ...typography.bodyBold,
    color: colors.accent.lime,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
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
  faqsList: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  faqCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  faqQuestion: {
    ...typography.bodyBold,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.md,
  },
  expandIcon: {
    ...typography.h2,
    color: colors.accent.lime,
  },
  faqAnswer: {
    ...typography.body,
    color: colors.text.secondary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    lineHeight: 22,
  },
  contactSection: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  contactTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  contactButton: {
    width: '100%',
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  contactGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  contactButtonText: {
    ...typography.h3,
    color: colors.primary.darkBlue,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: spacing.md,
    borderRadius: spacing.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryButtonText: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
});
