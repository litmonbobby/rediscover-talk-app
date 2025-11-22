/**
 * SignInScreen
 * User login with email/password or social auth
 * Reference: Figma screens 20-22 (sign-in-blank/filled/loading)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Button, Input, Header } from '../../components';

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
}

export function SignInScreen({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    // TODO: Implement Supabase authentication
    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainTabs');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Sign In"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your wellness journey</Text>

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

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            required
            rightIcon={<Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            fullWidth
            style={styles.signInButton}
          />
        </View>

        {/* Social Sign In */}
        <View style={styles.socialSection}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <Button
              title="Google"
              variant="outline"
              onPress={() => {}}
              style={styles.socialButton}
            />
            <Button
              title="Apple"
              variant="outline"
              onPress={() => {}}
              style={styles.socialButton}
            />
          </View>
        </View>

        <View style={styles.signUpPrompt}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
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

  title: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },

  form: {
    marginBottom: theme.spacing.xl,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },

  forgotPasswordText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary.DEFAULT,
  },

  signInButton: {
    marginTop: theme.spacing.md,
  },

  socialSection: {
    marginBottom: theme.spacing.xl,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.light,
  },

  dividerText: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginHorizontal: theme.spacing.md,
  },

  socialButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  socialButton: {
    flex: 1,
  },

  signUpPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signUpText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },

  signUpLink: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary.DEFAULT,
  },
});
