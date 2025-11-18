import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen, OnboardingScreen, SignUpScreen, LoginScreen, GoalSelectionScreen } from '../screens/auth';
import { HomeScreen } from '../screens/home';
import { MoodCheckInScreen, MoodHistoryScreen, MoodCalendarScreen } from '../screens/mood';
import { MeditationLibraryScreen, MeditationPlayerScreen } from '../screens/meditation';
import { JournalListScreen, JournalEntryScreen } from '../screens/journal';
import { BreathworkScreen } from '../screens/breathwork';
import { SleepSoundsScreen, SoundPlayerScreen } from '../screens/sleep';
import { ProfileScreen, SettingsScreen } from '../screens/profile';
import { ChatScreen } from '../screens/chat';
import { InsightsScreen } from '../screens/insights';
import { AffirmationsScreen } from '../screens/affirmations';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  Login: undefined;
  GoalSelection: undefined;
  Main: undefined;
  MoodCheckIn: undefined;
  MoodHistory: undefined;
  MoodCalendar: undefined;
  MeditationLibrary: undefined;
  MeditationPlayer: { meditation: any };
  JournalList: undefined;
  JournalEntry: undefined;
  Breathwork: undefined;
  SleepSounds: undefined;
  SoundPlayer: { sound: any };
  Profile: undefined;
  Settings: undefined;
  Chat: undefined;
  Insights: undefined;
  Affirmations: undefined;
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
        <Stack.Screen name="MoodCalendar" component={MoodCalendarScreen} />

        {/* Meditation Screens */}
        <Stack.Screen name="MeditationLibrary" component={MeditationLibraryScreen} />
        <Stack.Screen name="MeditationPlayer" component={MeditationPlayerScreen} />

        {/* Journal Screens */}
        <Stack.Screen name="JournalList" component={JournalListScreen} />
        <Stack.Screen
          name="JournalEntry"
          component={JournalEntryScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />

        {/* Breathwork Screens */}
        <Stack.Screen name="Breathwork" component={BreathworkScreen} />

        {/* Sleep Screens */}
        <Stack.Screen name="SleepSounds" component={SleepSoundsScreen} />
        <Stack.Screen name="SoundPlayer" component={SoundPlayerScreen} />

        {/* Profile Screens */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        {/* New Feature Screens */}
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Insights" component={InsightsScreen} />
        <Stack.Screen name="Affirmations" component={AffirmationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
