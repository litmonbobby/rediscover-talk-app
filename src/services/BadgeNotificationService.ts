/**
 * Badge Notification Service
 * Handles push notifications for achievement badges
 */

import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Badge interface (minimal for notification purposes)
interface BadgeInfo {
  id: string;
  title: string;
  description: string;
  emoji: string;
  rarity?: string;
}

// Storage keys
const STORAGE_KEYS = {
  BADGE_NOTIFICATIONS_ENABLED: '@badge_notifications_enabled',
};

// Rarity celebration messages
const RARITY_MESSAGES: Record<string, string> = {
  common: 'Nice work!',
  uncommon: 'Great achievement!',
  rare: 'Amazing accomplishment!',
  epic: 'Incredible achievement!',
  legendary: 'LEGENDARY! You are extraordinary!',
};

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

class BadgeNotificationService {
  private static instance: BadgeNotificationService;

  private constructor() {}

  static getInstance(): BadgeNotificationService {
    if (!BadgeNotificationService.instance) {
      BadgeNotificationService.instance = new BadgeNotificationService();
    }
    return BadgeNotificationService.instance;
  }

  /**
   * Request notification permissions from the user
   */
  async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Badge notification permissions not granted');
      return false;
    }

    // Configure notification channel for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('badges', {
        name: 'Achievement Badges',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 500, 200, 500],
        lightColor: '#9EB567',
        description: 'Notifications for earning new achievement badges',
        sound: 'default',
      });
    }

    return true;
  }

  /**
   * Check if badge notifications are enabled
   */
  async isEnabled(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.BADGE_NOTIFICATIONS_ENABLED);
      // Default to enabled if not set
      return value !== 'false';
    } catch (error) {
      console.error('Error reading badge notification preference:', error);
      return true;
    }
  }

  /**
   * Enable or disable badge notifications
   */
  async setEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.BADGE_NOTIFICATIONS_ENABLED,
        enabled ? 'true' : 'false'
      );

      if (enabled) {
        await this.requestPermissions();
      }
    } catch (error) {
      console.error('Error setting badge notification preference:', error);
      throw error;
    }
  }

  /**
   * Send a notification when a badge is earned
   */
  async sendBadgeEarnedNotification(badge: BadgeInfo): Promise<string | null> {
    try {
      // Check if notifications are enabled
      const isEnabled = await this.isEnabled();
      if (!isEnabled) {
        console.log('Badge notifications disabled, skipping notification');
        return null;
      }

      // Request permissions if not already granted
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.log('No permission for badge notifications');
        return null;
      }

      // Get celebration message based on rarity
      const celebrationMessage = badge.rarity
        ? RARITY_MESSAGES[badge.rarity] || 'Congratulations!'
        : 'Congratulations!';

      // Schedule immediate notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `${badge.emoji} New Badge Earned!`,
          body: `${badge.title} - ${badge.description}`,
          subtitle: celebrationMessage,
          data: {
            type: 'badge_earned',
            badgeId: badge.id,
            badgeTitle: badge.title,
            badgeEmoji: badge.emoji,
          },
          sound: true,
          badge: 1,
          ...(Platform.OS === 'android' && {
            channelId: 'badges',
          }),
        },
        trigger: null, // Send immediately
      });

      console.log(`Badge notification sent for ${badge.title}, ID: ${notificationId}`);
      return notificationId;
    } catch (error) {
      console.error('Error sending badge notification:', error);
      return null;
    }
  }

  /**
   * Send a milestone notification (for special achievements)
   */
  async sendMilestoneNotification(
    title: string,
    body: string,
    emoji: string = '🎉'
  ): Promise<string | null> {
    try {
      const isEnabled = await this.isEnabled();
      if (!isEnabled) return null;

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `${emoji} ${title}`,
          body,
          data: {
            type: 'milestone',
          },
          sound: true,
          badge: 1,
          ...(Platform.OS === 'android' && {
            channelId: 'badges',
          }),
        },
        trigger: null,
      });

      console.log(`Milestone notification sent: ${title}, ID: ${notificationId}`);
      return notificationId;
    } catch (error) {
      console.error('Error sending milestone notification:', error);
      return null;
    }
  }

  /**
   * Send a test badge notification
   */
  async sendTestNotification(): Promise<string | null> {
    const testBadge: BadgeInfo = {
      id: 'test_badge',
      title: 'Test Badge',
      description: 'This is a test notification',
      emoji: '🧪',
      rarity: 'rare',
    };

    return this.sendBadgeEarnedNotification(testBadge);
  }

  /**
   * Set up notification listeners for handling badge notification interactions
   */
  setupNotificationListeners(
    onBadgeNotificationReceived?: (badgeId: string) => void,
    onBadgeNotificationTapped?: (badgeId: string) => void
  ): () => void {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const data = notification.request.content.data;
        if (data?.type === 'badge_earned' && data?.badgeId) {
          console.log('Badge notification received:', data.badgeId);
          onBadgeNotificationReceived?.(data.badgeId as string);
        }
      }
    );

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        if (data?.type === 'badge_earned' && data?.badgeId) {
          console.log('Badge notification tapped:', data.badgeId);
          onBadgeNotificationTapped?.(data.badgeId as string);
        }
      }
    );

    // Return cleanup function
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }

  /**
   * Clear badge count on app icon
   */
  async clearBadgeCount(): Promise<void> {
    try {
      await Notifications.setBadgeCountAsync(0);
    } catch (error) {
      console.error('Error clearing badge count:', error);
    }
  }

  /**
   * Initialize the service - call this when app starts
   */
  async initialize(): Promise<void> {
    try {
      const isEnabled = await this.isEnabled();

      if (isEnabled) {
        await this.requestPermissions();
      }

      // Clear badge count when app opens
      await this.clearBadgeCount();

      console.log('Badge notification service initialized');
    } catch (error) {
      console.error('Error initializing badge notification service:', error);
    }
  }
}

// Export singleton instance
export const badgeNotificationService = BadgeNotificationService.getInstance();

// Export notification data type
export interface BadgeNotificationData {
  type: 'badge_earned' | 'milestone';
  badgeId?: string;
  badgeTitle?: string;
  badgeEmoji?: string;
}
