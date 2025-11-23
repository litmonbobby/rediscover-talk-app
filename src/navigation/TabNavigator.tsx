import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { lightColors, darkColors } from '../theme';

// Stack navigators for each tab
import { HomeStackNavigator } from './stacks/HomeStack';
import { MeditationStackNavigator } from './stacks/MeditationStack';
import { JournalStackNavigator } from './stacks/JournalStack';
import { FamilyStackNavigator } from './stacks/FamilyStack';
import { ProfileStackNavigator } from './stacks/ProfileStack';

export type TabParamList = {
  HomeTab: undefined;
  MeditationTab: undefined;
  JournalTab: undefined;
  FamilyTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Tab icons (placeholder - replace with actual icons)
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={[styles.icon, { backgroundColor: color, width: size, height: size }]} />
);

const MeditationIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={[styles.icon, { backgroundColor: color, width: size, height: size }]} />
);

const JournalIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={[styles.icon, { backgroundColor: color, width: size, height: size }]} />
);

const FamilyIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={[styles.icon, { backgroundColor: color, width: size, height: size }]} />
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={[styles.icon, { backgroundColor: color, width: size, height: size }]} />
);

export const TabNavigator = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.background.card,
          borderTopWidth: 1,
          borderTopColor: colors.border.light,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="MeditationTab"
        component={MeditationStackNavigator}
        options={{
          tabBarLabel: 'Meditate',
          tabBarIcon: ({ color, size }) => <MeditationIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="JournalTab"
        component={JournalStackNavigator}
        options={{
          tabBarLabel: 'Journal',
          tabBarIcon: ({ color, size }) => <JournalIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="FamilyTab"
        component={FamilyStackNavigator}
        options={{
          tabBarLabel: 'Family',
          tabBarIcon: ({ color, size }) => <FamilyIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <ProfileIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    borderRadius: 4,
  },
});
