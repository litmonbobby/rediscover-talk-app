/**
 * Favorites Screen - User's saved content
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

type TabType = 'all' | 'meditations' | 'articles' | 'quotes';

interface FavoriteItem {
  id: string;
  type: 'meditation' | 'article' | 'quote';
  title: string;
  subtitle: string;
  savedDate: string;
}

const mockFavorites: FavoriteItem[] = [
  { id: '1', type: 'meditation', title: 'Morning Calm', subtitle: '10 mins', savedDate: 'Today' },
  { id: '2', type: 'quote', title: '"The only way out is through"', subtitle: 'Robert Frost', savedDate: 'Yesterday' },
  { id: '3', type: 'article', title: 'Understanding Anxiety', subtitle: '5 min read', savedDate: 'Nov 28' },
  { id: '4', type: 'meditation', title: 'Sleep Well', subtitle: '15 mins', savedDate: 'Nov 27' },
  { id: '5', type: 'article', title: 'Building Resilience', subtitle: '4 min read', savedDate: 'Nov 25' },
];

const getTypeEmoji = (type: string) => {
  switch (type) {
    case 'meditation': return '🧘';
    case 'article': return '📖';
    case 'quote': return '💭';
    default: return '❤️';
  }
};

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const tabs: { key: TabType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'meditations', label: 'Meditations' },
    { key: 'articles', label: 'Articles' },
    { key: 'quotes', label: 'Quotes' },
  ];

  const filteredFavorites = activeTab === 'all'
    ? mockFavorites
    : mockFavorites.filter(f => f.type === activeTab.slice(0, -1));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Favorites</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab.key ? '#fff' : colors.text.secondary },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.favoriteCard, { backgroundColor: colors.background.card }]}
              activeOpacity={0.7}
            >
              <Text style={styles.typeEmoji}>{getTypeEmoji(item.type)}</Text>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text.primary }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[styles.cardSubtitle, { color: colors.text.secondary }]}>
                  {item.subtitle}
                </Text>
              </View>
              <Text style={[styles.savedDate, { color: colors.text.tertiary }]}>
                {item.savedDate}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>❤️</Text>
            <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>
              Tap the heart icon on any content to save it here
            </Text>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(158, 181, 103, 0.15)',
  },
  activeTab: {
    backgroundColor: '#9EB567',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  typeEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
  },
  savedDate: {
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});

export default FavoritesScreen;
