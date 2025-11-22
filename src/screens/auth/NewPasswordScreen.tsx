/**
 * NewPasswordScreen
 * Create new password after verification
 * Reference: Figma screen 25-light-create-new-password.png
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Button, Input, Header } from '../../components';

type NewPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewPassword'
>;
type NewPasswordScreenRouteProp = RouteProp<RootStackParamList, 'NewPassword'>;

interface NewPasswordScreenProps {
  navigation: NewPasswordScreenNavigationProp;
  route: NewPasswordScreenRouteProp;
}

export function NewPasswordScreen({ navigation, route }: NewPasswordScreenProps) {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      // TODO: Show error toast
      return;
    }

    setLoading(true);
    // TODO: Update password via Supabase
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('PasswordResetSuccess');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header
        title="New Password"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.emoji}>🔑</Text>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Please enter your new password for{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.form}>
          <Input
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            required
            helperText="Must be at least 8 characters"
            rightIcon={<Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            required
            error={
              confirmPassword && password !== confirmPassword
                ? 'Passwords do not match'
                : undefined
            }
          />

          <Button
            title="Reset Password"
            onPress={handleResetPassword}
            loading={loading}
            fullWidth
            style={styles.resetButton}
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

  resetButton: {
    marginTop: theme.spacing.xl,
  },
});
