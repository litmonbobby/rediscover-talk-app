import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'ShareBadge'>;

export const ShareBadgeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const badgeId = route?.params?.badgeId;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = (platform: string) => {
    console.log(`Sharing badge ${badgeId} on ${platform}`);
    // Implement share functionality
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <View style={styles.content}>
        <Image
          source={getThemedScreenImage('ShareBadgeProfile', isDarkMode)}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button - top left */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Share options */}
        <TouchableOpacity
          style={styles.shareInstagram}
          onPress={() => handleShare('instagram')}
          activeOpacity={1}
        />

        <TouchableOpacity
          style={styles.shareFacebook}
          onPress={() => handleShare('facebook')}
          activeOpacity={1}
        />

        <TouchableOpacity
          style={styles.shareTwitter}
          onPress={() => handleShare('twitter')}
          activeOpacity={1}
        />

        <TouchableOpacity
          style={styles.shareMore}
          onPress={() => handleShare('more')}
          activeOpacity={1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  shareInstagram: {
    position: 'absolute',
    bottom: 280,
    left: 40,
    width: 80,
    height: 80,
    zIndex: 10,
  },
  shareFacebook: {
    position: 'absolute',
    bottom: 280,
    left: width * 0.5 - 40,
    width: 80,
    height: 80,
    zIndex: 10,
  },
  shareTwitter: {
    position: 'absolute',
    bottom: 280,
    right: 40,
    width: 80,
    height: 80,
    zIndex: 10,
  },
  shareMore: {
    position: 'absolute',
    bottom: 150,
    left: width * 0.5 - 60,
    width: 120,
    height: 60,
    zIndex: 10,
  },
});
