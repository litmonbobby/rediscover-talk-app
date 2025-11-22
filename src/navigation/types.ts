/**
 * Navigation Type Definitions
 * Define all navigation routes and their parameters
 */

// ==================== Root Stack ====================
export type RootStackParamList = {
  // Auth Flow
  Splash: undefined;
  Walkthrough: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTP: { email: string };
  NewPassword: { email: string };
  PasswordResetSuccess: undefined;
  PreparingPlans: undefined;

  // Main App
  MainTabs: undefined;

  // Modals
  MoodCheckIn: undefined;
  Congratulations: {
    type: 'tasks-complete' | 'badge-earned';
    badge?: {
      id: string;
      title: string;
      icon: string;
    };
  };
  PremiumUpgrade: undefined;
};

// ==================== Bottom Tab ====================
export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Sleep: undefined;
  Insights: undefined;
  Account: undefined;
};

// ==================== Home Stack ====================
export type HomeStackParamList = {
  HomeScreen: undefined;
  TaskDetails: { taskId: string };
};

// ==================== Explore Stack ====================
export type ExploreStackParamList = {
  ExploreHome: undefined;

  // Meditations
  Meditations: undefined;
  MeditationDetail: { id: string };
  MeditationPlayer: { id: string };

  // Breathing
  Breathing: undefined;
  BreathingDetail: { id: string };
  BreathingPlayer: { id: string };

  // Articles
  Articles: undefined;
  ArticleDetail: { id: string };

  // Tests
  Tests: undefined;
  TestDetail: { id: string };
  TestQuestion: { testId: string; questionIndex: number };
  TestAnalyzing: { testId: string };
  TestResults: { testId: string; resultId: string };

  // Journal
  SmartJournal: undefined;
  SmartJournalQuestion: { promptId: string };

  // Notepad
  Notepad: undefined;
  AddNote: { noteId?: string };

  // Affirmations
  Affirmations: undefined;
  AffirmationDetail: { id: string };

  // Quotes
  Quotes: undefined;
  QuoteDetail: { id: string };

  // Tips
  Tips: undefined;
  TipDetail: { id: string };
};

// ==================== Sleep Stack ====================
export type SleepStackParamList = {
  SleepHome: undefined;
  SleepSounds: { category?: string };
  SleepMusic: undefined;
  SleepStories: undefined;
  StoryPlayer: { id: string };
};

// ==================== Insights Stack ====================
export type InsightsStackParamList = {
  InsightsHome: undefined;
  MoodHistory: undefined;
  MoodCalendar: undefined;
};

// ==================== Account Stack ====================
export type AccountStackParamList = {
  AccountHome: undefined;

  // Subscription
  UpgradePlan: undefined;
  PaymentMethods: undefined;
  ReviewSummary: undefined;
  ProcessingPayment: undefined;
  SubscriptionSuccess: undefined;

  // Badges
  Badges: undefined;

  // Settings
  DailyReminder: undefined;
  Preferences: undefined;
  PersonalInfo: undefined;
  AccountSecurity: undefined;
  LinkedAccounts: undefined;
  Billing: undefined;
  PaymentMethodsManagement: undefined;
  AddPayment: undefined;
  Appearance: undefined;
  Help: undefined;
  FAQ: undefined;
  ContactSupport: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
};

// ==================== Chat Screens ====================
export type ChatStackParamList = {
  ChatHome: undefined;
  ChatWithMindy: undefined;
  TalkWithCoach: undefined;
  CoachChat: { coachId: string };
  CoachVoiceCall: { coachId: string };
  CoachVideoCall: { coachId: string };
  ChatHistory: undefined;
  CallHistory: undefined;
};

// ==================== Navigation Props Helper ====================
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

// Root Stack Navigation Props
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootStackRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;

// Tab Navigation Props
export type MainTabNavigationProp<T extends keyof MainTabParamList> =
  BottomTabNavigationProp<MainTabParamList, T>;

export type MainTabRouteProp<T extends keyof MainTabParamList> =
  RouteProp<MainTabParamList, T>;
