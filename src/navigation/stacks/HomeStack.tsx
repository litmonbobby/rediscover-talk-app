import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/home';
import {
  MoodCheckInScreen,
  MoodReasonScreen,
  MoodFeelingScreen,
  MoodNotesScreen,
  MoodHistoryScreen,
  MoodCalendarScreen,
} from '../../screens/mood';
import { InsightsScreen } from '../../screens/insights';
import { AffirmationsScreen } from '../../screens/affirmations';
import { BreathworkScreen } from '../../screens/breathwork';
import { MeditationPlayerScreen } from '../../screens/meditation';
import { JournalEntryScreen } from '../../screens/journal';
import { ArticleDetailScreen } from '../../screens/articles';
import { ChatScreen } from '../../screens/chat';

export type HomeStackParamList = {
  Home: undefined;
  MoodCheckIn: undefined;
  MoodReason: undefined;
  MoodFeeling: undefined;
  MoodNotes: undefined;
  MoodHistory: undefined;
  MoodCalendar: undefined;
  Insights: undefined;
  Affirmations: undefined;
  Breathwork: undefined;
  MeditationPlayer: { id: string; title: string; duration: string };
  JournalEntry: { promptId?: string; prompt?: string } | undefined;
  ArticleDetail: { id: string; title: string; article?: any };
  Chat: undefined;
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
      <Stack.Screen
        name="MoodReason"
        component={MoodReasonScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="MoodFeeling"
        component={MoodFeelingScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="MoodNotes"
        component={MoodNotesScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="MoodHistory" component={MoodHistoryScreen} />
      <Stack.Screen name="MoodCalendar" component={MoodCalendarScreen} />
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Affirmations" component={AffirmationsScreen} />
      <Stack.Screen name="Breathwork" component={BreathworkScreen} />
      <Stack.Screen name="MeditationPlayer" component={MeditationPlayerScreen} />
      <Stack.Screen name="JournalEntry" component={JournalEntryScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
