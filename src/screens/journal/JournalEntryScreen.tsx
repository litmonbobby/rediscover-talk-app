/**
 * Journal Entry Screen - Create/Edit Journal Entries
 * Full functionality with persistence
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import {
  journalStorageService,
  JournalEntry,
  MoodType,
} from '../../services/JournalStorageService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type JournalStackParamList = {
  JournalList: undefined;
  JournalEntry: { entryId?: string; promptId?: string; prompt?: string };
};

type NavigationProp = NativeStackNavigationProp<JournalStackParamList, 'JournalEntry'>;
type JournalEntryRouteProp = RouteProp<JournalStackParamList, 'JournalEntry'>;

// Figma-extracted assets
const assets = {
  // Icons
  moreCircle: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-more-circle.png'),
  plus: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-plus.png'),
  voice: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-voice.png'),
  camera: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-camera.png'),
  edit: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-edit.png'),

  // Mood indicators
  moodGreat: require('../../figma-extracted/assets/components/mood-indicators/mood-great-component-mood-indicator.png'),
  moodGood: require('../../figma-extracted/assets/components/mood-indicators/mood-good-component-mood-indicator.png'),
  moodOkay: require('../../figma-extracted/assets/components/mood-indicators/mood-okay-component-mood-indicator.png'),
  moodNotGood: require('../../figma-extracted/assets/components/mood-indicators/mood-not-good-component-mood-indicator.png'),
  moodBad: require('../../figma-extracted/assets/components/mood-indicators/mood-bad-component-mood-indicator.png'),
};

interface MoodOption {
  type: MoodType;
  label: string;
  image: any;
  color: string;
}

const moodOptions: MoodOption[] = [
  { type: 'great', label: 'Great', image: assets.moodGreat, color: '#6BCB77' },
  { type: 'good', label: 'Good', image: assets.moodGood, color: '#9EB567' },
  { type: 'okay', label: 'Okay', image: assets.moodOkay, color: '#FFD36B' },
  { type: 'notGood', label: 'Not Good', image: assets.moodNotGood, color: '#FFA06B' },
  { type: 'bad', label: 'Bad', image: assets.moodBad, color: '#FF6B6B' },
];

// Close Icon SVG
const CloseIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6L18 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const JournalEntryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<JournalEntryRouteProp>();
  const { colors, isDarkMode } = useTheme();

  const { entryId, promptId, prompt } = route.params || {};
  const isEditing = !!entryId;

  const [selectedMood, setSelectedMood] = useState<MoodType>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [existingEntry, setExistingEntry] = useState<JournalEntry | null>(null);

  // Load existing entry if editing
  useEffect(() => {
    const loadEntry = async () => {
      if (entryId) {
        const entry = await journalStorageService.getJournalEntry(entryId);
        if (entry) {
          setExistingEntry(entry);
          setTitle(entry.title);
          setContent(entry.content);
          setSelectedMood(entry.mood);
        }
      }
    };
    loadEntry();
  }, [entryId]);

  const handleClose = () => {
    if (title.trim() || content.trim()) {
      Alert.alert(
        'Discard Entry?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    if (isSaving) return;

    if (!title.trim() && !content.trim()) {
      Alert.alert('Empty Entry', 'Please add a title or write something before saving.');
      return;
    }

    setIsSaving(true);

    try {
      if (isEditing && existingEntry) {
        // Update existing entry
        await journalStorageService.updateJournalEntry(entryId!, {
          title: title.trim(),
          content: content.trim(),
          mood: selectedMood,
        });
      } else {
        // Create new entry
        await journalStorageService.saveJournalEntry({
          title: title.trim() || (prompt ? 'Prompt Response' : 'Untitled Entry'),
          content: content.trim(),
          mood: selectedMood,
          promptId: promptId,
          promptQuestion: prompt,
        });

        // If answering a prompt, also save the prompt answer
        if (promptId && content.trim()) {
          await journalStorageService.savePromptAnswer(promptId, content.trim());
        }
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving entry:', error);
      Alert.alert('Error', 'Failed to save your entry. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  const handleMoreOptions = () => {
    if (isEditing) {
      Alert.alert(
        'Options',
        'What would you like to do?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete Entry',
            style: 'destructive',
            onPress: async () => {
              await journalStorageService.deleteJournalEntry(entryId!);
              navigation.goBack();
            },
          },
        ]
      );
    }
  };

  const canSave = title.trim().length > 0 || content.trim().length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handleClose}>
            <CloseIcon size={24} color={colors.text.primary} />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            {isEditing ? 'Edit Entry' : 'New Entry'}
          </Text>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: canSave ? '#9EB567' : colors.background.secondary },
              ]}
              onPress={handleSave}
              disabled={!canSave || isSaving}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  { color: canSave ? '#FFFFFF' : colors.text.tertiary },
                ]}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
            {isEditing && (
              <TouchableOpacity style={styles.headerButton} onPress={handleMoreOptions}>
                <Image
                  source={assets.moreCircle}
                  style={[styles.headerIcon, { tintColor: colors.text.primary }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Prompt Display */}
          {prompt && (
            <View style={[styles.promptBanner, { backgroundColor: colors.primary.light }]}>
              <Text style={[styles.promptLabel, { color: colors.primary.main }]}>
                Prompt
              </Text>
              <Text style={[styles.promptText, { color: colors.text.primary }]}>
                {prompt}
              </Text>
            </View>
          )}

          {/* Mood Selection Section */}
          <View style={styles.moodSection}>
            <Text style={[styles.sectionLabel, { color: colors.text.secondary }]}>
              How are you feeling?
            </Text>
            <View style={styles.moodRow}>
              {moodOptions.map((mood) => (
                <TouchableOpacity
                  key={mood.type}
                  style={[
                    styles.moodButton,
                    {
                      backgroundColor: colors.background.card,
                      borderColor: selectedMood === mood.type ? mood.color : 'transparent',
                      borderWidth: selectedMood === mood.type ? 2 : 0,
                    },
                  ]}
                  onPress={() => handleMoodSelect(mood.type)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={mood.image}
                    style={styles.moodImage}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.moodLabel,
                      {
                        color: selectedMood === mood.type ? mood.color : colors.text.secondary,
                      },
                    ]}
                  >
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Title Input */}
          <View style={styles.titleSection}>
            <TextInput
              style={[
                styles.titleInput,
                { color: colors.text.primary, borderBottomColor: colors.border.light },
              ]}
              placeholder="Give your entry a title..."
              placeholderTextColor={colors.text.tertiary}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          {/* Content Input */}
          <View style={styles.contentSection}>
            <TextInput
              style={[styles.contentInput, { color: colors.text.primary }]}
              placeholder={prompt ? "Write your response..." : "Write your thoughts..."}
              placeholderTextColor={colors.text.tertiary}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              maxLength={5000}
            />
          </View>

          {/* Character count */}
          <View style={styles.charCountSection}>
            <Text style={[styles.charCount, { color: colors.text.tertiary }]}>
              {content.length}/5000
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Toolbar */}
        <View style={[styles.toolbar, { backgroundColor: colors.background.card, borderTopColor: colors.border.light }]}>
          <TouchableOpacity style={styles.toolbarButton} onPress={() => {}}>
            <Image
              source={assets.plus}
              style={[styles.toolbarIcon, { tintColor: colors.text.secondary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolbarButton} onPress={() => {}}>
            <Image
              source={assets.voice}
              style={[styles.toolbarIcon, { tintColor: colors.text.secondary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolbarButton} onPress={() => {}}>
            <Image
              source={assets.camera}
              style={[styles.toolbarIcon, { tintColor: colors.text.secondary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolbarButton} onPress={() => {}}>
            <Image
              source={assets.edit}
              style={[styles.toolbarIcon, { tintColor: colors.text.secondary }]}
              resizeMode="contain"
            />
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // Prompt Banner
  promptBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  promptLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },

  // Mood Section
  moodSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: (SCREEN_WIDTH - 40 - 32) / 5,
    aspectRatio: 0.8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  moodImage: {
    width: 36,
    height: 36,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Title Section
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },

  // Content Section
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    flex: 1,
    minHeight: 300,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    minHeight: 250,
  },

  // Character Count
  charCountSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    alignItems: 'flex-end',
  },
  charCount: {
    fontSize: 12,
  },

  // Toolbar
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
  },
  toolbarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarIcon: {
    width: 24,
    height: 24,
  },
});

export default JournalEntryScreen;
