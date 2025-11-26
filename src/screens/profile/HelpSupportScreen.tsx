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

type Props = NativeStackScreenProps<any, 'HelpSupport'>;

export const HelpSupportScreen: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleFAQ = () => {
    navigation.navigate('FAQ');
  };

  const handleContactSupport = () => {
    navigation.navigate('ContactSupport');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleTermsOfService = () => {
    navigation.navigate('TermsOfService');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/133-light-settings-help-support.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* FAQ option */}
          <TouchableOpacity
            style={styles.faqButton}
            onPress={handleFAQ}
            activeOpacity={1}
          />

          {/* Contact Support option */}
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactSupport}
            activeOpacity={1}
          />

          {/* Privacy Policy option */}
          <TouchableOpacity
            style={styles.privacyButton}
            onPress={handlePrivacyPolicy}
            activeOpacity={1}
          />

          {/* Terms of Service option */}
          <TouchableOpacity
            style={styles.termsButton}
            onPress={handleTermsOfService}
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
  faqButton: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  contactButton: {
    position: 'absolute',
    top: 270,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  privacyButton: {
    position: 'absolute',
    top: 360,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
  termsButton: {
    position: 'absolute',
    top: 450,
    left: 20,
    right: 20,
    height: 70,
    zIndex: 10,
  },
});
