import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'MoodCheckIn'>;

export const MoodCheckInScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const MOODS = [
    { id: '1', emoji: '😄', label: 'Amazing', color: colors.mood?.amazing || '#4CAF50' },
    { id: '2', emoji: '😊', label: 'Good', color: colors.mood?.good || '#8BC34A' },
    { id: '3', emoji: '😐', label: 'Okay', color: colors.mood?.okay || '#FFC107' },
    { id: '4', emoji: '😔', label: 'Bad', color: colors.mood?.bad || '#FF9800' },
    { id: '5', emoji: '😢', label: 'Terrible', color: colors.mood?.terrible || '#F44336' },
  ];

  const handleSave = () => {
    if (!selectedMood) return;
    // TODO: Save to Supabase
    console.log('Saving mood:', { mood: selectedMood, note });
    navigation.goBack();
  };

  const selectedMoodData = MOODS.find(m => m.id === selectedMood);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary
          }]}>
            How are you feeling?
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Track your mood to understand your patterns
          </Text>
        </Animated.View>

        {/* Mood Grid Selector */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={[styles.moodCard, {
            backgroundColor: colors.background.card,
            borderRadius: borderRadius.xl,
            ...shadows.md
          }]}
        >
          <View style={styles.moodGrid}>
            {MOODS.map((mood, index) => {
              const isSelected = selectedMood === mood.id;
              return (
                <Animated.View
                  key={mood.id}
                  entering={FadeInUp.delay(300 + index * 50).springify()}
                  style={styles.moodItemWrapper}
                >
                  <TouchableOpacity
                    style={[
                      styles.moodItem,
                      {
                        backgroundColor: isSelected ? mood.color + '20' : colors.background.secondary,
                        borderColor: isSelected ? mood.color : colors.border.light,
                        borderRadius: borderRadius.lg,
                      }
                    ]}
                    onPress={() => setSelectedMood(mood.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                    <Text style={[styles.moodLabel, {
                      color: isSelected ? mood.color : colors.text.secondary,
                      fontFamily: typography.fontFamily.primary,
                      fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.regular
                    }]}>
                      {mood.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>

        {/* Note Section */}
        {selectedMood && (
          <Animated.View
            entering={FadeInUp.delay(500).springify()}
            style={[styles.noteCard, {
              backgroundColor: colors.background.card,
              borderRadius: borderRadius.xl,
              ...shadows.md
            }]}
          >
            <Text style={[styles.noteLabel, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Add a note (optional)
            </Text>
            <TextInput
              style={[styles.noteInput, {
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.light,
                color: colors.text.primary,
                borderRadius: borderRadius.md,
                fontFamily: typography.fontFamily.primary
              }]}
              placeholder="What's on your mind?"
              placeholderTextColor={colors.text.tertiary}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </Animated.View>
        )}

        {/* Save Button */}
        {selectedMood && (
          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor: selectedMoodData?.color || colors.primary.main,
                  borderRadius: borderRadius.xl,
                  ...shadows.lg
                }
              ]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={[styles.saveButtonText, {
                color: colors.text.inverse,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.bold
              }]}>
                Save Mood
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  moodCard: {
    marginBottom: 20,
    padding: 24,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  moodItemWrapper: {
    width: '30%',
  },
  moodItem: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  noteCard: {
    marginBottom: 20,
    padding: 20,
  },
  noteLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  noteInput: {
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    borderWidth: 1,
  },
  saveButton: {
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
  },
});
