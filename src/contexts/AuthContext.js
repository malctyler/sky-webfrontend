import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await loginService(email, password);
        const userData = {
            email: response.email,
            token: response.token,
            isCustomer: response.isCustomer
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