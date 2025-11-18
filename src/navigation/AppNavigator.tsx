import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen, OnboardingScreen, SignUpScreen, LoginScreen, GoalSelectionScreen } from '../screens/auth';
import { HomeScreen } from '../screens/home';
import { MoodCheckInScreen, MoodHistoryScreen } from '../screens/mood';
import { MeditationLibraryScreen } from '../screens/meditation';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  Login: undefined;
  GoalSelection: undefined;
  Main: undefined;
  MoodCheckIn: undefined;
  MoodHistory: undefined;
  MeditationLibrary: undefined;
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
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
        <Stack.Screen name="Main" component={HomeScreen} />

        {/* Mood Screens */}
        <Stack.Screen
          name="MoodCheckIn"
          component={MoodCheckInScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="MoodHistory" component={MoodHistoryScreen} />

        {/* Meditation Screens */}
        <Stack.Screen name="MeditationLibrary" component={MeditationLibraryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
