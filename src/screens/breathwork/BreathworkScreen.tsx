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
import { Button } from '../../components/core/Button';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Breathwork'>;

type BreathPattern = '4-7-8' | 'box' | 'calm';

interface BreathingPattern {
  id: BreathPattern;
  name: string;
  description: string;
  duration: number;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  color: string;
}

const breathingPatterns: BreathingPattern[] = [
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    description: 'Relax and fall asleep faster',
    duration: 19,
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    color: '#4CAF50',
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Reduce stress and improve focus',
    duration: 16,
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    color: '#2196F3',
  },
  {
    id: 'calm',
    name: 'Calm Breathing',
    description: 'Find peace and tranquility',
    duration: 10,
    inhale: 4,
    hold1: 2,
    exhale: 4,
    hold2: 0,
    color: '#9C27B0',
  },
];

export const BreathworkScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>('4-7-8');
  const [isActive, setIsActive] = useState(false);
  const [instruction, setInstruction] = useState('Tap to start');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPattern = breathingPatterns.find((p) => p.id === selectedPattern)!;

  const handleBack = () => {
    if (isActive) {
      setIsActive(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    navigation.goBack();
  };

  const handlePatternSelect = (pattern: BreathPattern) => {
    setSelectedPattern(pattern);
    setIsActive(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const runBreathingCycle = () => {
    const pattern = breathingPatterns.find((p) => p.id === selectedPattern)!;
    let phase = 0;

    const phases = [
      { duration: pattern.inhale, instruction: 'Inhale', scale: 1.5 },
      ...(pattern.hold1 > 0 ? [{ duration: pattern.hold1, instruction: 'Hold', scale: 1.5 }] : []),
      { duration: pattern.exhale, instruction: 'Exhale', scale: 1.0 },
      ...(pattern.hold2 > 0 ? [{ duration: pattern.hold2, instruction: 'Hold', scale: 1.0 }] : []),
    ];

    const nextPhase = () => {
      if (phase >= phases.length) {
        phase = 0;
      }

      const currentPhase = phases[phase];
      setInstruction(currentPhase.instruction);

      Animated.timing(scaleAnim, {
        toValue: currentPhase.scale,
        duration: currentPhase.duration * 1000,
        useNativeDriver: true,
      }).start();

      phase++;
      timerRef.current = setTimeout(nextPhase, currentPhase.duration * 1000);
    };

    nextPhase();
  };

  const handleStartStop = () => {
    if (isActive) {
      setIsActive(false);
      setInstruction('Tap to start');
      if (timerRef.current) clearTimeout(timerRef.current);
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      setIsActive(true);
      runBreathingCycle();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/64-light-start-or-play-breathing-inhale.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Pattern Selection Cards (only shown when not active) */}
      {!isActive && (
        <View style={styles.patternsContainer}>
          {breathingPatterns.map((pattern) => (
            <TouchableOpacity
              key={pattern.id}
              style={[
                styles.patternCard,
                selectedPattern === pattern.id && {
                  borderColor: pattern.color,
                  borderWidth: 2,
                },
              ]}
              onPress={() => handlePatternSelect(pattern.id)}
              activeOpacity={0.7}
            >
              <View style={styles.patternHeader}>
                <Text style={styles.patternName}>{pattern.name}</Text>
                <Text style={[styles.patternDuration, { color: pattern.color }]}>
                  {pattern.duration}s
                </Text>
              </View>
              <Text style={styles.patternDescription}>{pattern.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Breathing Circle with Animation */}
      <View style={styles.breathingContainer}>
        <Animated.View
          style={[
            styles.breathingCircle,
            {
              backgroundColor: currentPattern.color + '30',
              borderColor: currentPattern.color,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={[styles.instructionText, { color: currentPattern.color }]}>
            {instruction}
          </Text>
        </Animated.View>
      </View>

      {/* Control Button */}
      <View style={styles.controlContainer}>
        <Button
          title={isActive ? 'Stop' : 'Start'}
          onPress={handleStartStop}
          variant="primary"
          size="large"
          fullWidth
          style={[styles.controlButton, { backgroundColor: currentPattern.color }]}
        />
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  patternsContainer: {
    position: 'absolute',
    top: height * 0.15,
    left: 24,
    right: 24,
    zIndex: 5,
  },
  patternCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patternHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  patternName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  patternDuration: {
    fontSize: 16,
    fontWeight: '600',
  },
  patternDescription: {
    fontSize: 14,
    color: '#666',
  },
  breathingContainer: {
    position: 'absolute',
    top: height * 0.40,
    left: width * 0.15,
    right: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingCircle: {
    width: width * 0.60,
    height: width * 0.60,
    borderRadius: (width * 0.60) / 2,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  instructionText: {
    fontSize: 32,
    fontWeight: '700',
  },
  controlContainer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  controlButton: {
    marginTop: 0,
  },
});
