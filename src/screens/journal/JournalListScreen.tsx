/**
 * Journal List Screen - Smart Journal
 * Full CRUD functionality with AsyncStorage persistence
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import {
  journalStorageService,
  JournalEntry,
  formatDate,
} from '../../services/JournalStorageService';

type RootStackParamList = {
  JournalList: undefined;
  JournalEntry: { entryId?: string; promptId?: string; prompt?: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'JournalList'>;

// Journal prompts - 60+ therapeutic prompts organized by category
const journalPrompts = [
  // Gratitude & Appreciation (1-10)
  { id: 'prompt_1', question: 'What are three things you\'re grateful for today?' },
  { id: 'prompt_2', question: 'Who is someone that made a positive impact on your life recently?' },
  { id: 'prompt_3', question: 'What small moment brought you joy today?' },
  { id: 'prompt_4', question: 'What is something you often take for granted that you\'re thankful for?' },
  { id: 'prompt_5', question: 'Describe a recent act of kindness you witnessed or experienced.' },
  { id: 'prompt_6', question: 'What aspect of your home or living space are you most grateful for?' },
  { id: 'prompt_7', question: 'What skill or ability do you appreciate having?' },
  { id: 'prompt_8', question: 'What is a memory that always makes you smile?' },
  { id: 'prompt_9', question: 'What opportunity are you grateful for right now?' },
  { id: 'prompt_10', question: 'Who is someone you haven\'t thanked enough? What would you say to them?' },

  // Self-Reflection & Growth (11-20)
  { id: 'prompt_11', question: 'What is something you\'ve learned about yourself recently?' },
  { id: 'prompt_12', question: 'What would you tell your younger self?' },
  { id: 'prompt_13', question: 'What personal quality are you most proud of?' },
  { id: 'prompt_14', question: 'What is a mistake that taught you an important lesson?' },
  { id: 'prompt_15', question: 'How have you grown as a person in the past year?' },
  { id: 'prompt_16', question: 'What belief have you changed your mind about?' },
  { id: 'prompt_17', question: 'What is something you need to forgive yourself for?' },
  { id: 'prompt_18', question: 'What would your ideal self look like in 5 years?' },
  { id: 'prompt_19', question: 'What fear would you like to overcome?' },
  { id: 'prompt_20', question: 'What is holding you back from reaching your full potential?' },

  // Emotions & Mental Health (21-30)
  { id: 'prompt_21', question: 'What activities usually make you feel better when you\'re feeling down?' },
  { id: 'prompt_22', question: 'What brings you peace when you feel anxious?' },
  { id: 'prompt_23', question: 'Describe a moment recently when you felt truly happy.' },
  { id: 'prompt_24', question: 'What emotion have you been avoiding lately?' },
  { id: 'prompt_25', question: 'How do you usually cope with stress? Is it healthy?' },
  { id: 'prompt_26', question: 'What triggers your anxiety and how can you manage it better?' },
  { id: 'prompt_27', question: 'When was the last time you cried? What was it about?' },
  { id: 'prompt_28', question: 'What does self-care look like for you?' },
  { id: 'prompt_29', question: 'What negative thought pattern would you like to change?' },
  { id: 'prompt_30', question: 'How do you show yourself compassion during difficult times?' },

  // Relationships & Connection (31-40)
  { id: 'prompt_31', question: 'Who in your life makes you feel most like yourself?' },
  { id: 'prompt_32', question: 'What quality do you value most in a friend?' },
  { id: 'prompt_33', question: 'Describe a meaningful conversation you\'ve had recently.' },
  { id: 'prompt_34', question: 'Is there someone you need to have an honest conversation with?' },
  { id: 'prompt_35', question: 'How do you show love to the people you care about?' },
  { id: 'prompt_36', question: 'What relationship in your life needs more attention?' },
  { id: 'prompt_37', question: 'What boundary do you need to set or maintain?' },
  { id: 'prompt_38', question: 'Who inspires you and why?' },
  { id: 'prompt_39', question: 'What is something you wish others understood about you?' },
  { id: 'prompt_40', question: 'How can you be a better friend, partner, or family member?' },

  // Dreams & Aspirations (41-50)
  { id: 'prompt_41', question: 'If you could travel anywhere, where would you go and why?' },
  { id: 'prompt_42', question: 'Describe your perfect day from start to finish.' },
  { id: 'prompt_43', question: 'What is a dream you\'ve never told anyone about?' },
  { id: 'prompt_44', question: 'If money wasn\'t a concern, how would you spend your time?' },
  { id: 'prompt_45', question: 'What legacy do you want to leave behind?' },
  { id: 'prompt_46', question: 'What goal are you currently working toward?' },
  { id: 'prompt_47', question: 'What adventure would you love to go on?' },
  { id: 'prompt_48', question: 'What new skill or hobby would you like to learn?' },
  { id: 'prompt_49', question: 'If you could change one thing about the world, what would it be?' },
  { id: 'prompt_50', question: 'What does success mean to you?' },

  // Mindfulness & Present Moment (51-60)
  { id: 'prompt_51', question: 'What are you looking forward to this week?' },
  { id: 'prompt_52', question: 'Describe your surroundings right now using all five senses.' },
  { id: 'prompt_53', question: 'What is something beautiful you noticed today?' },
  { id: 'prompt_54', question: 'How is your body feeling right now?' },
  { id: 'prompt_55', question: 'What sounds can you hear in this moment?' },
  { id: 'prompt_56', question: 'What was the best part of your day so far?' },
  { id: 'prompt_57', question: 'What are you currently struggling with?' },
  { id: 'prompt_58', question: 'What made you laugh recently?' },
  { id: 'prompt_59', question: 'What is weighing on your mind right now?' },
  { id: 'prompt_60', question: 'What do you need to let go of today?' },

  // Values & Purpose (61-65)
  { id: 'prompt_61', question: 'What values are most important to you?' },
  { id: 'prompt_62', question: 'What gives your life meaning and purpose?' },
  { id: 'prompt_63', question: 'When do you feel most alive?' },
  { id: 'prompt_64', question: 'What would you do if you knew you couldn\'t fail?' },
  { id: 'prompt_65', question: 'How do you want to be remembered?' },
];

// Mood colors for display
const getMoodColor = (mood: string | null): string => {
  switch (mood) {
    case 'great': return '#6BCB77';
    case 'good': return '#9EB567';
    case 'okay': return '#FFD36B';
    case 'notGood': return '#FFA06B';
    case 'bad': return '#FF6B6B';
    default: return '#9EB567';
  }
};

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

// Plus Icon
const PlusIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Trash Icon
const TrashIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const JournalListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [answeredPromptIds, setAnsweredPromptIds] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({ totalEntries: 0, streak: 0 });

  // Load data
  const loadData = useCallback(async () => {
    try {
      const [journalEntries, promptAnswers, journalStats] = await Promise.all([
        journalStorageService.getAllJournalEntries(),
        journalStorageService.getPromptAnswers(),
        journalStorageService.getJournalStats(),
      ]);

      setEntries(journalEntries);
      setAnsweredPromptIds(new Set(promptAnswers.map(a => a.promptId)));
      setStats(journalStats);
    } catch (error) {
      console.error('Error loading journal data:', error);
    }
  }, []);

  // Refresh on focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Get unanswered prompts
  const unansweredPrompts = journalPrompts.filter(p => !answeredPromptIds.has(p.id));
  const currentPrompt = unansweredPrompts[0];

  // Handle prompt answer - navigate to entry screen with prompt
  const handleAnswerPrompt = (prompt: typeof journalPrompts[0]) => {
    navigation.navigate('JournalEntry', {
      promptId: prompt.id,
      prompt: prompt.question,
    });
  };

  // Handle new free entry
  const handleNewEntry = () => {
    navigation.navigate('JournalEntry', {});
  };

  // Handle edit entry
  const handleEditEntry = (entry: JournalEntry) => {
    navigation.navigate('JournalEntry', { entryId: entry.id });
  };

  // Handle delete entry
  const handleDeleteEntry = (entry: JournalEntry) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await journalStorageService.deleteJournalEntry(entry.id);
            loadData();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Smart Journal</Text>
        <TouchableOpacity onPress={handleNewEntry} style={styles.headerButton}>
          <PlusIcon size={24} color={colors.primary.main} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Banner */}
        <View style={[styles.statsBanner, { backgroundColor: colors.primary.main }]}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalEntries}</Text>
            <Text style={styles.statLabel}>Entries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Current Prompt Card */}
        {currentPrompt && (
          <View style={styles.promptSection}>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
              Today's Prompt
            </Text>
            <View style={[styles.promptCard, { backgroundColor: colors.background.card }]}>
              <Text style={[styles.promptQuestion, { color: colors.text.primary }]}>
                {currentPrompt.question}
              </Text>
              <TouchableOpacity
                style={[styles.answerButton, { backgroundColor: colors.primary.main }]}
                onPress={() => handleAnswerPrompt(currentPrompt)}
              >
                <Text style={styles.answerButtonText}>Answer This</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* More Prompts */}
        {unansweredPrompts.length > 1 && (
          <View style={styles.morePromptsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
              More Prompts
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.promptsScroll}
            >
              {unansweredPrompts.slice(1, 4).map((prompt) => (
                <TouchableOpacity
                  key={prompt.id}
                  style={[styles.miniPromptCard, { backgroundColor: colors.background.card }]}
                  onPress={() => handleAnswerPrompt(prompt)}
                >
                  <Text
                    style={[styles.miniPromptText, { color: colors.text.primary }]}
                    numberOfLines={3}
                  >
                    {prompt.question}
                  </Text>
                  <Text style={[styles.tapToAnswer, { color: colors.primary.main }]}>
                    Tap to answer
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Journal Entries */}
        <View style={styles.entriesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Your Entries ({entries.length})
          </Text>

          {entries.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors.background.card }]}>
              <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
                No entries yet
              </Text>
              <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                Start journaling by answering a prompt or writing a free entry
              </Text>
            </View>
          ) : (
            entries.map((entry) => (
              <TouchableOpacity
                key={entry.id}
                style={[styles.entryCard, { backgroundColor: colors.background.card }]}
                onPress={() => handleEditEntry(entry)}
                activeOpacity={0.7}
              >
                <View style={styles.entryHeader}>
                  <View style={styles.entryTitleRow}>
                    {entry.mood && (
                      <View
                        style={[styles.moodDot, { backgroundColor: getMoodColor(entry.mood) }]}
                      />
                    )}
                    <Text
                      style={[styles.entryTitle, { color: colors.text.primary }]}
                      numberOfLines={1}
                    >
                      {entry.title || 'Untitled Entry'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteEntry(entry)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <TrashIcon size={18} color={colors.text.tertiary} />
                  </TouchableOpacity>
                </View>

                {entry.promptQuestion && (
                  <Text
                    style={[styles.entryPrompt, { color: colors.primary.main }]}
                    numberOfLines={1}
                  >
                    Prompt: {entry.promptQuestion}
                  </Text>
                )}

                <Text
                  style={[styles.entryPreview, { color: colors.text.secondary }]}
                  numberOfLines={2}
                >
                  {entry.content}
                </Text>

                <Text style={[styles.entryDate, { color: colors.text.tertiary }]}>
                  {formatDate(entry.createdAt)}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Stats Banner
  statsBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 24,
  },

  // Sections
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  promptCard: {
    padding: 20,
    borderRadius: 16,
  },
  promptQuestion: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 20,
  },
  answerButton: {
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
  },
  answerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // More Prompts
  morePromptsSection: {
    marginBottom: 24,
    paddingLeft: 20,
  },
  promptsScroll: {
    paddingRight: 20,
    gap: 12,
  },
  miniPromptCard: {
    width: 180,
    padding: 16,
    borderRadius: 12,
  },
  miniPromptText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tapToAnswer: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Entries
  entriesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  entryCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moodDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  entryPrompt: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  entryPreview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
  },

  // Empty State
  emptyState: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  // New Entry Button
  newEntryButton: {
    marginHorizontal: 20,
    marginTop: 8,
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
