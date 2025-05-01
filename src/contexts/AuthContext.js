import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, validateToken } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                let parsedUser = JSON.parse(storedUser);
                if (parsedUser.token) {
                    try {
                        const decoded = jwtDecode(parsedUser.token);
                        // Get user roles from token
                        parsedUser.roles = decoded.role || [];
                        if (typeof parsedUser.roles === 'string') {
                            parsedUser.roles = [parsedUser.roles];
                        }
                        parsedUser.customerId = decoded.CustomerId || decoded.customerId;
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
                    // Update localStorage in case roles were missing before
                    localStorage.setItem('user', JSON.stringify(parsedUser));
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await loginService(email, password);
        let customerId = undefined;
        let roles = [];
        if (response.token) {
            try {
                const decoded = jwtDecode(response.token);
                // Get roles from token
                roles = decoded.role || [];
                if (typeof roles === 'string') {
                    roles = [roles];
                }
                customerId = decoded.CustomerId || decoded.customerId;
            } catch (e) {
                console.error('Error decoding token:', e);
            }
        }
        const userData = {
            email: response.email,
            token: response.token,
            isCustomer: response.isCustomer,
            customerId,
            roles
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const logout = async () => {
        await logoutService();
        setUser(null);
        localStorage.removeItem('user');
    };

    const hasRole = (role) => {
        return user?.roles?.includes(role) || false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};