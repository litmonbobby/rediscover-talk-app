/**
 * Explore Screen - Exact Figma Recreation
 * Matches 52-light-explore.png design
 */

import React from 'react';
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
import {
  RainIcon,
  DreamIcon,
  WindIcon,
  FireIcon,
  ThunderIcon,
  ForestIcon,
  RiverIcon,
  MelodyIcon,
  OceanIcon,
  MountainIcon,
  SoundBarsIcon,
  PlanetIcon,
  CrownIcon,
} from '../../components/icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 3; // 3 cards with gaps

type ExploreStackParamList = {
  Explore: undefined;
  MeditationLibrary: undefined;
  Breathwork: undefined;
  ArticlesList: undefined;
  Tests: undefined;
  SmartJournal: undefined;
  Notepad: undefined;
  Affirmations: undefined;
  Quotes: undefined;
  Tips: undefined;
  Favorites: undefined;
  MeditationPlayer: { id?: string; title?: string; duration?: string; meditation?: any };
  SleepSounds: undefined;
  SoundPlayer: { id: string; name: string; icon: string };
  Family: undefined;
};

type NavigationProp = NativeStackNavigationProp<ExploreStackParamList, 'Explore'>;

// Figma-extracted assets
const assets = {
  // Header icons
  logo: require('../../../assets/icon.png'),
  search: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-search.png'),
  heart: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-heart.png'),

  // Category illustrations - matching Figma design
  meditations: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-24-component-illustrations-set.png'),
  breathing: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-13-component-illustrations-set.png'),
  articles: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-12-component-illustrations-set.png'),
  tests: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-19-component-illustrations-set.png'),
  smartJournal: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-22-component-illustrations-set.png'),
  notepad: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-28-component-illustrations-set.png'),
  affirmations: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-26-component-illustrations-set.png'),
  quotes: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-23-component-illustrations-set.png'),
  tips: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-30-component-illustrations-set.png'),

  // Meditation cards illustrations
  stressManagement: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-10-component-illustrations-set.png'),
  moodBoost: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-21-component-illustrations-set.png'),
  anxietyRelief: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-12-component-illustrations-set.png'),
};

// Category data
const categories = [
  { id: 'meditations', label: 'Meditations', illustration: assets.meditations, route: 'MeditationLibrary' },
  { id: 'breathing', label: 'Breathing', illustration: assets.breathing, route: 'Breathwork' },
  { id: 'articles', label: 'Articles', illustration: assets.articles, route: 'ArticlesList' },
  { id: 'tests', label: 'Tests', illustration: assets.tests, route: 'Tests' },
  { id: 'smartJournal', label: 'Smart Jour...', illustration: assets.smartJournal, route: 'SmartJournal' },
  { id: 'notepad', label: 'Notepad', illustration: assets.notepad, route: 'Notepad' },
  { id: 'affirmations', label: 'Affirmations', illustration: assets.affirmations, route: 'Affirmations' },
  { id: 'quotes', label: 'Quotes', illustration: assets.quotes, route: 'Quotes' },
  { id: 'tips', label: 'Tips', illustration: assets.tips, route: 'Tips' },
];

// Meditation cards data
const meditationCards = [
  {
    id: '1',
    title: 'Stress Management...',
    duration: '11 mins',
    illustration: assets.stressManagement,
  },
  {
    id: '2',
    title: 'Mood Boost Blueprint',
    duration: '9 mins',
    illustration: assets.moodBoost,
  },
  {
    id: '3',
    title: 'Anxiety Relief Meditation',
    duration: '10 mins',
    illustration: assets.anxietyRelief,
  },
];

// Sound types with their corresponding icons
type SoundIconType = 'rain' | 'dream' | 'wind' | 'fire' | 'thunder' | 'forest' | 'river' | 'melody' | 'ocean' | 'mountain' | 'soundBars' | 'planet';

interface SoundItem {
  id: string;
  name: string;
  icon: SoundIconType;
  isPremium: boolean;
}

// Sleep sounds data
const sleepSoundsData: SoundItem[] = [
  { id: '1', name: 'Heavy Rain', icon: 'rain', isPremium: false },
  { id: '2', name: 'Dream', icon: 'dream', isPremium: false },
  { id: '3', name: 'Wind', icon: 'wind', isPremium: false },
  { id: '4', name: 'Fire', icon: 'fire', isPremium: false },
  { id: '5', name: 'Thunder', icon: 'thunder', isPremium: false },
  { id: '6', name: 'Forest', icon: 'forest', isPremium: true },
  { id: '7', name: 'River', icon: 'river', isPremium: true },
  { id: '8', name: 'Melody', icon: 'melody', isPremium: false },
  { id: '9', name: 'Ocean', icon: 'ocean', isPremium: true },
  { id: '10', name: 'Mountains', icon: 'mountain', isPremium: true },
];

