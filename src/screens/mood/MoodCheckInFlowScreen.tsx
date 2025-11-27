import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'MoodCheckInFlow'>;

interface Mood {
  id: string;
  emoji: string;
  label: string;
  value: number;
}

interface Reason {
  id: string;
  label: string;
  emoji: string;
}

interface Feeling {
  id: string;
  label: string;
}

const MOODS: Mood[] = [
  { id: 'm1', emoji: '😊', label: 'Amazing', value: 5 },
  { id: 'm2', emoji: '🙂', label: 'Good', value: 4 },
  { id: 'm3', emoji: '😐', label: 'Okay', value: 3 },
  { id: 'm4', emoji: '😔', label: 'Not Good', value: 2 },
  { id: 'm5', emoji: '😞', label: 'Terrible', value: 1 },
];

const REASONS: Reason[] = [
  { id: 'r1', label: 'Work', emoji: '💼' },
  { id: 'r2', label: 'Relationships', emoji: '💕' },
  { id: 'r3', label: 'Health', emoji: '🏥' },
  { id: 'r4', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { id: 'r5', label: 'Finances', emoji: '💰' },
  { id: 'r6', label: 'Personal Growth', emoji: '🌱' },
];

const FEELINGS: Feeling[] = [
  { id: 'f1', label: 'Anxious' },
  { id: 'f2', label: 'Stressed' },
  { id: 'f3', label: 'Overwhelmed' },
  { id: 'f4', label: 'Sad' },
  { id: 'f5', label: 'Frustrated' },
  { id: 'f6', label: 'Tired' },
  { id: 'f7', label: 'Lonely' },
  { id: 'f8', label: 'Worried' },
];

export const MoodCheckInFlowScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialStep = route?.params?.initialStep || 0;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setCurrentStep(1);
  };

  const toggleReason = (reasonId: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reasonId)
        ? prev.filter((id) => id !== reasonId)
        : [...prev, reasonId]
    );
  };

  const toggleFeeling = (feelingId: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(feelingId)
        ? prev.filter((id) => id !== feelingId)
        : [...prev, feelingId]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save mood data and navigate to home
      console.log('Mood saved:', {
        mood: selectedMood,
        reasons: selectedReasons,
        feelings: selectedFeelings,
        notes,
      });
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

  const canContinue = () => {
    if (currentStep === 0) return selectedMood !== null;
    if (currentStep === 1) return selectedReasons.length > 0;
    if (currentStep === 2) return selectedFeelings.length > 0;
    return true; // Notes are optional
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>
            Step {currentStep + 1} of 4
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Step 1: Mood Selection */}
        {currentStep === 0 && (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>How do you feel today?</Text>
            <Text style={styles.questionSubtitle}>
              Select the mood that best describes how you're feeling right now
            </Text>

            <View style={styles.moodGrid}>
              {MOODS.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.moodCard,
                    selectedMood?.id === mood.id && styles.moodCardSelected,
                  ]}
                  onPress={() => handleMoodSelect(mood)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text
                    style={[
                      styles.moodLabel,
                      selectedMood?.id === mood.id && styles.moodLabelSelected,
                    ]}
                  >
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 2: Reason Selection */}
        {currentStep === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>
              What's making you feel this way?
            </Text>
            <Text style={styles.questionSubtitle}>
              Select one or more reasons (tap to toggle)
            </Text>

            <View style={styles.optionsGrid}>
              {REASONS.map((reason) => (
                <TouchableOpacity
                  key={reason.id}
                  style={[
                    styles.reasonCard,
                    selectedReasons.includes(reason.id) &&
                      styles.reasonCardSelected,
                  ]}
                  onPress={() => toggleReason(reason.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.reasonEmoji}>{reason.emoji}</Text>
                  <Text
                    style={[
                      styles.reasonLabel,
                      selectedReasons.includes(reason.id) &&
                        styles.reasonLabelSelected,
                    ]}
                  >
                    {reason.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                !canContinue() && styles.continueButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!canContinue()}
              activeOpacity={0.7}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: Feeling Selection */}
        {currentStep === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>
              What's your exact feeling?
            </Text>
            <Text style={styles.questionSubtitle}>
              Select one or more feelings (tap to toggle)
            </Text>

            <View style={styles.feelingsGrid}>
              {FEELINGS.map((feeling) => (
                <TouchableOpacity
                  key={feeling.id}
                  style={[
                    styles.feelingChip,
                    selectedFeelings.includes(feeling.id) &&
                      styles.feelingChipSelected,
                  ]}
                  onPress={() => toggleFeeling(feeling.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.feelingLabel,
                      selectedFeelings.includes(feeling.id) &&
                        styles.feelingLabelSelected,
                    ]}
                  >
                    {feeling.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                !canContinue() && styles.continueButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!canContinue()}
              activeOpacity={0.7}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 4: Notes */}
        {currentStep === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>Add notes (optional)</Text>
            <Text style={styles.questionSubtitle}>
              What's on your mind? Write down your thoughts or feelings
            </Text>

            <TextInput
              style={styles.notesInput}
              placeholder="Type your thoughts here..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={8}
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleNext}
              activeOpacity={0.7}
            >
              <Text style={styles.continueButtonText}>Save Mood</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleNext}
              activeOpacity={0.7}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        )}
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  stepIndicator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  stepContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  questionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 22,
  },
  moodGrid: {
    gap: 12,
  },
  moodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodCardSelected: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.DEFAULT + '10',
  },
  moodEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  moodLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  moodLabelSelected: {
    color: colors.primary.DEFAULT,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  reasonCard: {
    width: (width - 60) / 2,
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reasonCardSelected: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.DEFAULT + '10',
  },
  reasonEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  reasonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  reasonLabelSelected: {
    color: colors.primary.DEFAULT,
  },
  feelingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  feelingChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  feelingChipSelected: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.DEFAULT + '10',
  },
  feelingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  feelingLabelSelected: {
    color: colors.primary.DEFAULT,
  },
  notesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minHeight: 200,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButton: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  skipButton: {
    marginTop: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});
