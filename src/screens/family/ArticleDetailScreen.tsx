/**
 * Article Detail Screen - Full Article Content
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
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path } from 'react-native-svg';
import { Article, FamilyStackParamList } from './FamilyScreen';

type ArticleDetailRouteProp = RouteProp<FamilyStackParamList, 'ArticleDetail'>;

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

const ClockIcon = ({ size = 16, color = '#666' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      stroke={color}
      strokeWidth={2}
    />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const ShareIcon = ({ size = 24, color = '#666' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArticleDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ArticleDetailRouteProp>();
  const { colors, isDarkMode } = useTheme();
  const { article } = route.params;

  // Split content into paragraphs
  const paragraphs = article.content.split('\n\n').filter(p => p.trim());

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
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Article</Text>
        <TouchableOpacity style={styles.shareButton}>
          <ShareIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category and Read Time */}
        <View style={styles.metaContainer}>
          <View style={[styles.categoryBadge, { backgroundColor: 'rgba(158, 181, 103, 0.2)' }]}>
            <Text style={[styles.categoryText, { color: '#9EB567' }]}>{article.category}</Text>
          </View>
          <View style={styles.readTimeContainer}>
            <ClockIcon size={14} color={colors.text.tertiary} />
            <Text style={[styles.readTimeText, { color: colors.text.tertiary }]}>
              {article.readTime}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text.primary }]}>{article.title}</Text>

        {/* Preview/Lead */}
        <Text style={[styles.preview, { color: colors.text.secondary }]}>
          {article.preview}
        </Text>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Article Content */}
        <View style={styles.contentContainer}>
          {paragraphs.map((paragraph, index) => (
            <Text key={index} style={[styles.paragraph, { color: colors.text.primary }]}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Article Footer */}
        <View style={[styles.footerCard, { backgroundColor: colors.background.card }]}>
          <View style={[styles.footerIcon, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
            <BookIcon size={24} color="#9EB567" />
          </View>
          <Text style={[styles.footerText, { color: colors.text.secondary }]}>
            Thank you for reading! Apply these insights to strengthen your family bonds.
          </Text>
        </View>

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
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readTimeText: {
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 16,
  },
  preview: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    marginBottom: 24,
  },
  contentContainer: {
    marginBottom: 32,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 20,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 12,
  },
  footerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ArticleDetailScreen;
