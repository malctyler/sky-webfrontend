declare module '../themes/minton/React.js/TS/src/context/useLayoutContext' {
    import { ReactNode } from 'react';
    
    export interface LayoutContextType {
        // Add any context properties here
    }

    export function useLayoutContext(): LayoutContextType;
    
    export interface LayoutProviderProps {
        children: ReactNode;
    }
    
    export function LayoutProvider(props: LayoutProviderProps): JSX.Element;
}