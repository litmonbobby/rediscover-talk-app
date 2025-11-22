/**
 * App Navigator
 * Main navigation configuration for the app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import {
  SplashScreen,
  WalkthroughScreen,
  WelcomeScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  OTPScreen,
  NewPasswordScreen,
  PasswordResetSuccessScreen,
  PreparingPlansScreen,
} from '../screens/auth';
import { MainTabs } from './MainTabs';

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
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="PasswordResetSuccess" component={PasswordResetSuccessScreen} />
        <Stack.Screen name="PreparingPlans" component={PreparingPlansScreen} />

        {/* Main App */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
