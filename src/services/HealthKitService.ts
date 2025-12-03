/**
 * HealthKit Service - Apple Health Integration
 *
 * Provides interface for syncing wellness data with Apple Health.
 * Currently uses mock data in Expo managed workflow.
 *
 * To enable native HealthKit:
 * 1. npx expo prebuild
 * 2. npm install react-native-health
 * 3. Add HealthKit capability in Xcode
 * 4. Add NSHealthShareUsageDescription to Info.plist
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Types
export interface HealthKitDataType {
  id: string;
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
  lastSynced: string | null;
}

export interface HealthKitStats {
  steps: number;
  sleepHours: number;
  mindfulMinutes: number;
  heartRateAvg: number;
  activeCalories: number;
}

export interface HealthKitPermissions {
  read: string[];
  write: string[];
}

// Available data types for sync
export const HEALTH_DATA_TYPES: HealthKitDataType[] = [
  {
    id: 'mindfulness',
    name: 'Mindfulness Minutes',
    icon: '🧘',
    description: 'Sync meditation sessions with Apple Health',
    enabled: false,
    lastSynced: null,
  },
  {
    id: 'sleep',
    name: 'Sleep Analysis',
    icon: '😴',
    description: 'Share sleep data for better insights',
    enabled: false,
    lastSynced: null,
  },
  {
    id: 'steps',
    name: 'Step Count',
    icon: '👟',
    description: 'Track daily activity levels',
    enabled: false,
    lastSynced: null,
  },
  {
    id: 'heartRate',
    name: 'Heart Rate',
    icon: '❤️',
    description: 'Monitor heart health during activities',
    enabled: false,
    lastSynced: null,
  },
  {
    id: 'activeEnergy',
    name: 'Active Calories',
    icon: '🔥',
    description: 'Track calories burned during exercise',
    enabled: false,
    lastSynced: null,
  },
];

const STORAGE_KEY = '@healthkit_settings';

class HealthKitService {
  private isAvailable: boolean = false;
  private isAuthorized: boolean = false;
  private dataTypes: HealthKitDataType[] = [];

  constructor() {
    this.isAvailable = Platform.OS === 'ios';
  }

  /**
   * Initialize the HealthKit service
   */
  async initialize(): Promise<boolean> {
    if (!this.isAvailable) {
      console.log('[HealthKit] Not available on this platform');
      return false;
    }

    try {
      // Load saved settings
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.dataTypes = JSON.parse(saved);
      } else {
        this.dataTypes = [...HEALTH_DATA_TYPES];
      }

      console.log('[HealthKit] Service initialized');
      return true;
    } catch (error) {
      console.error('[HealthKit] Initialization failed:', error);
      return false;
    }
  }

  /**
   * Check if HealthKit is available on this device
   */
  checkAvailability(): boolean {
    return this.isAvailable;
  }

  /**
   * Request HealthKit permissions
   * In production, this would use react-native-health to request actual permissions
   */
  async requestAuthorization(): Promise<boolean> {
    if (!this.isAvailable) {
      return false;
    }

    try {
      // Mock permission request - in production use react-native-health
      console.log('[HealthKit] Requesting authorization...');

      // Simulate permission dialog delay
      await new Promise(resolve => setTimeout(resolve, 500));

      this.isAuthorized = true;
      console.log('[HealthKit] Authorization granted');
      return true;
    } catch (error) {
      console.error('[HealthKit] Authorization failed:', error);
      return false;
    }
  }

  /**
   * Check if we have authorization
   */
  isAuthorizedForAccess(): boolean {
    return this.isAuthorized;
  }

  /**
   * Get all data types with their current settings
   */
  getDataTypes(): HealthKitDataType[] {
    return this.dataTypes;
  }

  /**
   * Toggle a specific data type on/off
   */
  async toggleDataType(dataTypeId: string): Promise<boolean> {
    try {
      this.dataTypes = this.dataTypes.map(dt => {
        if (dt.id === dataTypeId) {
          return {
            ...dt,
            enabled: !dt.enabled,
            lastSynced: !dt.enabled ? new Date().toISOString() : dt.lastSynced,
          };
        }
        return dt;
      });

      await this.saveSettings();
      return true;
    } catch (error) {
      console.error('[HealthKit] Toggle failed:', error);
      return false;
    }
  }

  /**
   * Enable a specific data type
   */
  async enableDataType(dataTypeId: string): Promise<boolean> {
    const dataType = this.dataTypes.find(dt => dt.id === dataTypeId);
    if (dataType && !dataType.enabled) {
      return this.toggleDataType(dataTypeId);
    }
    return true;
  }

  /**
   * Disable a specific data type
   */
  async disableDataType(dataTypeId: string): Promise<boolean> {
    const dataType = this.dataTypes.find(dt => dt.id === dataTypeId);
    if (dataType && dataType.enabled) {
      return this.toggleDataType(dataTypeId);
    }
    return true;
  }

  /**
   * Get mock health stats (for development)
   * In production, this would query actual HealthKit data
   */
  async getHealthStats(): Promise<HealthKitStats> {
    // Mock data - in production, query HealthKit
    return {
      steps: Math.floor(Math.random() * 5000) + 3000,
      sleepHours: Math.round((Math.random() * 3 + 5) * 10) / 10,
      mindfulMinutes: Math.floor(Math.random() * 30) + 10,
      heartRateAvg: Math.floor(Math.random() * 20) + 60,
      activeCalories: Math.floor(Math.random() * 300) + 200,
    };
  }

  /**
   * Write mindfulness session to HealthKit
   */
  async writeMindfulnessSession(
    startDate: Date,
    endDate: Date,
    metadata?: Record<string, string>
  ): Promise<boolean> {
    if (!this.isAvailable || !this.isAuthorized) {
      console.log('[HealthKit] Cannot write - not available or authorized');
      return false;
    }

    const mindfulnessEnabled = this.dataTypes.find(dt => dt.id === 'mindfulness')?.enabled;
    if (!mindfulnessEnabled) {
      console.log('[HealthKit] Mindfulness sync not enabled');
      return false;
    }

    try {
      // Mock write - in production use react-native-health
      const duration = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
      console.log(`[HealthKit] Writing ${duration.toFixed(1)} minutes mindfulness session`);

      // Update last synced time
      this.dataTypes = this.dataTypes.map(dt => {
        if (dt.id === 'mindfulness') {
          return { ...dt, lastSynced: new Date().toISOString() };
        }
        return dt;
      });
      await this.saveSettings();

      return true;
    } catch (error) {
      console.error('[HealthKit] Write failed:', error);
      return false;
    }
  }

  /**
   * Write sleep data to HealthKit
   */
  async writeSleepAnalysis(
    startDate: Date,
    endDate: Date,
    sleepValue: 'inBed' | 'asleep' | 'awake'
  ): Promise<boolean> {
    if (!this.isAvailable || !this.isAuthorized) {
      return false;
    }

    const sleepEnabled = this.dataTypes.find(dt => dt.id === 'sleep')?.enabled;
    if (!sleepEnabled) {
      return false;
    }

    try {
      // Mock write
      console.log(`[HealthKit] Writing sleep data: ${sleepValue}`);

      this.dataTypes = this.dataTypes.map(dt => {
        if (dt.id === 'sleep') {
          return { ...dt, lastSynced: new Date().toISOString() };
        }
        return dt;
      });
      await this.saveSettings();

      return true;
    } catch (error) {
      console.error('[HealthKit] Sleep write failed:', error);
      return false;
    }
  }

  /**
   * Save settings to AsyncStorage
   */
  private async saveSettings(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.dataTypes));
    } catch (error) {
      console.error('[HealthKit] Failed to save settings:', error);
    }
  }

  /**
   * Disconnect from HealthKit and clear settings
   */
  async disconnect(): Promise<void> {
    this.isAuthorized = false;
    this.dataTypes = HEALTH_DATA_TYPES.map(dt => ({
      ...dt,
      enabled: false,
      lastSynced: null,
    }));
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('[HealthKit] Disconnected');
  }
}

// Export singleton instance
export const healthKitService = new HealthKitService();
export default healthKitService;
