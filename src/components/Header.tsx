/**
 * Header Component
 * Navigation header with title and optional actions
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

export type HeaderVariant = 'default' | 'transparent';

export interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  variant?: HeaderVariant;
  style?: ViewStyle;
}

export function Header({
  title,
  showBack = false,
  onBackPress,
  rightAction,
  variant = 'default',
  style,
}: HeaderProps) {
  return (
    <View style={[styles.container, styles[variant], style]}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.right}>{rightAction}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 56,
  },

  default: {
    backgroundColor: theme.colors.background.light,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  transparent: {
    backgroundColor: 'transparent',
  },

  left: {
    width: 40,
    alignItems: 'flex-start',
  },

  center: {
    flex: 1,
    alignItems: 'center',
  },

  right: {
    width: 40,
    alignItems: 'flex-end',
  },

  backButton: {
    padding: theme.spacing.xs,
  },

  backIcon: {
    fontSize: 24,
    color: theme.colors.primary.DEFAULT,
  },

  title: {
    ...theme.typography.heading4,
    color: theme.colors.text.primary,
  },
});
