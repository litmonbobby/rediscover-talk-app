import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FamilyActivitiesScreen, ActivityDetailScreen } from '../../screens/family';
import { ChatScreen } from '../../screens/chat';
import { MediaGalleryScreen } from '../../screens/media';

export type FamilyStackParamList = {
  FamilyActivities: undefined;
  ActivityDetail: { activity: any };
  Chat: undefined;
  MediaGallery: undefined;
};

const Stack = createNativeStackNavigator<FamilyStackParamList>();

export const FamilyStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="FamilyActivities" component={FamilyActivitiesScreen} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="MediaGallery" component={MediaGalleryScreen} />
    </Stack.Navigator>
  );
};
