import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import Animated as ReAnimated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

const breathPatterns = {
  '4-7-8': {
    name: '4-7-8 Relaxation',
    description: 'Perfect for stress relief and better sleep',
    inhale: 4,
    hold: 7,
    exhale: 8,
    pause: 0,
  },
  'box': {
    name: 'Box Breathing',
    description: 'Used by Navy SEALs for focus and calm',
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 4,
  },
  'calm': {
    name: 'Calm Breathing',
    description: 'Simple technique for quick relaxation',
    inhale: 4,
    hold: 0,
    exhale: 6,
    pause: 0,
  },
};

export const BreathworkScreen = ({ navigation }: any) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [count, setCount] = useState(4);
  const [selectedPattern, setSelectedPattern] = useState<keyof typeof breathPatterns>('4-7-8');
  const scaleAnim = useState(new Animated.Value(1))[0];

  const pattern = breathPatterns[selectedPattern];

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) return prev - 1;

        // Move to next phase
        switch (phase) {
          case 'inhale':
            setPhase(pattern.hold > 0 ? 'hold' : 'exhale');
            return pattern.hold > 0 ? pattern.hold : pattern.exhale;
          case 'hold':
            setPhase('exhale');
            return pattern.exhale;
          case 'exhale':
            setPhase(pattern.pause > 0 ? 'pause' : 'inhale');
            return pattern.pause > 0 ? pattern.pause : pattern.inhale;
          case 'pause':
            setPhase('inhale');
            return pattern.inhale;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  useEffect(() => {
    if (!isActive) return;

    const scale = phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.7 : 1.2;
    Animated.timing(scaleAnim, {
      toValue: scale,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [phase, isActive]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setCount(pattern.inhale);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(pattern.inhale);
    scaleAnim.setValue(1);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'pause':
        return 'Pause';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <ReAnimated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, {
            backgroundColor: colors.background.secondary,
            borderRadius: borderRadius.lg
          }]}
        >
          <Text style={[styles.backIcon, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.primary
          }]}>
            ←
          </Text>
        </TouchableOpacity>
        <Text style={[styles.title, {
          color: colors.text.primary,
          fontFamily: typography.fontFamily.secondary
        }]}>
          Breathwork
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.text.secondary,
          fontFamily: typography.fontFamily.primary
        }]}>
          Find your calm through breathing
        </Text>
      </ReAnimated.View>

      {/* Pattern Selector */}
      {!isActive && (
        <View style={styles.patternSelector}>
          {(Object.keys(breathPatterns) as Array<keyof typeof breathPatterns>).map((key, index) => (
            <ReAnimated.View
              key={key}
              entering={FadeInUp.delay(200 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[
                  styles.patternCard,
                  {
                    backgroundColor: selectedPattern === key ? colors.background.card : colors.background.secondary,
                    borderColor: selectedPattern === key ? colors.primary.main : colors.border.light,
                    borderRadius: borderRadius.lg,
                    ...shadows.sm
                  }
                ]}
                onPress={() => setSelectedPattern(key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.patternName, {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.semibold
                }]}>
                  {breathPatterns[key].name}
                </Text>
                <Text style={[styles.patternDescription, {
                  color: colors.text.secondary,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  {breathPatterns[key].description}
                </Text>
              </TouchableOpacity>
            </ReAnimated.View>
          ))}
        </View>
      )}

      {/* Breathing Circle */}
      <View style={styles.breathingContainer}>
        <Animated.View
          style={[
            styles.breathingCircle,
            {
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.full,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={[styles.countText, {
            color: colors.text.inverse,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: typography.fontWeight.bold
          }]}>
            {count}
          </Text>
        </Animated.View>
        {isActive && (
          <Text style={[styles.phaseText, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.semibold
          }]}>
            {getPhaseText()}
          </Text>
        )}
      </View>

      {/* Control Buttons */}
      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity
            style={[styles.startButton, {
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.xl,
              ...shadows.lg
            }]}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <Text style={[styles.startButtonText, {
              color: colors.text.inverse,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold
            }]}>
              Start
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.stopButton, {
              backgroundColor: colors.background.secondary,
              borderColor: colors.primary.main,
              borderRadius: borderRadius.xl
            }]}
            onPress={handleStop}
            activeOpacity={0.8}
          >
            <Text style={[styles.stopButtonText, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Stop
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  patternSelector: {
    gap: 12,
    marginBottom: 24,
  },
  patternCard: {
    padding: 16,
    borderWidth: 2,
  },
  patternName: {
    fontSize: 18,
    marginBottom: 4,
  },
  patternDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  breathingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 64,
  },
  phaseText: {
    fontSize: 24,
    marginTop: 24,
  },
  controls: {
    paddingBottom: 24,
  },
  startButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
  },
  stopButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  stopButtonText: {
    fontSize: 18,
  },
});
