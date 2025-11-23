import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

export const ProfileScreen = ({ navigation }: any) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: colors.primary.light, borderRadius: borderRadius.full }]}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={[styles.name, {
            color: colors.text.primary,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: typography.fontWeight.bold
          }]}>
            User Name
          </Text>
          <Text style={[styles.email, {
            color: colors.text.secondary,
            fontFamily: typography.fontFamily.primary
          }]}>
            user@example.com
          </Text>
        </Animated.View>

        <View style={styles.statsSection}>
          <Animated.View
            entering={FadeInUp.delay(200).springify()}
            style={[styles.statCard, {
              backgroundColor: colors.background.card,
              borderRadius: borderRadius.lg,
              borderColor: colors.border.light,
              ...shadows.sm
            }]}
          >
            <Text style={[styles.statNumber, {
              color: colors.primary.main,
              fontFamily: typography.fontFamily.secondary,
              fontWeight: typography.fontWeight.bold
            }]}>
              42
            </Text>
            <Text style={[styles.statLabel, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Days Active
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(250).springify()}
            style={[styles.statCard, {
              backgroundColor: colors.background.card,
              borderRadius: borderRadius.lg,
              borderColor: colors.border.light,
              ...shadows.sm
            }]}
          >
            <Text style={[styles.statNumber, {
              color: colors.primary.main,
              fontFamily: typography.fontFamily.secondary,
              fontWeight: typography.fontWeight.bold
            }]}>
              18
            </Text>
            <Text style={[styles.statLabel, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Journal Entries
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(300).springify()}
            style={[styles.statCard, {
              backgroundColor: colors.background.card,
              borderRadius: borderRadius.lg,
              borderColor: colors.border.light,
              ...shadows.sm
            }]}
          >
            <Text style={[styles.statNumber, {
              color: colors.primary.main,
              fontFamily: typography.fontFamily.secondary,
              fontWeight: typography.fontWeight.bold
            }]}>
              7
            </Text>
            <Text style={[styles.statLabel, {
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.primary
            }]}>
              Mood Streak
            </Text>
          </Animated.View>
        </View>

        <View style={styles.menuSection}>
          <Animated.View entering={FadeInUp.delay(350).springify()}>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.md,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Settings
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
              <Text style={styles.menuIcon}>📊</Text>
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                My Progress
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
              <Text style={styles.menuIcon}>🎯</Text>
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                My Goals
              </Text>
              <Text style={[styles.menuArrow, { color: colors.text.tertiary }]}>→</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).springify()}>
            <TouchableOpacity
              style={[styles.menuItem, {
                backgroundColor: colors.background.card,
                borderRadius: borderRadius.md,
                borderColor: colors.border.light,
                ...shadows.sm
              }]}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>👨‍👩‍👧‍👦</Text>
              <Text style={[styles.menuText, {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold
              }]}>
                Family Members
              </Text>
              <Text style={[styles.menuArrow, { color: colors.text.tertiary }]}>→</Text>
            </TouchableOpacity>
          </Animated.View>
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
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingTop: 48,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 48,
  },
  name: {
    fontSize: 28,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    lineHeight: 24,
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    paddingTop: 0,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 32,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  menuSection: {
    padding: 24,
    paddingTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
  menuArrow: {
    fontSize: 20,
  },
});
