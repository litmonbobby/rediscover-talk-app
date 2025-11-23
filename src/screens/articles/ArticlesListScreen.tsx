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

type Props = NativeStackScreenProps<any, 'ArticlesList'>;

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
};

export const ArticlesListScreen: React.FC<Props> = ({ navigation }) => {
  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: A Comprehensive Guide',
      excerpt: 'Learn about the science behind anxiety and practical strategies to manage it effectively.',
      category: 'Mental Health',
      readTime: '5 min read',
      image: '📚',
    },
    {
      id: '2',
      title: 'The Power of Mindfulness Meditation',
      excerpt: 'Discover how mindfulness can transform your daily life and reduce stress.',
      category: 'Mindfulness',
      readTime: '7 min read',
      image: '🧘',
    },
    {
      id: '3',
      title: 'Building Healthy Sleep Habits',
      excerpt: 'Expert tips for improving your sleep quality and establishing a bedtime routine.',
      category: 'Sleep',
      readTime: '6 min read',
      image: '😴',
    },
  ];

  const handleArticlePress = (article: Article) => {
    navigation.navigate('ArticleDetail', { article });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Full-screen Figma design - Explore Articles */}
        <Image
          source={require('../../figma-extracted/assets/screens/light-theme/68-light-explore-articles.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />

        {/* Back button area */}
        <TouchableOpacity
          style={styles.backButtonArea}
          onPress={handleBack}
          activeOpacity={1}
        />

        {/* Article cards - clickable areas */}
        {/* Article 1 */}
        <TouchableOpacity
          style={[styles.articleCardArea, { top: height * 0.22 }]}
          onPress={() => handleArticlePress(articles[0])}
          activeOpacity={1}
        />

        {/* Article 2 */}
        <TouchableOpacity
          style={[styles.articleCardArea, { top: height * 0.40 }]}
          onPress={() => handleArticlePress(articles[1])}
          activeOpacity={1}
        />

        {/* Article 3 */}
        <TouchableOpacity
          style={[styles.articleCardArea, { top: height * 0.58 }]}
          onPress={() => handleArticlePress(articles[2])}
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
    zIndex: 10,
  },
  articleCardArea: {
    position: 'absolute',
    left: width * 0.05,
    right: width * 0.05,
    height: 150,
  },
});
