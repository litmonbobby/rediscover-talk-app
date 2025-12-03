/**
 * About Screen - Matches Figma design
 * App information and legal links
 * Supports both light and dark themes
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path, Circle } from 'react-native-svg';

// Back Arrow Icon
const BackArrowIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19L5 12L12 5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Chevron Right Icon
const ChevronRightIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// External Link Icon
const ExternalLinkIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Document Icon
const DocumentIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2V8H20M16 13H8M16 17H8M10 9H8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Shield Icon
const ShieldIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Star Icon
const StarIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Heart Icon
const HeartIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface LinkItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  colors: any;
  isLast?: boolean;
  isExternal?: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  colors,
  isLast,
  isExternal,
}) => (
  <TouchableOpacity
    style={[
      styles.linkItem,
      !isLast && { borderBottomColor: colors.border.light, borderBottomWidth: 1 },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.linkItemLeft}>
      <View
        style={[
          styles.linkIconContainer,
          { backgroundColor: colors.background.secondary },
        ]}
      >
        {icon}
      </View>
      <View>
        <Text style={[styles.linkTitle, { color: colors.text.primary }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.linkSubtitle, { color: colors.text.tertiary }]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    {isExternal ? (
      <ExternalLinkIcon color={colors.text.tertiary} />
    ) : (
      <ChevronRightIcon color={colors.text.tertiary} />
    )}
  </TouchableOpacity>
);

export const AboutScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, typography, isDarkMode } = useTheme();

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background.primary }]}
        edges={['top', 'bottom']}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackArrowIcon color={colors.text.primary} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            About
          </Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* App Logo and Info */}
          <View style={styles.appInfoContainer}>
            <View
              style={[styles.appLogo, { backgroundColor: colors.primary.main }]}
            >
              <Text style={styles.appLogoText}>M</Text>
            </View>
            <Text
              style={[
                styles.appName,
                {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.primary,
                },
              ]}
            >
              Mindify
            </Text>
            <Text style={[styles.appTagline, { color: colors.text.secondary }]}>
              Your mental wellness companion
            </Text>
            <Text style={[styles.appVersion, { color: colors.text.tertiary }]}>
              Version 1.0.0 (Build 1)
            </Text>
          </View>

          {/* Legal Links */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            LEGAL
          </Text>
          <View
            style={[
              styles.linksContainer,
              { backgroundColor: colors.background.card, borderColor: colors.border.light },
            ]}
          >
            <LinkItem
              icon={<DocumentIcon color={colors.primary.main} />}
              title="Terms of Service"
              onPress={() => handleOpenLink('https://example.com/terms')}
              colors={colors}
              isExternal
            />
            <LinkItem
              icon={<ShieldIcon color={colors.primary.main} />}
              title="Privacy Policy"
              onPress={() => handleOpenLink('https://example.com/privacy')}
              colors={colors}
              isExternal
            />
            <LinkItem
              icon={<DocumentIcon color={colors.primary.main} />}
              title="Open Source Licenses"
              onPress={() => {}}
              colors={colors}
              isLast
            />
          </View>

          {/* Support the App */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            SUPPORT THE APP
          </Text>
          <View
            style={[
              styles.linksContainer,
              { backgroundColor: colors.background.card, borderColor: colors.border.light },
            ]}
          >
            <LinkItem
              icon={<StarIcon color={colors.primary.main} />}
              title="Rate Us"
              subtitle="Share your experience on the App Store"
              onPress={() => {}}
              colors={colors}
            />
            <LinkItem
              icon={<HeartIcon color={colors.primary.main} />}
              title="Share with Friends"
              subtitle="Help others discover Mindify"
              onPress={() => {}}
              colors={colors}
              isLast
            />
          </View>

          {/* Credits */}
          <View
            style={[
              styles.creditsContainer,
              { backgroundColor: colors.background.card, borderColor: colors.border.light },
            ]}
          >
            <Text
              style={[
                styles.creditsTitle,
                {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.primary,
                },
              ]}
            >
              Made with love
            </Text>
            <Text style={[styles.creditsText, { color: colors.text.secondary }]}>
              Designed and developed to help you on your mental wellness journey.
              Thank you for being part of our community.
            </Text>
          </View>

          {/* Copyright */}
          <Text style={[styles.copyright, { color: colors.text.tertiary }]}>
            © 2024 Mindify. All rights reserved.
          </Text>

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </>
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
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  appInfoContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appLogoText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 15,
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 12,
    marginLeft: 4,
  },
  linksContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 8,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  linkItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  linkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  linkSubtitle: {
    fontSize: 12,
  },
  creditsContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
  },
  creditsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  creditsText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  copyright: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
  },
});

export default AboutScreen;
