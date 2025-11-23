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

type Props = NativeStackScreenProps<any, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/5-light-welcome-screen.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Invisible touchable areas for buttons */}

        {/* Google button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.42 }]}
          onPress={handleGoogleSignIn}
          activeOpacity={1}
        />

        {/* Apple button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.50 }]}
          onPress={handleAppleSignIn}
          activeOpacity={1}
        />

        {/* Facebook button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.58 }]}
          onPress={handleFacebookSignIn}
          activeOpacity={1}
        />

        {/* X/Twitter button area */}
        <TouchableOpacity
          style={[styles.socialButtonArea, { top: height * 0.66 }]}
          onPress={handleTwitterSignIn}
          activeOpacity={1}
        />

        {/* Sign up button area */}
        <TouchableOpacity
          style={styles.signUpButtonArea}
          onPress={handleSignUp}
          activeOpacity={1}
        />

        {/* Sign in link area */}
        <TouchableOpacity
          style={styles.signInLinkArea}
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
  socialButtonArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
  },
  signUpButtonArea: {
    position: 'absolute',
    bottom: height * 0.15,
    left: width * 0.05,
    right: width * 0.05,
    height: 60,
  },
  signInLinkArea: {
    position: 'absolute',
    bottom: height * 0.08,
    left: width * 0.35,
    right: width * 0.35,
    height: 40,
  },
});
