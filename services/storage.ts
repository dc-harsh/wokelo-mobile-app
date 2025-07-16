import * as SecureStore from 'expo-secure-store';

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

export class StorageService {
  static async storeTokenData(tokenData: Omit<TokenData, 'expires_at'>): Promise<void> {
    const expiresAt = Date.now() + (tokenData.expires_in * 1000);
    const dataWithExpiry: TokenData = {
      ...tokenData,
      expires_at: expiresAt,
    };

    await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN_DATA, JSON.stringify(dataWithExpiry));
    await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token);
    await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, tokenData.refresh_token);
  }

  static async getTokenData(): Promise<TokenData | null> {
    try {
      const tokenDataString = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN_DATA);
      if (!tokenDataString) return null;

      const tokenData: TokenData = JSON.parse(tokenDataString);
      return tokenData;
    } catch (error) {
      console.error('Error retrieving token data:', error);
      return null;
    }
  }

  static async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  }

  static async isTokenValid(): Promise<boolean> {
    const tokenData = await this.getTokenData();
    if (!tokenData) return false;

    const now = Date.now();
    const buffer = 5 * 60 * 1000; // 5 minutes buffer
    
    return tokenData.expires_at > (now + buffer);
  }

  static async clearTokenData(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN_DATA),
      SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
    ]);
  }

  static async isAuthenticated(): Promise<boolean> {
    const tokenData = await this.getTokenData();
    return tokenData !== null && await this.isTokenValid();
  }
}