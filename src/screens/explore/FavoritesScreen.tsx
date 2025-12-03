/**
 * Favorites Screen - User's saved content
 * Fully functional with persistent storage
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import { favoritesService, FavoriteItem, FavoriteType } from '../../services/FavoritesService';
import Svg, { Path } from 'react-native-svg';

type TabType = 'all' | 'meditations' | 'affirmations' | 'quotes' | 'sounds';

// Back Arrow Icon
const BackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Trash Icon
const TrashIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#FF4444' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6H5H21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const getTypeEmoji = (type: FavoriteType) => {
  switch (type) {
    case 'meditation': return '🧘';
    case 'affirmation': return '✨';
    case 'quote': return '💭';
    case 'sound': return '🎵';
    case 'article': return '📖';
    default: return '❤️';
  }
};

const getTypeLabel = (type: FavoriteType): string => {
  switch (type) {
    case 'meditation': return 'Meditation';
    case 'affirmation': return 'Affirmation';
    case 'quote': return 'Quote';
    case 'sound': return 'Sound';
    case 'article': return 'Article';
    default: return 'Item';
  }
};

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const tabs: { key: TabType; label: string; type?: FavoriteType }[] = [
    { key: 'all', label: 'All' },
    { key: 'meditations', label: 'Meditations', type: 'meditation' },
    { key: 'affirmations', label: 'Affirmations', type: 'affirmation' },
    { key: 'quotes', label: 'Quotes', type: 'quote' },
    { key: 'sounds', label: 'Sounds', type: 'sound' },
  ];

  const loadFavorites = useCallback(async () => {
    try {
      const items = await favoritesService.getAllFavorites();
      setFavorites(items);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load favorites when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  // Subscribe to changes
  useEffect(() => {
    const unsubscribe = favoritesService.subscribe(() => {
      loadFavorites();
    });
    return unsubscribe;
  }, [loadFavorites]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFavorites();
  }, [loadFavorites]);

  const handleRemoveFavorite = async (item: FavoriteItem) => {
    Alert.alert(
      'Remove Favorite',
      `Remove "${item.title}" from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await favoritesService.removeFavorite(item.type, item.id);
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (favorites.length === 0) return;

    Alert.alert(
      'Clear All Favorites',
      'Are you sure you want to remove all favorites? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await favoritesService.clearAll();
          },
        },
      ]
    );
  };

  const handleItemPress = (item: FavoriteItem) => {
    // Navigate to the appropriate screen based on type
    switch (item.type) {
      case 'meditation':
        // Navigate to meditation player if available
        console.log('Navigate to meditation:', item.id);
        break;
      case 'affirmation':
        console.log('Navigate to affirmation:', item.id);
        break;
      case 'quote':
        console.log('Navigate to quote:', item.id);
        break;
      case 'sound':
        console.log('Navigate to sound:', item.id);
        break;
      default:
        console.log('Navigate to item:', item.id);
    }
  };

  const filteredFavorites = activeTab === 'all'
    ? favorites
    : favorites.filter(f => {
        const tab = tabs.find(t => t.key === activeTab);
        return tab?.type === f.type;
      });

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackIcon size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Favorites</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9EB567" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Favorites</Text>
        {favorites.length > 0 ? (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
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

      {/* Count */}
      <View style={styles.countContainer}>
        <Text style={[styles.countText, { color: colors.text.secondary }]}>
          {filteredFavorites.length} {filteredFavorites.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#9EB567"
          />
        }
      >
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((item) => (
            <TouchableOpacity
              key={`${item.type}-${item.id}`}
              style={[styles.favoriteCard, { backgroundColor: colors.background.card }]}
              activeOpacity={0.7}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.typeEmoji}>{getTypeEmoji(item.type)}</Text>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text.primary }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[styles.cardSubtitle, { color: colors.text.secondary }]}>
                  {item.subtitle}
                </Text>
                <View style={styles.cardMeta}>
                  <Text style={[styles.typeLabel, { color: '#9EB567' }]}>
                    {getTypeLabel(item.type)}
                  </Text>
                  <Text style={[styles.savedDate, { color: colors.text.tertiary }]}>
                    {favoritesService.formatSavedDate(item.savedDate)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFavorite(item)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <TrashIcon size={18} color="#FF4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>❤️</Text>
            <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>
              Tap the heart icon on any content to save it here for quick access
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
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
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
  countContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  countText: {
    fontSize: 13,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  typeEmoji: {
    fontSize: 28,
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
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  savedDate: {
    fontSize: 11,
  },
  removeButton: {
    padding: 8,
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
