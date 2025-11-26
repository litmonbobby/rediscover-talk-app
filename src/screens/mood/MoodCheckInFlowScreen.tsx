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

type Props = NativeStackScreenProps<any, 'MoodCheckInFlow'>;

interface MoodStep {
  id: number;
  image: any;
}

const moodSteps: MoodStep[] = [
  {
    id: 1,
    image: require('../../figma-extracted/assets/screens/light-theme/28-light-how-do-you-feel-today-not-good.png'),
  },
  {
    id: 2,
    image: require('../../figma-extracted/assets/screens/light-theme/30-light-what-is-the-reason-that-makes-you-feel-that-way-.png'),
  },
  {
    id: 3,
    image: require('../../figma-extracted/assets/screens/light-theme/31-light-what-is-your-exact-feeling-.png'),
  },
  {
    id: 4,
    image: require('../../figma-extracted/assets/screens/light-theme/32-light-add-notes.png'),
  },
];

export const MoodCheckInFlowScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialStep = route?.params?.initialStep || 0;
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleNext = () => {
    if (currentStep < moodSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate back to home or mood history
      navigation.navigate('Home');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const currentScreenImage = moodSteps[currentStep].image;

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

        {/* Mood selection buttons - center area (step 1) */}
        {currentStep === 0 && (
          <View style={styles.moodButtonsArea}>
            {/* Not Good mood button */}
            <TouchableOpacity
              style={styles.moodButton}
              onPress={handleNext}
              activeOpacity={1}
            />
          </View>
        )}

        {/* Continue/Next button - bottom */}
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleNext}
            activeOpacity={1}
          />
        )}
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
  moodButtonsArea: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.1,
    right: width * 0.1,
    height: height * 0.3,
    zIndex: 10,
  },
  moodButton: {
    width: width * 0.8,
    height: 80,
    marginVertical: 10,
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
