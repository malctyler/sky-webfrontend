import React, { ReactNode } from 'react';
import { LayoutProvider as MintonLayoutProvider } from '../themes/minton/React.js/TS/src/context/useLayoutContext';

interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  return (
    <MintonLayoutProvider>
      {children}
    </MintonLayoutProvider>
  );
}

export { useLayoutContext } from '../themes/minton/React.js/TS/src/context/useLayoutContext';
