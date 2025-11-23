import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'ArticleDetail'>;

export const ArticleDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { article } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const shareArticle = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.excerpt}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design - Article Details */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/69-light-article-details.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button area */}
        <TouchableOpacity
          style={styles.backButtonArea}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Share button area (top right) */}
        <TouchableOpacity
          style={styles.shareButtonArea}
          onPress={shareArticle}
          activeOpacity={1}
        />

        {/* Article content is scrollable in the design - tap area for scroll simulation */}
        <TouchableOpacity
          style={styles.articleContentArea}
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
    width: 80,
    height: 50,
    zIndex: 10,
  },
  shareButtonArea: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  articleContentArea: {
    position: 'absolute',
    top: height * 0.25,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
