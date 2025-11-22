import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen, OnboardingScreen, SignUpScreen, LoginScreen, GoalSelectionScreen } from '../screens/auth';
import { TabNavigator } from './TabNavigator';

/**
 * Root Navigation Structure:
 * - Auth Flow: Splash → Onboarding → SignUp/Login → GoalSelection → Main
 * - Main App: Bottom Tab Navigator (5 tabs)
 *   - HomeTab: Home, Mood, Insights, Breathwork
 *   - MeditationTab: Meditation Library, Player, Sleep Sounds
 *   - JournalTab: Journal List, Entry, Articles
 *   - FamilyTab: Activities, Chat, Media Gallery
 *   - ProfileTab: Profile, Settings, Subscription, Help, About
 */

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  Login: undefined;
  GoalSelection: undefined;
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
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />

        {/* Main App with Bottom Tabs */}
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
