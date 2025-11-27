/**
 * Helper function to get theme-specific image paths
 *
 * Usage:
 * const imagePath = getThemeImage(122, 'preferences', isDarkMode);
 * <Image source={imagePath} />
 *
 * OR use the map helper:
 * const imagePath = getThemedScreenImage('Preferences', isDarkMode);
 */

/**
 * Get the correct image path based on screen number and theme
 * @param screenNumber - The Figma screen number (e.g., 122)
 * @param screenName - The screen name (e.g., 'preferences')
 * @param isDarkMode - Whether dark mode is active
 * @returns Image source require statement
 */
export const getThemeImage = (
  screenNumber: number,
  screenName: string,
  isDarkMode: boolean
): any => {
  const theme = isDarkMode ? 'dark' : 'light';
  const fileName = `${screenNumber}-${theme}-${screenName}.png`;

  try {
    // Dynamically require the image based on theme
    return require(`../figma-extracted/assets/screens/${theme}-theme/${fileName}`);
  } catch (error) {
    console.warn(`Image not found: ${fileName}, falling back to light theme`);
    // Fallback to light theme if dark theme image doesn't exist
    try {
      const fallbackFileName = `${screenNumber}-light-${screenName}.png`;
      return require(`../figma-extracted/assets/screens/light-theme/${fallbackFileName}`);
    } catch (fallbackError) {
      console.error(`Failed to load image for screen ${screenNumber}: ${screenName}`, fallbackError);
      return null;
    }
  }
};

/**
 * Mapping of screen names to their Figma screen numbers and file names
 * Use this to get themed images easily: getThemeImage(ScreenMap.Preferences.number, ScreenMap.Preferences.name, isDarkMode)
 */
