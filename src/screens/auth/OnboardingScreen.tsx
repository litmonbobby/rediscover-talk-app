import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Onboarding'>;

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: any; // Figma PNG image
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Your Personalized Mental\nWellness Companion',
    description: 'Discover personalized mental health plans tailored just for you by our AI. Track your mood and explore a world of wellness resources.',
    image: require('../../figma-extracted/assets/screens/light-theme/2-light-walkthrough-1.png'),
  },
  {
    id: 2,
    title: 'Dive and Explore Your\nPath to Wellness',
    description: 'Explore meditation exercises, breathing techniques, articles, courses, journals, and mindfulness resources to find your center.',
    image: require('../../figma-extracted/assets/screens/light-theme/3-light-walkthrough-2.png'),
  },
  {
    id: 3,
    title: 'Gain Insights and Track\nProgress Overtime',
    description: 'Gain valuable insights into your well-being with mood tracking, growth area reports, and life balance graphs overtime.',
    image: require('../../figma-extracted/assets/screens/light-theme/4-light-walkthrough-3.png'),
  },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { colors, typography, spacing, borderRadius } = useTheme();

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
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            style={[styles.slide, { backgroundColor: colors.background.primary }]}
          >
            <Animated.View
              entering={FadeInUp.delay(index * 100).springify()}
              style={styles.content}
            >
              {/* iPhone Mockup Image from Figma */}
              <Animated.View
                entering={FadeIn.delay(index * 100 + 200).duration(500)}
                style={styles.imageContainer}
              >
                <Image
                  source={slide.image}
                  style={styles.mockupImage}
                  resizeMode="contain"
                />
              </Animated.View>

              {/* Title and Description */}
              <View style={styles.textContainer}>
                <Text style={[styles.title, {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.secondary,
                  fontWeight: typography.fontWeight.bold
                }]}>
                  {slide.title}
                </Text>
                <Text style={[styles.description, {
                  color: colors.text.secondary,
                  fontFamily: typography.fontFamily.primary
                }]}>
                  {slide.description}
                </Text>
              </View>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <Animated.View
        entering={FadeIn.delay(300).duration(500)}
        style={styles.pagination}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: colors.border.main },
              index === currentIndex && {
                backgroundColor: colors.primary.main,
                width: 24
              },
            ]}
          />
        ))}
      </Animated.View>

      {/* Navigation Buttons */}
      <Animated.View
        entering={FadeInUp.delay(400).springify()}
        style={styles.footer}
      >
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={[styles.skipText, {
            color: colors.text.tertiary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.continueButton, {
            backgroundColor: colors.primary.main,
            borderRadius: borderRadius.xl
          }]}
        >
          <Text style={[styles.continueText, {
            color: colors.text.inverse,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.bold
          }]}>
            {currentIndex === slides.length - 1 ? "Let's Get Started" : 'Continue'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: height * 0.5,
  },
  mockupImage: {
    width: width * 0.7,
    height: height * 0.5,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  skipButton: {
    padding: 12,
  },
  skipText: {
    fontSize: 16,
  },
  continueButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  continueText: {
    fontSize: 16,
  },
});
