# 📱 RSSB HealthPay - APK Build Guide

## 🚀 Convert to Android APK

### 1️⃣ Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### 2️⃣ Initialize Capacitor
```bash
npx cap init "RSSB HealthPay" "rw.gov.rssb.healthpay"
```

### 3️⃣ Add Android Platform
```bash
npx cap add android
```

### 4️⃣ Build & Sync
```bash
npm run build
npx cap copy android
npx cap sync android
```

### 5️⃣ Open in Android Studio
```bash
npx cap open android
```

## 📋 Prerequisites
- Node.js 16+
- Android Studio
- Java JDK 11+
- Android SDK

## 🎯 APK Features Included
✅ Offline-ready PWA
✅ Native splash screen
✅ Status bar styling
✅ Hardware back button
✅ App icons & metadata
✅ Government-grade security

## 📦 Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Android APK
npm run build:android

# Run on device
npm run android
```

## 🔧 Configuration
- App ID: `rw.gov.rssb.healthpay`
- App Name: `RSSB HealthPay`
- Theme: Blue (#3B82F6)
- Target: Android 7.0+ (API 24+)

## 📱 APK Output
Final APK location: `android/app/build/outputs/apk/debug/app-debug.apk`