/**
 * Welcome Screen - Exact Figma Recreation
 * Proper React Native components with Figma-extracted assets
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path, G, Rect, Defs, ClipPath } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

// Figma-extracted assets
const assets = {
  // Use meditation-themed illustration
  welcomeIllustration: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-14-component-illustrations-set.png'),
};

// Google Icon
const GoogleIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

// Apple Icon
const AppleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </Svg>
);

// Facebook Icon
const FacebookIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="#1877F2"
    />
  </Svg>
);

// X (Twitter) Icon
const XIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </Svg>
);

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  onPress,
  backgroundColor = '#FFFFFF',
  textColor = '#333333',
  borderColor = '#E5E5E5',
}) => (
  <TouchableOpacity
    style={[
      styles.socialButton,
      {
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {icon}
    <Text style={[styles.socialButtonText, { color: textColor }]}>{label}</Text>
  </TouchableOpacity>
);

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://mindify.app/privacy');
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://mindify.app/terms');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            {/* Illustration */}
            <View style={styles.illustrationContainer}>
              <Image
                source={assets.welcomeIllustration}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            {/* Title and Subtitle */}
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: colors.text.primary }]}>
                Welcome to Rediscover Talk
              </Text>
              <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                Your personal mental wellness companion. Start your journey to a calmer, more mindful life.
              </Text>
            </View>
          </View>

          {/* Social Login Section - Hidden for future implementation */}
          {/* TODO: Re-enable social login when backend is ready */}

          {/* Auth Buttons */}
          <View style={styles.authButtonsContainer}>
            {/* Sign Up Button - Primary */}
            <TouchableOpacity
              style={[styles.authButton, styles.signUpButton]}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={styles.signUpButtonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Sign In Button - Secondary */}
            <TouchableOpacity
              style={[
                styles.authButton,
                styles.signInButton,
                { borderColor: '#9EB567' },
              ]}
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text style={[styles.signInButtonText, { color: '#9EB567' }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Legal Links */}
          <View style={styles.legalContainer}>
            <Text style={[styles.legalText, { color: colors.text.tertiary }]}>
              By continuing, you agree to our{' '}
            </Text>
            <View style={styles.legalLinksRow}>
              <TouchableOpacity onPress={handleTermsOfService}>
                <Text style={styles.legalLink}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={[styles.legalText, { color: colors.text.tertiary }]}> and </Text>
              <TouchableOpacity onPress={handlePrivacyPolicy}>
                <Text style={styles.legalLink}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  illustrationContainer: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },

  // Social Login Section
  socialSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 26,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
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
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },

  // Auth Buttons
  authButtonsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  authButton: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    backgroundColor: '#9EB567',
    shadowColor: '#9EB567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signInButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Legal
  legalContainer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  legalText: {
    fontSize: 12,
    textAlign: 'center',
  },
  legalLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legalLink: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9EB567',
  },
});

export default WelcomeScreen;
