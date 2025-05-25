import { createContext, useContext, useState, useEffect } from 'react';
import * as jwt from 'jwt-decode';
import { login as loginService, logout as logoutService, validateToken, checkEmailConfirmation } from '../services/authService';

interface AuthUser {
    email: string;
    token: string;
    isCustomer: boolean;
    customerId?: string | number;
    roles: string[];
    emailConfirmed: boolean;
}

interface JwtClaims {
    CustomerId?: string | string[];
    EmailConfirmed?: string;
    role?: string | string[];
    roles?: string | string[];
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"?: string | string[];
    [key: string]: any;
}

interface DecodedToken extends JwtClaims {
    exp: number;
    iss: string;
    aud: string;
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
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [initialized, setInitialized] = useState<boolean>(false);

    const extractCustomerId = (decoded: DecodedToken): string | undefined => {
        if (!decoded.CustomerId) return undefined;
        // If it's an array, take the last value (most recent)
        const id = Array.isArray(decoded.CustomerId) 
            ? decoded.CustomerId[decoded.CustomerId.length - 1]
            : decoded.CustomerId;
        return id;
    };

    const getRolesFromToken = (decoded: DecodedToken): string[] => {
        const roleKeys = [
            'role',
            'roles',
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'
        ];
        
        for (const key of roleKeys) {
            if (key in decoded) {
                const roles = decoded[key];
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
                if (!storedUser) return;

                const parsedUser = JSON.parse(storedUser);
                if (!parsedUser?.token) {
                    localStorage.removeItem('user');
                    return;
                }

                try {
                    await validateToken();
                    if (!mounted) return;

                    const decoded = jwt.jwtDecode<DecodedToken>(parsedUser.token);
                    const roles = getRolesFromToken(decoded);
                    const customerId = extractCustomerId(decoded);
                    
                    const user = {
                        ...parsedUser,
                        roles,
                        customerId: customerId ? parseInt(customerId as string, 10) : undefined,
                        emailConfirmed: decoded.EmailConfirmed === 'True'
                    };

                    // Update localStorage with cleaned data
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                } catch (error) {
                    if (!mounted) return;
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('user');
                    setUser(null);
                }
            } catch (error) {
                if (!mounted) return;
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
        return () => { mounted = false; };
    }, []);

    const contextValue = {
        user,
        login: async (email: string, password: string) => {
            setLoading(true);
            try {
                const response = await loginService(email, password);
                const decoded = jwt.jwtDecode<DecodedToken>(response.token);
                const roles = getRolesFromToken(decoded);
                const customerId = extractCustomerId(decoded);
                
                const newUser = {
                    ...response,
                    roles,
                    customerId: customerId ? parseInt(customerId as string, 10) : undefined,
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
