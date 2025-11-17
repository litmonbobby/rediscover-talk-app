# Development Workflow

## 🔄 Iterative Development Process

### Workflow Cycle
```
Build 2-3 Screens → Commit to GitHub → Test in Expo → Fix Issues → Repeat
```

---

## 📱 Development Phases

### **Phase 2: Authentication & Onboarding**
**Screens (3):**
1. Splash Screen - Logo animation, blue gradient background
2. Onboarding Screens - 3 slides with swiper
3. Sign Up Screen - Email/social login with Supabase

**Testing Checkpoint:** After these 3 screens

### **Phase 3: Core Navigation & Home**
**Screens (3):**
1. Login Screen - Authentication flow
2. Goal Selection - User interests/goals
3. Home Dashboard - Mood widget, quick actions

**Testing Checkpoint:** After home is functional

### **Phase 4: Mood Tracking**
**Screens (3):**
1. Mood Check-In Modal - Emoji selector, note input
2. Mood History - Calendar/list view
3. Meditation Library - Grid of meditation categories

**Testing Checkpoint:** After mood tracking works

### **Phase 5: Advanced Features**
**Screens (3):**
1. Meditation Player - Circular timer, audio controls
2. Breathing Exercise - Animated breathing circle
3. Journal Entry List - Journal cards with mood tags

**Testing Checkpoint:** After meditation and journal work

### **Phase 6: Profile & Insights**
**Screens (2):**
1. Profile/Settings - User profile, app settings
2. Progress/Insights - Charts, analytics, achievements

**Final Testing:** Complete app test with all flows

---

## 🧪 Testing Protocol

### After Each Phase:

**1. Build the App:**
```bash
cd /Users/bobbylitmon/Desktop/"React Native App"/rediscover-talk
npm start
```

**2. Test on iOS Simulator:**
- Press `i` to open iOS simulator
- Navigate through new screens
- Test all interactions
- Check for errors

**3. Verify Functionality:**
- [ ] Screens render correctly
- [ ] Navigation works
- [ ] Colors match design (#004BA7, #C7F600)
- [ ] Fonts are readable
- [ ] Buttons are clickable
- [ ] No console errors

**4. Fix Issues:**
- Address any bugs found
- Adjust styling if needed
- Test again

**5. Commit to GitHub:**
```bash
git add .
git commit -m "feat: Phase X - [screens built]"
git push origin main
```

---

## 📊 Quality Checklist (Per Phase)

### Visual Quality
- [ ] Blue + Lime color palette applied
- [ ] Liquid Glass effects (if applicable)
- [ ] Proper spacing (8px grid)
- [ ] Typography hierarchy correct
- [ ] Shadows and gradients match

### Functionality
- [ ] Navigation flows work
- [ ] User inputs validated
- [ ] Error states handled
- [ ] Loading states shown
- [ ] Success feedback displayed

### Performance
- [ ] Screens load quickly (<1s)
- [ ] Animations smooth (60fps)
- [ ] No memory leaks
- [ ] Proper cleanup on unmount

---

## 🔧 Testing Commands

### Start Development Server
```bash
npm start
```

### Run on iOS Simulator
```bash
npm run ios
```

### Run on Android Emulator
```bash
npm run android
```

### Clear Cache (if issues)
```bash
npx expo start --clear
```

---

## 📝 Commit Message Format

### Format
```
feat: Phase X - [Feature/Screens]

Screens Implemented:
- ✅ Screen 1 Name
- ✅ Screen 2 Name
- ✅ Screen 3 Name

Features:
- Feature description
- Feature description

Testing:
- Tested on iOS Simulator
- All navigation flows work
- [Any issues found and fixed]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Example
```
feat: Phase 2 - Authentication & Onboarding

Screens Implemented:
- ✅ Splash Screen with logo animation
- ✅ Onboarding (3 slides with swiper)
- ✅ Sign Up with Supabase auth

Features:
- Blue gradient splash screen
- Swipeable onboarding slides
- Email/social login integration
- Form validation

Testing:
- Tested on iOS 26 Simulator
- All screens render correctly
- Navigation transitions smooth

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 🐛 Common Issues & Solutions

### "Metro bundler won't start"
```bash
# Kill existing processes
npx kill-port 8081
npx expo start --clear
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### "iOS Simulator won't open"
```bash
# Open Xcode first
open -a Simulator
# Then run
npm run ios
```

### "Styles not updating"
```bash
# Force refresh in Expo
Press 'r' in terminal
```

---

## 📈 Progress Tracking

Track progress using GitHub commits:
- Each phase = 1 commit
- Each commit = 2-3 screens
- Each commit = tested and working

**View progress:**
```bash
git log --oneline
```

---

## ✅ Current Status

- [x] Phase 1: Project foundation (COMPLETED)
- [ ] Phase 2: Auth & Onboarding (3 screens)
- [ ] Phase 3: Navigation & Home (3 screens)
- [ ] Phase 4: Mood Tracking (3 screens)
- [ ] Phase 5: Advanced Features (3 screens)
- [ ] Phase 6: Profile & Insights (2 screens)

---

**Last Updated:** November 17, 2025
**Current Phase:** Phase 2 (Starting)
**Next Checkpoint:** After authentication screens
