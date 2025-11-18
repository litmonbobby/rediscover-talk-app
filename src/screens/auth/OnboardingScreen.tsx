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
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
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
    title: 'Track Your Mood',
    description: 'Monitor your emotional well-being with daily mood check-ins and insights',
    icon: '😊',
    gradient: [colors.primary.cobaltBlue, colors.primary.darkBlue],
  },
  {
    id: 2,
    title: 'Guided Meditation',
    description: 'Access a library of meditation sessions designed to reduce stress and anxiety',
    icon: '🧘',
    gradient: [colors.primary.darkBlue, colors.accent.lime],
  },
  {
    id: 3,
    title: 'Journal Your Journey',
    description: 'Reflect on your thoughts and track your progress with therapeutic journaling',
    icon: '📝',
    gradient: [colors.accent.lime, colors.primary.cobaltBlue],
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
      navigation.replace('SignUp');
    }
  };

  const handleSkip = () => {
    navigation.replace('SignUp');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide) => (
          <LinearGradient
            key={slide.id}
            colors={slide.gradient}
            style={styles.slide}
          >
            <View style={styles.content}>
              <Text style={styles.icon}>{slide.icon}</Text>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.cobaltBlue,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 350,
  },
  icon: {
    fontSize: 120,
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: typography.fontSize.lg * typography.lineHeight.relaxed,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.accent.lime,
    width: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  skipButton: {
    padding: spacing.md,
  },
  skipText: {
    fontSize: typography.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: typography.fontWeight.medium,
  },
  nextButton: {
    backgroundColor: colors.accent.lime,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: spacing.borderRadius.xl,
  },
  nextText: {
    fontSize: typography.fontSize.lg,
    color: colors.primary.cobaltBlue,
    fontWeight: typography.fontWeight.bold,
  },
});
