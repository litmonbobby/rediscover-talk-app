import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'glass';
  padding?: keyof typeof theme.spacing;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'glass',
  padding = 4,
  glow = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        variant === 'outlined' && styles.outlined,
        variant === 'glass' && styles.glass,
        glow && styles.glow,
        { padding: theme.spacing[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.lg,
  },
  glass: {
    backgroundColor: theme.colors.background.card,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    ...theme.shadows.base,
  },
  elevated: {
    backgroundColor: theme.colors.background.cardElevated,
    ...theme.shadows.md,
  },
  outlined: {
    backgroundColor: theme.colors.background.card,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
  },
  glow: {
    ...theme.shadows.glow.lime,
  },
});
