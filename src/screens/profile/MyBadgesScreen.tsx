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

type Props = NativeStackScreenProps<any, 'MyBadges'>;

export const MyBadgesScreen: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleBadgeClick = (badgeId: string) => {
    navigation.navigate('ShareBadge', { badgeId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={require('../../figma-extracted/assets/screens/light-theme/119-light-my-badges.png')}
            style={styles.fullScreenImage}
            resizeMode="cover"
          />

          {/* Back button - top left */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={1}
          />

          {/* Badges grid - clickable badges */}
          <TouchableOpacity
            style={styles.badge1}
            onPress={() => handleBadgeClick('badge1')}
            activeOpacity={1}
          />

          <TouchableOpacity
            style={styles.badge2}
            onPress={() => handleBadgeClick('badge2')}
            activeOpacity={1}
          />

          <TouchableOpacity
            style={styles.badge3}
            onPress={() => handleBadgeClick('badge3')}
            activeOpacity={1}
          />

          <TouchableOpacity
            style={styles.badge4}
            onPress={() => handleBadgeClick('badge4')}
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
  badge1: {
    position: 'absolute',
    top: 200,
    left: 30,
    width: (width - 80) / 2,
    height: 150,
    zIndex: 10,
  },
  badge2: {
    position: 'absolute',
    top: 200,
    right: 30,
    width: (width - 80) / 2,
    height: 150,
    zIndex: 10,
  },
  badge3: {
    position: 'absolute',
    top: 370,
    left: 30,
    width: (width - 80) / 2,
    height: 150,
    zIndex: 10,
  },
  badge4: {
    position: 'absolute',
    top: 370,
    right: 30,
    width: (width - 80) / 2,
    height: 150,
    zIndex: 10,
  },
});
