import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'SignUp'>;

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement Supabase sign up
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: { name }
      //   }
      // });

      // For now, navigate to goal selection
      setTimeout(() => {
        setLoading(false);
        navigation.replace('GoalSelection');
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to create account');
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeInUp.delay(100).springify()}
            style={styles.header}
          >
            <Text style={[styles.headerTitle, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.secondary
            }]}>
              Create Account
            </Text>
            <Text style={[styles.headerSubtitle, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Start your mental wellness journey
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200).springify()}
            style={styles.formContainer}
          >
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Full Name
              </Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.light,
                  color: colors.text.primary,
                  borderRadius: borderRadius.md
                }]}
                placeholder="Enter your name"
                placeholderTextColor={colors.text.tertiary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Email
              </Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.light,
                  color: colors.text.primary,
                  borderRadius: borderRadius.md
                }]}
                placeholder="Enter your email"
                placeholderTextColor={colors.text.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Password
              </Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.light,
                  color: colors.text.primary,
                  borderRadius: borderRadius.md
                }]}
                placeholder="Create a password"
                placeholderTextColor={colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Confirm Password
              </Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.light,
                  color: colors.text.primary,
                  borderRadius: borderRadius.md
                }]}
                placeholder="Confirm your password"
                placeholderTextColor={colors.text.tertiary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.signUpButton, {
                backgroundColor: colors.primary.main,
                borderRadius: borderRadius.xl,
                ...shadows.lg
              }]}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={[styles.signUpButtonText, {
                color: colors.text.inverse,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.bold
              }]}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.loginLinkText, {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Already have an account?{' '}
                <Text style={[styles.loginLinkBold, {
                  color: colors.primary.main,
                  fontWeight: typography.fontWeight.semibold
                }]}>
                  Log In
                </Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  signUpButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  signUpButtonText: {
    fontSize: 18,
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
  },
  loginLinkBold: {
    fontSize: 14,
  },
});
