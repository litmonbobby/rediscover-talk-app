/**
 * Accessibility Screen
 * Comprehensive accessibility settings for the app
 * Uses AccessibilityContext to apply settings app-wide
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { useAccessibility } from '../../theme/useAccessibility';
import { AccessibilitySettings } from '../../theme/AccessibilityContext';

// Back Arrow Icon
const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Chevron Right Icon
const ChevronRightIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#9E9E9E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6L15 12L9 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Accessibility Icon
const AccessibilityIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#9EB567' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"
      fill={color}
    />
  </Svg>
);

export const AccessibilityScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();
  const {
    settings,
    updateSetting,
    isScreenReaderEnabled,
    triggerHaptic,
    accessibleStyles,
  } = useAccessibility();

  const handleBack = () => {
    triggerHaptic('light');
    navigation.goBack();
  };

  const handleToggle = (key: keyof AccessibilitySettings) => {
    triggerHaptic('selection');
    updateSetting(key, !settings[key]);
  };

  const openSystemAccessibility = () => {
    triggerHaptic('light');
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>{title}</Text>
      <View style={[styles.sectionContent, { backgroundColor: colors.background.card }]}>
        {children}
      </View>
    </View>
  );

  const renderToggleItem = (
    title: string,
    subtitle: string,
    key: keyof AccessibilitySettings,
    isLast = false
  ) => (
    <View
      style={[
        styles.settingItem,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border.light },
      ]}
      accessible={true}
      accessibilityRole="switch"
      accessibilityLabel={title}
      accessibilityHint={subtitle}
      accessibilityState={{ checked: settings[key] }}
    >
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: colors.text.primary }]}>{title}</Text>
        <Text style={[styles.settingSubtitle, { color: colors.text.tertiary }]}>{subtitle}</Text>
      </View>
      <Switch
        value={settings[key]}
        onValueChange={() => handleToggle(key)}
        trackColor={{ false: colors.border.light, true: '#9EB567' }}
        thumbColor={settings[key] ? '#FFFFFF' : '#F4F4F4'}
        ios_backgroundColor={colors.border.light}
      />
    </View>
  );

  const renderLinkItem = (title: string, subtitle: string, onPress: () => void, isLast = false) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border.light },
      ]}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={subtitle}
    >
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: colors.text.primary }]}>{title}</Text>
        <Text style={[styles.settingSubtitle, { color: colors.text.tertiary }]}>{subtitle}</Text>
      </View>
      <ChevronRightIcon color={colors.text.tertiary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border.light }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Accessibility</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Reader Status */}
        <View style={[styles.statusCard, { backgroundColor: colors.background.card }]}>
          <View style={[styles.statusIcon, { backgroundColor: isScreenReaderEnabled ? '#E8F5E9' : '#FFF3E0' }]}>
            <AccessibilityIcon size={28} color={isScreenReaderEnabled ? '#4CAF50' : '#FF9800'} />
          </View>
          <View style={styles.statusInfo}>
            <Text style={[styles.statusTitle, { color: colors.text.primary }]}>
              {Platform.OS === 'ios' ? 'VoiceOver' : 'TalkBack'} {isScreenReaderEnabled ? 'Enabled' : 'Disabled'}
            </Text>
            <Text style={[styles.statusSubtitle, { color: colors.text.secondary }]}>
              {isScreenReaderEnabled
                ? 'Screen reader is active. The app is optimized for your experience.'
                : 'Enable screen reader in your device settings for full accessibility.'}
            </Text>
          </View>
        </View>

        {/* Preview Card - Shows current settings in action */}
        <View style={[styles.previewCard, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.previewTitle, { color: colors.text.primary }]}>Preview</Text>
          <Text
            style={[
              styles.previewText,
              {
                color: colors.text.secondary,
                fontSize: accessibleStyles.text.base.fontSize,
                fontWeight: accessibleStyles.text.base.fontWeight,
                lineHeight: accessibleStyles.text.base.lineHeight,
              },
            ]}
          >
            This text adapts to your accessibility settings. Toggle options below to see changes in real-time.
          </Text>
        </View>

        {/* Visual Accessibility */}
        {renderSection(
          'VISUAL',
          <>
            {renderToggleItem(
              'Large Text',
              'Increase text size throughout the app',
              'largeText'
            )}
            {renderToggleItem(
              'Bold Text',
              'Use heavier font weights for better readability',
              'boldText'
            )}
            {renderToggleItem(
              'High Contrast',
              'Increase contrast for better visibility',
              'highContrast'
            )}
            {renderToggleItem(
              'Increased Spacing',
              'More space between text and elements',
              'increasedSpacing',
              true
            )}
          </>
        )}

        {/* Motion & Interaction */}
        {renderSection(
          'MOTION & INTERACTION',
          <>
            {renderToggleItem(
              'Reduce Motion',
              'Minimize animations and movement',
              'reduceMotion'
            )}
            {renderToggleItem(
              'Haptic Feedback',
              'Feel vibrations when interacting with the app',
              'hapticFeedback',
              true
            )}
          </>
        )}

        {/* Audio */}
        {renderSection(
          'AUDIO',
          <>
            {renderToggleItem(
              'Mono Audio',
              'Combine stereo audio into a single channel',
              'monoAudio',
              true
            )}
          </>
        )}

        {/* Screen Reader Optimization */}
        {renderSection(
          'SCREEN READER',
          <>
            {renderToggleItem(
              'Screen Reader Optimized',
              'Optimize navigation and content for screen readers',
              'screenReaderOptimized',
              true
            )}
          </>
        )}

        {/* System Settings */}
        {renderSection(
          'SYSTEM',
          <>
            {renderLinkItem(
              'Open System Accessibility Settings',
              'Configure VoiceOver, Dynamic Type, and more',
              openSystemAccessibility,
              true
            )}
          </>
        )}

        {/* About Accessibility */}
        <View style={[styles.infoCard, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.infoTitle, { color: colors.text.primary }]}>
            Our Commitment to Accessibility
          </Text>
          <Text style={[styles.infoText, { color: colors.text.secondary }]}>
            Rediscover Talk is committed to making mental wellness accessible to everyone.
            We follow WCAG 2.1 guidelines and continuously work to improve our app's accessibility.
          </Text>
          <Text style={[styles.infoText, { color: colors.text.secondary, marginTop: 8 }]}>
            If you encounter any accessibility issues or have suggestions, please contact us at
            accessibility@rediscovertalk.com
          </Text>
        </View>

        {/* Accessibility Features Summary */}
        <View style={[styles.featuresCard, { backgroundColor: isDarkMode ? '#2A3320' : '#F5F8F0' }]}>
          <Text style={[styles.featuresTitle, { color: isDarkMode ? '#B5C889' : '#5A6F3C' }]}>
            Built-in Features
          </Text>
          <View style={styles.featuresList}>
            <Text style={[styles.featureItem, { color: isDarkMode ? '#9EB567' : '#5A6F3C' }]}>
              VoiceOver & TalkBack support
            </Text>
            <Text style={[styles.featureItem, { color: isDarkMode ? '#9EB567' : '#5A6F3C' }]}>
              Dynamic Type support
            </Text>
            <Text style={[styles.featureItem, { color: isDarkMode ? '#9EB567' : '#5A6F3C' }]}>
              Semantic labels on all elements
            </Text>
            <Text style={[styles.featureItem, { color: isDarkMode ? '#9EB567' : '#5A6F3C' }]}>
              Color contrast compliant
            </Text>
            <Text style={[styles.featureItem, { color: isDarkMode ? '#9EB567' : '#5A6F3C' }]}>
              Keyboard navigation ready
            </Text>
            <Text style={[styles.featureItem, { color: isDarkMode ? '#9EB567' : '#5A6F3C' }]}>
              Reduce motion support
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },

  // Status Card
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  statusIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Preview Card
  previewCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  previewText: {
    // Dynamic styles applied inline
  },

  // Section
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
  sectionContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Setting Item
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
  },

  // Info Card
  infoCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Features Card
  featuresCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  featuresList: {
    gap: 6,
  },
  featureItem: {
    fontSize: 13,
    paddingLeft: 8,
  },
});

export default AccessibilityScreen;
