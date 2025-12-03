/**
 * Settings Screen - Exact Figma Recreation
 * Proper React Native components with Figma-extracted assets
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { affirmationNotificationService } from '../../services/AffirmationNotificationService';
import { quoteNotificationService } from '../../services/QuoteNotificationService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type SettingsStackParamList = {
  Settings: undefined;
  Profile: undefined;
  ThemeSettings: undefined;
  LanguageSettings: undefined;
  PrivacySettings: undefined;
  ChangePassword: undefined;
  DataManagement: undefined;
  HelpSupport: undefined;
  About: undefined;
  AppleHealth: undefined;
};

type NavigationProp = NativeStackNavigationProp<SettingsStackParamList, 'Settings'>;

// Figma-extracted assets
const assets = {
  // Icons
  arrowLeft: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-left.png'),
  arrowRight: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-right-2.png'),
  notification: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-notification.png'),
  shieldDone: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-shield-done.png'),
  password: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-password.png'),
  setting: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-setting.png'),
  infoCircle: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-info-circle.png'),
  folder: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-folder.png'),
};

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

// Sun Icon for Theme
const SunIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Globe Icon for Language
const GlobeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 12H22"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Question/Help Icon
const HelpIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9C15 10.1046 14.1046 11 13 11H12V14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17H12.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Health/Heart Icon for Apple Health
const HealthIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Chevron Right Icon
const ChevronRightIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#999' }) => (
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

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  onPress: () => void;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  colors: any;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  subtitle,
  onPress,
  isToggle = false,
  toggleValue = false,
  onToggle,
  colors,
}) => (
  <TouchableOpacity
    style={[styles.settingItem, { backgroundColor: colors.background.card }]}
    onPress={isToggle ? undefined : onPress}
    activeOpacity={isToggle ? 1 : 0.7}
  >
    <View style={styles.settingItemLeft}>
      <View style={[styles.iconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.1)' }]}>
        {icon}
      </View>
      <View style={styles.settingItemContent}>
        <Text style={[styles.settingLabel, { color: colors.text.primary }]}>{label}</Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: colors.text.secondary }]}>{subtitle}</Text>
        )}
      </View>
    </View>
    {isToggle ? (
      <Switch
        value={toggleValue}
        onValueChange={onToggle}
        trackColor={{ false: '#E5E5E5', true: 'rgba(158, 181, 103, 0.5)' }}
        thumbColor={toggleValue ? '#9EB567' : '#FFFFFF'}
        ios_backgroundColor="#E5E5E5"
      />
    ) : (
      <ChevronRightIcon size={20} color={colors.text.tertiary} />
    )}
  </TouchableOpacity>
);

// Sparkle Icon for Affirmations
const SparkleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Quote/Chat Icon for Daily Quotes
const QuoteIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 21C3 21 5.5 18.5 6 18C6.5 17.5 10 16 10 12V5C10 4 9 3 8 3H5C4 3 3 4 3 5V12C3 13 4 14 5 14H7C7 17 3 21 3 21Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 21C14 21 16.5 18.5 17 18C17.5 17.5 21 16 21 12V5C21 4 20 3 19 3H16C15 3 14 4 14 5V12C14 13 15 14 16 14H18C18 17 14 21 14 21Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [affirmationNotifications, setAffirmationNotifications] = useState(false);
  const [quoteNotifications, setQuoteNotifications] = useState(false);

  // Load notification preferences on mount
  useEffect(() => {
    const loadNotificationPreferences = async () => {
      try {
        const affirmationEnabled = await affirmationNotificationService.isEnabled();
        setAffirmationNotifications(affirmationEnabled);

        const quoteEnabled = await quoteNotificationService.isEnabled();
        setQuoteNotifications(quoteEnabled);
      } catch (error) {
        console.error('Error loading notification preferences:', error);
      }
    };
    loadNotificationPreferences();
  }, []);

  // Handle affirmation notification toggle
  const handleAffirmationToggle = async (enabled: boolean) => {
    try {
      setAffirmationNotifications(enabled);
      await affirmationNotificationService.setEnabled(enabled);

      if (enabled) {
        Alert.alert(
          'Affirmations Enabled ✨',
          'You will receive a daily affirmation at 9:00 AM to start your day with positivity!',
          [{ text: 'Great!' }]
        );
      }
    } catch (error) {
      console.error('Error toggling affirmation notifications:', error);
      setAffirmationNotifications(!enabled); // Revert on error
      Alert.alert(
        'Error',
        'Unable to update notification settings. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Handle quote notification toggle
  const handleQuoteToggle = async (enabled: boolean) => {
    try {
      setQuoteNotifications(enabled);
      await quoteNotificationService.setEnabled(enabled);

      if (enabled) {
        Alert.alert(
          'Quotes Enabled 💭',
          'You will receive a daily inspirational quote at 8:00 AM to inspire your day!',
          [{ text: 'Great!' }]
        );
      }
    } catch (error) {
      console.error('Error toggling quote notifications:', error);
      setQuoteNotifications(!enabled); // Revert on error
      Alert.alert(
        'Error',
        'Unable to update notification settings. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTheme = () => {
    console.log('Theme settings pressed');
    toggleTheme();
  };

  const handleLanguage = () => {
    console.log('Language settings pressed');
  };

  const handlePrivacy = () => {
    console.log('Privacy settings pressed');
  };

  const handlePassword = () => {
    console.log('Change password pressed');
  };

  const handleDataManagement = () => {
    console.log('Data management pressed');
  };

  const handleHelpSupport = () => {
    console.log('Help & support pressed');
  };

  const handleAbout = () => {
    console.log('About pressed');
  };

  const handleAppleHealth = () => {
    navigation.navigate('AppleHealth' as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Settings</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Appearance Section - Hidden for now
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            App Appearance
          </Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<SunIcon size={22} color="#9EB567" />}
              label="Dark Mode"
              subtitle={isDarkMode ? 'On' : 'Off'}
              onPress={() => {}}
              isToggle
              toggleValue={isDarkMode}
              onToggle={() => toggleTheme()}
              colors={colors}
            />
            <SettingItem
              icon={<GlobeIcon size={22} color="#9EB567" />}
              label="Language"
              subtitle="English (US)"
              onPress={handleLanguage}
              colors={colors}
            />
          </View>
        </View>
        */}

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Notifications
          </Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={
                <Image
                  source={assets.notification}
                  style={[styles.settingIcon, { tintColor: '#9EB567' }]}
                  resizeMode="contain"
                />
              }
              label="Push Notifications"
              subtitle="Receive updates and reminders"
              onPress={() => {}}
              isToggle
              toggleValue={pushNotifications}
              onToggle={setPushNotifications}
              colors={colors}
            />
            <SettingItem
              icon={
                <Image
                  source={assets.notification}
                  style={[styles.settingIcon, { tintColor: '#9EB567' }]}
                  resizeMode="contain"
                />
              }
              label="Daily Reminder"
              subtitle="Get daily wellness check-ins"
              onPress={() => {}}
              isToggle
              toggleValue={dailyReminder}
              onToggle={setDailyReminder}
              colors={colors}
            />
            <SettingItem
              icon={<SparkleIcon size={22} color="#9EB567" />}
              label="Daily Affirmations"
              subtitle="Receive positive affirmations at 9 AM"
              onPress={() => {}}
              isToggle
              toggleValue={affirmationNotifications}
              onToggle={handleAffirmationToggle}
              colors={colors}
            />
            <SettingItem
              icon={<QuoteIcon size={22} color="#9EB567" />}
              label="Daily Quotes"
              subtitle="Receive inspirational quotes at 8 AM"
              onPress={() => {}}
              isToggle
              toggleValue={quoteNotifications}
              onToggle={handleQuoteToggle}
              colors={colors}
            />
          </View>
        </View>

        {/* Privacy & Security Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Privacy & Security
          </Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={
                <Image
                  source={assets.shieldDone}
                  style={[styles.settingIcon, { tintColor: '#9EB567' }]}
                  resizeMode="contain"
                />
              }
              label="Privacy Settings"
              subtitle="Control your data privacy"
              onPress={handlePrivacy}
              colors={colors}
            />
            <SettingItem
              icon={
                <Image
                  source={assets.password}
                  style={[styles.settingIcon, { tintColor: '#9EB567' }]}
                  resizeMode="contain"
                />
              }
              label="Change Password"
              subtitle="Update your password"
              onPress={handlePassword}
              colors={colors}
            />
            <SettingItem
              icon={
                <Image
                  source={assets.folder}
                  style={[styles.settingIcon, { tintColor: '#9EB567' }]}
                  resizeMode="contain"
                />
              }
              label="Data Management"
              subtitle="Manage your data preferences"
              onPress={handleDataManagement}
              colors={colors}
            />
          </View>
        </View>

        {/* Integrations Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
            Integrations
          </Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<HealthIcon size={22} color="#9EB567" />}
              label="Apple Health"
              subtitle="Sync wellness data with HealthKit"
              onPress={handleAppleHealth}
              colors={colors}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<HelpIcon size={22} color="#9EB567" />}
              label="Help & Support"
              subtitle="Get help with using the app"
              onPress={handleHelpSupport}
              colors={colors}
            />
            <SettingItem
              icon={
                <Image
                  source={assets.infoCircle}
                  style={[styles.settingIcon, { tintColor: '#9EB567' }]}
                  resizeMode="contain"
                />
              }
              label="About"
              subtitle="App version and information"
              onPress={handleAbout}
              colors={colors}
            />
          </View>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.text.tertiary }]}>
            Rediscover Talk v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionContent: {
    gap: 8,
  },

  // Setting Item
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingIcon: {
    width: 22,
    height: 22,
  },
  settingItemContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
  },

  // Version
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 13,
  },
});

export default SettingsScreen;
