/**
 * Supabase Services - Barrel Export
 */

export { supabase, isSupabaseConfigured } from './client';
export { authService, type AuthState, type SignUpData, type SignInData } from './AuthService';
export { syncService, type SyncStatus, type SyncState } from './SyncService';
export * from './types';
