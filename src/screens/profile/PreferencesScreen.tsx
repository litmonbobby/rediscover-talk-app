/**
 * Preferences Screen - App preferences
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

export const PreferencesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [preferences, setPreferences] = useState({
    notifications: true,
    sounds: true,
    haptics: true,
    autoPlay: false,
    showTips: true,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const preferenceItems = [
    { key: 'notifications' as const, title: 'Push Notifications', description: 'Receive reminders and updates' },
    { key: 'sounds' as const, title: 'In-App Sounds', description: 'Play sounds during exercises' },
    { key: 'haptics' as const, title: 'Haptic Feedback', description: 'Vibration on interactions' },
    { key: 'autoPlay' as const, title: 'Auto-play Content', description: 'Automatically play meditations' },
    { key: 'showTips' as const, title: 'Show Tips', description: 'Display helpful tips in the app' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Preferences</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {preferenceItems.map((item) => (
          <View
            key={item.key}
            style={[styles.preferenceCard, { backgroundColor: colors.background.card }]}
          >
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
              trackColor={{ false: '#E0E0E0', true: 'rgba(158,181,103,0.4)' }}
              thumbColor={preferences[item.key] ? '#9EB567' : '#f4f3f4'}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: { width: 40 },
  backText: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  placeholder: { width: 40 },
  content: { flex: 1, paddingHorizontal: 20 },
  preferenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  preferenceInfo: { flex: 1, marginRight: 16 },
  preferenceTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  preferenceDescription: { fontSize: 13 },
});

export default PreferencesScreen;
