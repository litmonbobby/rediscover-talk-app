# Implementation Plan - Rediscover Talk App

Breaking down the implementation into small, testable chunks based on 139 Figma screen designs.

---

## 📋 Overview

- **Total Screens:** 139 (light + dark themes)
- **Approach:** Build incrementally, component-first, test each chunk
- **Commit Frequency:** After each chunk (every 2-3 components or 1-2 screens)

---

## PHASE 0: Foundation Setup (2-3 hours)

### Chunk 0.1: Project Infrastructure
**Files:** 3 files
- [ ] Create folder structure (`src/components`, `src/screens`, `src/navigation`, `src/types`, `src/theme`)
- [ ] Set up barrel exports (index.ts files)
- [ ] Create base TypeScript types file

**Commit:** `chore: Set up project folder structure`

### Chunk 0.2: Theme System
**Files:** 2 files
- [ ] Create `src/theme/index.ts` - Import and re-export Figma theme
- [ ] Create `src/theme/constants.ts` - Add custom brand colors (Cobalt Blue, Lime)
- [ ] Test theme import in App.tsx

**Commit:** `feat: Set up theme system with Figma extraction`

### Chunk 0.3: Navigation Setup
**Files:** 2 files
- [ ] Create `src/navigation/types.ts` - Navigation param lists
- [ ] Create `src/navigation/AppNavigator.tsx` - Empty stack navigator
- [ ] Update App.tsx to use AppNavigator

**Commit:** `feat: Set up React Navigation structure`

---

## PHASE 1: Foundation Components (6-8 hours)

### Chunk 1.1: Button Component
**Reference:** `design-system` folder (button components)
**Files:** 2 files
- [ ] Create `src/components/Button.tsx`
- [ ] Variants: `primary`, `secondary`, `outline`, `text`
- [ ] Props: `title`, `onPress`, `variant`, `disabled`, `loading`, `icon`
- [ ] Add TypeScript types
- [ ] Test in App.tsx

**Commit:** `feat: Add Button component with 4 variants`

### Chunk 1.2: Input Component
**Reference:** Sign up forms (screens 6-7, 9-18)
**Files:** 2 files
- [ ] Create `src/components/Input.tsx`
- [ ] Props: `label`, `placeholder`, `value`, `onChangeText`, `error`, `secureTextEntry`, `keyboardType`
- [ ] Add error state styling
- [ ] Test in App.tsx

**Commit:** `feat: Add Input component with validation support`

### Chunk 1.3: Card Component
**Reference:** Home screen cards (screen 27)
**Files:** 2 files
- [ ] Create `src/components/Card.tsx`
- [ ] Variants: `default`, `elevated`, `outlined`
- [ ] Props: `children`, `variant`, `padding`, `onPress`
- [ ] Test in App.tsx

**Commit:** `feat: Add Card component with 3 variants`

### Chunk 1.4: Bottom Tab Bar
**Reference:** `design-system/active-menu-*.png` components
**Files:** 2 files
- [ ] Create `src/components/TabBar.tsx`
- [ ] Icons: Home, Explore, Sleep, Insights, Account
- [ ] Active/inactive states
- [ ] Props: `activeTab`, `onTabPress`
- [ ] Test in App.tsx

**Commit:** `feat: Add TabBar component with 5 tabs`

### Chunk 1.5: Header Component
**Reference:** Various screens with headers
**Files:** 2 files
- [ ] Create `src/components/Header.tsx`
- [ ] Props: `title`, `showBack`, `rightAction`, `onBackPress`
- [ ] Variants: `default`, `transparent`
- [ ] Test in App.tsx

**Commit:** `feat: Add Header component`

### Chunk 1.6: Badge Component
**Reference:** Screens 50, 119-120
**Files:** 2 files
- [ ] Create `src/components/Badge.tsx`
- [ ] Props: `icon`, `title`, `description`, `isEarned`
- [ ] Locked/unlocked states
- [ ] Test in App.tsx

**Commit:** `feat: Add Badge component`

### Chunk 1.7: Avatar Component
**Reference:** Profile screens
**Files:** 1 file
- [ ] Create `src/components/Avatar.tsx`
- [ ] Props: `image`, `size`, `name` (for initials)
- [ ] Sizes: `small`, `medium`, `large`

