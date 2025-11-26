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

type Props = NativeStackScreenProps<any, 'SleepCategories'>;

type SleepCategory = 'nature' | 'traffic' | 'sleep' | 'animals' | 'meditation' | 'asmr' | 'other' | 'music' | 'stories';

export const SleepCategoriesScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<SleepCategory>('nature');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCategorySelect = (category: SleepCategory) => {
    setSelectedCategory(category);
  };

  const handlePlay = () => {
    navigation.navigate('SleepPlayer', { category: selectedCategory });
  };

  const getScreenImage = () => {
    switch (selectedCategory) {
      case 'traffic':
        return require('../../figma-extracted/assets/screens/light-theme/101-light-sleep-sounds-traffic.png');
      case 'sleep':
        return require('../../figma-extracted/assets/screens/light-theme/102-light-sleep-sounds-sleep.png');
      case 'animals':
        return require('../../figma-extracted/assets/screens/light-theme/103-light-sleep-sounds-animals.png');
      case 'meditation':
        return require('../../figma-extracted/assets/screens/light-theme/104-light-sleep-sounds-meditation.png');
      case 'asmr':
        return require('../../figma-extracted/assets/screens/light-theme/105-light-sleep-sounds-asmr.png');
      case 'other':
        return require('../../figma-extracted/assets/screens/light-theme/106-light-sleep-sounds-other.png');
      case 'music':
        return require('../../figma-extracted/assets/screens/light-theme/107-light-sleep-music.png');
      case 'stories':
        return require('../../figma-extracted/assets/screens/light-theme/108-light-sleep-stories.png');
      default:
        return require('../../figma-extracted/assets/screens/light-theme/100-light-sleep-sounds-nature.png');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

        {/* Category grid - middle area */}
        <View style={styles.categoryGrid}>
          {/* Row 1 */}
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategorySelect('nature')}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategorySelect('traffic')}
            activeOpacity={1}
          />
          {/* Row 2 */}
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategorySelect('sleep')}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategorySelect('animals')}
            activeOpacity={1}
          />
          {/* Row 3 */}
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategorySelect('meditation')}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategorySelect('asmr')}
            activeOpacity={1}
          />
        </View>

        {/* Sound items - clickable to play */}
        <TouchableOpacity
          style={styles.soundsArea}
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
  categoryGrid: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    height: 180,
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 10,
  },
  categoryButton: {
    width: (width - 60) / 2,
    height: 80,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  soundsArea: {
    position: 'absolute',
    top: 320,
    left: 20,
    right: 20,
    bottom: 100,
    zIndex: 10,
  },
});
