/**
 * Family Tips Screen - All Family Tips
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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import Svg, { Path } from 'react-native-svg';

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

const LightbulbIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.725V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.275A7 7 0 0 0 12 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
  fullContent: string;
}

const tipsData: Tip[] = [
  {
    id: '1',
    title: 'Daily Check-ins',
    description: 'Spend 10 minutes each day asking about each family member\'s day',
    category: 'Communication',
    fullContent: 'Set aside 10 minutes each evening to ask each family member about their day. Use open-ended questions like "What was the best part of your day?" or "What challenged you today?" This creates a safe space for sharing and strengthens emotional bonds.'
  },
  {
    id: '2',
    title: 'Screen-Free Meals',
    description: 'Make mealtimes device-free for better conversations',
    category: 'Quality Time',
    fullContent: 'Designate all mealtimes as screen-free zones. Put phones in a basket, turn off the TV, and focus on meaningful conversations. Use this time to connect, share stories, and create lasting memories together.'
  },
  {
    id: '3',
    title: 'Weekly Family Meetings',
    description: 'Schedule regular family meetings to discuss plans and feelings',
    category: 'Communication',
    fullContent: 'Hold a 30-minute family meeting once a week. Create an agenda that includes celebrations, concerns, and upcoming plans. Give everyone a chance to speak and be heard. This promotes respect and collaborative problem-solving.'
  },
  {
    id: '4',
    title: 'Express Gratitude',
    description: 'Share one thing you\'re grateful for about each family member daily',
    category: 'Appreciation',
    fullContent: 'Make gratitude a daily habit. At dinner or bedtime, have each person share one thing they appreciate about another family member. This builds positive relationships and helps everyone feel valued and loved.'
  },
  {
    id: '5',
    title: 'Create Traditions',
    description: 'Establish unique family traditions that everyone looks forward to',
    category: 'Bonding',
    fullContent: 'Create special traditions unique to your family - movie nights, Sunday brunches, or monthly adventures. These shared experiences become cherished memories and give everyone something to look forward to.'
  },
  {
    id: '6',
    title: 'Active Listening',
    description: 'Practice listening without interrupting or judging',
    category: 'Communication',
    fullContent: 'When a family member is speaking, give them your full attention. Put down devices, make eye contact, and resist the urge to interrupt or offer solutions immediately. Sometimes people just need to be heard.'
  },
  {
    id: '7',
    title: 'One-on-One Time',
    description: 'Spend individual time with each family member regularly',
    category: 'Quality Time',
    fullContent: 'Schedule regular one-on-one time with each family member. This could be a weekly coffee date, a walk, or a shared hobby. Individual attention strengthens unique bonds and makes each person feel special.'
  },
  {
    id: '8',
    title: 'Celebrate Small Wins',
    description: 'Acknowledge and celebrate everyday achievements',
    category: 'Appreciation',
    fullContent: 'Don\'t wait for big milestones to celebrate. Acknowledge small achievements - a good test grade, completing chores, or acts of kindness. This positive reinforcement builds confidence and motivation.'
  },
];

export const FamilyTipsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const handleTipPress = (tip: Tip) => {
    Alert.alert(tip.title, tip.fullContent, [{ text: 'Got it!' }]);
  };

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
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Family Tips</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tipsData.map((tip) => (
          <TouchableOpacity
            key={tip.id}
            style={[styles.tipCard, { backgroundColor: colors.background.card }]}
            onPress={() => handleTipPress(tip)}
            activeOpacity={0.7}
          >
            <View style={[styles.tipIconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
              <LightbulbIcon size={24} color="#9EB567" />
            </View>
            <View style={styles.tipContent}>
              <Text style={[styles.tipCategory, { color: '#9EB567' }]}>{tip.category}</Text>
              <Text style={[styles.tipTitle, { color: colors.text.primary }]}>{tip.title}</Text>
              <Text style={[styles.tipDescription, { color: colors.text.secondary }]} numberOfLines={2}>
                {tip.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipCategory: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export default FamilyTipsScreen;
