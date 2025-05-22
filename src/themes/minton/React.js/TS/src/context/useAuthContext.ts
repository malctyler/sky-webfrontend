import { createContext, useContext } from 'react';

export interface AuthContextType {
    isAuthenticated: boolean;
    user: any; // Replace with your user type
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null
});

export const useAuthContext = () => useContext(AuthContext);