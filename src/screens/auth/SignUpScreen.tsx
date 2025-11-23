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

type Props = NativeStackScreenProps<any, 'SignUp'>;

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    navigation.replace('GoalSelection');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple Sign In
    navigation.replace('GoalSelection');
  };

  const handleFacebookSignIn = () => {
    // TODO: Implement Facebook Sign In
    navigation.replace('GoalSelection');
  };

  const handleTwitterSignIn = () => {
    // TODO: Implement Twitter/X Sign In
    navigation.replace('GoalSelection');
  };

  const handleSignUp = () => {
    // TODO: Implement email/password sign up
    navigation.replace('GoalSelection');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/6-light-sign-up-blank-form.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Invisible touchable areas for buttons */}

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

        {/* Terms & Conditions checkbox area */}
        <TouchableOpacity
          style={styles.termsCheckboxArea}
          activeOpacity={1}
        />

        {/* "Sign in" link area (Already have an account?) */}
        <TouchableOpacity
          style={styles.signInLinkArea}
          onPress={handleSignIn}
          activeOpacity={1}
        />

        {/* Google button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.68 }]}
          onPress={handleGoogleSignIn}
          activeOpacity={1}
        />

        {/* Apple button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.75 }]}
          onPress={handleAppleSignIn}
          activeOpacity={1}
        />

        {/* Facebook button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.82 }]}
          onPress={handleFacebookSignIn}
          activeOpacity={1}
        />

        {/* X/Twitter button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.89 }]}
          onPress={handleTwitterSignIn}
          activeOpacity={1}
        />

        {/* Sign up button area */}
        <TouchableOpacity
          style={styles.signUpButtonArea}
          onPress={handleSignUp}
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
  inputArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
  },
  termsCheckboxArea: {
    position: 'absolute',
    top: height * 0.52,
    left: width * 0.05,
    right: width * 0.05,
    height: 40,
  },
  signInLinkArea: {
    position: 'absolute',
    top: height * 0.60,
    left: width * 0.25,
    right: width * 0.25,
    height: 40,
  },
  socialButtonArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
  },
  signUpButtonArea: {
    position: 'absolute',
    bottom: height * 0.02,
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
  },
});
