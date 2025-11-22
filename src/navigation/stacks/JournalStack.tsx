import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { JournalListScreen, JournalEntryScreen } from '../../screens/journal';
import { ArticlesListScreen, ArticleDetailScreen } from '../../screens/articles';

export type JournalStackParamList = {
  JournalList: undefined;
  JournalEntry: undefined;
  ArticlesList: undefined;
  ArticleDetail: { article: any };
};

const Stack = createNativeStackNavigator<JournalStackParamList>();

export const JournalStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="JournalList" component={JournalListScreen} />
      <Stack.Screen
        name="JournalEntry"
        component={JournalEntryScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="ArticlesList" component={ArticlesListScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
};