**Commit:** `feat: Add Avatar component`

---

## PHASE 2: Authentication Flow (8-10 hours)

### Chunk 2.1: Splash Screen
**Reference:** Screen 1
**Files:** 2 files
- [ ] Create `src/screens/auth/SplashScreen.tsx`
- [ ] App logo with gradient background
- [ ] 2.5s timer → navigate to Walkthrough
- [ ] Add to navigation

**Commit:** `feat: Add SplashScreen`

### Chunk 2.2: Walkthrough Screens (Onboarding)
**Reference:** Screens 2-4
**Files:** 3 files
- [ ] Create `src/screens/auth/WalkthroughScreen.tsx`
- [ ] 3 slides with Swiper component (or manual swipe)
- [ ] "Skip" button → Welcome
- [ ] "Next" → slide 2/3, "Get Started" → Welcome
- [ ] Add dots indicator

**Commit:** `feat: Add Walkthrough/Onboarding screens`

### Chunk 2.3: Welcome Screen
**Reference:** Screen 5
**Files:** 2 files
- [ ] Create `src/screens/auth/WelcomeScreen.tsx`
- [ ] "Sign Up" button → SignUp
- [ ] "Sign In" button → SignIn
- [ ] Illustration/image

**Commit:** `feat: Add WelcomeScreen`

### Chunk 2.4: Sign In Screen
**Reference:** Screens 20-22
**Files:** 2 files
- [ ] Create `src/screens/auth/SignInScreen.tsx`
- [ ] Email input, password input
- [ ] "Sign In" button with loading state
- [ ] "Forgot Password?" link → ForgotPassword
- [ ] Social login buttons (Google, Apple, Facebook)
- [ ] "Don't have account? Sign Up" link

**Commit:** `feat: Add SignInScreen`

### Chunk 2.5: Sign Up Screen (Simple)
**Reference:** Screens 6-8
**Files:** 2 files
- [ ] Create `src/screens/auth/SignUpScreen.tsx`
- [ ] Name, email, password inputs
- [ ] "Sign Up" button with loading state
- [ ] Social sign up buttons
- [ ] "Already have account? Sign In" link

**Commit:** `feat: Add SignUpScreen (simple version)`

### Chunk 2.6: Multi-Step Sign Up (Extended)
**Reference:** Screens 9-18
**Files:** 3 files
- [ ] Update `SignUpScreen.tsx` with multi-step flow
- [ ] 10 steps with progress indicator
- [ ] Step navigation (Next/Back)
- [ ] Form validation per step
- [ ] Data collection: name, email, password, age, gender, goals, etc.

**Commit:** `feat: Add multi-step SignUp flow (10 steps)`

### Chunk 2.7: Forgot Password Flow
**Reference:** Screens 23-26
**Files:** 4 files
- [ ] Create `src/screens/auth/ForgotPasswordScreen.tsx` (screen 23)
- [ ] Create `src/screens/auth/OTPScreen.tsx` (screen 24)
- [ ] Create `src/screens/auth/NewPasswordScreen.tsx` (screen 25)
- [ ] Create `src/screens/auth/PasswordResetSuccessScreen.tsx` (screen 26)

**Commit:** `feat: Add forgot password flow`

### Chunk 2.8: Preparing Plans Screen
**Reference:** Screen 19
**Files:** 2 files
- [ ] Create `src/screens/auth/PreparingPlansScreen.tsx`
- [ ] Loading animation/spinner
- [ ] "Preparing personalized plans..." text
- [ ] Auto-navigate to Home after 3s

**Commit:** `feat: Add PreparingPlansScreen`

---

## PHASE 3: Home & Main Navigation (4-6 hours)

### Chunk 3.1: Bottom Tab Navigator
**Files:** 2 files
- [ ] Update `AppNavigator.tsx` with Bottom Tab Navigator
- [ ] 5 tabs: Home, Explore, Sleep, Insights, Account
- [ ] Custom TabBar component
- [ ] Tab icons and labels

**Commit:** `feat: Add bottom tab navigation`

### Chunk 3.2: Home Screen - Basic
**Reference:** Screen 27
**Files:** 2 files
- [ ] Create `src/screens/home/HomeScreen.tsx`
- [ ] Header with user greeting
- [ ] "How do you feel today?" card
- [ ] Daily tasks section (placeholder)
- [ ] Quick actions grid

