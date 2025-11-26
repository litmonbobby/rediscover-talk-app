import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  Animated,
  Slider,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'SleepPlayer'>;

export const SleepPlayerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { sound, category } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLooping, setIsLooping] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Parse duration (e.g., "60 min" -> 3600 seconds)
  const totalSeconds = parseInt(sound.duration) * 60;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigation.goBack();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? 'Pausing' : 'Playing', sound.title);
  };

  const handleLoop = () => {
    setIsLooping(!isLooping);
    console.log('Loop toggled:', !isLooping);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    console.log('Volume changed to:', value);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= totalSeconds) {
            if (isLooping) {
              return 0; // Restart from beginning when looping
            } else {
              setIsPlaying(false);
              if (timerRef.current) clearInterval(timerRef.current);
              return totalSeconds;
            }
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
  }, [isPlaying, totalSeconds, isLooping]);

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
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/109-light-play-sleep-music-or-stories.png')}
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
        <View style={styles.headerInfo}>
          <Text style={styles.soundTitle}>{sound.title}</Text>
          <Text style={styles.soundCategory}>{category}</Text>
        </View>
      </View>

      {/* Timer Display with Progress Bar */}
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
        <Text style={styles.durationText}>/ {sound.duration}</Text>
      </View>

      {/* Play/Pause Button */}
      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={handlePlayPause}
        activeOpacity={0.7}
      >
        <Text style={styles.playPauseIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
      </TouchableOpacity>

      {/* Volume Control */}
      <View style={styles.volumeContainer}>
        <Text style={styles.volumeLabel}>🔊 Volume</Text>
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor={colors.primary.DEFAULT}
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor={colors.primary.DEFAULT}
        />
        <Text style={styles.volumeValue}>{Math.round(volume * 100)}%</Text>
      </View>

      {/* Loop Toggle */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[
            styles.loopButton,
            isLooping && styles.loopButtonActive,
          ]}
          onPress={handleLoop}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.loopIcon,
            isLooping && styles.loopIconActive,
          ]}>🔁</Text>
          <Text style={[
            styles.loopText,
            isLooping && styles.loopTextActive,
          ]}>Loop</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
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
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  soundTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  soundCategory: {
    fontSize: 16,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: height * 0.10,
    marginBottom: 40,
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
    marginBottom: 40,
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
  volumeContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  volumeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  volumeSlider: {
    width: width * 0.70,
    height: 40,
  },
  volumeValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  controlsContainer: {
    alignItems: 'center',
  },
  loopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
  },
  loopButtonActive: {
    backgroundColor: colors.primary.DEFAULT + '20',
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  loopIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  loopIconActive: {
    // Active state for icon
  },
  loopText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  loopTextActive: {
    color: colors.primary.DEFAULT,
    fontWeight: '700',
  },
});
