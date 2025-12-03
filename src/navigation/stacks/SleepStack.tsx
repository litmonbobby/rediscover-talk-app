import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SleepSoundsScreen,
  SoundPlayerScreen,
  SleepMusicScreen,
  SleepStoriesScreen,
} from '../../screens/sleep';

export type SleepStackParamList = {
  SleepSounds: undefined;
  SoundPlayer: {
    sound?: any;
    id?: string;
    name?: string;
    icon?: string;
  };
  SleepMusic: undefined;
  SleepStories: undefined;
};

const Stack = createNativeStackNavigator<SleepStackParamList>();

export const SleepStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="SleepSounds" component={SleepSoundsScreen} />
      <Stack.Screen name="SoundPlayer" component={SoundPlayerScreen} />
      <Stack.Screen name="SleepMusic" component={SleepMusicScreen} />
      <Stack.Screen name="SleepStories" component={SleepStoriesScreen} />
    </Stack.Navigator>
  );
};
