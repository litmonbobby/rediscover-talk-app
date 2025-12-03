/**
 * Supabase Database Types
 *
 * TypeScript types for the Supabase database schema.
 * Re-exports from generated types and provides convenience aliases.
 */

// Re-export generated types from Supabase CLI
export type { Database, Json } from './database.types';

// Import Database type for convenience types
import type { Database } from './database.types';

// Convenience types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Mood = Database['public']['Tables']['moods']['Row'];
export type MoodInsert = Database['public']['Tables']['moods']['Insert'];
export type MoodUpdate = Database['public']['Tables']['moods']['Update'];

export type Journal = Database['public']['Tables']['journals']['Row'];
export type JournalInsert = Database['public']['Tables']['journals']['Insert'];
export type JournalUpdate = Database['public']['Tables']['journals']['Update'];

export type MeditationSession = Database['public']['Tables']['meditation_sessions']['Row'];
export type MeditationSessionInsert = Database['public']['Tables']['meditation_sessions']['Insert'];

export type Habit = Database['public']['Tables']['habits']['Row'];
export type HabitInsert = Database['public']['Tables']['habits']['Insert'];
export type HabitUpdate = Database['public']['Tables']['habits']['Update'];

export type HabitCompletion = Database['public']['Tables']['habit_completions']['Row'];
export type HabitCompletionInsert = Database['public']['Tables']['habit_completions']['Insert'];

export type Reminder = Database['public']['Tables']['reminders']['Row'];
export type ReminderInsert = Database['public']['Tables']['reminders']['Insert'];
export type ReminderUpdate = Database['public']['Tables']['reminders']['Update'];
