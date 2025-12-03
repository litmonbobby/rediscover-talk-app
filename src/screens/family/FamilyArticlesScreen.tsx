/**
 * Family Articles Screen - All Family Articles
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path } from 'react-native-svg';

// Icons
const BackIcon = ({ size = 24, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BookIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Article {
  id: string;
  title: string;
  readTime: string;
  category: string;
  preview: string;
}

const articlesData: Article[] = [
  {
    id: '1',
    title: 'Building Trust with Your Teen',
    readTime: '5 min',
    category: 'Parenting',
    preview: 'Trust is the foundation of any relationship, especially with teenagers. Learn how to create an environment where your teen feels safe to share their thoughts and feelings.'
  },
  {
    id: '2',
    title: 'Quality Time vs Quantity Time',
    readTime: '4 min',
    category: 'Relationships',
    preview: 'Discover why the quality of time spent together matters more than the amount. Learn strategies for making every moment count with your family.'
  },
  {
    id: '3',
    title: 'Managing Family Conflict',
    readTime: '6 min',
    category: 'Communication',
    preview: 'Conflict is natural in families. Learn healthy ways to address disagreements and turn conflicts into opportunities for growth and understanding.'
  },
  {
    id: '4',
    title: 'Creating Family Traditions',
    readTime: '4 min',
    category: 'Bonding',
    preview: 'Family traditions create lasting memories and strengthen bonds. Explore ideas for meaningful traditions that your family will cherish for years to come.'
  },
  {
    id: '5',
    title: 'Digital Wellness for Families',
    readTime: '5 min',
    category: 'Technology',
    preview: 'Navigate the digital age together. Learn how to set healthy boundaries around technology while staying connected as a family.'
  },
  {
    id: '6',
    title: 'Supporting Children Through Change',
    readTime: '7 min',
    category: 'Parenting',
    preview: 'Major life changes can be challenging for children. Discover strategies to help your kids adapt and thrive during transitions.'
  },
  {
    id: '7',
    title: 'The Power of Family Dinners',
    readTime: '4 min',
    category: 'Bonding',
    preview: 'Research shows that family meals have profound benefits. Learn how to make dinner time a meaningful daily ritual for your family.'
  },
  {
    id: '8',
    title: 'Teaching Emotional Intelligence',
    readTime: '6 min',
    category: 'Parenting',
    preview: 'Emotional intelligence is a crucial life skill. Discover age-appropriate ways to help your children understand and manage their emotions.'
  },
];

export const FamilyArticlesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const handleArticlePress = (article: Article) => {
    Alert.alert(article.title, article.preview, [{ text: 'Close' }]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Family Articles</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {articlesData.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={[styles.articleCard, { backgroundColor: colors.background.card }]}
            onPress={() => handleArticlePress(article)}
            activeOpacity={0.7}
          >
            <View style={[styles.articleIconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
              <BookIcon size={24} color="#9EB567" />
            </View>
            <View style={styles.articleContent}>
              <Text style={[styles.articleCategory, { color: '#9EB567' }]}>{article.category}</Text>
              <Text style={[styles.articleTitle, { color: colors.text.primary }]}>{article.title}</Text>
              <Text style={[styles.articlePreview, { color: colors.text.secondary }]} numberOfLines={2}>
                {article.preview}
              </Text>
              <Text style={[styles.articleReadTime, { color: colors.text.tertiary }]}>
                {article.readTime} read
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  articleCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  articleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  articleContent: {
    flex: 1,
  },
  articleCategory: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  articlePreview: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  articleReadTime: {
    fontSize: 12,
  },
});

export default FamilyArticlesScreen;
