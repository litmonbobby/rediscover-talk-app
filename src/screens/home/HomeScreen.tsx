import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

export const HomeScreen = ({ navigation }: any) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const moods = [
    { emoji: '😄', label: 'Amazing', color: colors.mood?.amazing || '#4CAF50' },
    { emoji: '😊', label: 'Good', color: colors.mood?.good || '#8BC34A' },
    { emoji: '😐', label: 'Okay', color: colors.mood?.okay || '#FFC107' },
    { emoji: '😔', label: 'Bad', color: colors.mood?.bad || '#FF9800' },
    { emoji: '😢', label: 'Terrible', color: colors.mood?.terrible || '#F44336' },
  ];

  const quickActions = [
    { icon: '💬', label: 'AI Coach', screen: 'Chat' },
    { icon: '🧘', label: 'Meditate', screen: 'MeditationLibrary' },
    { icon: '📝', label: 'Journal', screen: 'JournalList' },
    { icon: '🫁', label: 'Breathe', screen: 'Breathwork' },
    { icon: '📊', label: 'Insights', screen: 'Insights' },
    { icon: '✨', label: 'Affirmations', screen: 'Affirmations' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text.primary, fontFamily: typography.fontFamily.secondary }]}>
            Good Morning
          </Text>
          <Text style={[styles.date, { color: colors.text.secondary, fontFamily: typography.fontFamily.primary }]}>
            Sunday, November 17
          </Text>
        </Animated.View>

        {/* Mood Check-in Card */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={[styles.moodCard, {
            backgroundColor: colors.background.card,
            borderRadius: borderRadius.xl,
            ...shadows.md
          }]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              How are you feeling?
            </Text>
            <Text style={[styles.cardSubtitle, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Track your mood daily
            </Text>
          </View>

          <View style={styles.moodSelector}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={styles.moodButton}
                onPress={() => navigation.navigate('MoodCheckIn')}
                activeOpacity={0.7}
              >
                <View style={[styles.moodCircle, {
                  backgroundColor: mood.color + '20',
                  borderWidth: 2,
                  borderColor: mood.color + '40',
                }]}>
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                </View>
                <Text style={[styles.moodLabel, {
                  color: colors.text.secondary,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.viewHistoryButton}
            onPress={() => navigation.navigate('MoodHistory')}
          >
            <Text style={[styles.viewHistoryText, {
              color: colors.primary.main,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              View History →
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <Text style={[styles.sectionTitle, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.semibold
          }]}>
            Quick Actions
          </Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <Animated.View
                key={index}
                entering={FadeInUp.delay(400 + index * 50).springify()}
                style={styles.actionCardWrapper}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(action.screen)}
                  activeOpacity={0.8}
                  style={[styles.actionCard, {
                    backgroundColor: colors.primary.main,
                    borderRadius: borderRadius.lg,
                    ...shadows.md
                  }]}
                >
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                  <Text style={[styles.actionLabel, {
                    color: colors.text.inverse,
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: typography.fontWeight.semibold
                  }]}>
                    {action.label}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Daily Quote */}
        <Animated.View
          entering={FadeInUp.delay(700).springify()}
          style={[styles.quoteCard, {
            backgroundColor: colors.background.card,
            borderRadius: borderRadius.xl,
            ...shadows.md
          }]}
        >
          <Text style={[styles.quoteText, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            "The present moment is filled with joy and happiness. If you are attentive, you will see it."
          </Text>
          <Text style={[styles.quoteAuthor, {
            color: colors.text.tertiary,
            fontFamily: typography.fontFamily.primary
          }]}>
            — Thích Nhất Hạnh
          </Text>
        </Animated.View>

        {/* Bottom spacing */}
        <View style={{ height: 32 }} />
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
  header: {
    padding: 20,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 28,
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
  },

  // Mood Card
  moodCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moodButton: {
    alignItems: 'center',
    flex: 1,
  },
  moodCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  viewHistoryButton: {
    alignSelf: 'flex-end',
  },
  viewHistoryText: {
    fontSize: 14,
  },

  // Quick Actions
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCardWrapper: {
    width: '47%',
  },
  actionCard: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 14,
    textAlign: 'center',
  },

  // Quote Card
  quoteCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    textAlign: 'right',
  },
});
