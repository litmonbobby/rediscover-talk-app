import React, { useState } from 'react';
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

type Props = NativeStackScreenProps<any, 'ReviewSummary'>;
type PlanType = 'monthly' | 'yearly';

interface PlanPricing {
  name: string;
  price: number;
  period: string;
  billingPeriod: string;
}

const PLAN_PRICING: Record<PlanType, PlanPricing> = {
  monthly: {
    name: 'Monthly Plan',
    price: 9.99,
    period: '/month',
    billingPeriod: 'Billed monthly',
  },
  yearly: {
    name: 'Yearly Plan',
    price: 79.99,
    period: '/year',
    billingPeriod: 'Billed annually',
  },
};

export const ReviewSummaryScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const plan = (route?.params?.plan || 'monthly') as PlanType;
  const paymentMethodId = route?.params?.paymentMethodId || 'pm1';
  const [termsAccepted, setTermsAccepted] = useState(false);

  const pricing = PLAN_PRICING[plan];
  const tax = pricing.price * 0.1; // 10% tax
  const total = pricing.price + tax;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleToggleTerms = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleConfirmPayment = () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions to continue');
      return;
    }
    navigation.navigate('SubscriptionSuccess', { plan });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('ReviewSummary', isDarkMode)}
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
        <Text style={styles.headerTitle}>Review Summary</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Confirm Your Subscription</Text>
        <Text style={styles.subtitle}>
          Review your order details before completing the purchase
        </Text>

        {/* Plan Details Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan Details</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Plan</Text>
              <Text style={styles.rowValue}>{pricing.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Billing</Text>
              <Text style={styles.rowValue}>{pricing.billingPeriod}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Card</Text>
              <Text style={styles.rowValue}>VISA •••• 4242</Text>
            </View>
          </View>
        </View>

        {/* Pricing Breakdown Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Subtotal</Text>
              <Text style={styles.rowValue}>${pricing.price.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Tax (10%)</Text>
              <Text style={styles.rowValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Terms and Conditions */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={handleToggleTerms}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
            {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.termsLink}>Terms and Conditions</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Confirm Payment Button */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !termsAccepted && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirmPayment}
          disabled={!termsAccepted}
          activeOpacity={0.7}
        >
          <Text style={styles.confirmButtonText}>Confirm Payment</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Your subscription will automatically renew unless canceled at least 24 hours before the end of the current period.
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rowLabel: {
    fontSize: 16,
    color: '#666',
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary.DEFAULT,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary.DEFAULT,
    borderColor: colors.primary.DEFAULT,
  },
  checkmark: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary.DEFAULT,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  confirmButton: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  confirmButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
