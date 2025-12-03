/**
 * Splash Screen - RediscoverTalk Branding
 * Blue gradient with face profiles logo and lime green text
 * "EMPOWERING MINDS THROUGH CONVERSATIONS"
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
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

// RediscoverTalk splash - blue gradient with face profiles logo
const splashScreen = require('../../../assets/splash-icon.png');

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
    backgroundColor: '#0066CC', // Blue fallback matching splash gradient
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
