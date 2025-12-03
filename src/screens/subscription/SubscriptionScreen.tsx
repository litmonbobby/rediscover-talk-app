/**
 * Subscription Screen - RevenueCat Paywall Integration
 * Uses RevenueCat's native paywall UI from your dashboard configuration
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path } from 'react-native-svg';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { CustomerInfo } from 'react-native-purchases';
import { revenueCatService, ENTITLEMENT_ID } from '../../services/RevenueCatService';

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

export const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, typography, isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const status = await revenueCatService.getSubscriptionStatus();
      setIsPremium(status.isSubscribed);
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Method 1: Present paywall modally (full screen)
  const presentPaywallModal = async () => {
    try {
      const result: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();

      switch (result) {
        case PAYWALL_RESULT.PURCHASED:
          Alert.alert('Success!', 'Thank you for subscribing to Premium!');
          setIsPremium(true);
          break;
        case PAYWALL_RESULT.RESTORED:
          Alert.alert('Restored!', 'Your purchases have been restored.');
          setIsPremium(true);
          break;
        case PAYWALL_RESULT.CANCELLED:
          console.log('User cancelled');
          break;
        case PAYWALL_RESULT.ERROR:
          Alert.alert('Error', 'Something went wrong. Please try again.');
          break;
        case PAYWALL_RESULT.NOT_PRESENTED:
          // Paywall not presented - could be because user is already subscribed
          console.log('Paywall not presented');
          break;
      }
    } catch (error) {
      console.error('Error presenting paywall:', error);
      Alert.alert('Error', 'Failed to load subscription options.');
    }
  };

  // Method 2: Present paywall only if needed (user doesn't have entitlement)
  const presentPaywallIfNeeded = async () => {
    try {
      const result = await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: ENTITLEMENT_ID,
      });

      if (result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED) {
        setIsPremium(true);
        Alert.alert('Success!', 'Welcome to Premium!');
      }
    } catch (error) {
      console.error('Error presenting paywall:', error);
    }
  };

  // Handle restore purchases
  const handleRestorePurchases = async () => {
    setIsLoading(true);
    try {
      const customerInfo = await revenueCatService.restorePurchases();
      const hasEntitlement = Object.keys(customerInfo.entitlements.active).includes(ENTITLEMENT_ID);

      if (hasEntitlement) {
        setIsPremium(true);
        Alert.alert('Restored!', 'Your purchases have been restored successfully.');
      } else {
        Alert.alert('No Purchases Found', 'We couldn\'t find any previous purchases to restore.');
      }
    } catch (error) {
      console.error('Error restoring purchases:', error);
      Alert.alert('Error', 'Failed to restore purchases. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Paywall event handlers
  const handlePurchaseStarted = () => {
    console.log('Purchase started');
  };

  const handlePurchaseCompleted = ({ customerInfo }: { customerInfo: CustomerInfo }) => {
    console.log('Purchase completed');
    const hasEntitlement = Object.keys(customerInfo.entitlements.active).includes(ENTITLEMENT_ID);
    if (hasEntitlement) {
      setIsPremium(true);
    }
  };

  const handlePurchaseError = ({ error }: { error: Error }) => {
    console.error('Purchase error:', error);
  };

  const handlePurchaseCancelled = () => {
    console.log('Purchase cancelled');
  };

  const handleRestoreCompleted = ({ customerInfo }: { customerInfo: CustomerInfo }) => {
    console.log('Restore completed');
    const hasEntitlement = Object.keys(customerInfo.entitlements.active).includes(ENTITLEMENT_ID);
    if (hasEntitlement) {
      setIsPremium(true);
    }
  };

  const handleDismiss = () => {
    setShowPaywall(false);
    navigation.goBack();
  };

  // Show embedded paywall component
  if (showPaywall) {
    return (
      <View style={{ flex: 1 }}>
        <RevenueCatUI.Paywall
          onPurchaseStarted={handlePurchaseStarted}
          onPurchaseCompleted={handlePurchaseCompleted}
          onPurchaseError={handlePurchaseError}
          onPurchaseCancelled={handlePurchaseCancelled}
          onRestoreCompleted={handleRestoreCompleted}
          onDismiss={handleDismiss}
        />
      </View>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Already premium view
  if (isPremium) {
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
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <BackArrowIcon color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text.primary, fontFamily: typography.fontFamily.primary }]}>
              Premium
            </Text>
            <View style={styles.headerRight} />
          </View>

          <View style={styles.premiumContainer}>
            <View style={[styles.premiumBadge, { backgroundColor: colors.primary.main + '20' }]}>
              <Text style={[styles.premiumIcon]}>👑</Text>
            </View>
            <Text style={[styles.premiumTitle, { color: colors.text.primary, fontFamily: typography.fontFamily.primary }]}>
              You're Premium!
            </Text>
            <Text style={[styles.premiumSubtitle, { color: colors.text.secondary }]}>
              Thank you for supporting Rediscover Talk. You have full access to all premium features.
            </Text>

            <TouchableOpacity
              style={[styles.manageButton, { borderColor: colors.primary.main }]}
              onPress={handleRestorePurchases}
            >
              <Text style={[styles.manageButtonText, { color: colors.primary.main }]}>
                Restore Purchases
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }

  // Main subscription view - shows options to open paywall
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
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <BackArrowIcon color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary, fontFamily: typography.fontFamily.primary }]}>
            Premium
          </Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={[styles.crownContainer, { backgroundColor: colors.primary.main + '20' }]}>
              <Text style={styles.crownEmoji}>👑</Text>
            </View>
            <Text style={[styles.heroTitle, { color: colors.text.primary, fontFamily: typography.fontFamily.primary }]}>
              Unlock Premium
            </Text>
            <Text style={[styles.heroSubtitle, { color: colors.text.secondary }]}>
              Get unlimited access to all features and take your mental wellness journey to the next level.
            </Text>
          </View>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            {[
              'Unlimited meditations',
              'Advanced mood analytics',
              'Personalized insights',
              'Sleep sounds library',
              'Exclusive content',
              'Priority support',
              'Offline access',
            ].map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={[styles.featureText, { color: colors.text.secondary }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {/* Subscribe Button - Opens RevenueCat Paywall */}
          <TouchableOpacity
            style={[styles.subscribeButton, { backgroundColor: colors.primary.main }]}
            onPress={presentPaywallModal}
            activeOpacity={0.9}
          >
            <Text style={styles.subscribeButtonText}>View Plans & Subscribe</Text>
          </TouchableOpacity>

          {/* Alternative: Show Embedded Paywall */}
          <TouchableOpacity
            style={[styles.embeddedPaywallButton, { borderColor: colors.primary.main }]}
            onPress={() => setShowPaywall(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.embeddedPaywallText, { color: colors.primary.main }]}>
              View Embedded Paywall
            </Text>
          </TouchableOpacity>

          {/* Restore Purchases */}
          <TouchableOpacity onPress={handleRestorePurchases}>
            <Text style={[styles.restoreText, { color: colors.primary.main }]}>
              Restore Purchases
            </Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={[styles.terms, { color: colors.text.tertiary }]}>
            Cancel anytime. Subscription automatically renews unless canceled at least 24 hours before the end of the current period.
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  crownContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  crownEmoji: {
    fontSize: 32,
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
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    color: '#27AE60',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
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
  embeddedPaywallButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 16,
  },
  embeddedPaywallText: {
    fontSize: 15,
    fontWeight: '600',
  },
  restoreText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  // Premium state styles
  premiumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  premiumBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  premiumIcon: {
    fontSize: 40,
  },
  premiumTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  premiumSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  manageButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    borderWidth: 2,
  },
  manageButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default SubscriptionScreen;