**Commit:** `feat: Add HomeScreen basic layout`

### Chunk 3.3: Home Screen - Tasks
**Reference:** Screens 47-48
**Files:** 2 files
- [ ] Create `src/components/TaskCard.tsx`
- [ ] Update HomeScreen with tasks list
- [ ] Checkbox interaction
- [ ] Progress indicator
- [ ] Unfinished vs finished states

**Commit:** `feat: Add daily tasks to HomeScreen`

### Chunk 3.4: Congratulations Modals
**Reference:** Screens 49-51
**Files:** 3 files
- [ ] Create `src/components/CongratulationsModal.tsx`
- [ ] Props: `type` (tasks-complete, badge-earned)
- [ ] Confetti animation (optional)
- [ ] Share button → share modal

**Commit:** `feat: Add congratulations modals`

---

## PHASE 4: Mood Tracking (4-6 hours)

### Chunk 4.1: Mood Selector Component
**Reference:** Screens 28-29
**Files:** 2 files
- [ ] Create `src/components/MoodSelector.tsx`
- [ ] 5 mood options with emojis
- [ ] Selected state
- [ ] Props: `selectedMood`, `onSelectMood`

**Commit:** `feat: Add MoodSelector component`

### Chunk 4.2: Mood Check-In Flow - Step 1
**Reference:** Screens 28-29
**Files:** 2 files
- [ ] Create `src/screens/mood/MoodCheckInScreen.tsx`
- [ ] "How do you feel today?" question
- [ ] MoodSelector (Not Good / Good)
- [ ] Next button

**Commit:** `feat: Add MoodCheckInScreen step 1`

### Chunk 4.3: Mood Check-In Flow - Step 2
**Reference:** Screen 30
**Files:** 1 file
- [ ] Update MoodCheckInScreen
- [ ] "What is the reason?" screen
- [ ] Reason chips/buttons (Work, Health, Family, etc.)
- [ ] Multi-select support
- [ ] Next button

**Commit:** `feat: Add MoodCheckInScreen step 2 (reason)`

### Chunk 4.4: Mood Check-In Flow - Step 3
**Reference:** Screen 31
**Files:** 1 file
- [ ] Update MoodCheckInScreen
- [ ] "What is your exact feeling?" screen
- [ ] Detailed emotion selector
- [ ] Next button

**Commit:** `feat: Add MoodCheckInScreen step 3 (exact feeling)`

### Chunk 4.5: Mood Check-In Flow - Step 4
**Reference:** Screen 32
**Files:** 1 file
- [ ] Update MoodCheckInScreen
- [ ] "Add notes" screen
- [ ] Text input for notes
- [ ] Submit button
- [ ] Save mood entry (TODO: Supabase)

**Commit:** `feat: Add MoodCheckInScreen step 4 (notes)`

---

## PHASE 5: AI Chat & Coach (6-8 hours)

### Chunk 5.1: Chat Message Component
**Reference:** Screens 33-40
**Files:** 2 files
- [ ] Create `src/components/ChatMessage.tsx`
- [ ] Props: `text`, `isUser`, `timestamp`
- [ ] User vs AI message styling
- [ ] Markdown support (optional)

**Commit:** `feat: Add ChatMessage component`

### Chunk 5.2: Chat Screen - Basic
**Reference:** Screen 33
**Files:** 2 files
- [ ] Create `src/screens/chat/ChatScreen.tsx`
- [ ] Header with "Chat with Mindy" title
- [ ] Message list (FlatList)
- [ ] Input field + send button
- [ ] Placeholder messages

**Commit:** `feat: Add ChatScreen basic layout`

### Chunk 5.3: Chat Screen - Input States
**Reference:** Screens 34-35
**Files:** 1 file
- [ ] Update ChatScreen
- [ ] Typing state (text in input)
- [ ] Generating response state (loading bubble)
- [ ] Disable input during generation

**Commit:** `feat: Add chat input and loading states`

