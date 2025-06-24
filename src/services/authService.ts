import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { 
    RegisterData,
    AuthResponse,
    EmailConfirmationResponse,
    ChangePasswordData
} from '../types/authTypes';
import { setAuthToken, removeAuthToken, getAuthToken, setUserInfo, removeUserInfo, isTokenValid } from '../utils/authUtils';
import { PasswordSecurity } from '../utils/passwordSecurity';

// Temporary migration login function
export const loginForMigration = async (email: string, password: string): Promise<AuthResponse> => {
    console.log('Debug: Starting migration login (old endpoint)');
    
    const response = await apiClient.post<AuthResponse>(`/Auth/login`, { email, password });
    
    console.log('Debug: Migration login response received');
    
    // Store token using our improved auth utils
    if (response.data.token) {
        console.log('Debug: Migration login successful, storing token');
        setAuthToken(response.data.token, undefined, response.data);
    }
    
    // Store user info in state
    setUserInfo(response.data);
    
    return response.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    console.log('Debug: Starting secure login process');
    console.log('Debug: Current time (local):', new Date().toString());
    console.log('Debug: Current time (UTC):', new Date().toISOString());
    console.log('Debug: Timezone offset (minutes):', new Date().getTimezoneOffset());
    
    // Log existing cookies before login
    console.log('Debug: Cookies before login:', document.cookie);
    
    // Create secure login payload with hashed password
    const securePayload = PasswordSecurity.createSecureLoginPayload(email, password);
    console.log('Debug: Created secure login payload (password hidden)');
    
    const response = await apiClient.post<AuthResponse>(`/Auth/secure-login`, securePayload);
    
    console.log('Debug: Login response received:', {
        hasToken: !!response.data.token,
        tokenLength: response.data.token?.length || 0,
        email: response.data.email
    });
    
    // Decode and log the token details
    if (response.data.token) {
        try {
            const payload = JSON.parse(atob(response.data.token.split('.')[1]));
            const expDate = new Date(payload.exp * 1000);
            console.log('Debug: Token payload:', {
                exp: payload.exp,
                expUTC: expDate.toISOString(),
                expLocal: expDate.toString(),
                issuedAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : 'N/A'
            });
        } catch (e) {
            console.log('Debug: Could not decode token:', e);
        }
    }
    
    // Log cookies after login response
    console.log('Debug: Cookies after login response:', document.cookie);
      // Store token using our improved auth utils (handles Azure Static Web Apps vs same-domain)
    if (response.data.token) {
        console.log('Debug: Login response contains token, storing it');
        setAuthToken(response.data.token, undefined, response.data);
        
        // Log cookies after setting token
        console.log('Debug: Cookies after setAuthToken:', document.cookie);
    }
    
    // Store user info in state
    setUserInfo(response.data);
    
    return response.data;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`/Auth/register`, userData);
      // Store token and user info
    if (response.data.token) {
        setAuthToken(response.data.token, undefined, response.data);
    }
    setUserInfo(response.data);
    
    return response.data;
};

export const logout = async (): Promise<void> => {
    try {
        await apiClient.post<void>(`/Auth/logout`);
    } catch (error) {
        // If we get a 401, that's fine - the token is already invalid
        if ((error as AxiosError)?.response?.status !== 401) {
            throw error;
        }
    } finally {
        // Always clear the token and user info on logout
        removeAuthToken();
        removeUserInfo();
    }
};

export const validateToken = async (): Promise<{ valid: boolean; user?: AuthResponse }> => {
    try {
        console.log('Debug: Starting token validation...');
        
        // Check if we have a token
        const token = getAuthToken();
        if (!token) {
            console.log('Debug: No token found for validation');
            return { valid: false };
        }
        
        console.log('Debug: Token found, checking if valid...');
        
        // Check if token is structurally valid and not expired
        if (!isTokenValid(token)) {
            console.log('Debug: Token found but invalid or expired');
            removeAuthToken();
            removeUserInfo();
            return { valid: false };
        }
        
        console.log('Debug: Token is valid, attempting server validation');        try {
            // Try to get current user (this will use the Authorization header)
            const user = await getCurrentUser();
            console.log('Debug: Server validation successful, user:', user);
            return {
                valid: true,
                user: user // getCurrentUser now returns AuthResponse directly
            };
        } catch (serverError) {
            console.error('Debug: Server validation failed:', serverError);
              // For Azure Static Web Apps, if server validation fails but token is locally valid,
            // we can try to extract user info from the token itself
            if (window.location.hostname.includes('azurestaticapps.net')) {
                console.log('Debug: Azure Static Web App detected, trying token-based user info');
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    console.log('Debug: JWT payload:', payload);
                    
                    const userFromToken = {
                        token: token,
                        expiration: new Date(payload.exp * 1000).toISOString(),
                        email: payload.email || payload[Object.keys(payload).find(k => k.includes('email')) || ''],
                        firstName: payload[Object.keys(payload).find(k => k.includes('givenname')) || ''] || '',
                        lastName: payload[Object.keys(payload).find(k => k.includes('surname')) || ''] || '',
                        roles: Array.isArray(payload.role) ? payload.role : 
                               payload[Object.keys(payload).find(k => k.includes('role')) || ''] ? 
                               [payload[Object.keys(payload).find(k => k.includes('role')) || '']] : [],
                        isCustomer: payload.IsCustomer === 'True' || payload.IsCustomer === true || 
                                   (payload.role && (Array.isArray(payload.role) ? 
                                    payload.role.includes('Customer') : payload.role === 'Customer')),
                        emailConfirmed: payload.EmailConfirmed === 'True' || payload.EmailConfirmed === true,
                        customerId: payload.CustomerId ? parseInt(payload.CustomerId) : null
                    };
                    console.log('Debug: Successfully extracted user from token:', userFromToken);
                    return {
                        valid: true,
                        user: userFromToken
                    };
                } catch (tokenParseError) {
                    console.error('Debug: Failed to parse user info from token:', tokenParseError);
                    throw serverError; // Fall back to original error
                }
            } else {
                throw serverError; // Not Azure Static Web App, re-throw original error
            }
        }
    } catch (error) {
        console.error('Token validation error:', error);
        removeAuthToken(); // Clear invalid token
        removeUserInfo(); // Clear user info
        return { valid: false };
    }
};

export const checkEmailConfirmation = async (email: string): Promise<EmailConfirmationResponse> => {
    const response = await apiClient.get<EmailConfirmationResponse>(`/Auth/check-email-confirmation/${email}`);
    return response.data;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
    const response = await apiClient.get<AuthResponse>('/auth/current');
    return response.data;
};

export const changePassword = async (passwordData: ChangePasswordData): Promise<void> => {
    await apiClient.post('/Auth/change-password', passwordData);
};
