/**
 * Meditation Player Screen - With Real Audio Playback
 * Uses expo-av for audio playback with Figma-inspired UI
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useTheme } from '../../theme/useTheme';
import { GlassCard } from '../../components/core/GlassCard';
import { meditationSounds } from '../../../assets/audio';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type MeditationStackParamList = {
  MeditationLibrary: undefined;
  MeditationPlayer: {
    meditationId?: number;
    title?: string;
    duration?: number;
    category?: string;
    audioKey?: string;
  };
  SleepSounds: undefined;
};

type MeditationPlayerRouteProp = RouteProp<MeditationStackParamList, 'MeditationPlayer'>;
type NavigationProp = NativeStackNavigationProp<MeditationStackParamList, 'MeditationPlayer'>;

// Figma-extracted assets
const assets = {
  heart: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-heart.png'),
  heartFilled: require('../../figma-extracted/assets/components/icons/iconly-curved-bold-heart.png'),
  setting: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-setting.png'),
  play: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-play.png'),
  meditationPerson: require('../../../assets/images/meditation-person.png'),
};

// Audio file mapping based on meditation title/key
const getAudioSource = (title: string, audioKey?: string) => {
  // Check by audioKey first
  if (audioKey && meditationSounds[audioKey as keyof typeof meditationSounds]) {
    return meditationSounds[audioKey as keyof typeof meditationSounds];
  }

  // Match by title
  const titleLower = title.toLowerCase();
  if (titleLower.includes('gratitude')) {
    return meditationSounds.gratitudeMeditation;
  }
  if (titleLower.includes('intro') || titleLower.includes('morning') || titleLower.includes('beginner')) {
    return meditationSounds.introToMeditation;
  }

  // Default to intro meditation
  return meditationSounds.introToMeditation;
};

// Close Icon SVG
const CloseIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#FFF' }) => (
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

// Pause Icon
const PauseIcon: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#1E1E3F' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </Svg>
);

// Format time helper
const formatTime = (millis: number): string => {
  if (isNaN(millis) || millis === null || millis === undefined) {
    return '00:00';
  }
  const totalSecs = Math.max(0, Math.floor(millis / 1000));
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const MeditationPlayerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<MeditationPlayerRouteProp>();

  // Route params with defaults
  const meditationTitle = route.params?.title || 'Introduction to Meditation';
  const meditationCategory = route.params?.category || 'Mindfulness';
  const audioKey = route.params?.audioKey;

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Audio ref
  const soundRef = useRef<Audio.Sound | null>(null);


  // Initialize audio
  useEffect(() => {
    const initAudio = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        // Configure audio mode
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });

        // Get the audio source
        const audioSource = getAudioSource(meditationTitle, audioKey);

        // Create and load the sound
        const { sound, status } = await Audio.Sound.createAsync(
          audioSource,
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );

        soundRef.current = sound;

        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        setLoadError('Failed to load audio');
        setIsLoading(false);
      }
    };

    initAudio();

    // Cleanup
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [meditationTitle, audioKey]);

  // Playback status update handler
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setCurrentPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        setIsPlaying(false);
        setCurrentPosition(0);
        soundRef.current?.setPositionAsync(0);
      }
    }
  };


  const handleClose = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
    }
    navigation.goBack();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Audio settings coming soon');
  };

  const handleRewind = async () => {
    if (soundRef.current) {
      const newPosition = Math.max(0, currentPosition - 15000);
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  const handlePlayPause = async () => {
    if (!soundRef.current) {
      Alert.alert('Error', 'Audio not loaded yet');
      return;
    }

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.error('Playback error:', error);
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  const handleForward = async () => {
    if (soundRef.current) {
      const newPosition = Math.min(duration, currentPosition + 15000);
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  const handleEditSounds = () => {
    Alert.alert('Edit Sounds', 'Background sounds mixing coming soon');
  };

  const progress = duration > 0 ? currentPosition / duration : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#1E1E3F', '#2D2D5F', '#1E1E3F']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handleClose}>
            <CloseIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton} onPress={handleFavorite}>
              <Image
                source={isFavorite ? assets.heartFilled : assets.heart}
                style={[styles.headerIcon, { tintColor: isFavorite ? '#FF6B6B' : '#FFFFFF' }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleSettings}>
              <Image
                source={assets.setting}
                style={[styles.headerIcon, { tintColor: '#FFFFFF' }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.category}>{meditationCategory}</Text>
            <Text style={styles.title}>{meditationTitle}</Text>
          </View>

          {/* Visualization */}
          <View style={styles.visualizationContainer}>
            <Image
              source={assets.meditationPerson}
              style={styles.visualizationImage}
              resizeMode="contain"
            />

            {/* Timer Display */}
            <View style={styles.timerContainer}>
              <Text style={styles.currentTime}>{formatTime(currentPosition)}</Text>
              <Text style={styles.totalTime}>/ {formatTime(duration)}</Text>
            </View>

            {/* Loading/Error State */}
            {isLoading && (
              <Text style={styles.loadingText}>Loading audio...</Text>
            )}
            {loadError && (
              <Text style={styles.errorText}>{loadError}</Text>
            )}
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.progressTimes}>
              <Text style={styles.progressTimeText}>{formatTime(currentPosition)}</Text>
              <Text style={styles.progressTimeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Controls */}
          <GlassCard variant="clear" style={styles.controlsCard} padding={20} borderRadius={32}>
            <View style={styles.controlsRow}>
              {/* Rewind Button */}
              <TouchableOpacity style={styles.skipButton} onPress={handleRewind}>
                <View style={styles.skipButtonInner}>
                  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12.5 8V4L6 10l6.5 6v-4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H5c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8z"
                      fill="#FFFFFF"
                    />
                  </Svg>
                  <Text style={styles.skipText}>15</Text>
                </View>
              </TouchableOpacity>

              {/* Play/Pause Button */}
              <TouchableOpacity
                style={[styles.playPauseButton, isLoading && styles.playPauseDisabled]}
                onPress={handlePlayPause}
                disabled={isLoading}
              >
                {isPlaying ? (
                  <PauseIcon size={32} color="#1E1E3F" />
                ) : (
                  <Image
                    source={assets.play}
                    style={styles.playIcon}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>

              {/* Forward Button */}
              <TouchableOpacity style={styles.skipButton} onPress={handleForward}>
                <View style={styles.skipButtonInner}>
                  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M11.5 8V4L18 10l-6.5 6v-4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h1.5c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8z"
                      fill="#FFFFFF"
                    />
                  </Svg>
                  <Text style={styles.skipText}>15</Text>
                </View>
              </TouchableOpacity>
            </View>
          </GlassCard>

          {/* Edit Sounds Button */}
          <TouchableOpacity style={styles.editSoundsButton} onPress={handleEditSounds}>
            <Text style={styles.editSoundsText}>Edit Sounds</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E3F',
  },
  safeArea: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  // Title Section
  titleSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Visualization
  visualizationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 16,
  },
  visualizationImage: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 20,
  },
  currentTime: {
    fontSize: 44,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  totalTime: {
    fontSize: 18,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 4,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  errorText: {
    marginTop: 12,
    fontSize: 14,
    color: '#FF6B6B',
  },

  // Progress Bar
  progressContainer: {
    marginBottom: 24,
  },
  progressBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9EB567',
    borderRadius: 2,
  },
  progressTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressTimeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },

  // Controls
  controlsCard: {
    marginBottom: 16,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  skipButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: -2,
  },
  playPauseButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#9EB567',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9EB567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginHorizontal: 20,
  },
  playPauseDisabled: {
    opacity: 0.6,
  },
  playIcon: {
    width: 28,
    height: 28,
    tintColor: '#1E1E3F',
    marginLeft: 3,
  },

  // Edit Sounds Button
  editSoundsButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  editSoundsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default MeditationPlayerScreen;
