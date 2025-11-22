/**
 * WalkthroughScreen (Onboarding)
 * 3-slide introduction to the app
 * Reference: Figma screens 2-4 (light-walkthrough-1/2/3.png)
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Button } from '../../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type WalkthroughScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Walkthrough'
>;

interface WalkthroughScreenProps {
  navigation: WalkthroughScreenNavigationProp;
}

interface Slide {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Track Your Mood',
    description: 'Monitor your emotional well-being daily and discover patterns in your mental health journey.',
    emoji: '😊',
  },
  {
    id: '2',
    title: 'Meditate & Relax',
    description: 'Access guided meditations, breathing exercises, and sleep sounds to find your inner peace.',
    emoji: '🧘',
  },
  {
    id: '3',
    title: 'Journal Your Thoughts',
    description: 'Express yourself through journaling and gain insights into your thoughts and feelings.',
    emoji: '📝',
  },
];

export function WalkthroughScreen({ navigation }: WalkthroughScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace('Welcome');
    }
  };

  const handleSkip = () => {
    navigation.replace('Welcome');
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
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
      />

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

      {/* Next/Get Started Button */}
      <View style={styles.footer}>
        <Button
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  skipButton: {
    position: 'absolute',
    top: 60,
    right: theme.spacing.lg,
    zIndex: 10,
    padding: theme.spacing.sm,
  },

  skipText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary.DEFAULT,
  },

  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing['2xl'],
  },

  emoji: {
    fontSize: 100,
    marginBottom: theme.spacing.xl,
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },

  description: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary[200],
    marginHorizontal: theme.spacing.xs,
  },

  dotActive: {
    width: 24,
    backgroundColor: theme.colors.primary.DEFAULT,
  },

  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing['2xl'],
  },
});
