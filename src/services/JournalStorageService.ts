/**
 * Journal & Notes Storage Service
 * Handles persistence for Smart Journal entries and Notepad notes
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  JOURNAL_ENTRIES: '@journal_entries',
  NOTES: '@notepad_notes',
  JOURNAL_PROMPTS_ANSWERED: '@journal_prompts_answered',
};

// Types
export type MoodType = 'great' | 'good' | 'okay' | 'notGood' | 'bad' | null;

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: MoodType;
  promptId?: string;
  promptQuestion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

export interface PromptAnswer {
  promptId: string;
  answer: string;
  answeredAt: string;
}

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

class JournalStorageService {
  private static instance: JournalStorageService;

  private constructor() {}

  static getInstance(): JournalStorageService {
    if (!JournalStorageService.instance) {
      JournalStorageService.instance = new JournalStorageService();
    }
    return JournalStorageService.instance;
  }

  // ============ JOURNAL ENTRIES ============

  async getAllJournalEntries(): Promise<JournalEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      if (data) {
        const entries: JournalEntry[] = JSON.parse(data);
        // Sort by most recent first
        return entries.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return [];
    } catch (error) {
      console.error('Error getting journal entries:', error);
      return [];
    }
  }

  async getJournalEntry(id: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getAllJournalEntries();
      return entries.find(e => e.id === id) || null;
    } catch (error) {
      console.error('Error getting journal entry:', error);
      return null;
    }
  }

  async saveJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<JournalEntry> {
    try {
      const entries = await this.getAllJournalEntries();
      const now = new Date().toISOString();

      const newEntry: JournalEntry = {
        ...entry,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };

      entries.push(newEntry);
      await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));

      return newEntry;
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw error;
    }
  }

  async updateJournalEntry(id: string, updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>): Promise<JournalEntry | null> {
    try {
      const entries = await this.getAllJournalEntries();
      const index = entries.findIndex(e => e.id === id);

      if (index === -1) return null;

      const updatedEntry: JournalEntry = {
        ...entries[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      entries[index] = updatedEntry;
      await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));

      return updatedEntry;
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  }

  async deleteJournalEntry(id: string): Promise<boolean> {
    try {
      const entries = await this.getAllJournalEntries();
      const filtered = entries.filter(e => e.id !== id);

      if (filtered.length === entries.length) return false;

      await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      return false;
    }
  }

  // ============ PROMPT ANSWERS ============

  async getPromptAnswers(): Promise<PromptAnswer[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_PROMPTS_ANSWERED);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting prompt answers:', error);
      return [];
    }
  }

  async savePromptAnswer(promptId: string, answer: string): Promise<void> {
    try {
      const answers = await this.getPromptAnswers();
      const existingIndex = answers.findIndex(a => a.promptId === promptId);

      const newAnswer: PromptAnswer = {
        promptId,
        answer,
        answeredAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        answers[existingIndex] = newAnswer;
      } else {
        answers.push(newAnswer);
      }

      await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_PROMPTS_ANSWERED, JSON.stringify(answers));
    } catch (error) {
      console.error('Error saving prompt answer:', error);
      throw error;
    }
  }

  async isPromptAnswered(promptId: string): Promise<boolean> {
    const answers = await this.getPromptAnswers();
    return answers.some(a => a.promptId === promptId);
  }

  // ============ NOTES ============

  async getAllNotes(): Promise<Note[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.NOTES);
      if (data) {
        const notes: Note[] = JSON.parse(data);
        // Sort: pinned first, then by most recent
        return notes.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
      }
      return [];
    } catch (error) {
      console.error('Error getting notes:', error);
      return [];
    }
  }

  async getNote(id: string): Promise<Note | null> {
    try {
      const notes = await this.getAllNotes();
      return notes.find(n => n.id === id) || null;
    } catch (error) {
      console.error('Error getting note:', error);
      return null;
    }
  }

  async saveNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    try {
      const notes = await this.getAllNotes();
      const now = new Date().toISOString();

      const newNote: Note = {
        ...note,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };

      notes.push(newNote);
      await AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));

      return newNote;
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  }

  async updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null> {
    try {
      const notes = await this.getAllNotes();
      const index = notes.findIndex(n => n.id === id);

      if (index === -1) return null;

      const updatedNote: Note = {
        ...notes[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      notes[index] = updatedNote;
      await AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));

      return updatedNote;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  async deleteNote(id: string): Promise<boolean> {
    try {
      const notes = await this.getAllNotes();
      const filtered = notes.filter(n => n.id !== id);

      if (filtered.length === notes.length) return false;

      await AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  }

  async toggleNotePin(id: string): Promise<Note | null> {
    const note = await this.getNote(id);
    if (!note) return null;
    return this.updateNote(id, { isPinned: !note.isPinned });
  }

  // ============ SEARCH ============

  async searchJournalEntries(query: string): Promise<JournalEntry[]> {
    const entries = await this.getAllJournalEntries();
    const lowerQuery = query.toLowerCase();
    return entries.filter(e =>
      e.title.toLowerCase().includes(lowerQuery) ||
      e.content.toLowerCase().includes(lowerQuery)
    );
  }

  async searchNotes(query: string): Promise<Note[]> {
    const notes = await this.getAllNotes();
    const lowerQuery = query.toLowerCase();
    return notes.filter(n =>
      n.title.toLowerCase().includes(lowerQuery) ||
      n.content.toLowerCase().includes(lowerQuery)
    );
  }

  // ============ STATS ============

  async getJournalStats(): Promise<{
    totalEntries: number;
    thisWeek: number;
    thisMonth: number;
    streak: number;
  }> {
    const entries = await this.getAllJournalEntries();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const thisWeek = entries.filter(e => new Date(e.createdAt) >= weekAgo).length;
    const thisMonth = entries.filter(e => new Date(e.createdAt) >= monthAgo).length;

    // Calculate streak (consecutive days with entries)
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dayStart = new Date(checkDate);
      const dayEnd = new Date(checkDate);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const hasEntry = entries.some(e => {
        const entryDate = new Date(e.createdAt);
        return entryDate >= dayStart && entryDate < dayEnd;
      });

      if (hasEntry) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    return {
      totalEntries: entries.length,
      thisWeek,
      thisMonth,
      streak,
    };
  }
}

export const journalStorageService = JournalStorageService.getInstance();
