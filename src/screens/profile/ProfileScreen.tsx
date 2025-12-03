/**
 * Profile Screen - Account Settings
 * Exact Figma Recreation with Figma-extracted icons
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';

type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Subscription: undefined;
  PersonalInfo: undefined;
  AccountSecurity: undefined;
  LinkedAccounts: undefined;
  Billing: undefined;
  PaymentMethods: undefined;
  AppAppearance: undefined;
  DataAnalytics: undefined;
  MyBadges: undefined;
  DailyReminder: undefined;
  Preferences: undefined;
};

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

// Figma-extracted icon assets
const icons = {
  logo: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-category.png'),
  moreCircle: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-more-circle.png'),
  ticketStar: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-ticket-star.png'),
  notification: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-notification.png'),
  setting: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-setting.png'),
  shieldDone: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-shield-done.png'),
  wallet: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-wallet.png'),
  star: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-star.png'),
  twoUser: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-2-user.png'),
  show: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-show.png'),
  chart: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-chart.png'),
  arrowRight: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-right-2.png'),
  profile: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-profile.png'),
};

// Menu item structure
interface MenuItem {
  id: string;
  title: string;
  icon: ImageSourcePropType;
  route?: keyof ProfileStackParamList;
  onPress?: () => void;
}

// Primary menu items with Figma icons
const primaryMenuItems: MenuItem[] = [
  { id: '1', title: 'My Badges', icon: icons.ticketStar, route: 'MyBadges' },
  { id: '2', title: 'Daily Reminder', icon: icons.notification, route: 'DailyReminder' },
  { id: '3', title: 'Preferences', icon: icons.setting, route: 'Preferences' },
];

// Secondary menu items with Figma icons
const secondaryMenuItems: MenuItem[] = [
  { id: '4', title: 'Account & Security', icon: icons.shieldDone, route: 'AccountSecurity' },
  { id: '5', title: 'Payment Methods', icon: icons.wallet, route: 'PaymentMethods' },
  { id: '6', title: 'Billing & Subscriptions', icon: icons.star, route: 'Billing' },
  { id: '7', title: 'Linked Accounts', icon: icons.twoUser, route: 'LinkedAccounts' },
  { id: '8', title: 'App Appearance', icon: icons.show, route: 'AppAppearance' },
  { id: '9', title: 'Data & Analytics', icon: icons.chart, route: 'DataAnalytics' },
];

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      navigation.navigate(item.route);
    } else if (item.onPress) {
      item.onPress();
    }
  };

  const handleUpgrade = () => {
    navigation.navigate('Subscription');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleMoreOptions = () => {
    console.log('More options pressed');
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, { backgroundColor: colors.background.card }]}
      onPress={() => handleMenuPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        <Image
          source={item.icon}
          style={[styles.menuIcon, { tintColor: '#9EB567' }]}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.menuTitle, { color: colors.text.primary }]}>
        {item.title}
      </Text>
      <Image
        source={icons.arrowRight}
        style={[styles.menuArrow, { tintColor: colors.text.tertiary }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.logoContainer, { backgroundColor: '#9EB567' }]}>
              <Image
                source={icons.logo}
                style={styles.logoIcon}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Account
          </Text>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={handleMoreOptions}
          >
            <Image
              source={icons.moreCircle}
              style={[styles.moreIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Upgrade Banner */}
        <TouchableOpacity
          style={[styles.upgradeBanner, { backgroundColor: '#9EB567' }]}
          onPress={handleUpgrade}
          activeOpacity={0.9}
        >
          <View style={styles.upgradeIcon}>
            <Image
              source={icons.star}
              style={styles.crownIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.upgradeContent}>
            <Text style={styles.upgradeTitle}>Upgrade Plan Now!</Text>
            <Text style={styles.upgradeSubtitle}>
              Enjoy all the benefits and explore more possibilities
            </Text>
          </View>
        </TouchableOpacity>

        {/* User Profile Card */}
        <TouchableOpacity
          style={[styles.profileCard, { backgroundColor: colors.background.card }]}
          onPress={handleProfilePress}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.text.primary }]}>
              Andrew Ainsley
            </Text>
            <Text style={[styles.userEmail, { color: colors.text.secondary }]}>
              andrew@yourdomain.com
            </Text>
          </View>
          <Image
            source={icons.arrowRight}
            style={[styles.profileArrow, { tintColor: colors.text.tertiary }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Primary Menu Section */}
        <View style={styles.menuSection}>
          {primaryMenuItems.map(renderMenuItem)}
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border.light }]} />

        {/* Secondary Menu Section */}
        <View style={styles.menuSection}>
          {secondaryMenuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    width: 44,
  },
  logoContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 44,
    alignItems: 'flex-end',
  },
  moreIcon: {
    width: 24,
    height: 24,
  },
  upgradeBanner: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  crownIcon: {
    width: 22,
    height: 22,
    tintColor: '#FFFFFF',
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
  },
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: '#E0E0E0',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
  },
  profileArrow: {
    width: 20,
    height: 20,
  },
  menuSection: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuIconContainer: {
    width: 24,
    height: 24,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  menuArrow: {
    width: 18,
    height: 18,
  },
  divider: {
    height: 1,
    marginHorizontal: 24,
    marginVertical: 16,
  },
});

export default ProfileScreen;
