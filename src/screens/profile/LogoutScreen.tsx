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

type Props = NativeStackScreenProps<any, 'Logout'>;

export const LogoutScreen: React.FC<Props> = ({ navigation }) => {
  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirmLogout = () => {
    console.log('Logging out...');
    // Clear user session, navigate to login/onboarding
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/138-light-settings-logout.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Semi-transparent overlay for modal effect */}
          <View style={styles.overlay} />

          {/* Cancel button */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={1}
          />

          {/* Confirm logout button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleConfirmLogout}
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
  },
  cancelButton: {
    position: 'absolute',
    top: height * 0.5,
    left: width * 0.1,
    width: width * 0.35,
    height: 60,
    zIndex: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: height * 0.5,
    right: width * 0.1,
    width: width * 0.35,
    height: 60,
    zIndex: 10,
  },
});
