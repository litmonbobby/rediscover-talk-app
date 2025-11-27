import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
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

type Props = NativeStackScreenProps<any, 'SignUpSteps'>;

type SignUpStepKey = 'SignUpStep1' | 'SignUpStep2' | 'SignUpStep3' | 'SignUpStep4' | 'SignUpStep5' | 'SignUpStep6' | 'SignUpStep7' | 'SignUpStep8' | 'SignUpStep9' | 'SignUpStep10';

interface SignUpStep {
  id: number;
  screenKey: SignUpStepKey;
  title: string;
}

const signUpSteps: SignUpStep[] = [
  { id: 1, screenKey: 'SignUpStep1', title: 'Personal Information' },
  { id: 2, screenKey: 'SignUpStep2', title: 'Contact Details' },
  { id: 3, screenKey: 'SignUpStep3', title: 'Wellness Goals' },
  { id: 4, screenKey: 'SignUpStep4', title: 'Mental Health History' },
  { id: 5, screenKey: 'SignUpStep5', title: 'Daily Routine' },
  { id: 6, screenKey: 'SignUpStep6', title: 'Preferences' },
  { id: 7, screenKey: 'SignUpStep7', title: 'Notification Settings' },
  { id: 8, screenKey: 'SignUpStep8', title: 'Privacy Settings' },
  { id: 9, screenKey: 'SignUpStep9', title: 'Review Information' },
  { id: 10, screenKey: 'SignUpStep10', title: 'Terms & Conditions' },
];

export const SignUpStepsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const initialStep = route?.params?.initialStep || 0;
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleNext = () => {
    if (currentStep < signUpSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to preparing personalized plans screen
      navigation.replace('PreparingPlans');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const progress = ((currentStep + 1) / signUpSteps.length) * 100;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage(signUpSteps[currentStep].screenKey, isDarkMode)}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepText}>
          Step {currentStep + 1} of {signUpSteps.length}
        </Text>
        <Text style={styles.stepTitle}>{signUpSteps[currentStep].title}</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <Button
          title={currentStep === signUpSteps.length - 1 ? 'Finish' : 'Continue'}
          onPress={handleNext}
          variant="primary"
          size="large"
          fullWidth
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
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#E0E0E0',
    zIndex: 100,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary.DEFAULT,
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
  stepIndicator: {
    position: 'absolute',
    top: 120,
    left: 24,
    right: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5,
  },
  stepText: {
    fontSize: 14,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    zIndex: 10,
  },
});
