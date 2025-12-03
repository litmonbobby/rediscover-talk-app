/**
 * Breathwork Screen - Matches Figma breathing exercises
 * Guided breathing exercises with animations
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path } from 'react-native-svg';

// Breathing patterns
const breathingPatterns = [
  { id: 1, name: '4-7-8 Relaxation', inhale: 4, hold: 7, exhale: 8 },
  { id: 2, name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, holdOut: 4 },
  { id: 3, name: 'Deep Calm', inhale: 6, hold: 0, exhale: 6 },
];

// Back Icon
const BackIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BreathworkScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, typography, isDarkMode } = useTheme();
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdOut'>('inhale');
  const [countdown, setCountdown] = useState(0);

  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const handleBack = () => {
    navigation.goBack();
  };

  const startBreathing = () => {
    setIsActive(true);
    setPhase('inhale');
    setCountdown(selectedPattern.inhale);
  };

  const stopBreathing = () => {
    setIsActive(false);
    scaleAnim.setValue(0.5);
  };

  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      if (phase === 'inhale') {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: selectedPattern.inhale * 1000,
          useNativeDriver: true,
        }).start();
      } else if (phase === 'exhale') {
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: selectedPattern.exhale * 1000,
          useNativeDriver: true,
        }).start();
      }
    };

    animate();
  }, [phase, isActive]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            if (selectedPattern.hold > 0) {
              setPhase('hold');
              return selectedPattern.hold;
            } else {
              setPhase('exhale');
              return selectedPattern.exhale;
            }
          } else if (phase === 'hold') {
            setPhase('exhale');
            return selectedPattern.exhale;
          } else if (phase === 'exhale') {
            if (selectedPattern.holdOut && selectedPattern.holdOut > 0) {
              setPhase('holdOut');
              return selectedPattern.holdOut;
            } else {
              setPhase('inhale');
              return selectedPattern.inhale;
            }
          } else if (phase === 'holdOut') {
            setPhase('inhale');
            return selectedPattern.inhale;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, selectedPattern]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'holdOut':
        return 'Hold';
      default:
        return '';
    }
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background.primary }]}
        edges={['top', 'bottom']}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <BackIcon color={colors.text.primary} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize.xl,
              },
            ]}
          >
            Breathwork
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Pattern Selection */}
        <View style={styles.patternContainer}>
          {breathingPatterns.map((pattern) => (
            <TouchableOpacity
              key={pattern.id}
              style={[
                styles.patternButton,
                {
                  backgroundColor:
                    selectedPattern.id === pattern.id
                      ? colors.primary.main
                      : colors.background.secondary,
                  borderColor:
                    selectedPattern.id === pattern.id
                      ? colors.primary.main
                      : colors.border.main,
                },
              ]}
              onPress={() => {
                setSelectedPattern(pattern);
                stopBreathing();
              }}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.patternText,
                  {
                    color:
                      selectedPattern.id === pattern.id
                        ? '#FFFFFF'
                        : colors.text.primary,
                    fontFamily: typography.fontFamily.primary,
                  },
                ]}
              >
                {pattern.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Breathing Circle */}
        <View style={styles.breathingContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              {
                backgroundColor: colors.primary.main + '30',
                borderColor: colors.primary.main,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View
              style={[
                styles.innerCircle,
                { backgroundColor: colors.primary.main },
              ]}
            >
              {isActive ? (
                <>
                  <Text style={styles.countdownText}>{countdown}</Text>
                  <Text style={styles.phaseText}>{getPhaseText()}</Text>
                </>
              ) : (
                <Text style={styles.startText}>Tap Start</Text>
              )}
            </View>
          </Animated.View>
        </View>

        {/* Start/Stop Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: isActive
                  ? colors.status.error
                  : colors.primary.main,
              },
            ]}
            onPress={isActive ? stopBreathing : startBreathing}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.actionButtonText,
                {
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.lg,
                },
              ]}
            >
              {isActive ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontWeight: '600',
  },
  patternContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 32,
  },
  patternButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  patternText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  breathingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '700',
  },
  phaseText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 8,
  },
  startText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  actionButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default BreathworkScreen;
