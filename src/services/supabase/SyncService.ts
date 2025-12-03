/**
 * Supabase Sync Service
 *
 * Handles data synchronization between local storage and Supabase.
 * Implements local-first architecture with background sync.
 */

import { supabase, isSupabaseConfigured } from './client';
import { authService } from './AuthService';
import {
  Mood, MoodInsert,
  Journal, JournalInsert,
  MeditationSession, MeditationSessionInsert,
  Habit, HabitInsert, HabitUpdate,
  Reminder, ReminderInsert, ReminderUpdate,
} from './types';
import { secureStorage } from '../SecureStorageService';

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error' | 'offline';

export interface SyncState {
  status: SyncStatus;
  lastSyncAt: string | null;
  pendingChanges: number;
  error: string | null;
}

interface PendingChange {
  id: string;
  table: string;
  operation: 'insert' | 'update' | 'delete';
  data: any;
  timestamp: number;
}

class SyncService {
  private syncState: SyncState = {
    status: 'idle',
    lastSyncAt: null,
    pendingChanges: 0,
    error: null,
  };
  private pendingChanges: PendingChange[] = [];
  private syncListeners: Set<(state: SyncState) => void> = new Set();
  private isSyncing = false;

  constructor() {
    this.loadPendingChanges();
  }

  /**
   * Get current sync state
   */
  getSyncState(): SyncState {
    return { ...this.syncState };
  }

  /**
   * Subscribe to sync state changes
   */
  onSyncStateChange(callback: (state: SyncState) => void): () => void {
    this.syncListeners.add(callback);
    return () => this.syncListeners.delete(callback);
  }

  /**
   * Notify listeners of state change
   */
  private notifyListeners(): void {
    this.syncListeners.forEach(callback => callback(this.syncState));
  }

  /**
   * Update sync state
   */
  private updateState(updates: Partial<SyncState>): void {
    this.syncState = { ...this.syncState, ...updates };
    this.notifyListeners();
  }

  /**
   * Load pending changes from storage
   */
  private async loadPendingChanges(): Promise<void> {
    try {
      const changes = await secureStorage.getItem<PendingChange[]>('settings', 'pending_sync');
      this.pendingChanges = changes || [];
      this.updateState({ pendingChanges: this.pendingChanges.length });
    } catch (error) {
      console.error('[SyncService] Failed to load pending changes:', error);
    }
  }

  /**
   * Save pending changes to storage
   */
  private async savePendingChanges(): Promise<void> {
    try {
      await secureStorage.setItem('settings', 'pending_sync', this.pendingChanges);
      this.updateState({ pendingChanges: this.pendingChanges.length });
    } catch (error) {
      console.error('[SyncService] Failed to save pending changes:', error);
    }
  }

  /**
   * Add a pending change
   */
  private async addPendingChange(change: Omit<PendingChange, 'timestamp'>): Promise<void> {
    this.pendingChanges.push({
      ...change,
      timestamp: Date.now(),
    });
    await this.savePendingChanges();
  }

  /**
   * Check if sync is available
   */
  canSync(): boolean {
    return isSupabaseConfigured() && !!authService.getCurrentUserId();
  }

  // ==================== MOOD OPERATIONS ====================

  /**
   * Save mood entry (local + remote)
   */
  async saveMood(mood: Omit<MoodInsert, 'user_id'>): Promise<{ success: boolean; id: string }> {
    const id = mood.id || `mood_${Date.now()}`;
    const userId = authService.getCurrentUserId();

    // Always save locally first
    const localMood = {
      ...mood,
      id,
      timestamp: mood.timestamp || new Date().toISOString(),
    };

    try {
      const existingMoods = await secureStorage.getItem<any[]>('mood', 'entries') || [];
      existingMoods.push(localMood);
      await secureStorage.setItem('mood', 'entries', existingMoods);
    } catch (error) {
      console.error('[SyncService] Failed to save mood locally:', error);
      return { success: false, id };
    }

    // Sync to Supabase if available
    if (this.canSync() && userId) {
      try {
        const { error } = await supabase.from('moods').insert({
          ...mood,
          id,
          user_id: userId,
        });

        if (error) {
          // Queue for later sync
          await this.addPendingChange({
            id,
            table: 'moods',
            operation: 'insert',
            data: { ...mood, user_id: userId },
          });
        }
      } catch (error) {
        await this.addPendingChange({
          id,
          table: 'moods',
          operation: 'insert',
          data: { ...mood, user_id: userId },
        });
      }
    }

    return { success: true, id };
  }

