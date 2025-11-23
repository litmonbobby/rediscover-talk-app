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
} from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Onboarding'>;

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string[];
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to Rediscover Talk',
    description: 'Your personal mental wellness companion for better mental health',
    icon: '🌱',
    gradient: ['#9eb567', '#87a055'],
  },
  {
    id: 2,
    title: 'Track Your Progress',
    description: 'Monitor your mood, complete daily tasks, and build healthy habits',
    icon: '📊',
    gradient: ['#87a055', '#9eb567'],
  },
  {
    id: 3,
    title: 'Guided Wellness',
    description: 'Access meditation, journaling, and breathing exercises for your mental health',
    icon: '🧘',
    gradient: ['#9eb567', '#b5c889'],
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
              <Animated.Text
                entering={FadeIn.delay(index * 100 + 200).duration(500)}
                style={styles.icon}
              >
                {slide.icon}
              </Animated.Text>
              <Text style={[styles.title, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.secondary
              }]}>
                {slide.title}
              </Text>
              <Text style={[styles.description, {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary
              }]}>
                {slide.description}
              </Text>
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
          <Text style={[styles.skipText, { color: colors.text.tertiary }]}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextButton, {
            backgroundColor: colors.primary.main,
            borderRadius: borderRadius.xl
          }]}
        >
          <Text style={[styles.nextText, {
            color: colors.text.inverse,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.bold
          }]}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 350,
  },
  icon: {
    fontSize: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  skipButton: {
    padding: 12,
  },
  skipText: {
    fontSize: 18,
  },
  nextButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  nextText: {
    fontSize: 18,
  },
});
