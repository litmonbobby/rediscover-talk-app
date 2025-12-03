/**
 * Mood Check-In Screen - Exact Figma Recreation
 * Matches 28-light-how-do-you-feel-today-not-good.png and 29-light-how-do-you-feel-today-good.png
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { useMoodStore, MoodLevel, MoodName } from '../../store/moodStore';
import { GlassCard } from '../../components/core/GlassCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type MoodStackParamList = {
  MoodCheckIn: undefined;
  MoodReason: undefined;
  MoodFeeling: undefined;
  MoodNotes: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<MoodStackParamList, 'MoodCheckIn'>;

// Mood indicator assets
const moodAssets = {
  bad: require('../../figma-extracted/assets/components/mood-indicators/mood-bad-component-mood-indicator.png'),
  notGood: require('../../figma-extracted/assets/components/mood-indicators/mood-not-good-component-mood-indicator.png'),
  okay: require('../../figma-extracted/assets/components/mood-indicators/mood-okay-component-mood-indicator.png'),
  good: require('../../figma-extracted/assets/components/mood-indicators/mood-good-component-mood-indicator.png'),
  great: require('../../figma-extracted/assets/components/mood-indicators/mood-great-component-mood-indicator.png'),
};

// Mood data matching Figma design
interface MoodItem {
  id: number;
  name: string;
  image: any;
  color: string;
}

const moods: MoodItem[] = [
  { id: 1, name: 'Bad', image: moodAssets.bad, color: '#FF6B6B' },
  { id: 2, name: 'Not Good', image: moodAssets.notGood, color: '#FFA06B' },
  { id: 3, name: 'Okay', image: moodAssets.okay, color: '#FFD36B' },
  { id: 4, name: 'Good', image: moodAssets.good, color: '#9EB567' },
  { id: 5, name: 'Great', image: moodAssets.great, color: '#6BCB77' },
];

// Close Icon
const CloseIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6L18 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MoodCheckInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  // Get moodStore actions
  const { setMoodLevel, resetCurrentCheckIn, initialize, isInitialized } = useMoodStore();

  // Initialize moodStore on mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
    // Reset current check-in when screen mounts
    resetCurrentCheckIn();
  }, []);

  const handleClose = () => {
    resetCurrentCheckIn();
    navigation.goBack();
  };

  const handleMoodSelect = (moodId: number) => {
    setSelectedMood(moodId);
    // Map mood id to level and name
    const moodMap: Record<number, { level: MoodLevel; name: MoodName }> = {
      1: { level: 1, name: 'Bad' },
      2: { level: 2, name: 'Not Good' },
      3: { level: 3, name: 'Okay' },
      4: { level: 4, name: 'Good' },
      5: { level: 5, name: 'Great' },
    };
    const mood = moodMap[moodId];
    if (mood) {
      setMoodLevel(mood.level, mood.name);
    }
  };

  const handleContinue = () => {
    if (selectedMood) {
      navigation.navigate('MoodReason');
    }
  };

  const handleSkip = () => {
    resetCurrentCheckIn();
    navigation.goBack();
  };

  const selectedMoodData = moods.find((m) => m.id === selectedMood);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <CloseIcon size={24} color={colors.text.primary} />
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.text.primary }]}>
          How do you feel today?
        </Text>

        {/* Selected Mood Display */}
        <View style={styles.selectedMoodContainer}>
          {selectedMood ? (
            <>
              <Image
                source={selectedMoodData?.image}
                style={styles.selectedMoodImage}
                resizeMode="contain"
              />
              <Text style={[styles.selectedMoodText, { color: selectedMoodData?.color }]}>
                {selectedMoodData?.name}
              </Text>
            </>
          ) : (
            <View style={styles.placeholderCircle}>
              <Text style={[styles.placeholderText, { color: colors.text.secondary }]}>
                Select a mood
              </Text>
            </View>
          )}
        </View>

        {/* Mood Selector Row - Liquid Glass */}
        <GlassCard variant="regular" style={styles.moodSelectorCard} padding={20} borderRadius={24}>
          <View style={styles.moodRow}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodButton,
                  selectedMood === mood.id && styles.moodButtonSelected,
                  selectedMood === mood.id && { borderColor: mood.color },
                ]}
                onPress={() => handleMoodSelect(mood.id)}
                activeOpacity={0.7}
              >
                <Image source={mood.image} style={styles.moodImage} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Mood Labels */}
          <View style={styles.moodLabelsRow}>
            <Text style={[styles.moodLabel, { color: colors.text.secondary }]}>Bad</Text>
            <Text style={[styles.moodLabel, { color: colors.text.secondary }]}>Great</Text>
          </View>
        </GlassCard>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Skip Button */}
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.text.secondary }]}>Skip</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: selectedMood ? '#9EB567' : colors.background.secondary },
          ]}
          onPress={handleContinue}
          disabled={!selectedMood}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.continueButtonText,
              { color: selectedMood ? '#FFFFFF' : colors.text.secondary },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 48,
  },
  selectedMoodContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginBottom: 48,
  },
  selectedMoodImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  selectedMoodText: {
    fontSize: 24,
    fontWeight: '600',
  },
  placeholderCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 14,
    textAlign: 'center',
  },
  moodSelectorCard: {
    marginHorizontal: 16,
    width: SCREEN_WIDTH - 48,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  moodButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    borderWidth: 3,
  },
  moodImage: {
    width: 48,
    height: 48,
  },
  moodLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  moodLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  continueButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MoodCheckInScreen;
