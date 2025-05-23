import { type ReactNode } from 'react';
// Using require instead of import for the minton layout due to type issues
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useLayoutContext, LayoutProvider: MintonLayoutProvider } = require('../themes/minton/React.js/TS/src/context/useLayoutContext');

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

export { useLayoutContext };
