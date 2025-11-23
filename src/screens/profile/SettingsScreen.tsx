import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch, SafeAreaView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

export const SettingsScreen = () => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <Text style={[styles.title, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: typography.fontWeight.bold
          }]}>
            Settings
          </Text>
          <Text style={[styles.subtitle, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            Customize your experience
          </Text>
        </Animated.View>

        <View style={styles.section}>
          <Animated.Text
            entering={FadeInUp.delay(150).springify()}
            style={[styles.sectionTitle, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold
            }]}
          >
            Preferences
          </Animated.Text>

          <Animated.View
            entering={FadeInUp.delay(200).springify()}
            style={[styles.settingItem, {
              backgroundColor: colors.background.card,
              borderRadius: borderRadius.md,
              borderColor: colors.border.light,
              ...shadows.sm
            }]}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Push Notifications
              </Text>
              <Text style={[styles.settingDescription, {
                color: colors.text.tertiary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Get reminders and updates
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.background.secondary, true: colors.primary.main }}
              thumbColor={colors.background.primary}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(250).springify()}
            style={[styles.settingItem, {
              backgroundColor: colors.background.card,
              borderRadius: borderRadius.md,
              borderColor: colors.border.light,
              ...shadows.sm
            }]}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Dark Mode
              </Text>
              <Text style={[styles.settingDescription, {
                color: colors.text.tertiary,
                fontFamily: typography.fontFamily.primary
              }]}>
                Toggle dark theme
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.background.secondary, true: colors.primary.main }}
              thumbColor={colors.background.primary}
            />
          </Animated.View>
        </View>

        <View style={styles.section}>
          <Animated.Text
            entering={FadeInUp.delay(300).springify()}
            style={[styles.sectionTitle, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold
            }]}
          >
            Account
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(350).springify()}>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.md,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Edit Profile
              </Text>
              <Text style={[styles.menuArrow, { color: colors.text.tertiary }]}>→</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).springify()}>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.md,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Privacy & Security
              </Text>
              <Text style={[styles.menuArrow, { color: colors.text.tertiary }]}>→</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(450).springify()}>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.md,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Data & Storage
              </Text>
              <Text style={[styles.menuArrow, { color: colors.text.tertiary }]}>→</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.section}>
          <Animated.Text
            entering={FadeInUp.delay(500).springify()}
            style={[styles.sectionTitle, {
              color: colors.text.primary,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold
            }]}
          >
            Support
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(550).springify()}>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.md,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Help Center
              </Text>
              <Text style={[styles.menuArrow, { color: colors.text.tertiary }]}>→</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.md,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Terms of Service
              </Text>
              <Text style={[styles.menuArrow, { color: colors.text.tertiary }]}>→</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(650).springify()}>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.md,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Privacy Policy
              </Text>
              <Text style={[styles.menuArrow, { color: colors.text.tertiary }]}>→</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInUp.delay(700).springify()}>
          <TouchableOpacity
            style={[styles.logoutButton, {
              backgroundColor: colors.status.error + '33',
              borderColor: colors.status.error + '80',
              borderRadius: borderRadius.md
            }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.logoutText, {
              color: colors.status.error,
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold
            }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    padding: 24,
    paddingTop: 0,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  menuText: {
    fontSize: 16,
  },
  menuArrow: {
    fontSize: 20,
  },
  logoutButton: {
    margin: 24,
    marginTop: 32,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
  },
});
