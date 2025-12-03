/**
 * Sleep Sounds Screen - Exact Figma Recreation
 * Matches 95-light-sleep-sounds.png design
 * Comprehensive sleep sound library with 24 ambient sounds
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
  BirdsIcon,
  CricketsIcon,
  WaterfallIcon,
  CafeIcon,
  TrainIcon,
  FanIcon,
  WavesIcon,
  HeartbeatIcon,
  LeavesIcon,
  BellIcon,
  SnowflakeIcon,
} from '../../components/icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 64) / 3; // 3 cards with gaps

type SleepStackParamList = {
  SleepSounds: undefined;
  SoundPlayer: { id: string; name: string; icon: string };
  SleepMusic: undefined;
  SleepStories: undefined;
};

type NavigationProp = NativeStackNavigationProp<SleepStackParamList, 'SleepSounds'>;

// Figma-extracted icons
const assets = {
  logo: require('../../../assets/images/conversation-logo.png'),
  search: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-search.png'),
};

// Main tabs data (Music and Stories hidden for now)
const mainTabs = [
  { id: 'sounds', label: 'Sounds' },
  // { id: 'music', label: 'Music' },      // Coming soon
  // { id: 'stories', label: 'Stories' },  // Coming soon
];

// Filter categories
const filterCategories = [
  { id: 'all', label: 'All' },
  { id: 'popular', label: 'Popular' },
  { id: 'nature', label: 'Nature' },
  { id: 'ambient', label: 'Ambient' },
  { id: 'whitenoise', label: 'White Noise' },
  { id: 'space', label: 'Space' },
];

// Sound types with their corresponding icons
type SoundIconType =
  | 'rain' | 'dream' | 'wind' | 'fire' | 'thunder' | 'forest'
  | 'river' | 'melody' | 'ocean' | 'mountain' | 'soundBars' | 'planet'
  | 'birds' | 'crickets' | 'waterfall' | 'cafe' | 'train' | 'fan'
  | 'waves' | 'heartbeat' | 'leaves' | 'bell' | 'snowflake';

interface SoundItem {
  id: string;
  name: string;
  icon: SoundIconType;
  isPremium: boolean;
  category: string;
}

// Complete sound library - 24 sounds
const soundsData: SoundItem[] = [
  // Nature Sounds
  { id: '1', name: 'Heavy Rain', icon: 'rain', isPremium: false, category: 'nature' },
  { id: '2', name: 'Gentle Wind', icon: 'wind', isPremium: false, category: 'nature' },
  { id: '3', name: 'Thunder Storm', icon: 'thunder', isPremium: false, category: 'nature' },
  { id: '4', name: 'Forest Birds', icon: 'forest', isPremium: false, category: 'nature' },
  { id: '5', name: 'Flowing River', icon: 'river', isPremium: false, category: 'nature' },
  { id: '6', name: 'Ocean Waves', icon: 'ocean', isPremium: false, category: 'nature' },
  { id: '7', name: 'Mountain Wind', icon: 'mountain', isPremium: true, category: 'nature' },
  { id: '8', name: 'Bird Song', icon: 'birds', isPremium: false, category: 'nature' },
  { id: '9', name: 'Night Crickets', icon: 'crickets', isPremium: false, category: 'nature' },
  { id: '10', name: 'Waterfall', icon: 'waterfall', isPremium: true, category: 'nature' },
  { id: '11', name: 'Gentle Waves', icon: 'waves', isPremium: false, category: 'nature' },
  { id: '12', name: 'Rustling Leaves', icon: 'leaves', isPremium: false, category: 'nature' },

  // Ambient Sounds
  { id: '13', name: 'Cozy Fireplace', icon: 'fire', isPremium: false, category: 'ambient' },
  { id: '14', name: 'Dream Ambience', icon: 'dream', isPremium: false, category: 'ambient' },
  { id: '15', name: 'Soft Melody', icon: 'melody', isPremium: false, category: 'ambient' },
  { id: '16', name: 'Cafe Sounds', icon: 'cafe', isPremium: true, category: 'ambient' },
  { id: '17', name: 'Train Journey', icon: 'train', isPremium: true, category: 'ambient' },
  { id: '18', name: 'Wind Chimes', icon: 'bell', isPremium: false, category: 'ambient' },
  { id: '19', name: 'Heartbeat', icon: 'heartbeat', isPremium: false, category: 'ambient' },
  { id: '20', name: 'Winter Snow', icon: 'snowflake', isPremium: true, category: 'ambient' },

  // White Noise
  { id: '21', name: 'White Noise', icon: 'soundBars', isPremium: false, category: 'whitenoise' },
  { id: '22', name: 'Fan Sound', icon: 'fan', isPremium: false, category: 'whitenoise' },

  // Space Sounds
  { id: '23', name: 'Cosmic Space', icon: 'planet', isPremium: true, category: 'space' },
  { id: '24', name: 'Deep Space', icon: 'planet', isPremium: true, category: 'space' },
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
  birds: BirdsIcon,
  crickets: CricketsIcon,
  waterfall: WaterfallIcon,
  cafe: CafeIcon,
  train: TrainIcon,
  fan: FanIcon,
  waves: WavesIcon,
  heartbeat: HeartbeatIcon,
  leaves: LeavesIcon,
  bell: BellIcon,
  snowflake: SnowflakeIcon,
};

export const SleepSoundsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('sounds');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSoundPress = (sound: SoundItem) => {
    navigation.navigate('SoundPlayer', {
      id: sound.id,
      name: sound.name,
      icon: sound.icon,
    });
  };

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'music') {
      navigation.navigate('SleepMusic');
    } else if (tabId === 'stories') {
      navigation.navigate('SleepStories');
    }
  };

  const renderSoundIcon = (iconType: SoundIconType) => {
    const IconComponent = IconComponents[iconType];
    return <IconComponent size={32} color="#9EB567" />;
  };

  // Filter sounds based on active filter
  const filteredSounds = activeFilter === 'all'
    ? soundsData
    : activeFilter === 'popular'
      ? soundsData.filter(s => !s.isPremium).slice(0, 12) // First 12 free sounds
      : soundsData.filter(s => s.category === activeFilter);

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
            Sleep
          </Text>
          <TouchableOpacity style={styles.headerButton}>
            <Image
              source={assets.search}
              style={[styles.headerIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Main Tabs - Sounds / Music / Stories */}
        <View style={[styles.mainTabsContainer, { backgroundColor: colors.background.secondary }]}>
          {mainTabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.mainTab,
                activeTab === tab.id && styles.mainTabActive,
              ]}
              onPress={() => handleTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.mainTabText,
                  { color: activeTab === tab.id ? '#FFFFFF' : colors.text.secondary },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filterCategories.map((category) => (
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

        {/* Sound Count */}
        <View style={styles.soundCountContainer}>
          <Text style={[styles.soundCount, { color: colors.text.secondary }]}>
            {filteredSounds.length} sounds available
          </Text>
        </View>

        {/* Sound Grid */}
        <View style={styles.soundGrid}>
          {filteredSounds.map((sound) => (
            <TouchableOpacity
              key={sound.id}
              style={styles.soundCard}
              onPress={() => handleSoundPress(sound)}
              activeOpacity={0.7}
            >
              {/* Icon Circle */}
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
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
  headerButton: {
    padding: 4,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },

  // Main Tabs
  mainTabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 4,
  },
  mainTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  mainTabActive: {
    backgroundColor: '#9EB567',
  },
  mainTabText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Filter Pills
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
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

  // Sound Count
  soundCountContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  soundCount: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Sound Grid
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  soundCard: {
    width: CARD_WIDTH,
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SleepSoundsScreen;
