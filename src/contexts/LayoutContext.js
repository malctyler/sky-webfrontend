import React from 'react';
import { LayoutProvider as MintonLayoutProvider } from '../themes/minton/React.js/JS/src/context/useLayoutContext';

export function LayoutProvider({ children }) {
  return (
    <MintonLayoutProvider>
      {children}
    </MintonLayoutProvider>
  );
}

export { useLayoutContext } from '../themes/minton/React.js/JS/src/context/useLayoutContext';