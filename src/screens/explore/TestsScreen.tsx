/**
 * TestsScreen
 * Mental health assessment tests
 * Reference: Figma screen 67-light-explore-tests.png
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { Card } from '../../components';

interface MentalHealthTest {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in minutes
  questionCount: number;
  icon: string;
  color: string;
  isProfessional: boolean;
}

const mentalHealthTests: MentalHealthTest[] = [
  {
    id: '1',
    title: 'Depression Assessment (PHQ-9)',
    description: 'Evaluate symptoms of depression based on the Patient Health Questionnaire',
    category: 'Depression',
    duration: 5,
    questionCount: 9,
    icon: '😔',
    color: '#8B5CF6',
    isProfessional: true,
  },
  {
    id: '2',
    title: 'Anxiety Assessment (GAD-7)',
    description: 'Measure anxiety symptoms using the Generalized Anxiety Disorder scale',
    category: 'Anxiety',
    duration: 3,
    questionCount: 7,
    icon: '😰',
    color: '#EC4899',
    isProfessional: true,
  },
  {
    id: '3',
    title: 'Stress Level Check',
    description: 'Assess your current stress levels and identify stress triggers',
    category: 'Stress',
    duration: 5,
    questionCount: 10,
    icon: '😫',
    color: '#F59E0B',
    isProfessional: false,
  },
  {
    id: '4',
    title: 'Burnout Assessment',
    description: 'Evaluate signs of burnout in work and personal life',
    category: 'Burnout',
    duration: 7,
    questionCount: 15,
    icon: '🔥',
    color: '#EF4444',
    isProfessional: false,
  },
  {
    id: '5',
    title: 'Self-Esteem Evaluation',
    description: 'Measure your self-esteem and self-worth perception',
    category: 'Self-Esteem',
    duration: 4,
    questionCount: 10,
    icon: '💪',
    color: '#10B981',
    isProfessional: false,
  },
  {
    id: '6',
    title: 'Sleep Quality Assessment',
    description: 'Analyze your sleep patterns and quality of rest',
    category: 'Sleep',
    duration: 5,
    questionCount: 12,
    icon: '😴',
    color: '#6366F1',
    isProfessional: false,
  },
  {
    id: '7',
    title: 'Social Anxiety Test',
    description: 'Evaluate social anxiety symptoms and triggers',
    category: 'Anxiety',
    duration: 6,
    questionCount: 12,
    icon: '👥',
    color: '#06B6D4',
    isProfessional: true,
  },
  {
    id: '8',
    title: 'Emotional Wellbeing Check',
    description: 'Get a comprehensive view of your emotional health',
    category: 'Wellbeing',
    duration: 8,
    questionCount: 20,
    icon: '❤️',
    color: '#F97316',
    isProfessional: false,
  },
];

export function TestsScreen() {
  const handleTestPress = (test: MentalHealthTest) => {
    // TODO: Navigate to test detail
    console.log('Test pressed:', test.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mental Health Tests</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Disclaimer */}
        <Card style={styles.disclaimerCard}>
          <Text style={styles.disclaimerIcon}>ℹ️</Text>
          <Text style={styles.disclaimerTitle}>Professional Assessment</Text>
          <Text style={styles.disclaimerText}>
            These tests are for self-assessment and educational purposes. They are
            not a substitute for professional diagnosis. Please consult a mental
            health professional for accurate diagnosis and treatment.
          </Text>
        </Card>

        {/* Professional Tests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Assessments</Text>
          <Text style={styles.sectionSubtitle}>
            Clinically validated screening tools
          </Text>
          {mentalHealthTests
            .filter((test) => test.isProfessional)
            .map((test) => (
              <TouchableOpacity
                key={test.id}
                onPress={() => handleTestPress(test)}
                activeOpacity={0.7}
              >
                <Card variant="elevated" style={styles.testCard}>
                  <View
                    style={[styles.testIconContainer, { backgroundColor: `${test.color}15` }]}
                  >
                    <Text style={styles.testIcon}>{test.icon}</Text>
                  </View>
                  <View style={styles.testContent}>
                    <View style={styles.professionalBadge}>
                      <Text style={styles.professionalBadgeText}>PROFESSIONAL</Text>
                    </View>
                    <Text style={styles.testTitle}>{test.title}</Text>
                    <Text style={styles.testDescription}>{test.description}</Text>
                    <View style={styles.testMeta}>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>⏱️</Text>
                        <Text style={styles.metaText}>{test.duration} min</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>❓</Text>
                        <Text style={styles.metaText}>{test.questionCount} questions</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </Card>
              </TouchableOpacity>
            ))}
        </View>

        {/* Self-Assessment Tests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Self-Assessment Tools</Text>
          <Text style={styles.sectionSubtitle}>
            General wellness evaluations
          </Text>
          {mentalHealthTests
            .filter((test) => !test.isProfessional)
            .map((test) => (
              <TouchableOpacity
                key={test.id}
                onPress={() => handleTestPress(test)}
                activeOpacity={0.7}
              >
                <Card variant="default" style={styles.testCard}>
                  <View
                    style={[styles.testIconContainer, { backgroundColor: `${test.color}15` }]}
                  >
                    <Text style={styles.testIcon}>{test.icon}</Text>
                  </View>
                  <View style={styles.testContent}>
                    <Text style={styles.testTitle}>{test.title}</Text>
                    <Text style={styles.testDescription}>{test.description}</Text>
                    <View style={styles.testMeta}>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>⏱️</Text>
                        <Text style={styles.metaText}>{test.duration} min</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>❓</Text>
                        <Text style={styles.metaText}>{test.questionCount} questions</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>🏷️</Text>
                        <Text style={styles.metaText}>{test.category}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </Card>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: theme.colors.text.primary,
    fontWeight: '300',
  },

  title: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
  },

  placeholder: {
    width: 40,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  disclaimerCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary[50],
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary.DEFAULT,
  },

  disclaimerIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },

  disclaimerTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  disclaimerText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },

  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  sectionSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },

  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },

  testIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },

  testIcon: {
    fontSize: 28,
  },

  testContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },

  professionalBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing.xs,
  },

  professionalBadgeText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '700',
    fontSize: 9,
  },

  testTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },

  testDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    lineHeight: 18,
  },

  testMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metaIcon: {
    fontSize: 12,
  },

  metaText: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },

  arrow: {
    fontSize: 24,
    color: theme.colors.text.tertiary,
  },
});
