/**
 * Rediscover Talk - TypeScript Type Definitions
 */

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mood Types
export type MoodType =
  | 'veryHappy'
  | 'happy'
  | 'neutral'
  | 'sad'
  | 'verySad'
  | 'anxious'
  | 'calm'
  | 'energetic'
  | 'tired';

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  note?: string;
  tags?: string[];
  createdAt: Date;
}

// Meditation Types
export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  category: MeditationCategory;
  audioUrl: string;
  imageUrl?: string;
  isFavorite?: boolean;
}

export type MeditationCategory =
  | 'sleep'
  | 'stress'
  | 'anxiety'
  | 'focus'
  | 'mindfulness'
  | 'gratitude'
  | 'self-love';

export interface MeditationSession {
  id: string;
  userId: string;
  meditationId: string;
  duration: number; // actual duration completed
  completedAt: Date;
}

// Journal Types
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

// Sleep Sound Types
export interface SleepSound {
  id: string;
  name: string;
  category: SoundCategory;
  audioUrl: string;
  icon: string;
}

export type SoundCategory =
  | 'nature'
  | 'whiteNoise'
  | 'music'
  | 'asmr';

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Journal: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  MoodCheckIn: undefined;
  MeditationPlayer: { meditationId: string };
  BreathingExercise: undefined;
};

export type ExploreStackParamList = {
  ExploreScreen: undefined;
  MeditationLibrary: undefined;
  MeditationDetail: { meditationId: string };
  SleepSounds: undefined;
  Activities: undefined;
};

export type JournalStackParamList = {
  JournalList: undefined;
  JournalEntry: { entryId?: string };
  JournalDetail: { entryId: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  Settings: undefined;
  EditProfile: undefined;
  Insights: undefined;
  Achievements: undefined;
};

// Store Types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface MoodState {
  entries: MoodEntry[];
  isLoading: boolean;
  selectedDate: Date;
}

export interface MeditationState {
  meditations: Meditation[];
  favorites: string[];
  currentSession: MeditationSession | null;
  isPlaying: boolean;
}
