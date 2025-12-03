/**
 * GlassCard - iOS 26 Liquid Glass Component with Fallbacks
 *
 * Features:
 * - Native Liquid Glass effect on iOS 26+
 * - Beautiful translucent fallback for older iOS/Android
 * - Multiple variants: default, clear, interactive
 * - Supports all standard View props
 * - Theme-aware with dark mode support
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import { GlassView, GlassContainer, isLiquidGlassAvailable } from 'expo-glass-effect';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../theme/useTheme';

// Check if Liquid Glass is available
const supportsLiquidGlass = isLiquidGlassAvailable();

export type GlassEffectStyle = 'clear' | 'regular';

export interface GlassCardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** 'clear' = more transparent, 'regular' = frosted blur */
  variant?: GlassEffectStyle;
  /** Enable touch interaction effects (iOS 26 only) */
  interactive?: boolean;
  /** Optional tint color overlay */
  tintColor?: string;
  /** Make the card pressable */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Border radius override */
  borderRadius?: number;
  /** Padding override */
  padding?: number;
  /** Test ID for testing */
  testID?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  variant = 'regular',
  interactive = false,
  tintColor,
  onPress,
  disabled = false,
  borderRadius = 16,
  padding = 16,
  testID,
}) => {
  const { colors, isDarkMode } = useTheme();

  // Fallback background colors
  const fallbackBackground = isDarkMode
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(255, 255, 255, 0.85)';

  const fallbackBackgroundClear = isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.6)';

  // Common styles
  const cardStyle: ViewStyle = {
    borderRadius,
    padding,
    overflow: 'hidden',
  };

  // Fallback shadow
  const shadowStyle: ViewStyle = {
    shadowColor: isDarkMode ? '#000' : '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 12,
    elevation: 4,
  };

  // Render content wrapper
  const renderContent = (wrapperStyle?: ViewStyle) => (
    <View style={[styles.contentWrapper, { padding }, wrapperStyle]}>
      {children}
    </View>
  );

  // iOS 26+ with Liquid Glass
  if (supportsLiquidGlass) {
    const glassContent = (
      <GlassView
        style={[cardStyle, shadowStyle, style]}
        glassEffectStyle={variant}
        isInteractive={interactive}
        tintColor={tintColor}
        testID={testID}
      >
        {children}
      </GlassView>
    );

    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.8}
          style={[disabled && styles.disabled]}
        >
          {glassContent}
        </TouchableOpacity>
      );
    }

    return glassContent;
  }

  // Fallback for older iOS and Android
  // Use BlurView for iOS, translucent View for Android
  const FallbackContent = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={[cardStyle, shadowStyle, style]}>
          <BlurView
            intensity={variant === 'clear' ? 40 : 80}
            tint={isDarkMode ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: tintColor || (variant === 'clear'
                  ? fallbackBackgroundClear
                  : fallbackBackground),
              },
            ]}
          />
          {renderContent({ padding: 0 })}
        </View>
      );
    }

    // Android fallback - translucent card
    return (
      <View
        style={[
          cardStyle,
          shadowStyle,
          {
            backgroundColor: tintColor || (variant === 'clear'
              ? fallbackBackgroundClear
              : fallbackBackground),
            borderWidth: 1,
            borderColor: isDarkMode
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)',
          },
          style,
        ]}
        testID={testID}
      >
        {children}
      </View>
    );
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[disabled && styles.disabled]}
      >
        <FallbackContent />
      </TouchableOpacity>
    );
  }

  return <FallbackContent />;
};

/**
 * GlassCardContainer - Wrapper for multiple GlassCards with morphing effect
 *
 * On iOS 26+, glass elements will merge when they get close to each other.
 * The spacing prop controls the threshold distance for this merging effect.
 */
export interface GlassCardContainerProps {
  children: React.ReactNode;
  /** Distance at which glass elements begin merging (iOS 26 only) */
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

export const GlassCardContainer: React.FC<GlassCardContainerProps> = ({
  children,
  spacing = 10,
  style,
}) => {
  if (supportsLiquidGlass) {
    return (
      <GlassContainer spacing={spacing} style={style}>
        {children}
      </GlassContainer>
    );
  }

  // Fallback - just render as a View
  return <View style={style}>{children}</View>;
};

/**
 * Quick Action Glass Button - Specialized for home screen quick actions
 */
export interface GlassActionButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const GlassActionButton: React.FC<GlassActionButtonProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <GlassCard
      variant="regular"
      interactive
      onPress={onPress}
      style={[styles.actionButton, style]}
      padding={16}
    >
      <View style={styles.actionContent}>
        <View style={styles.actionIcon}>{icon}</View>
        <View style={styles.actionTextContainer}>
          {title}
        </View>
      </View>
    </GlassCard>
  );
};

/**
 * Glass Mood Card - Specialized for mood check-in widget
 */
export interface GlassMoodCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GlassMoodCard: React.FC<GlassMoodCardProps> = ({
  children,
  style,
}) => {
  return (
    <GlassCard
      variant="regular"
      style={[styles.moodCard, style]}
      padding={20}
    >
      {children}
    </GlassCard>
  );
};

/**
 * Glass Plan Card - Specialized for daily plan items
 */
export interface GlassPlanCardProps {
  children: React.ReactNode;
  completed?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const GlassPlanCard: React.FC<GlassPlanCardProps> = ({
  children,
  completed = false,
  onPress,
  style,
}) => {
  return (
    <GlassCard
      variant={completed ? 'clear' : 'regular'}
      interactive={!completed}
      onPress={onPress}
      style={[
        styles.planCard,
        completed && styles.planCardCompleted,
        style,
      ]}
      padding={16}
    >
      {children}
    </GlassCard>
  );
};

// Utility function to check Liquid Glass support
export const isGlassEffectSupported = (): boolean => supportsLiquidGlass;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  actionButton: {
    flex: 1,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTextContainer: {
    flex: 1,
  },
  moodCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  planCard: {
    marginBottom: 12,
    height: 96,
  },
  planCardCompleted: {
    opacity: 0.6,
  },
});

export default GlassCard;
