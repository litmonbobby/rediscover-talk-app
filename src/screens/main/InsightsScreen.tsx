/**
 * InsightsScreen
 * Mood analytics, calendar, and insights
 * Reference: Figma screen 99-light-insights.png
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '../../theme';

export function InsightsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>
            Track your mood patterns and wellness journey
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.comingSoon}>📊</Text>
          <Text style={styles.comingSoonText}>
            Coming Soon{'\n'}
            Mood insights and analytics will be available here
          </Text>
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

  scrollView: {
    flex: 1,
  },

  header: {
    padding: theme.spacing.lg,
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },

  comingSoon: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },

  comingSoonText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
