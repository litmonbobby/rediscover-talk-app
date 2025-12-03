import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ProfileScreen,
  SettingsScreen,
  HelpScreen,
  AboutScreen,
  MyBadgesScreen,
  DailyReminderScreen,
  PreferencesScreen,
  AccountSecurityScreen,
  BillingScreen,
  LinkedAccountsScreen,
  AppAppearanceScreen,
  DataAnalyticsScreen,
  AppleHealthScreen,
} from '../../screens/profile';
import { SubscriptionScreen, PaymentMethodsScreen } from '../../screens/subscription';

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Help: undefined;
  About: undefined;
  Subscription: undefined;
  PaymentMethods: undefined;
  MyBadges: undefined;
  DailyReminder: undefined;
  Preferences: undefined;
  AccountSecurity: undefined;
  Billing: undefined;
  LinkedAccounts: undefined;
  AppAppearance: undefined;
  DataAnalytics: undefined;
  AppleHealth: undefined;
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
      <Stack.Screen name="MyBadges" component={MyBadgesScreen} />
      <Stack.Screen name="DailyReminder" component={DailyReminderScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="AccountSecurity" component={AccountSecurityScreen} />
      <Stack.Screen name="Billing" component={BillingScreen} />
      <Stack.Screen name="LinkedAccounts" component={LinkedAccountsScreen} />
      <Stack.Screen name="AppAppearance" component={AppAppearanceScreen} />
      <Stack.Screen name="DataAnalytics" component={DataAnalyticsScreen} />
      <Stack.Screen name="AppleHealth" component={AppleHealthScreen} />
    </Stack.Navigator>
  );
};
