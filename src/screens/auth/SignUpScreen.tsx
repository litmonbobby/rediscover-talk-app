import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from '../../components/core/Input';
import { Button } from '../../components/core/Button';
import { Checkbox } from '../../components/core/Checkbox';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'SignUp'>;

interface FormData {
  email: string;
  password: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  terms?: string;
}

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    agreedToTerms: false,
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

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Terms validation
    if (!formData.agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.replace('GoalSelection');
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    navigation.replace('GoalSelection');
  };

  const handleAppleSignIn = () => {
    navigation.replace('GoalSelection');
  };

  const handleFacebookSignIn = () => {
    navigation.replace('GoalSelection');
  };

  const handleTwitterSignIn = () => {
    navigation.replace('GoalSelection');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/6-light-sign-up-blank-form.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

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
            {/* Real Input Components */}
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

            <Input
              label="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              error={errors.password}
              placeholder="Create a password"
              secureTextEntry
              containerStyle={styles.input}
            />

            {/* Real Checkbox Component */}
            <View style={styles.termsContainer}>
              <Checkbox
                checked={formData.agreedToTerms}
                onChange={(checked) => setFormData({ ...formData, agreedToTerms: checked })}
                label="I agree to the Terms & Conditions"
              />
              {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}
            </View>

            {/* Real Sign Up Button */}
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              style={styles.signUpButton}
            />

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <Text style={styles.orText}>Or continue with</Text>

              <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignIn}>
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} onPress={handleTwitterSignIn}>
                <Text style={styles.socialButtonText}>Continue with X</Text>
              </TouchableOpacity>
            </View>
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
    opacity: 0.15, // Reduce opacity so form is visible
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
    marginBottom: 20,
  },
  termsContainer: {
    marginVertical: 16,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    marginLeft: 28,
  },
  signUpButton: {
    marginTop: 8,
    marginBottom: 20,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signInText: {
    fontSize: 14,
    color: '#666',
  },
  signInLink: {
    fontSize: 14,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  socialContainer: {
    marginTop: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  orText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
