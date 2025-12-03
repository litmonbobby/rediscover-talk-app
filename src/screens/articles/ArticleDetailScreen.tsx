/**
 * Article Detail Screen - Matches Figma design
 * Full article view with reading experience
 * Supports both light and dark themes
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path } from 'react-native-svg';

type ArticlesStackParamList = {
  ArticlesList: undefined;
  ArticleDetail: {
    article?: Article;
    id?: string;
    title?: string;
  };
};

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
}

type ArticleDetailRouteProp = RouteProp<ArticlesStackParamList, 'ArticleDetail'>;

// Back Arrow Icon
const BackArrowIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19L5 12L12 5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Share Icon
const ShareIcon = ({ color = '#212121' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Bookmark Icon
const BookmarkIcon = ({ color = '#212121', filled = false }: { color?: string; filled?: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path
      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Heart Icon
const HeartIcon = ({ color = '#212121', filled = false }: { color?: string; filled?: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Sample article content
const articleContent = `
Mindfulness is the practice of purposely bringing one's attention to the present moment without judgment. It's a skill that can be developed with practice, and it has been shown to have numerous benefits for mental and physical health.

## Why Mindfulness Matters

In our fast-paced world, it's easy to get caught up in the hustle and bustle of daily life. We often find ourselves dwelling on the past or worrying about the future, missing out on the richness of the present moment.

Mindfulness helps us:
• Reduce stress and anxiety
• Improve focus and concentration
• Enhance emotional regulation
• Better understand our thoughts and feelings
• Improve relationships with others

## 5 Simple Ways to Practice Mindfulness

### 1. Morning Mindfulness Routine

Start your day with intention. Before reaching for your phone, take a few moments to:
- Take three deep breaths
- Notice how your body feels
- Set an intention for the day

### 2. Mindful Eating

Turn your meals into a mindfulness practice:
- Put away distractions
- Notice the colors, textures, and smells
- Chew slowly and savor each bite
- Pay attention to feelings of fullness

### 3. Mindful Walking

Transform your daily walks into meditation:
- Feel each step as your foot touches the ground
- Notice the sensations in your body
- Observe your surroundings without judgment
- Breathe naturally and rhythmically

### 4. Body Scan Meditation

Take time to check in with your body:
- Lie down or sit comfortably
- Slowly move your attention through each body part
- Notice any tension or sensations
- Release tension with each exhale

### 5. Mindful Listening

Practice being fully present in conversations:
- Give your full attention to the speaker
- Notice when your mind wanders and gently return
- Listen without planning your response
- Observe non-verbal cues

## Getting Started

The key to developing a mindfulness practice is consistency. Start with just 5 minutes a day and gradually increase the duration as it becomes more natural.

Remember, mindfulness is not about achieving a particular state of mind. It's about being present with whatever arises, with kindness and curiosity.
`;

export const ArticleDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ArticleDetailRouteProp>();
  const { colors, typography, isDarkMode } = useTheme();

  // Handle both full article object and partial params (id, title)
  const params = route.params || {};
  const article: Article = params.article || {
    id: parseInt(params.id || '1', 10),
    title: params.title || 'Mindfulness Techniques',
    excerpt: 'Learn simple mindfulness techniques for daily life.',
    category: 'Wellness',
    readTime: '5 min read',
    image: '',
    author: 'Wellness Team',
  };

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background.primary }]}
        edges={['top', 'bottom']}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <BackArrowIcon color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setIsBookmarked(!isBookmarked)}
            >
              <BookmarkIcon
                color={isBookmarked ? colors.primary.main : colors.text.primary}
                filled={isBookmarked}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <ShareIcon color={colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Article Header */}
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: colors.primary.main + '20' },
            ]}
          >
            <Text style={[styles.categoryText, { color: colors.primary.main }]}>
              {article.category}
            </Text>
          </View>

          <Text
            style={[
              styles.title,
              {
                color: colors.text.primary,
                fontFamily: typography.fontFamily.primary,
              },
            ]}
          >
            {article.title}
          </Text>

          {/* Author Info */}
          <View style={styles.authorSection}>
            <View
              style={[
                styles.authorAvatar,
                { backgroundColor: colors.primary.main },
              ]}
            >
              <Text style={styles.authorInitial}>
                {article.author.charAt(0)}
              </Text>
            </View>
            <View style={styles.authorInfo}>
              <Text
                style={[
                  styles.authorName,
                  {
                    color: colors.text.primary,
                    fontFamily: typography.fontFamily.primary,
                  },
                ]}
              >
                {article.author}
              </Text>
              <Text style={[styles.readTime, { color: colors.text.tertiary }]}>
                {article.readTime}
              </Text>
            </View>
          </View>

          {/* Article Content */}
          <View style={styles.contentContainer}>
            {articleContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <Text
                    key={index}
                    style={[
                      styles.heading2,
                      {
                        color: colors.text.primary,
                        fontFamily: typography.fontFamily.primary,
                      },
                    ]}
                  >
                    {paragraph.replace('## ', '')}
                  </Text>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <Text
                    key={index}
                    style={[
                      styles.heading3,
                      {
                        color: colors.text.primary,
                        fontFamily: typography.fontFamily.primary,
                      },
                    ]}
                  >
                    {paragraph.replace('### ', '')}
                  </Text>
                );
              }
              if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                return (
                  <View key={index} style={styles.bulletContainer}>
                    {paragraph.split('\n').map((line, i) => (
                      <Text
                        key={i}
                        style={[styles.bulletItem, { color: colors.text.secondary }]}
                      >
                        {line}
                      </Text>
                    ))}
                  </View>
                );
              }
              return (
                <Text
                  key={index}
                  style={[styles.paragraph, { color: colors.text.secondary }]}
                >
                  {paragraph}
                </Text>
              );
            })}
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {['Mindfulness', 'Wellness', 'Self-Care', 'Mental Health'].map((tag) => (
              <View
                key={tag}
                style={[
                  styles.tag,
                  { backgroundColor: colors.background.secondary },
                ]}
              >
                <Text style={[styles.tagText, { color: colors.text.secondary }]}>
                  #{tag}
                </Text>
              </View>
            ))}
          </View>

          {/* Like Section */}
          <View
            style={[
              styles.likeSection,
              { borderTopColor: colors.border.light },
            ]}
          >
            <Text style={[styles.likeText, { color: colors.text.secondary }]}>
              Did you find this article helpful?
            </Text>
            <TouchableOpacity
              style={[
                styles.likeButton,
                {
                  backgroundColor: isLiked
                    ? colors.primary.main
                    : colors.background.secondary,
                },
              ]}
              onPress={() => setIsLiked(!isLiked)}
            >
              <HeartIcon color={isLiked ? '#FFFFFF' : colors.text.primary} filled={isLiked} />
              <Text
                style={[
                  styles.likeButtonText,
                  { color: isLiked ? '#FFFFFF' : colors.text.primary },
                ]}
              >
                {isLiked ? 'Liked' : 'Like'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </>
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
  headerButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 20,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorInitial: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  authorInfo: {
    marginLeft: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  readTime: {
    fontSize: 13,
  },
  contentContainer: {
    marginBottom: 32,
  },
  heading2: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 16,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 16,
  },
  bulletContainer: {
    marginBottom: 16,
  },
  bulletItem: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 13,
  },
  likeSection: {
    borderTopWidth: 1,
    paddingTop: 24,
    alignItems: 'center',
  },
  likeText: {
    fontSize: 15,
    marginBottom: 16,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  likeButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ArticleDetailScreen;
