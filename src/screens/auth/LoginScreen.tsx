import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    navigation.replace('Main');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple Sign In
    navigation.replace('Main');
  };

  const handleFacebookSignIn = () => {
    // TODO: Implement Facebook Sign In
    navigation.replace('Main');
  };

  const handleTwitterSignIn = () => {
    // TODO: Implement Twitter/X Sign In
    navigation.replace('Main');
  };

  const handleSignIn = () => {
    // TODO: Implement email/password sign in
    navigation.replace('Main');
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/20-light-sign-in-blank-form.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Invisible touchable areas for buttons */}

        {/* Back button area */}
        <TouchableOpacity
          style={styles.backButtonArea}
          onPress={handleBackButton}
          activeOpacity={1}
        />

        {/* Email input area (tap to focus - will need real implementation later) */}
        <TouchableOpacity
          style={[styles.inputArea, { top: height * 0.30 }]}
          activeOpacity={1}
        />

        {/* Password input area (tap to focus - will need real implementation later) */}
        <TouchableOpacity
          style={[styles.inputArea, { top: height * 0.43 }]}
          activeOpacity={1}
        />

        {/* Remember me checkbox area */}
        <TouchableOpacity
          style={styles.rememberMeArea}
          activeOpacity={1}
        />

        {/* Forgot password link area */}
        <TouchableOpacity
          style={styles.forgotPasswordArea}
          onPress={handleForgotPassword}
          activeOpacity={1}
        />

        {/* Google button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.63 }]}
          onPress={handleGoogleSignIn}
          activeOpacity={1}
        />

        {/* Apple button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.70 }]}
          onPress={handleAppleSignIn}
          activeOpacity={1}
        />

        {/* Facebook button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.77 }]}
          onPress={handleFacebookSignIn}
          activeOpacity={1}
        />

        {/* X/Twitter button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.84 }]}
          onPress={handleTwitterSignIn}
          activeOpacity={1}
        />

        {/* Sign in button area */}
        <TouchableOpacity
          style={styles.signInButtonArea}
          onPress={handleSignIn}
          activeOpacity={1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  fullScreenImage: {
    width,
    height,
    position: 'absolute',
  },
  backButtonArea: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
  },
  inputArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
  },
  rememberMeArea: {
    position: 'absolute',
    top: height * 0.52,
    left: width * 0.05,
    width: 150,
    height: 40,
  },
  forgotPasswordArea: {
    position: 'absolute',
    top: height * 0.52,
    right: width * 0.05,
    width: 150,
    height: 40,
  },
  socialButtonArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
  },
  signInButtonArea: {
    position: 'absolute',
    bottom: height * 0.05,
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
  },
});
