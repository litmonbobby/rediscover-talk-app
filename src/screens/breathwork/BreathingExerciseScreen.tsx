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
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'BreathingExercise'>;

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'hold2';

interface BreathingPattern {
  inhale: number;
  hold: number;
  exhale: number;
  hold2?: number;
  cycles: number;
}

const BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  '4-7-8 Breathing': { inhale: 4, hold: 7, exhale: 8, cycles: 4 },
  'Box Breathing': { inhale: 4, hold: 4, exhale: 4, hold2: 4, cycles: 4 },
  'Calm Breathing': { inhale: 4, hold: 0, exhale: 6, cycles: 5 },
};

export const BreathingExerciseScreen: React.FC<Props> = ({ route, navigation }) => {
  const { breathing } = route.params || { breathing: {
    title: '4-7-8 Breathing',
    duration: '19 sec',
    category: 'Sleep',
    emoji: '😴',
  }};

  const pattern = BREATHING_PATTERNS[breathing.title] || BREATHING_PATTERNS['4-7-8 Breathing'];

  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('inhale');
  const [countdown, setCountdown] = useState(pattern.inhale);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const getNextPhase = (phase: BreathPhase): BreathPhase => {
    if (phase === 'inhale') return pattern.hold > 0 ? 'hold' : 'exhale';
    if (phase === 'hold') return 'exhale';
    if (phase === 'exhale') return pattern.hold2 ? 'hold2' : 'inhale';
    return 'inhale'; // hold2 → inhale
  };

  const getPhaseDuration = (phase: BreathPhase): number => {
    if (phase === 'inhale') return pattern.inhale;
    if (phase === 'hold') return pattern.hold;
    if (phase === 'exhale') return pattern.exhale;
    return pattern.hold2 || 0;
  };

  const getPhaseText = (phase: BreathPhase): string => {
    if (phase === 'inhale') return 'Breathe In';
    if (phase === 'hold' || phase === 'hold2') return 'Hold';
    return 'Breathe Out';
  };

  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    // Animate breathing circle
    const targetScale = currentPhase === 'inhale' ? 1.3 : currentPhase === 'exhale' ? 0.7 : 1;
    Animated.timing(scaleAnim, {
      toValue: targetScale,
      duration: getPhaseDuration(currentPhase) * 1000,
      useNativeDriver: true,
    }).start();

    // Countdown timer
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const nextPhase = getNextPhase(currentPhase);
          setCurrentPhase(nextPhase);

          // Check if cycle completed
          if (nextPhase === 'inhale') {
            if (currentCycle >= pattern.cycles) {
              setIsCompleted(true);
              return 0;
            }
            setCurrentCycle((c) => c + 1);
          }

          return getPhaseDuration(nextPhase);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentPhase, isPlaying, isCompleted, currentCycle]);

  const handleBack = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigation.goBack();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleComplete = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigation.navigate('Home');
  };

  const getScreenImage = () => {
    if (isCompleted) {
      return require('../../figma-extracted/assets/screens/light-theme/67-light-breathing-completed.png');
    }

    switch (currentPhase) {
      case 'hold':
        return require('../../figma-extracted/assets/screens/light-theme/65-light-start-or-play-breathing-hold.png');
      case 'exhale':
        return require('../../figma-extracted/assets/screens/light-theme/66-light-start-or-play-breathing-exhale.png');
      default:
        return require('../../figma-extracted/assets/screens/light-theme/64-light-start-or-play-breathing-inhale.png');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={getScreenImage()}
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
      </View>

      {!isCompleted && (
        <>
          {/* Breathing Circle */}
          <View style={styles.centerContainer}>
            <Animated.View
              style={[
                styles.breathingCircle,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Text style={styles.countdownText}>{countdown}</Text>
            </Animated.View>

            {/* Phase Instruction */}
            <Text style={styles.phaseText}>{getPhaseText(currentPhase)}</Text>

            {/* Cycle Progress */}
            <Text style={styles.cycleText}>
              Cycle {currentCycle} of {pattern.cycles}
            </Text>
          </View>

          {/* Pause/Play Button */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handlePlayPause}
              activeOpacity={0.7}
            >
              <Text style={styles.playPauseIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {isCompleted && (
        <>
          {/* Completion Message */}
          <View style={styles.completionContainer}>
            <Text style={styles.completionEmoji}>✨</Text>
            <Text style={styles.completionTitle}>Exercise Complete!</Text>
            <Text style={styles.completionText}>
              You completed {pattern.cycles} cycles of {breathing.title}
            </Text>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleComplete}
              activeOpacity={0.7}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    opacity: 0.3,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(199, 246, 0, 0.3)',
    borderWidth: 3,
    borderColor: colors.accent.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  countdownText: {
    fontSize: 72,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  phaseText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  cycleText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
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
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  completionEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  completionTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  completionText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },
  doneButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
