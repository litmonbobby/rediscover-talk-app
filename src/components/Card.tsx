/**
 * Card Component
 * Reusable container card with multiple variants
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export type CardVariant = 'default' | 'elevated' | 'outlined';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: keyof typeof theme.spacing;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  onPress,
  style,
}: CardProps) {
  const containerStyle: ViewStyle[] = [
    styles.container,
    styles[variant],
    { padding: theme.spacing[padding] },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
  },

  // Variants
  default: {
    backgroundColor: theme.colors.card.background,
  },

  elevated: {
    backgroundColor: theme.colors.card.background,
    ...theme.shadows.md,
  },

  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
});
