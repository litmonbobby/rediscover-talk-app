import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    navigation.navigate('SignUp');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple Sign In
    navigation.navigate('SignUp');
  };

  const handleFacebookSignIn = () => {
    // TODO: Implement Facebook Sign In
    navigation.navigate('SignUp');
  };

  const handleTwitterSignIn = () => {
    // TODO: Implement Twitter/X Sign In
    navigation.navigate('SignUp');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.content}>
        {/* Header */}
        <Animated.View
          entering={FadeInUp.delay(100).springify()}
          style={styles.header}
        >
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary
          }]}>
            Welcome to{'\n'}Rediscover Talk
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Your personal mental wellness companion
          </Text>
        </Animated.View>

        {/* Logo/Icon Placeholder */}
        <Animated.View
          entering={FadeIn.delay(200).duration(500)}
          style={styles.logoContainer}
        >
          <Text style={styles.logo}>🌱</Text>
        </Animated.View>

        {/* Social Login Buttons */}
        <Animated.View
          entering={FadeInUp.delay(300).springify()}
          style={styles.socialContainer}
        >
          <TouchableOpacity
            style={[styles.socialButton, {
              backgroundColor: colors.social.google,
              ...shadows.md
            }]}
            onPress={handleGoogleSignIn}
          >
            <Text style={styles.socialIcon}>G</Text>
            <Text style={[styles.socialText, { color: colors.text.inverse }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, {
              backgroundColor: colors.social.apple,
              ...shadows.md
            }]}
            onPress={handleAppleSignIn}
          >
            <Text style={styles.socialIcon}></Text>
            <Text style={[styles.socialText, { color: colors.text.inverse }]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, {
              backgroundColor: colors.social.facebook,
              ...shadows.md
            }]}
            onPress={handleFacebookSignIn}
          >
            <Text style={styles.socialIcon}>f</Text>
            <Text style={[styles.socialText, { color: colors.text.inverse }]}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, {
              backgroundColor: colors.social.twitter,
              borderWidth: 1,
              borderColor: colors.border.dark,
              ...shadows.md
            }]}
            onPress={handleTwitterSignIn}
          >
            <Text style={styles.socialIcon}>𝕏</Text>
            <Text style={[styles.socialText, { color: colors.text.inverse }]}>
              Continue with X
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Divider */}
        <Animated.View
          entering={FadeIn.delay(400).duration(500)}
          style={styles.dividerContainer}
        >
          <View style={[styles.dividerLine, { backgroundColor: colors.border.main }]} />
          <Text style={[styles.dividerText, { color: colors.text.tertiary }]}>OR</Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.border.main }]} />
        </Animated.View>

        {/* Sign Up Button */}
        <Animated.View
          entering={FadeInUp.delay(500).springify()}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[styles.signUpButton, {
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.xl,
              ...shadows.lg
            }]}
            onPress={handleSignUp}
          >
            <Text style={[styles.signUpText, {
              color: colors.text.inverse,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold
            }]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginContainer}>
            <Text style={[styles.loginText, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Already have an account?{' '}
              <Text style={[styles.loginLink, {
                color: colors.primary.main,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Log In
              </Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  logo: {
    fontSize: 80,
  },
  socialContainer: {
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  socialIcon: {
    fontSize: 20,
    marginRight: 12,
    fontWeight: '700',
  },
  socialText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  signUpButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpText: {
    fontSize: 18,
  },
  loginContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
  },
});
