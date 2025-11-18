# Rediscover Talk - Mental Wellness App

A comprehensive mental wellness mobile application built with React Native and Expo, featuring mood tracking, meditation, journaling, family activities, and sleep sounds.

## Features

### Mood Tracking
- **Mood Check-In**: Track your emotional state with 5 mood levels
- **Mood History**: View your emotional journey with streaks and trends
- **Mood Notes**: Add context to your mood entries

### Meditation & Mindfulness
- **Meditation Library**: 6+ guided meditations for different purposes
- **Categories**: Morning routines, stress relief, sleep preparation, mindfulness
- **Meditation Player**: Full-featured audio player with controls

### Journaling
- **Journal Entries**: Write and save your thoughts with mood indicators
- **Mood Integration**: Link journal entries to your emotional state
- **History View**: Browse past entries with search and filters

### Breathwork Exercises
- **3 Breathing Patterns**: 4-7-8 Relaxation, Box Breathing, Calm Breathing
- **Animated Guide**: Visual breathing circle with instruction text
- **Timer**: Track your practice duration

### Sleep Sounds
- **Nature Sounds**: Rain, Ocean Waves, Forest, Thunderstorm, Campfire
- **Ambient Sounds**: White Noise and more
- **Sound Player**: Loop and volume controls

### Profile & Settings
- **User Profile**: Track your progress and achievements
- **Statistics**: Days active, journal entries, mood streaks
- **Settings**: Notifications, dark mode, privacy controls
- **Account Management**: Profile editing, data management

## Tech Stack

- **Framework**: React Native 0.81.5
- **Build Tool**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack Navigator)
- **UI Components**: React Native core + expo-linear-gradient
- **State Management**: React Hooks (useState, useEffect)
- **Platform Support**: iOS 26.0+ and Android 16 (API 36)

## Design System

### Color Palette
- **Primary**: Cobalt Blue (#004BA7) - Trust and calm
- **Accent**: Lime (#C7F600) - Energy and positivity
- **Mood Colors**: Emotional state indicators
- **Gradients**: Dark blue backgrounds for focus

### Typography
- **System Fonts**: Native iOS and Android fonts
- **Font Sizes**: 8px grid system (xs: 12px to 5xl: 48px)
- **Weights**: Regular (400) to Bold (700)

### Spacing
- **8px Grid System**: Consistent spacing throughout
- **Border Radius**: sm (4px) to full (9999px)
- **Shadows**: Elevation system for depth

## Project Structure

```
rediscover-talk/
├── assets/                  # App icon, splash screen, images
├── src/
│   ├── constants/          # Design system (colors, typography, spacing)
│   ├── navigation/         # React Navigation setup
│   └── screens/
│       ├── auth/           # Authentication (Splash, Onboarding, SignUp, Login, Goals)
│       ├── home/           # Home dashboard
│       ├── mood/           # Mood tracking (Check-in, History)
│       ├── meditation/     # Meditation (Library, Player)
│       ├── journal/        # Journaling (List, Entry)
│       ├── breathwork/     # Breathing exercises
│       ├── sleep/          # Sleep sounds (Library, Player)
│       └── profile/        # User profile and settings
├── App.tsx                 # App entry point
├── app.json                # Expo configuration
└── package.json            # Dependencies
```

## Screens Implemented (17 Total)

### Phase 1-2: Authentication
1. SplashScreen
2. OnboardingScreen (3 slides)
3. SignUpScreen
4. LoginScreen
5. GoalSelectionScreen

### Phase 3: Home Dashboard
6. HomeScreen

### Phase 4-5: Core Features
7. MoodCheckInScreen
8. MoodHistoryScreen
9. JournalListScreen
10. JournalEntryScreen (modal)
11. BreathworkScreen

### Phase 6: Extended Features
12. MeditationLibraryScreen
13. MeditationPlayerScreen
14. SleepSoundsScreen
15. SoundPlayerScreen
16. ProfileScreen
17. SettingsScreen

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/litmonbobby/rediscover-talk-app.git
cd rediscover-talk

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Development Commands

```bash
# Start Expo dev server
npm start

# Start with cache cleared
npx expo start --clear

# iOS simulator
npm run ios

# Android emulator
npm run android

# Run type checking
npx tsc --noEmit
```

## Configuration

### Expo Configuration (app.json)
- **iOS**: Deployment target 26.0, foreground service permissions
- **Android**: SDK 36 (Android 16), background audio permissions
- **Splash Screen**: Custom splash with fade animation
- **App Icon**: Professional mental health design

### Environment
- Development: Expo Go app
- Production: EAS Build for App Store and Play Store

## Roadmap

### Upcoming Features
- [ ] Supabase backend integration
- [ ] User authentication with OAuth
- [ ] CloudKit data sync
- [ ] Push notifications
- [ ] Dark mode implementation
- [ ] Accessibility enhancements (WCAG 2.1 AA)
- [ ] Offline mode with local storage
- [ ] Data export functionality
- [ ] Premium features and subscriptions

### Known Issues
- Metro bundler cache issues (resolved with `--clear` flag)
- Meditation and sleep sound audio playback (placeholder implementation)
- Supabase integration pending

## Contributing

This is a personal project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Acknowledgments

- Design inspiration from modern mental health apps
- React Native and Expo communities
- Mental health and wellness research

## Contact

Project Link: [https://github.com/litmonbobby/rediscover-talk-app](https://github.com/litmonbobby/rediscover-talk-app)

---

**Built with** React Native, Expo, and TypeScript

**Powered by** Mental wellness principles and evidence-based practices

---

Last Updated: November 17, 2025 - Phase 6 Complete (17 screens)

**Note**: Family Activities screens were removed to align with Figma design specifications.
