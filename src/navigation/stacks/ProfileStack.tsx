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
  AppAppearanceScreen,
  DataAnalyticsScreen,
  AppleHealthScreen,
} from '../../screens/profile';
import { SubscriptionScreen } from '../../screens/subscription';
import { TermsOfServiceScreen, PrivacyPolicyScreen } from '../../screens/legal';
import { AccessibilityScreen } from '../../screens/profile/AccessibilityScreen';

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Help: undefined;
  About: undefined;
  Subscription: undefined;
  MyBadges: undefined;
  DailyReminder: undefined;
  Preferences: undefined;
  AccountSecurity: undefined;
  AppAppearance: undefined;
  DataAnalytics: undefined;
  AppleHealth: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  Accessibility: undefined;
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
      <Stack.Screen name="MyBadges" component={MyBadgesScreen} />
      <Stack.Screen name="DailyReminder" component={DailyReminderScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="AccountSecurity" component={AccountSecurityScreen} />
      <Stack.Screen name="AppAppearance" component={AppAppearanceScreen} />
      <Stack.Screen name="DataAnalytics" component={DataAnalyticsScreen} />
      <Stack.Screen name="AppleHealth" component={AppleHealthScreen} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
    </Stack.Navigator>
  );
};
