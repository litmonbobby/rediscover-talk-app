# Platform Targets & Requirements

## 📱 Target Platforms

### iOS
- **Minimum:** iOS 26.0
- **Target:** iOS 26.1 (latest as of Nov 2025)
- **Design System:** Liquid Glass
- **Required Processor:** Apple A13 Bionic or newer

### Android
- **Minimum:** Android 8.0 (API 26)
- **Target:** Android 16 (API 36 - "Baklava")
- **Compile SDK:** 36
- **Released:** June 10, 2025

---

## 🔧 Development Requirements

### Node.js
- **Minimum:** Node.js 20.19.4
- **Package Manager:** npm 10.8.2+

### iOS Development
- **Xcode:** 16.1 or higher
- **macOS:** Latest version supporting Xcode 16.1
- **iOS Simulator:** iOS 26.0 runtime

### Android Development
- **Android SDK:** API 36 (Android 16)
- **Build Tools:** Latest version
- **Gradle:** 8.x

---

## 📦 Framework Versions

### Core
- **Expo SDK:** 54.0.24
- **React Native:** 0.81.5
- **React:** 19.1.0
- **TypeScript:** 5.9.2

### Key Dependencies
- **react-native-reanimated:** 4.x (New Architecture)
- **react-native-worklets:** Latest
- **@supabase/supabase-js:** 2.39.0+
- **zustand:** 4.5.0+
- **react-navigation:** 6.x

---

## 🎨 Design System Compatibility

### iOS 26 - Liquid Glass
- Translucent UI elements
- Glass-like refraction
- Motion-responsive design
- Depth and layering

### Android 16 - Material Design
- Live Activities support
- Enhanced multitasking
- Foldable/large screen optimization
- Advanced camera controls

---

## 🔄 Version Alignment

### Apple's New Numbering (2025+)
iOS versions now use **calendar-based** numbering:
- iOS 26 = September 2025 - September 2026
- iOS 27 (expected) = September 2026 - September 2027

### Android Traditional Numbering
Android continues sequential versioning:
- Android 16 = API Level 36 (2025)
- Android 17 (expected) = API Level 37 (2026)

---

## ⚙️ App Configuration

### iOS (app.json)
```json
{
  "ios": {
    "deploymentTarget": "26.0",
    "bundleIdentifier": "com.rediscovertalk.app",
    "infoPlist": {
      "UIBackgroundModes": ["audio"]
    }
  }
}
```

### Android (app.json)
```json
{
  "android": {
    "compileSdkVersion": 36,
    "targetSdkVersion": 36,
    "minSdkVersion": 26,
    "package": "com.rediscovertalk.app"
  }
}
```

---

## 📊 Device Support Matrix

### iOS Devices (iOS 26+)
✅ iPhone 11 and newer
✅ iPhone SE (2nd gen and newer)
❌ iPhone XS, XS Max, XR (dropped)

### Android Devices (API 26+)
✅ Android 8.0 Oreo (2017) and newer
✅ ~90% of active Android devices (2025)

---

## 🚀 Performance Targets

### iOS
- **Launch Time:** <2s cold start, <1s warm start
- **Memory:** <200MB average, <350MB peak
- **Frame Rate:** 60fps minimum, 120fps ProMotion support
- **Battery:** <5% drain per hour (background audio)

### Android
- **Launch Time:** <3s cold start, <1.5s warm start
- **Memory:** <250MB average, <400MB peak
- **Frame Rate:** 60fps minimum
- **Battery:** <6% drain per hour (background audio)

---

**Last Updated:** November 17, 2025
**Document Version:** 1.0
