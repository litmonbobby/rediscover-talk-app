/**
 * Sound Player Screen - Matches Figma design
 * Full-screen ambient sound player with expo-av audio playback
 * Supports both light and dark themes
 * Features: Play/Pause, Loop, Timer, Volume, Sound Mixer
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type SleepStackParamList = {
  SleepSounds: undefined;
  SoundPlayer: {
    sound?: Sound;
    id?: string;
    name?: string;
    icon?: string;
  };
  SleepMusic: undefined;
  SleepStories: undefined;
};

interface Sound {
  id: number | string;
  title: string;
  description: string;
  duration: string;
  category: string;
  icon: string;
  backgroundColor: string;
}

// Local sound assets - High quality sounds that match descriptions
const localSoundAssets: Record<string, any> = {
  fire: require('../../../assets/sounds/fireplace.mp3'), // Cozy fireplace crackling
  birds: require('../../../assets/sounds/birds.mp3'), // Birds chirping
  crickets: require('../../../assets/sounds/crickets.mp3'), // Night crickets
  waterfall: require('../../../assets/sounds/waterfall.mp3'), // Waterfall in jungle
  cafe: require('../../../assets/sounds/cafe.mp3'), // Coffee shop ambience
  train: require('../../../assets/sounds/train.mp3'), // Inside old train
  fan: require('../../../assets/sounds/fan.mp3'), // Kitchen fan
  soundBars: require('../../../assets/sounds/white-noise.mp3'), // White noise
  wind: require('../../../assets/sounds/winter-storm.mp3'), // Howling winter storm
  mountain: require('../../../assets/sounds/winter-storm.mp3'), // Mountain wind
  snowflake: require('../../../assets/sounds/winter-storm.mp3'), // Winter wind
  planet: require('../../../assets/sounds/deep-space.mp3'), // Deep space ambient
  dream: require('../../../assets/sounds/humming.mp3'), // Humming ambient sound
  forest: require('../../../assets/sounds/birds.mp3'), // Forest with birds
  river: require('../../../assets/sounds/waterfall.mp3'), // River/water sounds
  leaves: require('../../../assets/sounds/birds.mp3'), // Forest leaves with birds
};

// Remote sound URLs for sounds we don't have locally
const remoteSoundUrls: Record<string, string> = {
  rain: 'https://assets.mixkit.co/active_storage/sfx/2515/2515.wav', // Rain on window
  thunder: 'https://assets.mixkit.co/active_storage/sfx/1282/1282-preview.mp3', // Thunder
  ocean: 'https://assets.mixkit.co/active_storage/sfx/1189/1189-preview.mp3', // Ocean waves
  waves: 'https://assets.mixkit.co/active_storage/sfx/1189/1189-preview.mp3', // Gentle waves
  melody: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Relaxing melody
  heartbeat: 'https://assets.mixkit.co/active_storage/sfx/2463/2463-preview.mp3', // Heartbeat
  bell: 'https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3', // Bell/chime
};

// Helper to check if sound is local
const isLocalSound = (iconType: string): boolean => {
  return iconType in localSoundAssets;
};

// Get sound source (local asset or remote URL)
const getSoundSource = (iconType: string): any => {
  if (isLocalSound(iconType)) {
    return localSoundAssets[iconType];
  }
  return { uri: remoteSoundUrls[iconType] || remoteSoundUrls.rain };
};

// Sound type to metadata mapping
const soundMetadata: Record<string, { emoji: string; backgroundColor: string; description: string; category: string }> = {
  rain: { emoji: '🌧️', backgroundColor: '#4A6FA5', description: 'Calming rain sounds to help you sleep', category: 'Nature' },
  dream: { emoji: '💭', backgroundColor: '#7B68EE', description: 'Dreamy ambient sounds for deep relaxation', category: 'Ambient' },
  wind: { emoji: '🌬️', backgroundColor: '#87CEEB', description: 'Gentle wind sounds for peaceful rest', category: 'Nature' },
  fire: { emoji: '🔥', backgroundColor: '#E25822', description: 'Cozy fireplace crackling sounds', category: 'Ambient' },
  thunder: { emoji: '⛈️', backgroundColor: '#4A5568', description: 'Distant thunder for stormy night ambience', category: 'Nature' },
  forest: { emoji: '🌲', backgroundColor: '#228B22', description: 'Peaceful forest sounds with birds and rustling leaves', category: 'Nature' },
  river: { emoji: '🏞️', backgroundColor: '#20B2AA', description: 'Flowing river sounds for tranquility', category: 'Nature' },
  melody: { emoji: '🎵', backgroundColor: '#9EB567', description: 'Soft melodic tones for relaxation', category: 'Music' },
  ocean: { emoji: '🌊', backgroundColor: '#1E90FF', description: 'Ocean waves gently crashing on the shore', category: 'Nature' },
  mountain: { emoji: '🏔️', backgroundColor: '#708090', description: 'Mountain wind and distant echoes', category: 'Nature' },
  soundBars: { emoji: '📊', backgroundColor: '#9370DB', description: 'White noise for focus and sleep', category: 'Ambient' },
  planet: { emoji: '🪐', backgroundColor: '#2D1B4E', description: 'Cosmic ambient sounds from space', category: 'Space' },
  birds: { emoji: '🐦', backgroundColor: '#87CEEB', description: 'Morning birds chirping in nature', category: 'Nature' },
  crickets: { emoji: '🦗', backgroundColor: '#2D3748', description: 'Peaceful crickets at night', category: 'Nature' },
  waterfall: { emoji: '💧', backgroundColor: '#00CED1', description: 'Powerful waterfall cascading', category: 'Nature' },
  cafe: { emoji: '☕', backgroundColor: '#8B4513', description: 'Cozy cafe ambience with soft chatter', category: 'Ambient' },
  train: { emoji: '🚂', backgroundColor: '#4A5568', description: 'Rhythmic train journey sounds', category: 'Travel' },
  fan: { emoji: '🌀', backgroundColor: '#718096', description: 'Steady fan noise for sleep', category: 'White Noise' },
  waves: { emoji: '🌊', backgroundColor: '#0077B6', description: 'Gentle waves lapping the shore', category: 'Nature' },
  heartbeat: { emoji: '💓', backgroundColor: '#E53E3E', description: 'Calming heartbeat rhythm', category: 'Body' },
};

type SoundPlayerRouteProp = RouteProp<SleepStackParamList, 'SoundPlayer'>;

// Close Icon
const CloseIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Play Icon
const PlayIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill={color}>
    <Path d="M8 5v14l11-7z" />
  </Svg>
);

// Pause Icon
const PauseIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill={color}>
    <Path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </Svg>
);

// Timer Icon
const TimerIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// Volume Icon
const VolumeIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 5L6 9H2v6h4l5 4V5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Loop Icon
const LoopIcon = ({ color = '#FFFFFF', active = false }: { color?: string; active?: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 1l4 4-4 4"
      stroke={active ? '#9EB567' : color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 11V9a4 4 0 0 1 4-4h14"
      stroke={active ? '#9EB567' : color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 23l-4-4 4-4"
      stroke={active ? '#9EB567' : color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 13v2a4 4 0 0 1-4 4H3"
      stroke={active ? '#9EB567' : color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Mix Icon - Sound layering/mixing
const MixIcon = ({ color = '#FFFFFF', active = false }: { color?: string; active?: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Three horizontal sliders */}
    <Path
      d="M4 6h16"
      stroke={active ? '#9EB567' : color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle
      cx="8"
      cy="6"
      r="2"
      fill={active ? '#9EB567' : color}
    />
    <Path
      d="M4 12h16"
      stroke={active ? '#9EB567' : color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle
      cx="14"
      cy="12"
      r="2"
      fill={active ? '#9EB567' : color}
    />
    <Path
      d="M4 18h16"
      stroke={active ? '#9EB567' : color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle
      cx="10"
      cy="18"
      r="2"
      fill={active ? '#9EB567' : color}
    />
  </Svg>
);

// Check Icon for selection
const CheckIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Timer options
const timerOptions = [
  { label: 'Off', value: 0 },
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: '8 hours', value: 480 },
];

// Available sounds for mixing
const mixableSounds = [
  { id: 'rain', name: 'Rain', emoji: '🌧️' },
  { id: 'thunder', name: 'Thunder', emoji: '⛈️' },
  { id: 'wind', name: 'Wind', emoji: '🌬️' },
  { id: 'ocean', name: 'Ocean', emoji: '🌊' },
  { id: 'forest', name: 'Forest', emoji: '🌲' },
  { id: 'fire', name: 'Fire', emoji: '🔥' },
  { id: 'birds', name: 'Birds', emoji: '🐦' },
  { id: 'crickets', name: 'Crickets', emoji: '🦗' },
  { id: 'river', name: 'River', emoji: '🏞️' },
  { id: 'waterfall', name: 'Waterfall', emoji: '💧' },
  { id: 'cafe', name: 'Cafe', emoji: '☕' },
  { id: 'fan', name: 'Fan', emoji: '🌀' },
];

// Interface for mixed sound with volume
interface MixedSound {
  id: string;
  name: string;
  emoji: string;
  volume: number;
  soundObject: Audio.Sound | null;
}

export const SoundPlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SoundPlayerRouteProp>();
  const { colors, isDarkMode } = useTheme();
  const params = route.params || {};

  // Build sound object from either full sound or individual params
  const sound: Sound = params.sound || (() => {
    const iconType = params.icon || 'rain';
    const metadata = soundMetadata[iconType] || soundMetadata.rain;
    return {
      id: params.id || '1',
      title: params.name || 'Ambient Sound',
      description: metadata.description,
      duration: 'Continuous',
      category: metadata.category,
      icon: metadata.emoji,
      backgroundColor: metadata.backgroundColor,
    };
  })();

  const iconType = params.icon || 'rain';

  // Audio state
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [selectedTimer, setSelectedTimer] = useState(0);
  const [showTimerOptions, setShowTimerOptions] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Mixer state
  const [showMixerModal, setShowMixerModal] = useState(false);
  const [mixedSounds, setMixedSounds] = useState<MixedSound[]>([]);
  const [isMixActive, setIsMixActive] = useState(false);

  // Animation for pulsing effect
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.5)).current;

  // Load audio on mount
  useEffect(() => {
    loadAudio();

    return () => {
      // Cleanup audio on unmount
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  const loadAudio = async (autoPlay: boolean = false) => {
    try {
      setIsLoading(true);
      setLoadError(null);

      console.log('🔊 Loading audio for:', iconType, 'autoPlay:', autoPlay);

      // Configure audio mode for background playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      console.log('✅ Audio mode configured');

      const soundSource = getSoundSource(iconType);
      const isLocal = isLocalSound(iconType);
      console.log('🎵 Sound source:', isLocal ? 'LOCAL' : 'REMOTE', iconType);

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        soundSource,
        {
          shouldPlay: autoPlay, // Auto-play if user triggered play
          volume: volume,
          isLooping: isLooping,
          progressUpdateIntervalMillis: 500,
        },
        onPlaybackStatusUpdate
      );

      console.log('✅ Sound loaded successfully:', status);
      setSoundObject(newSound);
      setIsLoading(false);

      if (autoPlay) {
        console.log('▶️ Auto-playing after load');
        setIsPlaying(true);
      }
    } catch (error: any) {
      console.error('❌ Error loading audio:', error);
      console.error('Error details:', error.message);
      setLoadError(`Unable to load sound: ${error.message || 'Unknown error'}`);
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish && !status.isLooping) {
        console.log('🎵 Playback finished');
      }
    } else if ('error' in status && status.error) {
      console.error('❌ Playback error:', status.error);
      setLoadError(`Playback error: ${status.error}`);
    }
  };

  // Play/Pause toggle
  const togglePlayPause = async () => {
    console.log('▶️ Toggle play/pause, current state:', isPlaying, 'soundObject:', !!soundObject);

    if (!soundObject) {
      console.log('🔄 No sound object, loading audio with autoPlay...');
      await loadAudio(true); // Load and auto-play
      return;
    }

    try {
      if (isPlaying) {
        console.log('⏸️ Pausing...');
        await soundObject.pauseAsync();
      } else {
        console.log('▶️ Playing...');
        const status = await soundObject.playAsync();
        console.log('▶️ Play status:', status);
      }
    } catch (error: any) {
      console.error('❌ Error toggling playback:', error);
      setLoadError(`Playback error: ${error.message || 'Unknown error'}`);
    }
  };

  // Volume change handler
  const handleVolumeChange = async (newVolume: number) => {
    setVolume(newVolume);
    if (soundObject) {
      try {
        await soundObject.setVolumeAsync(newVolume);
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  };

  // Loop toggle handler
  const toggleLoop = async () => {
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    if (soundObject) {
      try {
        await soundObject.setIsLoopingAsync(newLoopState);
      } catch (error) {
        console.error('Error setting loop:', error);
      }
    }
  };

  // Mixer functions
  const toggleMixedSound = async (soundId: string) => {
    const existingIndex = mixedSounds.findIndex(s => s.id === soundId);

    if (existingIndex >= 0) {
      // Remove sound from mix
      const soundToRemove = mixedSounds[existingIndex];
      if (soundToRemove.soundObject) {
        await soundToRemove.soundObject.stopAsync();
        await soundToRemove.soundObject.unloadAsync();
      }
      setMixedSounds(prev => prev.filter(s => s.id !== soundId));
    } else {
      // Add sound to mix (max 4 sounds)
      if (mixedSounds.length >= 4) {
        Alert.alert('Mix Limit', 'You can mix up to 4 sounds at once. Remove a sound to add another.');
        return;
      }

      const soundData = mixableSounds.find(s => s.id === soundId);
      if (!soundData) return;

      try {
        const soundSource = getSoundSource(soundId);

        const { sound: newSound } = await Audio.Sound.createAsync(
          soundSource,
          { shouldPlay: isMixActive && isPlaying, volume: 0.5, isLooping: true }
        );

        setMixedSounds(prev => [
          ...prev,
          {
            id: soundId,
            name: soundData.name,
            emoji: soundData.emoji,
            volume: 0.5,
            soundObject: newSound,
          },
        ]);
      } catch (error) {
        console.error('Error loading mixed sound:', error);
        Alert.alert('Error', 'Failed to load sound for mixing.');
      }
    }
  };

  const updateMixedSoundVolume = async (soundId: string, newVolume: number) => {
    setMixedSounds(prev =>
      prev.map(s => {
        if (s.id === soundId) {
          if (s.soundObject) {
            s.soundObject.setVolumeAsync(newVolume);
          }
          return { ...s, volume: newVolume };
        }
        return s;
      })
    );
  };

  const playAllMixedSounds = async () => {
    for (const mixedSound of mixedSounds) {
      if (mixedSound.soundObject) {
        await mixedSound.soundObject.playAsync();
      }
    }
  };

  const pauseAllMixedSounds = async () => {
    for (const mixedSound of mixedSounds) {
      if (mixedSound.soundObject) {
        await mixedSound.soundObject.pauseAsync();
      }
    }
  };

  const toggleMixActive = async () => {
    if (isMixActive) {
      // Deactivate mix - pause all mixed sounds
      await pauseAllMixedSounds();
    } else {
      // Activate mix - play all mixed sounds if main sound is playing
      if (isPlaying) {
        await playAllMixedSounds();
      }
    }
    setIsMixActive(!isMixActive);
  };

  // Cleanup mixed sounds on unmount
  useEffect(() => {
    return () => {
      mixedSounds.forEach(async (mixedSound) => {
        if (mixedSound.soundObject) {
          try {
            await mixedSound.soundObject.unloadAsync();
          } catch (error) {
            console.error('Error unloading mixed sound:', error);
          }
        }
      });
    };
  }, []);

  // Sync mixed sounds playback with main sound
  useEffect(() => {
    if (isMixActive) {
      if (isPlaying) {
        playAllMixedSounds();
      } else {
        pauseAllMixedSounds();
      }
    }
  }, [isPlaying, isMixActive]);

  // Pulse animation loop
  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    if (isPlaying) {
      pulseLoop.start();
    } else {
      pulseLoop.stop();
      pulseAnim.setValue(1);
      fadeAnim.setValue(0.5);
    }

    return () => {
      pulseLoop.stop();
    };
  }, [isPlaying]);

  // Timer countdown effect
  useEffect(() => {
    if (selectedTimer > 0 && isPlaying) {
      setRemainingTime(selectedTimer * 60);
    } else if (selectedTimer === 0) {
      setRemainingTime(null);
    }
  }, [selectedTimer, isPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (remainingTime && remainingTime > 0 && isPlaying) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev && prev <= 1) {
            // Stop playback when timer ends
            if (soundObject) {
              soundObject.pauseAsync();
            }
            setIsPlaying(false);
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [remainingTime, isPlaying, soundObject]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle back navigation with cleanup
  const handleClose = async () => {
    // Stop and unload main sound
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
    }
    // Stop and unload all mixed sounds
    for (const mixedSound of mixedSounds) {
      if (mixedSound.soundObject) {
        await mixedSound.soundObject.stopAsync();
        await mixedSound.soundObject.unloadAsync();
      }
    }
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={sound.backgroundColor} />
      <View style={[styles.container, { backgroundColor: sound.backgroundColor }]}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleClose}
            >
              <CloseIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Now Playing</Text>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowTimerOptions(!showTimerOptions)}
            >
              <TimerIcon />
            </TouchableOpacity>
          </View>

          {/* Timer Options */}
          {showTimerOptions && (
            <View style={styles.timerOptions}>
              {timerOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.timerOption,
                    selectedTimer === option.value && styles.timerOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedTimer(option.value);
                    setShowTimerOptions(false);
                  }}
                >
                  <Text
                    style={[
                      styles.timerOptionText,
                      selectedTimer === option.value && styles.timerOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Visualization */}
          <View style={styles.visualizationContainer}>
            <Animated.View
              style={[
                styles.outerCircle,
                {
                  transform: [{ scale: pulseAnim }],
                  opacity: fadeAnim,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.middleCircle,
                {
                  transform: [{ scale: Animated.multiply(pulseAnim, 0.85) }],
                  opacity: Animated.add(fadeAnim, 0.1),
                },
              ]}
            />
            <View style={styles.centerCircle}>
              <BlurView intensity={40} tint="light" style={styles.centerCircleBlur}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#FFFFFF" />
                ) : (
                  <Text style={styles.soundIcon}>{sound.icon}</Text>
                )}
              </BlurView>
            </View>
          </View>

          {/* Sound Info */}
          <View style={styles.soundInfo}>
            <Text style={styles.soundTitle}>{sound.title}</Text>
            <Text style={styles.soundDescription}>{sound.description}</Text>
            {loadError && (
              <Text style={styles.errorText}>{loadError}</Text>
            )}
            {remainingTime && (
              <View style={styles.timerBadge}>
                <TimerIcon color="rgba(255,255,255,0.8)" />
                <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
              </View>
            )}
          </View>

          {/* Volume Control */}
          <View style={styles.volumeContainer}>
            <VolumeIcon color="rgba(255,255,255,0.7)" />
            <View style={styles.volumeBar}>
              <View
                style={[
                  styles.volumeFill,
                  { width: `${volume * 100}%` },
                ]}
              />
              <TouchableOpacity
                style={[styles.volumeKnob, { left: `${Math.max(0, Math.min(volume * 100 - 2, 98))}%` }]}
                activeOpacity={0.8}
              />
            </View>
            <View style={styles.volumeButtons}>
              <TouchableOpacity
                style={styles.volumeBtn}
                onPress={() => handleVolumeChange(Math.max(0, volume - 0.1))}
              >
                <Text style={styles.volumeBtnText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.volumeBtn}
                onPress={() => handleVolumeChange(Math.min(1, volume + 0.1))}
              >
                <Text style={styles.volumeBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleLoop}
            >
              <LoopIcon active={isLooping} />
              <Text style={[styles.controlLabel, isLooping && styles.controlLabelActive]}>
                Loop
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.playButton, isLoading && styles.playButtonDisabled]}
              onPress={togglePlayPause}
              disabled={isLoading}
            >
              <BlurView intensity={60} tint="light" style={styles.playButtonBlur}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setShowMixerModal(true)}
            >
              <MixIcon active={isMixActive && mixedSounds.length > 0} />
              <Text style={[styles.controlLabel, (isMixActive && mixedSounds.length > 0) && styles.controlLabelActive]}>
                Mix
              </Text>
            </TouchableOpacity>
          </View>

          {/* Category Badge */}
          <View style={styles.bottomInfo}>
            <Text style={styles.categoryBadge}>
              {sound.category.toUpperCase()} SOUNDS
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Mixer Modal */}
      <Modal
        visible={showMixerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMixerModal(false)}
      >
        <View style={styles.mixerModalOverlay}>
          <View style={styles.mixerModal}>
            {/* Glass Background */}
            <BlurView
              intensity={80}
              tint="dark"
              style={[StyleSheet.absoluteFill, styles.mixerBlurBackground]}
            />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: sound.backgroundColor, opacity: 0.6 }]} />

            {/* Modal Header */}
            <View style={styles.mixerHeader}>
              <Text style={styles.mixerTitle}>Sound Mixer</Text>
              <TouchableOpacity
                style={styles.mixerCloseButton}
                onPress={() => setShowMixerModal(false)}
              >
                <BlurView intensity={40} tint="light" style={styles.mixerCloseBlur}>
                  <CloseIcon />
                </BlurView>
              </TouchableOpacity>
            </View>

            {/* Active Mix Toggle */}
            <TouchableOpacity
              style={[
                styles.mixToggleButton,
                isMixActive && styles.mixToggleButtonActive,
              ]}
              onPress={toggleMixActive}
            >
              <Text style={styles.mixToggleText}>
                {isMixActive ? '🔊 Mix Active' : '🔇 Mix Inactive'}
              </Text>
            </TouchableOpacity>

            {/* Currently Mixed Sounds */}
            {mixedSounds.length > 0 && (
              <View style={styles.mixedSoundsSection}>
                <Text style={styles.mixerSectionTitle}>Your Mix ({mixedSounds.length}/4)</Text>
                {mixedSounds.map((mixedSound) => (
                  <View key={mixedSound.id} style={styles.mixedSoundItem}>
                    <Text style={styles.mixedSoundEmoji}>{mixedSound.emoji}</Text>
                    <Text style={styles.mixedSoundName}>{mixedSound.name}</Text>
                    <View style={styles.mixedSoundVolumeContainer}>
                      <TouchableOpacity
                        style={styles.mixVolumeBtn}
                        onPress={() => updateMixedSoundVolume(mixedSound.id, Math.max(0, mixedSound.volume - 0.1))}
                      >
                        <Text style={styles.mixVolumeBtnText}>-</Text>
                      </TouchableOpacity>
                      <View style={styles.mixVolumeBarContainer}>
                        <View
                          style={[styles.mixVolumeBar, { width: `${mixedSound.volume * 100}%` }]}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.mixVolumeBtn}
                        onPress={() => updateMixedSoundVolume(mixedSound.id, Math.min(1, mixedSound.volume + 0.1))}
                      >
                        <Text style={styles.mixVolumeBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.removeSoundButton}
                      onPress={() => toggleMixedSound(mixedSound.id)}
                    >
                      <CloseIcon color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Available Sounds Grid */}
            <Text style={styles.mixerSectionTitle}>Add Sounds</Text>
            <ScrollView style={styles.mixerSoundsScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.mixerSoundsGrid}>
                {mixableSounds.map((mixSound) => {
                  const isSelected = mixedSounds.some(s => s.id === mixSound.id);
                  const isCurrentSound = mixSound.id === iconType;
                  return (
                    <TouchableOpacity
                      key={mixSound.id}
                      style={[
                        styles.mixSoundCard,
                        isSelected && styles.mixSoundCardSelected,
                        isCurrentSound && styles.mixSoundCardCurrent,
                      ]}
                      onPress={() => !isCurrentSound && toggleMixedSound(mixSound.id)}
                      disabled={isCurrentSound}
                    >
                      <Text style={styles.mixSoundEmoji}>{mixSound.emoji}</Text>
                      <Text style={[styles.mixSoundName, isSelected && styles.mixSoundNameSelected]}>
                        {mixSound.name}
                      </Text>
                      {isSelected && (
                        <View style={styles.selectedBadge}>
                          <CheckIcon color="#FFFFFF" />
                        </View>
                      )}
                      {isCurrentSound && (
                        <Text style={styles.currentLabel}>Playing</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  timerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  timerOptionSelected: {
    backgroundColor: '#FFFFFF',
  },
  timerOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  timerOptionTextSelected: {
    color: '#000000',
  },
  visualizationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75,
    borderRadius: SCREEN_WIDTH * 0.375,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  middleCircle: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.55,
    height: SCREEN_WIDTH * 0.55,
    borderRadius: SCREEN_WIDTH * 0.275,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  centerCircle: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_WIDTH * 0.35,
    borderRadius: SCREEN_WIDTH * 0.175,
    overflow: 'hidden',
  },
  centerCircleBlur: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  soundIcon: {
    fontSize: 64,
  },
  soundInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  soundTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  soundDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  errorText: {
    color: '#FFB4B4',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  timerText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  volumeBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    position: 'relative',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  volumeKnob: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  volumeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  volumeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 32,
  },
  controlButton: {
    alignItems: 'center',
    gap: 4,
  },
  controlLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  controlLabelActive: {
    color: '#9EB567',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  playButtonBlur: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  playButtonDisabled: {
    opacity: 0.5,
  },
  bottomInfo: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  categoryBadge: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Mixer Modal Styles
  mixerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  mixerModal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  mixerBlurBackground: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  mixerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mixerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  mixerCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  mixerCloseBlur: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mixToggleButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  mixToggleButtonActive: {
    backgroundColor: '#9EB567',
  },
  mixToggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  mixedSoundsSection: {
    marginBottom: 20,
  },
  mixerSectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  mixedSoundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  mixedSoundEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  mixedSoundName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    width: 70,
  },
  mixedSoundVolumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mixVolumeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mixVolumeBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  mixVolumeBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  mixVolumeBar: {
    height: '100%',
    backgroundColor: '#9EB567',
    borderRadius: 2,
  },
  removeSoundButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  mixerSoundsScroll: {
    maxHeight: 300,
  },
  mixerSoundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 20,
  },
  mixSoundCard: {
    width: (SCREEN_WIDTH - 60) / 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  mixSoundCardSelected: {
    backgroundColor: 'rgba(158, 181, 103, 0.4)',
    borderWidth: 2,
    borderColor: '#9EB567',
  },
  mixSoundCardCurrent: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  mixSoundEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  mixSoundName: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  mixSoundNameSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectedBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9EB567',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default SoundPlayerScreen;
