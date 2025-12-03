/**
 * My Badges Screen - Achievement badges
 */

import React from 'react';
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

interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  earned: boolean;
  progress?: number;
}

const badges: Badge[] = [
  { id: '1', title: 'First Steps', description: 'Complete your first mood check-in', emoji: '👣', earned: true },
  { id: '2', title: 'Week Warrior', description: 'Log mood for 7 consecutive days', emoji: '🔥', earned: true },
  { id: '3', title: 'Meditation Master', description: 'Complete 10 meditation sessions', emoji: '🧘', earned: false, progress: 60 },
  { id: '4', title: 'Journal Keeper', description: 'Write 5 journal entries', emoji: '📔', earned: false, progress: 40 },
  { id: '5', title: 'Breath Expert', description: 'Complete all breathing exercises', emoji: '🌬️', earned: false, progress: 20 },
  { id: '6', title: 'Night Owl', description: 'Use sleep sounds for 5 nights', emoji: '🦉', earned: true },
];

export const MyBadgesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>My Badges</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.statsCard, { backgroundColor: '#9EB567' }]}>
          <Text style={styles.statsNumber}>{earnedCount}</Text>
          <Text style={styles.statsLabel}>Badges Earned</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>All Badges</Text>

        {badges.map((badge) => (
          <View
            key={badge.id}
            style={[styles.badgeCard, { backgroundColor: colors.background.card }]}
          >
            <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
            <View style={styles.badgeInfo}>
              <Text style={[styles.badgeTitle, { color: colors.text.primary }]}>{badge.title}</Text>
              <Text style={[styles.badgeDescription, { color: colors.text.secondary }]}>
                {badge.description}
              </Text>
              {!badge.earned && badge.progress !== undefined && (
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${badge.progress}%` }]} />
                </View>
              )}
            </View>
            {badge.earned && <Text style={styles.checkmark}>✓</Text>}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: { width: 40 },
  backText: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  placeholder: { width: 40 },
  content: { flex: 1, paddingHorizontal: 20 },
  statsCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  statsNumber: { fontSize: 48, fontWeight: '700', color: '#fff' },
  statsLabel: { fontSize: 16, color: 'rgba(255,255,255,0.9)' },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 12, textTransform: 'uppercase' },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  badgeEmoji: { fontSize: 32, marginRight: 16 },
  badgeInfo: { flex: 1 },
  badgeTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  badgeDescription: { fontSize: 13 },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(158,181,103,0.2)',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: { height: '100%', backgroundColor: '#9EB567', borderRadius: 2 },
  checkmark: { fontSize: 20, color: '#9EB567', fontWeight: '700' },
});

export default MyBadgesScreen;
