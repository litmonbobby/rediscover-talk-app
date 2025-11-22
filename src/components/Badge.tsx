/**
 * Badge Component
 * Achievement badge display
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

export interface BadgeProps {
  icon: string;
  title: string;
  description?: string;
  isEarned: boolean;
  style?: ViewStyle;
}

export function Badge({
  icon,
  title,
  description,
  isEarned,
  style,
}: BadgeProps) {
  return (
    <View style={[styles.container, !isEarned && styles.locked, style]}>
      <View style={[styles.iconContainer, !isEarned && styles.iconLocked]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={[styles.title, !isEarned && styles.textLocked]}>
        {title}
      </Text>
      {description && (
        <Text style={[styles.description, !isEarned && styles.textLocked]}>
          {description}
        </Text>
      )}
      {!isEarned && (
        <View style={styles.lockOverlay}>
          <Text style={styles.lockIcon}>🔒</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.card.background,
  },

  locked: {
    opacity: 0.6,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },

  iconLocked: {
    backgroundColor: theme.colors.badge.background,
  },

  icon: {
    fontSize: 40,
  },

  title: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },

  description: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  textLocked: {
    color: theme.colors.text.tertiary,
  },

  lockOverlay: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
  },

  lockIcon: {
    fontSize: 16,
  },
});
