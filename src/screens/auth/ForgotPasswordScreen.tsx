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

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'ForgotPassword'>;

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('EnterOTP', { email: formData.email });
    }, 1500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/23-light-forgot-password.png')}
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
            {/* Real Input Component */}
            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              error={errors.email}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.input}
            />

            {/* Real Send Code Button */}
            <Button
              title="Send Code"
              onPress={handleSendCode}
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              style={styles.sendButton}
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
    marginBottom: 24,
  },
  sendButton: {
    marginTop: 8,
  },
});
