/**
 * App Appearance Screen - Theme and visual settings
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

type ThemeOption = 'light' | 'dark' | 'system';

export const AppAppearanceScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('system');

  const themeOptions: { id: ThemeOption; label: string; emoji: string }[] = [
    { id: 'light', label: 'Light', emoji: '☀️' },
    { id: 'dark', label: 'Dark', emoji: '🌙' },
    { id: 'system', label: 'System', emoji: '📱' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>App Appearance</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>Theme</Text>

        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              { backgroundColor: colors.background.card },
              selectedTheme === option.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedTheme(option.id)}
          >
            <Text style={styles.optionEmoji}>{option.emoji}</Text>
            <Text style={[styles.optionLabel, { color: colors.text.primary }]}>
              {option.label}
            </Text>
            {selectedTheme === option.id && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}

        <View style={[styles.previewCard, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.previewTitle, { color: colors.text.primary }]}>Preview</Text>
          <Text style={[styles.previewText, { color: colors.text.secondary }]}>
            Currently using {isDarkMode ? 'dark' : 'light'} mode
          </Text>
        </View>
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
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 12, textTransform: 'uppercase' },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#9EB567',
  },
  optionEmoji: { fontSize: 24, marginRight: 12 },
  optionLabel: { flex: 1, fontSize: 16, fontWeight: '600' },
  checkmark: { fontSize: 18, color: '#9EB567', fontWeight: '700' },
  previewCard: {
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  previewTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  previewText: { fontSize: 14 },
});

export default AppAppearanceScreen;
