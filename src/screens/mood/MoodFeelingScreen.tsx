/**
 * Mood Feeling Screen - Step 3 of Mood Check-in Flow
 * "What emotions are you feeling?"
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { useMoodStore, MOOD_FEELINGS, MoodFeelingId } from '../../store/moodStore';

type MoodStackParamList = {
  MoodCheckIn: undefined;
  MoodReason: undefined;
  MoodFeeling: undefined;
  MoodNotes: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<MoodStackParamList, 'MoodFeeling'>;

// Back Arrow Icon
const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MoodFeelingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const { currentCheckIn, toggleFeeling } = useMoodStore();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate('MoodNotes');
  };

  const handleSkip = () => {
    navigation.navigate('MoodNotes');
  };

  const isSelected = (feelingId: MoodFeelingId) => {
    return currentCheckIn.feelings.includes(feelingId);
  };

  // Group feelings by positive/negative for better UX
  const positiveEmotions = MOOD_FEELINGS.filter(f =>
    ['happy', 'calm', 'excited', 'grateful', 'hopeful'].includes(f.id)
  );
  const negativeEmotions = MOOD_FEELINGS.filter(f =>
    ['anxious', 'sad', 'angry', 'tired', 'stressed', 'lonely', 'confused'].includes(f.id)
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotCompleted]} />
          <View style={[styles.progressDot, styles.progressDotCompleted]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, { backgroundColor: colors.background.secondary }]} />
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={[styles.title, { color: colors.text.primary }]}>
          What emotions are you feeling?
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Select all that apply
        </Text>

        {/* Positive Emotions */}
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          Positive
        </Text>
        <View style={styles.emotionsGrid}>
          {positiveEmotions.map((feeling) => (
            <TouchableOpacity
              key={feeling.id}
              style={[
                styles.emotionButton,
                { backgroundColor: colors.background.card },
                isSelected(feeling.id) && styles.emotionButtonSelected,
                isSelected(feeling.id) && { borderColor: '#6BCB77' },
              ]}
              onPress={() => toggleFeeling(feeling.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.emotionIcon}>{feeling.icon}</Text>
              <Text
                style={[
                  styles.emotionLabel,
                  { color: isSelected(feeling.id) ? '#6BCB77' : colors.text.primary },
                ]}
              >
                {feeling.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Negative Emotions */}
        <Text style={[styles.sectionTitle, { color: colors.text.secondary, marginTop: 24 }]}>
          Challenging
        </Text>
        <View style={styles.emotionsGrid}>
          {negativeEmotions.map((feeling) => (
            <TouchableOpacity
              key={feeling.id}
              style={[
                styles.emotionButton,
                { backgroundColor: colors.background.card },
                isSelected(feeling.id) && styles.emotionButtonSelected,
                isSelected(feeling.id) && { borderColor: '#FFA06B' },
              ]}
              onPress={() => toggleFeeling(feeling.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.emotionIcon}>{feeling.icon}</Text>
              <Text
                style={[
                  styles.emotionLabel,
                  { color: isSelected(feeling.id) ? '#FFA06B' : colors.text.primary },
                ]}
              >
                {feeling.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.text.secondary }]}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: '#9EB567' },
          ]}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressDotCompleted: {
    backgroundColor: '#9EB567',
  },
  progressDotActive: {
    backgroundColor: '#9EB567',
    width: 24,
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  emotionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emotionButtonSelected: {
    backgroundColor: 'rgba(158, 181, 103, 0.1)',
  },
  emotionIcon: {
    fontSize: 20,
  },
  emotionLabel: {
    fontSize: 15,
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
    color: '#FFFFFF',
  },
});

export default MoodFeelingScreen;
