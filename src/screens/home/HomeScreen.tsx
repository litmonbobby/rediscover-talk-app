import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export const HomeScreen = ({ navigation }: any) => {
  const moods = [
    { emoji: '😄', label: 'Amazing' },
    { emoji: '😊', label: 'Good' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '😔', label: 'Bad' },
    { emoji: '😢', label: 'Terrible' },
  ];

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.date}>Sunday, November 17</Text>
        </View>

      {/* Mood Check-in Widget */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('MoodCheckIn')}
        activeOpacity={0.9}
      >
        <Text style={styles.cardTitle}>How are you feeling?</Text>
        <View style={styles.moodSelector}>
          {moods.map((mood, index) => (
            <View key={index} style={styles.moodButton}>
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.viewHistoryButton}
          onPress={(e) => {
            e.stopPropagation();
            navigation.navigate('MoodHistory');
          }}
        >
          <Text style={styles.viewHistoryText}>View History →</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('MeditationLibrary')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary.lightBlue, colors.primary.cobaltBlue]}
              style={styles.actionGradient}
            >
              <Text style={styles.actionEmoji}>🧘</Text>
              <Text style={styles.actionText}>Meditate</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('JournalList')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.accent.softLime, colors.accent.lime]}
              style={styles.actionGradient}
            >
              <Text style={styles.actionEmoji}>📝</Text>
              <Text style={styles.actionText}>Journal</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Breathwork')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary.cobaltBlue, colors.primary.deepBlue]}
              style={styles.actionGradient}
            >
              <Text style={styles.actionEmoji}>🫁</Text>
              <Text style={styles.actionText}>Breathe</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('SleepSounds')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.mood.neutral, colors.primary.deepBlue]}
              style={styles.actionGradient}
            >
              <Text style={styles.actionEmoji}>😴</Text>
              <Text style={styles.actionText}>Sleep</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('FamilyActivities')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.accent.softLime, colors.accent.lime]}
              style={styles.actionGradient}
            >
              <Text style={styles.actionEmoji}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.actionText}>Family</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary.lightBlue, colors.primary.cobaltBlue]}
              style={styles.actionGradient}
            >
              <Text style={styles.actionEmoji}>👤</Text>
              <Text style={styles.actionText}>Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

        {/* Daily Quote */}
        <View style={styles.card}>
          <Text style={styles.quoteText}>
            "The present moment is filled with joy and happiness. If you are attentive, you will see it."
          </Text>
          <Text style={styles.quoteAuthor}>— Thích Nhất Hạnh</Text>
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
    paddingTop: spacing.xl * 2,
    marginBottom: spacing.md,
  },
  greeting: {
    ...typography.h1,
    color: colors.text.primary,
  },
  date: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  moodButton: {
    padding: spacing.sm,
  },
  moodEmoji: {
    fontSize: 40,
  },
  viewHistoryButton: {
    alignSelf: 'flex-end',
  },
  viewHistoryText: {
    ...typography.bodyBold,
    color: colors.accent.lime,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionCard: {
    width: '47%',
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  actionEmoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  actionText: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  quoteText: {
    ...typography.body,
    fontStyle: 'italic',
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  quoteAuthor: {
    ...typography.body,
    color: colors.text.tertiary,
    textAlign: 'right',
  },
});
