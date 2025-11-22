/**
 * OTPScreen
 * Enter verification code from email
 * Reference: Figma screen 24-light-enter-otp-code.png
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Button, Input, Header } from '../../components';

type OTPScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTP'>;
type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTP'>;

interface OTPScreenProps {
  navigation: OTPScreenNavigationProp;
  route: OTPScreenRouteProp;
}

export function OTPScreen({ navigation, route }: OTPScreenProps) {
  const { email } = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyCode = async () => {
    setLoading(true);
    // TODO: Verify code with Supabase
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('NewPassword', { email });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Verification"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.emoji}>📧</Text>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.form}>
          <Input
            label="Verification Code"
            placeholder="000000"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            required
          />

          <Button
            title="Verify Code"
            onPress={handleVerifyCode}
            loading={loading}
            fullWidth
            style={styles.verifyButton}
          />

          <Button
            title="Resend Code"
            variant="text"
            onPress={() => {}}
            fullWidth
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

  email: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary.DEFAULT,
  },

  form: {
    marginTop: theme.spacing.lg,
  },

  verifyButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
});
