/**
 * MainTabs Navigator
 * Bottom tab navigation for main app screens
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './types';
import { theme } from '../theme';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ExploreScreen } from '../screens/main/ExploreScreen';
import { SleepScreen } from '../screens/main/SleepScreen';
import { InsightsScreen } from '../screens/main/InsightsScreen';
import { AccountScreen } from '../screens/main/AccountScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * MainTabs
 * Bottom tab navigator component
 */
export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary.DEFAULT,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.light,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          ...theme.typography.caption,
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <span style={{ fontSize: 24 }}>{focused ? '🏠' : '🏘️'}</span>,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => <span style={{ fontSize: 24 }}>{focused ? '🧭' : '🗺️'}</span>,
        }}
      />
      <Tab.Screen
        name="Sleep"
        component={SleepScreen}
        options={{
          tabBarIcon: ({ focused }) => <span style={{ fontSize: 24 }}>{focused ? '😴' : '🌙'}</span>,
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarIcon: ({ focused }) => <span style={{ fontSize: 24 }}>{focused ? '📊' : '📈'}</span>,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => <span style={{ fontSize: 24 }}>{focused ? '👤' : '👥'}</span>,
        }}
      />
    </Tab.Navigator>
  );
}
