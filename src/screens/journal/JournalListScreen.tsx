/**
 * Journal List Screen - Smart Journal
 * Functional React Native components matching Figma design
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';

type RootStackParamList = {
  JournalList: undefined;
  JournalEntry: { promptId?: string; prompt?: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'JournalList'>;

// Journal prompt structure
interface JournalPrompt {
  id: string;
  question: string;
  answered: boolean;
  answer?: string;
}

// Sample prompts
const journalPrompts: JournalPrompt[] = [
  {
    id: '1',
    question: 'What activities usually make you feel better when you\'re feeling down?',
    answered: false,
  },
  {
    id: '2',
    question: 'If you could travel anywhere, where would you go and why?',
    answered: true,
    answer: 'I\'d love to visit Japan because I\'m fascinated by its culture and history.',
  },
  {
    id: '3',
    question: 'What are three things you\'re grateful for today?',
    answered: false,
  },
  {
    id: '4',
    question: 'Describe a moment recently when you felt truly happy.',
    answered: false,
  },
];

// Illustrations
const illustrations = {
  journal: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-14-component-illustrations-set.png'),
};

export const JournalListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [prompts, setPrompts] = useState<JournalPrompt[]>(journalPrompts);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [activePromptId, setActivePromptId] = useState<string | null>(prompts[0]?.id || null);

  const activePrompt = prompts.find(p => p.id === activePromptId);
  const unansweredPrompts = prompts.filter(p => !p.answered);
  const answeredPrompts = prompts.filter(p => p.answered);

  const handleAnswer = () => {
    if (currentAnswer.trim() && activePromptId) {
      setPrompts(prev =>
        prev.map(p =>
          p.id === activePromptId
            ? { ...p, answered: true, answer: currentAnswer.trim() }
            : p
        )
      );
      setCurrentAnswer('');
      // Move to next unanswered prompt
      const nextUnanswered = prompts.find(p => !p.answered && p.id !== activePromptId);
      if (nextUnanswered) {
        setActivePromptId(nextUnanswered.id);
      }
    }
  };

  const handlePromptPress = (prompt: JournalPrompt) => {
    setActivePromptId(prompt.id);
    setCurrentAnswer('');
  };

  const handleNewEntry = () => {
    navigation.navigate('JournalEntry', {});
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.toggleContainer, { backgroundColor: colors.background.card }]}>
            <View style={[styles.toggleActive, { backgroundColor: colors.primary.main }]} />
          </View>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Smart Journal
          </Text>
        </View>

        {/* Current Question Card */}
        {activePrompt && !activePrompt.answered && (
          <View style={[styles.questionCard, { backgroundColor: colors.background.primary }]}>
            <Text style={[styles.questionLabel, { color: colors.text.secondary }]}>
              Question
            </Text>
            <Text style={[styles.questionText, { color: colors.text.primary }]}>
              {activePrompt.question}
            </Text>

            {/* Answer Button */}
            <TouchableOpacity
              style={[styles.answerButton, { backgroundColor: colors.primary.main }]}
              onPress={handleAnswer}
            >
              <Text style={styles.answerButtonText}>Answer</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Answered Entry Example */}
        {answeredPrompts.length > 0 && (
          <View style={styles.answeredSection}>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
              Previous Entries
            </Text>
            {answeredPrompts.map((prompt) => (
              <TouchableOpacity
                key={prompt.id}
                style={[styles.answeredCard, { backgroundColor: colors.background.card }]}
                onPress={() => handlePromptPress(prompt)}
              >
                <Text style={[styles.answeredQuestion, { color: colors.text.primary }]} numberOfLines={2}>
                  {prompt.question}
                </Text>
                <Text style={[styles.answeredAnswer, { color: colors.text.secondary }]} numberOfLines={3}>
                  {prompt.answer}
                </Text>
                <View style={styles.answeredMeta}>
                  <Image
                    source={illustrations.journal}
                    style={styles.miniIllustration}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Unanswered Prompts */}
        {unansweredPrompts.length > 1 && (
          <View style={styles.promptsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
              More Prompts
            </Text>
            {unansweredPrompts
              .filter(p => p.id !== activePromptId)
              .map((prompt) => (
                <TouchableOpacity
                  key={prompt.id}
                  style={[styles.promptCard, { backgroundColor: colors.background.card }]}
                  onPress={() => handlePromptPress(prompt)}
                >
                  <Text style={[styles.promptQuestion, { color: colors.text.primary }]} numberOfLines={2}>
                    {prompt.question}
                  </Text>
                  <View style={[styles.promptArrow, { backgroundColor: colors.primary.light }]}>
                    <Text style={{ color: colors.primary.main }}>→</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* New Entry Button */}
        <TouchableOpacity
          style={[styles.newEntryButton, { borderColor: colors.primary.main }]}
          onPress={handleNewEntry}
        >
          <Text style={[styles.newEntryText, { color: colors.primary.main }]}>
            + Write Free Entry
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  questionCard: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  questionLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 30,
    marginBottom: 24,
  },
  answerButton: {
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  answerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  answeredSection: {
    marginTop: 8,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  answeredCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  answeredQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  answeredAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
  answeredMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  miniIllustration: {
    width: 50,
    height: 50,
  },
  promptsSection: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  promptQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    marginRight: 12,
  },
  promptArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newEntryButton: {
    marginHorizontal: 24,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
  },
  newEntryText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JournalListScreen;
