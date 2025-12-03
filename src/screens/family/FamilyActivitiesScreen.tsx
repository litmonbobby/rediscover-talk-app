/**
 * Family Activities Screen - All Family Activities
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

const HeartIcon = ({ size = 24, color = '#9EB567' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Activity {
  id: string;
  title: string;
  duration: string;
  participants: string;
  description: string;
  instructions: string[];
}

const activitiesData: Activity[] = [
  {
    id: '1',
    title: 'Gratitude Circle',
    duration: '15 min',
    participants: '2-10',
    description: 'Share what you\'re grateful for',
    instructions: [
      'Gather everyone in a circle',
      'Each person shares 3 things they\'re grateful for',
      'Listen without interrupting',
      'Optional: go around twice for deeper sharing',
    ]
  },
  {
    id: '2',
    title: 'Rose, Bud, Thorn',
    duration: '20 min',
    participants: '2-8',
    description: 'Share highs, lows, and hopes',
    instructions: [
      'Rose: Share something positive from your day',
      'Thorn: Share a challenge you faced',
      'Bud: Share something you\'re looking forward to',
      'Everyone takes turns sharing all three',
    ]
  },
  {
    id: '3',
    title: 'Family Story Time',
    duration: '30 min',
    participants: '2-10',
    description: 'Read and discuss together',
    instructions: [
      'Choose a book everyone will enjoy',
      'Take turns reading aloud',
      'Pause to discuss interesting parts',
      'Ask questions about the story',
    ]
  },
  {
    id: '4',
    title: 'Dream Discussion',
    duration: '25 min',
    participants: '2-6',
    description: 'Share goals and dreams',
    instructions: [
      'Each person shares a dream or goal',
      'Others ask supportive questions',
      'Brainstorm how to achieve dreams together',
      'Offer encouragement and support',
    ]
  },
  {
    id: '5',
    title: 'Memory Lane',
    duration: '20 min',
    participants: '2-10',
    description: 'Share favorite family memories',
    instructions: [
      'Each person shares a favorite family memory',
      'Describe what made it special',
      'Others can add their perspective',
      'Look at photos if available',
    ]
  },
  {
    id: '6',
    title: 'Appreciation Express',
    duration: '15 min',
    participants: '3-8',
    description: 'Express appreciation for each other',
    instructions: [
      'One person sits in the "hot seat"',
      'Everyone else shares something they appreciate about them',
      'The person just listens and receives',
      'Rotate until everyone has been appreciated',
    ]
  },
  {
    id: '7',
    title: 'Future Family Planning',
    duration: '30 min',
    participants: '2-8',
    description: 'Plan family adventures together',
    instructions: [
      'Brainstorm activities you\'d like to do together',
      'Everyone suggests ideas without judgment',
      'Vote on favorites',
      'Create a plan to make it happen',
    ]
  },
  {
    id: '8',
    title: 'Feelings Check-In',
    duration: '15 min',
    participants: '2-6',
    description: 'Share and validate emotions',
    instructions: [
      'Each person names their current emotion',
      'Share what\'s causing that feeling',
      'Others listen and validate',
      'Offer support if wanted',
    ]
  },
];

export const FamilyActivitiesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const handleActivityPress = (activity: Activity) => {
    const instructions = activity.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n');
    Alert.alert(
      activity.title,
      `${activity.description}\n\nHow to do it:\n${instructions}`,
      [{ text: 'Got it!' }]
    );
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
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Family Activities</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activitiesData.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[styles.activityCard, { backgroundColor: colors.background.card }]}
            onPress={() => handleActivityPress(activity)}
            activeOpacity={0.7}
          >
            <View style={[styles.activityIconContainer, { backgroundColor: 'rgba(158, 181, 103, 0.15)' }]}>
              <HeartIcon size={28} color="#9EB567" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: colors.text.primary }]}>{activity.title}</Text>
              <Text style={[styles.activityDescription, { color: colors.text.secondary }]}>
                {activity.description}
              </Text>
              <View style={styles.activityMeta}>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: colors.text.tertiary }]}>Duration</Text>
                  <Text style={[styles.metaValue, { color: colors.text.primary }]}>{activity.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: colors.text.tertiary }]}>People</Text>
                  <Text style={[styles.metaValue, { color: colors.text.primary }]}>{activity.participants}</Text>
                </View>
              </View>
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
  activityCard: {
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
  activityIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 13,
    marginBottom: 12,
  },
  activityMeta: {
    flexDirection: 'row',
    gap: 24,
  },
  metaItem: {
    gap: 2,
  },
  metaLabel: {
    fontSize: 11,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default FamilyActivitiesScreen;
