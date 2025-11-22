import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen, SettingsScreen, HelpScreen, AboutScreen } from '../../screens/profile';
import { SubscriptionScreen, PaymentMethodsScreen } from '../../screens/subscription';

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Help: undefined;
  About: undefined;
  Subscription: undefined;
  PaymentMethods: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
    </Stack.Navigator>
  );
};
