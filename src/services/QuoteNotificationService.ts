/**
 * Quote Notification Service
 * Handles scheduling and managing daily quote push notifications
 */

import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getDailyQuote, getRandomQuote, getCategoryLabel } from '../data/quotes';

// Storage keys
const STORAGE_KEYS = {
  QUOTE_NOTIFICATIONS_ENABLED: '@quote_notifications_enabled',
  QUOTE_NOTIFICATION_TIME_HOUR: '@quote_notification_time_hour',
  QUOTE_NOTIFICATION_TIME_MINUTE: '@quote_notification_time_minute',
  QUOTE_LAST_SCHEDULED_DATE: '@quote_last_scheduled_date',
};

// Default notification time (8:00 AM - different from affirmations at 9 AM)
const DEFAULT_NOTIFICATION_HOUR = 8;
const DEFAULT_NOTIFICATION_MINUTE = 0;

class QuoteNotificationService {
  private static instance: QuoteNotificationService;

  private constructor() {}

  static getInstance(): QuoteNotificationService {
    if (!QuoteNotificationService.instance) {
      QuoteNotificationService.instance = new QuoteNotificationService();
    }
    return QuoteNotificationService.instance;
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
      await Notifications.setNotificationChannelAsync('quotes', {
        name: 'Daily Quotes',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#9EB567',
        description: 'Receive daily inspirational quotes for your mental wellness journey',
      });
    }

    return true;
  }

  /**
   * Check if quote notifications are enabled
   */
  async isEnabled(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.QUOTE_NOTIFICATIONS_ENABLED);
      return value === 'true';
    } catch (error) {
      console.error('Error reading quote notification preference:', error);
      return false;
    }
  }

  /**
   * Enable or disable quote notifications
   */
  async setEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.QUOTE_NOTIFICATIONS_ENABLED,
        enabled ? 'true' : 'false'
      );

      if (enabled) {
        const hasPermission = await this.requestPermissions();
        if (hasPermission) {
          await this.scheduleDailyNotification();
        }
      } else {
        await this.cancelQuoteNotifications();
      }
    } catch (error) {
      console.error('Error setting quote notification preference:', error);
      throw error;
    }
  }

  /**
   * Get the scheduled notification time
   */
  async getNotificationTime(): Promise<{ hour: number; minute: number }> {
    try {
      const hourStr = await AsyncStorage.getItem(STORAGE_KEYS.QUOTE_NOTIFICATION_TIME_HOUR);
      const minuteStr = await AsyncStorage.getItem(STORAGE_KEYS.QUOTE_NOTIFICATION_TIME_MINUTE);

      return {
        hour: hourStr ? parseInt(hourStr, 10) : DEFAULT_NOTIFICATION_HOUR,
        minute: minuteStr ? parseInt(minuteStr, 10) : DEFAULT_NOTIFICATION_MINUTE,
      };
    } catch (error) {
      console.error('Error reading quote notification time:', error);
      return { hour: DEFAULT_NOTIFICATION_HOUR, minute: DEFAULT_NOTIFICATION_MINUTE };
    }
  }

  /**
   * Set the notification time
   */
  async setNotificationTime(hour: number, minute: number): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.QUOTE_NOTIFICATION_TIME_HOUR, hour.toString());
      await AsyncStorage.setItem(STORAGE_KEYS.QUOTE_NOTIFICATION_TIME_MINUTE, minute.toString());

      // Reschedule if notifications are enabled
      const isEnabled = await this.isEnabled();
      if (isEnabled) {
        await this.scheduleDailyNotification();
      }
    } catch (error) {
      console.error('Error setting quote notification time:', error);
      throw error;
    }
  }

  /**
   * Schedule the daily quote notification
   */
  async scheduleDailyNotification(): Promise<string | null> {
    try {
      // Cancel existing quote notifications first
      await this.cancelQuoteNotifications();

      const { hour, minute } = await this.getNotificationTime();
      const quote = getDailyQuote();

      // Schedule a repeating daily notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `💭 ${getCategoryLabel(quote.category)} Quote`,
          body: `"${quote.text}" — ${quote.author}`,
          data: {
            type: 'quote',
            quoteId: quote.id,
            category: quote.category,
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
        STORAGE_KEYS.QUOTE_LAST_SCHEDULED_DATE,
        new Date().toISOString()
      );

      console.log(`Scheduled daily quote at ${hour}:${minute}, ID: ${notificationId}`);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling quote notification:', error);
      return null;
    }
  }

  /**
   * Send an immediate test notification
   */
  async sendTestNotification(): Promise<string | null> {
    try {
      const quote = getRandomQuote();

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `💭 ${getCategoryLabel(quote.category)} Quote`,
          body: `"${quote.text}" — ${quote.author}`,
          data: {
            type: 'quote',
            quoteId: quote.id,
            category: quote.category,
          },
          sound: true,
        },
        trigger: null, // Send immediately
      });

      console.log(`Sent test quote notification, ID: ${notificationId}`);
      return notificationId;
    } catch (error) {
      console.error('Error sending test quote notification:', error);
      return null;
    }
  }

  /**
   * Cancel all scheduled quote notifications
   */
  async cancelQuoteNotifications(): Promise<void> {
    try {
      // Get all scheduled notifications and cancel only quote-related ones
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();

      for (const notification of scheduledNotifications) {
        if (notification.content.data?.type === 'quote') {
          await Notifications.cancelScheduledNotificationAsync(notification.identifier);
        }
      }

      console.log('Cancelled all scheduled quote notifications');
    } catch (error) {
      console.error('Error cancelling quote notifications:', error);
      throw error;
    }
  }

  /**
   * Get all currently scheduled quote notifications
   */
  async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      const allNotifications = await Notifications.getAllScheduledNotificationsAsync();
      return allNotifications.filter(n => n.content.data?.type === 'quote');
    } catch (error) {
      console.error('Error getting scheduled quote notifications:', error);
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
        if (notification.request.content.data?.type === 'quote') {
          console.log('Quote notification received:', notification);
          onReceived?.(notification);
        }
      }
    );

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (response.notification.request.content.data?.type === 'quote') {
          console.log('Quote notification response:', response);
          onResponse?.(response);
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

      console.log('Quote notification service initialized');
    } catch (error) {
      console.error('Error initializing quote notification service:', error);
    }
  }
}

// Export singleton instance
export const quoteNotificationService = QuoteNotificationService.getInstance();

// Export type for notification data
export interface QuoteNotificationData {
  type: 'quote';
  quoteId: string;
  category: string;
}
