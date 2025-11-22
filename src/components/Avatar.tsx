/**
 * Avatar Component
 * User avatar with image or initials
 */

import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

export type AvatarSize = 'small' | 'medium' | 'large';

export interface AvatarProps {
  image?: string;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
}

const SIZES = {
  small: 32,
  medium: 48,
  large: 80,
};

const FONT_SIZES = {
  small: 14,
  medium: 18,
  large: 28,
};

export function Avatar({ image, name = '', size = 'medium', style }: AvatarProps) {
  const containerSize = SIZES[size];
  const fontSize = FONT_SIZES[size];

  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        },
        style,
      ]}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={[
            styles.image,
            {
              width: containerSize,
              height: containerSize,
              borderRadius: containerSize / 2,
            },
          ]}
        />
      ) : (
        <Text style={[styles.initials, { fontSize }]}>{initials || '?'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  image: {
    resizeMode: 'cover',
  },

  initials: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
  },
});
