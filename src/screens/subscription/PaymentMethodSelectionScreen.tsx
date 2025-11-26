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

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'PaymentMethod'>;

export const PaymentMethodSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const plan = route?.params?.plan || 'monthly';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddNewPayment = () => {
    navigation.navigate('AddNewPayment');
  };

  const handleSelectPaymentMethod = () => {
    navigation.navigate('ReviewSummary', { plan });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/115-light-choose-payment-methods.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button - top left */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Payment method cards */}
          <TouchableOpacity
            style={styles.paymentCard1}
            onPress={handleSelectPaymentMethod}
            activeOpacity={1}
          />

          <TouchableOpacity
            style={styles.paymentCard2}
            onPress={handleSelectPaymentMethod}
            activeOpacity={1}
          />

          {/* Add new payment button */}
          <TouchableOpacity
            style={styles.addNewPaymentButton}
            onPress={handleAddNewPayment}
            activeOpacity={1}
          />

          {/* Continue button - bottom */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleSelectPaymentMethod}
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
  paymentCard1: {
    position: 'absolute',
    top: 200,
    left: 20,
    right: 20,
    height: 100,
    zIndex: 10,
  },
  paymentCard2: {
    position: 'absolute',
    top: 320,
    left: 20,
    right: 20,
    height: 100,
    zIndex: 10,
  },
  addNewPaymentButton: {
    position: 'absolute',
    top: 440,
    left: 20,
    right: 20,
    height: 60,
    zIndex: 10,
  },
  continueButton: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    zIndex: 10,
  },
});
