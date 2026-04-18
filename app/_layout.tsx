import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppFonts } from '@/hooks/useAppFonts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loaded = useAppFonts();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F8F3EA' } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="detail"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="friends"
            options={{
              presentation: 'modal',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="confirm"
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="filter"
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