### Chunk 5.4: Chat Screen - Menu Options
**Reference:** Screens 36-40
**Files:** 2 files
- [ ] Create chat options menu (3-dot menu)
- [ ] Actions: Search, Clear Chat, Export Chat
- [ ] Search modal (screen 37)
- [ ] Clear confirmation modal (screen 38)
- [ ] Export options modal (screen 39)
- [ ] Share modal (screen 40)

**Commit:** `feat: Add chat menu options`

### Chunk 5.5: Coach Screens
**Reference:** Screens 41-46
**Files:** 6 files
- [ ] Create `src/screens/coach/CoachScreen.tsx` (screen 41)
- [ ] Create `src/screens/coach/CoachChatScreen.tsx` (screen 42)
- [ ] Create `src/screens/coach/VoiceCallScreen.tsx` (screen 43)
- [ ] Create `src/screens/coach/VideoCallScreen.tsx` (screen 44)
- [ ] Create `src/screens/coach/ChatHistoryScreen.tsx` (screen 45)
- [ ] Create `src/screens/coach/CallHistoryScreen.tsx` (screen 46)

**Commit:** `feat: Add coach screens (chat, voice, video, history)`

---

## PHASE 6: Explore Tab (12-15 hours)

### Chunk 6.1: Explore Home Screen
**Reference:** Screens 52-53
**Files:** 2 files
- [ ] Create `src/screens/explore/ExploreScreen.tsx`
- [ ] Categories: Meditations, Breathing, Articles, Tests, Journal, Notepad, Affirmations, Quotes, Tips
- [ ] "All" and "Favorites" tabs
- [ ] Category cards with icons

**Commit:** `feat: Add ExploreScreen`

### Chunk 6.2: Meditations - List
**Reference:** Screens 54
**Files:** 2 files
- [ ] Create `src/screens/explore/MeditationsScreen.tsx`
- [ ] Meditation cards (title, duration, image)
- [ ] Categories: Sleep, Stress, Anxiety, Focus, etc.
- [ ] Search/filter

**Commit:** `feat: Add MeditationsScreen`

### Chunk 6.3: Meditations - Detail
**Reference:** Screens 55-56
**Files:** 2 files
- [ ] Create `src/screens/explore/MeditationDetailScreen.tsx`
- [ ] Meditation info (title, duration, description)
- [ ] "Save to Favorites" button (screen 56)
- [ ] "Start" button → Player

**Commit:** `feat: Add MeditationDetailScreen`

### Chunk 6.4: Meditations - Player
**Reference:** Screens 57-60
**Files:** 3 files
- [ ] Create `src/screens/explore/MeditationPlayerScreen.tsx`
- [ ] Circular progress timer
- [ ] Play/pause button
- [ ] Background image
- [ ] Edit sounds modal (screens 58-59)
- [ ] Completion screen (screen 60)

**Commit:** `feat: Add MeditationPlayerScreen`

### Chunk 6.5: Premium Content Modal
**Reference:** Screen 61
**Files:** 2 files
- [ ] Create `src/components/PremiumModal.tsx`
- [ ] "Upgrade to unlock" message
- [ ] Pricing info
- [ ] "Upgrade Plan" button → Subscription screen

**Commit:** `feat: Add PremiumModal`

### Chunk 6.6: Breathing - List
**Reference:** Screen 62
**Files:** 2 files
- [ ] Create `src/screens/explore/BreathingScreen.tsx`
- [ ] Breathing exercise cards
- [ ] Categories/techniques (4-7-8, Box Breathing, etc.)

**Commit:** `feat: Add BreathingScreen`

### Chunk 6.7: Breathing - Detail
**Reference:** Screen 63
**Files:** 2 files
- [ ] Create `src/screens/explore/BreathingDetailScreen.tsx`
- [ ] Exercise description
- [ ] Instructions
- [ ] "Start" button

**Commit:** `feat: Add BreathingDetailScreen`

### Chunk 6.8: Breathing - Player
**Reference:** Screens 64-67
**Files:** 2 files
- [ ] Create `src/screens/explore/BreathingPlayerScreen.tsx`
- [ ] Animated breathing circle
- [ ] Instructions: Inhale (64), Hold (65), Exhale (66)
- [ ] Completion screen (67)

**Commit:** `feat: Add BreathingPlayerScreen`

