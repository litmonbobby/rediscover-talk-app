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

type Props = NativeStackScreenProps<any, 'TermsOfService'>;

export const TermsOfServiceScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('TermsOfService', isDarkMode)}
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
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.lastUpdated}>Last updated: November 26, 2025</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing and using RediscoverTalk, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
        </Text>

        <Text style={styles.sectionTitle}>2. Use License</Text>
        <Text style={styles.paragraph}>
          Permission is granted to temporarily download one copy of RediscoverTalk for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not modify, distribute, or use the materials for any commercial purpose.
        </Text>

        <Text style={styles.sectionTitle}>3. User Accounts</Text>
        <Text style={styles.paragraph}>
          When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
        </Text>

        <Text style={styles.sectionTitle}>4. Prohibited Uses</Text>
        <Text style={styles.paragraph}>
          You may not use our services for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction including but not limited to copyright laws.
        </Text>

        <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          The service and its original content, features, and functionality are and will remain the exclusive property of RediscoverTalk and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without prior written consent.
        </Text>

        <Text style={styles.sectionTitle}>6. Termination</Text>
        <Text style={styles.paragraph}>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
        </Text>

        <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          In no event shall RediscoverTalk, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages arising out of or relating to your access to or use of the service.
        </Text>

        <Text style={styles.sectionTitle}>8. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
        </Text>

        <Text style={styles.sectionTitle}>9. Contact Information</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us at legal@rediscovertalk.com
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
