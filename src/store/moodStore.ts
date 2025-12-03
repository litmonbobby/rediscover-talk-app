/**
 * Mood Store - Zustand Store with Secure Persistence
 *
 * Manages all mood-related state with encrypted local storage.
 * Features:
 * - Mood check-in history
 * - Mood reasons and feelings
 * - Notes and timestamps
 * - Statistics and streaks
 */

import { create } from 'zustand';
import { secureStorage } from '../services/SecureStorageService';

// Mood types
export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type MoodName = 'Bad' | 'Not Good' | 'Okay' | 'Good' | 'Great';

// Predefined reasons for mood
export const MOOD_REASONS = [
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'relationships', label: 'Relationships', icon: '💕' },
  { id: 'finances', label: 'Finances', icon: '💰' },
  { id: 'sleep', label: 'Sleep', icon: '😴' },
  { id: 'exercise', label: 'Exercise', icon: '🏃' },
  { id: 'weather', label: 'Weather', icon: '🌤️' },
  { id: 'social', label: 'Social', icon: '🗣️' },
  { id: 'hobbies', label: 'Hobbies', icon: '🎨' },
  { id: 'stress', label: 'Stress', icon: '😰' },
  { id: 'other', label: 'Other', icon: '📝' },
] as const;

// Predefined feelings/emotions
export const MOOD_FEELINGS = [
  { id: 'happy', label: 'Happy', icon: '😊' },
  { id: 'calm', label: 'Calm', icon: '😌' },
  { id: 'excited', label: 'Excited', icon: '🤩' },
  { id: 'grateful', label: 'Grateful', icon: '🙏' },
  { id: 'anxious', label: 'Anxious', icon: '😟' },
  { id: 'sad', label: 'Sad', icon: '😢' },
  { id: 'angry', label: 'Angry', icon: '😠' },
  { id: 'tired', label: 'Tired', icon: '😫' },
  { id: 'stressed', label: 'Stressed', icon: '😣' },
  { id: 'lonely', label: 'Lonely', icon: '😔' },
  { id: 'hopeful', label: 'Hopeful', icon: '🌟' },
  { id: 'confused', label: 'Confused', icon: '😕' },
] as const;

export type MoodReasonId = typeof MOOD_REASONS[number]['id'];
export type MoodFeelingId = typeof MOOD_FEELINGS[number]['id'];

// Mood entry interface
export interface MoodEntry {
  id: string;
  level: MoodLevel;
  name: MoodName;
  reasons: MoodReasonId[];
  feelings: MoodFeelingId[];
  notes: string;
  timestamp: number;
  date: string; // YYYY-MM-DD format for calendar
}

// Current mood check-in state (in progress)
export interface MoodCheckInState {
  level: MoodLevel | null;
  name: MoodName | null;
  reasons: MoodReasonId[];
  feelings: MoodFeelingId[];
  notes: string;
}

// Statistics
export interface MoodStats {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  averageMood: number;
  mostFrequentMood: MoodName | null;
  lastEntryDate: string | null;
}

