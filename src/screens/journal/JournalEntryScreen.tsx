import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type MoodType = 'amazing' | 'good' | 'okay' | 'bad' | 'terrible';

const moodOptions = [
  { type: 'amazing' as MoodType, emoji: '😄', label: 'Amazing' },
  { type: 'good' as MoodType, emoji: '😊', label: 'Good' },
  { type: 'okay' as MoodType, emoji: '😐', label: 'Okay' },
  { type: 'bad' as MoodType, emoji: '😔', label: 'Bad' },
  { type: 'terrible' as MoodType, emoji: '😢', label: 'Terrible' },
];

export const JournalEntryScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    // TODO: Save to Supabase
    console.log('Saving journal entry:', {
      title,
      content,
      mood: selectedMood,
      timestamp: new Date(),
    });

    // Navigate back
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
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
            <Text style={styles.title}>New Entry</Text>
            <Text style={styles.subtitle}>Express your thoughts and feelings</Text>
          </View>

          {/* Title Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Give your entry a title..."
              placeholderTextColor={colors.text.tertiary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Mood Selector */}
          <View style={styles.moodContainer}>
            <Text style={styles.inputLabel}>How are you feeling?</Text>
            <View style={styles.moodGrid}>
              {moodOptions.map((mood) => (
                <TouchableOpacity
                  key={mood.type}
                  style={[
                    styles.moodOption,
                    selectedMood === mood.type && styles.moodOptionSelected,
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
          </View>

          {/* Content Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your thoughts</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="What's on your mind today?"
              placeholderTextColor={colors.text.tertiary}
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              (!title.trim() || !content.trim()) && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={!title.trim() || !content.trim()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                title.trim() && content.trim()
                  ? [colors.accent.lime, colors.accent.brightLime]
                  : [colors.ui.disabled, colors.ui.disabled]
              }
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveButtonText}>Save Entry</Text>
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
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  titleInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    ...typography.h3,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  moodContainer: {
    marginBottom: spacing.lg,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  moodOption: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodOptionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: colors.accent.lime,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs / 2,
  },
  moodLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.text.tertiary,
  },
  moodLabelSelected: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.text.primary,
  },
  contentInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.text.primary,
    minHeight: 200,
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
