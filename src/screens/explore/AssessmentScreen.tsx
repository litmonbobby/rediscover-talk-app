/**
 * Assessment Screen - Interactive Mental Health Assessment
 * Displays questions one at a time with progress tracking
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { GlassCard } from '../../components/core/GlassCard';
import { Assessment, AssessmentQuestion, getAssessmentById, calculateScore, getResult } from '../../data/assessments';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ExploreStackParamList = {
  Assessment: { assessmentId: string };
  AssessmentResult: {
    assessmentId: string;
    score: number;
    answers: Record<string, number>;
  };
};

type NavigationProp = NativeStackNavigationProp<ExploreStackParamList, 'Assessment'>;
type AssessmentRouteProp = RouteProp<ExploreStackParamList, 'Assessment'>;

export const AssessmentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AssessmentRouteProp>();
  const { colors, isDarkMode } = useTheme();

  const { assessmentId } = route.params;
  const assessment = getAssessmentById(assessmentId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Animation values
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    if (assessment) {
      const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;
      progressWidth.value = withTiming(progress, { duration: 300 });
    }
  }, [currentQuestionIndex, assessment]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  if (!assessment) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.errorText, { color: colors.text.primary }]}>
          Assessment not found
        </Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const totalQuestions = assessment.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleOptionSelect = (value: number) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // Save the answer
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOption,
    };
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Calculate final score and navigate to results
      const finalScore = calculateScore(assessment, updatedAnswers);
      navigation.replace('AssessmentResult', {
        assessmentId,
        score: finalScore,
        answers: updatedAnswers,
      });
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Restore previous answer
      const prevQuestion = assessment.questions[currentQuestionIndex - 1];
      setSelectedOption(answers[prevQuestion.id] ?? null);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>
            {currentQuestionIndex > 0 ? '←' : '✕'}
          </Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            {assessment.title}
          </Text>
          <Text style={[styles.questionCount, { color: colors.text.secondary }]}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressContainer, { backgroundColor: colors.background.secondary }]}>
        <Animated.View
          style={[
            styles.progressBar,
            { backgroundColor: assessment.color },
            progressStyle,
          ]}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Text */}
        <Animated.View
          key={currentQuestion.id}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={[styles.questionText, { color: colors.text.primary }]}>
            {currentQuestion.text}
          </Text>
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === option.value;
            return (
              <TouchableOpacity
                key={`${currentQuestion.id}-${index}`}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: isSelected
                      ? assessment.color
                      : colors.background.card,
                    borderColor: isSelected
                      ? assessment.color
                      : colors.border.light,
                  },
                ]}
                onPress={() => handleOptionSelect(option.value)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: isSelected ? '#FFFFFF' : colors.text.tertiary,
                    },
                  ]}
                >
                  {isSelected && (
                    <View
                      style={[
                        styles.radioInner,
                        { backgroundColor: '#FFFFFF' },
                      ]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.text.primary,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: colors.background.primary }]}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: selectedOption !== null
                ? assessment.color
                : colors.background.secondary,
            },
          ]}
          onPress={handleNext}
          disabled={selectedOption === null}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.nextButtonText,
              {
                color: selectedOption !== null
                  ? '#FFFFFF'
                  : colors.text.tertiary,
              },
            ]}
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </Text>
        </TouchableOpacity>

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: colors.text.tertiary }]}>
          Your responses are private and secure
        </Text>
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
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  questionCount: {
    fontSize: 12,
  },
  placeholder: {
    width: 44,
  },
  progressContainer: {
    height: 4,
    marginHorizontal: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  nextButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
});

export default AssessmentScreen;
