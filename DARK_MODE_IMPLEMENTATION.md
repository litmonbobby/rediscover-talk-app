# Dark Mode Implementation Guide

## ✅ Current Status

**Infrastructure Complete:**
- ✅ ThemeContext created with light/dark/system modes
- ✅ useTheme hook updated to support manual theme switching
- ✅ getThemeImage helper for dynamic Figma asset loading
- ✅ App.tsx wrapped with ThemeProvider
- ✅ 139 dark theme Figma assets extracted and ready
- ✅ ScreenMap with all screen numbers and names
- ✅ Example implementation: PreferencesScreen

**Screens Updated:** 1/71 (PreferencesScreen)
**Screens Remaining:** 70 screens to update

---

## 📋 Implementation Pattern

Every screen with a Figma background image needs these 3 changes:

### 1. **Update Imports**

```typescript
// BEFORE:
import { colors } from '../../constants';

// AFTER:
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';
```

### 2. **Add useTheme Hook**

```typescript
// Inside your component:
export const YourScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();  // ADD THIS LINE

  // ... rest of component
}
```

### 3. **Update Image Source**

```typescript
// BEFORE:
<Image
  source={require('../../figma-extracted/assets/screens/light-theme/122-light-preferences.png')}
  style={styles.backgroundImage}
  resizeMode="cover"
/>

// AFTER:
<Image
  source={getThemedScreenImage('Preferences', isDarkMode)}
  style={styles.backgroundImage}
  resizeMode="cover"
/>
```

---

## 🗺️ Screen Map Reference

Use `getThemedScreenImage(screenKey, isDarkMode)` with these keys:

### Auth & Onboarding
```typescript
'Splash', 'Walkthrough1', 'Walkthrough2', 'Walkthrough3', 'Welcome',
'SignUpBlank', 'SignUpFilled', 'SignUpLoading',
'SignInBlank', 'SignInFilled', 'ForgotPassword'
```

### Settings & Profile
```typescript
'DailyReminder', 'Preferences', 'PersonalInfo', 'AccountSecurity',
'LinkedAccounts', 'BillingSubscriptions', 'PaymentMethods',
'AppAppearance', 'AppTheme', 'AppLanguage', 'HelpSupport',
'FAQ', 'ContactSupport', 'PrivacyPolicy', 'TermsOfService', 'Logout'
```

### Home & Other
```typescript
'Home', 'ChatWithMindy'
// Add more as you map them in getThemeImage.ts
```

---

## 📁 Files to Update (71 Screens)

### Auth Screens (12)
- [ ] SplashScreen.tsx
- [ ] OnboardingScreen.tsx (3 walkthrough slides)
- [ ] WelcomeScreen.tsx
- [ ] SignUpScreen.tsx
- [ ] LoginScreen.tsx
- [ ] ForgotPasswordScreen.tsx
- [ ] EnterOTPScreen.tsx
- [ ] CreateNewPasswordScreen.tsx
- [ ] ResetPasswordSuccessScreen.tsx
- [ ] GoalSelectionScreen.tsx
- [ ] PreparingPlansScreen.tsx

### Home & Mood (5)
- [ ] HomeScreen.tsx
- [ ] MoodCheckInScreen.tsx
- [ ] MoodHistoryScreen.tsx
- [ ] MoodCalendarScreen.tsx
- [ ] MoodCheckInFlowScreen.tsx

### Meditation (5)
- [ ] MeditationLibraryScreen.tsx
- [ ] MeditationDetailsScreen.tsx
- [ ] MeditationPlayerScreen.tsx
- [ ] MeditationPlayerFullScreen.tsx
- [ ] ExploreScreen.tsx

### Journal (2)
- [ ] JournalListScreen.tsx
- [ ] JournalEntryScreen.tsx

### Chat (2)
- [ ] ChatScreen.tsx
- [ ] AIChatScreen.tsx

### Sleep & Breathwork (6)
- [ ] SleepSoundsScreen.tsx
- [ ] SleepPlayerScreen.tsx
- [ ] SoundPlayerScreen.tsx
- [ ] SleepCategoriesScreen.tsx
- [ ] BreathworkScreen.tsx
- [ ] BreathingDetailsScreen.tsx

### Affirmations & Articles (3)
- [ ] AffirmationsScreen.tsx
- [ ] ArticlesListScreen.tsx
- [ ] ArticleDetailScreen.tsx

### Insights (2)
- [ ] InsightsScreen.tsx
- [ ] InsightsDetailScreen.tsx

### Subscription (7)
- [ ] SubscriptionScreen.tsx
- [ ] UpgradePlanScreen.tsx
- [ ] PaymentMethodsScreen.tsx
- [ ] PaymentMethodSelectionScreen.tsx
- [ ] ReviewSummaryScreen.tsx
- [ ] ProcessingPaymentScreen.tsx
- [ ] SubscriptionSuccessScreen.tsx

