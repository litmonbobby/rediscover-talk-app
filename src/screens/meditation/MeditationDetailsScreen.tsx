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

type Props = NativeStackScreenProps<any, 'MeditationDetails'>;

export const MeditationDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handlePlay = () => {
    navigation.navigate('MeditationPlayerFull');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={
            isFavorite
              ? require('../../figma-extracted/assets/screens/light-theme/56-light-meditation-details-save-to-favorites.png')
              : require('../../figma-extracted/assets/screens/light-theme/55-light-meditation-details.png')
          }
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button - top left */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Favorite button - top right */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavorite}
          activeOpacity={1}
        />

        {/* Play button - bottom */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlay}
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
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  playButton: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    height: 60,
    zIndex: 10,
  },
});
