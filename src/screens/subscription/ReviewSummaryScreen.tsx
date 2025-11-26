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

type Props = NativeStackScreenProps<any, 'ReviewSummary'>;

export const ReviewSummaryScreen: React.FC<Props> = ({ navigation, route }) => {
  const plan = route?.params?.plan || 'monthly';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirmPayment = () => {
    navigation.navigate('ProcessingPayment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/116-light-review-summary.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button - top left */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Summary area - scrollable content */}
          <View style={styles.summaryArea} />

          {/* Confirm Payment button - bottom */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmPayment}
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
  summaryArea: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    height: height * 0.5,
    zIndex: 5,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    zIndex: 10,
  },
});
