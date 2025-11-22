/**
 * AccountScreen
 * User profile, settings, and account management
 * Reference: Figma screen 103-light-account.png
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { Card, Badge } from '../../components';

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  badge?: string;
  onPress: () => void;
}

export function AccountScreen() {
  const [isPremium] = useState(false); // TODO: Get from user state

  const handleUpgrade = () => {
    // TODO: Navigate to upgrade screen
    console.log('Navigate to upgrade');
  };

  const handleMenuPress = (menuId: string) => {
    // TODO: Navigate to respective screen
    console.log('Menu pressed:', menuId);
  };

  const handleLogout = () => {
    // TODO: Implement logout
    console.log('Logout');
  };

  const subscriptionMenu: MenuItem[] = [
    {
      id: 'upgrade',
      title: 'Upgrade to Premium',
      subtitle: 'Unlock all features and content',
      icon: '⭐',
      onPress: handleUpgrade,
    },
  ];

  const accountMenu: MenuItem[] = [
    {
      id: 'profile',
      title: 'Personal Information',
      subtitle: 'Manage your profile details',
      icon: '👤',
      onPress: () => handleMenuPress('profile'),
    },
    {
      id: 'security',
      title: 'Account Security',
      subtitle: 'Password and authentication',
      icon: '🔒',
      onPress: () => handleMenuPress('security'),
    },
    {
      id: 'linked',
      title: 'Linked Accounts',
      subtitle: 'Connected social accounts',
      icon: '🔗',
      onPress: () => handleMenuPress('linked'),
    },
  ];

  const appSettingsMenu: MenuItem[] = [
    {
      id: 'notifications',
      title: 'Daily Reminders',
      subtitle: 'Manage notification preferences',
      icon: '🔔',
      onPress: () => handleMenuPress('notifications'),
    },
    {
      id: 'preferences',
      title: 'App Preferences',
      subtitle: 'Customize your experience',
      icon: '⚙️',
      onPress: () => handleMenuPress('preferences'),
    },
    {
      id: 'appearance',
      title: 'Appearance',
      subtitle: 'Theme and display options',
      icon: '🎨',
      onPress: () => handleMenuPress('appearance'),
    },
  ];

  const supportMenu: MenuItem[] = [
    {
      id: 'help',
      title: 'Help Center',
      subtitle: 'Get support and answers',
      icon: '❓',
      onPress: () => handleMenuPress('help'),
    },
    {
      id: 'faq',
      title: 'FAQ',
      subtitle: 'Frequently asked questions',
      icon: '💬',
      onPress: () => handleMenuPress('faq'),
    },
    {
      id: 'contact',
      title: 'Contact Support',
      subtitle: 'Reach out to our team',
      icon: '📧',
      onPress: () => handleMenuPress('contact'),
    },
  ];

  const legalMenu: MenuItem[] = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: '🔐',
      onPress: () => handleMenuPress('privacy'),
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: '📄',
      onPress: () => handleMenuPress('terms'),
    },
  ];

  const renderMenuSection = (title: string, items: MenuItem[]) => (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <Card
            variant="default"
            style={[
              styles.menuItem,
              index === items.length - 1 && styles.menuItemLast,
            ]}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Text style={styles.menuIconText}>{item.icon}</Text>
                </View>
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  {item.subtitle && (
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
          {isPremium ? (
            <View style={styles.premiumBadgeContainer}>
              <Badge>Premium Member</Badge>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleUpgrade}
            >
              <Text style={styles.upgradeButtonText}>⭐ Upgrade to Premium</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </Card>
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Mood Entries</Text>
          </Card>
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>28h</Text>
            <Text style={styles.statLabel}>Meditation</Text>
          </Card>
        </View>

        {/* Menu Sections */}
        {!isPremium && renderMenuSection('Subscription', subscriptionMenu)}
        {renderMenuSection('Account', accountMenu)}
        {renderMenuSection('App Settings', appSettingsMenu)}
        {renderMenuSection('Support', supportMenu)}
        {renderMenuSection('Legal', legalMenu)}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.appVersion}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  profileHeader: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    ...theme.typography.heading1,
    color: '#FFFFFF',
  },

  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.accent.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background.light,
  },

  editAvatarIcon: {
    fontSize: 16,
  },

  profileName: {
    ...theme.typography.heading2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },

  profileEmail: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },

  premiumBadgeContainer: {
    marginTop: theme.spacing.sm,
  },

  upgradeButton: {
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.sm,
  },

  upgradeButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },

  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },

  statCard: {
    flex: 1,
    padding: theme.spacing.md,
    alignItems: 'center',
  },

  statValue: {
    ...theme.typography.heading2,
    color: theme.colors.primary.DEFAULT,
    marginBottom: 4,
  },

  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  menuSection: {
    marginBottom: theme.spacing.lg,
  },

  menuSectionTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.secondary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '600',
  },

  menuItem: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: 1,
    borderRadius: 0,
  },

  menuItemLast: {
    marginBottom: 0,
    borderBottomLeftRadius: theme.borderRadius.base,
    borderBottomRightRadius: theme.borderRadius.base,
  },

  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },

  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },

  menuIconText: {
    fontSize: 20,
  },

  menuItemInfo: {
    flex: 1,
  },

  menuItemTitle: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },

  menuItemSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  menuArrow: {
    fontSize: 24,
    color: theme.colors.text.tertiary,
  },

  logoutButton: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.base,
    borderWidth: 1,
    borderColor: theme.colors.border.DEFAULT,
    alignItems: 'center',
  },

  logoutText: {
    ...theme.typography.bodyMedium,
    color: '#EF4444',
  },

  appVersion: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
});
