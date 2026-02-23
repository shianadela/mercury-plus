import { auth } from '@/lib/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import * as WebBrowser from 'expo-web-browser';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Warm up the browser for OAuth flows
WebBrowser.maybeCompleteAuthSession();

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
  signInWithApple: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
}

// --- Constants ---

const AUTH_STORAGE_KEY = '@mercury_plus_auth_user';

// Facebook OAuth config — replace APP_ID with real value when going live
const FACEBOOK_APP_ID = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || '000000000000000';

// Google WebClient ID for Firebase OAuth credential
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '';

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

/** Convert a Firebase user to our app's User shape. */
function fromFirebaseUser(
  fbUser: import('firebase/auth').User,
  extra: Partial<User> = {}
): User {
  return {
    uid: fbUser.uid,
    email: fbUser.email || '',
    displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
    photoURL: fbUser.photoURL,
    role: 'patient',
    onboarded: false,
    healthPreferences: [],
    ...extra,
  };
}

// --- Context ---

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: listen to Firebase auth state, fall back to AsyncStorage in mock mode
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    try {
      unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          // Firebase has a real authenticated user — load any extra app data from storage
          const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
          const storedExtra: Partial<User> = stored ? JSON.parse(stored) : {};
          const appUser = fromFirebaseUser(fbUser, {
            role: storedExtra.role,
            onboarded: storedExtra.onboarded,
            healthPreferences: storedExtra.healthPreferences,
          });
          setUser(appUser);
        } else {
          // No Firebase session — check AsyncStorage for mock/demo session
          const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
          setUser(stored ? JSON.parse(stored) : null);
        }
        setLoading(false);
      });
    } catch (error) {
      // Firebase init failed — fall back to AsyncStorage only
      console.warn('Firebase auth listener failed, using AsyncStorage:', error);
      AsyncStorage.getItem(AUTH_STORAGE_KEY)
        .then((stored) => setUser(stored ? JSON.parse(stored) : null))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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

  // --- Email / Password ---

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const appUser = fromFirebaseUser(result.user);
      setUser(appUser);
      await persistUser(appUser);
    } catch (firebaseError) {
      console.warn('Firebase sign-in failed, using mock:', firebaseError);
      // Mock fallback — always succeeds for demo
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

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      setLoading(true);
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await firebaseUpdateProfile(result.user, { displayName });
        const appUser = fromFirebaseUser(result.user, { displayName, onboarded: false });
        setUser(appUser);
        await persistUser(appUser);
      } catch (firebaseError) {
        console.warn('Firebase sign-up failed, using mock:', firebaseError);
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
    },
    []
  );

  // --- Google SSO ---

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      // Dynamic import prevents crash if native module unavailable (Expo Go)
      const { GoogleSignin } = await import(
        '@react-native-google-signin/google-signin'
      );

      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;

      if (!idToken) throw new Error('No ID token returned from Google Sign-In');

      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      const appUser = fromFirebaseUser(result.user);
      setUser(appUser);
      await persistUser(appUser);
      return;
    } catch (error) {
      console.warn('Google sign-in failed, using mock:', error);
    }

    // Mock fallback
    const mockUser = createMockUser({
      uid: 'google-mock-001',
      email: 'demo.google@mercuryplus.ph',
      displayName: 'Juan Dela Cruz',
      photoURL: 'https://ui-avatars.com/api/?name=Juan+DelaCruz&background=00A86B&color=fff',
    });
    setUser(mockUser);
    await persistUser(mockUser);
    setLoading(false);
  }, []);

  // --- Apple SSO (iOS only) ---

  const signInWithApple = useCallback(async () => {
    setLoading(true);
    try {
      const AppleAuthentication = await import('expo-apple-authentication');

      const available = await AppleAuthentication.isAvailableAsync();
      if (!available) throw new Error('Apple Sign-In not available on this device');

      // Generate a cryptographic nonce (required by Firebase + Apple)
      const rawNonce = Array.from(await Crypto.getRandomBytesAsync(32))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        rawNonce
      );

      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      if (!appleCredential.identityToken)
        throw new Error('No identity token returned from Apple Sign-In');

      const provider = new OAuthProvider('apple.com');
      const firebaseCredential = provider.credential({
        idToken: appleCredential.identityToken,
        rawNonce,
      });

      const result = await signInWithCredential(auth, firebaseCredential);
      const givenName = appleCredential.fullName?.givenName;
      const familyName = appleCredential.fullName?.familyName;
      const displayName =
        givenName && familyName
          ? `${givenName} ${familyName}`
          : result.user.displayName || 'Apple User';

      const appUser = fromFirebaseUser(result.user, { displayName });
      setUser(appUser);
      await persistUser(appUser);
      return;
    } catch (error) {
      console.warn('Apple sign-in failed, using mock:', error);
    }

    // Mock fallback
    const mockUser = createMockUser({
      uid: 'apple-mock-001',
      email: 'demo.apple@mercuryplus.ph',
      displayName: 'Jose Reyes',
      photoURL: null,
    });
    setUser(mockUser);
    await persistUser(mockUser);
    setLoading(false);
  }, []);

  // --- Facebook SSO ---

  const signInWithFacebook = useCallback(async () => {
    setLoading(true);
    try {
      // Build redirect URI (scheme-based for standalone, localhost for dev)
      const redirectUri = AuthSession.makeRedirectUri();

      const fbAuthUrl =
        `https://www.facebook.com/dialog/oauth` +
        `?client_id=${FACEBOOK_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=public_profile,email` +
        `&response_type=token`;

      const result = await WebBrowser.openAuthSessionAsync(fbAuthUrl, redirectUri);

      if (result.type !== 'success') throw new Error('Facebook auth was cancelled or failed');

      // Extract access token from URL fragment
      const url = result.url;
      const params = new URLSearchParams(url.includes('#') ? url.split('#')[1] : url.split('?')[1]);
      const accessToken = params.get('access_token');

      if (!accessToken) throw new Error('No access token in Facebook redirect');

      const fbCredential = FacebookAuthProvider.credential(accessToken);
      const fbResult = await signInWithCredential(auth, fbCredential);
      const appUser = fromFirebaseUser(fbResult.user);
      setUser(appUser);
      await persistUser(appUser);
      return;
    } catch (error) {
      console.warn('Facebook sign-in failed, using mock:', error);
    }

    // Mock fallback
    const mockUser = createMockUser({
      uid: 'facebook-mock-001',
      email: 'demo.facebook@mercuryplus.ph',
      displayName: 'Ana Gonzales',
      photoURL: 'https://ui-avatars.com/api/?name=Ana+Gonzales&background=00A86B&color=fff',
    });
    setUser(mockUser);
    await persistUser(mockUser);
    setLoading(false);
  }, []);

  // --- Sign Out ---

  const signOutUser = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch {
      // Firebase sign-out failed (mock mode) — proceed anyway
    }
    setUser(null);
    await persistUser(null);
  }, []);

  // --- Profile Management ---

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
    signInWithApple,
    signInWithFacebook,
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
