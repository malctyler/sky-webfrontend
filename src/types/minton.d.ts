declare module '@minton/*' {
    export * from '../themes/minton/React.js/TS/src/*';
}

declare module '@themes/*' {
    export * from '../themes/*';
}

declare module '@layouts/*' {
    export * from '../components/Layout/*';
}

declare module '@components/*' {
    export * from '../components/*';
}

declare module '@contexts/*' {
    export * from '../contexts/*';
}

declare module '@services/*' {
    export * from '../services/*';
}

declare module '@types/*' {
    export * from '../types/*';
}

declare module '../themes/minton/React.js/TS/src/context/useLayoutContext' {
    import { ReactNode } from 'react';
    
    export interface LayoutContextType {
        isMenuOpen: boolean;
        toggleMenu: () => void;
        showUserInfo: boolean;
    }

    export function useLayoutContext(): LayoutContextType;
    
    export interface LayoutProviderProps {
        children: ReactNode;
    }
    
    export function LayoutProvider(props: LayoutProviderProps): JSX.Element;
}