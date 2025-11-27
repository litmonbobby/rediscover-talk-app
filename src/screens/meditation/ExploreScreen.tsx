import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Explore'>;

type ExploreTab = 'all' | 'favorites' | 'meditations' | 'breathing';

interface TabData {
  id: ExploreTab;
  label: string;
  icon: string;
}

interface ExploreItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  emoji: string;
  type: 'meditation' | 'breathing';
  isFavorite: boolean;
}

const TABS: TabData[] = [
  { id: 'all', label: 'All', icon: '🌟' },
  { id: 'favorites', label: 'Favorites', icon: '❤️' },
  { id: 'meditations', label: 'Meditations', icon: '🧘' },
  { id: 'breathing', label: 'Breathing', icon: '🫁' },
];

const EXPLORE_ITEMS: ExploreItem[] = [
  // Meditations
  { id: 'm1', title: 'Morning Calm', duration: '10 min', category: 'Morning', emoji: '🌅', type: 'meditation', isFavorite: true },
  { id: 'm2', title: 'Stress Relief', duration: '15 min', category: 'Anxiety', emoji: '🧘', type: 'meditation', isFavorite: false },
  { id: 'm3', title: 'Deep Sleep', duration: '20 min', category: 'Sleep', emoji: '😴', type: 'meditation', isFavorite: true },
  { id: 'm4', title: 'Body Scan', duration: '12 min', category: 'Mindfulness', emoji: '🫁', type: 'meditation', isFavorite: false },
  { id: 'm5', title: 'Gratitude Practice', duration: '8 min', category: 'Gratitude', emoji: '🙏', type: 'meditation', isFavorite: true },
  { id: 'm6', title: 'Focus & Clarity', duration: '15 min', category: 'Focus', emoji: '🎯', type: 'meditation', isFavorite: false },
  // Breathing Exercises
  { id: 'b1', title: '4-7-8 Breathing', duration: '19 sec', category: 'Sleep', emoji: '😴', type: 'breathing', isFavorite: true },
  { id: 'b2', title: 'Box Breathing', duration: '16 sec', category: 'Focus', emoji: '📦', type: 'breathing', isFavorite: false },
  { id: 'b3', title: 'Calm Breathing', duration: '10 sec', category: 'Relaxation', emoji: '☮️', type: 'breathing', isFavorite: false },
];

export const ExploreScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<ExploreTab>('all');

  const getScreenImage = () => {
    switch (activeTab) {
      case 'favorites':
        return getThemedScreenImage('ExploreFavorites', isDarkMode);
      case 'meditations':
        return getThemedScreenImage('ExploreMeditations', isDarkMode);
      case 'breathing':
        return getThemedScreenImage('ExploreBreathing', isDarkMode);
      default:
        return getThemedScreenImage('Explore', isDarkMode);
    }
  };

  const filteredItems = EXPLORE_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'favorites') return item.isFavorite;
    if (activeTab === 'meditations') return item.type === 'meditation';
    if (activeTab === 'breathing') return item.type === 'breathing';
    return true;
  });

  const handleItemPress = (item: ExploreItem) => {
    if (item.type === 'meditation') {
      navigation.navigate('MeditationDetails', { meditation: item });
    } else {
      navigation.navigate('BreathingDetails', { breathing: item });
    }
  };

  const handleTabPress = (tab: ExploreTab) => {
    setActiveTab(tab);
  };

  const renderExploreCard = ({ item }: { item: ExploreItem }) => (
    <TouchableOpacity
      style={styles.exploreCard}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.cardEmoji}>{item.emoji}</Text>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardMeta}>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardDuration}>{item.duration}</Text>
        </View>
      </View>
      {item.isFavorite && <Text style={styles.favoriteIcon}>❤️</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getScreenImage()}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      {/* Tab Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollView}
        contentContainerStyle={styles.tabScrollContent}
      >
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.tabActive,
            ]}
            onPress={() => handleTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabEmoji}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content List */}
      <FlatList
        data={filteredItems}
        renderItem={renderExploreCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in this category yet</Text>
        }
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
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  tabScrollView: {
    maxHeight: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    minWidth: 100,
  },
  tabActive: {
    backgroundColor: colors.primary.DEFAULT + '20',
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  tabEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  tabLabelActive: {
    color: colors.primary.DEFAULT,
    fontWeight: '700',
  },
  contentList: {
    padding: 20,
    paddingBottom: 100,
  },
  exploreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardCategory: {
    fontSize: 14,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  cardDuration: {
    fontSize: 14,
    color: '#666',
  },
  favoriteIcon: {
    fontSize: 24,
    marginLeft: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
});
