/**
 * Preferences Screen - Full functional app preferences
 *
 * Features:
 * - Persistent storage with AsyncStorage
 * - Notification permissions
 * - Haptic feedback settings
 * - Sound preferences
 * - Data & privacy controls
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Linking,
  Platform,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/useTheme';

// Storage key for preferences
const PREFERENCES_KEY = '@rediscover_talk_preferences';

// Default preferences
const DEFAULT_PREFERENCES = {
  // Notifications
  pushNotifications: true,
  dailyReminders: true,
  weeklyProgress: true,
  newContent: false,

  // Sound & Haptics
  inAppSounds: true,
  meditationSounds: true,
  hapticFeedback: true,

  // Content
  autoPlayContent: false,
  showTips: true,
  showQuotes: true,

  // Privacy
  analyticsEnabled: true,
  crashReports: true,
  personalizedContent: true,

  // Accessibility
  reducedMotion: false,
  largerText: false,
  highContrast: false,
};

type PreferencesType = typeof DEFAULT_PREFERENCES;
type PreferenceKey = keyof PreferencesType;

interface PreferenceItem {
  key: PreferenceKey;
  title: string;
  description: string;
  icon: string;
}

interface PreferenceSection {
  title: string;
  items: PreferenceItem[];
}

// Fallback colors in case theme colors are not available
const FALLBACK_COLORS = {
  primary: '#9EB567',
  background: '#FFFFFF',
  card: '#F5F5F5',
  text: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#E0E0E0',
  error: '#E53935',
  warning: '#FFA726',
};

export const PreferencesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [preferences, setPreferences] = useState<PreferencesType>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Safe color access with fallbacks
  const safeColors = {
    primary: colors?.primary?.main || FALLBACK_COLORS.primary,
    background: colors?.background?.primary || FALLBACK_COLORS.background,
    card: colors?.background?.card || FALLBACK_COLORS.card,
    text: colors?.text?.primary || FALLBACK_COLORS.text,
    textSecondary: colors?.text?.secondary || FALLBACK_COLORS.textSecondary,
    textTertiary: colors?.text?.tertiary || FALLBACK_COLORS.textTertiary,
    border: colors?.ui?.border || FALLBACK_COLORS.border,
    error: colors?.feedback?.error || FALLBACK_COLORS.error,
    warning: colors?.feedback?.warning || FALLBACK_COLORS.warning,
  };

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async (newPreferences: PreferencesType) => {
    setIsSaving(true);
    try {
      await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const triggerHaptic = useCallback(() => {
    if (preferences.hapticFeedback) {
      // Use native Vibration API as fallback
      Vibration.vibrate(10);
    }
  }, [preferences.hapticFeedback]);

  const togglePreference = async (key: PreferenceKey) => {
    triggerHaptic();

    // Special handling for notification-related preferences
    if (key === 'pushNotifications' || key === 'dailyReminders' || key === 'weeklyProgress' || key === 'newContent') {
      if (!preferences[key]) {
        // Show info about notifications
        Alert.alert(
          'Notification Permissions',
          'To receive notifications, make sure they are enabled in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
            {
              text: 'Enable Anyway',
              onPress: async () => {
                const newPreferences = { ...preferences, [key]: true };
                setPreferences(newPreferences);
                await savePreferences(newPreferences);
              }
            },
          ]
        );
        return;
      }
    }

    const newPreferences = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPreferences);
    await savePreferences(newPreferences);

    // Special feedback for haptic toggle
    if (key === 'hapticFeedback' && newPreferences.hapticFeedback) {
      Vibration.vibrate([0, 50, 50, 50]);
    }
  };

  const resetToDefaults = () => {
    Alert.alert(
      'Reset Preferences',
      'Are you sure you want to reset all preferences to their default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            triggerHaptic();
            setPreferences(DEFAULT_PREFERENCES);
            await savePreferences(DEFAULT_PREFERENCES);
            Alert.alert('Success', 'Preferences have been reset to defaults.');
          },
        },
      ]
    );
  };

  const sections: PreferenceSection[] = [
    {
      title: 'Notifications',
      items: [
        { key: 'pushNotifications', title: 'Push Notifications', description: 'Receive all app notifications', icon: '🔔' },
        { key: 'dailyReminders', title: 'Daily Reminders', description: 'Mood check-in and habit reminders', icon: '⏰' },
        { key: 'weeklyProgress', title: 'Weekly Progress', description: 'Weekly summary and insights', icon: '📊' },
        { key: 'newContent', title: 'New Content', description: 'Notifications about new meditations', icon: '✨' },
      ],
    },
    {
      title: 'Sound & Haptics',
      items: [
        { key: 'inAppSounds', title: 'In-App Sounds', description: 'UI sounds and feedback', icon: '🔊' },
        { key: 'meditationSounds', title: 'Meditation Sounds', description: 'Background sounds during sessions', icon: '🎵' },
        { key: 'hapticFeedback', title: 'Haptic Feedback', description: 'Vibration on interactions', icon: '📳' },
      ],
    },
    {
      title: 'Content',
      items: [
        { key: 'autoPlayContent', title: 'Auto-play Content', description: 'Automatically start meditations', icon: '▶️' },
        { key: 'showTips', title: 'Show Tips', description: 'Display helpful tips throughout app', icon: '💡' },
        { key: 'showQuotes', title: 'Daily Quotes', description: 'Show inspirational quotes', icon: '💬' },
      ],
    },
    {
      title: 'Privacy & Data',
      items: [
        { key: 'analyticsEnabled', title: 'Analytics', description: 'Help improve the app experience', icon: '📈' },
        { key: 'crashReports', title: 'Crash Reports', description: 'Send crash reports to fix bugs', icon: '🐛' },
        { key: 'personalizedContent', title: 'Personalized Content', description: 'Tailored recommendations for you', icon: '🎯' },
      ],
    },
    {
      title: 'Accessibility',
      items: [
        { key: 'reducedMotion', title: 'Reduced Motion', description: 'Minimize animations', icon: '🎭' },
        { key: 'largerText', title: 'Larger Text', description: 'Increase text size', icon: '🔤' },
        { key: 'highContrast', title: 'High Contrast', description: 'Increase color contrast', icon: '🌓' },
      ],
    },
  ];

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: safeColors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={safeColors.primary} />
          <Text style={[styles.loadingText, { color: safeColors.textSecondary }]}>
            Loading preferences...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: safeColors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <Text style={[styles.backText, { color: safeColors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: safeColors.text }]}>Preferences</Text>
        <View style={styles.placeholder}>
          {isSaving && <ActivityIndicator size="small" color={safeColors.primary} />}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Preference Sections */}
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: safeColors.textSecondary }]}>
              {section.title.toUpperCase()}
            </Text>

            <View style={[styles.sectionCard, { backgroundColor: safeColors.card }]}>
              {section.items.map((item, itemIndex) => (
                <View key={item.key}>
                  <View style={styles.preferenceRow}>
                    <Text style={styles.preferenceIcon}>{item.icon}</Text>
                    <View style={styles.preferenceInfo}>
                      <Text style={[styles.preferenceTitle, { color: safeColors.text }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.preferenceDescription, { color: safeColors.textSecondary }]}>
                        {item.description}
                      </Text>
                    </View>
                    <Switch
                      value={preferences[item.key]}
                      onValueChange={() => togglePreference(item.key)}
                      trackColor={{
                        false: safeColors.border,
                        true: safeColors.primary + '60'
                      }}
                      thumbColor={preferences[item.key] ? safeColors.primary : '#f4f3f4'}
                      ios_backgroundColor={safeColors.border}
                    />
                  </View>
                  {itemIndex < section.items.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: safeColors.border }]} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Reset Button */}
        <TouchableOpacity
          style={[styles.resetButton, { borderColor: safeColors.error }]}
          onPress={resetToDefaults}
        >
          <Text style={[styles.resetButtonText, { color: safeColors.error }]}>
            Reset to Defaults
          </Text>
        </TouchableOpacity>

        {/* Info Text */}
        <Text style={[styles.infoText, { color: safeColors.textTertiary }]}>
          Your preferences are automatically saved and synced across your devices when signed in.
        </Text>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  preferenceIcon: {
    fontSize: 22,
    marginRight: 14,
    width: 28,
    textAlign: 'center',
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  preferenceDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    marginLeft: 56,
  },
  resetButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default PreferencesScreen;
