/**
 * Rediscover Talk - TypeScript Type Definitions
 * Base types for the application
 */

// ==================== User Types ====================

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  createdAt: Date;
  updatedAt: Date;
}

// ==================== Mood Types ====================

export type MoodType =
  | 'very-happy'
  | 'happy'
  | 'neutral'
  | 'sad'
  | 'very-sad'
  | 'anxious'
  | 'calm'
  | 'energetic'
  | 'tired';

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  feeling?: string; // Detailed emotion
  reason?: string[]; // Reasons for the mood
  note?: string;
  tags?: string[];
  createdAt: Date;
}

// ==================== Meditation Types ====================

export type MeditationCategory =
  | 'sleep'
  | 'stress'
  | 'anxiety'
  | 'focus'
  | 'mindfulness'
  | 'gratitude'
  | 'self-love'
  | 'healing';

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  category: MeditationCategory;
  audioUrl: string;
  imageUrl?: string;
  isPremium: boolean;
  isFavorite?: boolean;
}

export interface MeditationSession {
  id: string;
  userId: string;
  meditationId: string;
  duration: number; // actual duration completed
  completedAt: Date;
}

// ==================== Breathing Types ====================

export type BreathingTechnique =
  | '4-7-8'
  | 'box-breathing'
  | 'calm-breathing'
  | 'deep-breathing';

export interface BreathingExercise {
  id: string;
  title: string;
  description: string;
  technique: BreathingTechnique;
  duration: number; // in minutes
  inhale: number; // seconds
  hold: number; // seconds
  exhale: number; // seconds
}

// ==================== Journal Types ====================

export interface JournalEntry {
  id: string;
  userId: string;
  title?: string;
  content: string;
  mood?: MoodType;
  tags?: string[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SmartJournalPrompt {
  id: string;
  question: string;
  category: string;
}

// ==================== Sleep Types ====================

export type SoundCategory =
  | 'nature'
  | 'traffic'
  | 'sleep'
  | 'animals'
  | 'meditation'
  | 'asmr'
  | 'other';

export interface SleepSound {
  id: string;
  name: string;
  category: SoundCategory;
  audioUrl: string;
  icon: string;
  isPremium: boolean;
}

export interface SleepMusic {
  id: string;
  title: string;
  artist?: string;
  duration: number;
  audioUrl: string;
  imageUrl?: string;
  isPremium: boolean;
}

export interface SleepStory {
  id: string;
  title: string;
  narrator?: string;
  duration: number;
  audioUrl: string;
  imageUrl?: string;
  isPremium: boolean;
}

// ==================== Content Types ====================

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  imageUrl?: string;
  category: string;
  readTime: number; // in minutes
  isPremium: boolean;
  createdAt: Date;
}

export interface Affirmation {
  id: string;
  text: string;
  category: string;
  imageUrl?: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  imageUrl?: string;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
}

// ==================== Test Types ====================

export interface Test {
  id: string;
  title: string;
  description: string;
  questions: TestQuestion[];
  imageUrl?: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  type: 'single-choice' | 'multiple-choice' | 'rating';
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  analysis: string;
  completedAt: Date;
}

// ==================== Achievement Types ====================

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  isEarned: boolean;
  earnedAt?: Date;
}

// ==================== Task Types ====================

export interface DailyTask {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  completedAt?: Date;
}

// ==================== Chat Types ====================

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Coach {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  isAvailable: boolean;
}

// ==================== Subscription Types ====================

export type SubscriptionPlan = 'free' | 'monthly' | 'yearly';

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple-pay' | 'google-pay';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

// ==================== Settings Types ====================

export interface UserSettings {
  userId: string;
  notifications: {
    dailyReminder: boolean;
    reminderTime?: string;
    reminderDays?: number[]; // 0-6 for Sun-Sat
    achievements: boolean;
    updates: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
}

// ==================== Analytics Types ====================

export interface MoodStatistics {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  moodDistribution: Record<MoodType, number>;
  weeklyTrend: { date: string; mood: MoodType }[];
}
