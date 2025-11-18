import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export const AboutScreen = ({ navigation }: any) => {
  const appVersion = '1.0.0';
  const buildNumber = '100';

  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* App Logo/Icon */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🧠</Text>
          </View>
          <Text style={styles.appName}>Rediscover Talk</Text>
          <Text style={styles.tagline}>Mental Wellness Companion</Text>
          <Text style={styles.versionText}>Version {appVersion} ({buildNumber})</Text>
        </View>

        {/* Mission Statement */}
        <View style={styles.missionCard}>
          <Text style={styles.missionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            Rediscover Talk is dedicated to making mental wellness accessible to everyone.
            We combine evidence-based practices with modern technology to help you understand
            and improve your mental health journey.
          </Text>
        </View>

        {/* Features Highlights */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>💬</Text>
              <Text style={styles.featureText}>24/7 AI Mental Health Coach</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>📊</Text>
              <Text style={styles.featureText}>Advanced Mood Analytics</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🧘</Text>
              <Text style={styles.featureText}>Guided Meditation Library</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>📝</Text>
              <Text style={styles.featureText}>Therapeutic Journaling</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🔒</Text>
              <Text style={styles.featureText}>HIPAA-Compliant Privacy</Text>
            </View>
          </View>
        </View>

        {/* Links */}
        <View style={styles.linksSection}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openURL('https://example.com/privacy')}
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openURL('https://example.com/terms')}
          >
            <Text style={styles.linkText}>Terms of Service</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openURL('https://example.com/licenses')}
          >
            <Text style={styles.linkText}>Open Source Licenses</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Credits */}
        <View style={styles.creditsSection}>
          <Text style={styles.creditsTitle}>Credits</Text>
          <Text style={styles.creditsText}>
            Built with React Native & Expo{'\n'}
            Designed with care for mental wellness{'\n'}
            Powered by evidence-based practices
          </Text>
        </View>

        {/* Copyright */}
        <View style={styles.footer}>
          <Text style={styles.copyrightText}>
            © 2025 Rediscover Talk. All rights reserved.
          </Text>
          <Text style={styles.footerText}>
            Made with 💚 for mental wellness
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing['4xl'],
  },
  backText: {
    ...typography.bodyBold,
    color: colors.accent.lime,
  },
  logoSection: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.accent.lime,
  },
  logoEmoji: {
    fontSize: 48,
  },
  appName: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  tagline: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  versionText: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  missionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: spacing.xl,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  missionTitle: {
    ...typography.h2,
    color: colors.accent.lime,
    marginBottom: spacing.md,
  },
  missionText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  featuresSection: {
    padding: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  featuresList: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    ...typography.body,
    color: colors.text.primary,
  },
  linksSection: {
    padding: spacing.xl,
    gap: spacing.sm,
  },
  linkButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: spacing.md,
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  linkText: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  linkArrow: {
    ...typography.h3,
    color: colors.accent.lime,
  },
  creditsSection: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  creditsTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  creditsText: {
    ...typography.body,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
    alignItems: 'center',
    gap: spacing.sm,
  },
  copyrightText: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  footerText: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
