/**
 * Home Screen - Exact Figma Recreation
 * Matches 27-light-home.png design
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

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  MoodCheckIn: undefined;
  MeditationPlayer: { id: string; title: string; duration: string };
  Breathwork: undefined;
  JournalEntry: undefined;
  ArticleDetail: { id: string; title: string };
  Chat: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Plan item data structure
interface PlanItem {
  id: string;
  category: 'Meditation' | 'Articles' | 'Breathing' | 'Smart Journal';
  title: string;
  duration: string;
  completed: boolean;
  illustration: number;
}

// Figma-extracted assets
const assets = {
  // Icons
  logo: require('../../figma-extracted/assets/components/icons/iconly-curved-bold-category.png'),
  search: require('../../figma-extracted/assets/components/icons/iconly-curved-outline-search.png'),

  // Mood indicators (extracted from Figma)
  moodBad: require('../../figma-extracted/assets/components/mood-indicators/mood-bad-component-mood-indicator.png'),
  moodNotGood: require('../../figma-extracted/assets/components/mood-indicators/mood-not-good-component-mood-indicator.png'),
  moodOkay: require('../../figma-extracted/assets/components/mood-indicators/mood-okay-component-mood-indicator.png'),
  moodGood: require('../../figma-extracted/assets/components/mood-indicators/mood-good-component-mood-indicator.png'),
  moodGreat: require('../../figma-extracted/assets/components/mood-indicators/mood-great-component-mood-indicator.png'),

  // Illustrations for plan cards
  meditation1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-10-component-illustrations-set.png'),
  article: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-12-component-illustrations-set.png'),
  breathing: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-13-component-illustrations-set.png'),
  journal: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-14-component-illustrations-set.png'),
  gratitude: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-15-component-illustrations-set.png'),

  // Feature banner illustration
  bannerIllustration: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-11-component-illustrations-set.png'),
};

// Sample plans matching Figma
const initialPlans: PlanItem[] = [
  {
    id: '1',
    category: 'Meditation',
    title: 'Intro to Meditation',
    duration: '8 mins',
    completed: false,
    illustration: 1,
  },
  {
    id: '2',
    category: 'Articles',
    title: 'Mindfulness Techniques to...',
    duration: '2 mins read',
    completed: false,
    illustration: 2,
  },
  {
    id: '3',
    category: 'Breathing',
    title: 'Deep Breath Dynamics',
    duration: '2 - 5 mins',
    completed: false,
    illustration: 3,
  },
  {
    id: '4',
    category: 'Smart Journal',
    title: 'What activities usually ma...',
    duration: '20s - 40s',
    completed: false,
    illustration: 4,
  },
  {
    id: '5',
    category: 'Meditation',
    title: 'Gratitude Meditation',
    duration: '10 mins',
    completed: false,
    illustration: 5,
  },
];

// Get illustration based on index
const getIllustration = (index: number) => {
  const illustrationMap: { [key: number]: any } = {
    1: assets.meditation1,
    2: assets.article,
    3: assets.breathing,
    4: assets.journal,
    5: assets.gratitude,
  };
  return illustrationMap[index] || assets.meditation1;
};

// Mood data
const moods = [
  { id: 'bad', label: 'Bad', image: assets.moodBad },
  { id: 'not-good', label: 'Not Good', image: assets.moodNotGood },
  { id: 'okay', label: 'Okay', image: assets.moodOkay },
  { id: 'good', label: 'Good', image: assets.moodGood },
  { id: 'great', label: 'Great', image: assets.moodGreat },
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [plans, setPlans] = useState<PlanItem[]>(initialPlans);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const toggleComplete = (id: string) => {
    setPlans(prev =>
      prev.map(plan =>
        plan.id === id ? { ...plan, completed: !plan.completed } : plan
      )
    );
  };

  const handlePlanPress = (plan: PlanItem) => {
    switch (plan.category) {
      case 'Meditation':
        navigation.navigate('MeditationPlayer', {
          id: plan.id,
          title: plan.title,
          duration: plan.duration,
        });
        break;
      case 'Breathing':
        navigation.navigate('Breathwork');
        break;
      case 'Smart Journal':
        navigation.navigate('JournalEntry');
        break;
      case 'Articles':
        navigation.navigate('ArticleDetail', {
          id: plan.id,
          title: plan.title,
        });
        break;
    }
  };

  const handleMoodPress = (moodId: string) => {
    setSelectedMood(moodId);
    navigation.navigate('MoodCheckIn');
  };

  const completedCount = plans.filter(p => p.completed).length;

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
        {/* Header - Figma exact */}
        <View style={styles.header}>
          <Image
            source={assets.logo}
            style={[styles.headerLogo, { tintColor: '#9EB567' }]}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Home
          </Text>
          <TouchableOpacity style={styles.searchButton}>
            <Image
              source={assets.search}
              style={[styles.searchIcon, { tintColor: colors.text.primary }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Feature Banner - Green card */}
        <TouchableOpacity style={styles.featureBanner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Introduction to</Text>
            <Text style={styles.bannerTitle}>Mental Health</Text>
            <Text style={styles.bannerTitle}>Issues</Text>
          </View>
          <Image
            source={assets.bannerIllustration}
            style={styles.bannerIllustration}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Mood Check-in Widget */}
        <View style={[styles.moodCard, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.moodTitle, { color: colors.text.primary }]}>
            How do you feel today?
          </Text>
          <View style={styles.moodRow}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodButton,
                  selectedMood === mood.id && styles.moodButtonSelected,
                ]}
                onPress={() => handleMoodPress(mood.id)}
              >
                <Image source={mood.image} style={styles.moodImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Action Cards */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickActionCard, { backgroundColor: colors.background.card }]}
            onPress={() => navigation.navigate('Chat')}
          >
            <Image
              source={assets.logo}
              style={[styles.quickActionIcon, { tintColor: '#9EB567' }]}
              resizeMode="contain"
            />
            <View>
              <Text style={[styles.quickActionTitle, { color: colors.text.primary }]}>
                Chat with
              </Text>
              <Text style={[styles.quickActionSubtitle, { color: colors.text.primary }]}>
                Mindy
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickActionCard, { backgroundColor: colors.background.card }]}
          >
            <Image
              source={assets.meditation1}
              style={styles.quickActionAvatar}
              resizeMode="cover"
            />
            <View>
              <Text style={[styles.quickActionTitle, { color: colors.text.primary }]}>
                Talk with
              </Text>
              <Text style={[styles.quickActionSubtitle, { color: colors.text.primary }]}>
                Coach
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Daily Plans Section */}
        <View style={styles.plansSection}>
          <Text style={[styles.plansSectionTitle, { color: colors.text.primary }]}>
            Your plans for today ({completedCount}/{plans.length})
          </Text>

          {/* Plans with progress line */}
          <View style={styles.plansList}>
            {/* Vertical progress line on left */}
            <View style={styles.progressLineContainer}>
              {plans.map((plan, index) => (
                <View key={plan.id} style={styles.progressDotContainer}>
                  <View
                    style={[
                      styles.progressDot,
                      { borderColor: plan.completed ? '#9EB567' : colors.border.light },
                      plan.completed && { backgroundColor: '#9EB567' },
                    ]}
                  />
                  {index < plans.length - 1 && (
                    <View
                      style={[
                        styles.progressDotLine,
                        { backgroundColor: colors.border.light },
                      ]}
                    />
                  )}
                </View>
              ))}
            </View>

            {/* Plan cards */}
            <View style={styles.plansContainer}>
              {plans.map((plan) => (
                <TouchableOpacity
                  key={plan.id}
                  style={[
                    styles.planCard,
                    { backgroundColor: colors.background.card },
                    plan.completed && styles.planCardCompleted,
                  ]}
                  onPress={() => handlePlanPress(plan)}
                  activeOpacity={0.7}
                >
                  {/* Content */}
                  <View style={styles.planContent}>
                    <Text style={styles.categoryLabel}>
                      {plan.category}
                    </Text>
                    <Text
                      style={[
                        styles.planTitle,
                        { color: colors.text.primary },
                        plan.completed && styles.planTitleCompleted,
                      ]}
                      numberOfLines={1}
                    >
                      {plan.title}
                    </Text>
                    <Text style={[styles.planDuration, { color: colors.text.secondary }]}>
                      {plan.duration}
                    </Text>
                  </View>

                  {/* Illustration */}
                  <Image
                    source={getIllustration(plan.illustration)}
                    style={styles.planIllustration}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLogo: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchButton: {
    padding: 4,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },

  // Feature Banner
  featureBanner: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: '#9EB567',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 140,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 26,
  },
  bannerIllustration: {
    width: 140,
    height: 140,
    position: 'absolute',
    right: -10,
    bottom: -20,
  },

  // Mood Widget
  moodCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  moodButton: {
    padding: 4,
    borderRadius: 30,
  },
  moodButtonSelected: {
    backgroundColor: 'rgba(158, 181, 103, 0.2)',
  },
  moodImage: {
    width: 48,
    height: 48,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
  },
  quickActionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  quickActionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Plans Section
  plansSection: {
    paddingHorizontal: 20,
  },
  plansSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  plansList: {
    flexDirection: 'row',
  },
  progressLineContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  progressDotContainer: {
    alignItems: 'center',
    height: 108, // Match card height + margin
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginTop: 24,
  },
  progressDotLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  plansContainer: {
    flex: 1,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    height: 96,
  },
  planCardCompleted: {
    opacity: 0.6,
  },
  planContent: {
    flex: 1,
    marginRight: 12,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9EB567',
    marginBottom: 4,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  planTitleCompleted: {
    textDecorationLine: 'line-through',
  },
  planDuration: {
    fontSize: 13,
  },
  planIllustration: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

export default HomeScreen;
