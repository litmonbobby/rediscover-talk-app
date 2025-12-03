/**
 * My Badges Screen - Achievement badges with categories and progress
 * Uses BadgeService for badge management and notifications
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';
import {
  badgeService,
  Badge,
  BadgeProgress,
  BadgeCategory,
  RARITY_COLORS,
  ALL_BADGES,
} from '../../services/BadgeService';
import { badgeNotificationService } from '../../services/BadgeNotificationService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Category display names and emojis
const CATEGORY_INFO: Record<BadgeCategory, { name: string; emoji: string }> = {
  mood: { name: 'Mood Tracking', emoji: '😊' },
  meditation: { name: 'Meditation', emoji: '🧘' },
  journal: { name: 'Journaling', emoji: '📝' },
  breathing: { name: 'Breathing', emoji: '🌬️' },
  sleep: { name: 'Sleep', emoji: '😴' },
  family: { name: 'Family', emoji: '👨‍👩‍👧‍👦' },
  streak: { name: 'Streaks', emoji: '🔥' },
  milestone: { name: 'Milestones', emoji: '🎯' },
  special: { name: 'Special', emoji: '⭐' },
};

// Filter options
type FilterOption = 'all' | 'earned' | 'in_progress' | BadgeCategory;

interface BadgeWithProgress extends Badge {
  progress: BadgeProgress;
}

export const MyBadgesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();
  const [badges, setBadges] = useState<BadgeWithProgress[]>([]);
  const [earnedCount, setEarnedCount] = useState(0);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load badges data
  const loadBadges = useCallback(async () => {
    try {
      const badgesWithProgress = await badgeService.getAllBadgesWithProgress();
      setBadges(badgesWithProgress);
      const count = await badgeService.getEarnedCount();
      setEarnedCount(count);
    } catch (error) {
      console.error('Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload on focus
  useFocusEffect(
    useCallback(() => {
      loadBadges();
    }, [loadBadges])
  );

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadBadges();
    setRefreshing(false);
  };

  // Filter badges
  const filteredBadges = badges.filter(badge => {
    switch (filter) {
      case 'all':
        return true;
      case 'earned':
        return badge.progress.earned;
      case 'in_progress':
        return !badge.progress.earned && badge.progress.currentValue > 0;
      default:
        return badge.category === filter;
    }
  });

  // Group by category for display
  const groupedBadges = filteredBadges.reduce((acc, badge) => {
    const category = badge.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(badge);
    return acc;
  }, {} as Record<BadgeCategory, BadgeWithProgress[]>);

  // Test notification (for development)
  const handleTestNotification = async () => {
    const result = await badgeNotificationService.sendTestNotification();
    if (result) {
      Alert.alert('Test Notification Sent', 'Check your notification center!');
    } else {
      Alert.alert('Error', 'Failed to send test notification. Make sure notifications are enabled.');
    }
  };

  // Render filter pills
  const renderFilterPills = () => {
    const filters: { key: FilterOption; label: string }[] = [
      { key: 'all', label: 'All' },
      { key: 'earned', label: 'Earned' },
      { key: 'in_progress', label: 'In Progress' },
    ];

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[
              styles.filterPill,
              {
                backgroundColor: filter === f.key ? '#9EB567' : colors.background.card,
                borderColor: filter === f.key ? '#9EB567' : colors.border.light,
              },
            ]}
            onPress={() => setFilter(f.key)}
          >
            <Text
              style={[
                styles.filterPillText,
                { color: filter === f.key ? '#FFFFFF' : colors.text.primary },
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // Render badge card
  const renderBadgeCard = (badge: BadgeWithProgress) => {
    const progressPercent = badgeService.getProgressPercentage(badge, badge.progress);
    const rarityColor = RARITY_COLORS[badge.rarity];

    return (
      <View
        key={badge.id}
        style={[
          styles.badgeCard,
          {
            backgroundColor: colors.background.card,
            opacity: badge.progress.earned ? 1 : 0.75,
          },
        ]}
      >
        {/* Badge Emoji with glow effect for earned */}
        <View
          style={[
            styles.badgeEmojiContainer,
            badge.progress.earned && {
              shadowColor: rarityColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
            },
          ]}
        >
          <Text style={[styles.badgeEmoji, !badge.progress.earned && styles.badgeEmojiLocked]}>
            {badge.emoji}
          </Text>
          {!badge.progress.earned && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}
        </View>

        {/* Badge Info */}
        <View style={styles.badgeInfo}>
          <View style={styles.badgeTitleRow}>
            <Text style={[styles.badgeTitle, { color: colors.text.primary }]} numberOfLines={1}>
              {badge.title}
            </Text>
            <View style={[styles.rarityBadge, { backgroundColor: rarityColor + '20' }]}>
              <Text style={[styles.rarityText, { color: rarityColor }]}>
                {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
              </Text>
            </View>
          </View>

          <Text style={[styles.badgeDescription, { color: colors.text.secondary }]} numberOfLines={2}>
            {badge.description}
          </Text>

          {/* Progress Bar */}
          {!badge.progress.earned && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: colors.background.secondary }]}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progressPercent}%`,
                      backgroundColor: rarityColor,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.text.tertiary }]}>
                {badge.progress.currentValue}/{badge.requirement}
              </Text>
            </View>
          )}

          {/* Earned date */}
          {badge.progress.earned && badge.progress.earnedAt && (
            <Text style={[styles.earnedDate, { color: '#9EB567' }]}>
              ✓ Earned {new Date(badge.progress.earnedAt).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>
    );
  };

  // Render category section
  const renderCategorySection = (category: BadgeCategory, categoryBadges: BadgeWithProgress[]) => {
    const categoryInfo = CATEGORY_INFO[category];
    const earnedInCategory = categoryBadges.filter(b => b.progress.earned).length;

    return (
      <View key={category} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryEmoji}>{categoryInfo.emoji}</Text>
          <Text style={[styles.categoryTitle, { color: colors.text.primary }]}>
            {categoryInfo.name}
          </Text>
          <Text style={[styles.categoryCount, { color: colors.text.secondary }]}>
            {earnedInCategory}/{categoryBadges.length}
          </Text>
        </View>
        {categoryBadges.map(renderBadgeCard)}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>My Badges</Text>
        <TouchableOpacity onPress={handleTestNotification} style={styles.testButton}>
          <Text style={styles.testButtonText}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#9EB567" />
        }
      >
        {/* Stats Card */}
        <View style={[styles.statsCard, { backgroundColor: '#9EB567' }]}>
          <View style={styles.statsMain}>
            <Text style={styles.statsNumber}>{earnedCount}</Text>
            <Text style={styles.statsLabel}>Badges Earned</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsSecondary}>
            <Text style={styles.statsTotal}>{ALL_BADGES.length}</Text>
            <Text style={styles.statsTotalLabel}>Total</Text>
          </View>
        </View>

        {/* Progress Summary */}
        <View style={[styles.progressSummary, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.progressSummaryText, { color: colors.text.primary }]}>
            {Math.round((earnedCount / ALL_BADGES.length) * 100)}% Complete
          </Text>
          <View style={[styles.overallProgressBar, { backgroundColor: colors.background.secondary }]}>
            <View
              style={[
                styles.overallProgressFill,
                { width: `${(earnedCount / ALL_BADGES.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Filters */}
        {renderFilterPills()}

        {/* Badge List */}
        {filter === 'all' ? (
          // Show grouped by category
          Object.entries(groupedBadges).map(([category, categoryBadges]) =>
            renderCategorySection(category as BadgeCategory, categoryBadges)
          )
        ) : (
          // Show flat list for filtered view
          <View style={styles.flatList}>
            {filteredBadges.length > 0 ? (
              filteredBadges.map(renderBadgeCard)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🏆</Text>
                <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                  {filter === 'earned'
                    ? 'No badges earned yet. Keep going!'
                    : 'No badges in progress. Start exploring the app!'}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Spacer for bottom */}
        <View style={{ height: 100 }} />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  testButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  testButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Stats Card
  statsCard: {
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#9EB567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  statsMain: {
    flex: 1,
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 56,
    fontWeight: '700',
    color: '#fff',
  },
  statsLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  statsDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 20,
  },
  statsSecondary: {
    alignItems: 'center',
  },
  statsTotal: {
    fontSize: 32,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  statsTotalLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },

  // Progress Summary
  progressSummary: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  progressSummaryText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  overallProgressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: '#9EB567',
    borderRadius: 4,
  },

  // Filters
  filterContainer: {
    paddingVertical: 8,
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Category Section
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  categoryCount: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Badge Card
  badgeCard: {
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
  badgeEmojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(158,181,103,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    position: 'relative',
  },
  badgeEmoji: {
    fontSize: 28,
  },
  badgeEmojiLocked: {
    opacity: 0.4,
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 10,
  },
  badgeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  badgeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  badgeDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    minWidth: 40,
    textAlign: 'right',
  },
  earnedDate: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },

  // Flat List
  flatList: {
    marginTop: 8,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default MyBadgesScreen;
