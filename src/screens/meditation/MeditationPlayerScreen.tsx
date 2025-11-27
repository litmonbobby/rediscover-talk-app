import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Text,
  Animated,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'MeditationPlayer'>;

export const MeditationPlayerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const { meditation } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Parse duration (e.g., "10 min" -> 600 seconds)
  const totalSeconds = parseInt(meditation.duration) * 60;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? 'Pausing' : 'Playing', meditation.title);
  };

  const handleBack = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigation.goBack();
  };

  const handleOptions = () => {
    console.log('Options pressed for', meditation.title);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSeconds]);

  useEffect(() => {
    const progress = elapsed / totalSeconds;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [elapsed, totalSeconds]);

  const progressPercentage = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('StartOrPlayMeditation', isDarkMode)}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={handleOptions}
          activeOpacity={0.7}
        >
          <Text style={styles.optionsButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Meditation Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.meditationEmoji}>{meditation.emoji}</Text>
        <Text style={styles.meditationTitle}>{meditation.title}</Text>
        <Text style={styles.meditationCategory}>{meditation.category}</Text>
      </View>

      {/* Timer Display with Progress Circle */}
      <View style={styles.timerContainer}>
        <View style={styles.progressCircle}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressPercentage,
              },
            ]}
          />
        </View>
        <Text style={styles.timerText}>{formatTime(elapsed)}</Text>
        <Text style={styles.durationText}>/ {meditation.duration}</Text>
      </View>

      {/* Play/Pause Button */}
      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={handlePlayPause}
        activeOpacity={0.7}
      >
        <Text style={styles.playPauseIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    opacity: 0.15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  optionsButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  optionsButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: height * 0.10,
    marginBottom: 40,
  },
  meditationEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  meditationTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  meditationCategory: {
    fontSize: 16,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  progressCircle: {
    width: width * 0.70,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 4,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  durationText: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playPauseIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
