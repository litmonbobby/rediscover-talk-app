/**
 * SignUpScreen
 * User registration with email/password or social auth
 * Reference: Figma screens 6-8 (sign-up-blank/filled/loading)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Button, Input, Header } from '../../components';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

export function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    // TODO: Implement Supabase authentication
    setTimeout(() => {
      setLoading(false);
      navigation.replace('PreparingPlans');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Sign Up"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us and start your mental wellness journey</Text>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            required
            helperText="Must be at least 8 characters"
            rightIcon={<Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Button
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            fullWidth
            style={styles.signUpButton}
          />

          <Text style={styles.terms}>
            By signing up, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Social Sign Up */}
        <View style={styles.socialSection}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or sign up with</Text>
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

        <View style={styles.signInPrompt}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInLink}>Sign In</Text>
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

  signUpButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  terms: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 18,
  },

  link: {
    color: theme.colors.primary.DEFAULT,
    textDecorationLine: 'underline',
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

  signInPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signInText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },

  signInLink: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary.DEFAULT,
  },
});
