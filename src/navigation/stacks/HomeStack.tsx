import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/home';
import { MoodCheckInScreen, MoodHistoryScreen, MoodCalendarScreen } from '../../screens/mood';
import { InsightsScreen } from '../../screens/insights';
import { AffirmationsScreen } from '../../screens/affirmations';
import { BreathworkScreen } from '../../screens/breathwork';

export type HomeStackParamList = {
  Home: undefined;
  MoodCheckIn: undefined;
  MoodHistory: undefined;
  MoodCalendar: undefined;
  Insights: undefined;
  Affirmations: undefined;
  Breathwork: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
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
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Affirmations" component={AffirmationsScreen} />
      <Stack.Screen name="Breathwork" component={BreathworkScreen} />
    </Stack.Navigator>
  );
};
