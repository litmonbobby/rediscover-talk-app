import React, { useState } from 'react';
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

type Props = NativeStackScreenProps<any, 'SignUpSteps'>;

interface SignUpStep {
  id: number;
  image: any;
}

const signUpSteps: SignUpStep[] = [
  {
    id: 1,
    image: require('../../figma-extracted/assets/screens/light-theme/9-light-sign-up-step-1-form.png'),
  },
  {
    id: 2,
    image: require('../../figma-extracted/assets/screens/light-theme/10-light-sign-up-step-2-form.png'),
  },
  {
    id: 3,
    image: require('../../figma-extracted/assets/screens/light-theme/11-light-sign-up-step-3-form.png'),
  },
  {
    id: 4,
    image: require('../../figma-extracted/assets/screens/light-theme/12-light-sign-up-step-4-form.png'),
  },
  {
    id: 5,
    image: require('../../figma-extracted/assets/screens/light-theme/13-light-sign-up-step-5-form.png'),
  },
  {
    id: 6,
    image: require('../../figma-extracted/assets/screens/light-theme/14-light-sign-up-step-6-form.png'),
  },
  {
    id: 7,
    image: require('../../figma-extracted/assets/screens/light-theme/15-light-sign-up-step-7-form.png'),
  },
  {
    id: 8,
    image: require('../../figma-extracted/assets/screens/light-theme/16-light-sign-up-step-8-form.png'),
  },
  {
    id: 9,
    image: require('../../figma-extracted/assets/screens/light-theme/17-light-sign-up-step-9-form.png'),
  },
  {
    id: 10,
    image: require('../../figma-extracted/assets/screens/light-theme/18-light-sign-up-step-10-form.png'),
  },
];

export const SignUpStepsScreen: React.FC<Props> = ({ navigation, route }) => {
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

  const currentScreenImage = signUpSteps[currentStep].image;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={currentScreenImage}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button - top left */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Continue/Next button - bottom center/right */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleNext}
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
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
