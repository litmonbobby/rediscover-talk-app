import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'ResetPasswordSuccess'>;

export const ResetPasswordSuccessScreen: React.FC<Props> = ({ navigation }) => {
  const handleContinue = () => {
    // Navigate to login screen
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/26-light-reset-password-successful.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Continue button - bottom */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
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
    width,
    height,
  },
  fullScreenImage: {
    width,
    height,
  },
  continueButton: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    zIndex: 10,
  },
});
