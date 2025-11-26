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

type Props = NativeStackScreenProps<any, 'DailyReminder'>;

export const DailyReminderScreen: React.FC<Props> = ({ navigation }) => {
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleToggleReminders = () => {
    setRemindersEnabled(!remindersEnabled);
  };

  const handleSetTime = () => {
    // Open time picker
    console.log('Open time picker');
  };

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/121-light-daily-reminder.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button - top left */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Toggle switch */}
          <TouchableOpacity
            style={styles.toggleSwitch}
            onPress={handleToggleReminders}
            activeOpacity={1}
          />

          {/* Time picker */}
          <TouchableOpacity
            style={styles.timePicker}
            onPress={handleSetTime}
            activeOpacity={1}
          />

          {/* Days of week selection */}
          <View style={styles.daysArea}>
            <TouchableOpacity style={styles.dayButton} activeOpacity={1} />
            <TouchableOpacity style={styles.dayButton} activeOpacity={1} />
            <TouchableOpacity style={styles.dayButton} activeOpacity={1} />
            <TouchableOpacity style={styles.dayButton} activeOpacity={1} />
            <TouchableOpacity style={styles.dayButton} activeOpacity={1} />
            <TouchableOpacity style={styles.dayButton} activeOpacity={1} />
            <TouchableOpacity style={styles.dayButton} activeOpacity={1} />
          </View>

          {/* Save button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
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
  toggleSwitch: {
    position: 'absolute',
    top: 180,
    right: 30,
    width: 60,
    height: 34,
    zIndex: 10,
  },
  timePicker: {
    position: 'absolute',
    top: 250,
    left: 20,
    right: 20,
    height: 100,
    zIndex: 10,
  },
  daysArea: {
    position: 'absolute',
    top: 380,
    left: 20,
    right: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 10,
  },
  dayButton: {
    width: 45,
    height: 45,
  },
  saveButton: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    zIndex: 10,
  },
});
