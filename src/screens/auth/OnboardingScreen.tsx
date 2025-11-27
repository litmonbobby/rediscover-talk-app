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
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Onboarding'>;

interface OnboardingSlide {
  id: number;
  screenKey: 'Walkthrough1' | 'Walkthrough2' | 'Walkthrough3';
}

const slides: OnboardingSlide[] = [
  { id: 1, screenKey: 'Walkthrough1' },
  { id: 2, screenKey: 'Walkthrough2' },
  { id: 3, screenKey: 'Walkthrough3' },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
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
              source={getThemedScreenImage(slide.screenKey, isDarkMode)}
              style={styles.fullScreenImage}
              resizeMode="cover"
            />

            {/* Skip button - all slides (invisible overlay over Figma button) */}
            <TouchableOpacity
              style={styles.skipButtonArea}
              onPress={handleSkip}
              activeOpacity={1}
            />

            {/* Continue button - all slides (invisible overlay over Figma button) */}
            <TouchableOpacity
              style={styles.continueButtonArea}
              onPress={handleNext}
              activeOpacity={1}
            />
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
    zIndex: 10,
  },
  continueButtonArea: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: width * 0.55,
    height: 70,
    zIndex: 10,
  },
});
