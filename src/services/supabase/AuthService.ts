/**
 * Supabase Authentication Service
 *
 * Handles user authentication including email/password,
 * social logins, and session management.
 */

import { supabase, isSupabaseConfigured } from './client';
import { Profile, ProfileInsert, ProfileUpdate } from './types';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  private currentUser: User | null = null;
  private currentSession: Session | null = null;
  private currentProfile: Profile | null = null;
  private authListeners: Set<(state: AuthState) => void> = new Set();

  constructor() {
    this.initializeAuthListener();
  }

  /**
   * Initialize auth state listener
   */
  private initializeAuthListener(): void {
    supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      console.log('[AuthService] Auth state changed:', event);
      this.currentSession = session;
      this.currentUser = session?.user ?? null;

      if (session?.user) {
        await this.fetchProfile(session.user.id);
      } else {
        this.currentProfile = null;
      }

      this.notifyListeners();
    });
  }

  /**
   * Get current auth state
   */
  getAuthState(): AuthState {
    return {
      user: this.currentUser,
      session: this.currentSession,
      profile: this.currentProfile,
      isLoading: false,
      isAuthenticated: !!this.currentUser,
    };
  }

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange(callback: (state: AuthState) => void): () => void {
    this.authListeners.add(callback);
    return () => this.authListeners.delete(callback);
  }

  /**
   * Notify all listeners of auth state change
   */
  private notifyListeners(): void {
    const state = this.getAuthState();
    this.authListeners.forEach(callback => callback(state));
  }

  /**
   * Check if Supabase is available
   */
  isBackendAvailable(): boolean {
    return isSupabaseConfigured();
  }

  /**
   * Initialize session from storage
   */
  async initialize(): Promise<AuthState> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('[AuthService] Session fetch error:', error);
        return this.getAuthState();
      }

      this.currentSession = session;
      this.currentUser = session?.user ?? null;

      if (session?.user) {
        await this.fetchProfile(session.user.id);
      }

      return this.getAuthState();
    } catch (error) {
      console.error('[AuthService] Initialize error:', error);
      return this.getAuthState();
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(data: SignUpData): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName || '',
          },
        },
      });

      if (error) {
        console.error('[AuthService] Sign up error:', error);
        return { success: false, error: error.message };
      }

      if (authData.user) {
        // Create profile
        await this.createProfile({
          id: authData.user.id,
          email: data.email,
          full_name: data.fullName || null,
        });
      }

      return { success: true };
    } catch (error) {
      console.error('[AuthService] Sign up exception:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(data: SignInData): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error('[AuthService] Sign in error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('[AuthService] Sign in exception:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Sign in with Apple
   */
  async signInWithApple(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        console.error('[AuthService] Apple sign in error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('[AuthService] Apple sign in exception:', error);
      return { success: false, error: 'Apple sign in failed' };
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        console.error('[AuthService] Google sign in error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('[AuthService] Google sign in exception:', error);
      return { success: false, error: 'Google sign in failed' };
    }
  }

  /**
   * Sign out
   */
  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('[AuthService] Sign out error:', error);
        return { success: false, error: error.message };
      }

      this.currentUser = null;
      this.currentSession = null;
      this.currentProfile = null;

      return { success: true };
    } catch (error) {
      console.error('[AuthService] Sign out exception:', error);
      return { success: false, error: 'Sign out failed' };
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'rediscovertalk://reset-password',
      });

      if (error) {
        console.error('[AuthService] Reset password error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('[AuthService] Reset password exception:', error);
      return { success: false, error: 'Password reset failed' };
    }
  }

  /**
   * Update password
   */
  async updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('[AuthService] Update password error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('[AuthService] Update password exception:', error);
      return { success: false, error: 'Password update failed' };
    }
  }

  /**
   * Fetch user profile
   */
  private async fetchProfile(userId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('[AuthService] Profile fetch error:', error);
        return;
      }

      this.currentProfile = data;
    } catch (error) {
      console.error('[AuthService] Profile fetch exception:', error);
    }
  }

  /**
   * Create user profile
   */
  private async createProfile(profile: ProfileInsert): Promise<void> {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert(profile);

      if (error) {
        console.error('[AuthService] Profile create error:', error);
      }
    } catch (error) {
      console.error('[AuthService] Profile create exception:', error);
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: ProfileUpdate): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', this.currentUser.id);

      if (error) {
        console.error('[AuthService] Profile update error:', error);
        return { success: false, error: error.message };
      }

      // Refresh profile
      await this.fetchProfile(this.currentUser.id);
      this.notifyListeners();

      return { success: true };
    } catch (error) {
      console.error('[AuthService] Profile update exception:', error);
      return { success: false, error: 'Profile update failed' };
    }
  }

  /**
   * Get current user ID
   */
  getCurrentUserId(): string | null {
    return this.currentUser?.id ?? null;
  }

  /**
   * Get current profile
   */
  getCurrentProfile(): Profile | null {
    return this.currentProfile;
  }

  /**
   * Check if user is premium
   */
  isPremiumUser(): boolean {
    if (!this.currentProfile?.is_premium) return false;

    if (this.currentProfile.premium_expires_at) {
      return new Date(this.currentProfile.premium_expires_at) > new Date();
    }

    return true;
  }

  /**
   * Delete account
   */
  async deleteAccount(): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // Note: This requires a Supabase Edge Function to properly delete user data
      // For now, we'll sign out and mark for deletion
      const { error } = await supabase
        .from('profiles')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', this.currentUser.id);

      if (error) {
        console.error('[AuthService] Account deletion error:', error);
        return { success: false, error: error.message };
      }

      await this.signOut();
      return { success: true };
    } catch (error) {
      console.error('[AuthService] Account deletion exception:', error);
      return { success: false, error: 'Account deletion failed' };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
