/**
 * Meditation Library Screen
 * Functional React Native components matching Figma design
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 56) / 2;

type RootStackParamList = {
  MeditationLibrary: undefined;
  MeditationPlayer: { id: string; title: string; duration: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MeditationLibrary'>;

// Category type
type Category = 'Mindfulness' | 'Stress Reduction' | 'Sleep' | 'Focus' | 'Anxiety';

// Meditation data structure
interface Meditation {
  id: string;
  title: string;
  duration: string;
  category: Category;
  illustration: number;
  isFeatured?: boolean;
}

// Illustrations
const illustrations = {
  meditation1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-10-component-illustrations-set.png'),
  meditation2: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-11-component-illustrations-set.png'),
  meditation3: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-12-component-illustrations-set.png'),
  meditation4: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-13-component-illustrations-set.png'),
  meditation5: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-14-component-illustrations-set.png'),
  meditation6: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-15-component-illustrations-set.png'),
};

// Categories
const categories: Category[] = ['Mindfulness', 'Stress Reduction', 'Sleep', 'Focus', 'Anxiety'];

// Sample meditation data
const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Intro to Meditation',
    duration: '8 mins',
    category: 'Mindfulness',
    illustration: 1,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Calm Focus',
    duration: '10 mins',
    category: 'Mindfulness',
    illustration: 2,
  },
  {
    id: '3',
    title: 'Serene Breath',
    duration: '20 mins',
    category: 'Mindfulness',
    illustration: 3,
  },
  {
    id: '4',
    title: 'Deep Relaxation',
    duration: '15 mins',
    category: 'Stress Reduction',
    illustration: 4,
  },
  {
    id: '5',
    title: 'Evening Wind Down',
    duration: '12 mins',
    category: 'Sleep',
    illustration: 5,
  },
  {
    id: '6',
    title: 'Morning Clarity',
    duration: '8 mins',
    category: 'Focus',
    illustration: 6,
  },
  {
    id: '7',
    title: 'Anxiety Relief',
    duration: '10 mins',
    category: 'Anxiety',
    illustration: 1,
  },
  {
    id: '8',
    title: 'Body Scan',
    duration: '15 mins',
    category: 'Mindfulness',
    illustration: 2,
  },
];

const getIllustration = (index: number) => {
  const illustrationMap: { [key: number]: any } = {
    1: illustrations.meditation1,
    2: illustrations.meditation2,
    3: illustrations.meditation3,
    4: illustrations.meditation4,
    5: illustrations.meditation5,
    6: illustrations.meditation6,
  };
  return illustrationMap[index] || illustrations.meditation1;
};

export const MeditationLibraryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category>('Mindfulness');

  const featuredMeditation = meditations.find(m => m.isFeatured);
  const filteredMeditations = meditations.filter(
    m => m.category === selectedCategory && !m.isFeatured
  );

  const handleMeditationPress = (meditation: Meditation) => {
    navigation.navigate('MeditationPlayer', {
      id: meditation.id,
      title: meditation.title,
      duration: meditation.duration,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.primary}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Meditations
          </Text>
        </View>

        {/* Featured Card */}
        {featuredMeditation && (
          <TouchableOpacity
            style={[styles.featuredCard, { backgroundColor: colors.background.card }]}
            onPress={() => handleMeditationPress(featuredMeditation)}
            activeOpacity={0.8}
          >
            <View style={styles.featuredContent}>
              <Text style={[styles.featuredLabel, { color: colors.primary.main }]}>
                Featured
              </Text>
              <Text style={[styles.featuredTitle, { color: colors.text.primary }]}>
                {featuredMeditation.title}
              </Text>
              <Text style={[styles.featuredDuration, { color: colors.text.secondary }]}>
                {featuredMeditation.duration}
              </Text>
              <TouchableOpacity
                style={[styles.playButton, { backgroundColor: colors.primary.main }]}
                onPress={() => handleMeditationPress(featuredMeditation)}
              >
                <Text style={styles.playButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={getIllustration(featuredMeditation.illustration)}
              style={styles.featuredIllustration}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                {
                  backgroundColor: selectedCategory === category
                    ? colors.primary.main
                    : colors.background.card,
                  borderColor: selectedCategory === category
                    ? colors.primary.main
                    : colors.border.main,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: selectedCategory === category
                      ? '#FFFFFF'
                      : colors.text.primary,
                  },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {selectedCategory}
          </Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: colors.primary.main }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Meditation Grid */}
        <View style={styles.meditationGrid}>
          {filteredMeditations.map((meditation) => (
            <TouchableOpacity
              key={meditation.id}
              style={[styles.meditationCard, { backgroundColor: colors.background.card }]}
              onPress={() => handleMeditationPress(meditation)}
              activeOpacity={0.8}
            >
              <Image
                source={getIllustration(meditation.illustration)}
                style={styles.cardIllustration}
                resizeMode="contain"
              />
              <Text
                style={[styles.cardTitle, { color: colors.text.primary }]}
                numberOfLines={2}
              >
                {meditation.title}
              </Text>
              <Text style={[styles.cardDuration, { color: colors.text.secondary }]}>
                {meditation.duration}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  featuredCard: {
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featuredContent: {
    flex: 1,
  },
  featuredLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  featuredDuration: {
    fontSize: 14,
    marginBottom: 12,
  },
  playButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  featuredIllustration: {
    width: 100,
    height: 100,
  },
  categoryScroll: {
    marginTop: 20,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    gap: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  meditationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
  },
  meditationCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIllustration: {
    width: '100%',
    height: 100,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDuration: {
    fontSize: 13,
  },
});

export default MeditationLibraryScreen;
