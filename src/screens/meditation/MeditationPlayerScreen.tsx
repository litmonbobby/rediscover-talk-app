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

type Props = NativeStackScreenProps<any, 'MeditationPlayer'>;

export const MeditationPlayerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { meditation } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual audio playback
    console.log(isPlaying ? 'Pausing' : 'Playing', meditation.title);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOptions = () => {
    // TODO: Show options menu
    console.log('Options pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design - Meditation Player */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/57-light-start-or-play-meditation.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button area (top left) */}
        <TouchableOpacity
          style={styles.backButtonArea}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Options button area (top right) */}
        <TouchableOpacity
          style={styles.optionsButtonArea}
          onPress={handleOptions}
          activeOpacity={1}
        />

        {/* Play/Pause button area (center) */}
        <TouchableOpacity
          style={styles.playPauseArea}
          onPress={handlePlayPause}
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
  optionsButtonArea: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 50,
    height: 50,
  },
  playPauseArea: {
    position: 'absolute',
    top: height * 0.45,
    left: width * 0.35,
    width: width * 0.30,
    height: width * 0.30,
  },
});
