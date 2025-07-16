import { LoginForm } from '@/components/LoginForm';
import { AuthService } from '@/services/auth';
import { StorageService } from '@/services/storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', { email, password });
      const tokenData = await AuthService.login({ email, password });
      await StorageService.storeTokenData(tokenData);
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      Alert.alert('Login Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm 
      onLogin={handleLogin}
      isLoading={isLoading}
    />
  );
}