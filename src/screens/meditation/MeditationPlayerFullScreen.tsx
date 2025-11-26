import React, { useState, useEffect } from 'react';
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

type Props = NativeStackScreenProps<any, 'MeditationPlayerFull'>;

export const MeditationPlayerFullScreen: React.FC<Props> = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    // Simulate meditation completion after 5 seconds for demo
    const timer = setTimeout(() => {
      setShowCompleted(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEdit = () => {
    navigation.navigate('EditSounds');
  };

  const handleComplete = () => {
    navigation.navigate('Home');
  };

  if (showCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/60-light-meditation-completed.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Done button - bottom */}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleComplete}
            activeOpacity={1}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/57-light-start-or-play-meditation.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button - top left */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Edit sounds button - top right */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
          activeOpacity={1}
        />

        {/* Play/Pause button - center */}
        <TouchableOpacity
          style={styles.playPauseButton}
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
  editButton: {
    position: 'absolute',
    top: 50,
    right: 20,
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
  doneButton: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    zIndex: 10,
  },
});
