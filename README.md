# Rediscover Talk - Mental Wellness App

A comprehensive mental wellness mobile application built with React Native and Expo, featuring a complete Figma design system with 278 high-fidelity screen designs.

## 🎨 Design-First Approach

This project is built from a **complete Figma design system** extraction:

- **3,678 design system components** - Navigation, buttons, cards, forms, and more
- **278 screen designs** - 139 light theme + 139 dark theme mockups
- **45 color palette** - Complete brand colors with hex and RGBA values
- **574 typography styles** - Font families, weights, sizes, line heights
- **100 component images** - High-quality 2x PNG exports

### Figma Design System

All designs are extracted from the **Mindify - AI Mental Health App UI Kit** and organized in `/src/figma-extracted/`:

```
src/figma-extracted/
├── theme.ts                     # Complete React Native theme (102KB)
├── extraction-summary.json       # Component inventory (743KB)
├── README.md                    # Design system documentation
└── assets/
    ├── design-system/           # 100 component images (@2x PNG)
    └── screens/
        ├── light-theme/         # 139 light theme screen designs
        └── dark-theme/          # 139 dark theme screen designs
```

## 🚀 Features (From Figma Designs)

### Core Features
- **Onboarding & Authentication** - Welcome, sign up, login flows
- **Mood Tracking** - Daily check-ins, history, calendar views
- **Meditation & Mindfulness** - Library, player, guided sessions
- **Journaling** - Text entries with mood integration
- **Breathwork Exercises** - Animated breathing patterns
- **Sleep Sounds** - Nature sounds, ambient audio, music player
- **AI Coach** - Chat interface for mental wellness guidance
- **Insights & Analytics** - Mood trends, progress tracking, charts
- **Affirmations** - Daily positive reinforcement
- **Articles & Content** - Mental health educational resources
- **Profile & Settings** - User preferences, account management
- **Subscription** - Premium features, payment methods

## 🛠️ Tech Stack

### Framework & Language
```
React Native 0.81.5
Expo SDK 54.0.24
TypeScript 5.9.2 (strict mode)
React 19.1.0
```

### Key Dependencies
```
@react-navigation/native 7.1.20       # Navigation
expo-linear-gradient 15.0.7          # Gradients
expo-blur 15.0.7                     # Glassmorphism effects
react-native-svg 15.12.1             # Vector graphics
lottie-react-native 7.3.4            # Animations
expo-av 16.0.7                       # Audio/video
@supabase/supabase-js 2.81.1         # Backend (ready to integrate)
zustand 5.0.8                        # State management (ready to use)
```

## 📁 Project Structure

```
rediscover-talk-app/
├── assets/                      # App assets (preserved)
│   ├── icon.png                 # App icon
│   ├── adaptive-icon.png        # Android adaptive icon
│   ├── splash-icon.png          # Splash screen
│   ├── favicon.png              # Web favicon
│   ├── audio/                   # Audio files
│   ├── fonts/                   # Custom fonts
│   └── images/                  # Images
│
├── src/
│   └── figma-extracted/         # Complete Figma design system
│       ├── theme.ts             # Auto-generated theme
│       ├── extraction-summary.json
│       ├── README.md
│       └── assets/              # 278 screen designs + 100 components
│
├── docs/                        # Documentation
├── App.tsx                      # App entry point (minimal)
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript config
```

## 🎯 Current Status

**✅ Completed:**
- Complete Figma design system extraction
- 278 high-fidelity screen designs (light + dark themes)
- Project structure cleanup
- Assets preserved (app icon, splash screen)
- Ready for development

**⏳ Ready to Build:**
- Implement screens from Figma designs
- Set up navigation structure
- Create reusable component library
- Integrate Supabase backend
- Implement Zustand state management
- Add testing infrastructure

## 🏗️ Development Approach

### Using the Figma Design System

1. **Reference Screen Designs**
   ```
   Light theme: src/figma-extracted/assets/screens/light-theme/
   Dark theme: src/figma-extracted/assets/screens/dark-theme/
   ```

2. **Import Theme**
   ```typescript
   import theme, { colors, typography } from './src/figma-extracted/theme';

   // Use in components
   const styles = StyleSheet.create({
     container: {
       backgroundColor: colors['Primary Background'].hex,
     },
     title: {
       ...typography['Heading 1'],
     },
   });
   ```

3. **Reference Component Images**
   ```
   Component examples: src/figma-extracted/assets/design-system/
   ```

### Build Workflow

