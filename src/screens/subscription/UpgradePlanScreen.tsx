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

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'UpgradePlan'>;
type PlanType = 'monthly' | 'yearly';

interface Plan {
  type: PlanType;
  name: string;
  price: string;
  period: string;
  savings?: string;
  features: string[];
}

const PLANS: Plan[] = [
  {
    type: 'monthly',
    name: 'Monthly Plan',
    price: '$9.99',
    period: '/month',
    features: [
      'Unlimited meditation sessions',
      'Advanced mood tracking',
      'AI chat with Mindy',
      'Family activities library',
      'Sleep sounds collection',
      'Personalized insights',
    ],
  },
  {
    type: 'yearly',
    name: 'Yearly Plan',
    price: '$79.99',
    period: '/year',
    savings: 'Save 33%',
    features: [
      'All Monthly features',
      'Priority AI responses',
      'Advanced analytics',
      'Exclusive guided meditations',
      'Family sharing (up to 5)',
      'Offline access',
    ],
  },
];

export const UpgradePlanScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    navigation.navigate('PaymentMethodSelection', { plan: selectedPlan });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/113-light-upgrade-plan-monthly.png')}
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
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Unlock Premium Features</Text>
        <Text style={styles.subtitle}>
          Get full access to all meditations, insights, and family activities
        </Text>

        {/* Plan Cards */}
        <View style={styles.plansContainer}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.type}
              style={[
                styles.planCard,
                selectedPlan === plan.type && styles.planCardSelected,
              ]}
              onPress={() => handleSelectPlan(plan.type)}
              activeOpacity={0.7}
            >
              {plan.savings && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>{plan.savings}</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <View style={styles.planNameContainer}>
                  <Text
                    style={[
                      styles.planName,
                      selectedPlan === plan.type && styles.planNameSelected,
                    ]}
                  >
                    {plan.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text
                      style={[
                        styles.price,
                        selectedPlan === plan.type && styles.priceSelected,
                      ]}
                    >
                      {plan.price}
                    </Text>
                    <Text
                      style={[
                        styles.period,
                        selectedPlan === plan.type && styles.periodSelected,
                      ]}
                    >
                      {plan.period}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedPlan === plan.type && styles.radioButtonSelected,
                  ]}
                >
                  {selectedPlan === plan.type && <View style={styles.radioButtonInner} />}
                </View>
              </View>

              <View style={styles.features}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Text style={styles.checkmark}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Subscription automatically renews unless canceled at least 24 hours before the end of
          the current period.
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
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planCardSelected: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.DEFAULT + '10',
  },
  savingsBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: colors.primary.DEFAULT,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planNameContainer: {
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  planNameSelected: {
    color: colors.primary.DEFAULT,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  priceSelected: {
    color: colors.primary.DEFAULT,
  },
  period: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  periodSelected: {
    color: colors.primary.DEFAULT,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary.DEFAULT,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.DEFAULT,
  },
  features: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  checkmark: {
    fontSize: 16,
    color: colors.primary.DEFAULT,
    fontWeight: '700',
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