export const ScreenMap = {
  // Auth & Onboarding (1-26)
  Splash: { number: 1, name: 'splash-screen' },
  Walkthrough1: { number: 2, name: 'walkthrough-1' },
  Walkthrough2: { number: 3, name: 'walkthrough-2' },
  Walkthrough3: { number: 4, name: 'walkthrough-3' },
  Welcome: { number: 5, name: 'welcome-screen' },
  SignUpBlank: { number: 6, name: 'sign-up-blank-form' },
  SignUpFilled: { number: 7, name: 'sign-up-filled-form' },
  SignUpLoading: { number: 8, name: 'sign-up-loading' },
  SignUpStep1: { number: 9, name: 'sign-up-step-1-form' },
  SignUpStep2: { number: 10, name: 'sign-up-step-2-form' },
  SignUpStep3: { number: 11, name: 'sign-up-step-3-form' },
  SignUpStep4: { number: 12, name: 'sign-up-step-4-form' },
  SignUpStep5: { number: 13, name: 'sign-up-step-5-form' },
  SignUpStep6: { number: 14, name: 'sign-up-step-6-form' },
  SignUpStep7: { number: 15, name: 'sign-up-step-7-form' },
  SignUpStep8: { number: 16, name: 'sign-up-step-8-form' },
  SignUpStep9: { number: 17, name: 'sign-up-step-9-form' },
  SignUpStep10: { number: 18, name: 'sign-up-step-10-form' },
  SignInBlank: { number: 20, name: 'sign-in-blank-form' },
  SignInFilled: { number: 21, name: 'sign-in-filled-form' },
  ForgotPassword: { number: 23, name: 'forgot-password' },
  EnterOTP: { number: 24, name: 'enter-otp-code' },
  CreateNewPassword: { number: 25, name: 'create-new-password' },
  ResetPasswordSuccess: { number: 26, name: 'reset-password-successful' },

  // Home & Mood (27-32, 47-52)
  Home: { number: 27, name: 'home' },
  MoodCheckInBad: { number: 28, name: 'how-do-you-feel-today-not-good' },
  MoodCheckInGood: { number: 29, name: 'how-do-you-feel-today-good' },
  MoodReasonWhy: { number: 30, name: 'what-is-the-reason-that-makes-you-feel-that-way-' },
  MoodExactFeeling: { number: 31, name: 'what-is-your-exact-feeling-' },
  MoodAddNotes: { number: 32, name: 'add-notes' },
  HomeUnfinishedTasks: { number: 47, name: 'home-unfinished-tasks' },
  HomeFinishedTasks: { number: 48, name: 'home-finished-tasks' },
  CongratsAllTasksCompleted: { number: 49, name: 'congratulations-for-all-tasks-completed' },
  CongratsEarnedBadge: { number: 50, name: 'congratulations-for-earned-badge' },
  ShareBadge: { number: 51, name: 'share-badge' },
  Explore: { number: 52, name: 'explore' },

  // Chat (33-46)
  ChatWithMindy: { number: 33, name: 'chat-with-mindy' },

  // Meditation (53-60)
  ExploreFavorites: { number: 53, name: 'explore-favorites' },
  ExploreMeditations: { number: 54, name: 'explore-meditations' },
  MeditationDetails: { number: 55, name: 'meditation-details' },
  MeditationDetailsFavorite: { number: 56, name: 'meditation-details-save-to-favorites' },
  StartOrPlayMeditation: { number: 57, name: 'start-or-play-meditation' },
  EditSounds: { number: 58, name: 'edit-sounds' },
  MeditationCompleted: { number: 60, name: 'meditation-completed' },

  // Breathing (62-67)
  ExploreBreathing: { number: 62, name: 'explore-breathing' },
  BreathingDetails: { number: 63, name: 'breathing-details' },
  BreathingInhale: { number: 64, name: 'start-or-play-breathing-inhale' },
  BreathingHold: { number: 65, name: 'start-or-play-breathing-hold' },
  BreathingExhale: { number: 66, name: 'start-or-play-breathing-exhale' },
  BreathingCompleted: { number: 67, name: 'breathing-completed' },

  // Articles (68-69)
  ExploreArticles: { number: 68, name: 'explore-articles' },
  ArticleDetails: { number: 69, name: 'article-details' },

  // Journal (77-79)
  ExploreSmartJournal: { number: 77, name: 'explore-smart-journal' },
  JournalQuestionBlank: { number: 78, name: 'answering-smart-journal-question-blank' },
  JournalQuestionFilled: { number: 79, name: 'answering-smart-journal-question-filled' },

  // Sleep (100-109)
  SleepSoundsNature: { number: 100, name: 'sleep-sounds-nature' },
  SleepSoundsTraffic: { number: 101, name: 'sleep-sounds-traffic' },
  SleepSoundsSleep: { number: 102, name: 'sleep-sounds-sleep' },
  SleepSoundsAnimals: { number: 103, name: 'sleep-sounds-animals' },
  SleepSoundsMeditation: { number: 104, name: 'sleep-sounds-meditation' },
  SleepSoundsASMR: { number: 105, name: 'sleep-sounds-asmr' },
  SleepSoundsOther: { number: 106, name: 'sleep-sounds-other' },
  SleepMusic: { number: 107, name: 'sleep-music' },
  SleepStories: { number: 108, name: 'sleep-stories' },
  PlaySleepMusicOrStories: { number: 109, name: 'play-sleep-music-or-stories' },

  // Insights & Account (110-112)
  Insights: { number: 110, name: 'insights' },
  InsightsDetail: { number: 111, name: 'insights' },
  Account: { number: 112, name: 'account' },

  // Subscription & Payment (113-118)
  UpgradePlanMonthly: { number: 113, name: 'upgrade-plan-monthly' },
  UpgradePlanYearly: { number: 114, name: 'upgrade-plan-yearly' },
  ChoosePaymentMethods: { number: 115, name: 'choose-payment-methods' },
  ReviewSummary: { number: 116, name: 'review-summary' },
  ProcessingPayment: { number: 117, name: 'processing-payment' },
  SubscriptionSuccess: { number: 118, name: 'upgrade-plan-subscription-successful' },

  // Badges (119-120)
  MyBadges: { number: 119, name: 'my-badges' },
  ShareBadgeProfile: { number: 120, name: 'share-badge' },

  // Settings & Profile (121-138)
  DailyReminder: { number: 121, name: 'daily-reminder' },
  Preferences: { number: 122, name: 'preferences' },
  PersonalInfo: { number: 123, name: 'settings-personal-info' },
  AccountSecurity: { number: 124, name: 'settings-account-security' },
  LinkedAccounts: { number: 125, name: 'settings-linked-accounts' },
  BillingSubscriptions: { number: 126, name: 'settings-billing-subscriptions' },
  PaymentMethodsSettings: { number: 127, name: 'settings-payment-methods' },
  AddNewPayment: { number: 128, name: 'add-new-payment' },
  NewPaymentAdded: { number: 129, name: 'new-payment-method-added' },
  AppAppearance: { number: 130, name: 'settings-app-appearance' },
  AppTheme: { number: 131, name: 'settings-app-appearance-theme' },
  AppLanguage: { number: 132, name: 'settings-app-appearance-app-language' },
  HelpSupport: { number: 133, name: 'settings-help-support' },
  FAQ: { number: 134, name: 'settings-help-support-faq' },
  ContactSupport: { number: 135, name: 'settings-help-support-contact-support' },
  PrivacyPolicy: { number: 136, name: 'settings-help-support-privacy-policy' },
  TermsOfService: { number: 137, name: 'settings-help-support-terms-of-service' },
  Logout: { number: 138, name: 'logout' },

  // Add more mappings as needed for all 139 screens
} as const;

/**
 * Shorthand helper that uses the ScreenMap
 * @param screenKey - Key from ScreenMap (e.g., 'Preferences')
 * @param isDarkMode - Whether dark mode is active
 */
export const getThemedScreenImage = (
  screenKey: keyof typeof ScreenMap,
  isDarkMode: boolean
): any => {
  const screen = ScreenMap[screenKey];
  return getThemeImage(screen.number, screen.name, isDarkMode);
};

export default getThemeImage;
