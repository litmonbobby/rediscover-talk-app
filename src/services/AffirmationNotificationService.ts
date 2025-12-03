/**
 * Affirmation Notification Service
 * Handles scheduling and managing daily affirmation push notifications
 */

import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getDailyAffirmation, getRandomAffirmation } from '../data/affirmations';

// Storage keys
const STORAGE_KEYS = {
  AFFIRMATION_NOTIFICATIONS_ENABLED: '@affirmation_notifications_enabled',
  NOTIFICATION_TIME_HOUR: '@notification_time_hour',
  NOTIFICATION_TIME_MINUTE: '@notification_time_minute',
  LAST_SCHEDULED_DATE: '@last_scheduled_date',
};

// Default notification time (9:00 AM)
const DEFAULT_NOTIFICATION_HOUR = 9;
const DEFAULT_NOTIFICATION_MINUTE = 0;

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

class AffirmationNotificationService {
  private static instance: AffirmationNotificationService;

  private constructor() {}

  static getInstance(): AffirmationNotificationService {
    if (!AffirmationNotificationService.instance) {
      AffirmationNotificationService.instance = new AffirmationNotificationService();
    }
    return AffirmationNotificationService.instance;
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
      console.log('Notification permissions not granted');
      return false;
    }

    // Configure notification channel for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('affirmations', {
        name: 'Daily Affirmations',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#9EB567',
        description: 'Receive daily affirmations for your mental wellness journey',
      });
    }

    return true;
  }

  /**
   * Check if affirmation notifications are enabled
   */
  async isEnabled(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.AFFIRMATION_NOTIFICATIONS_ENABLED);
      return value === 'true';
    } catch (error) {
      console.error('Error reading notification preference:', error);
      return false;
    }
  }

  /**
   * Enable or disable affirmation notifications
   */
  async setEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.AFFIRMATION_NOTIFICATIONS_ENABLED,
        enabled ? 'true' : 'false'
      );

      if (enabled) {
        const hasPermission = await this.requestPermissions();
        if (hasPermission) {
          await this.scheduleDailyNotification();
        }
      } else {
        await this.cancelAllScheduledNotifications();
      }
    } catch (error) {
      console.error('Error setting notification preference:', error);
      throw error;
    }
  }

  /**
   * Get the scheduled notification time
   */
  async getNotificationTime(): Promise<{ hour: number; minute: number }> {
    try {
      const hourStr = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_TIME_HOUR);
      const minuteStr = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_TIME_MINUTE);

      return {
        hour: hourStr ? parseInt(hourStr, 10) : DEFAULT_NOTIFICATION_HOUR,
        minute: minuteStr ? parseInt(minuteStr, 10) : DEFAULT_NOTIFICATION_MINUTE,
      };
    } catch (error) {
      console.error('Error reading notification time:', error);
      return { hour: DEFAULT_NOTIFICATION_HOUR, minute: DEFAULT_NOTIFICATION_MINUTE };
    }
  }

  /**
   * Set the notification time
   */
  async setNotificationTime(hour: number, minute: number): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_TIME_HOUR, hour.toString());
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_TIME_MINUTE, minute.toString());

      // Reschedule if notifications are enabled
      const isEnabled = await this.isEnabled();
      if (isEnabled) {
        await this.scheduleDailyNotification();
      }
    } catch (error) {
      console.error('Error setting notification time:', error);
      throw error;
    }
  }

  /**
   * Schedule the daily affirmation notification
   */
  async scheduleDailyNotification(): Promise<string | null> {
    try {
      // Cancel existing scheduled notifications first
      await this.cancelAllScheduledNotifications();

      const { hour, minute } = await this.getNotificationTime();
      const affirmation = getDailyAffirmation();

      // Schedule a repeating daily notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `✨ ${affirmation.title}`,
          body: affirmation.message,
          data: {
            type: 'affirmation',
            affirmationId: affirmation.id,
            category: affirmation.category,
          },
          sound: true,
          badge: 0,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour,
          minute,
        },
      });

      // Store the date we scheduled
      await AsyncStorage.setItem(
        STORAGE_KEYS.LAST_SCHEDULED_DATE,
        new Date().toISOString()
      );

      console.log(`Scheduled daily affirmation at ${hour}:${minute}, ID: ${notificationId}`);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  }

  /**
   * Send an immediate test notification
   */
  async sendTestNotification(): Promise<string | null> {
    try {
      const affirmation = getRandomAffirmation();

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `✨ ${affirmation.title}`,
          body: affirmation.message,
          data: {
            type: 'affirmation',
            affirmationId: affirmation.id,
            category: affirmation.category,
          },
          sound: true,
        },
        trigger: null, // Send immediately
      });

      console.log(`Sent test notification, ID: ${notificationId}`);
      return notificationId;
    } catch (error) {
      console.error('Error sending test notification:', error);
      return null;
    }
  }

  /**
   * Cancel all scheduled affirmation notifications
   */
  async cancelAllScheduledNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('Cancelled all scheduled notifications');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
      throw error;
    }
  }

  /**
   * Get all currently scheduled notifications
   */
  async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  /**
   * Set up notification listeners for handling interactions
   */
  setupNotificationListeners(
    onReceived?: (notification: Notifications.Notification) => void,
    onResponse?: (response: Notifications.NotificationResponse) => void
  ): () => void {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received:', notification);
        onReceived?.(notification);
      }
    );

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notification response:', response);
        onResponse?.(response);
      }
    );

    // Return cleanup function
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }

  /**
   * Initialize the service - call this when app starts
   */
  async initialize(): Promise<void> {
    try {
      const isEnabled = await this.isEnabled();

      if (isEnabled) {
        const hasPermission = await this.requestPermissions();
        if (hasPermission) {
          // Reschedule to ensure notification is set up
          await this.scheduleDailyNotification();
        }
      }

      console.log('Affirmation notification service initialized');
    } catch (error) {
      console.error('Error initializing notification service:', error);
    }
  }
}

// Export singleton instance
export const affirmationNotificationService = AffirmationNotificationService.getInstance();

// Export type for notification data
export interface AffirmationNotificationData {
  type: 'affirmation';
  affirmationId: string;
  category: string;
}
