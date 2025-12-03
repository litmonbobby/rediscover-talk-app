/**
 * Sleep Stories Screen - Matches Figma design
 * Bedtime stories for sleep and relaxation
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
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;

type SleepStackParamList = {
  SleepSounds: undefined;
  SoundPlayer: { id: string; name: string; icon: string };
  SleepMusic: undefined;
  SleepStories: undefined;
};

type NavigationProp = NativeStackNavigationProp<SleepStackParamList, 'SleepStories'>;

// Back Arrow Icon
const BackArrowIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19L5 12L12 5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Play Icon
const PlayIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill={color}>
    <Path d="M8 5v14l11-7z" />
  </Svg>
);

// Clock Icon
const ClockIcon = ({ color = '#9EB567' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// Story categories
const storyCategories = [
  { id: 'all', label: 'All' },
  { id: 'bedtime', label: 'Bedtime' },
  { id: 'nature', label: 'Nature' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'travel', label: 'Travel' },
  { id: 'meditation', label: 'Meditation' },
];

// Story data
interface Story {
  id: string;
  title: string;
  narrator: string;
  duration: string;
  category: string;
  isPremium: boolean;
  backgroundColor: string;
  emoji: string;
}

const storiesData: Story[] = [
  {
    id: '1',
    title: 'The Enchanted Forest',
    narrator: 'Sarah Moon',
    duration: '25 min',
    category: 'fantasy',
    isPremium: false,
    backgroundColor: '#228B22',
    emoji: '🌲',
  },
  {
    id: '2',
    title: 'Ocean Voyage',
    narrator: 'James Rivers',
    duration: '30 min',
    category: 'travel',
    isPremium: false,
    backgroundColor: '#1E90FF',
    emoji: '🚢',
  },
  {
    id: '3',
    title: 'Starlit Dreams',
    narrator: 'Luna Stars',
    duration: '20 min',
    category: 'bedtime',
    isPremium: true,
    backgroundColor: '#2D1B4E',
    emoji: '✨',
  },
  {
    id: '4',
    title: 'Mountain Whispers',
    narrator: 'Alex Stone',
    duration: '35 min',
    category: 'nature',
    isPremium: false,
    backgroundColor: '#708090',
    emoji: '🏔️',
  },
  {
    id: '5',
    title: 'The Sleepy Dragon',
    narrator: 'Emma Frost',
    duration: '22 min',
    category: 'fantasy',
    isPremium: true,
    backgroundColor: '#E25822',
    emoji: '🐉',
  },
  {
    id: '6',
    title: 'Peaceful Garden',
    narrator: 'Zen Master',
    duration: '28 min',
    category: 'meditation',
    isPremium: false,
    backgroundColor: '#9EB567',
    emoji: '🌸',
  },
  {
    id: '7',
    title: 'Desert Nights',
    narrator: 'Sarah Moon',
    duration: '32 min',
    category: 'travel',
    isPremium: true,
    backgroundColor: '#F5A623',
    emoji: '🏜️',
  },
  {
    id: '8',
    title: 'Rainy Day Tales',
    narrator: 'James Rivers',
    duration: '26 min',
    category: 'bedtime',
    isPremium: false,
    backgroundColor: '#4A6FA5',
    emoji: '🌧️',
  },
];

export const SleepStoriesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredStories = activeFilter === 'all'
    ? storiesData
    : storiesData.filter(story => story.category === activeFilter);

  const handleStoryPress = (story: Story) => {
    // Navigate to SoundPlayer with story data
    navigation.navigate('SoundPlayer', {
      id: story.id,
      name: story.title,
      icon: 'dream', // Use dream icon for stories
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          Sleep Stories
        </Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {storyCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterPill,
                {
                  backgroundColor: activeFilter === category.id ? '#9EB567' : colors.background.card,
                  borderColor: activeFilter === category.id ? '#9EB567' : colors.border.light,
                },
              ]}
              onPress={() => setActiveFilter(category.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterPillText,
                  { color: activeFilter === category.id ? '#FFFFFF' : colors.text.primary },
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stories Grid */}
        <View style={styles.storiesGrid}>
          {filteredStories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={[styles.storyCard, { backgroundColor: colors.background.card }]}
              onPress={() => handleStoryPress(story)}
              activeOpacity={0.7}
            >
              {/* Story Artwork */}
              <View style={[styles.storyArtwork, { backgroundColor: story.backgroundColor }]}>
                <Text style={styles.storyEmoji}>{story.emoji}</Text>
                {story.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumText}>PRO</Text>
                  </View>
                )}
                {/* Play Button Overlay */}
                <View style={styles.playOverlay}>
                  <View style={styles.playButtonSmall}>
                    <PlayIcon color="#FFFFFF" />
                  </View>
                </View>
              </View>

              {/* Story Info */}
              <View style={styles.storyInfo}>
                <Text
                  style={[styles.storyTitle, { color: colors.text.primary }]}
                  numberOfLines={2}
                >
                  {story.title}
                </Text>
                <Text
                  style={[styles.storyNarrator, { color: colors.text.secondary }]}
                  numberOfLines={1}
                >
                  {story.narrator}
                </Text>
                <View style={styles.durationRow}>
                  <ClockIcon color={colors.text.tertiary} />
                  <Text style={[styles.storyDuration, { color: colors.text.tertiary }]}>
                    {story.duration}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  storyCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  storyArtwork: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  storyEmoji: {
    fontSize: 48,
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F5A623',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  playOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  playButtonSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInfo: {
    padding: 12,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
  },
  storyNarrator: {
    fontSize: 12,
    marginBottom: 6,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storyDuration: {
    fontSize: 11,
  },
});

export default SleepStoriesScreen;
