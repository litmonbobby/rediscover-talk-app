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

type Props = NativeStackScreenProps<any, 'PaymentMethodsSettings'>;

export const PaymentMethodsSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddPaymentMethod = () => {
    navigation.navigate('AddNewPayment');
  };

  const handleEditCard = (cardId: string) => {
    console.log('Edit card:', cardId);
  };

  const handleDeleteCard = (cardId: string) => {
    console.log('Delete card:', cardId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/127-light-settings-payment-methods.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Add new payment method button */}
          <TouchableOpacity
            style={styles.addPaymentButton}
            onPress={handleAddPaymentMethod}
            activeOpacity={1}
          />

          {/* Existing payment cards */}
          <TouchableOpacity
            style={styles.paymentCard1}
            onPress={() => handleEditCard('card1')}
            activeOpacity={1}
          />

          <TouchableOpacity
            style={styles.paymentCard2}
            onPress={() => handleEditCard('card2')}
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
  addPaymentButton: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    height: 60,
    zIndex: 10,
  },
  paymentCard1: {
    position: 'absolute',
    top: 220,
    left: 20,
    right: 20,
    height: 80,
    zIndex: 10,
  },
  paymentCard2: {
    position: 'absolute',
    top: 320,
    left: 20,
    right: 20,
    height: 80,
    zIndex: 10,
  },
});
