import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Account'>;

interface MenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  navigateTo: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    icon: '👤',
    title: 'Personal Information',
    subtitle: 'Manage your name, email, and profile',
    navigateTo: 'PersonalInfo',
  },
  {
    id: 'm2',
    icon: '🔒',
    title: 'Account Security',
    subtitle: 'Password, two-factor authentication',
    navigateTo: 'AccountSecurity',
  },
  {
    id: 'm3',
    icon: '🔗',
    title: 'Linked Accounts',
    subtitle: 'Connect social media accounts',
    navigateTo: 'LinkedAccounts',
  },
  {
    id: 'm4',
    icon: '💳',
    title: 'Billing & Subscriptions',
    subtitle: 'Manage payment and plans',
    navigateTo: 'BillingSubscriptions',
  },
  {
    id: 'm5',
    icon: '⚙️',
    title: 'Preferences',
    subtitle: 'App settings and customization',
    navigateTo: 'Preferences',
  },
  {
    id: 'm6',
    icon: '🏆',
    title: 'My Badges',
    subtitle: 'View your achievements',
    navigateTo: 'MyBadges',
  },
  {
    id: 'm7',
    icon: '🔔',
    title: 'Daily Reminder',
    subtitle: 'Set up daily notifications',
    navigateTo: 'DailyReminder',
  },
];

export const AccountScreen: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/112-light-account.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Section */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          </View>
          <Text style={styles.userName}>Sarah Johnson</Text>
          <Text style={styles.userEmail}>sarah.j@example.com</Text>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => handleNavigate('UpgradePlan')}
            activeOpacity={0.7}
          >
            <Text style={styles.upgradeButtonText}>⭐ Upgrade to Premium</Text>
          </TouchableOpacity>
        </View>

        {/* Account Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Management</Text>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.navigateTo)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Section */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleNavigate('Logout')}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    opacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.DEFAULT + '20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary.DEFAULT,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  menuArrow: {
    fontSize: 20,
    color: colors.primary.DEFAULT,
    marginLeft: 12,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4444',
  },
});