### Chunk 6.9: Articles - List & Detail
**Reference:** Screens 68-69
**Files:** 3 files
- [ ] Create `src/screens/explore/ArticlesScreen.tsx`
- [ ] Create `src/screens/explore/ArticleDetailScreen.tsx`
- [ ] Article cards with images
- [ ] Article reading view with text/images

**Commit:** `feat: Add Articles screens`

### Chunk 6.10: Tests - Flow
**Reference:** Screens 70-76
**Files:** 5 files
- [ ] Create `src/screens/explore/TestsScreen.tsx` (list)
- [ ] Create `src/screens/explore/TestDetailScreen.tsx`
- [ ] Create `src/screens/explore/TestQuestionScreen.tsx` (72-73)
- [ ] Create `src/screens/explore/TestAnalyzingScreen.tsx` (74)
- [ ] Create `src/screens/explore/TestResultsScreen.tsx` (75-76)

**Commit:** `feat: Add Tests flow`

### Chunk 6.11: Smart Journal - Flow
**Reference:** Screens 77-81
**Files:** 3 files
- [ ] Create `src/screens/explore/SmartJournalScreen.tsx` (77, 80-81)
- [ ] Create `src/screens/explore/SmartJournalQuestionScreen.tsx` (78-79)
- [ ] Question prompt with text input
- [ ] Options menu (screen 81)

**Commit:** `feat: Add Smart Journal screens`

### Chunk 6.12: Notepad - Flow
**Reference:** Screens 82-86
**Files:** 3 files
- [ ] Create `src/screens/explore/NotepadScreen.tsx` (82, 85-86)
- [ ] Create `src/screens/explore/AddNoteScreen.tsx` (83-84)
- [ ] Notes list
- [ ] Add/edit note
- [ ] Options menu (screen 86)

**Commit:** `feat: Add Notepad screens`

### Chunk 6.13: Affirmations - Flow
**Reference:** Screens 87-89
**Files:** 3 files
- [ ] Create `src/screens/explore/AffirmationsScreen.tsx`
- [ ] Create `src/screens/explore/AffirmationDetailScreen.tsx`
- [ ] Share affirmation modal

**Commit:** `feat: Add Affirmations screens`

### Chunk 6.14: Quotes - Flow
**Reference:** Screens 90-92
**Files:** 3 files
- [ ] Create `src/screens/explore/QuotesScreen.tsx`
- [ ] Create `src/screens/explore/QuoteDetailScreen.tsx`
- [ ] Share quote modal

**Commit:** `feat: Add Quotes screens`

### Chunk 6.15: Tips - Flow
**Reference:** Screens 93-94
**Files:** 2 files
- [ ] Create `src/screens/explore/TipsScreen.tsx`
- [ ] Create `src/screens/explore/TipDetailScreen.tsx`

**Commit:** `feat: Add Tips screens`

---

## PHASE 7: Sleep Tab (6-8 hours)

### Chunk 7.1: Sleep Sounds - Home
**Reference:** Screens 95-99
**Files:** 2 files
- [ ] Create `src/screens/sleep/SleepSoundsScreen.tsx`
- [ ] Sound categories
- [ ] Play/pause controls
- [ ] Timer button → Timer modal (97-98)
- [ ] Multiple sound selection (99)

**Commit:** `feat: Add SleepSoundsScreen`

### Chunk 7.2: Sleep Sounds - Categories
**Reference:** Screens 100-106
**Files:** 7 files (or 1 with tabs)
- [ ] Category views: Nature, Traffic, Sleep, Animals, Meditation, ASMR, Other
- [ ] Sound cards with play buttons
- [ ] Category navigation

**Commit:** `feat: Add sleep sounds categories`

### Chunk 7.3: Sleep Music
**Reference:** Screen 107
**Files:** 2 files
- [ ] Create `src/screens/sleep/SleepMusicScreen.tsx`
- [ ] Music tracks list
- [ ] Play controls

**Commit:** `feat: Add SleepMusicScreen`

### Chunk 7.4: Sleep Stories
**Reference:** Screens 108-109
**Files:** 2 files
- [ ] Create `src/screens/sleep/SleepStoriesScreen.tsx`
- [ ] Create `src/screens/sleep/StoryPlayerScreen.tsx`
- [ ] Stories list
- [ ] Story player with audio controls

