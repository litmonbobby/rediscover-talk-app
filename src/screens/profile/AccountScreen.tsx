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

type Props = NativeStackScreenProps<any, 'Account'>;

export const AccountScreen: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleUpgrade = () => {
    navigation.navigate('UpgradePlan');
  };

  const handleMyBadges = () => {
    navigation.navigate('MyBadges');
  };

  const handleDailyReminder = () => {
    navigation.navigate('DailyReminder');
  };

  const handlePreferences = () => {
    navigation.navigate('Preferences');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/112-light-account.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button - top left */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Upgrade Plan button */}
          <TouchableOpacity
            style={styles.upgradePlanButton}
            onPress={handleUpgrade}
            activeOpacity={1}
          />

          {/* My Badges option */}
          <TouchableOpacity
            style={styles.myBadgesButton}
            onPress={handleMyBadges}
            activeOpacity={1}
          />

          {/* Daily Reminder option */}
          <TouchableOpacity
            style={styles.dailyReminderButton}
            onPress={handleDailyReminder}
            activeOpacity={1}
          />

          {/* Preferences option */}
          <TouchableOpacity
            style={styles.preferencesButton}
            onPress={handlePreferences}
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
  upgradePlanButton: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    height: 80,
    zIndex: 10,
  },
  myBadgesButton: {
    position: 'absolute',
    top: 250,
    left: 20,
    right: 20,
    height: 60,
    zIndex: 10,
  },
  dailyReminderButton: {
    position: 'absolute',
    top: 330,
    left: 20,
    right: 20,
    height: 60,
    zIndex: 10,
  },
  preferencesButton: {
    position: 'absolute',
    top: 410,
    left: 20,
    right: 20,
    height: 60,
    zIndex: 10,
  },
});
