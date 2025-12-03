/**
 * Family Games Screen - All Family Games
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path } from 'react-native-svg';

// Icons
const BackIcon = ({ size = 24, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GameIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 12h4M8 10v4M15 13h.01M18 11h.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.152A4 4 0 0 0 17.32 5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Game {
  id: string;
  title: string;
  players: string;
  ageRange: string;
  description: string;
  howToPlay: string[];
}

const gamesData: Game[] = [
  {
    id: '1',
    title: 'Would You Rather',
    players: '2+',
    ageRange: 'All ages',
    description: 'Fun question game for everyone',
    howToPlay: [
      'One person asks a "Would you rather" question',
      'Example: "Would you rather fly or be invisible?"',
      'Everyone answers and explains why',
      'Take turns asking questions',
    ]
  },
  {
    id: '2',
    title: 'Two Truths & A Lie',
    players: '3+',
    ageRange: '8+',
    description: 'Guess which statement is false',
    howToPlay: [
      'One person shares 3 statements about themselves',
      'Two are true, one is a lie',
      'Others try to guess which is the lie',
      'Reveal the answer and rotate',
    ]
  },
  {
    id: '3',
    title: 'Family Trivia',
    players: '2+',
    ageRange: 'All ages',
    description: 'Test family knowledge',
    howToPlay: [
      'Take turns asking questions about family members',
      'Example: "What\'s Mom\'s favorite food?"',
      'Keep score if you want',
      'Learn new things about each other!',
    ]
  },
  {
    id: '4',
    title: 'Charades',
    players: '4+',
    ageRange: '6+',
    description: 'Act out words without speaking',
    howToPlay: [
      'One person acts out a word or phrase silently',
      'Others try to guess what it is',
      'Use categories: movies, animals, actions',
      'No talking or pointing at objects!',
    ]
  },
  {
    id: '5',
    title: 'Story Building',
    players: '2+',
    ageRange: 'All ages',
    description: 'Create stories together',
    howToPlay: [
      'One person starts a story with one sentence',
      'The next person adds a sentence',
      'Keep going around, building the story',
      'See where your imagination takes you!',
    ]
  },
  {
    id: '6',
    title: '20 Questions',
    players: '2+',
    ageRange: '6+',
    description: 'Guess what I\'m thinking of',
    howToPlay: [
      'One person thinks of something',
      'Others ask yes/no questions to guess',
      'You get 20 questions total',
      'Whoever guesses correctly goes next',
    ]
  },
  {
    id: '7',
    title: 'This or That',
    players: '2+',
    ageRange: 'All ages',
    description: 'Quick preference choices',
    howToPlay: [
      'Ask a "this or that" question',
      'Example: "Beach or mountains?"',
      'Everyone answers quickly',
      'Learn about each other\'s preferences!',
    ]
  },
  {
    id: '8',
    title: 'Alphabet Game',
    players: '2+',
    ageRange: '5+',
    description: 'Name things in a category A-Z',
    howToPlay: [
      'Choose a category (animals, foods, etc.)',
      'Go around naming items starting with A, B, C...',
      'If someone can\'t think of one, they\'re out',
      'Last person standing wins!',
    ]
  },
];

export const FamilyGamesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const handleGamePress = (game: Game) => {
    const howTo = game.howToPlay.map((step, i) => `${i + 1}. ${step}`).join('\n');
    Alert.alert(
      game.title,
      `${game.description}\n\nHow to Play:\n${howTo}`,
      [{ text: 'Let\'s Play!' }]
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Family Games</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {gamesData.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={[styles.gameCard, { backgroundColor: colors.background.card }]}
            onPress={() => handleGamePress(game)}
            activeOpacity={0.7}
          >
            <View style={[styles.gameIconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
              <GameIcon size={28} color="#9EB567" />
            </View>
            <View style={styles.gameContent}>
              <Text style={[styles.gameTitle, { color: colors.text.primary }]}>{game.title}</Text>
              <Text style={[styles.gameDescription, { color: colors.text.secondary }]}>
                {game.description}
              </Text>
              <View style={styles.gameMeta}>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: colors.text.tertiary }]}>Players</Text>
                  <Text style={[styles.metaValue, { color: colors.text.primary }]}>{game.players}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: colors.text.tertiary }]}>Ages</Text>
                  <Text style={[styles.metaValue, { color: colors.text.primary }]}>{game.ageRange}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  gameCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gameIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  gameContent: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 13,
    marginBottom: 12,
  },
  gameMeta: {
    flexDirection: 'row',
    gap: 24,
  },
  metaItem: {
    gap: 2,
  },
  metaLabel: {
    fontSize: 11,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default FamilyGamesScreen;
