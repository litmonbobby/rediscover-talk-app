import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
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

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          entering={FadeIn.delay(100).duration(500)}
          style={styles.logoContainer}
        >
          <Image
            source={require('../../../assets/splash-icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Header */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={styles.header}
        >
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: typography.fontWeight.bold
          }]}>
            Let's Get Started!
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Let's dive in into your account
          </Text>
        </Animated.View>

        {/* Social Login Buttons */}
        <Animated.View
          entering={FadeInUp.delay(300).springify()}
          style={styles.socialContainer}
        >
          <TouchableOpacity
            style={[styles.socialButton, {
              backgroundColor: colors.background.card,
              borderColor: colors.border.light,
              borderRadius: borderRadius.xl,
              ...shadows.sm
            }]}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.socialIconContainer}>
              <Text style={styles.socialIcon}>G</Text>
            </View>
            <Text style={[styles.socialText, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, {
              backgroundColor: colors.background.card,
              borderColor: colors.border.light,
              borderRadius: borderRadius.xl,
              ...shadows.sm
            }]}
            onPress={handleAppleSignIn}
          >
            <View style={styles.socialIconContainer}>
              <Text style={styles.socialIcon}></Text>
            </View>
            <Text style={[styles.socialText, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, {
              backgroundColor: colors.background.card,
              borderColor: colors.border.light,
              borderRadius: borderRadius.xl,
              ...shadows.sm
            }]}
            onPress={handleFacebookSignIn}
          >
            <View style={styles.socialIconContainer}>
              <Text style={styles.socialIcon}>f</Text>
            </View>
            <Text style={[styles.socialText, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, {
              backgroundColor: colors.background.card,
              borderColor: colors.border.light,
              borderRadius: borderRadius.xl,
              ...shadows.sm
            }]}
            onPress={handleTwitterSignIn}
          >
            <View style={styles.socialIconContainer}>
              <Text style={styles.socialIcon}>𝕏</Text>
            </View>
            <Text style={[styles.socialText, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Continue with X
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom Section */}
        <Animated.View
          entering={FadeInUp.delay(500).springify()}
          style={styles.bottomSection}
        >
          {/* Sign Up Button */}
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
              Sign up
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity onPress={handleSignIn} style={styles.signInContainer}>
            <Text style={[styles.signInText, {
              color: colors.primary.main,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.semibold
            }]}>
              Sign in
            </Text>
          </TouchableOpacity>

          {/* Privacy Links */}
          <View style={styles.privacyLinks}>
            <TouchableOpacity>
              <Text style={[styles.privacyText, {
                color: colors.text.tertiary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text style={[styles.privacySeparator, { color: colors.text.tertiary }]}>•</Text>
            <TouchableOpacity>
              <Text style={[styles.privacyText, {
                color: colors.text.tertiary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Terms of Service
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 60,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  socialContainer: {
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
  },
  socialIconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: '700',
  },
  socialText: {
    fontSize: 16,
  },
  bottomSection: {
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
  signInContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  signInText: {
    fontSize: 16,
  },
  privacyLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  privacyText: {
    fontSize: 13,
  },
  privacySeparator: {
    fontSize: 13,
    marginHorizontal: 8,
  },
});
