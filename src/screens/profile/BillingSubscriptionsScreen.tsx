import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'BillingSubscriptions'>;

export const BillingSubscriptionsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleManageSubscription = () => {
    console.log('Manage subscription');
  };

  const handlePaymentMethods = () => {
    navigation.navigate('PaymentMethodsSettings');
  };

  const handleBillingHistory = () => {
    console.log('View billing history');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={getThemedScreenImage('BillingSubscriptions', isDarkMode)}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Current subscription card */}
          <TouchableOpacity
            style={styles.subscriptionCard}
            onPress={handleManageSubscription}
            activeOpacity={1}
          />

          {/* Payment methods option */}
          <TouchableOpacity
            style={styles.paymentMethodsButton}
            onPress={handlePaymentMethods}
            activeOpacity={1}
          />

          {/* Billing history option */}
          <TouchableOpacity
            style={styles.billingHistoryButton}
            onPress={handleBillingHistory}
            activeOpacity={1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    width,
    minHeight: height,
  },
  fullScreenImage: {
    width,
    height: height * 1.2,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  subscriptionCard: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    height: 120,
    zIndex: 10,
  },
  paymentMethodsButton: {
    position: 'absolute',
    top: 300,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  billingHistoryButton: {
    position: 'absolute',
    top: 390,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
});
