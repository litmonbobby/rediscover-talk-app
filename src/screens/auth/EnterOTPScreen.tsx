import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from '../../components/core/Input';
import { Button } from '../../components/core/Button';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'EnterOTP'>;

interface FormData {
  otp: string;
}

interface FormErrors {
  otp?: string;
}

export const EnterOTPScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    otp: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // OTP validation (6 digits)
    if (!formData.otp) {
      newErrors.otp = 'OTP code is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerify = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CreateNewPassword');
    }, 1500);
  };

  const handleResendOTP = async () => {
    setResending(true);

    // Simulate API call
    setTimeout(() => {
      setResending(false);
      // Show success message (could use a toast/alert here)
      console.log('OTP resent successfully');
    }, 1500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('EnterOTP', isDarkMode)}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {/* Real OTP Input Component */}
            <Input
              label="OTP Code"
              value={formData.otp}
              onChangeText={(text) => setFormData({ ...formData, otp: text })}
              error={errors.otp}
              placeholder="Enter 6-digit code"
              keyboardType="number-pad"
              maxLength={6}
              containerStyle={styles.input}
            />

            {/* Resend OTP Link */}
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={resending}
              style={styles.resendContainer}
            >
              <Text style={styles.resendText}>
                {resending ? 'Sending...' : "Didn't receive code? Resend"}
              </Text>
            </TouchableOpacity>

            {/* Real Verify Button */}
            <Button
              title="Verify"
              onPress={handleVerify}
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              style={styles.verifyButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  input: {
    marginBottom: 16,
  },
  resendContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  verifyButton: {
    marginTop: 8,
  },
});
