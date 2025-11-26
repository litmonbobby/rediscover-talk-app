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

type Props = NativeStackScreenProps<any, 'Preferences'>;

export const PreferencesScreen: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handlePersonalInfo = () => {
    navigation.navigate('PersonalInfo');
  };

  const handleAccountSecurity = () => {
    navigation.navigate('AccountSecurity');
  };

  const handleLinkedAccounts = () => {
    navigation.navigate('LinkedAccounts');
  };

  const handleBilling = () => {
    navigation.navigate('BillingSubscriptions');
  };

  const handleAppAppearance = () => {
    navigation.navigate('AppAppearance');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/122-light-preferences.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button - top left */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Personal Info option */}
          <TouchableOpacity
            style={styles.personalInfoButton}
            onPress={handlePersonalInfo}
            activeOpacity={1}
          />

          {/* Account Security option */}
          <TouchableOpacity
            style={styles.securityButton}
            onPress={handleAccountSecurity}
            activeOpacity={1}
          />

          {/* Linked Accounts option */}
          <TouchableOpacity
            style={styles.linkedAccountsButton}
            onPress={handleLinkedAccounts}
            activeOpacity={1}
          />

          {/* Billing option */}
          <TouchableOpacity
            style={styles.billingButton}
            onPress={handleBilling}
            activeOpacity={1}
          />

          {/* App Appearance option */}
          <TouchableOpacity
            style={styles.appearanceButton}
            onPress={handleAppAppearance}
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
  personalInfoButton: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  securityButton: {
    position: 'absolute',
    top: 240,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  linkedAccountsButton: {
    position: 'absolute',
    top: 330,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  billingButton: {
    position: 'absolute',
    top: 420,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  appearanceButton: {
    position: 'absolute',
    top: 510,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
});
