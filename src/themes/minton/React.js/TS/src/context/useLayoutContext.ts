import { createContext, useContext } from 'react';

export interface LayoutContextType {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    showUserInfo: boolean;
}

const LayoutContext = createContext<LayoutContextType>({
    isMenuOpen: false,
    toggleMenu: () => {},
    showUserInfo: true
});

export const useLayoutContext = () => useContext(LayoutContext);