/**
 * MoodCheckInModal
 * Detailed mood check-in with notes and tags
 * Reference: Figma screen 37-light-home-mood-check-in.png
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components';
import type { MoodType } from '../../types';

interface MoodCheckInModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (mood: MoodType, note?: string, tags?: string[]) => void;
  initialMood?: MoodType;
}

export function MoodCheckInModal({
  visible,
  onClose,
  onSubmit,
  initialMood,
}: MoodCheckInModalProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(initialMood || null);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const moods: Array<{ emoji: string; label: string; value: MoodType }> = [
    { emoji: '😭', label: 'Very Sad', value: 'very-sad' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😄', label: 'Very Happy', value: 'very-happy' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '⚡', label: 'Energetic', value: 'energetic' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
  ];

  const tags = [
    '💼 Work',
    '❤️ Relationships',
    '🏋️ Exercise',
    '😴 Sleep',
    '🍎 Health',
    '👨‍👩‍👧 Family',
    '👥 Social',
    '🎯 Goals',
    '💰 Finance',
    '🎨 Creative',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (!selectedMood) return;
    onSubmit(selectedMood, note || undefined, selectedTags.length > 0 ? selectedTags : undefined);
    // Reset form
    setSelectedMood(null);
    setNote('');
    setSelectedTags([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>How are you feeling?</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {/* Mood Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Your Mood</Text>
            <View style={styles.moodGrid}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodButton,
                    selectedMood === mood.value && styles.moodButtonActive,
                  ]}
                  onPress={() => setSelectedMood(mood.value)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Note */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add a Note (Optional)</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="What's on your mind?"
              placeholderTextColor={theme.colors.text.tertiary}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's Affecting Your Mood? (Optional)</Text>
            <View style={styles.tagGrid}>
              {tags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagButton,
                    selectedTags.includes(tag) && styles.tagButtonActive,
                  ]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedTags.includes(tag) && styles.tagTextActive,
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Save Mood Entry"
            onPress={handleSubmit}
            disabled={!selectedMood}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </Modal>
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

  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    fontSize: 24,
    color: theme.colors.text.secondary,
  },

  headerTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
  },

  placeholder: {
    width: 32,
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    padding: theme.spacing.lg,
  },

  section: {
    marginBottom: theme.spacing.xl,
  },

  sectionTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },

  moodButton: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  moodButtonActive: {
    borderColor: theme.colors.primary.DEFAULT,
    backgroundColor: theme.colors.primary[50],
  },

  moodEmoji: {
    fontSize: 36,
    marginBottom: theme.spacing.xs,
  },

  moodLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  noteInput: {
    ...theme.typography.body,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.base,
    padding: theme.spacing.md,
    minHeight: 100,
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },

  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },

  tagButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },

  tagButtonActive: {
    backgroundColor: theme.colors.primary.DEFAULT,
    borderColor: theme.colors.primary.DEFAULT,
  },

  tagText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },

  tagTextActive: {
    color: '#FFFFFF',
  },

  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
});
