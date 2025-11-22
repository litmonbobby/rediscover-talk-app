import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from './src/components';
import { theme } from './src/theme';

/**
 * Rediscover Talk - Mental Wellness App
 *
 * Testing Button component
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Button Component Test</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Primary Button</Text>
          <Button title="Primary Button" onPress={() => console.log('Primary pressed')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Secondary Button</Text>
          <Button
            title="Secondary Button"
            onPress={() => console.log('Secondary pressed')}
            variant="secondary"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outline Button</Text>
          <Button
            title="Outline Button"
            onPress={() => console.log('Outline pressed')}
            variant="outline"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Button</Text>
          <Button
            title="Text Button"
            onPress={() => console.log('Text pressed')}
            variant="text"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disabled Button</Text>
          <Button
            title="Disabled Button"
            onPress={() => console.log('Should not fire')}
            disabled
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loading Button</Text>
          <Button
            title="Loading Button"
            onPress={() => console.log('Should not fire')}
            loading
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Full Width Button</Text>
          <Button
            title="Full Width Button"
            onPress={() => console.log('Full width pressed')}
            fullWidth
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
});
