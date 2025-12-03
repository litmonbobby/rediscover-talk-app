/**
 * Accessibility Context
 * Provides app-wide accessibility settings that actually affect the UI
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccessibilityInfo, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export interface AccessibilitySettings {
  reduceMotion: boolean;
  largeText: boolean;
  highContrast: boolean;
  screenReaderOptimized: boolean;
  hapticFeedback: boolean;
  boldText: boolean;
  increasedSpacing: boolean;
  monoAudio: boolean;
}

export const defaultAccessibilitySettings: AccessibilitySettings = {
  reduceMotion: false,
  largeText: false,
  highContrast: false,
  screenReaderOptimized: false,
  hapticFeedback: true,
  boldText: false,
  increasedSpacing: false,
  monoAudio: false,
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => Promise<void>;
  updateSettings: (settings: Partial<AccessibilitySettings>) => Promise<void>;
  isScreenReaderEnabled: boolean;
  triggerHaptic: (type?: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error') => void;
  // Computed values for easy use
  fontSizeMultiplier: number;
  fontWeight: '400' | '500' | '600' | '700';
  spacingMultiplier: number;
  animationDuration: number;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const ACCESSIBILITY_STORAGE_KEY = '@accessibility_settings';

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings);
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

  // Load settings and check screen reader on mount
  useEffect(() => {
    loadSettings();
    checkScreenReader();

    // Listen for screen reader changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (enabled: boolean) => {
        setIsScreenReaderEnabled(enabled);
      }
    );

    // Also listen for reduce motion preference from system
    const reduceMotionSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled: boolean) => {
        // Optionally sync with system setting
        // updateSetting('reduceMotion', enabled);
      }
    );

    return () => {
      subscription.remove();
      reduceMotionSubscription.remove();
    };
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultAccessibilitySettings, ...parsed });
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    }
  };

  const checkScreenReader = async () => {
    try {
      const enabled = await AccessibilityInfo.isScreenReaderEnabled();
      setIsScreenReaderEnabled(enabled);
    } catch (error) {
      console.error('Error checking screen reader:', error);
    }
  };

  const saveSettings = async (newSettings: AccessibilitySettings) => {
    try {
      await AsyncStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
  };

  const updateSetting = async (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    await saveSettings(newSettings);
  };

  const updateSettings = async (partialSettings: Partial<AccessibilitySettings>) => {
    const newSettings = { ...settings, ...partialSettings };
    await saveSettings(newSettings);
  };

  // Haptic feedback function that respects user preference
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error' = 'light') => {
    if (!settings.hapticFeedback) return;

    try {
      switch (type) {
        case 'light':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'selection':
          Haptics.selectionAsync();
          break;
        case 'success':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
      }
    } catch (error) {
      // Haptics may not be available on all devices
    }
  };

  // Computed values based on settings
  const fontSizeMultiplier = settings.largeText ? 1.2 : 1;
  const fontWeight: '400' | '500' | '600' | '700' = settings.boldText ? '700' : '400';
  const spacingMultiplier = settings.increasedSpacing ? 1.25 : 1;
  const animationDuration = settings.reduceMotion ? 0 : 300;

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettings,
        isScreenReaderEnabled,
        triggerHaptic,
        fontSizeMultiplier,
        fontWeight,
        spacingMultiplier,
        animationDuration,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibilityContext = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibilityContext must be used within an AccessibilityProvider');
  }
  return context;
};

export default AccessibilityContext;
