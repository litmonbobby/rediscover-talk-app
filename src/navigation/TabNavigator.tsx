/**
 * Tab Navigator - Exact Figma Menu Bar Recreation
 * 5 tabs: Home, Explore, Family, Insights, Account
 * Uses Figma-extracted Iconly icons
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet, useColorScheme, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { lightColors, darkColors } from '../theme';

// Stack navigators for each tab
import { HomeStackNavigator } from './stacks/HomeStack';
import { ExploreStackNavigator } from './stacks/ExploreStack';
import { FamilyStackNavigator } from './stacks/FamilyStack';
import { InsightsStackNavigator } from './stacks/InsightsStack';
import { ProfileStackNavigator } from './stacks/ProfileStack';

export type TabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  FamilyTab: undefined;
  InsightsTab: undefined;
  AccountTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Figma color scheme from menu bar design
const TAB_COLORS = {
  active: '#9EB567', // Olive green from Figma
  inactive: '#9E9E9E', // Gray from Figma
};

// Icon paths - Iconly Curved icons from Figma extraction
const icons = {
  home: {
    outline: require('../figma-extracted/assets/components/icons/iconly-curved-outline-home.png'),
    bold: require('../figma-extracted/assets/components/icons/iconly-curved-bold-home.png'),
  },
  explore: {
    outline: require('../figma-extracted/assets/components/icons/iconly-curved-outline-discovery.png'),
    bold: require('../figma-extracted/assets/components/icons/iconly-curved-bold-discovery.png'),
  },
  family: {
    outline: require('../figma-extracted/assets/components/icons/iconly-curved-outline-2-user.png'),
    bold: require('../figma-extracted/assets/components/icons/iconly-curved-bold-2-user.png'),
  },
  insights: {
    outline: require('../figma-extracted/assets/components/icons/iconly-curved-outline-activity.png'),
    bold: require('../figma-extracted/assets/components/icons/iconly-curved-bold-activity.png'),
  },
  account: {
    outline: require('../figma-extracted/assets/components/icons/iconly-curved-outline-profile.png'),
    bold: require('../figma-extracted/assets/components/icons/iconly-curved-bold-profile.png'),
  },
};

// Tab icon component for PNG icons
interface TabIconProps {
  focused: boolean;
  icon: { outline: any; bold: any };
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon }) => (
  <Image
    source={focused ? icon.bold : icon.outline}
    style={[
      styles.icon,
      { tintColor: focused ? TAB_COLORS.active : TAB_COLORS.inactive },
    ]}
    resizeMode="contain"
  />
);

export const TabNavigator = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  const insets = useSafeAreaInsets();

  // Calculate proper tab bar height accounting for safe area
  const tabBarHeight = 56 + Math.max(insets.bottom, 0);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TAB_COLORS.active,
        tabBarInactiveTintColor: TAB_COLORS.inactive,
        tabBarStyle: {
          backgroundColor: colors.background.card,
          borderTopWidth: 1,
          borderTopColor: colors.border.light,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          height: tabBarHeight,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStackNavigator}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.explore} />
          ),
        }}
      />
      <Tab.Screen
        name="FamilyTab"
        component={FamilyStackNavigator}
        options={{
          tabBarLabel: 'Family',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.family} />
          ),
        }}
      />
      <Tab.Screen
        name="InsightsTab"
        component={InsightsStackNavigator}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.insights} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.account} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
