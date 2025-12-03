import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreScreen } from '../../screens/home';
import { MeditationLibraryScreen, MeditationPlayerScreen } from '../../screens/meditation';
import { ArticlesListScreen, ArticleDetailScreen } from '../../screens/articles';
import { BreathworkScreen } from '../../screens/breathwork';
import { AffirmationsScreen } from '../../screens/affirmations';
import { JournalListScreen, JournalEntryScreen } from '../../screens/journal';
import { SleepSoundsScreen, SoundPlayerScreen } from '../../screens/sleep';
import { FamilyScreen } from '../../screens/family/FamilyScreen';
import {
  TestsScreen,
  AssessmentScreen,
  AssessmentResultScreen,
  NotepadScreen,
  QuotesScreen,
  TipsScreen,
  FavoritesScreen,
} from '../../screens/explore';

export type ExploreStackParamList = {
  Explore: undefined;
  MeditationLibrary: undefined;
  MeditationPlayer: { meditation?: any; id?: string; title?: string; duration?: string };
  ArticlesList: undefined;
  ArticleDetail: { article: any };
  Breathwork: undefined;
  Affirmations: undefined;
  Tests: undefined;
  Assessment: { assessmentId: string };
  AssessmentResult: { assessmentId: string; score: number; answers: Record<string, number> };
  SmartJournal: undefined;
  JournalEntry: { entryId?: string; promptId?: string; prompt?: string };
  Notepad: undefined;
  Quotes: undefined;
  Tips: undefined;
  Favorites: undefined;
  SleepSounds: undefined;
  SoundPlayer: { sound?: any; id?: string; name?: string; icon?: string };
  Family: undefined;
};

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="MeditationLibrary" component={MeditationLibraryScreen} />
      <Stack.Screen name="MeditationPlayer" component={MeditationPlayerScreen} />
      <Stack.Screen name="ArticlesList" component={ArticlesListScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
      <Stack.Screen name="Breathwork" component={BreathworkScreen} />
      <Stack.Screen name="Affirmations" component={AffirmationsScreen} />
      <Stack.Screen name="Tests" component={TestsScreen} />
      <Stack.Screen name="Assessment" component={AssessmentScreen} />
      <Stack.Screen name="AssessmentResult" component={AssessmentResultScreen} />
      <Stack.Screen name="SmartJournal" component={JournalListScreen} />
      <Stack.Screen
        name="JournalEntry"
        component={JournalEntryScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="Notepad" component={NotepadScreen} />
      <Stack.Screen name="Quotes" component={QuotesScreen} />
      <Stack.Screen name="Tips" component={TipsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="SleepSounds" component={SleepSoundsScreen} />
      <Stack.Screen name="SoundPlayer" component={SoundPlayerScreen} />
      <Stack.Screen name="Family" component={FamilyScreen} />
    </Stack.Navigator>
  );
};
