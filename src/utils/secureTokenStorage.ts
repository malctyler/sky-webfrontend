import CryptoJS from 'crypto-js';

interface StoredTokenData {
  token: string;
  refreshToken?: string;
  userInfo?: any;
  fingerprint: string;
  timestamp: number;
  expiresAt?: number;
}

export class SecureTokenStorage {
  private readonly storageKey = 'sky_auth_data';
  private readonly encryptionKey: string;
  private readonly fingerprint: string;

  constructor() {
    this.encryptionKey = this.generateEncryptionKey();
    this.fingerprint = this.generateBrowserFingerprint();
  }

  private generateEncryptionKey(): string {
    // Generate a key based on browser characteristics and session
    const browserData = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset().toString(),
      window.location.origin
    ].join('|');
    
    return CryptoJS.SHA256(browserData + 'sky_auth_salt_2025').toString();
  }  private generateBrowserFingerprint(): string {
    let canvasFingerprint = 'no-canvas';
    
    // Safely generate canvas fingerprint (fallback for test environments)
    try {
      // Check if we're in a test environment
      if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
        canvasFingerprint = 'test-canvas-fingerprint';
      } else {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.textBaseline = 'top';
          ctx.font = '14px Arial';
          ctx.fillText('Browser fingerprint', 2, 2);
          canvasFingerprint = canvas.toDataURL();
        }
      }
    } catch (error) {
      // Canvas not available (e.g., in test environment)
      console.debug('[SecureTokenStorage] Canvas fingerprinting not available:', error);
      canvasFingerprint = 'fallback-canvas-fingerprint';
    }

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      !!window.sessionStorage,
      !!window.localStorage,
      !!window.indexedDB,
      typeof(Worker),
      navigator.platform,
      navigator.cookieEnabled,
      canvasFingerprint
    ].join('|');

    return CryptoJS.SHA256(fingerprint).toString().substring(0, 32);
  }

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public storeTokens(token: string, refreshToken?: string, userInfo?: any, expiresAt?: number): void {
    try {
      const data: StoredTokenData = {
        token,
        refreshToken,
        userInfo,
        fingerprint: this.fingerprint,
        timestamp: Date.now(),
        expiresAt
      };

      const encryptedData = this.encrypt(JSON.stringify(data));
      localStorage.setItem(this.storageKey, encryptedData);

      console.log('[SecureTokenStorage] Tokens stored securely');
    } catch (error) {
      console.error('[SecureTokenStorage] Failed to store tokens:', error);
      throw new Error('Failed to store authentication data securely');
    }
  }

  public getTokens(): { token: string | null; refreshToken: string | null; userInfo: any; expiresAt: number | null } {
    try {
      const encryptedData = localStorage.getItem(this.storageKey);
      if (!encryptedData) {
        return { token: null, refreshToken: null, userInfo: null, expiresAt: null };
      }

      const decryptedData = this.decrypt(encryptedData);
      const data: StoredTokenData = JSON.parse(decryptedData);

      // Verify browser fingerprint
      if (data.fingerprint !== this.fingerprint) {
        console.warn('[SecureTokenStorage] Browser fingerprint mismatch - clearing tokens');
        this.clearTokens();
        return { token: null, refreshToken: null, userInfo: null, expiresAt: null };
      }

      // Check if data is too old (24 hours max storage)
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      if (Date.now() - data.timestamp > maxAge) {
        console.warn('[SecureTokenStorage] Stored data is too old - clearing tokens');
        this.clearTokens();
        return { token: null, refreshToken: null, userInfo: null, expiresAt: null };
      }

      // Check token expiration
      if (data.expiresAt && Date.now() >= data.expiresAt) {
        console.warn('[SecureTokenStorage] Token has expired - clearing tokens');
        this.clearTokens();
        return { token: null, refreshToken: null, userInfo: null, expiresAt: null };
      }

      return {
        token: data.token,
        refreshToken: data.refreshToken || null,
        userInfo: data.userInfo || null,
        expiresAt: data.expiresAt || null
      };
    } catch (error) {
      console.error('[SecureTokenStorage] Failed to retrieve tokens:', error);
      this.clearTokens();
      return { token: null, refreshToken: null, userInfo: null, expiresAt: null };
    }
  }

  public getToken(): string | null {
    return this.getTokens().token;
  }

  public getRefreshToken(): string | null {
    return this.getTokens().refreshToken;
  }

  public getUserInfo(): any {
    return this.getTokens().userInfo;
  }

  public clearTokens(): void {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('[SecureTokenStorage] Tokens cleared');
    } catch (error) {
      console.error('[SecureTokenStorage] Failed to clear tokens:', error);
    }
  }
  public updateUserInfo(userInfo: any): void {
    const currentData = this.getTokens();
    if (currentData.token) {
      this.storeTokens(
        currentData.token, 
        currentData.refreshToken || undefined, 
        userInfo, 
        currentData.expiresAt || undefined
      );
    }
  }

  public isTokenValid(): boolean {
    const { token, expiresAt } = this.getTokens();
    if (!token) return false;
    if (expiresAt && Date.now() >= expiresAt) return false;
    return true;
  }

  public getFingerprint(): string {
    return this.fingerprint;
  }
  // Method to handle token refresh
  public updateTokens(newToken: string, newRefreshToken?: string, newExpiresAt?: number): void {
    const currentData = this.getTokens();
    this.storeTokens(
      newToken, 
      newRefreshToken || currentData.refreshToken || undefined, 
      currentData.userInfo, 
      newExpiresAt
    );
  }
}

// Singleton instance
export const secureTokenStorage = new SecureTokenStorage();
