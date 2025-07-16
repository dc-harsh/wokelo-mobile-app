import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface TokenData {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
  expires_at: number;
}

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_DATA: 'token_data',
} as const;

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export class StorageService {
  static async storeTokenData(tokenData: TokenResponse): Promise<void> {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token);
    } else { // mobile
      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token);
    }
}

  static async isAuthenticated(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    return !!accessToken;
  }

  static async getAccessToken(): Promise<string | null> {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } else { // mobile
      return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    }
  }

  static async clearTokenData(): Promise<void> {
    // await Promise.all([
    //   SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN_DATA),
    //   SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
    //   SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
    // ]);
    if (Platform.OS === 'web') {
      await Promise.all([AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)]);
    } else { // mobile
      await Promise.all([SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN)]);
    }
  }
}