**Commit:** `feat: Add Sleep Stories screens`

---

## PHASE 8: Insights Tab (3-4 hours)

### Chunk 8.1: Insights Screen
**Reference:** Screens 110-111
**Files:** 2 files
- [ ] Create `src/screens/insights/InsightsScreen.tsx`
- [ ] Mood chart (line/bar graph)
- [ ] Statistics cards (streak, total entries, etc.)
- [ ] Activity breakdown
- [ ] Time period selector (week, month, year)

**Commit:** `feat: Add InsightsScreen with charts`

---

## PHASE 9: Account Tab (8-10 hours)

### Chunk 9.1: Account Screen
**Reference:** Screen 112
**Files:** 2 files
- [ ] Create `src/screens/account/AccountScreen.tsx`
- [ ] User profile section (avatar, name, email)
- [ ] Menu items: Upgrade Plan, Badges, Reminders, Preferences, Settings, Logout
- [ ] Navigation to sub-screens

**Commit:** `feat: Add AccountScreen`

### Chunk 9.2: Upgrade Plan Flow
**Reference:** Screens 113-118
**Files:** 5 files
- [ ] Create `src/screens/account/UpgradePlanScreen.tsx` (113-114)
- [ ] Create `src/screens/account/PaymentMethodsScreen.tsx` (115)
- [ ] Create `src/screens/account/ReviewSummaryScreen.tsx` (116)
- [ ] Create `src/screens/account/ProcessingPaymentScreen.tsx` (117)
- [ ] Create `src/screens/account/SubscriptionSuccessScreen.tsx` (118)

**Commit:** `feat: Add upgrade plan flow`

### Chunk 9.3: Badges
**Reference:** Screens 119-120
**Files:** 2 files
- [ ] Create `src/screens/account/BadgesScreen.tsx`
- [ ] Badge grid
- [ ] Locked/unlocked states
- [ ] Share badge modal

**Commit:** `feat: Add BadgesScreen`

### Chunk 9.4: Daily Reminder
**Reference:** Screen 121
**Files:** 2 files
- [ ] Create `src/screens/account/ReminderScreen.tsx`
- [ ] Time picker
- [ ] Days of week selector
- [ ] Enable/disable toggle

**Commit:** `feat: Add ReminderScreen`

### Chunk 9.5: Preferences
**Reference:** Screen 122
**Files:** 2 files
- [ ] Create `src/screens/account/PreferencesScreen.tsx`
- [ ] Notification preferences
- [ ] Content preferences
- [ ] Toggle switches

**Commit:** `feat: Add PreferencesScreen`

### Chunk 9.6: Settings - Personal Info
**Reference:** Screen 123
**Files:** 2 files
- [ ] Create `src/screens/account/PersonalInfoScreen.tsx`
- [ ] Edit name, email, phone
- [ ] Avatar upload
- [ ] Save button

**Commit:** `feat: Add PersonalInfoScreen`

### Chunk 9.7: Settings - Account Security
**Reference:** Screen 124
**Files:** 2 files
- [ ] Create `src/screens/account/AccountSecurityScreen.tsx`
- [ ] Change password
- [ ] Two-factor authentication
- [ ] Login history

**Commit:** `feat: Add AccountSecurityScreen`

### Chunk 9.8: Settings - Linked Accounts
**Reference:** Screen 125
**Files:** 2 files
- [ ] Create `src/screens/account/LinkedAccountsScreen.tsx`
- [ ] Google, Apple, Facebook accounts
- [ ] Link/unlink buttons

**Commit:** `feat: Add LinkedAccountsScreen`

### Chunk 9.9: Settings - Billing & Subscriptions
**Reference:** Screen 126
**Files:** 2 files
- [ ] Create `src/screens/account/BillingScreen.tsx`
- [ ] Current plan info
- [ ] Billing history
- [ ] Cancel subscription option

**Commit:** `feat: Add BillingScreen`

### Chunk 9.10: Settings - Payment Methods Management
**Reference:** Screens 127-129
**Files:** 3 files
- [ ] Create `src/screens/account/PaymentMethodsManagementScreen.tsx`
- [ ] Create `src/screens/account/AddPaymentScreen.tsx` (128)
- [ ] Payment added success modal (129)

