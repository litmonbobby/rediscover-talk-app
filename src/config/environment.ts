/**
 * Environment Configuration
 * Production-ready environment settings for Rediscover Talk
 */

// Environment detection
const isDevelopment = __DEV__;
const isProduction = !__DEV__;

// API Configuration
export const API_CONFIG = {
  // Supabase Configuration
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-supabase-anon-key',

  // RevenueCat Configuration
  REVENUECAT_API_KEY_IOS: isProduction
    ? 'appl_YOUR_PRODUCTION_KEY' // Replace with production key
    : 'test_XxXxIIMMZYGKSXxHuEKbVexCKXI', // Test/sandbox key
  REVENUECAT_API_KEY_ANDROID: isProduction
    ? 'goog_YOUR_PRODUCTION_KEY' // Replace with production key
    : 'test_XxXxIIMMZYGKSXxHuEKbVexCKXI', // Test/sandbox key
};

// Feature Flags
export const FEATURES = {
  ENABLE_ANALYTICS: isProduction,
  ENABLE_CRASH_REPORTING: isProduction,
  ENABLE_DEBUG_LOGS: isDevelopment,
  ENABLE_MOCK_DATA: isDevelopment,
};

// App Constants
export const APP_CONFIG = {
  APP_NAME: 'Rediscover Talk',
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  BUNDLE_ID: 'com.rediscovertalk.app',

  // Support
  SUPPORT_EMAIL: 'support@rediscovertalk.com',
  PRIVACY_POLICY_URL: 'https://rediscovertalk.com/privacy',
  TERMS_OF_SERVICE_URL: 'https://rediscovertalk.com/terms',

  // App Store
  APP_STORE_ID: 'YOUR_APP_STORE_ID',
  PLAY_STORE_ID: 'com.rediscovertalk.app',
};

// Subscription Configuration
export const SUBSCRIPTION_CONFIG = {
  ENTITLEMENT_ID: 'premium',
  OFFERING_ID: 'default',

  // Product IDs (must match App Store Connect / Play Console)
  PRODUCTS: {
    MONTHLY: 'com.rediscovertalk.premium.monthly',
    YEARLY: 'com.rediscovertalk.premium.yearly',
  },
};

// Logging utility
export const logger = {
  log: (...args: any[]) => {
    if (FEATURES.ENABLE_DEBUG_LOGS) {
      console.log('[RediscoverTalk]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (FEATURES.ENABLE_DEBUG_LOGS) {
      console.warn('[RediscoverTalk]', ...args);
    }
  },
  error: (...args: any[]) => {
    // Always log errors
    console.error('[RediscoverTalk]', ...args);
  },
};

export default {
  isDevelopment,
  isProduction,
  API_CONFIG,
  FEATURES,
  APP_CONFIG,
  SUBSCRIPTION_CONFIG,
  logger,
};
