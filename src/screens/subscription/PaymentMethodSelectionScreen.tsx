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

type Props = NativeStackScreenProps<any, 'PaymentMethodSelection'>;
type PaymentMethodType = 'card' | 'paypal' | 'apple-pay';

interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  cardType?: 'visa' | 'mastercard' | 'amex';
  last4?: string;
  expiry?: string;
  email?: string;
  isDefault: boolean;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm1',
    type: 'card',
    cardType: 'visa',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
  },
  {
    id: 'pm2',
    type: 'card',
    cardType: 'mastercard',
    last4: '8888',
    expiry: '06/26',
    isDefault: false,
  },
];

export const PaymentMethodSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const plan = route?.params?.plan || 'monthly';
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    PAYMENT_METHODS.find((pm) => pm.isDefault)?.id || PAYMENT_METHODS[0].id
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddNewPayment = () => {
    navigation.navigate('AddNewPayment', { plan });
  };

  const handleSelectPaymentMethod = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleContinue = () => {
    navigation.navigate('ReviewSummary', { plan, paymentMethodId: selectedPaymentMethod });
  };

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/115-light-choose-payment-methods.png')}
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
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Select Payment Method</Text>
        <Text style={styles.subtitle}>
          Choose a payment method or add a new one
        </Text>

        {/* Payment Method Cards */}
        <View style={styles.paymentMethodsContainer}>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard,
                selectedPaymentMethod === method.id && styles.paymentCardSelected,
              ]}
              onPress={() => handleSelectPaymentMethod(method.id)}
              activeOpacity={0.7}
            >
              <View style={styles.paymentCardLeft}>
                <Text style={styles.cardIcon}>{getCardIcon(method.cardType || '')}</Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardType}>
                    {method.cardType?.toUpperCase()} •••• {method.last4}
                  </Text>
                  <Text style={styles.cardExpiry}>Expires {method.expiry}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod === method.id && styles.radioButtonSelected,
                ]}
              >
                {selectedPaymentMethod === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Payment Button */}
        <TouchableOpacity
          style={styles.addNewPaymentButton}
          onPress={handleAddNewPayment}
          activeOpacity={0.7}
        >
          <Text style={styles.addNewPaymentText}>+ Add New Payment Method</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
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
  paymentMethodsContainer: {
    gap: 12,
  },
  paymentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentCardSelected: {
    borderColor: colors.primary.DEFAULT,
    backgroundColor: colors.primary.DEFAULT + '10',
  },
  paymentCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
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
  defaultBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: colors.primary.DEFAULT,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addNewPaymentButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
    borderStyle: 'dashed',
  },
  addNewPaymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary.DEFAULT,
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
});
