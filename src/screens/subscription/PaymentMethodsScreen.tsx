/**
 * Payment Methods Screen - Matches Figma design
 * Manage payment methods
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
import Svg, { Path, Rect, Circle } from 'react-native-svg';

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

// Plus Icon
const PlusIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Credit Card Icon
const CreditCardIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={40} height={28} viewBox="0 0 40 28" fill="none">
    <Rect width={40} height={28} rx={4} fill={color} />
    <Rect x={4} y={8} width={8} height={6} rx={1} fill="#FFD700" />
    <Path d="M4 18H36" stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
    <Circle cx={32} cy={14} r={4} fill="#EB001B" fillOpacity={0.9} />
    <Circle cx={36} cy={14} r={4} fill="#F79E1B" fillOpacity={0.9} />
  </Svg>
);

// Apple Pay Icon
const ApplePayIcon = () => (
  <Svg width={40} height={28} viewBox="0 0 40 28" fill="none">
    <Rect width={40} height={28} rx={4} fill="#000000" />
    <Path
      d="M15.5 10C14.8 10 14.2 10.4 13.8 10.4C13.4 10.4 12.8 10 12.2 10C11.1 10 10 10.8 10 12.5C10 14.8 11.4 18 12.7 18C13.2 18 13.6 17.7 14.2 17.7C14.8 17.7 15.1 18 15.7 18C17 18 18.2 15 18.2 15C17.3 14.6 17 13.5 17 12.6C17 11.6 17.5 10.8 18.2 10.4C17.7 9.9 16.9 9.5 16 9.5C15.5 9.5 15.5 10 15.5 10ZM15.5 8.5C15.9 8 16.1 7.4 16.1 6.8C15.4 6.9 14.6 7.3 14.1 7.9C13.7 8.4 13.4 9 13.5 9.6C14.2 9.6 15 9.2 15.5 8.5Z"
      fill="white"
    />
    <Path
      d="M21 17.5V11H22.8C24 11 24.8 11.7 24.8 12.8C24.8 13.9 24 14.6 22.7 14.6H22V17.5H21ZM22 13.8H22.6C23.3 13.8 23.7 13.4 23.7 12.8C23.7 12.2 23.3 11.8 22.6 11.8H22V13.8ZM27 17.6C25.7 17.6 25 16.7 25 15.3C25 13.9 25.8 13 27 13C28.2 13 28.9 13.8 28.9 15.2V15.5H26C26 16.3 26.4 16.8 27.1 16.8C27.6 16.8 28 16.5 28.1 16.1H29C28.8 17 28 17.6 27 17.6ZM27 13.7C26.4 13.7 26.1 14.1 26 14.7H27.9C27.9 14.1 27.5 13.7 27 13.7ZM30.7 18.2L29.6 13.1H30.6L31.3 16.5L32.2 13.1H33.2L31.7 18.2H30.7Z"
      fill="white"
    />
  </Svg>
);

// Google Pay Icon
const GooglePayIcon = () => (
  <Svg width={40} height={28} viewBox="0 0 40 28" fill="none">
    <Rect width={40} height={28} rx={4} fill="#FFFFFF" stroke="#E0E0E0" />
    <Path
      d="M19.4 14.2L19 14.7C18.7 14.4 18.3 14.2 17.8 14.2C16.8 14.2 16 15 16 16C16 17 16.8 17.8 17.8 17.8C18.3 17.8 18.7 17.6 19 17.3L19.4 17.8C19 18.2 18.4 18.5 17.8 18.5C16.4 18.5 15.2 17.4 15.2 16C15.2 14.6 16.4 13.5 17.8 13.5C18.4 13.5 19 13.8 19.4 14.2Z"
      fill="#4285F4"
    />
    <Path
      d="M20.5 18.4V13.6H23C23.9 13.6 24.6 14.3 24.6 15.2C24.6 16.1 23.9 16.8 23 16.8H21.2V18.4H20.5ZM21.2 16.2H22.9C23.5 16.2 23.9 15.8 23.9 15.2C23.9 14.6 23.5 14.2 22.9 14.2H21.2V16.2Z"
      fill="#4285F4"
    />
  </Svg>
);

// Trash Icon
const TrashIcon = ({ color = '#E74C3C' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
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

interface PaymentMethod {
  id: string;
  type: 'card' | 'apple' | 'google';
  name: string;
  details: string;
  isDefault: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    name: 'Visa',
    details: '•••• •••• •••• 4242',
    isDefault: true,
  },
  {
    id: '2',
    type: 'card',
    name: 'Mastercard',
    details: '•••• •••• •••• 8888',
    isDefault: false,
  },
  {
    id: '3',
    type: 'apple',
    name: 'Apple Pay',
    details: 'Linked to your Apple ID',
    isDefault: false,
  },
];

export const PaymentMethodsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, typography, isDarkMode } = useTheme();
  const [methods, setMethods] = useState(paymentMethods);

  const handleSetDefault = (id: string) => {
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setMethods(methods.filter((method) => method.id !== id));
  };

  const renderPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCardIcon color={colors.primary.main} />;
      case 'apple':
        return <ApplePayIcon />;
      case 'google':
        return <GooglePayIcon />;
      default:
        return <CreditCardIcon color={colors.primary.main} />;
    }
  };

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
            Payment Methods
          </Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Payment Methods List */}
          <View
            style={[
              styles.methodsContainer,
              { backgroundColor: colors.background.card, borderColor: colors.border.light },
            ]}
          >
            {methods.map((method, index) => (
              <View
                key={method.id}
                style={[
                  styles.methodItem,
                  index !== methods.length - 1 && {
                    borderBottomColor: colors.border.light,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View style={styles.methodLeft}>
                  <View style={styles.methodIcon}>
                    {renderPaymentIcon(method.type)}
                  </View>
                  <View style={styles.methodInfo}>
                    <View style={styles.methodNameRow}>
                      <Text
                        style={[
                          styles.methodName,
                          {
                            color: colors.text.primary,
                            fontFamily: typography.fontFamily.primary,
                          },
                        ]}
                      >
                        {method.name}
                      </Text>
                      {method.isDefault && (
                        <View
                          style={[
                            styles.defaultBadge,
                            { backgroundColor: colors.status.success + '20' },
                          ]}
                        >
                          <Text style={[styles.defaultText, { color: colors.status.success }]}>
                            Default
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.methodDetails, { color: colors.text.tertiary }]}>
                      {method.details}
                    </Text>
                  </View>
                </View>
                <View style={styles.methodActions}>
                  {!method.isDefault && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleSetDefault(method.id)}
                    >
                      <CheckIcon color={colors.primary.main} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(method.id)}
                  >
                    <TrashIcon color={colors.status.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Add New Payment Method */}
          <TouchableOpacity
            style={[
              styles.addMethodButton,
              { backgroundColor: colors.background.card, borderColor: colors.border.light },
            ]}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.addIconContainer,
                { backgroundColor: colors.primary.main + '20' },
              ]}
            >
              <PlusIcon color={colors.primary.main} />
            </View>
            <Text
              style={[
                styles.addMethodText,
                {
                  color: colors.text.primary,
                  fontFamily: typography.fontFamily.primary,
                },
              ]}
            >
              Add Payment Method
            </Text>
          </TouchableOpacity>

          {/* Info Card */}
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.primary.main + '10', borderColor: colors.primary.main + '30' },
            ]}
          >
            <Text
              style={[
                styles.infoTitle,
                { color: colors.primary.main, fontFamily: typography.fontFamily.primary },
              ]}
            >
              Secure Payments
            </Text>
            <Text style={[styles.infoText, { color: colors.text.secondary }]}>
              All payment information is encrypted and securely stored. We never store
              your full card number.
            </Text>
          </View>

          {/* Payment Options */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text.secondary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            ACCEPTED PAYMENT METHODS
          </Text>
          <View style={styles.paymentOptions}>
            <View
              style={[
                styles.paymentOption,
                { backgroundColor: colors.background.card, borderColor: colors.border.light },
              ]}
            >
              <CreditCardIcon color="#1A1F71" />
              <Text style={[styles.paymentOptionText, { color: colors.text.tertiary }]}>
                Visa
              </Text>
            </View>
            <View
              style={[
                styles.paymentOption,
                { backgroundColor: colors.background.card, borderColor: colors.border.light },
              ]}
            >
              <CreditCardIcon color="#EB001B" />
              <Text style={[styles.paymentOptionText, { color: colors.text.tertiary }]}>
                Mastercard
              </Text>
            </View>
            <View
              style={[
                styles.paymentOption,
                { backgroundColor: colors.background.card, borderColor: colors.border.light },
              ]}
            >
              <ApplePayIcon />
              <Text style={[styles.paymentOptionText, { color: colors.text.tertiary }]}>
                Apple Pay
              </Text>
            </View>
            <View
              style={[
                styles.paymentOption,
                { backgroundColor: colors.background.card, borderColor: colors.border.light },
              ]}
            >
              <GooglePayIcon />
              <Text style={[styles.paymentOptionText, { color: colors.text.tertiary }]}>
                Google Pay
              </Text>
            </View>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
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
  methodsContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
  },
  methodDetails: {
    fontSize: 13,
  },
  methodActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: 24,
    gap: 12,
  },
  addIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMethodText: {
    fontSize: 15,
    fontWeight: '600',
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  paymentOption: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  paymentOptionText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default PaymentMethodsScreen;
