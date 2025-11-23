import React from 'react';
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

type Props = NativeStackScreenProps<any, 'MeditationLibrary'>;

interface Meditation {
  id: string;
  title: string;
  duration: string;
  category: string;
  emoji: string;
}

const MEDITATIONS: Meditation[] = [
  { id: '1', title: 'Morning Calm', duration: '10 min', category: 'Morning', emoji: '🌅' },
  { id: '2', title: 'Stress Relief', duration: '15 min', category: 'Anxiety', emoji: '🧘' },
  { id: '3', title: 'Deep Sleep', duration: '20 min', category: 'Sleep', emoji: '😴' },
  { id: '4', title: 'Body Scan', duration: '12 min', category: 'Mindfulness', emoji: '🫁' },
  { id: '5', title: 'Gratitude Practice', duration: '8 min', category: 'Gratitude', emoji: '🙏' },
  { id: '6', title: 'Focus & Clarity', duration: '15 min', category: 'Focus', emoji: '🎯' },
];

export const MeditationLibraryScreen: React.FC<Props> = ({ navigation }) => {
  const handleMeditationPress = (meditation: Meditation, index: number) => {
    navigation.navigate('MeditationPlayer', { meditation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design - Explore Meditations */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/54-light-explore-meditations.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Invisible touchable areas for meditation cards */}
        {/* 6 meditation cards in vertical list */}

        {/* Meditation 1 - Morning Calm */}
        <TouchableOpacity
          style={[styles.meditationCard, { top: height * 0.20 }]}
          onPress={() => handleMeditationPress(MEDITATIONS[0], 0)}
          activeOpacity={1}
        />

        {/* Meditation 2 - Stress Relief */}
        <TouchableOpacity
          style={[styles.meditationCard, { top: height * 0.31 }]}
          onPress={() => handleMeditationPress(MEDITATIONS[1], 1)}
          activeOpacity={1}
        />

        {/* Meditation 3 - Deep Sleep */}
        <TouchableOpacity
          style={[styles.meditationCard, { top: height * 0.42 }]}
          onPress={() => handleMeditationPress(MEDITATIONS[2], 2)}
          activeOpacity={1}
        />

        {/* Meditation 4 - Body Scan */}
        <TouchableOpacity
          style={[styles.meditationCard, { top: height * 0.53 }]}
          onPress={() => handleMeditationPress(MEDITATIONS[3], 3)}
          activeOpacity={1}
        />

        {/* Meditation 5 - Gratitude Practice */}
        <TouchableOpacity
          style={[styles.meditationCard, { top: height * 0.64 }]}
          onPress={() => handleMeditationPress(MEDITATIONS[4], 4)}
          activeOpacity={1}
        />

        {/* Meditation 6 - Focus & Clarity */}
        <TouchableOpacity
          style={[styles.meditationCard, { top: height * 0.75 }]}
          onPress={() => handleMeditationPress(MEDITATIONS[5], 5)}
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
  meditationCard: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 90,
  },
});
