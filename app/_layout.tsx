import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/AuthContext';
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
