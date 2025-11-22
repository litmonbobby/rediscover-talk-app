/**
 * ForgotPasswordScreen
 * Request password reset via email
 * Reference: Figma screen 23-light-forgot-password.png
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Button, Input, Header } from '../../components';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

export function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    // TODO: Send reset code via Supabase
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTP', { email });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Forgot Password"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.emoji}>🔐</Text>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a code to reset your password.
        </Text>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            required
          />

          <Button
            title="Send Reset Code"
            onPress={handleSendCode}
            loading={loading}
            fullWidth
            style={styles.sendButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    padding: theme.spacing.lg,
  },

  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },

  title: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },

  form: {
    marginTop: theme.spacing.lg,
  },

  sendButton: {
    marginTop: theme.spacing.lg,
  },
});
