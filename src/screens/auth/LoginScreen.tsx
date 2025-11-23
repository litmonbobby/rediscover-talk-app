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

type Props = NativeStackScreenProps<any, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Supabase login
      setTimeout(() => {
        setLoading(false);
        navigation.replace('Main');
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to log in');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View
            entering={FadeInUp.delay(100).springify()}
            style={styles.header}
          >
            <Text style={[styles.headerTitle, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.secondary
            }]}>
              Welcome Back
            </Text>
            <Text style={[styles.headerSubtitle, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Log in to continue your journey
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200).springify()}
            style={styles.formContainer}
          >
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
                placeholder="Enter your password"
                placeholderTextColor={colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, {
                color: colors.primary.main,
                fontFamily: typography.fontFamily.primary
              }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, {
                backgroundColor: colors.primary.main,
                borderRadius: borderRadius.xl,
                ...shadows.lg
              }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={[styles.loginButtonText, {
                color: colors.text.inverse,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.bold
              }]}>
                {loading ? 'Logging in...' : 'Log In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpLink}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={[styles.signUpLinkText, {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Don't have an account?{' '}
                <Text style={[styles.signUpLinkBold, {
                  color: colors.primary.main,
                  fontWeight: typography.fontWeight.semibold
                }]}>
                  Sign Up
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
  },
  signUpLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpLinkText: {
    fontSize: 14,
  },
  signUpLinkBold: {
    fontSize: 14,
  },
});
