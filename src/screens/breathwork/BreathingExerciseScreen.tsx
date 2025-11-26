import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'BreathingExercise'>;

type BreathPhase = 'inhale' | 'hold' | 'exhale';

export const BreathingExerciseScreen: React.FC<Props> = ({ navigation }) => {
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('inhale');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Cycle through breathing phases
    const cyclePhases = () => {
      setTimeout(() => setCurrentPhase('hold'), 4000);
      setTimeout(() => setCurrentPhase('exhale'), 8000);
      setTimeout(() => setCurrentPhase('inhale'), 12000);
      // Show completed after 3 cycles (simulated)
      setTimeout(() => setIsCompleted(true), 36000);
    };

    cyclePhases();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleComplete = () => {
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
      <View style={styles.content}>
        <Image
          source={getScreenImage()}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {!isCompleted && (
          <>
            {/* Back button - top left */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={1}
            />

            {/* Pause button - bottom */}
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={handleBack}
              activeOpacity={1}
            />
          </>
        )}

        {isCompleted && (
          <>
            {/* Done button - bottom */}
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleComplete}
              activeOpacity={1}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    width,
    height,
  },
  fullScreenImage: {
    width,
    height,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  pauseButton: {
    position: 'absolute',
    bottom: height * 0.15,
    left: width * 0.5 - 40,
    width: 80,
    height: 80,
    zIndex: 10,
  },
  doneButton: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    zIndex: 10,
  },
});
