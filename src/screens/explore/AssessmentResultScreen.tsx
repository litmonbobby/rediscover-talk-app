/**
 * Assessment Result Screen - Display Assessment Results
 * Shows score, level, description, and recommendations
 */

import React from 'react';
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
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { GlassCard } from '../../components/core/GlassCard';
import { getAssessmentById, getResult, getCategoryColor } from '../../data/assessments';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ExploreStackParamList = {
  AssessmentResult: {
    assessmentId: string;
    score: number;
    answers: Record<string, number>;
  };
  Tests: undefined;
  Explore: undefined;
};

type NavigationProp = NativeStackNavigationProp<ExploreStackParamList, 'AssessmentResult'>;
type ResultRouteProp = RouteProp<ExploreStackParamList, 'AssessmentResult'>;

export const AssessmentResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultRouteProp>();
  const { colors, isDarkMode } = useTheme();

  const { assessmentId, score, answers } = route.params;
  const assessment = getAssessmentById(assessmentId);
  const result = assessment ? getResult(assessment, score) : null;

  if (!assessment || !result) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.errorText, { color: colors.text.primary }]}>
          Result not found
        </Text>
      </SafeAreaView>
    );
  }

  const maxScore = assessment.questions.reduce((sum, q) => {
    const maxOption = Math.max(...q.options.map(o => o.value));
    return sum + maxOption;
  }, 0);

  const scorePercentage = Math.round((score / maxScore) * 100);

  // Get color based on result level
  const getResultColor = () => {
    switch (result.level) {
      case 'minimal':
      case 'low':
        return '#4CAF50'; // Green
      case 'mild':
      case 'moderate':
        return '#FFC107'; // Amber
      case 'moderately-severe':
      case 'high':
        return '#FF9800'; // Orange
      case 'severe':
      case 'very-high':
        return '#F44336'; // Red
      default:
        return assessment.color;
    }
  };

  const resultColor = getResultColor();

  const handleRetakeTest = () => {
    navigation.replace('Assessment' as any, { assessmentId });
  };

  const handleBackToTests = () => {
    navigation.navigate('Tests');
  };

  const handleExploreMore = () => {
    navigation.navigate('Explore');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <Animated.View
        entering={FadeInDown.delay(100).duration(400)}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleBackToTests} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          Your Results
        </Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Circle */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(500)}
          style={styles.scoreSection}
        >
          <View style={[styles.scoreCircle, { borderColor: resultColor }]}>
            <Text style={[styles.scoreValue, { color: resultColor }]}>{score}</Text>
            <Text style={[styles.scoreMax, { color: colors.text.tertiary }]}>
              of {maxScore}
            </Text>
          </View>
          <Text style={[styles.percentageText, { color: colors.text.secondary }]}>
            {scorePercentage}% Score
          </Text>
        </Animated.View>

        {/* Result Level */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.resultLevelSection}
        >
          <View style={[styles.levelBadge, { backgroundColor: resultColor + '20' }]}>
            <Text style={[styles.levelText, { color: resultColor }]}>
              {result.level.charAt(0).toUpperCase() + result.level.slice(1).replace('-', ' ')}
            </Text>
          </View>
          <Text style={[styles.assessmentTitle, { color: colors.text.primary }]}>
            {assessment.title}
          </Text>
        </Animated.View>

        {/* Description Card */}
        <Animated.View entering={FadeInUp.delay(400).duration(500)}>
          <GlassCard style={styles.descriptionCard}>
            <Text style={[styles.cardTitle, { color: colors.text.primary }]}>
              What This Means
            </Text>
            <Text style={[styles.descriptionText, { color: colors.text.secondary }]}>
              {result.description}
            </Text>
          </GlassCard>
        </Animated.View>

        {/* Recommendation Card */}
        <Animated.View entering={FadeInUp.delay(500).duration(500)}>
          <GlassCard style={styles.recommendationsCard}>
            <Text style={[styles.cardTitle, { color: colors.text.primary }]}>
              Recommendation
            </Text>
            <View style={styles.recommendationItem}>
              <View style={[styles.bulletPoint, { backgroundColor: assessment.color }]} />
              <Text style={[styles.recommendationText, { color: colors.text.secondary }]}>
                {result.recommendation}
              </Text>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Disclaimer */}
        <Animated.View entering={FadeInUp.delay(600).duration(500)}>
          <View style={[styles.disclaimerCard, { backgroundColor: colors.background.secondary }]}>
            <Text style={[styles.disclaimerTitle, { color: colors.text.secondary }]}>
              ℹ️ Important Note
            </Text>
            <Text style={[styles.disclaimerText, { color: colors.text.tertiary }]}>
              This assessment is for informational purposes only and is not a substitute for
              professional medical advice, diagnosis, or treatment. If you're experiencing
              mental health concerns, please consult with a qualified healthcare professional.
            </Text>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          entering={FadeInUp.delay(700).duration(500)}
          style={styles.actionsContainer}
        >
          <TouchableOpacity
            style={[styles.retakeButton, { borderColor: assessment.color }]}
            onPress={handleRetakeTest}
            activeOpacity={0.8}
          >
            <Text style={[styles.retakeButtonText, { color: assessment.color }]}>
              Retake Assessment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.exploreButton, { backgroundColor: assessment.color }]}
            onPress={handleExploreMore}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>
              Explore More Resources
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
  },
  scoreMax: {
    fontSize: 14,
    marginTop: -4,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultLevelSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  levelBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  assessmentTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionCard: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
  },
  recommendationsCard: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  disclaimerCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 13,
    lineHeight: 20,
  },
  actionsContainer: {
    gap: 12,
  },
  retakeButton: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  exploreButton: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
});

export default AssessmentResultScreen;
