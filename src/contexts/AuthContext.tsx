import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, logout as logoutService, validateToken, checkEmailConfirmation } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

interface AuthUser {
    email: string;
    token: string;
    isCustomer: boolean;
    customerId?: string | number;
    roles: string[];
    emailConfirmed: boolean;
}

interface DecodedToken {    customerId?: string | number;
    EmailConfirmed?: string;
    role?: string | string[];
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string | string[];
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'?: string | string[];
    [key: string]: any;
}

interface AuthContextType {
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<AuthUser>;
    logout: () => Promise<void>;
    loading: boolean;
    hasRole: (role: string) => boolean;
    isEmailConfirmed: () => boolean;
    refreshEmailConfirmation: () => Promise<boolean>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getRolesFromToken = (decoded: DecodedToken): string[] => {
        const roleKeys = [
            'role',
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'
        ];
        
        for (const key of roleKeys) {
            if (key in decoded) {
                const roles = decoded[key];
                // If roles is an array, return it, otherwise wrap it in an array
                return Array.isArray(roles) ? roles : [roles];
            }
        }
        return [];
    };

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                let parsedUser: AuthUser = JSON.parse(storedUser);
                if (parsedUser.token) {
                    try {
                        const decoded = jwtDecode<DecodedToken>(parsedUser.token);
                        // Get user roles and email confirmation status from token
                        parsedUser.roles = getRolesFromToken(decoded);
                        parsedUser.customerId = decoded.customerId;
                        parsedUser.emailConfirmed = decoded.EmailConfirmed === 'True';

                        // Check if email is now confirmed
                        if (!parsedUser.emailConfirmed) {
                            const confirmationStatus = await checkEmailConfirmation(parsedUser.email);
                            if (confirmationStatus.token) {
                                // Update user with new token and status
                                parsedUser = {
                                    ...parsedUser,
                                    token: confirmationStatus.token,
                                    emailConfirmed: true
                                };
                            }
                        }
                    } catch (e) {
                        console.error('Error decoding token:', e);
                        parsedUser.roles = [];
                    }
                }
                setUser(parsedUser);
                // Validate token with backend
                const result = await validateToken();
                if (!result.valid) {
                    setUser(null);
                    localStorage.removeItem('user');
                } else {
                    // Update localStorage with possibly updated user data
                    localStorage.setItem('user', JSON.stringify(parsedUser));
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const refreshEmailConfirmation = async (): Promise<boolean> => {
        if (user?.email) {
            try {
                const confirmationStatus = await checkEmailConfirmation(user.email);
                if (confirmationStatus.token) {
                    const updatedUser: AuthUser = {
                        ...user,
                        token: confirmationStatus.token,
                        emailConfirmed: true
                    };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    return true;
                }
            } catch (error) {
                console.error('Error refreshing email confirmation status:', error);
            }
        }
        return false;
    };

    const login = async (email: string, password: string): Promise<AuthUser> => {
        const response = await loginService(email, password);
        let customerId: string | number | undefined = undefined;
        let roles: string[] = [];
        let emailConfirmed = false;

        if (response.token) {
            try {
                const decoded = jwtDecode<DecodedToken>(response.token);
                roles = getRolesFromToken(decoded);
                customerId = decoded.customerId;
                emailConfirmed = decoded.EmailConfirmed === 'True';
            } catch (e) {
                console.error('Error decoding token:', e);
            }
        }
        const userData: AuthUser = {
            email: response.email,
            token: response.token,
            isCustomer: response.isCustomer,
            customerId,
            roles,
            emailConfirmed
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const logout = async (): Promise<void> => {
        await logoutService();
        setUser(null);
        localStorage.removeItem('user');
    };

    const hasRole = (role: string): boolean => {
        return user?.roles?.includes(role) || false;
    };

    const isEmailConfirmed = (): boolean => {
        return user?.emailConfirmed || false;
    };

    const contextValue: AuthContextType = {
        user,
        login,
        logout,
        loading,
        hasRole,
        isEmailConfirmed,
        refreshEmailConfirmation
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
