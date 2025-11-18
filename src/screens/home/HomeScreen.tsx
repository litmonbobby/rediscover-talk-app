import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants';

export const HomeScreen = () => {
  const moods = ['😊', '😐', '😢', '😰', '😴'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.date}>Sunday, November 17</Text>
      </View>

      {/* Mood Check-in Widget */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How are you feeling?</Text>
        <View style={styles.moodSelector}>
          {moods.map((mood, index) => (
            <TouchableOpacity key={index} style={styles.moodButton}>
              <Text style={styles.moodEmoji}>{mood}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.primary.light }]}>
            <Text style={styles.actionEmoji}>🧘</Text>
            <Text style={styles.actionText}>Meditate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.accent.light }]}>
            <Text style={styles.actionEmoji}>📝</Text>
            <Text style={styles.actionText}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.primary.DEFAULT }]}>
            <Text style={styles.actionEmoji}>🫁</Text>
            <Text style={styles.actionText}>Breathe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.mood.calm }]}>
            <Text style={styles.actionEmoji}>😴</Text>
            <Text style={styles.actionText}>Sleep</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    backgroundColor: Colors.primary.DEFAULT,
    padding: Spacing.xl,
    paddingTop: Spacing['4xl'],
  },
  greeting: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
  },
  date: {
    fontSize: Typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.background.paper,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    padding: Spacing.sm,
  },
  moodEmoji: {
    fontSize: 40,
  },
  section: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  actionCard: {
    width: '47%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.md,
  },
  actionEmoji: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  actionText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.inverse,
  },
  quoteText: {
    fontSize: Typography.fontSize.lg,
    fontStyle: 'italic',
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.relaxed,
    marginBottom: Spacing.md,
  },
  quoteAuthor: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.tertiary,
    textAlign: 'right',
  },
});
