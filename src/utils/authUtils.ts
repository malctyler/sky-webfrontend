import { setCookie, getCookie, removeCookie } from './cookieUtils';
import { secureTokenStorage } from './secureTokenStorage';

const AUTH_TOKEN_COOKIE = 'auth_token';
const USER_INFO_COOKIE = 'user_info';

// Check if we're running on Azure Static Web Apps
const isAzureStaticWebApp = () => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname.includes('azurestaticapps.net') || 
           window.location.hostname.includes('wonderfulbay-');
};

// Check if a JWT token is valid (not expired)
export const isTokenValid = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        const currentTimeDate = new Date().toISOString();
        const expDate = new Date(payload.exp * 1000).toISOString();
        
        console.log('Debug: Token validation check:');
        console.log('Debug: Current time (Unix):', currentTime);
        console.log('Debug: Current time (ISO):', currentTimeDate);
        console.log('Debug: Token exp (Unix):', payload.exp);
        console.log('Debug: Token exp (ISO):', expDate);
        console.log('Debug: Token is valid:', payload.exp > currentTime);
        
        return payload.exp > currentTime;
    } catch (error) {
        console.log('Debug: Token validation failed with error:', error);
        return false;
    }
};

export const getAuthToken = (): string | null => {
    console.log('Debug: Getting auth token...');
    console.log('Debug: Current hostname:', window.location.hostname);
    console.log('Debug: Is Azure Static Web App:', isAzureStaticWebApp());
    console.log('Debug: All cookies:', document.cookie);
    
    // For Azure Static Web Apps, use secure storage since cross-domain cookies don't work reliably
    if (isAzureStaticWebApp()) {
        const token = secureTokenStorage.getToken();
        console.log('Debug: Getting token from secure storage (Azure Static Web Apps):', !!token, token?.length || 0);
        return token;
    }
    
    // For same-domain scenarios, try cookie first, then secure storage as fallback
    let token = getCookie(AUTH_TOKEN_COOKIE);
    if (!token) {
        token = secureTokenStorage.getToken();
        console.log('Debug: Getting token from secure storage (fallback):', !!token, token?.length || 0);
    } else {
        console.log('Debug: Getting token from cookie:', !!token, token?.length || 0);
    }
    return token;
};

export const setAuthToken = (token: string, refreshToken?: string, userInfo?: any) => {
    console.log('Debug: Setting auth token...');
    console.log('Debug: Token length:', token.length);
    console.log('Debug: Current hostname:', window.location.hostname);
    console.log('Debug: Is Azure Static Web App:', isAzureStaticWebApp());
    
    // Calculate token expiration
    let expiresAt: number | undefined;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        expiresAt = payload.exp * 1000; // Convert to milliseconds
    } catch (error) {
        console.warn('Debug: Could not parse token expiration:', error);
    }
    
    if (isAzureStaticWebApp()) {
        // For Azure Static Web Apps, use secure storage
        secureTokenStorage.storeTokens(token, refreshToken, userInfo, expiresAt);
        console.log('Debug: Storing token in secure storage (Azure Static Web Apps)');
        console.log('Debug: Cookies after secure storage set:', document.cookie);
    } else {
        // For same-domain scenarios, use both cookie and secure storage
        setCookie(AUTH_TOKEN_COOKIE, token);
        secureTokenStorage.storeTokens(token, refreshToken, userInfo, expiresAt);
        console.log('Debug: Storing token in both cookie and secure storage');
        console.log('Debug: Cookies after setCookie:', document.cookie);
    }
};

export const removeAuthToken = () => {
    // Always clean up both storage mechanisms
    removeCookie(AUTH_TOKEN_COOKIE);
    secureTokenStorage.clearTokens();
    console.log('Debug: Removed token from both cookie and secure storage');
};

export const getUserInfo = () => {
    // Try secure storage first for Azure Static Web Apps
    if (isAzureStaticWebApp()) {
        return secureTokenStorage.getUserInfo();
    }
    
    // For same-domain scenarios, try cookie first, then secure storage
    const userInfo = getCookie(USER_INFO_COOKIE);
    if (userInfo) {
        try {
            return JSON.parse(userInfo);
        } catch (error) {
            console.warn('Failed to parse user info from cookie:', error);
        }
    }
    
    return secureTokenStorage.getUserInfo();
};

export const setUserInfo = (userInfo: any) => {
    if (isAzureStaticWebApp()) {
        // For Azure Static Web Apps, update user info in secure storage
        secureTokenStorage.updateUserInfo(userInfo);
    } else {
        // For same-domain scenarios, use both cookie and secure storage
        setCookie(USER_INFO_COOKIE, JSON.stringify(userInfo));
        secureTokenStorage.updateUserInfo(userInfo);
    }
};

export const removeUserInfo = () => {
    removeCookie(USER_INFO_COOKIE);
    // User info is cleared when tokens are cleared
};

export const getAuthHeaders = (): Record<string, string> => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};
