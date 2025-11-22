import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants';

interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabKey: string) => void;
  variant?: 'default' | 'pills';
  containerStyle?: object;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onChange(tab.key)}
          style={[
            styles.tab,
            variant === 'pills' && styles.tabPill,
            activeTab === tab.key && styles.tabActive,
            activeTab === tab.key && variant === 'pills' && styles.tabPillActive,
          ]}
          activeOpacity={0.7}
        >
          {tab.icon && (
            <View style={styles.iconContainer}>
              {tab.icon}
            </View>
          )}

          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.tabTextActive,
            ]}
          >
            {tab.label}
          </Text>

          {tab.badge !== undefined && tab.badge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {tab.badge > 99 ? '99+' : tab.badge}
              </Text>
            </View>
          )}

          {variant === 'default' && activeTab === tab.key && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabPill: {
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  tabActive: {
    backgroundColor: 'transparent',
  },
  tabPillActive: {
    backgroundColor: colors.primary[100],
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabTextActive: {
    color: colors.primary.DEFAULT,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.primary.DEFAULT,
  },
});
