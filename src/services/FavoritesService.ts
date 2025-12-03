/**
 * Favorites Service
 *
 * Manages persistent storage and retrieval of user's favorite content
 * including meditations, quotes, affirmations, and articles.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key
const FAVORITES_KEY = '@rediscover_talk:favorites';

// Favorite item types
export type FavoriteType = 'meditation' | 'quote' | 'affirmation' | 'article' | 'sound';

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  title: string;
  subtitle: string;
  savedDate: string;
  metadata?: {
    duration?: string;
    author?: string;
    category?: string;
    message?: string;
  };
}

class FavoritesService {
  private favorites: Map<string, FavoriteItem> = new Map();
  private isLoaded = false;
  private listeners: Set<() => void> = new Set();

  /**
   * Load favorites from storage
   */
  async load(): Promise<void> {
    if (this.isLoaded) return;

    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const items: FavoriteItem[] = JSON.parse(stored);
        this.favorites.clear();
        items.forEach(item => {
          this.favorites.set(this.getKey(item.type, item.id), item);
        });
      }
      this.isLoaded = true;
      console.log(`[FavoritesService] Loaded ${this.favorites.size} favorites`);
    } catch (error) {
      console.error('[FavoritesService] Failed to load favorites:', error);
      this.isLoaded = true;
    }
  }

  /**
   * Save favorites to storage
   */
  private async save(): Promise<void> {
    try {
      const items = Array.from(this.favorites.values());
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
      this.notifyListeners();
    } catch (error) {
      console.error('[FavoritesService] Failed to save favorites:', error);
    }
  }

  /**
   * Generate unique key for a favorite item
   */
  private getKey(type: FavoriteType, id: string): string {
    return `${type}:${id}`;
  }

  /**
   * Add item to favorites
   */
  async addFavorite(item: Omit<FavoriteItem, 'savedDate'>): Promise<void> {
    await this.load();

    const favorite: FavoriteItem = {
      ...item,
      savedDate: new Date().toISOString(),
    };

    const key = this.getKey(item.type, item.id);
    this.favorites.set(key, favorite);
    await this.save();
    console.log(`[FavoritesService] Added favorite: ${item.title}`);
  }

  /**
   * Remove item from favorites
   */
  async removeFavorite(type: FavoriteType, id: string): Promise<void> {
    await this.load();

    const key = this.getKey(type, id);
    if (this.favorites.has(key)) {
      this.favorites.delete(key);
      await this.save();
      console.log(`[FavoritesService] Removed favorite: ${key}`);
    }
  }

  /**
   * Toggle favorite status
   */
  async toggleFavorite(item: Omit<FavoriteItem, 'savedDate'>): Promise<boolean> {
    await this.load();

    const key = this.getKey(item.type, item.id);
    if (this.favorites.has(key)) {
      await this.removeFavorite(item.type, item.id);
      return false;
    } else {
      await this.addFavorite(item);
      return true;
    }
  }

  /**
   * Check if item is favorited
   */
  async isFavorite(type: FavoriteType, id: string): Promise<boolean> {
    await this.load();
    return this.favorites.has(this.getKey(type, id));
  }

  /**
   * Get all favorites
   */
  async getAllFavorites(): Promise<FavoriteItem[]> {
    await this.load();
    return Array.from(this.favorites.values())
      .sort((a, b) => new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime());
  }

  /**
   * Get favorites by type
   */
  async getFavoritesByType(type: FavoriteType): Promise<FavoriteItem[]> {
    await this.load();
    return Array.from(this.favorites.values())
      .filter(item => item.type === type)
      .sort((a, b) => new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime());
  }

  /**
   * Get favorite count by type
   */
  async getCountByType(type: FavoriteType): Promise<number> {
    await this.load();
    return Array.from(this.favorites.values())
      .filter(item => item.type === type).length;
  }

  /**
   * Get total favorites count
   */
  async getTotalCount(): Promise<number> {
    await this.load();
    return this.favorites.size;
  }

  /**
   * Clear all favorites
   */
  async clearAll(): Promise<void> {
    this.favorites.clear();
    await AsyncStorage.removeItem(FAVORITES_KEY);
    this.notifyListeners();
    console.log('[FavoritesService] Cleared all favorites');
  }

  /**
   * Format saved date for display
   */
  formatSavedDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  /**
   * Subscribe to changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

// Export singleton instance
export const favoritesService = new FavoritesService();