**Commit:** `feat: Add payment methods management`

### Chunk 9.11: Settings - App Appearance
**Reference:** Screens 130-132
**Files:** 3 files
- [ ] Create `src/screens/account/AppearanceScreen.tsx`
- [ ] Theme selector modal (131)
- [ ] Language selector modal (132)
- [ ] Dark mode toggle

**Commit:** `feat: Add AppearanceScreen with theme/language`

### Chunk 9.12: Settings - Help & Support
**Reference:** Screens 133-137
**Files:** 5 files
- [ ] Create `src/screens/account/HelpScreen.tsx`
- [ ] Create `src/screens/account/FAQScreen.tsx` (134)
- [ ] Create `src/screens/account/ContactSupportScreen.tsx` (135)
- [ ] Create `src/screens/account/PrivacyPolicyScreen.tsx` (136)
- [ ] Create `src/screens/account/TermsScreen.tsx` (137)

**Commit:** `feat: Add Help & Support screens`

### Chunk 9.13: Logout Modal
**Reference:** Screen 138
**Files:** 2 files
- [ ] Create `src/components/LogoutModal.tsx`
- [ ] Confirmation dialog
- [ ] Logout action

**Commit:** `feat: Add logout confirmation modal`

---

## PHASE 10: Dark Theme (4-6 hours)

### Chunk 10.1: Theme Context
**Files:** 2 files
- [ ] Create `src/theme/ThemeContext.tsx`
- [ ] Light/dark theme switching
- [ ] AsyncStorage persistence

**Commit:** `feat: Add theme switching with context`

### Chunk 10.2: Update Components for Dark Theme
**Files:** ~10-15 files
- [ ] Update all components to use theme context
- [ ] Test with dark theme enabled
- [ ] Fix any color/contrast issues

**Commit:** `feat: Add dark theme support to all components`

### Chunk 10.3: Update Screens for Dark Theme
**Files:** ~30-40 files
- [ ] Update all screens to use theme context
- [ ] Reference dark theme Figma designs
- [ ] Test navigation between screens

**Commit:** `feat: Add dark theme support to all screens`

---

## PHASE 11: Backend Integration (12-16 hours)

### Chunk 11.1: Supabase Setup
**Files:** 3 files
- [ ] Create `src/lib/supabase.ts` - Initialize client
- [ ] Create `src/lib/auth.ts` - Auth helpers
- [ ] Create database schema in Supabase dashboard

**Commit:** `feat: Set up Supabase client`

### Chunk 11.2: Authentication Integration
**Files:** 5-6 files
- [ ] Integrate SignUp with Supabase auth
- [ ] Integrate SignIn with Supabase auth
- [ ] Integrate Forgot Password flow
- [ ] Add auth state persistence
- [ ] Update navigation based on auth state

**Commit:** `feat: Integrate Supabase authentication`

### Chunk 11.3: State Management - Zustand Stores
**Files:** 5 files
- [ ] Create `src/store/authStore.ts`
- [ ] Create `src/store/moodStore.ts`
- [ ] Create `src/store/meditationStore.ts`
- [ ] Create `src/store/journalStore.ts`
- [ ] Create `src/store/settingsStore.ts`

**Commit:** `feat: Set up Zustand stores`

### Chunk 11.4: Mood Tracking Backend
**Files:** 3 files
- [ ] Create `src/services/moodService.ts`
- [ ] Integrate mood check-in with Supabase
- [ ] Fetch mood history from Supabase
- [ ] Update InsightsScreen with real data

**Commit:** `feat: Integrate mood tracking with backend`

### Chunk 11.5: Journal/Notes Backend
**Files:** 2 files
- [ ] Create `src/services/journalService.ts`
- [ ] Integrate smart journal and notepad with Supabase
- [ ] CRUD operations

**Commit:** `feat: Integrate journal/notes with backend`

### Chunk 11.6: User Preferences Backend
**Files:** 2 files
- [ ] Create `src/services/userService.ts`
- [ ] Sync preferences, settings, badges with Supabase
- [ ] Update profile endpoints

**Commit:** `feat: Integrate user preferences with backend`

### Chunk 11.7: Content Backend
**Files:** 3 files
- [ ] Create `src/services/contentService.ts`
- [ ] Fetch meditations, articles, affirmations, quotes from Supabase
- [ ] Favorites management
- [ ] Premium content check

