/**
 * Splash Screen - Exact Figma Design Recreation
 * Uses full-screen Figma image directly - no additional UI layers
 * The Figma image IS the complete screen design
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

// Figma screen image - complete screen design (same for light/dark - olive green)
const splashScreen = require('../../figma-extracted/assets/screens/light-theme/1-light-splash-screen.png');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    // Animate in
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withTiming(1, { duration: 800 });

    // Navigate to onboarding after delay
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Full-screen Figma splash image with animation */}
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          source={splashScreen}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9EB567', // Olive green fallback
  },
  imageContainer: {
    flex: 1,
  },
  fullScreenImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default SplashScreen;
