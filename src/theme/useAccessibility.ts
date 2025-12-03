/**
 * useAccessibility Hook
 * Provides accessibility settings and computed styles throughout the app
 */

import { useMemo } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { useAccessibilityContext } from './AccessibilityContext';
import { typography, spacing } from './index';

interface AccessibleTextStyle extends TextStyle {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700';
  lineHeight: number;
}

interface AccessibleStyles {
  // Text styles with accessibility adjustments
  text: {
    xs: AccessibleTextStyle;
    sm: AccessibleTextStyle;
    base: AccessibleTextStyle;
    lg: AccessibleTextStyle;
    xl: AccessibleTextStyle;
    '2xl': AccessibleTextStyle;
    '3xl': AccessibleTextStyle;
    '4xl': AccessibleTextStyle;
  };
  // Spacing with accessibility adjustments
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
  };
  // Touch target sizes (minimum 44x44 for accessibility)
  touchTarget: ViewStyle;
}

export const useAccessibility = () => {
  const {
    settings,
    updateSetting,
    updateSettings,
    isScreenReaderEnabled,
    triggerHaptic,
    fontSizeMultiplier,
    fontWeight,
    spacingMultiplier,
    animationDuration,
  } = useAccessibilityContext();

  // Compute accessible text styles
  const accessibleStyles = useMemo<AccessibleStyles>(() => {
    const baseFontWeight = settings.boldText ? '700' : '400';
    const boldFontWeight = settings.boldText ? '700' : '600';

    // Create text styles with accessibility adjustments
    const createTextStyle = (
      size: number,
      weight: '400' | '500' | '600' | '700' = baseFontWeight as any
    ): AccessibleTextStyle => ({
      fontSize: Math.round(size * fontSizeMultiplier),
      fontWeight: settings.boldText ? '700' : weight,
      lineHeight: Math.round(size * fontSizeMultiplier * (settings.increasedSpacing ? 1.6 : 1.4)),
    });

    return {
      text: {
        xs: createTextStyle(12),
        sm: createTextStyle(14),
        base: createTextStyle(16),
        lg: createTextStyle(18),
        xl: createTextStyle(20),
        '2xl': createTextStyle(24, boldFontWeight as any),
        '3xl': createTextStyle(28, boldFontWeight as any),
        '4xl': createTextStyle(32, boldFontWeight as any),
      },
      spacing: {
        xs: Math.round(4 * spacingMultiplier),
        sm: Math.round(8 * spacingMultiplier),
        md: Math.round(12 * spacingMultiplier),
        lg: Math.round(16 * spacingMultiplier),
        xl: Math.round(20 * spacingMultiplier),
        '2xl': Math.round(24 * spacingMultiplier),
        '3xl': Math.round(32 * spacingMultiplier),
      },
      // Ensure touch targets meet minimum accessibility requirements
      touchTarget: {
        minHeight: 44,
        minWidth: 44,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
      },
    };
  }, [settings, fontSizeMultiplier, spacingMultiplier]);

  // High contrast colors
  const highContrastColors = useMemo(() => {
    if (!settings.highContrast) return null;

    return {
      text: {
        primary: '#000000',
        secondary: '#333333',
        tertiary: '#555555',
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F5F5F5',
      },
      border: {
        light: '#999999',
        main: '#666666',
        dark: '#333333',
      },
    };
  }, [settings.highContrast]);

  // Animation config based on reduce motion setting
  const getAnimationConfig = (defaultDuration: number = 300) => ({
    duration: settings.reduceMotion ? 0 : defaultDuration,
    useNativeDriver: true,
  });

  // Check if we should use simplified UI for screen readers
  const shouldSimplifyForScreenReader = settings.screenReaderOptimized || isScreenReaderEnabled;

  // Get accessible props for components
  const getAccessibleProps = (label: string, hint?: string) => ({
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
  });

  // Get accessible button props
  const getAccessibleButtonProps = (label: string, hint?: string) => ({
    ...getAccessibleProps(label, hint),
    accessibilityRole: 'button' as const,
  });

  // Get accessible text input props
  const getAccessibleInputProps = (label: string, hint?: string) => ({
    ...getAccessibleProps(label, hint),
    accessibilityRole: 'none' as const,
  });

  return {
    // Settings and controls
    settings,
    updateSetting,
    updateSettings,

    // Status
    isScreenReaderEnabled,
    shouldSimplifyForScreenReader,

    // Actions
    triggerHaptic,

    // Computed values
    fontSizeMultiplier,
    fontWeight,
    spacingMultiplier,
    animationDuration,

    // Styles
    accessibleStyles,
    highContrastColors,

    // Helpers
    getAnimationConfig,
    getAccessibleProps,
    getAccessibleButtonProps,
    getAccessibleInputProps,
  };
};

export default useAccessibility;
