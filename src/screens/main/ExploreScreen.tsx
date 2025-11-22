/**
 * ExploreScreen
 * Explore meditation, breathing, articles, and wellness content
 * Reference: Figma screen 41-light-explore.png
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '../../theme';

export function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>
            Discover meditations, breathing exercises, and wellness content
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.comingSoon}>🧭</Text>
          <Text style={styles.comingSoonText}>
            Coming Soon{'\n'}
            Explore content will be available here
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
