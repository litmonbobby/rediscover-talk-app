import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
import { useTheme } from '../../theme/useTheme';

export const SubscriptionScreen = ({ navigation }: any) => {
  const { colors: themeColors } = useTheme();
  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$4.99',
      period: '/month',
      features: [
        'Unlimited AI coaching sessions',
        'Access to all meditations',
        'Advanced analytics & insights',
        'Priority support',
        'Offline mode',
      ],
      popular: false,
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$49.99',
      period: '/year',
      savings: 'Save 16%',
      features: [
        'All Monthly features',
        '2 months free',
        'Exclusive content library',
        'Family sharing (up to 5)',
        'Early access to new features',
      ],
      popular: true,
    },
  ];

  const freeFeatures = [
    '3 AI coaching messages/day',
    '5 guided meditations',
    'Basic mood tracking',
    'Limited insights',
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Upgrade to Premium</Text>
          <Text style={styles.subtitle}>Unlock your full potential</Text>
        </View>

        {/* Premium Plans */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <View key={plan.id} style={[styles.planCard, plan.popular && styles.planCardPopular]}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <LinearGradient
                    colors={[colors.accent.lime, colors.accent.brightLime]}
                    style={styles.popularGradient}
                  >
                    <Text style={styles.popularText}>⭐ MOST POPULAR</Text>
                  </LinearGradient>
                </View>
              )}
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
                {plan.savings && (
                  <Text style={styles.savings}>{plan.savings}</Text>
                )}
              </View>
              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Text style={styles.checkmark}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.selectButton}>
                <LinearGradient
                  colors={plan.popular ? [colors.accent.lime, colors.accent.brightLime] : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)']}
                  style={styles.selectGradient}
                >
                  <Text style={[styles.selectButtonText, plan.popular && styles.selectButtonTextDark]}>
                    Select {plan.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Free Plan */}
        <View style={styles.freePlanCard}>
          <Text style={styles.freePlanTitle}>Continue with Free</Text>
          <View style={styles.freeFeatures}>
            {freeFeatures.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Text style={styles.checkmarkGray}>✓</Text>
                <Text style={styles.freeFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            7-day free trial • Cancel anytime
          </Text>
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </View>
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
    padding: spacing.xl,
    paddingTop: spacing['4xl'],
    alignItems: 'center',
  },
  backText: {
    ...typography.h2,
    color: colors.text.primary,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  plansContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  planCardPopular: {
    borderColor: colors.accent.lime,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -60 }],
    borderRadius: spacing.borderRadius.full,
    overflow: 'hidden',
  },
  popularGradient: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  popularText: {
    ...typography.caption,
    fontWeight: 'bold',
    color: colors.primary.darkBlue,
  },
  planHeader: {
    marginBottom: spacing.lg,
  },
  planName: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    ...typography.h1,
    fontSize: 36,
    color: colors.accent.lime,
  },
  planPeriod: {
    ...typography.body,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  savings: {
    ...typography.bodyBold,
    color: colors.accent.lime,
    marginTop: spacing.xs,
  },
  planFeatures: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkmark: {
    color: colors.accent.lime,
    fontSize: 18,
  },
  checkmarkGray: {
    color: colors.text.tertiary,
    fontSize: 18,
  },
  featureText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  freeFeatureText: {
    ...typography.body,
    color: colors.text.secondary,
    flex: 1,
  },
  selectButton: {
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  selectGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  selectButtonText: {
    ...typography.h3,
    color: colors.text.primary,
  },
  selectButtonTextDark: {
    color: colors.primary.darkBlue,
  },
  freePlanCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  freePlanTitle: {
    ...typography.h3,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  freeFeatures: {
    gap: spacing.sm,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  footerText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  termsText: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
