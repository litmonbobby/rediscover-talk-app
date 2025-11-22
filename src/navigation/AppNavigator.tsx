/**
 * App Navigator
 * Main navigation configuration for the app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { SplashScreen, WalkthroughScreen } from '../screens/auth';

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator
 * Root navigation component
 */
export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />

        {/* Main App Screens will be added here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
