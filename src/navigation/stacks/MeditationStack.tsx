import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MeditationLibraryScreen, MeditationPlayerScreen } from '../../screens/meditation';
import { SleepSoundsScreen, SoundPlayerScreen } from '../../screens/sleep';

export type MeditationStackParamList = {
  MeditationLibrary: undefined;
  MeditationPlayer: { meditation: any };
  SleepSounds: undefined;
  SoundPlayer: { sound: any };
};

const Stack = createNativeStackNavigator<MeditationStackParamList>();

export const MeditationStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="MeditationLibrary" component={MeditationLibraryScreen} />
      <Stack.Screen name="MeditationPlayer" component={MeditationPlayerScreen} />
      <Stack.Screen name="SleepSounds" component={SleepSoundsScreen} />
      <Stack.Screen name="SoundPlayer" component={SoundPlayerScreen} />
    </Stack.Navigator>
  );
};
