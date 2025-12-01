import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../constants';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'InsightsDetail'>;

interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  emoji: string;
}

interface MoodDay {
  day: string;
  value: number; // 1-5
  emoji: string;
}

const STATS: Stat[] = [
  {
    id: 's1',
    label: 'Current Streak',
    value: '7 days',
    change: '+2 days',
    isPositive: true,
    emoji: '🔥',
  },
  {
    id: 's2',
    label: 'Journal Entries',
    value: '18',
    change: '+5 this week',
    isPositive: true,
    emoji: '📝',
  },
  {
    id: 's3',
    label: 'Meditations',
    value: '12',
    change: '+3 this week',
    isPositive: true,
    emoji: '🧘',
  },
  {
    id: 's4',
    label: 'Avg Mood',
    value: '4.2/5',
    change: '+0.4 this week',
    isPositive: true,
    emoji: '😊',
  },
];

const MOOD_WEEK: MoodDay[] = [
  { day: 'Mon', value: 4, emoji: '🙂' },
  { day: 'Tue', value: 5, emoji: '😊' },
  { day: 'Wed', value: 3, emoji: '😐' },
  { day: 'Thu', value: 4, emoji: '🙂' },
  { day: 'Fri', value: 5, emoji: '😊' },
  { day: 'Sat', value: 4, emoji: '🙂' },
  { day: 'Sun', value: 5, emoji: '😊' },
];

const RECOMMENDATIONS = [
  {
    id: 'r1',
    title: 'Keep up your streak!',
    description: "You're on a 7-day wellness streak. Try meditation today to maintain momentum.",
    emoji: '🌟',
  },
  {
    id: 'r2',
    title: 'Mood Patterns',
    description: 'Your mood tends to improve on weekends. Consider what activities bring you joy.',
    emoji: '📊',
  },
  {
    id: 'r3',
    title: 'Journaling Boost',
    description: 'Great job with 18 journal entries! Writing helps process emotions and reduce stress.',
    emoji: '✍️',
  },
];

export const InsightsDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Insights</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Stats</Text>
          <View style={styles.statsGrid}>
            {STATS.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <Text style={styles.statEmoji}>{stat.emoji}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text
                  style={[
                    styles.statChange,
                    stat.isPositive ? styles.statChangePositive : styles.statChangeNegative,
                  ]}
                >
                  {stat.change}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mood Trend Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Mood</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {MOOD_WEEK.map((day, index) => (
                <View key={day.day} style={styles.chartDay}>
                  <View style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        { height: `${(day.value / 5) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.dayEmoji}>{day.emoji}</Text>
                  <Text style={styles.dayLabel}>{day.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Insights</Text>
          {RECOMMENDATIONS.map((rec) => (
            <View key={rec.id} style={styles.recommendationCard}>
              <Text style={styles.recommendationEmoji}>{rec.emoji}</Text>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
                <Text style={styles.recommendationDescription}>{rec.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Keep Going!</Text>
          <Text style={styles.summaryText}>
            You're doing great with your wellness journey. Your consistent effort is making a difference. Keep tracking your mood, journaling, and practicing mindfulness.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statChangePositive: {
    color: '#10B981',
  },
  statChangeNegative: {
    color: '#EF4444',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
  },
  chartDay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  bar: {
    width: '80%',
    backgroundColor: colors.primary.DEFAULT,
    borderRadius: 8,
    minHeight: 20,
  },
  dayEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  recommendationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: colors.primary.DEFAULT + '10',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT + '30',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary.DEFAULT,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
