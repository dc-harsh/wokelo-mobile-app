import Constants from 'expo-constants';

interface LoginCredentials {
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

const API_BASE_URL = 'https://apitest.wokelo.ai';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<TokenResponse> {
    const grantType = Constants.expoConfig?.extra?.grantType || process.env.GRANT_TYPE || 'password';
    const clientId = Constants.expoConfig?.extra?.clientId || process.env.CLIENT_ID;
    const clientSecret = Constants.expoConfig?.extra?.clientSecret || process.env.CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('OAuth credentials not configured. Please set CLIENT_ID and CLIENT_SECRET environment variables.');
    }

    console.log('Logging in with credentials:', {
      email: credentials.email,
      grantType,
      clientId,
    });

    let payload = new FormData();
    payload.append('username', credentials.email);
    payload.append('password', credentials.password);
    payload.append('grant_type', grantType);
    payload.append('client_id', clientId);
    payload.append('client_secret', clientSecret);

    try {

      const requestOptions = {
        method: "POST",
        body: payload,
        redirect: "follow"
      };

      const response = await fetch("https://apitest.wokelo.ai/api/token/", requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error_description || errorData.error || 'Login failed');
      }

      const tokenData: TokenResponse = await response.json();
      
      if (!tokenData.access_token) {
        throw new Error('Invalid response from server');
      }

      return tokenData;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  static async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const grantType = 'refresh_token';
    const clientId = Constants.expoConfig?.extra?.clientId || process.env.CLIENT_ID;
    const clientSecret = Constants.expoConfig?.extra?.clientSecret || process.env.CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('OAuth credentials not configured');
    }

    const payload = new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: grantType,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await fetch(`${API_BASE_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error_description || errorData.error || 'Token refresh failed');
    }

    return await response.json();
  }
}