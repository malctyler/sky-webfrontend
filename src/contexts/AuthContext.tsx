import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { login as loginService, logout as logoutService, validateToken, checkEmailConfirmation, getCurrentUser } from '../services/authService';
import { ActivityMonitor } from '../utils/activityMonitor';
import { AuthResponse } from '../types/authTypes';

// Helper function to convert AuthResponse to AuthUser
const mapAuthResponseToUser = (authResponse: AuthResponse): AuthUser => {
    return {
        email: authResponse.email,
        isCustomer: authResponse.isCustomer ?? authResponse.roles.includes('Customer'),
        customerId: authResponse.customerId ?? undefined,
        roles: authResponse.roles,
        emailConfirmed: authResponse.emailConfirmed,
        firstName: authResponse.firstName || '',
        lastName: authResponse.lastName || ''
    };
};

interface AuthUser {
    email: string;
    isCustomer: boolean;
    customerId?: string | number;
    roles: string[];
    emailConfirmed: boolean;
    firstName?: string;
    lastName?: string;
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
    const activityMonitorRef = useRef<ActivityMonitor | null>(null);    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutService();
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setUser(null);
            setLoading(false);
            
            // Destroy activity monitor on logout
            if (activityMonitorRef.current) {
                activityMonitorRef.current.destroy();
                activityMonitorRef.current = null;
            }
        }
    };    const handleLogin = async (email: string, password: string): Promise<AuthUser> => {
        setLoading(true);
        try {
            const response = await loginService(email, password);
            const user = mapAuthResponseToUser(response);
            setUser(user);
            
            // Initialize activity monitor after successful login
            if (activityMonitorRef.current) {
                activityMonitorRef.current.destroy();
            }
            
            activityMonitorRef.current = new ActivityMonitor(30, async () => {
                console.log('[AuthContext] User inactive - logging out');
                await handleLogout();
            });
            
            return user;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            if (!mounted) return;
            
            console.log('Debug: AuthContext - Starting authentication check...');
            
            try {
                setLoading(true);
                const validationResult = await validateToken();
                
                console.log('Debug: AuthContext - Validation result:', validationResult);
                
                if (!validationResult.valid || !validationResult.user) {
                    console.log('Debug: AuthContext - No valid user found, setting user to null');
                    if (mounted) {
                        setUser(null);
                        setLoading(false);
                        setInitialized(true);
                        
                        // Destroy activity monitor when not logged in
                        if (activityMonitorRef.current) {
                            activityMonitorRef.current.destroy();
                            activityMonitorRef.current = null;
                        }
                    }
                    return;
                }                console.log('Debug: AuthContext - Valid user found, setting user state');
                if (mounted) {
                    // Use the user data from the validation response
                    const user = mapAuthResponseToUser(validationResult.user);
                    setUser(user);
                    setLoading(false);
                    setInitialized(true);
                    
                    // Initialize activity monitor when logged in
                    if (activityMonitorRef.current) {
                        activityMonitorRef.current.destroy();
                    }
                    
                    activityMonitorRef.current = new ActivityMonitor(30, async () => {
                        console.log('[AuthContext] User inactive - logging out');
                        await handleLogout();
                    });
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                if (mounted) {
                    setUser(null);
                    setLoading(false);
                    setInitialized(true);
                    
                    // Destroy activity monitor on error
                    if (activityMonitorRef.current) {
                        activityMonitorRef.current.destroy();
                        activityMonitorRef.current = null;
                    }
                }
            }
        };

        if (!initialized) {
            checkAuth();
        }

        return () => { 
            mounted = false; 
            if (activityMonitorRef.current) {
                activityMonitorRef.current.destroy();
                activityMonitorRef.current = null;
            }
        };
    }, [initialized]);    const contextValue = {
        user,
        login: handleLogin,
        logout: handleLogout,
        loading,
        hasRole: (role: string) => user?.roles.includes(role) || false,
        isEmailConfirmed: () => user?.emailConfirmed || false,        refreshEmailConfirmation: async () => {
            if (!user?.email) return false;
            try {
                await checkEmailConfirmation(user.email);                // After checking email confirmation, get the updated user info
                const response = await getCurrentUser();
                if (response.emailConfirmed) {
                    const user = mapAuthResponseToUser(response);
                    setUser(user);
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
