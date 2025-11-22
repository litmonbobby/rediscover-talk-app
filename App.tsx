import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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
          Ready to build with Figma design system
        </Text>
        <Text style={styles.stats}>
          📦 3,678 design components{'\n'}
          🎨 278 screen designs (light + dark){'\n'}
          ✨ Complete theme system
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004BA7', // Cobalt Blue from brand
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 32,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
    textAlign: 'center',
  },
  stats: {
    fontSize: 14,
    color: '#C7F600', // Lime accent
    textAlign: 'center',
    lineHeight: 24,
  },
});