// Store state interface
interface MoodState {
  // Data
  entries: MoodEntry[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Current check-in
  currentCheckIn: MoodCheckInState;

  // Stats
  stats: MoodStats;

  // Actions - Initialization
  initialize: () => Promise<void>;

  // Actions - Check-in flow
  setMoodLevel: (level: MoodLevel, name: MoodName) => void;
  setReasons: (reasons: MoodReasonId[]) => void;
  toggleReason: (reasonId: MoodReasonId) => void;
  setFeelings: (feelings: MoodFeelingId[]) => void;
  toggleFeeling: (feelingId: MoodFeelingId) => void;
  setNotes: (notes: string) => void;
  saveCurrentCheckIn: () => Promise<MoodEntry | null>;
  resetCurrentCheckIn: () => void;

  // Actions - Data management
  getMoodByDate: (date: string) => MoodEntry | undefined;
  getMoodsByMonth: (year: number, month: number) => MoodEntry[];
  getMoodsByDateRange: (startDate: string, endDate: string) => MoodEntry[];
  addMoodForDate: (date: string, level: MoodLevel, name: MoodName) => Promise<MoodEntry | null>;
  deleteEntry: (id: string) => Promise<void>;
  clearAllData: () => Promise<void>;

  // Actions - Stats
  calculateStats: () => void;
}

// Helper functions
const getMoodName = (level: MoodLevel): MoodName => {
  const names: Record<MoodLevel, MoodName> = {
    1: 'Bad',
    2: 'Not Good',
    3: 'Okay',
    4: 'Good',
    5: 'Great',
  };
  return names[level];
};

const generateId = (): string => {
  return `mood_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const calculateStreak = (entries: MoodEntry[]): { current: number; longest: number } => {
  if (entries.length === 0) return { current: 0, longest: 0 };

  const sortedDates = [...new Set(entries.map(e => e.date))].sort().reverse();
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));

  let current = 0;
  let longest = 0;
  let streak = 0;
  let lastDate: Date | null = null;

  // Check if streak is active (has entry today or yesterday)
  const hasRecentEntry = sortedDates[0] === today || sortedDates[0] === yesterday;

  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);

    if (lastDate === null) {
      streak = 1;
    } else {
      const diffDays = Math.floor((lastDate.getTime() - date.getTime()) / 86400000);
      if (diffDays === 1) {
        streak++;
      } else {
        longest = Math.max(longest, streak);
        streak = 1;
      }
    }

    lastDate = date;
  }

  longest = Math.max(longest, streak);
  current = hasRecentEntry ? streak : 0;

  return { current, longest };
};

// Create the store
export const useMoodStore = create<MoodState>((set, get) => ({
  // Initial state
  entries: [],
  isLoading: false,
  isInitialized: false,
  error: null,

  currentCheckIn: {
    level: null,
    name: null,
    reasons: [],
    feelings: [],
    notes: '',
  },

  stats: {
    totalEntries: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageMood: 0,
    mostFrequentMood: null,
    lastEntryDate: null,
  },

  // Initialize store from secure storage
  initialize: async () => {
    if (get().isInitialized) return;

    set({ isLoading: true, error: null });

    try {
      await secureStorage.initialize();

      // Load entries from secure storage
      const storedEntries = await secureStorage.getItem<MoodEntry[]>('mood', 'entries');
      const entries = storedEntries || [];

      set({
        entries,
        isLoading: false,
        isInitialized: true,
      });

      // Calculate stats after loading
      get().calculateStats();

      console.log(`[MoodStore] Loaded ${entries.length} mood entries`);
    } catch (error) {
      console.error('[MoodStore] Initialization failed:', error);
      set({
        isLoading: false,
        error: 'Failed to load mood data',
        isInitialized: true,
      });
    }
  },

  // Set mood level
  setMoodLevel: (level, name) => {
    set(state => ({
      currentCheckIn: {
        ...state.currentCheckIn,
        level,
        name,
      },
    }));
  },

  // Set reasons
  setReasons: (reasons) => {
    set(state => ({
      currentCheckIn: {
        ...state.currentCheckIn,
        reasons,
      },
    }));
  },

  // Toggle a single reason
  toggleReason: (reasonId) => {
    set(state => {
      const currentReasons = state.currentCheckIn.reasons;
      const hasReason = currentReasons.includes(reasonId);

      return {
        currentCheckIn: {
          ...state.currentCheckIn,
          reasons: hasReason
            ? currentReasons.filter(r => r !== reasonId)
            : [...currentReasons, reasonId],
        },
      };
    });
  },

  // Set feelings
  setFeelings: (feelings) => {
    set(state => ({
      currentCheckIn: {
        ...state.currentCheckIn,
        feelings,
      },
    }));
  },

  // Toggle a single feeling
  toggleFeeling: (feelingId) => {
    set(state => {
      const currentFeelings = state.currentCheckIn.feelings;
      const hasFeeling = currentFeelings.includes(feelingId);

      return {
        currentCheckIn: {
          ...state.currentCheckIn,
          feelings: hasFeeling
            ? currentFeelings.filter(f => f !== feelingId)
            : [...currentFeelings, feelingId],
        },
      };
    });
  },

  // Set notes
  setNotes: (notes) => {
    set(state => ({
      currentCheckIn: {
        ...state.currentCheckIn,
        notes,
      },
    }));
  },

  // Save current check-in
  saveCurrentCheckIn: async () => {
    const { currentCheckIn, entries } = get();

    if (!currentCheckIn.level || !currentCheckIn.name) {
      console.error('[MoodStore] Cannot save: mood level not set');
      return null;
    }

    const now = new Date();
    const newEntry: MoodEntry = {
      id: generateId(),
      level: currentCheckIn.level,
      name: currentCheckIn.name,
      reasons: currentCheckIn.reasons,
      feelings: currentCheckIn.feelings,
      notes: currentCheckIn.notes,
      timestamp: now.getTime(),
      date: formatDate(now),
    };

    const updatedEntries = [newEntry, ...entries];

    try {
      // Save to secure storage
      await secureStorage.setItem('mood', 'entries', updatedEntries);

      set({ entries: updatedEntries });
      get().resetCurrentCheckIn();
      get().calculateStats();

      console.log('[MoodStore] Mood entry saved:', newEntry.id);
      return newEntry;
    } catch (error) {
      console.error('[MoodStore] Failed to save mood entry:', error);
      set({ error: 'Failed to save mood entry' });
      return null;
    }
  },

  // Reset current check-in
  resetCurrentCheckIn: () => {
    set({
      currentCheckIn: {
        level: null,
        name: null,
        reasons: [],
        feelings: [],
        notes: '',
      },
    });
  },

  // Get mood by date
  getMoodByDate: (date) => {
    return get().entries.find(e => e.date === date);
  },

  // Get moods by month
  getMoodsByMonth: (year, month) => {
    const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
    return get().entries.filter(e => e.date.startsWith(monthStr));
  },

  // Get moods by date range
  getMoodsByDateRange: (startDate, endDate) => {
    return get().entries.filter(e => e.date >= startDate && e.date <= endDate);
  },

  // Add mood for a specific date (for adding to past days)
  addMoodForDate: async (date, level, name) => {
    const { entries } = get();

    // Remove any existing entry for this date
    const filteredEntries = entries.filter(e => e.date !== date);

    // Create timestamp for the given date (noon time to avoid timezone issues)
    const [year, month, day] = date.split('-').map(Number);
    const timestamp = new Date(year, month - 1, day, 12, 0, 0).getTime();

    const newEntry: MoodEntry = {
      id: generateId(),
      level,
      name,
      reasons: [],
      feelings: [],
      notes: '',
      timestamp,
      date,
    };

    const updatedEntries = [newEntry, ...filteredEntries].sort((a, b) => b.timestamp - a.timestamp);

    try {
      // Save to secure storage
      await secureStorage.setItem('mood', 'entries', updatedEntries);

      set({ entries: updatedEntries });
      get().calculateStats();

      console.log('[MoodStore] Mood entry added for date:', date);
      return newEntry;
    } catch (error) {
      console.error('[MoodStore] Failed to add mood entry:', error);
      set({ error: 'Failed to add mood entry' });
      return null;
    }
  },

  // Delete entry
  deleteEntry: async (id) => {
    const { entries } = get();
    const updatedEntries = entries.filter(e => e.id !== id);

    try {
      await secureStorage.setItem('mood', 'entries', updatedEntries);
      set({ entries: updatedEntries });
      get().calculateStats();
      console.log('[MoodStore] Entry deleted:', id);
    } catch (error) {
      console.error('[MoodStore] Failed to delete entry:', error);
      set({ error: 'Failed to delete entry' });
    }
  },

  // Clear all data
  clearAllData: async () => {
    try {
      await secureStorage.clearCategory('mood');
      set({
        entries: [],
        stats: {
          totalEntries: 0,
          currentStreak: 0,
          longestStreak: 0,
          averageMood: 0,
          mostFrequentMood: null,
          lastEntryDate: null,
        },
      });
      console.log('[MoodStore] All data cleared');
    } catch (error) {
      console.error('[MoodStore] Failed to clear data:', error);
      set({ error: 'Failed to clear data' });
    }
  },

  // Calculate statistics
  calculateStats: () => {
    const { entries } = get();

    if (entries.length === 0) {
      set({
        stats: {
          totalEntries: 0,
          currentStreak: 0,
          longestStreak: 0,
          averageMood: 0,
          mostFrequentMood: null,
          lastEntryDate: null,
        },
      });
      return;
    }

    // Calculate average mood
    const averageMood = entries.reduce((sum, e) => sum + e.level, 0) / entries.length;

    // Find most frequent mood
    const moodCounts: Record<MoodName, number> = {
      'Bad': 0,
      'Not Good': 0,
      'Okay': 0,
      'Good': 0,
      'Great': 0,
    };
    entries.forEach(e => moodCounts[e.name]++);
    const mostFrequentMood = Object.entries(moodCounts)
      .sort((a, b) => b[1] - a[1])[0][0] as MoodName;

    // Calculate streaks
    const { current, longest } = calculateStreak(entries);

    // Last entry date
    const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);
    const lastEntryDate = sortedEntries[0]?.date || null;

    set({
      stats: {
        totalEntries: entries.length,
        currentStreak: current,
        longestStreak: longest,
        averageMood: Math.round(averageMood * 10) / 10,
        mostFrequentMood,
        lastEntryDate,
      },
    });
  },
}));

// Export helper
export { getMoodName };