// Icon component mapping
const IconComponents: Record<SoundIconType, React.FC<{ size?: number; color?: string }>> = {
  rain: RainIcon,
  dream: DreamIcon,
  wind: WindIcon,
  fire: FireIcon,
  thunder: ThunderIcon,
  forest: ForestIcon,
  river: RiverIcon,
  melody: MelodyIcon,
  ocean: OceanIcon,
  mountain: MountainIcon,
  soundBars: SoundBarsIcon,
  planet: PlanetIcon,
};

export const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();

  const handleCategoryPress = (route: string) => {
    // Navigate to the category screen
    navigation.navigate(route as any);
  };

  const handleMeditationPress = (meditation: typeof meditationCards[0]) => {
    navigation.navigate('MeditationPlayer', {
      id: meditation.id,
      title: meditation.title,
      duration: meditation.duration,
    });
  };

  const handleFavoritesPress = () => {
    navigation.navigate('Favorites');
  };

  const handleSoundPress = (sound: SoundItem) => {
    navigation.navigate('SoundPlayer', {
      id: sound.id,
      name: sound.name,
      icon: sound.icon,
    });
  };

  const handleViewAllSounds = () => {
    navigation.navigate('SleepSounds');
  };

  const renderSoundIcon = (iconType: SoundIconType) => {
    const IconComponent = IconComponents[iconType];
    return <IconComponent size={28} color="#9EB567" />;
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
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={assets.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Explore
          </Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <Image
                source={assets.search}
                style={[styles.headerIcon, { tintColor: colors.text.primary }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleFavoritesPress}>
              <Image
                source={assets.heart}
                style={[styles.headerIcon, { tintColor: colors.text.primary }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Grid - 3x3 */}
        <View style={styles.categoryGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: colors.background.card }]}
              onPress={() => handleCategoryPress(category.route)}
              activeOpacity={0.7}
            >
              <Image
                source={category.illustration}
                style={styles.categoryIllustration}
                resizeMode="contain"
              />
              <Text
                style={[styles.categoryLabel, { color: colors.text.primary }]}
                numberOfLines={1}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Discover Meditations Section */}
        <View style={styles.meditationsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Discover Meditations
            </Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Text style={styles.viewAllArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Meditation Cards Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.meditationScroll}
          >
            {meditationCards.map((meditation) => (
              <TouchableOpacity
                key={meditation.id}
                style={[styles.meditationCard, { backgroundColor: colors.background.card }]}
                onPress={() => handleMeditationPress(meditation)}
                activeOpacity={0.7}
              >
                <View style={styles.meditationImageContainer}>
                  <Image
                    source={meditation.illustration}
                    style={styles.meditationIllustration}
                    resizeMode="cover"
                  />
                </View>
                <Text
                  style={[styles.meditationTitle, { color: colors.text.primary }]}
                  numberOfLines={2}
                >
                  {meditation.title}
                </Text>
                <Text style={[styles.meditationDuration, { color: colors.text.secondary }]}>
                  {meditation.duration}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sleep Sounds Section */}
        <View style={styles.sleepSoundsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Sleep Sounds
            </Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllSounds}>
              <Text style={styles.viewAllText}>View All</Text>
              <Text style={styles.viewAllArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Sleep Sounds Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.soundsScroll}
          >
            {sleepSoundsData.map((sound) => (
              <TouchableOpacity
                key={sound.id}
                style={styles.soundCard}
                onPress={() => handleSoundPress(sound)}
                activeOpacity={0.7}
              >
                {/* Icon Circle */}
                <View style={[styles.soundIconCircle, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
                  {renderSoundIcon(sound.icon)}

                  {/* Premium Badge */}
                  {sound.isPremium && (
                    <View style={styles.premiumBadge}>
                      <CrownIcon size={10} color="#FFFFFF" />
                    </View>
                  )}
                </View>

                {/* Sound Name */}
                <Text
                  style={[styles.soundName, { color: colors.text.primary }]}
                  numberOfLines={1}
                >
                  {sound.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLogo: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },

  // Category Grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 8,
  },
  categoryCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIllustration: {
    width: CARD_WIDTH - 24,
    height: 70,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Meditations Section
  meditationsSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9EB567',
  },
  viewAllArrow: {
    fontSize: 14,
    color: '#9EB567',
  },
  meditationScroll: {
    paddingRight: 20,
    gap: 12,
  },
  meditationCard: {
    width: 160,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  meditationImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  meditationIllustration: {
    width: '100%',
    height: '100%',
  },
  meditationTitle: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
  },
  meditationDuration: {
    fontSize: 12,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  // Sleep Sounds Section
  sleepSoundsSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  soundsScroll: {
    paddingRight: 20,
    gap: 16,
  },
  soundCard: {
    alignItems: 'center',
    width: 80,
  },
  soundIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ExploreScreen;
