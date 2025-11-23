import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Breathwork'>;

type BreathPattern = '4-7-8' | 'box' | 'calm';

export const BreathworkScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>('4-7-8');
  const [isActive, setIsActive] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePattern478 = () => {
    setSelectedPattern('4-7-8');
    setIsActive(false);
  };

  const handlePatternBox = () => {
    setSelectedPattern('box');
    setIsActive(false);
  };

  const handlePatternCalm = () => {
    setSelectedPattern('calm');
    setIsActive(false);
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
    // TODO: Implement actual breathing animation and timer
    console.log(isActive ? 'Stopping' : 'Starting', selectedPattern, 'breathing');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design - Breathing (showing inhale state) */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/64-light-start-or-play-breathing-inhale.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button area */}
        <TouchableOpacity
          style={styles.backButtonArea}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Pattern selection cards (only shown when not active) */}
        {!isActive && (
          <>
            {/* 4-7-8 Pattern card */}
            <TouchableOpacity
              style={[styles.patternCardArea, { top: height * 0.20 }]}
              onPress={handlePattern478}
              activeOpacity={1}
            />

            {/* Box Breathing card */}
            <TouchableOpacity
              style={[styles.patternCardArea, { top: height * 0.32 }]}
              onPress={handlePatternBox}
              activeOpacity={1}
            />

            {/* Calm Breathing card */}
            <TouchableOpacity
              style={[styles.patternCardArea, { top: height * 0.44 }]}
              onPress={handlePatternCalm}
              activeOpacity={1}
            />
          </>
        )}

        {/* Central breathing circle area (tap to start/stop) */}
        <TouchableOpacity
          style={styles.breathingCircleArea}
          onPress={handleStartStop}
          activeOpacity={1}
        />

        {/* Start/Stop button at bottom */}
        <TouchableOpacity
          style={styles.controlButtonArea}
          onPress={handleStartStop}
          activeOpacity={1}
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
  content: {
    flex: 1,
  },
  fullScreenImage: {
    width,
    height,
    position: 'absolute',
  },
  backButtonArea: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  patternCardArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 90,
  },
  breathingCircleArea: {
    position: 'absolute',
    top: height * 0.40,
    left: width * 0.25,
    width: width * 0.50,
    height: width * 0.50,
  },
  controlButtonArea: {
    position: 'absolute',
    bottom: 40,
    left: width * 0.10,
    right: width * 0.10,
    height: 60,
  },
});
