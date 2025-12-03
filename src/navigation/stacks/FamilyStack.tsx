import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FamilyScreen,
  FamilyTipsScreen,
  FamilyArticlesScreen,
  FamilyActivitiesScreen,
  FamilyGamesScreen,
  TipDetailScreen,
  ActivityDetailScreen,
  GameDetailScreen,
  ArticleDetailScreen,
} from '../../screens/family';
import { FamilyStackParamList } from '../../screens/family/FamilyScreen';

// Re-export for use elsewhere
export type { FamilyStackParamList };

const Stack = createNativeStackNavigator<FamilyStackParamList>();

export const FamilyStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Family" component={FamilyScreen} />
      <Stack.Screen name="FamilyTips" component={FamilyTipsScreen} />
      <Stack.Screen name="FamilyArticles" component={FamilyArticlesScreen} />
      <Stack.Screen name="FamilyActivities" component={FamilyActivitiesScreen} />
      <Stack.Screen name="FamilyGames" component={FamilyGamesScreen} />
      <Stack.Screen name="TipDetail" component={TipDetailScreen} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
      <Stack.Screen name="GameDetail" component={GameDetailScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
};
