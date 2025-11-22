/**
 * SmartJournalScreen
 * AI-guided journaling with personalized prompts
 * Reference: Figma screen 73-light-explore-smart-journal.png
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { theme } from '../../theme';
import { Card, Button } from '../../components';

interface JournalPrompt {
  id: string;
  category: string;
  question: string;
  subPrompts?: string[];
  icon: string;
}

const journalPrompts: JournalPrompt[] = [
  {
    id: '1',
    category: 'Gratitude',
    question: 'What are three things you\'re grateful for today?',
    subPrompts: [
      'Why are these things meaningful to you?',
      'How did they make you feel?',
    ],
    icon: '🙏',
  },
  {
    id: '2',
    category: 'Reflection',
    question: 'What was the highlight of your day?',
    subPrompts: [
      'What made it special?',
      'How can you create more moments like this?',
    ],
    icon: '✨',
  },
  {
    id: '3',
    category: 'Growth',
    question: 'What challenge did you face today and how did you handle it?',
    subPrompts: [
      'What did you learn from this experience?',
      'What would you do differently next time?',
    ],
    icon: '🌱',
  },
  {
    id: '4',
    category: 'Emotions',
    question: 'How are you feeling right now? Describe your emotions.',
    subPrompts: [
      'What might be causing these feelings?',
      'What do you need in this moment?',
    ],
    icon: '💭',
  },
  {
    id: '5',
    category: 'Goals',
    question: 'What\'s one small step you can take toward your goals tomorrow?',
    subPrompts: [
      'What obstacles might you face?',
      'How will you overcome them?',
    ],
    icon: '🎯',
  },
  {
    id: '6',
    category: 'Self-Care',
    question: 'What can you do to take care of yourself today?',
    subPrompts: [
      'What activities make you feel restored?',
      'How can you prioritize them?',
    ],
    icon: '💝',
  },
];

export function SmartJournalScreen() {
  const [selectedPrompt, setSelectedPrompt] = useState<JournalPrompt | null>(null);
  const [journalEntry, setJournalEntry] = useState('');

  const handlePromptSelect = (prompt: JournalPrompt) => {
    setSelectedPrompt(prompt);
    setJournalEntry('');
  };

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      // TODO: Save journal entry to backend
      console.log('Saving entry:', { prompt: selectedPrompt?.question, entry: journalEntry });
      setJournalEntry('');
      setSelectedPrompt(null);
    }
  };

  const handleFreeWrite = () => {
    setSelectedPrompt(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Smart Journal</Text>
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyIcon}>📔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!selectedPrompt ? (
          <>
            {/* Introduction */}
            <Card style={styles.introCard}>
              <Text style={styles.introIcon}>✍️</Text>
              <Text style={styles.introTitle}>AI-Guided Journaling</Text>
              <Text style={styles.introText}>
                Choose a prompt below to get started, or free write about anything
                on your mind. Journaling helps process emotions and gain clarity.
              </Text>
            </Card>

            {/* Free Write Option */}
            <TouchableOpacity
              style={styles.freeWriteCard}
              onPress={() => setSelectedPrompt(null)}
              activeOpacity={0.7}
            >
              <Card variant="elevated" style={styles.freeWriteCardInner}>
                <Text style={styles.freeWriteIcon}>📝</Text>
                <View style={styles.freeWriteContent}>
                  <Text style={styles.freeWriteTitle}>Free Write</Text>
                  <Text style={styles.freeWriteDescription}>
                    Write freely about anything on your mind
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </Card>
            </TouchableOpacity>

            {/* Prompt Categories */}
            <Text style={styles.sectionTitle}>Today's Prompts</Text>
            <View style={styles.promptsList}>
              {journalPrompts.map((prompt) => (
                <TouchableOpacity
                  key={prompt.id}
                  onPress={() => handlePromptSelect(prompt)}
                  activeOpacity={0.7}
                >
                  <Card variant="elevated" style={styles.promptCard}>
                    <View style={styles.promptHeader}>
                      <View style={styles.promptIconContainer}>
                        <Text style={styles.promptIcon}>{prompt.icon}</Text>
                      </View>
                      <View style={styles.promptInfo}>
                        <Text style={styles.promptCategory}>{prompt.category}</Text>
                        <Text style={styles.promptQuestion} numberOfLines={2}>
                          {prompt.question}
                        </Text>
                      </View>
                      <Text style={styles.arrow}>›</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Writing Interface */}
            <Card style={styles.writingCard}>
              <View style={styles.writingHeader}>
                <View style={styles.promptBadge}>
                  <Text style={styles.promptBadgeIcon}>{selectedPrompt.icon}</Text>
                  <Text style={styles.promptBadgeText}>{selectedPrompt.category}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedPrompt(null)}>
                  <Text style={styles.changePromptText}>Change prompt</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.writingQuestion}>{selectedPrompt.question}</Text>

              {selectedPrompt.subPrompts && (
                <View style={styles.subPrompts}>
                  <Text style={styles.subPromptsTitle}>Think about:</Text>
                  {selectedPrompt.subPrompts.map((subPrompt, index) => (
                    <View key={index} style={styles.subPromptItem}>
                      <Text style={styles.subPromptBullet}>•</Text>
                      <Text style={styles.subPromptText}>{subPrompt}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>

            <View style={styles.editorContainer}>
              <TextInput
                style={styles.editor}
                placeholder="Start writing your thoughts..."
                placeholderTextColor={theme.colors.text.tertiary}
                value={journalEntry}
                onChangeText={setJournalEntry}
                multiline
                textAlignVertical="top"
                autoFocus
              />
              <View style={styles.editorFooter}>
                <Text style={styles.wordCount}>
                  {journalEntry.split(/\s+/).filter(Boolean).length} words
                </Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <Button
                title="Save Entry"
                onPress={handleSaveEntry}
                disabled={!journalEntry.trim()}
                fullWidth
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
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

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: theme.colors.text.primary,
    fontWeight: '300',
  },

  title: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
  },

  historyButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  historyIcon: {
    fontSize: 24,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  introCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
  },

  introIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },

  introTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  introText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  freeWriteCard: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  freeWriteCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },

  freeWriteIcon: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },

  freeWriteContent: {
    flex: 1,
  },

  freeWriteTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },

  freeWriteDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  arrow: {
    fontSize: 24,
    color: theme.colors.text.tertiary,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  promptsList: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },

  promptCard: {
    marginBottom: theme.spacing.sm,
  },

  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },

  promptIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },

  promptIcon: {
    fontSize: 24,
  },

  promptInfo: {
    flex: 1,
  },

  promptCategory: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
    marginBottom: 4,
  },

  promptQuestion: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    lineHeight: 20,
  },

  writingCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
  },

  writingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },

  promptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },

  promptBadgeIcon: {
    fontSize: 16,
  },

  promptBadgeText: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
  },

  changePromptText: {
    ...theme.typography.caption,
    color: theme.colors.primary.DEFAULT,
  },

  writingQuestion: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  subPrompts: {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.base,
  },

  subPromptsTitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },

  subPromptItem: {
    flexDirection: 'row',
    marginTop: theme.spacing.xs,
  },

  subPromptBullet: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
    marginRight: theme.spacing.xs,
  },

  subPromptText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    flex: 1,
  },

  editorContainer: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  editor: {
    ...theme.typography.body,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.base,
    padding: theme.spacing.md,
    minHeight: 300,
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },

  editorFooter: {
    paddingTop: theme.spacing.sm,
    alignItems: 'flex-end',
  },

  wordCount: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },

  actionButtons: {
    paddingHorizontal: theme.spacing.lg,
  },
});