**Commit:** `feat: Integrate content with backend`

---

## PHASE 12: Polish & Testing (8-12 hours)

### Chunk 12.1: Error Handling
**Files:** 5-10 files
- [ ] Add error boundaries to key screens
- [ ] Network error handling
- [ ] User-friendly error messages
- [ ] Retry logic

**Commit:** `feat: Add comprehensive error handling`

### Chunk 12.2: Loading States
**Files:** 10-15 files
- [ ] Add skeleton loaders
- [ ] Loading indicators for all async operations
- [ ] Optimistic updates

**Commit:** `feat: Add loading states across app`

### Chunk 12.3: Animations
**Files:** 5-8 files
- [ ] Screen transitions
- [ ] Button press animations
- [ ] Modal animations
- [ ] Confetti for achievements

**Commit:** `feat: Add animations and transitions`

### Chunk 12.4: Accessibility
**Files:** 20+ files
- [ ] Add accessibility labels
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] Color contrast fixes

**Commit:** `feat: Add accessibility support`

### Chunk 12.5: Performance Optimization
**Files:** Various
- [ ] React.memo for expensive components
- [ ] useMemo for heavy computations
- [ ] FlatList optimization
- [ ] Image optimization

**Commit:** `perf: Optimize performance`

---

## 📊 Summary

| Phase | Chunks | Est. Hours | Screens/Components |
|-------|--------|------------|-------------------|
| 0: Foundation Setup | 3 | 2-3 | 0 screens, 0 components |
| 1: Foundation Components | 7 | 6-8 | 0 screens, 7 components |
| 2: Authentication | 8 | 8-10 | 10 screens |
| 3: Home & Navigation | 4 | 4-6 | 2 screens, 2 components |
| 4: Mood Tracking | 5 | 4-6 | 1 screen, 1 component |
| 5: AI Chat & Coach | 5 | 6-8 | 8 screens |
| 6: Explore Tab | 15 | 12-15 | 25 screens |
| 7: Sleep Tab | 4 | 6-8 | 5 screens |
| 8: Insights Tab | 1 | 3-4 | 1 screen |
| 9: Account Tab | 13 | 8-10 | 20 screens |
| 10: Dark Theme | 3 | 4-6 | 0 new screens |
| 11: Backend Integration | 7 | 12-16 | 0 new screens |
| 12: Polish & Testing | 5 | 8-12 | 0 new screens |
| **TOTAL** | **75 chunks** | **83-112 hours** | **72+ screens, 15+ components** |

---

## 🎯 Recommended Order

1. **Week 1:** Phases 0-1 (Foundation)
2. **Week 2:** Phase 2 (Authentication)
3. **Week 3:** Phases 3-4 (Home & Mood)
4. **Week 4:** Phase 5 (Chat)
5. **Week 5-6:** Phase 6 (Explore - largest phase)
6. **Week 7:** Phase 7 (Sleep)
7. **Week 8:** Phases 8-9 (Insights & Account)
8. **Week 9:** Phase 10 (Dark Theme)
9. **Week 10-11:** Phase 11 (Backend Integration)
10. **Week 12:** Phase 12 (Polish & Testing)

---

## 💡 Best Practices

1. **Commit after each chunk** - Never let uncommitted code pile up
2. **Test each chunk in isolation** - Verify it works before moving on
3. **Reference Figma designs** - Always have the design open while coding
4. **Use TypeScript strictly** - No `any` types
5. **Component reusability** - Build once, use everywhere
6. **Mobile-first** - Test on real device/simulator frequently
7. **Git branches** - Create feature branches for each phase

---

## 🔄 Iteration Strategy

For each chunk:
1. ✅ Review Figma design reference
2. ✅ Create component/screen file
3. ✅ Implement UI structure
4. ✅ Add styling (theme-based)
5. ✅ Add interactivity (buttons, navigation)
6. ✅ Test on simulator
7. ✅ Commit with clear message
8. ✅ Push to branch

---

**Last Updated:** November 22, 2025
**Total Estimated Time:** 83-112 hours (10-14 weeks at 8 hours/week)
**Status:** Ready to start Phase 0
