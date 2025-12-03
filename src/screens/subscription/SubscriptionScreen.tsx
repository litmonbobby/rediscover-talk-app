/**
 * Subscription Screen - Matches Figma design
 * Premium subscription plans and features
 * Supports both light and dark themes
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
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

// Check Icon
const CheckIcon = ({ color = '#27AE60' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Crown Icon
const CrownIcon = ({ color = '#FFD700' }: { color?: string }) => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 17L4 7L9 11L12 4L15 11L20 7L22 17H2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
    />
  </Svg>
);

// X Icon
const XIcon = ({ color = '#E74C3C' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  savings?: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    period: '/month',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$59.99',
    period: '/year',
    savings: 'Save 50%',
    popular: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$149.99',
    period: 'one-time',
  },
];

interface Feature {
  name: string;
  free: boolean;
  premium: boolean;
}

const features: Feature[] = [
  { name: 'Basic mood tracking', free: true, premium: true },
  { name: 'Limited meditations (10)', free: true, premium: true },
  { name: 'Daily journal entries', free: true, premium: true },
  { name: 'Unlimited meditations', free: false, premium: true },
  { name: 'Advanced mood analytics', free: false, premium: true },
  { name: 'Personalized insights', free: false, premium: true },
  { name: 'Sleep sounds library', free: false, premium: true },
  { name: 'Exclusive content', free: false, premium: true },
  { name: 'Priority support', free: false, premium: true },
  { name: 'Offline access', free: false, premium: true },
];

export const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, typography, isDarkMode } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

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
            Premium
          </Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View
              style={[styles.crownContainer, { backgroundColor: colors.primary.main + '20' }]}
            >
              <CrownIcon color={colors.primary.main} />
            </View>
            <Text
              style={[
                styles.heroTitle,
                {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.primary,
                },
              ]}
            >
              Unlock Premium
            </Text>
            <Text style={[styles.heroSubtitle, { color: colors.text.secondary }]}>
              Get unlimited access to all features and take your mental wellness
              journey to the next level.
            </Text>
          </View>

          {/* Plans */}
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  {
                    backgroundColor:
                      selectedPlan === plan.id
                        ? colors.primary.main
                        : colors.background.card,
                    borderColor:
                      selectedPlan === plan.id
                        ? colors.primary.main
                        : colors.border.light,
                  },
                ]}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.8}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>BEST VALUE</Text>
                  </View>
                )}
                <Text
                  style={[
                    styles.planName,
                    {
                      color: selectedPlan === plan.id ? '#FFFFFF' : colors.text.primary,
                    },
                  ]}
                >
                  {plan.name}
                </Text>
                <View style={styles.planPriceContainer}>
                  <Text
                    style={[
                      styles.planPrice,
                      {
                        color: selectedPlan === plan.id ? '#FFFFFF' : colors.text.primary,
                      },
                    ]}
                  >
                    {plan.price}
                  </Text>
                  <Text
                    style={[
                      styles.planPeriod,
                      {
                        color:
                          selectedPlan === plan.id
                            ? 'rgba(255,255,255,0.8)'
                            : colors.text.tertiary,
                      },
                    ]}
                  >
                    {plan.period}
                  </Text>
                </View>
                {plan.savings && (
                  <View
                    style={[
                      styles.savingsBadge,
                      {
                        backgroundColor:
                          selectedPlan === plan.id
                            ? 'rgba(255,255,255,0.2)'
                            : colors.status.success + '20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.savingsText,
                        {
                          color:
                            selectedPlan === plan.id ? '#FFFFFF' : colors.status.success,
                        },
                      ]}
                    >
                      {plan.savings}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Features Comparison */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            What's Included
          </Text>

          <View
            style={[
              styles.featuresContainer,
              { backgroundColor: colors.background.card, borderColor: colors.border.light },
            ]}
          >
            {/* Header Row */}
            <View style={[styles.featureRow, styles.featureHeaderRow]}>
              <Text style={[styles.featureHeaderText, { color: colors.text.primary }]}>
                Feature
              </Text>
              <View style={styles.featureCompare}>
                <Text style={[styles.featureHeaderText, { color: colors.text.tertiary }]}>
                  Free
                </Text>
                <Text style={[styles.featureHeaderText, { color: colors.primary.main }]}>
                  Premium
                </Text>
              </View>
            </View>

            {/* Feature Rows */}
            {features.map((feature, index) => (
              <View
                key={feature.name}
                style={[
                  styles.featureRow,
                  index !== features.length - 1 && {
                    borderBottomColor: colors.border.light,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <Text
                  style={[styles.featureName, { color: colors.text.secondary }]}
                  numberOfLines={1}
                >
                  {feature.name}
                </Text>
                <View style={styles.featureCompare}>
                  <View style={styles.featureIcon}>
                    {feature.free ? (
                      <CheckIcon color={colors.status.success} />
                    ) : (
                      <XIcon color={colors.status.error} />
                    )}
                  </View>
                  <View style={styles.featureIcon}>
                    {feature.premium ? (
                      <CheckIcon color={colors.status.success} />
                    ) : (
                      <XIcon color={colors.status.error} />
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Terms */}
          <Text style={[styles.terms, { color: colors.text.tertiary }]}>
            Cancel anytime. Subscription automatically renews unless canceled at
            least 24 hours before the end of the current period.
          </Text>

          {/* Bottom spacing */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Subscribe Button */}
        <View
          style={[
            styles.subscribeContainer,
            { backgroundColor: colors.background.primary, borderTopColor: colors.border.light },
          ]}
        >
          <TouchableOpacity
            style={[styles.subscribeButton, { backgroundColor: colors.primary.main }]}
            activeOpacity={0.9}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.restoreText, { color: colors.primary.main }]}>
              Restore Purchases
            </Text>
          </TouchableOpacity>
        </View>
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  crownContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  plansContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  planCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  popularBadgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '700',
  },
  planName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 4,
  },
  planPriceContainer: {
    alignItems: 'center',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '700',
  },
  planPeriod: {
    fontSize: 12,
  },
  savingsBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  featuresContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  featureHeaderRow: {
    paddingVertical: 16,
  },
  featureHeaderText: {
    fontSize: 13,
    fontWeight: '600',
  },
  featureName: {
    fontSize: 14,
    flex: 1,
  },
  featureCompare: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    justifyContent: 'space-around',
  },
  featureIcon: {
    width: 40,
    alignItems: 'center',
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  subscribeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 32,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  subscribeButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 12,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  restoreText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SubscriptionScreen;
