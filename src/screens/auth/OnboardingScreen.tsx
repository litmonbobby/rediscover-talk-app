import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Onboarding'>;

interface OnboardingSlide {
  id: number;
  image: any; // Complete Figma screen design
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    image: require('../../figma-extracted/assets/screens/light-theme/2-light-walkthrough-1.png'),
  },
  {
    id: 2,
    image: require('../../figma-extracted/assets/screens/light-theme/3-light-walkthrough-2.png'),
  },
  {
    id: 3,
    image: require('../../figma-extracted/assets/screens/light-theme/4-light-walkthrough-3.png'),
  },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    } else {
      navigation.replace('Welcome');
    }
  };

  const handleSkip = () => {
    navigation.replace('Welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <Image
              source={slide.image}
              style={styles.fullScreenImage}
              resizeMode="cover"
            />

            {/* Skip button - only on slides 1 and 2 */}
            {index < 2 && (
              <TouchableOpacity
                style={styles.skipButtonArea}
                onPress={handleSkip}
                activeOpacity={1}
              />
            )}

            {/* Continue button - slides 1 and 2 */}
            {index < 2 && (
              <TouchableOpacity
                style={styles.continueButtonArea}
                onPress={handleNext}
                activeOpacity={1}
              />
            )}

            {/* Let's Get Started button - only on slide 3 */}
            {index === 2 && (
              <TouchableOpacity
                style={styles.getStartedButtonArea}
                onPress={handleNext}
                activeOpacity={1}
              />
            )}
          </View>
        ))}
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
  slide: {
    width,
    height,
  },
  fullScreenImage: {
    width,
    height,
  },
  skipButtonArea: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    width: 100,
    height: 60,
  },
  continueButtonArea: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: width * 0.55,
    height: 70,
  },
  getStartedButtonArea: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.08,
    right: width * 0.08,
    height: 70,
  },
});
