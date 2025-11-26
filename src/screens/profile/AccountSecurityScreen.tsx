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

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'AccountSecurity'>;

export const AccountSecurityScreen: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangePassword = () => {
    console.log('Change password');
  };

  const handleTwoFactor = () => {
    console.log('Two-factor authentication');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/124-light-settings-account-security.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Change Password option */}
          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={handleChangePassword}
            activeOpacity={1}
          />

          {/* Two-Factor Authentication option */}
          <TouchableOpacity
            style={styles.twoFactorButton}
            onPress={handleTwoFactor}
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
  changePasswordButton: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  twoFactorButton: {
    position: 'absolute',
    top: 270,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
});
