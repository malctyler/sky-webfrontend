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

interface DecodedToken {
    CustomerId?: string | number;
    customerId?: string | number;
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
    // Initialize loading as true so we show loading state immediately
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [initialized, setInitialized] = useState<boolean>(false);

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
        let mounted = true;

        const checkAuth = async () => {
            if (!mounted) return;
            
            try {
                const storedUser = localStorage.getItem('user');
                
                if (!storedUser) {
                    // Not an error case - just no user logged in
                    return;
                }

                const parsedUser = JSON.parse(storedUser);
                if (!parsedUser?.token) {
                    // Invalid data - clear it
                    localStorage.removeItem('user');
                    return;
                }

                // Validate token
                try {
                    await validateToken();
                    if (!mounted) return;

                    // Token is valid, decode and set user state
                    const decoded = jwtDecode<DecodedToken>(parsedUser.token);
                    const roles = getRolesFromToken(decoded);
                    
                    setUser({
                        ...parsedUser,
                        roles,
                        customerId: decoded.CustomerId || decoded.customerId,
                        emailConfirmed: decoded.EmailConfirmed === 'True'
                    });
                } catch (error) {
                    // Token validation failed - clear stored data
                    if (!mounted) return;
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('user');
                    setUser(null);
                }
            } catch (error) {
                if (!mounted) return;
                // JSON parse error or other unexpected error
                console.error('Auth check failed:', error);
                localStorage.removeItem('user');
                setUser(null);
            } finally {
                if (mounted) {
                    setLoading(false);
                    setInitialized(true);
                }
            }
        };

        checkAuth();

        return () => {
            mounted = false;
        };
    }, []);

    const contextValue = {
        user,
        login: async (email: string, password: string) => {
            setLoading(true);
            try {
                const response = await loginService(email, password);
                const decoded = jwtDecode<DecodedToken>(response.token);
                const roles = getRolesFromToken(decoded);
                const newUser = {
                    ...response,
                    roles,
                    customerId: decoded.CustomerId || decoded.customerId,
                    emailConfirmed: decoded.EmailConfirmed === 'True'
                };
                localStorage.setItem('user', JSON.stringify(newUser));
                setUser(newUser);
                return newUser;
            } finally {
                setLoading(false);
            }
        },
        logout: async () => {
            setLoading(true);
            try {
                await logoutService();
            } catch (error) {
                console.error('Error during logout:', error);
            } finally {
                setUser(null);
                localStorage.removeItem('user');
                setLoading(false);
            }
        },
        loading,
        hasRole: (role: string) => user?.roles.includes(role) || false,
        isEmailConfirmed: () => user?.emailConfirmed || false,
        refreshEmailConfirmation: async () => {
            if (!user?.email) return false;
            try {
                const response = await checkEmailConfirmation(user.email);
                if (response.token) {
                    const updatedUser = { ...user, token: response.token, emailConfirmed: true };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    return true;
                }
            } catch (error) {
                console.error('Error checking email confirmation:', error);
            }
            return false;
        }
    };

    // Only render children after initial auth check is complete
    if (!initialized) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                backgroundColor: 'var(--background-default)',
                gap: '16px'
            }}>
                <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    border: '4px solid rgba(0, 0, 0, 0.1)', 
                    borderTopColor: 'var(--primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <div>Checking authentication...</div>
                <style>
                    {`
                        @keyframes spin {
                            to {
                                transform: rotate(360deg);
                            }
                        }
                    `}
                </style>
            </div>
        );
    }

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
