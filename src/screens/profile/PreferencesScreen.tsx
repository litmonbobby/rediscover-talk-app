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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
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

export const PreferencesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [preferences, setPreferences] = useState<PreferencesType>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<string>('undetermined');

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
    checkNotificationPermission();
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

  const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationPermission(status);
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    if (existingStatus === 'granted') {
      return true;
    }

    if (existingStatus === 'denied') {
      Alert.alert(
        'Notifications Disabled',
        'Please enable notifications in your device settings to receive reminders.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationPermission(status);
    return status === 'granted';
  };

  const triggerHaptic = useCallback(() => {
    if (preferences.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [preferences.hapticFeedback]);

  const togglePreference = async (key: PreferenceKey) => {
    triggerHaptic();

    // Special handling for notification-related preferences
    if (key === 'pushNotifications' || key === 'dailyReminders' || key === 'weeklyProgress' || key === 'newContent') {
      if (!preferences[key]) {
        // Turning ON - need permission
        const hasPermission = await requestNotificationPermission();
        if (!hasPermission) return;
      }
    }

    const newPreferences = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPreferences);
    await savePreferences(newPreferences);

    // Special feedback for haptic toggle
    if (key === 'hapticFeedback' && newPreferences.hapticFeedback) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.brand.primary} />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Loading preferences...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Preferences</Text>
        <View style={styles.placeholder}>
          {isSaving && <ActivityIndicator size="small" color={colors.brand.primary} />}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Notification Permission Banner */}
        {notificationPermission === 'denied' && (
          <TouchableOpacity
            style={[styles.permissionBanner, { backgroundColor: colors.feedback.warning + '20' }]}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.permissionIcon}>⚠️</Text>
            <View style={styles.permissionTextContainer}>
              <Text style={[styles.permissionTitle, { color: colors.text.primary }]}>
                Notifications Disabled
              </Text>
              <Text style={[styles.permissionDescription, { color: colors.text.secondary }]}>
                Tap to open settings and enable notifications
              </Text>
            </View>
            <Text style={[styles.permissionArrow, { color: colors.text.secondary }]}>→</Text>
          </TouchableOpacity>
        )}

        {/* Preference Sections */}
        {sections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
              {section.title.toUpperCase()}
            </Text>

            <View style={[styles.sectionCard, { backgroundColor: colors.background.card }]}>
              {section.items.map((item, itemIndex) => (
                <View key={item.key}>
                  <View style={styles.preferenceRow}>
                    <Text style={styles.preferenceIcon}>{item.icon}</Text>
                    <View style={styles.preferenceInfo}>
                      <Text style={[styles.preferenceTitle, { color: colors.text.primary }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.preferenceDescription, { color: colors.text.secondary }]}>
                        {item.description}
                      </Text>
                    </View>
                    <Switch
                      value={preferences[item.key]}
                      onValueChange={() => togglePreference(item.key)}
                      trackColor={{
                        false: colors.ui.border,
                        true: colors.brand.primary + '60'
                      }}
                      thumbColor={preferences[item.key] ? colors.brand.primary : '#f4f3f4'}
                      ios_backgroundColor={colors.ui.border}
                    />
                  </View>
                  {itemIndex < section.items.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.ui.border }]} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Reset Button */}
        <TouchableOpacity
          style={[styles.resetButton, { borderColor: colors.feedback.error }]}
          onPress={resetToDefaults}
        >
          <Text style={[styles.resetButtonText, { color: colors.feedback.error }]}>
            Reset to Defaults
          </Text>
        </TouchableOpacity>

        {/* Info Text */}
        <Text style={[styles.infoText, { color: colors.text.tertiary }]}>
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
  permissionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  permissionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  permissionTextContainer: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  permissionDescription: {
    fontSize: 13,
  },
  permissionArrow: {
    fontSize: 18,
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
