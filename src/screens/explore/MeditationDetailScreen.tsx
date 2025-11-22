/**
 * MeditationDetailScreen
 * Detailed view of a meditation session
 * Reference: Figma screen 43-light-explore-meditation-detail.png
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { Card, Button } from '../../components';

interface MeditationDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  benefits: string[];
  instructor?: string;
  listens: number;
  rating: number;
  audioUrl: string;
}

// Sample data
const sampleMeditation: MeditationDetail = {
  id: '1',
  title: 'Morning Mindfulness',
  description: 'Start your day with clarity and focus',
  longDescription:
    'This guided meditation is designed to help you begin your day with a clear mind and focused intention. Through gentle breathing exercises and body awareness, you\'ll learn to ground yourself in the present moment and set positive intentions for the day ahead.',
  duration: 10,
  category: 'Mindfulness',
  difficulty: 'beginner',
  isPremium: false,
  benefits: [
    'Reduces morning anxiety',
    'Improves focus and concentration',
    'Sets positive intentions',
    'Promotes mindful awareness',
  ],
  instructor: 'Sarah Johnson',
  listens: 12500,
  rating: 4.8,
  audioUrl: 'morning-mindfulness.mp3',
};

export function MeditationDetailScreen() {
  const meditation = sampleMeditation;

  const handleStartMeditation = () => {
    // TODO: Navigate to meditation player
    console.log('Start meditation:', meditation.title);
  };

  const handleAddToFavorites = () => {
    // TODO: Add to favorites
    console.log('Add to favorites');
  };

  const handleDownload = () => {
    // TODO: Download for offline use
    console.log('Download meditation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleAddToFavorites}>
            <Text style={styles.icon}>🤍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleDownload}>
            <Text style={styles.icon}>⬇️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroImagePlaceholder}>
            <Text style={styles.heroIcon}>🧘</Text>
          </View>

          {meditation.isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>PRO</Text>
            </View>
          )}

          <Text style={styles.title}>{meditation.title}</Text>
          <Text style={styles.description}>{meditation.description}</Text>

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⏱️</Text>
              <Text style={styles.infoText}>{meditation.duration} min</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📊</Text>
              <Text style={styles.infoText}>
                {meditation.difficulty.charAt(0).toUpperCase() +
                  meditation.difficulty.slice(1)}
              </Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⭐</Text>
              <Text style={styles.infoText}>{meditation.rating}</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About This Meditation</Text>
          <Text style={styles.sectionText}>{meditation.longDescription}</Text>
        </Card>

        {/* Benefits Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <View style={styles.benefitsList}>
            {meditation.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>✓</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Stats Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Session Info</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{meditation.listens.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Listens</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{meditation.duration} min</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{meditation.category}</Text>
              <Text style={styles.statLabel}>Category</Text>
            </View>
          </View>
          {meditation.instructor && (
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorLabel}>Guided by</Text>
              <Text style={styles.instructorName}>{meditation.instructor}</Text>
            </View>
          )}
        </Card>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomBar}>
        <Button
          title="Start Meditation"
          onPress={handleStartMeditation}
          fullWidth
          icon={<Text style={styles.buttonIcon}>▶</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: theme.colors.text.primary,
    fontWeight: '300',
  },

  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.background.secondary,
  },

  icon: {
    fontSize: 20,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 100, // Space for fixed button
  },

  heroSection: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },

  heroImagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },

  heroIcon: {
    fontSize: 80,
  },

  premiumBadge: {
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.sm,
  },

  premiumText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },

  title: {
    ...theme.typography.heading1,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },

  description: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },

  quickInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.md,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },

  infoIcon: {
    fontSize: 16,
  },

  infoText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },

  infoDivider: {
    width: 1,
    height: 16,
    backgroundColor: theme.colors.border.DEFAULT,
  },

  section: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },

  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  sectionText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },

  benefitsList: {
    gap: theme.spacing.sm,
  },

  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },

  benefitBullet: {
    ...theme.typography.body,
    color: theme.colors.primary.DEFAULT,
    fontWeight: '600',
  },

  benefitText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    flex: 1,
  },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },

  statItem: {
    alignItems: 'center',
  },

  statValue: {
    ...theme.typography.heading3,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },

  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  instructorInfo: {
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    alignItems: 'center',
  },

  instructorLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },

  instructorName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.light,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },

  buttonIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
