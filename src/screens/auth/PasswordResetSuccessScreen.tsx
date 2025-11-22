/**
 * PasswordResetSuccessScreen
 * Confirmation that password was reset successfully
 * Reference: Figma screen 26-light-reset-password-successful.png
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Button } from '../../components';

type PasswordResetSuccessScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PasswordResetSuccess'
>;

interface PasswordResetSuccessScreenProps {
  navigation: PasswordResetSuccessScreenNavigationProp;
}

export function PasswordResetSuccessScreen({
  navigation,
}: PasswordResetSuccessScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.title}>Password Reset Successful!</Text>
        <Text style={styles.subtitle}>
          Your password has been reset successfully. You can now sign in with your new password.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Back to Sign In"
          onPress={() => navigation.navigate('SignIn')}
          fullWidth
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
});
