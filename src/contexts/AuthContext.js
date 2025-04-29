import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, validateToken } from '../services/authService';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                // Validate token with backend
                const result = await validateToken();
                if (!result.valid) {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await loginService(email, password);
        let customerId = undefined;
        if (response.token) {
            try {
                const decoded = jwt_decode(response.token);
                // Accept both 'CustomerId' and 'customerId' just in case
                customerId = decoded.CustomerId || decoded.customerId;
            } catch (e) {
                // ignore
            }
        }
        const userData = {
            email: response.email,
            token: response.token,
            isCustomer: response.isCustomer,
            customerId // may be undefined if not present
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

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
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