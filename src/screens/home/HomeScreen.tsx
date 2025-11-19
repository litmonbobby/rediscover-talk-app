import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { Card } from '../../components/ui/Card';

export const HomeScreen = ({ navigation }: any) => {
  const moods = [
    { emoji: '😄', label: 'Amazing', color: theme.colors.mood.amazing },
    { emoji: '😊', label: 'Good', color: theme.colors.mood.good },
    { emoji: '😐', label: 'Okay', color: theme.colors.mood.okay },
    { emoji: '😔', label: 'Bad', color: theme.colors.mood.bad },
    { emoji: '😢', label: 'Terrible', color: theme.colors.mood.terrible },
  ];

  const quickActions = [
    { icon: '💬', label: 'AI Coach', screen: 'Chat', gradient: [theme.colors.primary[400], theme.colors.primary[600]] },
    { icon: '🧘', label: 'Meditate', screen: 'MeditationLibrary', gradient: [theme.colors.primary[500], theme.colors.primary[700]] },
    { icon: '📝', label: 'Journal', screen: 'JournalList', gradient: [theme.colors.accent[400], theme.colors.accent[600]] },
    { icon: '🫁', label: 'Breathe', screen: 'Breathwork', gradient: [theme.colors.primary[600], theme.colors.primary[800]] },
    { icon: '📊', label: 'Insights', screen: 'Insights', gradient: [theme.colors.info, theme.colors.primary[600]] },
    { icon: '✨', label: 'Affirmations', screen: 'Affirmations', gradient: [theme.colors.accent[300], theme.colors.accent[500]] },
  ];

  return (
    <LinearGradient
      colors={theme.colors.background.gradient}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.date}>Sunday, November 17</Text>
          </View>

          {/* Mood Check-in Card */}
          <Card style={styles.moodCard} variant="glass">
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>How are you feeling?</Text>
              <Text style={styles.cardSubtitle}>Track your mood daily</Text>
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
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.viewHistoryButton}
              onPress={() => navigation.navigate('MoodHistory')}
            >
              <Text style={styles.viewHistoryText}>View History →</Text>
            </TouchableOpacity>
          </Card>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate(action.screen)}
                  activeOpacity={0.8}
                  style={styles.actionCardWrapper}
                >
                  <LinearGradient
                    colors={action.gradient}
                    style={styles.actionCard}
                  >
                    <Text style={styles.actionIcon}>{action.icon}</Text>
                    <Text style={styles.actionLabel}>{action.label}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Daily Quote */}
          <Card style={styles.quoteCard} variant="glass">
            <Text style={styles.quoteText}>
              "The present moment is filled with joy and happiness. If you are attentive, you will see it."
            </Text>
            <Text style={styles.quoteAuthor}>— Thích Nhất Hạnh</Text>
          </Card>

          {/* Bottom spacing */}
          <View style={{ height: theme.spacing[8] }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing[5],
    paddingTop: theme.spacing[4],
  },
  greeting: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  date: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
  },

  // Mood Card
  moodCard: {
    marginHorizontal: theme.spacing[5],
    marginBottom: theme.spacing[5],
  },
  cardHeader: {
    marginBottom: theme.spacing[4],
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  cardSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[4],
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
    marginBottom: theme.spacing[2],
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  viewHistoryButton: {
    alignSelf: 'flex-end',
  },
  viewHistoryText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.accent[400],
  },

  // Quick Actions
  section: {
    paddingHorizontal: theme.spacing[5],
    marginBottom: theme.spacing[5],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[3],
  },
  actionCardWrapper: {
    width: (360 - theme.spacing[5] * 2 - theme.spacing[3]) / 2,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  actionCard: {
    padding: theme.spacing[4],
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: theme.spacing[3],
  },
  actionLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },

  // Quote Card
  quoteCard: {
    marginHorizontal: theme.spacing[5],
    marginBottom: theme.spacing[5],
  },
  quoteText: {
    fontSize: theme.typography.fontSize.base,
    fontStyle: 'italic',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[3],
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.relaxed,
  },
  quoteAuthor: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    textAlign: 'right',
  },
});
