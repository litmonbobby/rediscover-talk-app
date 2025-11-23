import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const HelpScreen = ({ navigation }: any) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backButton, { backgroundColor: colors.background.secondary, borderRadius: borderRadius.lg }]}
          >
            <Text style={[styles.backText, { color: colors.text.primary, fontFamily: typography.fontFamily.primary }]}>
              ← Back
            </Text>
          </TouchableOpacity>
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: typography.fontWeight.bold
          }]}>
            Help & Support
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Frequently asked questions
          </Text>
        </Animated.View>

        {/* Category Filter */}
        <Animated.View entering={FadeInUp.delay(200).springify()}>
          <ScrollView
            horizontal
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: selectedCategory === category ? colors.primary.main : colors.background.card,
                    borderRadius: borderRadius.full,
                    borderColor: selectedCategory === category ? colors.primary.main : colors.border.light
                  }
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.categoryChipText,
                  {
                    color: selectedCategory === category ? colors.text.inverse : colors.text.primary,
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: selectedCategory === category ? typography.fontWeight.semibold : typography.fontWeight.regular
                  }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* FAQs */}
        <View style={styles.faqsList}>
          {filteredFAQs.map((faq, index) => (
            <Animated.View
              key={faq.id}
              entering={FadeInUp.delay(300 + index * 50).springify()}
            >
              <View style={[styles.faqCard, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.lg,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.faqQuestion, {
                    color: colors.text.primary,
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: typography.fontWeight.semibold
                  }]}>
                    {faq.question}
                  </Text>
                  <Text style={[styles.expandIcon, { color: colors.primary.main }]}>
                    {expandedId === faq.id ? '−' : '+'}
                  </Text>
                </TouchableOpacity>
                {expandedId === faq.id && (
                  <Text style={[styles.faqAnswer, {
                    color: colors.text.secondary,
                    fontFamily: typography.fontFamily.primary
                  }]}>
                    {faq.answer}
                  </Text>
                )}
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Contact Support */}
        <Animated.View entering={FadeInUp.delay(600).springify()} style={styles.contactSection}>
          <Text style={[styles.contactTitle, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.bold
          }]}>
            Still need help?
          </Text>
          <TouchableOpacity
            style={[styles.contactButton, {
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.lg,
              ...shadows.lg
            }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.contactButtonText, {
              color: colors.text.inverse,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold
            }]}>
              📧 Contact Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryButton, {
              backgroundColor: colors.background.card,
              borderRadius: borderRadius.lg,
              borderColor: colors.border.light,
              ...shadows.sm
            }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.secondaryButtonText, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              📖 View Documentation
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  categoriesScroll: {
    maxHeight: 50,
    marginBottom: 12,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 14,
  },
  faqsList: {
    padding: 16,
    gap: 12,
  },
  faqCard: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  faqQuestion: {
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
  expandIcon: {
    fontSize: 28,
  },
  faqAnswer: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    lineHeight: 22,
  },
  contactSection: {
    padding: 24,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  contactButton: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  contactButtonText: {
    fontSize: 18,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
  },
});
