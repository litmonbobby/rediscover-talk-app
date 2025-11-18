import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

const screenWidth = Dimensions.get('window').width;

export const InsightsScreen = ({ navigation }: any) => {
  // Sample data - replace with real data from state management
  const moodData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [3, 4, 2, 5, 4, 3, 4],
      },
    ],
  };

  const activityData = {
    labels: ['Meditation', 'Journal', 'Breathwork', 'Sleep'],
    datasets: [
      {
        data: [12, 8, 5, 15],
      },
    ],
  };

  const progressData = {
    labels: ['Mood', 'Sleep', 'Mindfulness'],
    data: [0.75, 0.60, 0.85],
  };

  const chartConfig = {
    backgroundColor: colors.primary.deepBlue,
    backgroundGradientFrom: colors.primary.cobaltBlue,
    backgroundGradientTo: colors.primary.deepBlue,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(199, 246, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: spacing.borderRadius.lg,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.accent.lime,
    },
  };

  return (
    <LinearGradient
      colors={[colors.primary.darkBlue, colors.primary.cobaltBlue]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>Your wellness journey</Text>
        </View>

        {/* Overall Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Overall Progress</Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - spacing.xl * 2}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chart}
          />
        </View>

        {/* Mood Trend */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mood Trend (7 Days)</Text>
          <LineChart
            data={moodData}
            width={screenWidth - spacing.xl * 2}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <View style={styles.legend}>
            <Text style={styles.legendText}>1 = Terrible, 5 = Amazing</Text>
          </View>
        </View>

        {/* Activity Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity Summary (This Week)</Text>
          <BarChart
            data={activityData}
            width={screenWidth - spacing.xl * 2}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[colors.accent.lime, colors.accent.brightLime]}
              style={styles.statGradient}
            >
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Days Active</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[colors.primary.lightBlue, colors.primary.cobaltBlue]}
              style={styles.statGradient}
            >
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[colors.mood.good, colors.mood.veryHappy]}
              style={styles.statGradient}
            >
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>Journal Entries</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[colors.primary.cobaltBlue, colors.primary.deepBlue]}
              style={styles.statGradient}
            >
              <Text style={styles.statNumber}>125</Text>
              <Text style={styles.statLabel}>Minutes Meditated</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Mood Distribution */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mood Distribution</Text>
          <View style={styles.moodDistribution}>
            <View style={styles.moodBar}>
              <Text style={styles.moodEmoji}>😄</Text>
              <View style={styles.moodBarContainer}>
                <View style={[styles.moodBarFill, { width: '30%', backgroundColor: colors.mood.veryHappy }]} />
              </View>
              <Text style={styles.moodPercent}>30%</Text>
            </View>
            <View style={styles.moodBar}>
              <Text style={styles.moodEmoji}>😊</Text>
              <View style={styles.moodBarContainer}>
                <View style={[styles.moodBarFill, { width: '45%', backgroundColor: colors.mood.good }]} />
              </View>
              <Text style={styles.moodPercent}>45%</Text>
            </View>
            <View style={styles.moodBar}>
              <Text style={styles.moodEmoji}>😐</Text>
              <View style={styles.moodBarContainer}>
                <View style={[styles.moodBarFill, { width: '15%', backgroundColor: colors.mood.neutral }]} />
              </View>
              <Text style={styles.moodPercent}>15%</Text>
            </View>
            <View style={styles.moodBar}>
              <Text style={styles.moodEmoji}>😔</Text>
              <View style={styles.moodBarContainer}>
                <View style={[styles.moodBarFill, { width: '7%', backgroundColor: colors.mood.sad }]} />
              </View>
              <Text style={styles.moodPercent}>7%</Text>
            </View>
            <View style={styles.moodBar}>
              <Text style={styles.moodEmoji}>😢</Text>
              <View style={styles.moodBarContainer}>
                <View style={[styles.moodBarFill, { width: '3%', backgroundColor: colors.mood.veryBad }]} />
              </View>
              <Text style={styles.moodPercent}>3%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    paddingTop: spacing['4xl'],
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: spacing.borderRadius.lg,
  },
  legend: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  legendText: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    width: '47%',
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  statGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h1,
    fontSize: 36,
    color: colors.text.primary,
  },
  statLabel: {
    ...typography.body,
    color: colors.text.primary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  moodDistribution: {
    gap: spacing.md,
  },
  moodBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  moodEmoji: {
    fontSize: 24,
    width: 30,
  },
  moodBarContainer: {
    flex: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: spacing.borderRadius.full,
    overflow: 'hidden',
  },
  moodBarFill: {
    height: '100%',
    borderRadius: spacing.borderRadius.full,
  },
  moodPercent: {
    ...typography.bodyBold,
    color: colors.text.primary,
    width: 40,
    textAlign: 'right',
  },
});
