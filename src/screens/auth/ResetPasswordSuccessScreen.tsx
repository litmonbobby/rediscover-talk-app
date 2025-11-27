import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../../components/core/Button';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'ResetPasswordSuccess'>;

export const ResetPasswordSuccessScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigation.replace('Login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigation]);

  const handleContinue = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('ResetPasswordSuccess', isDarkMode)}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.messageContainer}>
          <Text style={styles.successText}>✓</Text>
          <Text style={styles.titleText}>Password Reset Successful!</Text>
          <Text style={styles.messageText}>
            Your password has been successfully reset.
          </Text>
          <Text style={styles.redirectText}>
            Redirecting to login in {countdown} seconds...
          </Text>
        </View>

        <Button
          title="Continue to Login"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          style={styles.continueButton}
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
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    opacity: 0.15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  messageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 40,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  successText: {
    fontSize: 60,
    color: '#4CAF50',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  redirectText: {
    fontSize: 14,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  continueButton: {
    marginHorizontal: 0,
  },
});
