/**
 * Meditation Player Screen - Exact Figma Recreation
 * Proper React Native components with Figma-extracted assets
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
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path, Circle, G, Text as SvgText } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/useTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type MeditationStackParamList = {
  MeditationLibrary: undefined;
  MeditationPlayer: {
    meditationId?: number;
    title?: string;
    duration?: number;
    category?: string;
  };
  SleepSounds: undefined;
};

type MeditationPlayerRouteProp = RouteProp<MeditationStackParamList, 'MeditationPlayer'>;
type NavigationProp = NativeStackNavigationProp<MeditationStackParamList, 'MeditationPlayer'>;

// Figma-extracted assets
const assets = {
  // Icons
  closeSquare: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-close-square.png'),
  heart: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-heart.png'),
  heartFilled: require('../../figma-extracted/assets/components/icons/iconly-curved-bold-heart.png'),
  setting: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-setting.png'),
  play: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-play.png'),

  // Meditation visualization illustration
  meditationIllustration: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-14-component-illustrations-set.png'),
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

// Backward 15s Icon
const BackwardIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#FFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 19.5L4 12l7-7.5M4 12h16"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <SvgText x="12" y="18" fill={color} fontSize="8" textAnchor="middle">
      15
    </SvgText>
  </Svg>
);

// Forward 15s Icon
const ForwardIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#FFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 4.5L20 12l-7 7.5M20 12H4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <SvgText x="12" y="18" fill={color} fontSize="8" textAnchor="middle">
      15
    </SvgText>
  </Svg>
);

// Pause Icon
const PauseIcon: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#1E1E3F' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </Svg>
);

// Format time helper
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const MeditationPlayerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<MeditationPlayerRouteProp>();
  const { colors, isDarkMode } = useTheme();

  // Route params with defaults
  const meditationTitle = route.params?.title || 'Morning Meditation';
  const meditationDuration = route.params?.duration || 10; // minutes
  const meditationCategory = route.params?.category || 'Mindfulness';

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalSeconds = meditationDuration * 60;

  // Animation for visualization
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Timer effect when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalSeconds) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, totalSeconds));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalSeconds]);

  // Pulse animation when playing
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPlaying, pulseAnim]);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSettings = () => {
    console.log('Settings pressed');
  };

  const handleRewind = () => {
    setCurrentTime(Math.max(0, currentTime - 15));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleForward = () => {
    setCurrentTime(Math.min(totalSeconds, currentTime + 15));
  };

  const handleEditSounds = () => {
    console.log('Edit sounds pressed');
  };

  const progress = currentTime / totalSeconds;

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
            <Animated.View
              style={[
                styles.visualizationCircle,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <LinearGradient
                colors={['rgba(158, 181, 103, 0.3)', 'rgba(158, 181, 103, 0.1)']}
                style={styles.visualizationGradient}
              >
                <Image
                  source={assets.meditationIllustration}
                  style={styles.visualizationImage}
                  resizeMode="contain"
                />
              </LinearGradient>
            </Animated.View>

            {/* Timer Display */}
            <View style={styles.timerContainer}>
              <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
              <Text style={styles.totalTime}>/ {formatTime(totalSeconds)}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.progressTimes}>
              <Text style={styles.progressTimeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.progressTimeText}>{formatTime(totalSeconds)}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.skipButton} onPress={handleRewind}>
              <View style={styles.skipButtonInner}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12.5 8V4L6 10l6.5 6v-4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H5c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8z"
                    fill="#FFFFFF"
                  />
                </Svg>
                <Text style={styles.skipText}>15</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
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

            <TouchableOpacity style={styles.skipButton} onPress={handleForward}>
              <View style={styles.skipButtonInner}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M11.5 8V4L18 10l-6.5 6v-4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h1.5c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8z"
                    fill="#FFFFFF"
                  />
                </Svg>
                <Text style={styles.skipText}>15</Text>
              </View>
            </TouchableOpacity>
          </View>

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
    justifyContent: 'space-between',
  },

  // Title Section
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Visualization
  visualizationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 20,
  },
  visualizationCircle: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    borderRadius: SCREEN_WIDTH * 0.35,
    overflow: 'hidden',
  },
  visualizationGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SCREEN_WIDTH * 0.35,
    borderWidth: 2,
    borderColor: 'rgba(158, 181, 103, 0.4)',
  },
  visualizationImage: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 24,
  },
  currentTime: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  totalTime: {
    fontSize: 20,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 4,
  },

  // Progress Bar
  progressContainer: {
    marginBottom: 32,
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
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 32,
  },
  skipButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: -4,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9EB567',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9EB567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  playIcon: {
    width: 32,
    height: 32,
    tintColor: '#1E1E3F',
    marginLeft: 4, // Offset for visual balance
  },

  // Edit Sounds Button
  editSoundsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  editSoundsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default MeditationPlayerScreen;