### Profile & Settings (25)
- [x] PreferencesScreen.tsx ✅ (EXAMPLE)
- [ ] ProfileScreen.tsx
- [ ] SettingsScreen.tsx
- [ ] AccountScreen.tsx
- [ ] PersonalInfoScreen.tsx
- [ ] AccountSecurityScreen.tsx
- [ ] LinkedAccountsScreen.tsx
- [ ] BillingSubscriptionsScreen.tsx
- [ ] PaymentMethodsSettingsScreen.tsx
- [ ] AddNewPaymentScreen.tsx
- [ ] NewPaymentAddedScreen.tsx
- [ ] AppAppearanceScreen.tsx
- [ ] AppThemeScreen.tsx
- [ ] AppLanguageScreen.tsx
- [ ] DailyReminderScreen.tsx
- [ ] MyBadgesScreen.tsx
- [ ] ShareBadgeScreen.tsx
- [ ] HelpScreen.tsx
- [ ] HelpSupportScreen.tsx
- [ ] FAQScreen.tsx
- [ ] ContactSupportScreen.tsx
- [ ] PrivacyPolicyScreen.tsx
- [ ] TermsOfServiceScreen.tsx
- [ ] AboutScreen.tsx
- [ ] LogoutScreen.tsx

### Media (1)
- [ ] MediaGalleryScreen.tsx

---

## 🎨 Adding Theme Toggle

Add this to **SettingsScreen.tsx**:

```typescript
import { useThemeContext } from '../../theme/ThemeContext';

export const SettingsScreen = () => {
  const { themeMode, setThemeMode } = useThemeContext();

  return (
    <View>
      <Text>Theme</Text>
      <TouchableOpacity onPress={() => setThemeMode('light')}>
        <Text>Light {themeMode === 'light' && '✓'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setThemeMode('dark')}>
        <Text>Dark {themeMode === 'dark' && '✓'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setThemeMode('system')}>
        <Text>System {themeMode === 'system' && '✓'}</Text>
      </TouchableOpacity>
    </View>
  );
};
```

---

## 🚀 Testing Dark Mode

1. **System Theme (Default):**
   - App automatically matches iOS/Android system theme
   - Change system theme in Settings app to test

2. **Manual Toggle:**
   - Add theme toggle to Settings screen
   - Test switching between light/dark/system modes
   - Verify theme persists across app restarts

3. **Verify Assets:**
   - Check that dark theme Figma images load correctly
   - Verify fallback to light theme if dark image missing
   - Test on both iOS and Android

---

## 📝 Example: PreferencesScreen

```typescript
import React from 'react';
import { View, Image, SafeAreaView, ScrollView, Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getThemedScreenImage } from '../../theme/getThemeImage';

export const PreferencesScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Image
        source={getThemedScreenImage('Preferences', isDarkMode)}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {/* Rest of screen content */}
    </SafeAreaView>
  );
};
```

---

## 🔧 Dependencies

Make sure `@react-native-async-storage/async-storage` is installed:

```bash
npm install @react-native-async-storage/async-storage
# or
npx expo install @react-native-async-storage/async-storage
```

---

## ✅ Completion Checklist

- [x] ThemeContext created
- [x] useTheme hook updated
- [x] getThemeImage helper created
- [x] App.tsx wrapped with ThemeProvider
- [x] ScreenMap with screen numbers
- [x] Example screen updated (PreferencesScreen)
- [ ] Install AsyncStorage dependency
- [ ] Add theme toggle to SettingsScreen
- [ ] Update all 71 screens with dark mode
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Verify theme persistence
- [ ] Production build test

---

## 🎯 Next Steps

1. **Install AsyncStorage:**
   ```bash
   npx expo install @react-native-async-storage/async-storage
   ```

2. **Add Theme Toggle:**
   - Update SettingsScreen with theme switcher
   - Test light/dark/system modes

3. **Systematically Update Screens:**
   - Start with Auth screens (12 screens)
   - Then Home & Mood (5 screens)
   - Continue through all categories
   - Check off each screen in this document as completed

4. **Test Thoroughly:**
   - Test each screen in both light and dark modes
   - Verify all Figma assets load correctly
   - Check theme persistence across app restarts

---

## 💡 Tips

- **ScreenMap is your friend:** Use `getThemedScreenImage('ScreenName', isDarkMode)` for easy implementation
- **Fallback built-in:** If a dark theme asset is missing, it automatically falls back to light theme
- **Theme persists:** User's theme choice is saved to AsyncStorage automatically
- **System theme default:** App uses system theme by default, but users can override

---

**Last Updated:** November 27, 2025
**Status:** Infrastructure complete, 1/71 screens updated
