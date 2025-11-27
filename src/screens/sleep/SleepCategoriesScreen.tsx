import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'SleepCategories'>;

type SleepCategory = 'nature' | 'traffic' | 'sleep' | 'animals' | 'meditation' | 'asmr' | 'other' | 'music' | 'stories';

interface Category {
  id: SleepCategory;
  name: string;
  emoji: string;
}

interface Sound {
  id: string;
  title: string;
  duration: string;
  category: SleepCategory;
}

const CATEGORIES: Category[] = [
  { id: 'nature', name: 'Nature', emoji: '🌿' },
  { id: 'traffic', name: 'Traffic', emoji: '🚗' },
  { id: 'sleep', name: 'Sleep', emoji: '😴' },
  { id: 'animals', name: 'Animals', emoji: '🐾' },
  { id: 'meditation', name: 'Meditation', emoji: '🧘' },
  { id: 'asmr', name: 'ASMR', emoji: '🎧' },
  { id: 'other', name: 'Other', emoji: '✨' },
  { id: 'music', name: 'Music', emoji: '🎵' },
  { id: 'stories', name: 'Stories', emoji: '📖' },
];

const SOUNDS: Sound[] = [
  // Nature sounds
  { id: '1', title: 'Rain on Leaves', duration: '60 min', category: 'nature' },
  { id: '2', title: 'Ocean Waves', duration: '45 min', category: 'nature' },
  { id: '3', title: 'Forest Birds', duration: '30 min', category: 'nature' },
  { id: '4', title: 'Thunder Storm', duration: '40 min', category: 'nature' },
  // Traffic sounds
  { id: '5', title: 'City Traffic', duration: '60 min', category: 'traffic' },
  { id: '6', title: 'Train Sounds', duration: '45 min', category: 'traffic' },
  // Sleep sounds
  { id: '7', title: 'White Noise', duration: '120 min', category: 'sleep' },
  { id: '8', title: 'Pink Noise', duration: '120 min', category: 'sleep' },
  { id: '9', title: 'Brown Noise', duration: '120 min', category: 'sleep' },
  // Animals
  { id: '10', title: 'Cat Purring', duration: '30 min', category: 'animals' },
  { id: '11', title: 'Whale Songs', duration: '45 min', category: 'animals' },
];

export const SleepCategoriesScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<SleepCategory>('nature');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCategorySelect = (category: SleepCategory) => {
    setSelectedCategory(category);
  };

  const handleSoundPress = (sound: Sound) => {
    navigation.navigate('SleepPlayer', { sound, category: selectedCategory });
  };

  const filteredSounds = SOUNDS.filter((s) => s.category === selectedCategory);

  const getScreenImageKey = (): keyof typeof import('../../theme/getThemeImage').ScreenMap => {
    switch (selectedCategory) {
      case 'traffic':
        return 'SleepSoundsTraffic';
      case 'sleep':
        return 'SleepSoundsSleep';
      case 'animals':
        return 'SleepSoundsAnimals';
      case 'meditation':
        return 'SleepSoundsMeditation';
      case 'asmr':
        return 'SleepSoundsASMR';
      case 'other':
        return 'SleepSoundsOther';
      case 'music':
        return 'SleepMusic';
      case 'stories':
        return 'SleepStories';
      default:
        return 'SleepSoundsNature';
    }
  };

  const renderSoundItem = ({ item }: { item: Sound }) => (
    <TouchableOpacity
      style={styles.soundCard}
      onPress={() => handleSoundPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.soundTitle}>{item.title}</Text>
      <Text style={styles.soundDuration}>{item.duration}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage(getScreenImageKey(), isDarkMode)}
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
        <Text style={styles.headerTitle}>Sleep Sounds</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.categoryTabActive,
            ]}
            onPress={() => handleCategorySelect(category.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text
              style={[
                styles.categoryName,
                selectedCategory === category.id && styles.categoryNameActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sounds List */}
      <FlatList
        data={filteredSounds}
        renderItem={renderSoundItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.soundsList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No sounds in this category yet</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    zIndex: 10,
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
  categoryScrollView: {
    maxHeight: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    minWidth: 80,
  },
  categoryTabActive: {
    backgroundColor: colors.primary.DEFAULT + '20',
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryNameActive: {
    color: colors.primary.DEFAULT,
    fontWeight: '700',
  },
  soundsList: {
    padding: 20,
    paddingBottom: 100,
  },
  soundCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  soundTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
  },
  soundDuration: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
});
