/**
 * Mood Notes Screen - Step 4 of Mood Check-in Flow
 * "Add a note about how you're feeling"
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { useMoodStore } from '../../store/moodStore';

type MoodStackParamList = {
  MoodCheckIn: undefined;
  MoodReason: undefined;
  MoodFeeling: undefined;
  MoodNotes: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<MoodStackParamList, 'MoodNotes'>;

// Back Arrow Icon
const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Checkmark Icon
const CheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MoodNotesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const { currentCheckIn, setNotes, saveCurrentCheckIn, resetCurrentCheckIn } = useMoodStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const savedEntry = await saveCurrentCheckIn();

      if (savedEntry) {
        // Show success and navigate back to home
        Alert.alert(
          'Mood Saved! 🎉',
          'Your mood has been securely saved.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Pop back to the Home screen (removes all mood screens from stack)
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  })
                );
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to save mood. Please try again.');
      }
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    // Clear notes and save
    setNotes('');
    handleSave();
  };

  const moodEmoji = {
    'Bad': '😢',
    'Not Good': '😕',
    'Okay': '😐',
    'Good': '😊',
    'Great': '😄',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackIcon size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotCompleted]} />
            <View style={[styles.progressDot, styles.progressDotCompleted]} />
            <View style={[styles.progressDot, styles.progressDotCompleted]} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Mood Summary */}
          <View style={styles.moodSummary}>
            <Text style={styles.moodEmoji}>
              {currentCheckIn.name ? moodEmoji[currentCheckIn.name] : '😊'}
            </Text>
            <Text style={[styles.moodLabel, { color: colors.text.primary }]}>
              Feeling {currentCheckIn.name || 'Good'}
            </Text>
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: colors.text.primary }]}>
            Add a note (optional)
          </Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            What's on your mind?
          </Text>

          {/* Notes Input */}
          <View style={[styles.inputContainer, { backgroundColor: colors.background.card }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text.primary }]}
              placeholder="Write about your thoughts, feelings, or what happened today..."
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={currentCheckIn.notes}
              onChangeText={setNotes}
              maxLength={500}
            />
            <Text style={[styles.charCount, { color: colors.text.secondary }]}>
              {currentCheckIn.notes.length}/500
            </Text>
          </View>

          {/* Quick Prompts */}
          <View style={styles.promptsContainer}>
            <Text style={[styles.promptsTitle, { color: colors.text.secondary }]}>
              Quick prompts:
            </Text>
            <View style={styles.promptsRow}>
              {['Grateful for...', 'Today I learned...', 'I felt proud when...'].map((prompt) => (
                <TouchableOpacity
                  key={prompt}
                  style={[styles.promptChip, { backgroundColor: colors.background.card }]}
                  onPress={() => setNotes(currentCheckIn.notes + (currentCheckIn.notes ? '\n' : '') + prompt)}
                >
                  <Text style={[styles.promptText, { color: colors.text.primary }]}>
                    {prompt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity onPress={handleSkip} disabled={isSaving}>
            <Text style={[styles.skipText, { color: colors.text.secondary }]}>
              Skip & Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.saveButton,
              { backgroundColor: '#9EB567' },
              isSaving && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={isSaving}
          >
            <CheckIcon size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Saving...' : 'Save Mood'}
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressDotCompleted: {
    backgroundColor: '#9EB567',
  },
  progressDotActive: {
    backgroundColor: '#9EB567',
    width: 24,
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  moodSummary: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },
  promptsContainer: {
    marginTop: 8,
  },
  promptsTitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  promptsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promptChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  promptText: {
    fontSize: 13,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  saveButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default MoodNotesScreen;
