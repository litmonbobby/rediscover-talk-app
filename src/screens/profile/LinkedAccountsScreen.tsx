import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'LinkedAccounts'>;

export const LinkedAccountsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConnectGoogle = () => {
    console.log('Connect Google account');
  };

  const handleConnectApple = () => {
    console.log('Connect Apple account');
  };

  const handleConnectFacebook = () => {
    console.log('Connect Facebook account');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={getThemedScreenImage('LinkedAccounts', isDarkMode)}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Google account option */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleConnectGoogle}
            activeOpacity={1}
          />

          {/* Apple account option */}
          <TouchableOpacity
            style={styles.appleButton}
            onPress={handleConnectApple}
            activeOpacity={1}
          />

          {/* Facebook account option */}
          <TouchableOpacity
            style={styles.facebookButton}
            onPress={handleConnectFacebook}
            activeOpacity={1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    width,
    minHeight: height,
  },
  fullScreenImage: {
    width,
    height: height * 1.2,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  googleButton: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  appleButton: {
    position: 'absolute',
    top: 270,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  facebookButton: {
    position: 'absolute',
    top: 360,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
});
