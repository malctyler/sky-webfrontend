import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';

interface ThemeContextType {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDarkMode: true,
});

const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
          background: {
            default: grey[100],
            paper: grey[50],
          },
        }
      : {
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: grey[900],
            paper: grey[800],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const themeColorMode = useMemo<ThemeContextType>(
    () => ({
      toggleTheme: () => {
        setIsDarkMode((prevMode) => !prevMode);
      },
      isDarkMode,
    }),
    [isDarkMode]
  );

  const muiTheme = useMemo<Theme>(
    () => createTheme(getDesignTokens(isDarkMode ? 'dark' : 'light')),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={themeColorMode}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
