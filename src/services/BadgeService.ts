/**
 * Badge Service
 * Manages achievement badges, progress tracking, and badge awarding
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { badgeNotificationService } from './BadgeNotificationService';

// Badge categories
export type BadgeCategory =
  | 'mood'
  | 'meditation'
  | 'journal'
  | 'breathing'
  | 'sleep'
  | 'family'
  | 'streak'
  | 'milestone'
  | 'special';

// Badge rarity levels
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// Badge definition interface
export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  requirement: number; // Target value to earn badge
  requirementType: string; // What we're counting
}

// User's badge progress
export interface BadgeProgress {
  badgeId: string;
  currentValue: number;
  earned: boolean;
  earnedAt?: string; // ISO date string
}

// Storage keys
const STORAGE_KEYS = {
  BADGE_PROGRESS: '@badge_progress',
  EARNED_BADGES: '@earned_badges',
};

// All available badges - 25+ badges
export const ALL_BADGES: Badge[] = [
  // Mood Tracking Badges
  {
    id: 'first_mood',
    title: 'First Steps',
    description: 'Complete your first mood check-in',
    emoji: '👣',
    category: 'mood',
    rarity: 'common',
    requirement: 1,
    requirementType: 'mood_checkins',
  },
  {
    id: 'mood_explorer',
    title: 'Mood Explorer',
    description: 'Log 10 mood check-ins',
    emoji: '🎯',
    category: 'mood',
    rarity: 'common',
    requirement: 10,
    requirementType: 'mood_checkins',
  },
  {
    id: 'mood_master',
    title: 'Mood Master',
    description: 'Log 50 mood check-ins',
    emoji: '🏆',
    category: 'mood',
    rarity: 'rare',
    requirement: 50,
    requirementType: 'mood_checkins',
  },
  {
    id: 'mood_sage',
    title: 'Mood Sage',
    description: 'Log 100 mood check-ins',
    emoji: '🔮',
    category: 'mood',
    rarity: 'epic',
    requirement: 100,
    requirementType: 'mood_checkins',
  },

  // Streak Badges
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Log mood for 7 consecutive days',
    emoji: '🔥',
    category: 'streak',
    rarity: 'uncommon',
    requirement: 7,
    requirementType: 'streak_days',
  },
  {
    id: 'two_week_titan',
    title: 'Two Week Titan',
    description: 'Maintain a 14-day streak',
    emoji: '⚡',
    category: 'streak',
    rarity: 'rare',
    requirement: 14,
    requirementType: 'streak_days',
  },
  {
    id: 'month_master',
    title: 'Month Master',
    description: 'Maintain a 30-day streak',
    emoji: '🌟',
    category: 'streak',
    rarity: 'epic',
    requirement: 30,
    requirementType: 'streak_days',
  },
  {
    id: 'streak_legend',
    title: 'Streak Legend',
    description: 'Achieve a 100-day streak',
    emoji: '👑',
    category: 'streak',
    rarity: 'legendary',
    requirement: 100,
    requirementType: 'streak_days',
  },

  // Meditation Badges
  {
    id: 'first_meditation',
    title: 'Inner Peace',
    description: 'Complete your first meditation',
    emoji: '🧘',
    category: 'meditation',
    rarity: 'common',
    requirement: 1,
    requirementType: 'meditations',
  },
  {
    id: 'meditation_explorer',
    title: 'Calm Seeker',
    description: 'Complete 10 meditation sessions',
    emoji: '🕯️',
    category: 'meditation',
    rarity: 'uncommon',
    requirement: 10,
    requirementType: 'meditations',
  },
  {
    id: 'meditation_master',
    title: 'Zen Master',
    description: 'Complete 50 meditation sessions',
    emoji: '☯️',
    category: 'meditation',
    rarity: 'rare',
    requirement: 50,
    requirementType: 'meditations',
  },
  {
    id: 'meditation_guru',
    title: 'Meditation Guru',
    description: 'Complete 100 meditation sessions',
    emoji: '🪷',
    category: 'meditation',
    rarity: 'epic',
    requirement: 100,
    requirementType: 'meditations',
  },

  // Journal Badges
  {
    id: 'first_journal',
    title: 'Pen & Paper',
    description: 'Write your first journal entry',
    emoji: '📝',
    category: 'journal',
    rarity: 'common',
    requirement: 1,
    requirementType: 'journal_entries',
  },
  {
    id: 'journal_keeper',
    title: 'Journal Keeper',
    description: 'Write 5 journal entries',
    emoji: '📔',
    category: 'journal',
    rarity: 'common',
    requirement: 5,
    requirementType: 'journal_entries',
  },
  {
    id: 'storyteller',
    title: 'Storyteller',
    description: 'Write 25 journal entries',
    emoji: '📖',
    category: 'journal',
    rarity: 'uncommon',
    requirement: 25,
    requirementType: 'journal_entries',
  },
  {
    id: 'author',
    title: 'Published Author',
    description: 'Write 100 journal entries',
    emoji: '✍️',
    category: 'journal',
    rarity: 'epic',
    requirement: 100,
    requirementType: 'journal_entries',
  },

  // Breathing Badges
  {
    id: 'first_breath',
    title: 'Deep Breath',
    description: 'Complete your first breathing exercise',
    emoji: '🌬️',
    category: 'breathing',
    rarity: 'common',
    requirement: 1,
    requirementType: 'breathing_exercises',
  },
  {
    id: 'breath_explorer',
    title: 'Breath Explorer',
    description: 'Complete 10 breathing exercises',
    emoji: '💨',
    category: 'breathing',
    rarity: 'uncommon',
    requirement: 10,
    requirementType: 'breathing_exercises',
  },
  {
    id: 'breath_expert',
    title: 'Breath Expert',
    description: 'Complete all breathing techniques',
    emoji: '🌊',
    category: 'breathing',
    rarity: 'rare',
    requirement: 3,
    requirementType: 'breathing_techniques_completed',
  },

  // Sleep Badges
  {
    id: 'first_sleep',
    title: 'Sweet Dreams',
    description: 'Use sleep sounds for the first time',
    emoji: '🌙',
    category: 'sleep',
    rarity: 'common',
    requirement: 1,
    requirementType: 'sleep_sessions',
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Use sleep sounds for 5 nights',
    emoji: '🦉',
    category: 'sleep',
    rarity: 'uncommon',
    requirement: 5,
    requirementType: 'sleep_sessions',
  },
  {
    id: 'dream_weaver',
    title: 'Dream Weaver',
    description: 'Use sleep sounds for 30 nights',
    emoji: '✨',
    category: 'sleep',
    rarity: 'rare',
    requirement: 30,
    requirementType: 'sleep_sessions',
  },
  {
    id: 'sleep_master',
    title: 'Sleep Sanctuary',
    description: 'Use sleep sounds for 100 nights',
    emoji: '🏰',
    category: 'sleep',
    rarity: 'epic',
    requirement: 100,
    requirementType: 'sleep_sessions',
  },

  // Family Badges
  {
    id: 'first_family',
    title: 'Family Time',
    description: 'Complete your first family activity',
    emoji: '👨‍👩‍👧‍👦',
    category: 'family',
    rarity: 'common',
    requirement: 1,
    requirementType: 'family_activities',
  },
  {
    id: 'family_champion',
    title: 'Family Champion',
    description: 'Complete 10 family activities',
    emoji: '🏠',
    category: 'family',
    rarity: 'uncommon',
    requirement: 10,
    requirementType: 'family_activities',
  },
  {
    id: 'bonding_expert',
    title: 'Bonding Expert',
    description: 'Complete 25 family activities',
    emoji: '❤️',
    category: 'family',
    rarity: 'rare',
    requirement: 25,
    requirementType: 'family_activities',
  },

  // Milestone Badges
  {
    id: 'one_week_member',
    title: 'Welcome Home',
    description: 'Be a member for 1 week',
    emoji: '🏡',
    category: 'milestone',
    rarity: 'common',
    requirement: 7,
    requirementType: 'days_as_member',
  },
  {
    id: 'one_month_member',
    title: 'Committed',
    description: 'Be a member for 1 month',
    emoji: '📅',
    category: 'milestone',
    rarity: 'uncommon',
    requirement: 30,
    requirementType: 'days_as_member',
  },
  {
    id: 'three_month_member',
    title: 'Dedicated',
    description: 'Be a member for 3 months',
    emoji: '🎖️',
    category: 'milestone',
    rarity: 'rare',
    requirement: 90,
    requirementType: 'days_as_member',
  },
  {
    id: 'one_year_member',
    title: 'Wellness Veteran',
    description: 'Be a member for 1 year',
    emoji: '🎂',
    category: 'milestone',
    rarity: 'legendary',
    requirement: 365,
    requirementType: 'days_as_member',
  },

  // Special Badges
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Log mood before 7 AM',
    emoji: '🐦',
    category: 'special',
    rarity: 'uncommon',
    requirement: 1,
    requirementType: 'early_checkins',
  },
  {
    id: 'night_thinker',
    title: 'Night Thinker',
    description: 'Journal after 10 PM',
    emoji: '🌃',
    category: 'special',
    rarity: 'uncommon',
    requirement: 1,
    requirementType: 'night_journals',
  },
  {
    id: 'wellness_warrior',
    title: 'Wellness Warrior',
    description: 'Use all app features in one day',
    emoji: '⚔️',
    category: 'special',
    rarity: 'epic',
    requirement: 1,
    requirementType: 'all_features_day',
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Earn 20 badges',
    emoji: '💎',
    category: 'special',
    rarity: 'legendary',
    requirement: 20,
    requirementType: 'total_badges',
  },
];

// Rarity colors
export const RARITY_COLORS: Record<BadgeRarity, string> = {
  common: '#9EB567',      // Green
  uncommon: '#4A90D9',    // Blue
  rare: '#9B59B6',        // Purple
  epic: '#F39C12',        // Orange
  legendary: '#E74C3C',   // Red
};

class BadgeService {
  private static instance: BadgeService;
  private progressCache: Map<string, BadgeProgress> = new Map();

  private constructor() {}

  static getInstance(): BadgeService {
    if (!BadgeService.instance) {
      BadgeService.instance = new BadgeService();
    }
    return BadgeService.instance;
  }

  /**
   * Initialize badge service and load cached progress
   */
  async initialize(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.BADGE_PROGRESS);
      if (stored) {
        const progressArray: BadgeProgress[] = JSON.parse(stored);
        progressArray.forEach(p => this.progressCache.set(p.badgeId, p));
      }
      console.log('Badge service initialized');
    } catch (error) {
      console.error('Error initializing badge service:', error);
    }
  }

  /**
   * Get all badges with their current progress
   */
  async getAllBadgesWithProgress(): Promise<(Badge & { progress: BadgeProgress })[]> {
    await this.initialize();

    return ALL_BADGES.map(badge => {
      const progress = this.progressCache.get(badge.id) || {
        badgeId: badge.id,
        currentValue: 0,
        earned: false,
      };
      return { ...badge, progress };
    });
  }

  /**
   * Get earned badges count
   */
  async getEarnedCount(): Promise<number> {
    await this.initialize();
    return Array.from(this.progressCache.values()).filter(p => p.earned).length;
  }

  /**
   * Get badge progress percentage
   */
  getProgressPercentage(badge: Badge, progress: BadgeProgress): number {
    if (progress.earned) return 100;
    return Math.min(100, Math.round((progress.currentValue / badge.requirement) * 100));
  }

  /**
   * Increment progress for a requirement type and check for new badges
   */
  async incrementProgress(requirementType: string, amount: number = 1): Promise<Badge[]> {
    await this.initialize();
    const newlyEarnedBadges: Badge[] = [];

    // Find all badges that use this requirement type
    const relevantBadges = ALL_BADGES.filter(b => b.requirementType === requirementType);

    for (const badge of relevantBadges) {
      let progress = this.progressCache.get(badge.id);

      if (!progress) {
        progress = {
          badgeId: badge.id,
          currentValue: 0,
          earned: false,
        };
      }

      // Skip if already earned
      if (progress.earned) continue;

      // Increment progress
      progress.currentValue += amount;

      // Check if badge is now earned
      if (progress.currentValue >= badge.requirement) {
        progress.earned = true;
        progress.earnedAt = new Date().toISOString();
        newlyEarnedBadges.push(badge);

        // Send push notification for new badge
        await badgeNotificationService.sendBadgeEarnedNotification(badge);
      }

      this.progressCache.set(badge.id, progress);
    }

    // Save progress to storage
    await this.saveProgress();

    return newlyEarnedBadges;
  }

  /**
   * Set progress for a requirement type (for direct values like streaks)
   */
  async setProgress(requirementType: string, value: number): Promise<Badge[]> {
    await this.initialize();
    const newlyEarnedBadges: Badge[] = [];

    const relevantBadges = ALL_BADGES.filter(b => b.requirementType === requirementType);

    for (const badge of relevantBadges) {
      let progress = this.progressCache.get(badge.id);

      if (!progress) {
        progress = {
          badgeId: badge.id,
          currentValue: 0,
          earned: false,
        };
      }

      if (progress.earned) continue;

      progress.currentValue = value;

      if (progress.currentValue >= badge.requirement) {
        progress.earned = true;
        progress.earnedAt = new Date().toISOString();
        newlyEarnedBadges.push(badge);

        await badgeNotificationService.sendBadgeEarnedNotification(badge);
      }

      this.progressCache.set(badge.id, progress);
    }

    await this.saveProgress();
    return newlyEarnedBadges;
  }

  /**
   * Save progress to AsyncStorage
   */
  private async saveProgress(): Promise<void> {
    try {
      const progressArray = Array.from(this.progressCache.values());
      await AsyncStorage.setItem(STORAGE_KEYS.BADGE_PROGRESS, JSON.stringify(progressArray));
    } catch (error) {
      console.error('Error saving badge progress:', error);
    }
  }

  /**
   * Get badges by category
   */
  getBadgesByCategory(category: BadgeCategory): Badge[] {
    return ALL_BADGES.filter(b => b.category === category);
  }

  /**
   * Get recently earned badges
   */
  async getRecentlyEarnedBadges(limit: number = 5): Promise<(Badge & { earnedAt: string })[]> {
    await this.initialize();

    const earnedProgress = Array.from(this.progressCache.values())
      .filter(p => p.earned && p.earnedAt)
      .sort((a, b) => new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime())
      .slice(0, limit);

    return earnedProgress.map(p => {
      const badge = ALL_BADGES.find(b => b.id === p.badgeId)!;
      return { ...badge, earnedAt: p.earnedAt! };
    });
  }

  /**
   * Check for total badges badge (meta badge)
   */
  async checkTotalBadgesBadge(): Promise<Badge | null> {
    const earnedCount = await this.getEarnedCount();
    const badges = await this.setProgress('total_badges', earnedCount);
    return badges.length > 0 ? badges[0] : null;
  }

  /**
   * Reset all badge progress (for testing)
   */
  async resetAllProgress(): Promise<void> {
    this.progressCache.clear();
    await AsyncStorage.removeItem(STORAGE_KEYS.BADGE_PROGRESS);
    console.log('Badge progress reset');
  }
}

// Export singleton instance
export const badgeService = BadgeService.getInstance();
