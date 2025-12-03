import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InsightsScreen } from '../../screens/insights';
import {
  MoodHistoryScreen,
  MoodCalendarScreen,
  MoodCheckInScreen,
  MoodReasonScreen,
  MoodFeelingScreen,
  MoodNotesScreen,
} from '../../screens/mood';

export type InsightsStackParamList = {
  Insights: undefined;
  MoodHistory: undefined;
  MoodCalendar: undefined;
  MoodCheckIn: undefined;
  MoodReason: undefined;
  MoodFeeling: undefined;
  MoodNotes: undefined;
};

const Stack = createNativeStackNavigator<InsightsStackParamList>();

export const InsightsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="MoodHistory" component={MoodHistoryScreen} />
      <Stack.Screen name="MoodCalendar" component={MoodCalendarScreen} />
      <Stack.Screen
        name="MoodCheckIn"
        component={MoodCheckInScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="MoodReason"
        component={MoodReasonScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="MoodFeeling"
        component={MoodFeelingScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="MoodNotes"
        component={MoodNotesScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};
