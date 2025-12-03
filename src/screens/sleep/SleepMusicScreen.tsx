/**
 * Sleep Music Screen - Matches Figma design
 * Music library for sleep and relaxation
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
const CARD_WIDTH = width - 40;

type SleepStackParamList = {
  SleepSounds: undefined;
  SoundPlayer: { id: string; name: string; icon: string };
  SleepMusic: undefined;
  SleepStories: undefined;
  MusicPlayer: { id: string; title: string; artist: string; duration: string; albumArt?: string };
};

type NavigationProp = NativeStackNavigationProp<SleepStackParamList, 'SleepMusic'>;

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
  <Svg width={20} height={20} viewBox="0 0 24 24" fill={color}>
    <Path d="M8 5v14l11-7z" />
  </Svg>
);

// Music categories
const musicCategories = [
  { id: 'all', label: 'All' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'relax', label: 'Relaxation' },
  { id: 'piano', label: 'Piano' },
  { id: 'ambient', label: 'Ambient' },
  { id: 'classical', label: 'Classical' },
];

// Music tracks data
interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: string;
  isPremium: boolean;
  backgroundColor: string;
}

const musicTracks: MusicTrack[] = [
  {
    id: '1',
    title: 'Moonlit Dreams',
    artist: 'Sleep Orchestra',
    duration: '45:00',
    category: 'sleep',
    isPremium: false,
    backgroundColor: '#4A6FA5',
  },
  {
    id: '2',
    title: 'Peaceful Piano',
    artist: 'Calm Melodies',
    duration: '32:15',
    category: 'piano',
    isPremium: false,
    backgroundColor: '#9EB567',
  },
  {
    id: '3',
    title: 'Starry Night',
    artist: 'Ambient Dreams',
    duration: '60:00',
    category: 'ambient',
    isPremium: true,
    backgroundColor: '#2D1B4E',
  },
  {
    id: '4',
    title: 'Deep Relaxation',
    artist: 'Tranquil Sounds',
    duration: '40:30',
    category: 'relax',
    isPremium: false,
    backgroundColor: '#20B2AA',
  },
  {
    id: '5',
    title: 'Classical Lullabies',
    artist: 'Sleep Symphony',
    duration: '55:00',
    category: 'classical',
    isPremium: true,
    backgroundColor: '#7B68EE',
  },
  {
    id: '6',
    title: 'Ocean Melodies',
    artist: 'Nature Sounds',
    duration: '48:00',
    category: 'sleep',
    isPremium: false,
    backgroundColor: '#1E90FF',
  },
];

export const SleepMusicScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTracks = activeFilter === 'all'
    ? musicTracks
    : musicTracks.filter(track => track.category === activeFilter);

  const handleTrackPress = (track: MusicTrack) => {
    // Navigate to SoundPlayer with music track data
    navigation.navigate('SoundPlayer', {
      id: track.id,
      name: track.title,
      icon: 'melody',
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
          Sleep Music
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
          {musicCategories.map((category) => (
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

        {/* Music Tracks List */}
        <View style={styles.tracksList}>
          {filteredTracks.map((track) => (
            <TouchableOpacity
              key={track.id}
              style={[styles.trackCard, { backgroundColor: colors.background.card }]}
              onPress={() => handleTrackPress(track)}
              activeOpacity={0.7}
            >
              {/* Album Art Placeholder */}
              <View style={[styles.albumArt, { backgroundColor: track.backgroundColor }]}>
                <Text style={styles.albumEmoji}>
                  {track.category === 'piano' ? '🎹' :
                   track.category === 'ambient' ? '✨' :
                   track.category === 'classical' ? '🎻' : '🎵'}
                </Text>
                {track.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumText}>PRO</Text>
                  </View>
                )}
              </View>

              {/* Track Info */}
              <View style={styles.trackInfo}>
                <Text
                  style={[styles.trackTitle, { color: colors.text.primary }]}
                  numberOfLines={1}
                >
                  {track.title}
                </Text>
                <Text
                  style={[styles.trackArtist, { color: colors.text.secondary }]}
                  numberOfLines={1}
                >
                  {track.artist}
                </Text>
                <Text style={[styles.trackDuration, { color: colors.text.tertiary }]}>
                  {track.duration}
                </Text>
              </View>

              {/* Play Button */}
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => handleTrackPress(track)}
              >
                <PlayIcon color="#FFFFFF" />
              </TouchableOpacity>
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
  tracksList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  albumArt: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  albumEmoji: {
    fontSize: 28,
  },
  premiumBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#F5A623',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 14,
    marginBottom: 2,
  },
  trackDuration: {
    fontSize: 12,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#9EB567',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SleepMusicScreen;
