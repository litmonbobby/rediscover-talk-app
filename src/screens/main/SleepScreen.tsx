/**
 * SleepScreen
 * Sleep sounds, music, and bedtime stories
 * Reference: Figma screen 93-light-sleep.png
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '../../theme';

export function SleepScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Sleep</Text>
          <Text style={styles.subtitle}>
            Relax with soothing sounds, music, and bedtime stories
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.comingSoon}>😴</Text>
          <Text style={styles.comingSoonText}>
            Coming Soon{'\n'}
            Sleep content will be available here
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
