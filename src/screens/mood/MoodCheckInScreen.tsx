import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type MoodType = 'amazing' | 'good' | 'okay' | 'bad' | 'terrible';

interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
}

const moodOptions: MoodOption[] = [
  { type: 'amazing', emoji: '😄', label: 'Amazing', color: colors.mood.happy },
  { type: 'good', emoji: '😊', label: 'Good', color: colors.mood.good },
  { type: 'okay', emoji: '😐', label: 'Okay', color: colors.mood.neutral },
  { type: 'bad', emoji: '😔', label: 'Bad', color: colors.mood.sad },
  { type: 'terrible', emoji: '😢', label: 'Terrible', color: colors.mood.veryBad },
];

export const MoodCheckInScreen = ({ navigation }: any) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');

  const handleSaveMood = () => {
    if (!selectedMood) return;

    // TODO: Save mood to Supabase
    console.log('Saving mood:', { mood: selectedMood, note, timestamp: new Date() });

    // Navigate back to home
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[colors.primary.cobaltBlue, colors.primary.deepBlue]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>How are you feeling?</Text>
            <Text style={styles.subtitle}>Select your current mood</Text>
          </View>

          {/* Mood Selection */}
          <View style={styles.moodContainer}>
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood.type}
                style={[
                  styles.moodOption,
                  selectedMood === mood.type && styles.moodOptionSelected,
                  selectedMood === mood.type && { borderColor: mood.color },
                ]}
                onPress={() => setSelectedMood(mood.type)}
                activeOpacity={0.7}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text
                  style={[
                    styles.moodLabel,
                    selectedMood === mood.type && styles.moodLabelSelected,
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Note Input */}
          <View style={styles.noteContainer}>
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

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              !selectedMood && styles.saveButtonDisabled,
            ]}
            onPress={handleSaveMood}
            disabled={!selectedMood}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={selectedMood ? [colors.accent.lime, colors.accent.brightLime] : [colors.ui.disabled, colors.ui.disabled]}
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveButtonText}>Save Mood</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    ...typography.h2,
    color: colors.text.primary,
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
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  moodOption: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  moodOptionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 3,
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: spacing.xs,
  },
  moodLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  moodLabelSelected: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  noteContainer: {
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
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButton: {
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
    marginTop: spacing.lg,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.button,
    color: colors.primary.cobaltBlue,
  },
});
