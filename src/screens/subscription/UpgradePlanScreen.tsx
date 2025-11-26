import React, { useState } from 'react';
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

type Props = NativeStackScreenProps<any, 'UpgradePlan'>;
type PlanType = 'monthly' | 'yearly';

export const UpgradePlanScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('monthly');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectMonthly = () => {
    setSelectedPlan('monthly');
  };

  const handleSelectYearly = () => {
    setSelectedPlan('yearly');
  };

  const handleContinue = () => {
    navigation.navigate('PaymentMethod', { plan: selectedPlan });
  };

  const getScreenImage = () => {
    if (selectedPlan === 'yearly') {
      return require('../../figma-extracted/assets/screens/light-theme/114-light-upgrade-plan-yearly.png');
    }
    return require('../../figma-extracted/assets/screens/light-theme/113-light-upgrade-plan-monthly.png');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={getScreenImage()}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button - top left */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Monthly plan card */}
          <TouchableOpacity
            style={styles.monthlyPlanCard}
            onPress={handleSelectMonthly}
            activeOpacity={1}
          />

          {/* Yearly plan card */}
          <TouchableOpacity
            style={styles.yearlyPlanCard}
            onPress={handleSelectYearly}
            activeOpacity={1}
          />

          {/* Continue button - bottom */}
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  monthlyPlanCard: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    height: 180,
    zIndex: 10,
  },
  yearlyPlanCard: {
    position: 'absolute',
    top: 380,
    left: 20,
    right: 20,
    height: 180,
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
