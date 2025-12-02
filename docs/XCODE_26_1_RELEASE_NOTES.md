# Xcode 26.1 Release Notes & Command Line Tools Reference

> Last Updated: December 2, 2025
>
> This document provides comprehensive information about Xcode 26.1 (Public Release) and its Command Line Tools for developer reference.

## Overview

| Property | Value |
|----------|-------|
| **Version** | Xcode 26.1.1 (Build 17B100) |
| **Release Date** | November 11, 2025 |
| **Swift Version** | Swift 6.2.1 |
| **Minimum macOS** | macOS Sequoia 15.6 or later |
| **Download** | [Mac App Store](https://apps.apple.com/app/xcode/id497799835) / [Apple Developer](https://developer.apple.com/xcode/) |

## Release Timeline

| Version | Date | Type |
|---------|------|------|
| Xcode 26 Beta | June 9, 2025 | WWDC Announcement |
| Xcode 26.0 | September 15, 2025 | Public Release |
| Xcode 26.0.1 | October 2025 | Bug Fix |
| Xcode 26.1.1 | November 11, 2025 | Current Stable |
| Xcode 26.2 Beta | December 2025 | In Beta |

## Key Features in Xcode 26

### AI-Powered Coding Intelligence

Xcode 26 introduces revolutionary AI-assisted development:

- **Automatic Programming**: GitHub Copilot-like code completion and generation
- **Chat Query Tools**: AI-assisted actions accessible from anywhere in the codebase
- **ChatGPT Integration**: Default AI provider (can be changed to local models or other cloud APIs)
- **Local Model Support**: Use on-device Foundation Models for privacy-conscious development
- **Cloud API Support**: Connect to third-party AI providers via API keys

### Performance Improvements

- **~30-40% Faster Builds**: New caching system significantly reduces build times
- **Foundation Models On-Device**: Apple's on-device AI for code assistance
- **Enhanced SwiftUI**: Latest SwiftUI improvements and performance optimizations
- **Swift 6.2.1**: Latest Swift compiler with performance enhancements

## Xcode 26.1.1 Bug Fixes (20+ Developer Pain Points)

### Coding Intelligence Fixes

| Issue | Fix |
|-------|-----|
| Memory usage with large Git repos | Improved memory footprint of Coding Assistant |
| Coding tools unavailable | Fixed tools becoming unavailable in source editor |
| Incorrect line numbers | Fixed "find text in file" tool returning wrong line numbers |
| ChatGPT performance | Fixed performance issues when assistant applies code changes |

### Instruments Improvements

| Feature | Description |
|---------|-------------|
| SwiftUI View Updates | Skipped updates now explicitly marked as "Skipped Update" |
| Token Counts | Fixed Foundation Models Instrument showing incorrect token counts |
| Crash Fix | Fixed crash when processing SwiftUI trace of running apps |

### Additional Bug Fixes

- **Background Indexing**: Fixed indexing not completing for some projects
- **CallKit**: Various fixes
- **Interface Builder**: Stability improvements
- **Localization**: Bug fixes for localization workflows
- **Previews**: SwiftUI Preview fixes
- **Simulator**: Boot and runtime fixes
- **Swift Packages**: Package resolution improvements
- **Swift Testing**: Testing framework fixes
- **Xcode Cloud**: Cloud build improvements

## Command Line Tools

### Installation

```bash
# Install Command Line Tools
xcode-select --install

# Verify installation
xcode-select -p
# Output: /Applications/Xcode.app/Contents/Developer

# Check CLT version
brew config | grep "CLT"
# Output: CLT: 26.1.0.0.1.1761104275
```

### Installation Location

Command Line Tools install to: `/Library/Developer/CommandLineTools`

### New devicectl Commands

Xcode 26.1.1 introduces new device management capabilities:

```bash
# Capture full system diagnostic from connected device
xcrun devicectl device sysdiagnose

# List connected devices
xcrun devicectl device list

# Get device info
xcrun devicectl device info --device <UDID>
```

### Essential CLI Commands

```bash
# Build project from command line
xcodebuild -project MyProject.xcodeproj -scheme MyScheme -configuration Debug

# Build for simulator
xcodebuild -project MyProject.xcodeproj -scheme MyScheme -destination 'platform=iOS Simulator,name=iPhone 16'

# Run tests
xcodebuild test -project MyProject.xcodeproj -scheme MyScheme -destination 'platform=iOS Simulator,name=iPhone 16'

# Archive for distribution
xcodebuild archive -project MyProject.xcodeproj -scheme MyScheme -archivePath build/MyApp.xcarchive

# Clean build folder
xcodebuild clean -project MyProject.xcodeproj -scheme MyScheme
```

### Simulator Management

```bash
# List available simulators
xcrun simctl list devices

# Boot a simulator
xcrun simctl boot "iPhone 16 Pro"

# Install app on simulator
xcrun simctl install booted MyApp.app

# Launch app on simulator
xcrun simctl launch booted com.example.myapp

# Take screenshot
xcrun simctl io booted screenshot screenshot.png

# Record video
xcrun simctl io booted recordVideo video.mov
```

### Fix for Simulator Boot Issues

If simulators fail to boot after upgrading macOS:

```bash
# Run this command before booting simulator
xcrun simctl runtime dyld _cache update --all
```

## Known Issues

### 1. Simulator Boot Failure After macOS Upgrade

**Issue**: Simulators may fail to boot during the first build after upgrading macOS.

**Workaround**:
```bash
xcrun simctl runtime dyld _cache update --all
```

### 2. Address Sanitizer Incompatibility

**Issue**: Address Sanitizer is currently incompatible with hardware memory tagging.

**Workaround**: Disable hardware memory tagging when running with Address Sanitizer.

## Supported SDKs

| Platform | SDK Version |
|----------|-------------|
| iOS | 26.0 |
| iPadOS | 26.0 |
| macOS | 26.0 (Sequoia) |
| watchOS | 12.0 |
| tvOS | 19.0 |
| visionOS | 3.0 |

## App Store Submission Requirements

> **Important**: Starting **April 2026**, Apple requires all App Store submissions to use Xcode 26 and the iOS 26 SDK.

## React Native / Expo Compatibility

For React Native and Expo projects targeting iOS 26:

```json
// app.json
{
  "expo": {
    "ios": {
      "deploymentTarget": "26.0",
      "infoPlist": {
        "UIBackgroundModes": ["audio", "fetch", "remote-notification"]
      }
    }
  }
}
```

### Building with Xcode 26

```bash
# Ensure Xcode 26 is selected
sudo xcode-select -s /Applications/Xcode.app

# Clean and rebuild
cd ios && rm -rf build && pod install && cd ..

# Build with Expo
npx expo run:ios --device
```

## Useful Resources

- [Xcode 26 Release Notes - Apple Developer](https://developer.apple.com/documentation/xcode-release-notes/xcode-26-release-notes)
- [Xcode 26.1.1 Release Notes - Apple Developer](https://developer.apple.com/documentation/xcode-release-notes/xcode-26_1-release-notes)
- [What's New in Xcode - Apple Developer](https://developer.apple.com/xcode/whats-new/)
- [Xcode Resources - Apple Developer](https://developer.apple.com/xcode/resources/)
- [iOS 26 Developer Guide](https://www.index.dev/blog/ios-26-developer-guide)
- [Xcode Releases Tracker](https://xcodereleases.com/)

## Version History

### Xcode 26.1.1 (November 11, 2025)
- Swift 6.2.1 support
- 20+ bug fixes for developer pain points
- Coding Intelligence improvements
- devicectl sysdiagnose command
- Instruments SwiftUI tracking improvements

### Xcode 26.0 (September 15, 2025)
- Initial public release
- AI-powered Coding Intelligence
- ChatGPT integration
- Foundation Models support
- 30-40% build time improvements

---

## Sources

- [Xcode 26 Release Notes - Apple Developer Documentation](https://developer.apple.com/documentation/xcode-release-notes/xcode-26-release-notes)
- [Xcode 26.1.1 Release Notes - Apple Developer Documentation](https://developer.apple.com/documentation/xcode-release-notes/xcode-26_1-release-notes)
- [Apple releases Xcode 26.1.1 - 9to5Mac](https://9to5mac.com/2025/11/11/apple-releases-xcode-26-1-1-with-coding-intelligence-improvements/)
- [Xcode - Wikipedia](https://en.wikipedia.org/wiki/Xcode)
- [Xcode Releases](https://xcodereleases.com/)
