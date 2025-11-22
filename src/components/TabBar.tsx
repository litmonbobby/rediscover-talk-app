/**
 * TabBar Component
 * Bottom tab navigation bar with 5 tabs
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export type TabName = 'Home' | 'Explore' | 'Sleep' | 'Insights' | 'Account';

export interface TabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

const tabs: { name: TabName; icon: string }[] = [
  { name: 'Home', icon: '🏠' },
  { name: 'Explore', icon: '🧭' },
  { name: 'Sleep', icon: '😴' },
  { name: 'Insights', icon: '📊' },
  { name: 'Account', icon: '👤' },
];

export function TabBar({ activeTab, onTabPress }: TabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.name}
            </Text>
            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.light,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    paddingBottom: theme.spacing.sm,
    ...theme.shadows.md,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
  },

  icon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },

  label: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
  },

  labelActive: {
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
  },

  indicator: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    height: 2,
    backgroundColor: theme.colors.primary.DEFAULT,
    borderRadius: theme.borderRadius.full,
  },
});
