/**
 * User Profile Service
 * Manages user profile data including name, email, and profile picture
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// User profile interface
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null; // Base64 encoded image or null
  createdAt: string;
  updatedAt: string;
}

// Storage keys
const STORAGE_KEYS = {
  USER_PROFILE: '@user_profile',
};

// Default profile
const DEFAULT_PROFILE: UserProfile = {
  id: 'user_1',
  firstName: '',
  lastName: '',
  email: '',
  profilePicture: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

class UserProfileService {
  private static instance: UserProfileService;
  private cachedProfile: UserProfile | null = null;

  private constructor() {}

  static getInstance(): UserProfileService {
    if (!UserProfileService.instance) {
      UserProfileService.instance = new UserProfileService();
    }
    return UserProfileService.instance;
  }

  /**
   * Get the current user profile
   */
  async getProfile(): Promise<UserProfile> {
    try {
      if (this.cachedProfile) {
        return this.cachedProfile;
      }

      const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (stored) {
        this.cachedProfile = JSON.parse(stored);
        return this.cachedProfile!;
      }

      // Return default profile if none exists
      return DEFAULT_PROFILE;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return DEFAULT_PROFILE;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const currentProfile = await this.getProfile();
      const updatedProfile: UserProfile = {
        ...currentProfile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_PROFILE,
        JSON.stringify(updatedProfile)
      );
      this.cachedProfile = updatedProfile;

      return updatedProfile;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Update user name
   */
  async updateName(firstName: string, lastName: string): Promise<UserProfile> {
    return this.updateProfile({ firstName, lastName });
  }

  /**
   * Update user email
   */
  async updateEmail(email: string): Promise<UserProfile> {
    return this.updateProfile({ email });
  }

  /**
   * Pick and save profile picture from gallery
   */
  async pickProfilePicture(): Promise<string | null> {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Gallery permission not granted');
        return null;
      }

      // Launch image picker with base64 option
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Lower quality for smaller base64 size
        base64: true,
      });

      if (result.canceled || !result.assets[0]) {
        return null;
      }

      const asset = result.assets[0];
      if (asset.base64) {
        const imageUri = `data:image/jpeg;base64,${asset.base64}`;
        await this.updateProfile({ profilePicture: imageUri });
        return imageUri;
      }

      // Fallback to URI if base64 not available
      await this.updateProfile({ profilePicture: asset.uri });
      return asset.uri;
    } catch (error) {
      console.error('Error picking profile picture:', error);
      return null;
    }
  }

  /**
   * Take profile picture with camera
   */
  async takeProfilePicture(): Promise<string | null> {
    try {
      // Request camera permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('Camera permission not granted');
        return null;
      }

      // Launch camera with base64 option
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Lower quality for smaller base64 size
        base64: true,
      });

      if (result.canceled || !result.assets[0]) {
        return null;
      }

      const asset = result.assets[0];
      if (asset.base64) {
        const imageUri = `data:image/jpeg;base64,${asset.base64}`;
        await this.updateProfile({ profilePicture: imageUri });
        return imageUri;
      }

      // Fallback to URI if base64 not available
      await this.updateProfile({ profilePicture: asset.uri });
      return asset.uri;
    } catch (error) {
      console.error('Error taking profile picture:', error);
      return null;
    }
  }

  /**
   * Remove profile picture
   */
  async removeProfilePicture(): Promise<void> {
    try {
      await this.updateProfile({ profilePicture: null });
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  }

  /**
   * Get display name (first name, or 'Friend' if not set)
   */
  async getDisplayName(): Promise<string> {
    const profile = await this.getProfile();
    if (profile.firstName) {
      return profile.firstName;
    }
    return 'Friend';
  }

  /**
   * Get full name
   */
  async getFullName(): Promise<string> {
    const profile = await this.getProfile();
    const parts = [profile.firstName, profile.lastName].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : 'User';
  }

  /**
   * Check if profile is complete
   */
  async isProfileComplete(): Promise<boolean> {
    const profile = await this.getProfile();
    return !!(profile.firstName && profile.email);
  }

  /**
   * Get greeting based on time of day
   */
  getTimeBasedGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  }

  /**
   * Clear all profile data (for logout)
   */
  async clearProfile(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      this.cachedProfile = null;
    } catch (error) {
      console.error('Error clearing profile:', error);
    }
  }
}

// Export singleton instance
export const userProfileService = UserProfileService.getInstance();

// Export helper functions
export const getTimeBasedGreeting = () => userProfileService.getTimeBasedGreeting();
