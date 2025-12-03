/**
 * Sign In Screen - Exact Figma Recreation
 * Proper React Native components with Figma-extracted assets
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path, Rect } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { authService } from '../../services/supabase';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Main: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

// Figma-extracted assets
const assets = {
  // Icons
  arrowLeft: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-left.png'),
  message: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-message.png'),
  lock: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-lock.png'),
  show: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-show.png'),
  hide: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-hide.png'),
};

// Back Arrow Icon
const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Checkbox Icon
const CheckboxIcon: React.FC<{ checked: boolean; color?: string }> = ({ checked, color = '#9EB567' }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Rect
      x={1}
      y={1}
      width={18}
      height={18}
      rx={4}
      stroke={checked ? color : '#D1D5DB'}
      strokeWidth={2}
      fill={checked ? color : 'transparent'}
    />
    {checked && (
      <Path
        d="M6 10L9 13L14 7"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </Svg>
);

// Social Login Icon components
const GoogleIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </Svg>
);

const AppleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </Svg>
);

const FacebookIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
    <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </Svg>
);

const XIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </Svg>
);

export const SignInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.signIn({ email: email.trim(), password });

      if (result.success) {
        // Navigation will be handled by auth state listener in AppNavigator
        navigation.navigate('Main');
      } else {
        // Check for common error messages and provide helpful feedback
        const errorMessage = result.error || '';

        if (errorMessage.toLowerCase().includes('email not confirmed')) {
          Alert.alert(
            'Email Not Verified',
            'Please check your inbox and click the verification link we sent you. Check your spam folder if you don\'t see it.',
            [
              { text: 'OK' },
              {
                text: 'Resend Email',
                onPress: () => handleResendConfirmation()
              }
            ]
          );
        } else if (errorMessage.toLowerCase().includes('invalid login credentials')) {
          Alert.alert('Sign In Failed', 'Invalid email or password. Please check your credentials and try again.');
        } else {
          Alert.alert('Sign In Failed', result.error || 'Please check your credentials and try again');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Email Required', 'Please enter your email address first');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.resetPassword(email.trim());
      if (result.success) {
        Alert.alert('Check Your Email', 'We sent you a password reset link');
      } else {
        Alert.alert('Error', result.error || 'Failed to send reset email');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email.trim()) {
      Alert.alert('Email Required', 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.resendConfirmationEmail(email.trim());
      if (result.success) {
        Alert.alert('Email Sent', 'A new verification email has been sent. Please check your inbox.');
      } else {
        Alert.alert('Error', result.error || 'Failed to resend confirmation email');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Sign in with ${provider}`);
  };

  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackIcon size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              Welcome back
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
              Sign in to continue your wellness journey
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Email Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.background.secondary }]}>
              <Image
                source={assets.message}
                style={[styles.inputIcon, { tintColor: colors.text.tertiary }]}
                resizeMode="contain"
              />
              <TextInput
                style={[styles.input, { color: colors.text.primary }]}
                placeholder="Email"
                placeholderTextColor={colors.text.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.background.secondary }]}>
              <Image
                source={assets.lock}
                style={[styles.inputIcon, { tintColor: colors.text.tertiary }]}
                resizeMode="contain"
              />
              <TextInput
                style={[styles.input, { color: colors.text.primary }]}
                placeholder="Password"
                placeholderTextColor={colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Image
                  source={showPassword ? assets.hide : assets.show}
                  style={[styles.showPasswordIcon, { tintColor: colors.text.tertiary }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <CheckboxIcon checked={rememberMe} />
                <Text style={[styles.rememberMeText, { color: colors.text.secondary }]}>
                  Remember me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[
              styles.signInButton,
              { backgroundColor: isFormValid && !isLoading ? '#9EB567' : colors.background.secondary },
            ]}
            onPress={handleSignIn}
            disabled={!isFormValid || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text
                style={[
                  styles.signInButtonText,
                  { color: isFormValid ? '#FFFFFF' : colors.text.tertiary },
                ]}
              >
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Social Login - Hidden for future implementation */}
          {/* TODO: Re-enable social login when backend is ready */}

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: colors.text.secondary }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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

  // Header
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Title Section
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },

  // Form Section
  formSection: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  showPasswordButton: {
    padding: 8,
  },
  showPasswordIcon: {
    width: 22,
    height: 22,
  },

  // Options Row
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 14,
    marginLeft: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9EB567',
  },

  // Sign In Button
  signInButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#9EB567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
    marginHorizontal: 16,
  },

  // Social Buttons
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Sign Up Link
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9EB567',
  },
});

export default SignInScreen;
