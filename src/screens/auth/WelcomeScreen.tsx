/**
 * WelcomeScreen
 * Entry point to Sign Up or Sign In
 * Reference: Figma screen 5-light-welcome-screen.png
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Button } from '../../components';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🧠</Text>
        <Text style={styles.title}>Welcome to{'\n'}Rediscover Talk</Text>
        <Text style={styles.subtitle}>
          Your personal mental wellness companion. Start your journey to better mental health today.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
          fullWidth
        />
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('SignIn')}
          variant="outline"
          fullWidth
          style={styles.signInButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'space-between',
    paddingVertical: theme.spacing['4xl'],
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },

  emoji: {
    fontSize: 80,
    marginBottom: theme.spacing.xl,
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },

  footer: {
    paddingHorizontal: theme.spacing.lg,
  },

  signInButton: {
    marginTop: theme.spacing.md,
  },
});
