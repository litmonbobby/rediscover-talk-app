/**
 * PreparingPlansScreen
 * Loading screen after sign up
 * Reference: Figma screen 19-light-preparing-personalized-plans.png
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type PreparingPlansScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PreparingPlans'
>;

interface PreparingPlansScreenProps {
  navigation: PreparingPlansScreenNavigationProp;
}

export function PreparingPlansScreen({ navigation }: PreparingPlansScreenProps) {
  useEffect(() => {
    // Navigate to MainTabs after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={theme.colors.primary.DEFAULT} />
        <Text style={styles.title}>Preparing Your{'\n'}Personalized Plans...</Text>
        <Text style={styles.subtitle}>
          We're creating a wellness journey tailored just for you
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },

  title: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },

  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
