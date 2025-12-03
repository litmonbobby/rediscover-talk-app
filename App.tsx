import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { AccessibilityProvider } from './src/theme/AccessibilityContext';
import { useFonts } from './src/hooks/useFonts';
import { colors } from './src/constants/design-system';
import { revenueCatService } from './src/services/RevenueCatService';
import { logger } from './src/config/environment';

// Prevent auto-hiding splash screen until fonts load
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts();

  // Initialize RevenueCat on app start
  // Note: RevenueCat requires a development build (npx expo run:ios)
  // It won't work in Expo Go - the app will continue without it
  useEffect(() => {
    const initRevenueCat = async () => {
      try {
        await revenueCatService.initialize();
        logger.log('RevenueCat initialized successfully');
      } catch (error) {
        // Expected in Expo Go - RevenueCat requires native modules
        logger.log('RevenueCat not available (Expo Go mode) - subscriptions disabled');
      }
    };

    initRevenueCat();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Show loading indicator while fonts are loading
  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  // Show error if fonts failed to load
  if (fontError) {
    logger.error('Font loading error:', fontError);
    // Continue with system fonts if custom fonts fail
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <AccessibilityProvider>
        <ThemeProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AccessibilityProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
});
