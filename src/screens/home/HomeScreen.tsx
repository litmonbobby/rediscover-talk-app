import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Text,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';
import { moodIcons, MoodKey, moodLabels, moodColors } from '../../assets/moodIcons';
import { featureIllustrations } from '../../assets/illustrations';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Home'>;

interface QuickAction {
  id: string;
  title: string;
  emoji?: string;
  icon?: ImageSourcePropType;
  onPress: () => void;
  color: string;
}

interface MoodOption {
  icon: ImageSourcePropType;
  label: string;
  value: MoodKey;
  color: string;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors: themeColors, isDarkMode } = useTheme();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Mood handlers
  const handleMood = (mood: string) => {
    setSelectedMood(mood);
    setTimeout(() => navigation.navigate('MoodCheckIn'), 300);
  };

  const quickActions: QuickAction[] = [
    {
      id: 'chat',
      title: 'Chat with Mindy',
      emoji: '💬',
      onPress: () => navigation.navigate('Chat'),
      color: '#E3F2FD',
    },
    {
      id: 'meditation',
      title: 'Meditation',
      emoji: '🧘',
      onPress: () => navigation.navigate('MeditationLibrary'),
      color: '#F3E5F5',
    },
    {
      id: 'journal',
      title: 'Journal',
      emoji: '📝',
      onPress: () => navigation.navigate('JournalList'),
      color: '#FFF3E0',
    },
    {
      id: 'breathe',
      title: 'Breathe',
      emoji: '🌬️',
      onPress: () => navigation.navigate('Breathwork'),
      color: '#E0F2F1',
    },
    {
      id: 'insights',
      title: 'Insights',
      emoji: '📊',
      onPress: () => navigation.navigate('Insights'),
      color: '#F1F8E9',
    },
    {
      id: 'affirmations',
      title: 'Affirmations',
      emoji: '✨',
      onPress: () => navigation.navigate('Affirmations'),
      color: '#FCE4EC',
    },
  ];

  // Real Figma mood icons
  const moods: MoodOption[] = [
    { icon: moodIcons.great, label: 'Great', value: 'great', color: moodColors.great },
    { icon: moodIcons.good, label: 'Good', value: 'good', color: moodColors.good },
    { icon: moodIcons.okay, label: 'Okay', value: 'okay', color: moodColors.okay },
    { icon: moodIcons.notGood, label: 'Not Good', value: 'notGood', color: moodColors.notGood },
    { icon: moodIcons.bad, label: 'Bad', value: 'bad', color: moodColors.bad },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <Image
        source={getThemedScreenImage('Home', isDarkMode)}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Welcome Header */}
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>How are you feeling today?</Text>

          {/* Mood Selector - Real Figma Icons */}
          <View style={styles.moodContainer}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.value}
                style={[
                  styles.moodButton,
                  selectedMood === mood.value && {
                    backgroundColor: mood.color + '20',
                    borderColor: mood.color,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => handleMood(mood.value)}
                activeOpacity={0.7}
              >
                <Image
                  source={mood.icon}
                  style={styles.moodIcon}
                  resizeMode="contain"
                />
                <Text style={[
                  styles.moodLabel,
                  selectedMood === mood.value && { color: mood.color, fontWeight: '700' }
                ]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.viewHistoryButton}
            onPress={() => navigation.navigate('MoodHistory')}
          >
            <Text style={styles.viewHistoryText}>View History →</Text>
          </TouchableOpacity>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionCard, { backgroundColor: action.color }]}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <Text style={styles.actionEmoji}>{action.emoji}</Text>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    flex: 1,
    marginHorizontal: 4,
  },
  moodIcon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  viewHistoryButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  viewHistoryText: {
    fontSize: 14,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
