import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreScreen } from '../../screens/home';
import { MeditationLibraryScreen, MeditationPlayerScreen } from '../../screens/meditation';
import { ArticlesListScreen, ArticleDetailScreen } from '../../screens/articles';
import { BreathworkScreen } from '../../screens/breathwork';
import { AffirmationsScreen } from '../../screens/affirmations';
import { JournalListScreen } from '../../screens/journal';
import {
  TestsScreen,
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
  SmartJournal: undefined;
  Notepad: undefined;
  Quotes: undefined;
  Tips: undefined;
  Favorites: undefined;
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
      <Stack.Screen name="SmartJournal" component={JournalListScreen} />
      <Stack.Screen name="Notepad" component={NotepadScreen} />
      <Stack.Screen name="Quotes" component={QuotesScreen} />
      <Stack.Screen name="Tips" component={TipsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};
