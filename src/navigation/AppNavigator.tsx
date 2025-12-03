import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SplashScreen,
  OnboardingScreen,
  WelcomeScreen,
  SignUpScreen,
  SignInScreen,
} from '../screens/auth';
import { TabNavigator } from './TabNavigator';

/**
 * Root Navigation Structure:
 * - Auth Flow: Splash → Onboarding → Welcome → SignUp/SignIn → Main
 * - Main App: Bottom Tab Navigator (4 tabs)
 *   - HomeTab: Home, Mood, Insights, Breathwork
 *   - MeditationTab: Meditation Library, Player, Sleep Sounds
 *   - JournalTab: Journal List, Entry, Articles
 *   - ProfileTab: Profile, Settings, Subscription, Help, About
 */

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {/* Authentication Flow */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />

        {/* Main App with Bottom Tabs */}
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
