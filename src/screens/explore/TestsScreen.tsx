/**
 * Tests Screen - Mental Health Assessments
 * Functional tests using assessments data
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { assessments as assessmentData } from '../../data/assessments';

type ExploreStackParamList = {
  Tests: undefined;
  Assessment: { assessmentId: string };
};

type NavigationProp = NativeStackNavigationProp<ExploreStackParamList, 'Tests'>;

// Map assessment data to display format
const tests = assessmentData.map((assessment) => ({
  id: assessment.id,
  title: assessment.title,
  description: assessment.description,
  duration: assessment.duration,
}));

export const TestsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();

  const handleTestPress = (testId: string) => {
    navigation.navigate('Assessment', { assessmentId: testId });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Mental Health Tests</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Take a quick assessment to better understand your mental wellness
        </Text>

        {tests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={[styles.testCard, { backgroundColor: colors.background.card }]}
            activeOpacity={0.7}
            onPress={() => handleTestPress(test.id)}
          >
            <View style={styles.testInfo}>
              <Text style={[styles.testTitle, { color: colors.text.primary }]}>{test.title}</Text>
              <Text style={[styles.testDescription, { color: colors.text.secondary }]}>
                {test.description}
              </Text>
            </View>
            <View style={styles.testMeta}>
              <Text style={styles.testDuration}>{test.duration}</Text>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.disclaimer}>
          <Text style={[styles.disclaimerText, { color: colors.text.tertiary }]}>
            These assessments are for self-reflection and are not a substitute for professional diagnosis.
          </Text>
        </View>
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
    width: 40,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  testInfo: {
    flex: 1,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  testDescription: {
    fontSize: 13,
  },
  testMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  testDuration: {
    fontSize: 12,
    color: '#9EB567',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 16,
    color: '#9EB567',
  },
  disclaimer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  disclaimerText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default TestsScreen;
