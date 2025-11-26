import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'SleepPlayer'>;

export const SleepPlayerScreen: React.FC<Props> = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/109-light-play-sleep-music-or-stories.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button - top left */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Play/Pause button - center */}
        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={handlePlayPause}
          activeOpacity={1}
        />

        {/* Timer controls - bottom */}
        <View style={styles.controlsArea}>
          <TouchableOpacity style={styles.controlButton} activeOpacity={1} />
          <TouchableOpacity style={styles.controlButton} activeOpacity={1} />
          <TouchableOpacity style={styles.controlButton} activeOpacity={1} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    width,
    height,
  },
  fullScreenImage: {
    width,
    height,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  playPauseButton: {
    position: 'absolute',
    top: height * 0.5 - 50,
    left: width * 0.5 - 50,
    width: 100,
    height: 100,
    zIndex: 10,
  },
  controlsArea: {
    position: 'absolute',
    bottom: 100,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 10,
  },
  controlButton: {
    width: 60,
    height: 60,
  },
});
