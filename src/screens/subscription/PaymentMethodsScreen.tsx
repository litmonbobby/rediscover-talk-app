import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type PaymentMethod = {
  id: string;
  type: 'card' | 'paypal' | 'applepay';
  brand?: string;
  last4?: string;
  email?: string;
  isDefault: boolean;
};

export const PaymentMethodsScreen = ({ navigation }: any) => {
  const paymentMethods: PaymentMethod[] = [
    { id: '1', type: 'card', brand: 'Visa', last4: '4242', isDefault: true },
    { id: '2', type: 'card', brand: 'Mastercard', last4: '8888', isDefault: false },
    { id: '3', type: 'paypal', email: 'user@example.com', isDefault: false },
  ];

  const getIcon = (type: string, brand?: string) => {
    if (type === 'card') {
      return brand === 'Visa' ? '💳' : '💳';
    } else if (type === 'paypal') {
      return '🅿️';
    } else if (type === 'applepay') {
      return '🍎';
    }
    return '💳';
  };

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Payment Methods</Text>
          <Text style={styles.subtitle}>Manage your payment options</Text>
        </View>

        {/* Payment Methods List */}
        <View style={styles.methodsList}>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.methodCard}>
              <View style={styles.methodIcon}>
                <Text style={styles.iconEmoji}>{getIcon(method.type, method.brand)}</Text>
              </View>
              <View style={styles.methodInfo}>
                {method.type === 'card' ? (
                  <>
                    <Text style={styles.methodType}>{method.brand}</Text>
                    <Text style={styles.methodDetails}>•••• •••• •••• {method.last4}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.methodType}>PayPal</Text>
                    <Text style={styles.methodDetails}>{method.email}</Text>
                  </>
                )}
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <View style={styles.methodActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionTextDanger}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Add New Payment Method */}
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={[colors.accent.lime, colors.accent.brightLime]}
            style={styles.addGradient}
          >
            <Text style={styles.addButtonText}>+ Add New Payment Method</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure. We never store your full card details.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
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
  },
  backText: {
    ...typography.bodyBold,
    color: colors.accent.lime,
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
  methodsList: {
    padding: spacing.md,
    gap: spacing.md,
  },
  methodCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  methodIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(199, 246, 0, 0.1)',
    borderRadius: spacing.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconEmoji: {
    fontSize: 24,
  },
  methodInfo: {
    flex: 1,
  },
  methodType: {
    ...typography.h3,
    color: colors.text.primary,
  },
  methodDetails: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  defaultBadge: {
    backgroundColor: colors.accent.lime,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: spacing.borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary.darkBlue,
    fontWeight: 'bold',
  },
  methodActions: {
    gap: spacing.xs,
  },
  actionButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  actionText: {
    ...typography.bodyBold,
    color: colors.accent.lime,
  },
  actionTextDanger: {
    ...typography.bodyBold,
    color: colors.error,
  },
  addButton: {
    margin: spacing.xl,
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  addGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  addButtonText: {
    ...typography.h3,
    color: colors.primary.darkBlue,
  },
  securityNotice: {
    flexDirection: 'row',
    backgroundColor: 'rgba(199, 246, 0, 0.05)',
    margin: spacing.xl,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(199, 246, 0, 0.2)',
    gap: spacing.md,
  },
  securityIcon: {
    fontSize: 24,
  },
  securityText: {
    ...typography.body,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },
});
