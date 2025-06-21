import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, validateToken, checkEmailConfirmation, getCurrentUser } from '../services/authService';

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
    const [initialized, setInitialized] = useState<boolean>(false);    useEffect(() => {
        let mounted = true;        const checkAuth = async () => {
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
                    }
                    return;
                }

                console.log('Debug: AuthContext - Valid user found, setting user state');
                if (mounted) {
                    // Use the user data from the validation response
                    setUser(validationResult.user);
                    setLoading(false);
                    setInitialized(true);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                if (mounted) {
                    setUser(null);
                    setLoading(false);
                    setInitialized(true);
                }
            }
        };

        if (!initialized) {
            checkAuth();
        }

        return () => { mounted = false; };
    }, [initialized]);

    const contextValue = {
        user,        login: async (email: string, password: string) => {
            setLoading(true);
            try {
                const response = await loginService(email, password);
                setUser(response);
                return response;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
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

                setLoading(false);
            }
        },
        loading,
        hasRole: (role: string) => user?.roles.includes(role) || false,
        isEmailConfirmed: () => user?.emailConfirmed || false,        refreshEmailConfirmation: async () => {
            if (!user?.email) return false;
            try {
                await checkEmailConfirmation(user.email);
                // After checking email confirmation, get the updated user info
                const response = await getCurrentUser();
                if (response.data.emailConfirmed) {
                    setUser(response.data);
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
