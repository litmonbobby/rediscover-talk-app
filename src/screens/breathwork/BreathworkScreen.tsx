import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

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
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Breathwork</Text>
        <Text style={styles.subtitle}>Find your calm through breathing</Text>
      </View>

      {/* Pattern Selector */}
      {!isActive && (
        <View style={styles.patternSelector}>
          {(Object.keys(breathPatterns) as Array<keyof typeof breathPatterns>).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.patternCard,
                selectedPattern === key && styles.patternCardSelected,
              ]}
              onPress={() => setSelectedPattern(key)}
              activeOpacity={0.7}
            >
              <Text style={styles.patternName}>{breathPatterns[key].name}</Text>
              <Text style={styles.patternDescription}>
                {breathPatterns[key].description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Breathing Circle */}
      <View style={styles.breathingContainer}>
        <Animated.View
          style={[
            styles.breathingCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[colors.accent.lime, colors.accent.brightLime]}
            style={styles.circleGradient}
          >
            <Text style={styles.countText}>{count}</Text>
          </LinearGradient>
        </Animated.View>
        {isActive && (
          <Text style={styles.phaseText}>{getPhaseText()}</Text>
        )}
      </View>

      {/* Control Buttons */}
      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity style={styles.startButton} onPress={handleStart} activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.accent.lime, colors.accent.brightLime]}
              style={styles.startButtonGradient}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={handleStop} activeOpacity={0.8}>
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    ...typography.h2,
    color: colors.text.primary,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  patternSelector: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  patternCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  patternCardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: colors.accent.lime,
  },
  patternName: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  patternDescription: {
    ...typography.body,
    color: colors.text.secondary,
  },
  breathingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    ...typography.h1,
    fontSize: 64,
    fontWeight: '700',
    color: colors.primary.cobaltBlue,
  },
  phaseText: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.xl,
  },
  controls: {
    paddingBottom: spacing.xl,
  },
  startButton: {
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  startButtonGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  startButtonText: {
    ...typography.h2,
    color: colors.primary.cobaltBlue,
  },
  stopButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: spacing.borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.text.primary,
  },
  stopButtonText: {
    ...typography.h2,
    color: colors.text.primary,
  },
});
