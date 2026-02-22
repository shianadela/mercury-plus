import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ReminderProvider } from '@/context/ReminderContext';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const MercuryTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00A86B',
    background: '#F8FAFB',
    card: '#FFFFFF',
    text: '#1A1A2E',
    border: '#E5E7EB',
  },
};

/** Watches auth state and redirects to the correct route. */
function AuthGate() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user) {
      // Not authenticated — send to login
      if (!inAuthGroup) router.replace('/(auth)/login');
    } else if (!user.onboarded) {
      // Authenticated but hasn't completed onboarding
      if (segments[1] !== 'onboarding') router.replace('/(auth)/onboarding');
    } else {
      // Fully authenticated — redirect away from auth screens
      if (inAuthGroup) router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  return null;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <ReminderProvider>
          <ThemeProvider value={MercuryTheme}>
            <AuthGate />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="prescription"
                options={{
                  headerShown: false,
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="store"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="checkout"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="chat"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="reminders"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="scanner"
                options={{ headerShown: false, presentation: 'modal' }}
              />
              <Stack.Screen
                name="promotions"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="support"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
          </ThemeProvider>
        </ReminderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
