import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';

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

  const renderArticleCard = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => handleArticlePress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.articleEmoji}>{item.image}</Text>
      <View style={styles.articleInfo}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleExcerpt}>{item.excerpt}</Text>
        <View style={styles.articleMeta}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.readTimeText}>• {item.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../figma-extracted/assets/screens/light-theme/68-light-explore-articles.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Articles</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Articles List */}
      <FlatList
        data={articles}
        renderItem={renderArticleCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.articlesList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    width,
    height,
    position: 'absolute',
    opacity: 0.15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary.DEFAULT,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  articlesList: {
    padding: 20,
    paddingBottom: 100,
  },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary.DEFAULT,
    backgroundColor: colors.primary.DEFAULT + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readTimeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
});
