import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { SplashScreen } from '@/components/SplashScreen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StorageService } from '@/services/storage';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isAuthenticated = await StorageService.isAuthenticated();
        
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        router.replace('/login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    if (!showSplash) {
      checkAuthStatus();
    }
  }, [showSplash]);

  if (showSplash) {
    return (
      <SplashScreen 
        onFinish={() => setShowSplash(false)} 
      />
    );
  }
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="list" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
