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
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'PrivacyPolicy'>;

export const PrivacyPolicyScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('PrivacyPolicy', isDarkMode)}
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.lastUpdated}>Last updated: November 26, 2025</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information you provide directly to us when you create an account, use our services, or communicate with us. This includes your name, email address, mood tracking data, journal entries, and meditation preferences.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect to provide, maintain, and improve our services, personalize your experience, send you technical notices and support messages, and respond to your comments and questions.
        </Text>

        <Text style={styles.sectionTitle}>3. Information Sharing</Text>
        <Text style={styles.paragraph}>
          We do not share your personal information with third parties except as described in this policy. We may share anonymized, aggregated data for research and analytics purposes.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement appropriate security measures to protect your personal information. All sensitive data is encrypted both in transit and at rest using industry-standard protocols.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.paragraph}>
          You have the right to access, update, or delete your personal information at any time. You can also export your data or request account deletion through your account settings.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this Privacy Policy, please contact us at privacy@rediscovertalk.com
        </Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 20,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
});
