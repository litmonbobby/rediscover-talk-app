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
  SafeAreaView,
} from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

type MoodType = 'amazing' | 'good' | 'okay' | 'bad' | 'terrible';

const moodOptions = [
  { type: 'amazing' as MoodType, emoji: '😄', label: 'Amazing' },
  { type: 'good' as MoodType, emoji: '😊', label: 'Good' },
  { type: 'okay' as MoodType, emoji: '😐', label: 'Okay' },
  { type: 'bad' as MoodType, emoji: '😔', label: 'Bad' },
  { type: 'terrible' as MoodType, emoji: '😢', label: 'Terrible' },
];

export const JournalEntryScreen = ({ navigation }: any) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.closeButton, {
                backgroundColor: colors.background.secondary,
                borderRadius: borderRadius.lg
              }]}
            >
              <Text style={[styles.closeIcon, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary
              }]}>
                ✕
              </Text>
            </TouchableOpacity>
            <Text style={[styles.title, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.secondary
            }]}>
              New Entry
            </Text>
            <Text style={[styles.subtitle, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Express your thoughts and feelings
            </Text>
          </Animated.View>

          {/* Title Input */}
          <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.inputContainer}>
            <Text style={[styles.inputLabel, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Title
            </Text>
            <TextInput
              style={[styles.titleInput, {
                backgroundColor: colors.background.card,
                borderColor: colors.border.light,
                color: colors.text.primary,
                borderRadius: borderRadius.lg,
                fontFamily: typography.fontFamily.primary
              }]}
              placeholder="Give your entry a title..."
              placeholderTextColor={colors.text.tertiary}
              value={title}
              onChangeText={setTitle}
            />
          </Animated.View>

          {/* Mood Selector */}
          <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.moodContainer}>
            <Text style={[styles.inputLabel, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              How are you feeling?
            </Text>
            <View style={styles.moodGrid}>
              {moodOptions.map((mood, index) => (
                <Animated.View
                  key={mood.type}
                  entering={FadeInUp.delay(350 + index * 30).springify()}
                >
                  <TouchableOpacity
                    style={[
                      styles.moodOption,
                      {
                        backgroundColor: selectedMood === mood.type ? colors.background.card : colors.background.secondary,
                        borderColor: selectedMood === mood.type ? colors.primary.main : colors.border.light,
                        borderRadius: borderRadius.lg
                      }
                    ]}
                    onPress={() => setSelectedMood(mood.type)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                    <Text
                      style={[
                        styles.moodLabel,
                        {
                          color: selectedMood === mood.type ? colors.text.primary : colors.text.tertiary,
                          fontFamily: typography.fontFamily.primary,
                          fontWeight: selectedMood === mood.type ? typography.fontWeight.semibold : typography.fontWeight.regular
                        }
                      ]}
                    >
                      {mood.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Content Input */}
          <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.inputContainer}>
            <Text style={[styles.inputLabel, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Your thoughts
            </Text>
            <TextInput
              style={[styles.contentInput, {
                backgroundColor: colors.background.card,
                borderColor: colors.border.light,
                color: colors.text.primary,
                borderRadius: borderRadius.lg,
                fontFamily: typography.fontFamily.primary
              }]}
              placeholder="What's on your mind today?"
              placeholderTextColor={colors.text.tertiary}
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
          </Animated.View>

          {/* Save Button */}
          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor: (title.trim() && content.trim()) ? colors.primary.main : colors.background.secondary,
                  borderRadius: borderRadius.xl,
                  ...shadows.lg
                }
              ]}
              onPress={handleSave}
              disabled={!title.trim() || !content.trim()}
              activeOpacity={0.8}
            >
              <Text style={[styles.saveButtonText, {
                color: (title.trim() && content.trim()) ? colors.text.inverse : colors.text.tertiary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.bold
              }]}>
                Save Entry
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  titleInput: {
    padding: 16,
    fontSize: 18,
    borderWidth: 1,
  },
  moodContainer: {
    marginBottom: 20,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moodOption: {
    width: '18%',
    aspectRatio: 1,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
  },
  contentInput: {
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 200,
    borderWidth: 1,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
  },
});
