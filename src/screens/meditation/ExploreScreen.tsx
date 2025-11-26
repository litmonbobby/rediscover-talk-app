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

type Props = NativeStackScreenProps<any, 'Explore'>;

type ExploreTab = 'all' | 'favorites' | 'meditations' | 'breathing';

export const ExploreScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<ExploreTab>('all');

  const getScreenImage = () => {
    switch (activeTab) {
      case 'favorites':
        return require('../../figma-extracted/assets/screens/light-theme/53-light-explore-favorites.png');
      case 'meditations':
        return require('../../figma-extracted/assets/screens/light-theme/54-light-explore-meditations.png');
      case 'breathing':
        return require('../../figma-extracted/assets/screens/light-theme/62-light-explore-breathing.png');
      default:
        return require('../../figma-extracted/assets/screens/light-theme/52-light-explore.png');
    }
  };

  const handleMeditationTap = () => {
    navigation.navigate('MeditationDetails');
  };

  const handleBreathingTap = () => {
    navigation.navigate('BreathingDetails');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={getScreenImage()}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Tab buttons - top */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('all')}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('favorites')}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('meditations')}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('breathing')}
            activeOpacity={1}
          />
        </View>

        {/* Content cards - clickable area */}
        <TouchableOpacity
          style={styles.contentArea}
          onPress={activeTab === 'breathing' ? handleBreathingTap : handleMeditationTap}
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
  tabBar: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    height: 60,
    flexDirection: 'row',
    zIndex: 10,
  },
  tab: {
    flex: 1,
    marginHorizontal: 5,
  },
  contentArea: {
    position: 'absolute',
    top: 200,
    left: 20,
    right: 20,
    bottom: 100,
    zIndex: 10,
  },
});