  /**
   * Get all moods
   */
  async getMoods(): Promise<Mood[]> {
    // Get local moods first
    const localMoods = await secureStorage.getItem<any[]>('mood', 'entries') || [];

    // If syncing is available, try to fetch remote moods
    if (this.canSync()) {
      try {
        const userId = authService.getCurrentUserId();
        const { data, error } = await supabase
          .from('moods')
          .select('*')
          .eq('user_id', userId)
          .order('timestamp', { ascending: false });

        if (!error && data) {
          // Merge local and remote (remote takes precedence for conflicts)
          return this.mergeMoodData(localMoods, data);
        }
      } catch (error) {
        console.error('[SyncService] Failed to fetch remote moods:', error);
      }
    }

    return localMoods;
  }

  /**
   * Merge local and remote mood data
   */
  private mergeMoodData(local: any[], remote: Mood[]): Mood[] {
    const merged = new Map<string, Mood>();

    // Add all remote moods
    remote.forEach(mood => merged.set(mood.id, mood));

    // Add local moods that don't exist remotely
    local.forEach(mood => {
      if (!merged.has(mood.id)) {
        merged.set(mood.id, mood as Mood);
      }
    });

    return Array.from(merged.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // ==================== JOURNAL OPERATIONS ====================

  /**
   * Save journal entry
   */
  async saveJournal(journal: Omit<JournalInsert, 'user_id'>): Promise<{ success: boolean; id: string }> {
    const id = journal.id || `journal_${Date.now()}`;
    const userId = authService.getCurrentUserId();

    // Save locally first
    const localJournal = {
      ...journal,
      id,
      timestamp: journal.timestamp || new Date().toISOString(),
    };

    try {
      const existingJournals = await secureStorage.getItem<any[]>('journal', 'entries') || [];
      existingJournals.push(localJournal);
      await secureStorage.setItem('journal', 'entries', existingJournals);
    } catch (error) {
      console.error('[SyncService] Failed to save journal locally:', error);
      return { success: false, id };
    }

    // Sync to Supabase if available
    if (this.canSync() && userId) {
      try {
        const { error } = await supabase.from('journals').insert({
          ...journal,
          id,
          user_id: userId,
        });

        if (error) {
          await this.addPendingChange({
            id,
            table: 'journals',
            operation: 'insert',
            data: { ...journal, user_id: userId },
          });
        }
      } catch (error) {
        await this.addPendingChange({
          id,
          table: 'journals',
          operation: 'insert',
          data: { ...journal, user_id: userId },
        });
      }
    }

    return { success: true, id };
  }

  /**
   * Get all journals
   */
  async getJournals(): Promise<Journal[]> {
    const localJournals = await secureStorage.getItem<any[]>('journal', 'entries') || [];

    if (this.canSync()) {
      try {
        const userId = authService.getCurrentUserId();
        const { data, error } = await supabase
          .from('journals')
          .select('*')
          .eq('user_id', userId)
          .order('timestamp', { ascending: false });

        if (!error && data) {
          return this.mergeJournalData(localJournals, data);
        }
      } catch (error) {
        console.error('[SyncService] Failed to fetch remote journals:', error);
      }
    }

    return localJournals;
  }

  private mergeJournalData(local: any[], remote: Journal[]): Journal[] {
    const merged = new Map<string, Journal>();
    remote.forEach(j => merged.set(j.id, j));
    local.forEach(j => { if (!merged.has(j.id)) merged.set(j.id, j as Journal); });
    return Array.from(merged.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // ==================== MEDITATION OPERATIONS ====================

  /**
   * Save meditation session
   */
  async saveMeditationSession(
    session: Omit<MeditationSessionInsert, 'user_id'>
  ): Promise<{ success: boolean; id: string }> {
    const id = session.id || `session_${Date.now()}`;
    const userId = authService.getCurrentUserId();

    // Save locally
    const localSession = {
      ...session,
      id,
      timestamp: session.timestamp || new Date().toISOString(),
    };

    try {
      const existing = await secureStorage.getItem<any[]>('meditation', 'sessions') || [];
      existing.push(localSession);
      await secureStorage.setItem('meditation', 'sessions', existing);
    } catch (error) {
      console.error('[SyncService] Failed to save meditation locally:', error);
      return { success: false, id };
    }

    // Sync to Supabase
    if (this.canSync() && userId) {
      try {
        const { error } = await supabase.from('meditation_sessions').insert({
          ...session,
          id,
          user_id: userId,
        });

        if (error) {
          await this.addPendingChange({
            id,
            table: 'meditation_sessions',
            operation: 'insert',
            data: { ...session, user_id: userId },
          });
        }
      } catch (error) {
        await this.addPendingChange({
          id,
          table: 'meditation_sessions',
          operation: 'insert',
          data: { ...session, user_id: userId },
        });
      }
    }

    return { success: true, id };
  }

  // ==================== HABIT OPERATIONS ====================

  /**
   * Save habit
   */
  async saveHabit(habit: Omit<HabitInsert, 'user_id'>): Promise<{ success: boolean; id: string }> {
    const id = habit.id || `habit_${Date.now()}`;
    const userId = authService.getCurrentUserId();

    // Save locally
    try {
      const existing = await secureStorage.getItem<any[]>('habits', 'list') || [];
      const index = existing.findIndex(h => h.id === id);

      if (index >= 0) {
        existing[index] = { ...existing[index], ...habit, id };
      } else {
        existing.push({ ...habit, id });
      }

      await secureStorage.setItem('habits', 'list', existing);
    } catch (error) {
      console.error('[SyncService] Failed to save habit locally:', error);
      return { success: false, id };
    }

    // Sync to Supabase
    if (this.canSync() && userId) {
      try {
        const { error } = await supabase.from('habits').upsert({
          ...habit,
          id,
          user_id: userId,
        });

        if (error) {
          await this.addPendingChange({
            id,
            table: 'habits',
            operation: 'insert',
            data: { ...habit, user_id: userId },
          });
        }
      } catch (error) {
        await this.addPendingChange({
          id,
          table: 'habits',
          operation: 'insert',
          data: { ...habit, user_id: userId },
        });
      }
    }

    return { success: true, id };
  }

  /**
   * Get all habits
   */
  async getHabits(): Promise<Habit[]> {
    const localHabits = await secureStorage.getItem<any[]>('habits', 'list') || [];

    if (this.canSync()) {
      try {
        const userId = authService.getCurrentUserId();
        const { data, error } = await supabase
          .from('habits')
          .select('*')
          .eq('user_id', userId)
          .eq('is_active', true);

        if (!error && data) {
          return this.mergeHabitData(localHabits, data);
        }
      } catch (error) {
        console.error('[SyncService] Failed to fetch remote habits:', error);
      }
    }

    return localHabits;
  }

  private mergeHabitData(local: any[], remote: Habit[]): Habit[] {
    const merged = new Map<string, Habit>();
    remote.forEach(h => merged.set(h.id, h));
    local.forEach(h => { if (!merged.has(h.id)) merged.set(h.id, h as Habit); });
    return Array.from(merged.values());
  }

  // ==================== REMINDER OPERATIONS ====================

  /**
   * Save reminder
   */
  async saveReminder(reminder: Omit<ReminderInsert, 'user_id'>): Promise<{ success: boolean; id: string }> {
    const id = reminder.id || `reminder_${Date.now()}`;
    const userId = authService.getCurrentUserId();

    // Save locally
    try {
      const existing = await secureStorage.getItem<any[]>('settings', 'reminders') || [];
      const index = existing.findIndex(r => r.id === id);

      if (index >= 0) {
        existing[index] = { ...existing[index], ...reminder, id };
      } else {
        existing.push({ ...reminder, id });
      }

      await secureStorage.setItem('settings', 'reminders', existing);
    } catch (error) {
      console.error('[SyncService] Failed to save reminder locally:', error);
      return { success: false, id };
    }

    // Sync to Supabase
    if (this.canSync() && userId) {
      try {
        const { error } = await supabase.from('reminders').upsert({
          ...reminder,
          id,
          user_id: userId,
        });

        if (error) {
          await this.addPendingChange({
            id,
            table: 'reminders',
            operation: 'insert',
            data: { ...reminder, user_id: userId },
          });
        }
      } catch (error) {
        await this.addPendingChange({
          id,
          table: 'reminders',
          operation: 'insert',
          data: { ...reminder, user_id: userId },
        });
      }
    }

    return { success: true, id };
  }

  /**
   * Delete reminder
   */
  async deleteReminder(id: string): Promise<{ success: boolean }> {
    // Delete locally
    try {
      const existing = await secureStorage.getItem<any[]>('settings', 'reminders') || [];
      const filtered = existing.filter(r => r.id !== id);
      await secureStorage.setItem('settings', 'reminders', filtered);
    } catch (error) {
      console.error('[SyncService] Failed to delete reminder locally:', error);
      return { success: false };
    }

    // Sync to Supabase
    if (this.canSync()) {
      try {
        const { error } = await supabase.from('reminders').delete().eq('id', id);
        if (error) {
          await this.addPendingChange({
            id,
            table: 'reminders',
            operation: 'delete',
            data: { id },
          });
        }
      } catch (error) {
        await this.addPendingChange({
          id,
          table: 'reminders',
          operation: 'delete',
          data: { id },
        });
      }
    }

    return { success: true };
  }

  // ==================== FULL SYNC ====================

  /**
   * Perform full data sync
   */
  async syncAll(): Promise<{ success: boolean; error?: string }> {
    if (!this.canSync()) {
      return { success: false, error: 'Sync not available' };
    }

    if (this.isSyncing) {
      return { success: false, error: 'Sync already in progress' };
    }

    this.isSyncing = true;
    this.updateState({ status: 'syncing', error: null });

    try {
      // Process pending changes first
      await this.processPendingChanges();

      // Pull remote data
      await Promise.all([
        this.pullMoods(),
        this.pullJournals(),
        this.pullHabits(),
        this.pullReminders(),
      ]);

      this.updateState({
        status: 'success',
        lastSyncAt: new Date().toISOString(),
        error: null,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sync failed';
      this.updateState({ status: 'error', error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Process all pending changes
   */
  private async processPendingChanges(): Promise<void> {
    const changes = [...this.pendingChanges];
    const successful: string[] = [];

    for (const change of changes) {
      try {
        let result;

        switch (change.operation) {
          case 'insert':
            result = await supabase.from(change.table).insert(change.data);
            break;
          case 'update':
            result = await supabase.from(change.table).update(change.data).eq('id', change.id);
            break;
          case 'delete':
            result = await supabase.from(change.table).delete().eq('id', change.id);
            break;
        }

        if (!result?.error) {
          successful.push(change.id);
        }
      } catch (error) {
        console.error('[SyncService] Failed to process pending change:', error);
      }
    }

    // Remove successful changes
    this.pendingChanges = this.pendingChanges.filter(c => !successful.includes(c.id));
    await this.savePendingChanges();
  }

  /**
   * Pull remote moods and merge
   */
  private async pullMoods(): Promise<void> {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      const local = await secureStorage.getItem<any[]>('mood', 'entries') || [];
      const merged = this.mergeMoodData(local, data);
      await secureStorage.setItem('mood', 'entries', merged);
    }
  }

  /**
   * Pull remote journals and merge
   */
  private async pullJournals(): Promise<void> {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      const local = await secureStorage.getItem<any[]>('journal', 'entries') || [];
      const merged = this.mergeJournalData(local, data);
      await secureStorage.setItem('journal', 'entries', merged);
    }
  }

  /**
   * Pull remote habits and merge
   */
  private async pullHabits(): Promise<void> {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      const local = await secureStorage.getItem<any[]>('habits', 'list') || [];
      const merged = this.mergeHabitData(local, data);
      await secureStorage.setItem('habits', 'list', merged);
    }
  }

  /**
   * Pull remote reminders
   */
  private async pullReminders(): Promise<void> {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      await secureStorage.setItem('settings', 'reminders', data);
    }
  }
}

// Export singleton instance
export const syncService = new SyncService();
export default syncService;
