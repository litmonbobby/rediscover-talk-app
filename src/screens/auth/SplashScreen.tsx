/**
 * SplashScreen
 * Initial loading screen with app logo
 * Reference: Figma screen 1-light-splash-screen.png
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

export function SplashScreen({ navigation }: SplashScreenProps) {
  useEffect(() => {
    // Navigate to Walkthrough after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Walkthrough');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🧠</Text>
        <Text style={styles.title}>Rediscover Talk</Text>
        <Text style={styles.subtitle}>Mental Wellness Companion</Text>
      </View>

      <Text style={styles.footer}>Take a moment for yourself</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.DEFAULT,
    justifyContent: 'space-between',
    paddingVertical: theme.spacing['4xl'],
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 80,
    marginBottom: theme.spacing.xl,
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.sm,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.inverse,
    opacity: 0.9,
  },

  footer: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    opacity: 0.7,
    textAlign: 'center',
  },
});
