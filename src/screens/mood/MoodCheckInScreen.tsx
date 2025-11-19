import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { theme } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { CircularMoodSelector } from '../../components/mood/CircularMoodSelector';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'MoodCheckIn'>;

const MOODS = [
  { id: '1', emoji: '😄', label: 'Amazing', color: theme.colors.mood.amazing },
  { id: '2', emoji: '😊', label: 'Good', color: theme.colors.mood.good },
  { id: '3', emoji: '😐', label: 'Okay', color: theme.colors.mood.okay },
  { id: '4', emoji: '😔', label: 'Bad', color: theme.colors.mood.bad },
  { id: '5', emoji: '😢', label: 'Terrible', color: theme.colors.mood.terrible },
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

  const selectedMoodData = MOODS.find(m => m.id === selectedMood);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>How are you feeling?</Text>
            <Text style={styles.subtitle}>Track your mood to understand your patterns</Text>
          </View>

          {/* Circular Mood Selector */}
          <Card style={styles.moodCard}>
            <CircularMoodSelector
              moods={MOODS}
              selectedMood={selectedMood}
              onSelectMood={setSelectedMood}
            />
          </Card>

          {/* Note Section */}
          {selectedMood && (
            <Card style={styles.noteCard}>
              <Text style={styles.noteLabel}>Add a note (optional)</Text>
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
            </Card>
          )}

          {/* Save Button */}
          {selectedMood && (
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: selectedMoodData?.color }
              ]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Save Mood</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing[5],
  },
  header: {
    marginBottom: theme.spacing[6],
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.relaxed,
  },
  moodCard: {
    marginBottom: theme.spacing[5],
    paddingVertical: theme.spacing[6],
  },
  noteCard: {
    marginBottom: theme.spacing[5],
  },
  noteLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[3],
  },
  noteInput: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    minHeight: 120,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  saveButton: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    alignItems: 'center',
    ...theme.shadows.md,
  },
  saveButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.inverse,
  },
});
