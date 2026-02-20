import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Types ---

export type UserRole = 'patient' | 'caregiver';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: UserRole;
  onboarded: boolean;
  healthPreferences: string[];
}

export interface ProfileUpdateData {
  displayName?: string;
  photoURL?: string | null;
  role?: UserRole;
  healthPreferences?: string[];
}

export interface OnboardingData {
  role: UserRole;
  healthPreferences: string[];
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
}

// --- Constants ---

const AUTH_STORAGE_KEY = '@mercury_plus_auth_user';

// --- Mock helpers ---

function createMockUser(overrides: Partial<User> = {}): User {
  return {
    uid: 'mock-user-001',
    email: 'demo@mercuryplus.ph',
    displayName: 'Juan Dela Cruz',
    photoURL: null,
    role: 'patient',
    onboarded: false,
    healthPreferences: [],
    ...overrides,
  };
}

// --- Context ---

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load persisted user on mount
  useEffect(() => {
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    try {
      const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load stored auth user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function persistUser(userData: User | null) {
    try {
      if (userData) {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Failed to persist auth user:', error);
    }
  }

  const signIn = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    try {
      // Mock: always succeed. Create user based on email.
      const mockUser = createMockUser({
        email,
        displayName: email.split('@')[0].replace(/[._]/g, ' '),
      });
      setUser(mockUser);
      await persistUser(mockUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      // Mock: sign in with a Google-style mock user
      const mockUser = createMockUser({
        uid: 'google-mock-001',
        email: 'demo.google@mercuryplus.ph',
        displayName: 'Maria Santos',
        photoURL: 'https://ui-avatars.com/api/?name=Maria+Santos&background=00A86B&color=fff',
      });
      setUser(mockUser);
      await persistUser(mockUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, _password: string, displayName: string) => {
    setLoading(true);
    try {
      const mockUser = createMockUser({
        uid: `user-${Date.now()}`,
        email,
        displayName,
        onboarded: false,
      });
      setUser(mockUser);
      await persistUser(mockUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setUser(null);
    await persistUser(null);
  }, []);

  const updateProfile = useCallback(async (data: ProfileUpdateData) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      persistUser(updated);
      return updated;
    });
  }, []);

  const completeOnboarding = useCallback(async (data: OnboardingData) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated: User = {
        ...prev,
        role: data.role,
        healthPreferences: data.healthPreferences,
        displayName: data.displayName || prev.displayName,
        onboarded: true,
      };
      persistUser(updated);
      return updated;
    });
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut: signOutUser,
    updateProfile,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
