import { setCookie, getCookie, removeCookie } from './cookieUtils';

const AUTH_TOKEN_COOKIE = 'auth_token';
const USER_INFO_COOKIE = 'user_info';
const TOKEN_KEY = 'auth_token'; // For localStorage fallback

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
        return payload.exp > currentTime;
    } catch {
        return false;
    }
};

export const getAuthToken = (): string | null => {
    // For Azure Static Web Apps, use localStorage since cross-domain cookies don't work reliably
    if (isAzureStaticWebApp()) {
        const token = localStorage.getItem(TOKEN_KEY);
        console.log('Debug: Getting token from localStorage (Azure Static Web Apps):', !!token);
        return token;
    }
    
    // For same-domain scenarios, try cookie first, then localStorage as fallback
    let token = getCookie(AUTH_TOKEN_COOKIE);
    if (!token) {
        token = localStorage.getItem(TOKEN_KEY);
        console.log('Debug: Getting token from localStorage (fallback):', !!token);
    } else {
        console.log('Debug: Getting token from cookie:', !!token);
    }
    return token;
};

export const setAuthToken = (token: string) => {
    if (isAzureStaticWebApp()) {
        // For Azure Static Web Apps, use localStorage
        localStorage.setItem(TOKEN_KEY, token);
        console.log('Debug: Storing token in localStorage (Azure Static Web Apps)');
    } else {
        // For same-domain scenarios, use both cookie and localStorage
        setCookie(AUTH_TOKEN_COOKIE, token);
        localStorage.setItem(TOKEN_KEY, token);
        console.log('Debug: Storing token in both cookie and localStorage');
    }
};

export const removeAuthToken = () => {
    // Always clean up both storage mechanisms
    removeCookie(AUTH_TOKEN_COOKIE);
    localStorage.removeItem(TOKEN_KEY);
    console.log('Debug: Removed token from both cookie and localStorage');
};

export const getUserInfo = () => {
    const userInfo = getCookie(USER_INFO_COOKIE);
    return userInfo ? JSON.parse(userInfo) : null;
};

export const setUserInfo = (userInfo: any) => {
    setCookie(USER_INFO_COOKIE, JSON.stringify(userInfo));
};

export const removeUserInfo = () => {
    removeCookie(USER_INFO_COOKIE);
};

export const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};
