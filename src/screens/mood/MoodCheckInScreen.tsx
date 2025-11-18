import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'MoodCheckIn'>;

const MOODS = [
  { id: '1', emoji: '😄', label: 'Amazing', value: 5, color: colors.mood.veryHappy },
  { id: '2', emoji: '😊', label: 'Good', value: 4, color: colors.mood.good },
  { id: '3', emoji: '😐', label: 'Okay', value: 3, color: colors.mood.neutral },
  { id: '4', emoji: '😔', label: 'Bad', value: 2, color: colors.mood.sad },
  { id: '5', emoji: '😢', label: 'Terrible', value: 1, color: colors.mood.veryBad },
];

export const MoodCheckInScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (!selectedMood) return;
    // TODO: Save to Supabase
    console.log('Saving mood:', { mood: selectedMood, note });
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>How are you feeling?</Text>
          <Text style={styles.subtitle}>Track your mood to understand your patterns</Text>
        </View>

        <View style={styles.moodGrid}>
          {MOODS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodCard,
                  isSelected && { borderColor: colors.accent.lime, borderWidth: 3 },
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[styles.moodLabel, isSelected && styles.moodLabelSelected]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedMood && (
          <View style={styles.noteSection}>
            <Text style={styles.noteLabel}>Add a note (optional)</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="What's on your mind?"
              placeholderTextColor={colors.text.tertiary}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        )}

        {selectedMood && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <LinearGradient
              colors={[colors.accent.lime, colors.accent.brightLime]}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>Save Mood</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
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
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  moodCard: {
    width: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  moodLabel: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  moodLabelSelected: {
    color: colors.accent.lime,
    fontWeight: typography.fontWeight.bold,
  },
  noteSection: {
    marginBottom: spacing.xl,
  },
  noteLabel: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  noteInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 120,
  },
  saveButton: {
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    padding: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.h2,
    color: colors.primary.cobaltBlue,
  },
});
