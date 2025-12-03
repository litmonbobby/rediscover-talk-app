/**
 * Sound Player Screen - Matches Figma design
 * Full-screen ambient sound player
 * Supports both light and dark themes
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type SleepStackParamList = {
  SleepSounds: undefined;
  SoundPlayer: {
    // Support both full sound object and individual params
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

// Mix Icon
const MixIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"
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

export const SoundPlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SoundPlayerRouteProp>();
  const { colors, typography, isDarkMode } = useTheme();
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

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [selectedTimer, setSelectedTimer] = useState(0);
  const [showTimerOptions, setShowTimerOptions] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  // Animation for pulsing effect
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Pulse animation loop
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
            setIsPlaying(false);
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [remainingTime, isPlaying]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
              onPress={() => navigation.goBack()}
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
              <Text style={styles.soundIcon}>{sound.icon}</Text>
            </View>
          </View>

          {/* Sound Info */}
          <View style={styles.soundInfo}>
            <Text style={styles.soundTitle}>{sound.title}</Text>
            <Text style={styles.soundDescription}>{sound.description}</Text>
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
                style={[styles.volumeKnob, { left: `${volume * 100 - 2}%` }]}
                activeOpacity={0.8}
              />
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton}>
              <MixIcon />
              <Text style={styles.controlLabel}>Mix</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setShowTimerOptions(true)}
            >
              <TimerIcon />
              <Text style={styles.controlLabel}>Timer</Text>
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
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
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default SoundPlayerScreen;