```
1. Choose screen from Figma designs (278 available)
2. Reference design PNG in screens/ folder
3. Use theme.ts for colors and typography
4. Build screen component with React Native
5. Test in Expo
6. Commit to Git
7. Repeat
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/litmonbobby/rediscover-talk-app.git
cd rediscover-talk-app

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

## 🎨 Design System

### Color Palette

**Primary: Cobalt Blue (#004BA7)**
- Conveys trust, calm, professionalism
- Used for backgrounds, primary actions

**Accent: Lime (#C7F600)**
- Conveys energy, positivity, growth
- Used for highlights, CTAs, success states

**45 Total Colors:**
- 10 primary shades (100-900)
- 10 accent shades (100-900)
- 10 mood colors (emotional states)
- 4 semantic colors (success, warning, error, info)
- 11 UI colors (backgrounds, text, borders)

### Typography

**Font Sizes:** 12px, 14px, 17px, 20px, 28px, 34px, 48px (8px grid-based)
**Font Weights:** 400 (Regular), 600 (Semibold), 700 (Bold)
**Font Families:** Native iOS/Android system fonts

### Spacing (8px Grid)

```
xs: 4px   sm: 8px   md: 16px   lg: 24px
xl: 32px  2xl: 48px 3xl: 56px  4xl: 64px
```

### Border Radius

```
sm: 4px   base: 8px  md: 12px  lg: 16px
xl: 24px  2xl: 32px  full: 9999px
```

## 📱 Platform Support

- **iOS**: 26.0+ (latest iOS features support)
- **Android**: API 36+ (Android 16)
- **Web**: Expo web support

## 🔧 Configuration

### Expo (app.json)
- Custom app icon and splash screen
- iOS deployment target: 26.0
- Android SDK: 36
- Background audio permissions configured
- Foreground service permissions enabled

### TypeScript (tsconfig.json)
- Strict mode enabled
- Extends Expo TypeScript base

## 📚 Documentation

- `/src/figma-extracted/README.md` - Design system usage guide
- `/docs/DEVELOPMENT_WORKFLOW.md` - Development process
- `/docs/FIGMA_MCP_SETUP.md` - Figma extraction setup
- `/docs/PLATFORM_TARGETS.md` - Platform configuration
- `/docs/IOS_26_PLATFORM_GUIDE.md` - iOS 26 features
- `/docs/LIQUID_GLASS_IMPLEMENTATION.md` - Glassmorphism UI

## 🗺️ Roadmap

### Phase 1: Foundation (Current)
- ✅ Figma design system extraction
- ✅ Project structure setup
- ✅ Clean slate for development

### Phase 2: Core Screens (Next)
- [ ] Authentication flow (splash, onboarding, sign up, login)
- [ ] Home dashboard
- [ ] Navigation structure

### Phase 3: Features
- [ ] Mood tracking
- [ ] Meditation library and player
- [ ] Journaling
- [ ] Breathwork exercises
- [ ] Sleep sounds

### Phase 4: Backend Integration
- [ ] Supabase setup
- [ ] Authentication providers
- [ ] Database schema
- [ ] Real-time subscriptions

### Phase 5: State Management
- [ ] Zustand stores (app, mood, meditation, journal)
- [ ] AsyncStorage persistence
- [ ] Optimistic updates

### Phase 6: Advanced Features
- [ ] AI Coach chat
- [ ] Insights and analytics
- [ ] Affirmations
- [ ] Articles and content
- [ ] Subscription management

### Phase 7: Polish
- [ ] Dark mode implementation
- [ ] Push notifications
- [ ] Offline support
- [ ] Testing (unit, integration, E2E)
- [ ] Accessibility (WCAG 2.1 AA)

### Phase 8: Production
- [ ] App Store submission
- [ ] Play Store submission
- [ ] Analytics integration
- [ ] Crash reporting
- [ ] Privacy policy and terms

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- **Figma Design:** Mindify - AI Mental Health App UI Kit
- **Framework:** React Native and Expo communities
- **Inspiration:** Modern mental health and wellness apps
- **Research:** Mental health and wellness best practices

## 📞 Contact

Project Link: [https://github.com/litmonbobby/rediscover-talk-app](https://github.com/litmonbobby/rediscover-talk-app)

---

**Built with** React Native, Expo, and TypeScript
**Designed with** Figma (Mindify UI Kit)
**Powered by** Mental wellness principles and evidence-based practices

---

**Last Updated:** November 22, 2025
**Status:** Ready for development with complete Figma design system
**Next Step:** Build authentication screens from Figma designs
