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

type Props = NativeStackScreenProps<any, 'NewPaymentAdded'>;

export const NewPaymentAddedScreen: React.FC<Props> = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('PaymentMethodsSettings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/129-light-settings-new-payment-added.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Success checkmark/icon area */}
          <View style={styles.successArea} />

          {/* Continue button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
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
  successArea: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.2,
    right: width * 0.2,
    height: 200,
    zIndex: 5,
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
