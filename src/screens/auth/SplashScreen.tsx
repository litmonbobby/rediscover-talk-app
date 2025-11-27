import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navigate to onboarding after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Animated.Image
        source={getThemedScreenImage('Splash', isDarkMode)}
        style={[
          styles.splashImage,
          {
            opacity: fadeAnim,
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9eb567',
  },
  splashImage: {
    width: width,
    height: height,
  },
});
