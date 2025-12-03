/**
 * Onboarding Screen - Exact Figma Recreation
 * Proper React Native components with Figma-extracted assets
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

// Figma-extracted illustrations for each onboarding step
const illustrations = {
  step1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-14-component-illustrations-set.png'),
  step2: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-28-component-illustrations-set.png'),
  step3: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-29-component-illustrations-set.png'),
};

// Onboarding slide data
interface OnboardingSlide {
  id: string;
  illustration: any;
  title: string;
  description: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    illustration: illustrations.step1,
    title: 'Track Your Mood',
    description: 'Record how you feel each day and discover patterns in your emotional wellbeing over time.',
  },
  {
    id: '2',
    illustration: illustrations.step2,
    title: 'Guided Meditations',
    description: 'Access a library of calming meditations designed to reduce stress and promote mindfulness.',
  },
];

// Pagination Dot Component
interface PaginationDotProps {
  active: boolean;
  colors: any;
}

const PaginationDot: React.FC<PaginationDotProps> = ({ active, colors }) => (
  <View
    style={[
      styles.paginationDot,
      {
        backgroundColor: active ? '#9EB567' : colors.border.light,
        width: active ? 24 : 8,
      },
    ]}
  />
);

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleSkip = () => {
    navigation.replace('Welcome');
  };

  const handleContinue = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace('Welcome');
    }
  };

  const isLastSlide = currentIndex === slides.length - 1;

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      {/* Illustration Container */}
      <View style={styles.illustrationContainer}>
        <Image
          source={item.illustration}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header with Skip Button */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          {!isLastSlide && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              activeOpacity={0.7}
            >
              <Text style={[styles.skipButtonText, { color: colors.text.secondary }]}>
                Skip
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Slides Carousel */}
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}
          style={styles.flatList}
        />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {slides.map((_, index) => (
              <PaginationDot
                key={index}
                active={index === currentIndex}
                colors={colors}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.buttonsContainer}>
            {isLastSlide ? (
              // Last slide - full width "Get Started" button
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Let's Get Started</Text>
              </TouchableOpacity>
            ) : (
              // Other slides - Skip and Continue buttons
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.secondaryButton,
                    { borderColor: '#9EB567' },
                  ]}
                  onPress={handleSkip}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.secondaryButtonText, { color: '#9EB567' }]}>
                    Skip
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.primaryButton]}
                  onPress={handleContinue}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerSpacer: {
    width: 60,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },

  // FlatList
  flatList: {
    flex: 1,
  },

  // Slide
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingHorizontal: 32,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  illustration: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.65,
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  // Bottom Section
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    minHeight: 180,
  },

  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },

  // Buttons
  buttonsContainer: {
    gap: 12,
    minHeight: 56,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    minHeight: 56,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#9EB567',
    shadowColor: '#9EB567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
