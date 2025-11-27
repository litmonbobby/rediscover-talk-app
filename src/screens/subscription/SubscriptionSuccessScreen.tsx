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

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'SubscriptionSuccess'>;
type PlanType = 'monthly' | 'yearly';

const PLAN_NAMES: Record<PlanType, string> = {
  monthly: 'Monthly Premium',
  yearly: 'Annual Premium',
};

const BENEFITS = [
  {
    id: 'b1',
    icon: '🧘',
    title: 'Unlimited Meditations',
    description: 'Access our complete library of guided meditations',
  },
  {
    id: 'b2',
    icon: '🤖',
    title: 'AI Chat with Mindy',
    description: 'Get personalized wellness support 24/7',
  },
  {
    id: 'b3',
    icon: '📊',
    title: 'Advanced Insights',
    description: 'Track your progress with detailed analytics',
  },
  {
    id: 'b4',
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Activities',
    description: 'Strengthen bonds with conversation starters',
  },
];

export const SubscriptionSuccessScreen: React.FC<Props> = ({ navigation, route }) => {
  const plan = (route?.params?.plan || 'yearly') as PlanType;

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/118-light-upgrade-plan-subscription-successful.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <View style={styles.successIconCircle}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Subscription Successful!</Text>
        <Text style={styles.subtitle}>
          Welcome to {PLAN_NAMES[plan]}. You now have access to all premium features.
        </Text>

        {/* What You Get Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>What You Get</Text>
          {BENEFITS.map((benefit) => (
            <View key={benefit.id} style={styles.benefitCard}>
              <Text style={styles.benefitIcon}>{benefit.icon}</Text>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text style={styles.continueButtonText}>Start Exploring</Text>
        </TouchableOpacity>

        <Text style={styles.managementText}>
          You can manage your subscription anytime in Settings
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  successIconContainer: {
    marginBottom: 32,
  },
  successIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  successIcon: {
    fontSize: 60,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  benefitsSection: {
    width: '100%',
    marginBottom: 32,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  continueButton: {
    width: '100%',
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
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
  managementText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
