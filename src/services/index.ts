/**
 * Services - Barrel Export
 *
 * Central export for all app services.
 */

// Secure Storage
export { secureStorage, type DataCategory } from './SecureStorageService';

// Export Service
export { exportService, type ExportFormat, type ExportOptions } from './ExportService';

// HealthKit Service
export { healthKitService } from './HealthKitService';

// Supabase Services
export {
  supabase,
  isSupabaseConfigured,
  authService,
  syncService,
  type AuthState,
  type SignUpData,
  type SignInData,
  type SyncStatus,
  type SyncState,
} from './supabase';

// RevenueCat Service
export {
  revenueCatService,
  ENTITLEMENT_ID,
  DEFAULT_OFFERING_ID,
  type SubscriptionStatus,
} from './RevenueCatService';

// Favorites Service
export {
  favoritesService,
  type FavoriteItem,
  type FavoriteType,
} from './FavoritesService';
