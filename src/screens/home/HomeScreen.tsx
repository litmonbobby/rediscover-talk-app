/**
 * Home Screen - iOS 26 Liquid Glass Design
 * Features native Liquid Glass effects on iOS 26+
 * Graceful fallbacks for older iOS and Android
 */

import React, { useState, useCallback } from 'react';
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
  ImageBackground,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import { GlassCard } from '../../components/core/GlassCard';
import { userProfileService, UserProfile } from '../../services/UserProfileService';

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
  logo: require('../../../assets/images/conversation-logo.png'),
  profile: require('../../figma-extracted/assets/components/icons/iconly-regular-bold-profile.png'),

  // Mood indicators (extracted from Figma)
  moodBad: require('../../figma-extracted/assets/components/mood-indicators/mood-bad-component-mood-indicator.png'),
  moodNotGood: require('../../figma-extracted/assets/components/mood-indicators/mood-not-good-component-mood-indicator.png'),
  moodOkay: require('../../figma-extracted/assets/components/mood-indicators/mood-okay-component-mood-indicator.png'),
  moodGood: require('../../figma-extracted/assets/components/mood-indicators/mood-good-component-mood-indicator.png'),
  moodGreat: require('../../figma-extracted/assets/components/mood-indicators/mood-great-component-mood-indicator.png'),

  // Illustrations for plan cards
  meditation1: require('../../figma-extracted/assets/components/illustrations/illustration-illustration-10-component-illustrations-set.png'),
  meditationPerson: require('../../../assets/images/meditation-person.png'),
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
    1: assets.meditationPerson,
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [greeting, setGreeting] = useState('Good Morning');

  // Load profile on focus
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const userProfile = await userProfileService.getProfile();
      setProfile(userProfile);
      setGreeting(userProfileService.getTimeBasedGreeting());
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const getDisplayName = () => {
    if (profile?.firstName) {
      return profile.firstName;
    }
    return 'Friend';
  };

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
        {/* Header with Greeting */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {profile?.profilePicture ? (
              <Image
                source={{ uri: profile.profilePicture }}
                style={styles.headerAvatar}
              />
            ) : (
              <View style={[styles.headerAvatarPlaceholder, { backgroundColor: '#9EB567' }]}>
                <Image
                  source={assets.profile}
                  style={styles.headerAvatarIcon}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
          <View style={styles.headerCenter}>
            <Text style={[styles.greetingText, { color: colors.text.secondary }]}>
              {greeting}, {getDisplayName()}! 👋
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.tertiary }]}>
              How are you feeling today?
            </Text>
          </View>
          <Image
            source={assets.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>

        {/* Feature Banner - Green card */}
        <TouchableOpacity
          style={styles.featureBanner}
          onPress={() => navigation.navigate('ArticleDetail', {
            id: 'intro-mental-health',
            title: 'Introduction to Mental Health Issues',
          })}
          activeOpacity={0.8}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Introduction to</Text>
            <Text style={styles.bannerTitle}>Mental Health</Text>
            <Text style={styles.bannerTitle}>Issues</Text>
            <View style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Learn More</Text>
            </View>
          </View>
          <Image
            source={assets.bannerIllustration}
            style={styles.bannerIllustration}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Mood Check-in Widget - Liquid Glass */}
        <GlassCard
          variant="regular"
          style={styles.moodCard}
          padding={20}
          borderRadius={16}
        >
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
        </GlassCard>

        {/* Chat with Talia Card - Full Width */}
        <GlassCard
          variant="regular"
          interactive
          onPress={() => navigation.navigate('Chat')}
          style={styles.chatCard}
          padding={20}
        >
          <View style={styles.chatCardContent}>
            <Image
              source={assets.meditation1}
              style={styles.chatAvatar}
              resizeMode="cover"
            />
            <View style={styles.chatTextContainer}>
              <Text style={[styles.chatTitle, { color: colors.text.primary }]}>
                Chat with Talia
              </Text>
              <Text style={[styles.chatSubtitle, { color: colors.text.secondary }]}>
                Your AI wellness companion
              </Text>
            </View>
            <View style={styles.chatArrow}>
              <Text style={styles.chatArrowText}>→</Text>
            </View>
          </View>
        </GlassCard>

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

            {/* Plan cards - Liquid Glass */}
            <View style={styles.plansContainer}>
              {plans.map((plan) => (
                <GlassCard
                  key={plan.id}
                  variant={plan.completed ? 'clear' : 'regular'}
                  interactive={!plan.completed}
                  onPress={() => handlePlanPress(plan)}
                  style={[
                    styles.planCard,
                    plan.completed && styles.planCardCompleted,
                  ]}
                  padding={16}
                >
                  <View style={styles.planCardInner}>
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
                  </View>
                </GlassCard>
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

  // Header with Greeting
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLeft: {
    marginRight: 12,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
  },
  headerAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarIcon: {
    width: 22,
    height: 22,
    tintColor: '#FFFFFF',
  },
  headerCenter: {
    flex: 1,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  headerLogo: {
    width: 28,
    height: 28,
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
  bannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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

  // Chat Card - Full Width
  chatCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  chatCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  chatSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  chatArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#9EB567',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatArrowText: {
    color: '#FFFFFF',
    fontSize: 18,
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
  planCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
