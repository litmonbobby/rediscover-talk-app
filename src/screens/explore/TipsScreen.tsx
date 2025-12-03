/**
 * Tips Screen - Mental wellness tips and advice
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  emoji: string;
}

const tips: Tip[] = [
  {
    id: '1',
    title: 'Start Your Day Mindfully',
    content: 'Take 5 minutes each morning for deep breathing before checking your phone. This sets a calm tone for the day.',
    category: 'Morning Routine',
    emoji: '🌅',
  },
  {
    id: '2',
    title: 'Practice Gratitude',
    content: 'Write down 3 things you\'re grateful for each day. This simple habit can shift your mindset towards positivity.',
    category: 'Daily Practice',
    emoji: '🙏',
  },
  {
    id: '3',
    title: 'Take Movement Breaks',
    content: 'Every hour, stand up and move for 2-3 minutes. Stretch, walk, or do light exercises to reduce stress.',
    category: 'Physical Health',
    emoji: '🚶',
  },
  {
    id: '4',
    title: 'Set Boundaries with Technology',
    content: 'Create phone-free times, especially before bed. Blue light and notifications can disrupt sleep and increase anxiety.',
    category: 'Digital Wellness',
    emoji: '📱',
  },
  {
    id: '5',
    title: 'Connect with Others',
    content: 'Reach out to a friend or family member today. Social connections are vital for mental wellbeing.',
    category: 'Relationships',
    emoji: '💬',
  },
  {
    id: '6',
    title: 'Practice Self-Compassion',
    content: 'Treat yourself with the same kindness you\'d show a good friend. Negative self-talk only increases stress.',
    category: 'Self-Care',
    emoji: '💚',
  },
];

export const TipsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Wellness Tips</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Simple practices for a healthier mind
        </Text>

        {tips.map((tip) => (
          <View
            key={tip.id}
            style={[styles.tipCard, { backgroundColor: colors.background.card }]}
          >
            <View style={styles.tipHeader}>
              <Text style={styles.tipEmoji}>{tip.emoji}</Text>
              <View style={styles.tipMeta}>
                <Text style={[styles.tipTitle, { color: colors.text.primary }]}>
                  {tip.title}
                </Text>
                <Text style={styles.tipCategory}>{tip.category}</Text>
              </View>
            </View>
            <Text style={[styles.tipContent, { color: colors.text.secondary }]}>
              {tip.content}
            </Text>
          </View>
        ))}

        <View style={styles.footerNote}>
          <Text style={[styles.footerText, { color: colors.text.tertiary }]}>
            💡 New tips added weekly
          </Text>
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
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  tipCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  tipMeta: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipCategory: {
    fontSize: 12,
    color: '#9EB567',
    fontWeight: '500',
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 21,
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 13,
  },
});

export default TipsScreen;
