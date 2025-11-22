/**
 * TipsScreen
 * Daily wellness tips and practical advice
 * Reference: Figma screen 81-light-explore-tips.png
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
import { Card } from '../../components';

interface Tip {
  id: string;
  text: string;
  category: string;
  icon: string;
}

const tips: Tip[] = [
  // Mental Health
  { id: '1', text: 'Take a 5-minute break every hour to reset and recharge your mind', category: 'Mental Health', icon: '🧠' },
  { id: '2', text: 'Practice the 5-4-3-2-1 grounding technique when feeling anxious', category: 'Mental Health', icon: '🧠' },
  { id: '3', text: 'Write down three things you\'re grateful for each morning', category: 'Mental Health', icon: '🧠' },
  { id: '4', text: 'Set boundaries with technology - designate phone-free times', category: 'Mental Health', icon: '🧠' },
  { id: '5', text: 'Don\'t be afraid to ask for help when you need it', category: 'Mental Health', icon: '🧠' },

  // Mindfulness
  { id: '6', text: 'Start your day with 2 minutes of deep breathing', category: 'Mindfulness', icon: '🧘' },
  { id: '7', text: 'Practice mindful eating - savor each bite without distractions', category: 'Mindfulness', icon: '🧘' },
  { id: '8', text: 'Notice five things you can see, hear, or feel right now', category: 'Mindfulness', icon: '🧘' },
  { id: '9', text: 'Take a mindful walk and observe your surroundings closely', category: 'Mindfulness', icon: '🧘' },
  { id: '10', text: 'Before bed, do a body scan to release tension', category: 'Mindfulness', icon: '🧘' },

  // Physical Wellness
  { id: '11', text: 'Stand up and stretch every 30 minutes if sitting for long periods', category: 'Physical Wellness', icon: '💪' },
  { id: '12', text: 'Take the stairs instead of the elevator when possible', category: 'Physical Wellness', icon: '💪' },
  { id: '13', text: 'Drink a glass of water first thing in the morning', category: 'Physical Wellness', icon: '💪' },
  { id: '14', text: 'Aim for 7-9 hours of quality sleep each night', category: 'Physical Wellness', icon: '💪' },
  { id: '15', text: 'Go for a 15-minute walk outside for fresh air and movement', category: 'Physical Wellness', icon: '💪' },

  // Relationships
  { id: '16', text: 'Send a thoughtful message to someone you care about', category: 'Relationships', icon: '💕' },
  { id: '17', text: 'Practice active listening - put away distractions during conversations', category: 'Relationships', icon: '💕' },
  { id: '18', text: 'Express appreciation to someone who made a difference today', category: 'Relationships', icon: '💕' },
  { id: '19', text: 'Set aside quality time with loved ones without phones', category: 'Relationships', icon: '💕' },
  { id: '20', text: 'Be kind to yourself - treat yourself as you would a good friend', category: 'Relationships', icon: '💕' },

  // Productivity
  { id: '21', text: 'Tackle your most important task first thing in the morning', category: 'Productivity', icon: '⚡' },
  { id: '22', text: 'Break large projects into smaller, manageable steps', category: 'Productivity', icon: '⚡' },
  { id: '23', text: 'Use the Pomodoro Technique: 25 minutes focus, 5 minutes break', category: 'Productivity', icon: '⚡' },
  { id: '24', text: 'Keep a "done" list to acknowledge your accomplishments', category: 'Productivity', icon: '⚡' },
  { id: '25', text: 'Declutter your workspace for better focus and clarity', category: 'Productivity', icon: '⚡' },

  // Nutrition
  { id: '26', text: 'Add one serving of vegetables to your next meal', category: 'Nutrition', icon: '🥗' },
  { id: '27', text: 'Drink water throughout the day - aim for 8 glasses', category: 'Nutrition', icon: '🥗' },
  { id: '28', text: 'Choose whole grains over refined grains when possible', category: 'Nutrition', icon: '🥗' },
  { id: '29', text: 'Plan your meals ahead to make healthier choices', category: 'Nutrition', icon: '🥗' },
  { id: '30', text: 'Limit caffeine intake after 2 PM for better sleep', category: 'Nutrition', icon: '🥗' },

  // Sleep
  { id: '31', text: 'Create a relaxing bedtime routine 30 minutes before sleep', category: 'Sleep', icon: '😴' },
  { id: '32', text: 'Keep your bedroom cool, dark, and quiet for optimal rest', category: 'Sleep', icon: '😴' },
  { id: '33', text: 'Avoid screens for at least 1 hour before bedtime', category: 'Sleep', icon: '😴' },
  { id: '34', text: 'Go to bed and wake up at the same time every day', category: 'Sleep', icon: '😴' },
  { id: '35', text: 'If you can\'t sleep, get up and do a calming activity', category: 'Sleep', icon: '😴' },

  // Self-Care
  { id: '36', text: 'Take a relaxing bath or shower to unwind', category: 'Self-Care', icon: '🛁' },
  { id: '37', text: 'Say "no" to commitments that drain your energy', category: 'Self-Care', icon: '🛁' },
  { id: '38', text: 'Spend time on a hobby you genuinely enjoy', category: 'Self-Care', icon: '🛁' },
  { id: '39', text: 'Schedule "me time" in your calendar like any other appointment', category: 'Self-Care', icon: '🛁' },
  { id: '40', text: 'Treat yourself to something small that brings you joy', category: 'Self-Care', icon: '🛁' },

  // Stress Management
  { id: '41', text: 'When stressed, take 10 deep breaths focusing on your exhale', category: 'Stress Management', icon: '🌿' },
  { id: '42', text: 'Identify one thing you can control in a stressful situation', category: 'Stress Management', icon: '🌿' },
  { id: '43', text: 'Progressive muscle relaxation can release physical tension', category: 'Stress Management', icon: '🌿' },
  { id: '44', text: 'Take a break from news and social media when overwhelmed', category: 'Stress Management', icon: '🌿' },
  { id: '45', text: 'Talk to someone you trust about what\'s bothering you', category: 'Stress Management', icon: '🌿' },

  // Positive Habits
  { id: '46', text: 'Start a gratitude journal - write three things daily', category: 'Positive Habits', icon: '✨' },
  { id: '47', text: 'Smile at yourself in the mirror each morning', category: 'Positive Habits', icon: '✨' },
  { id: '48', text: 'Replace negative self-talk with compassionate words', category: 'Positive Habits', icon: '✨' },
  { id: '49', text: 'Celebrate small wins - progress is progress', category: 'Positive Habits', icon: '✨' },
  { id: '50', text: 'Practice one act of kindness for yourself or others today', category: 'Positive Habits', icon: '✨' },
];

const categories = ['All', 'Mental Health', 'Mindfulness', 'Physical Wellness', 'Relationships', 'Productivity', 'Nutrition', 'Sleep', 'Self-Care', 'Stress Management', 'Positive Habits'];

export function TipsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentTip, setCurrentTip] = useState(0);

  const filteredTips = tips.filter(
    (tip) => selectedCategory === 'All' || tip.category === selectedCategory
  );

  const dailyTip = filteredTips[currentTip % filteredTips.length];

  const handleNext = () => {
    setCurrentTip((prev) => (prev + 1) % filteredTips.length);
  };

  const handlePrevious = () => {
    setCurrentTip((prev) =>
      prev === 0 ? filteredTips.length - 1 : prev - 1
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
    // TODO: Save to backend
  };

  const handleShare = (tip: Tip) => {
    // TODO: Implement share functionality
    console.log('Share tip:', tip.text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Daily Tips</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tip of the Day */}
        <Card variant="elevated" style={styles.dailyCard}>
          <Text style={styles.dailyLabel}>Tip of the Day</Text>
          <View style={styles.dailyIconContainer}>
            <Text style={styles.dailyIcon}>{dailyTip.icon}</Text>
          </View>
          <Text style={styles.dailyText}>{dailyTip.text}</Text>
          <View style={styles.dailyCategory}>
            <Text style={styles.dailyCategoryText}>{dailyTip.category}</Text>
          </View>
          <View style={styles.dailyActions}>
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>
            <View style={styles.centerActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleFavorite(dailyTip.id)}
              >
                <Text style={styles.actionIcon}>
                  {favorites.includes(dailyTip.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(dailyTip)}
              >
                <Text style={styles.actionIcon}>📤</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Category Filter */}
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
              onPress={() => {
                setSelectedCategory(category);
                setCurrentTip(0);
              }}
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

        {/* All Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Tips' : selectedCategory}
          </Text>
          <Text style={styles.sectionCount}>
            {filteredTips.length} tips
          </Text>
          {filteredTips.map((tip) => (
            <Card key={tip.id} variant="default" style={styles.tipCard}>
              <View style={styles.tipContent}>
                <View style={styles.tipIconContainer}>
                  <Text style={styles.tipIcon}>{tip.icon}</Text>
                </View>
                <View style={styles.tipTextContainer}>
                  <Text style={styles.tipText}>{tip.text}</Text>
                  <View style={styles.tipCategoryBadge}>
                    <Text style={styles.tipCategoryText}>{tip.category}</Text>
                  </View>
                </View>
                <View style={styles.tipActions}>
                  <TouchableOpacity
                    style={styles.tipActionButton}
                    onPress={() => toggleFavorite(tip.id)}
                  >
                    <Text style={styles.tipActionIcon}>
                      {favorites.includes(tip.id) ? '❤️' : '🤍'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.tipActionButton}
                    onPress={() => handleShare(tip)}
                  >
                    <Text style={styles.tipActionIcon}>📤</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoTitle}>Making Tips Work for You</Text>
          <Text style={styles.infoText}>
            • Start with one tip at a time - small changes add up{'\n'}
            • Practice a tip for 21 days to build a habit{'\n'}
            • Save your favorites for quick reference{'\n'}
            • Share helpful tips with friends and family{'\n'}
            • Be patient with yourself as you develop new habits
          </Text>
        </Card>
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

  dailyCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.accent[50],
  },

  dailyLabel: {
    ...theme.typography.caption,
    color: theme.colors.accent.DEFAULT,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },

  dailyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    alignSelf: 'center',
  },

  dailyIcon: {
    fontSize: 48,
  },

  dailyText: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 28,
  },

  dailyCategory: {
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg,
    alignSelf: 'center',
  },

  dailyCategoryText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },

  dailyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navButtonText: {
    fontSize: 28,
    color: theme.colors.text.primary,
  },

  centerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionIcon: {
    fontSize: 24,
  },

  categoriesScroll: {
    marginBottom: theme.spacing.md,
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
    backgroundColor: theme.colors.accent.DEFAULT,
    borderColor: theme.colors.accent.DEFAULT,
  },

  categoryChipText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },

  categoryChipTextActive: {
    color: theme.colors.text.primary,
    fontWeight: '600',
  },

  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
  },

  sectionCount: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },

  tipCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },

  tipContent: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'flex-start',
  },

  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tipIcon: {
    fontSize: 20,
  },

  tipTextContainer: {
    flex: 1,
  },

  tipText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    lineHeight: 22,
  },

  tipCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.base,
  },

  tipCategoryText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontSize: 11,
  },

  tipActions: {
    gap: theme.spacing.xs,
  },

  tipActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tipActionIcon: {
    fontSize: 16,
  },

  infoCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary[50],
  },

  infoIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },

  infoTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  infoText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
});
