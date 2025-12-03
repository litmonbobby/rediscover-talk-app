/**
 * Settings Screen - Exact Figma Recreation
 * Proper React Native components with Figma-extracted assets
 */

import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';

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

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);

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
        {/* App Appearance Section */}
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
