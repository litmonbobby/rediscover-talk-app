import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'MoodCheckIn'>;

export const MoodCheckInScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // TODO: Save to Supabase
    console.log('Selected mood:', mood);
    // Navigate back after selection
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design - using "not good" variant which shows all moods */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/28-light-how-do-you-feel-today-not-good.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button area (top left) */}
        <TouchableOpacity
          style={styles.backButtonArea}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Mood selector buttons - positioned based on Figma layout */}
        {/* Vertical layout of 5 mood buttons */}

        {/* Amazing/Great mood */}
        <TouchableOpacity
          style={[styles.moodOptionArea, { top: height * 0.25 }]}
          onPress={() => handleMoodSelect('amazing')}
          activeOpacity={1}
        />

        {/* Good mood */}
        <TouchableOpacity
          style={[styles.moodOptionArea, { top: height * 0.34 }]}
          onPress={() => handleMoodSelect('good')}
          activeOpacity={1}
        />

        {/* Okay mood */}
        <TouchableOpacity
          style={[styles.moodOptionArea, { top: height * 0.43 }]}
          onPress={() => handleMoodSelect('okay')}
          activeOpacity={1}
        />

        {/* Bad mood */}
        <TouchableOpacity
          style={[styles.moodOptionArea, { top: height * 0.52 }]}
          onPress={() => handleMoodSelect('bad')}
          activeOpacity={1}
        />

        {/* Terrible mood */}
        <TouchableOpacity
          style={[styles.moodOptionArea, { top: height * 0.61 }]}
          onPress={() => handleMoodSelect('terrible')}
          activeOpacity={1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  fullScreenImage: {
    width,
    height,
    position: 'absolute',
  },
  backButtonArea: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
  },
  moodOptionArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 70,
  },
});
