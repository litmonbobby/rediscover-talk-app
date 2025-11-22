import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from './src/theme';

/**
 * Rediscover Talk - Mental Wellness App
 *
 * This is a fresh start using the complete Figma design system.
 * Ready to build screens based on 278 high-fidelity Figma designs.
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Rediscover Talk</Text>
        <Text style={styles.subtitle}>Mental Wellness App</Text>
        <Text style={styles.message}>
          Theme system loaded ✓
        </Text>
        <Text style={styles.stats}>
          📦 3,678 design components{'\n'}
          🎨 278 screen designs (light + dark){'\n'}
          ✨ Complete theme system{'\n'}
          🎯 Phase 0 in progress
        </Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary[500],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.inverse,
    opacity: 0.9,
    marginBottom: theme.spacing['2xl'],
    textAlign: 'center',
  },
  message: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.inverse,
    opacity: 0.8,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  stats: {
    ...theme.typography.caption,
    color: theme.colors.accent.DEFAULT,
    textAlign: 'center',
    lineHeight: 24,
  },
});
