import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';

const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkMode: true,
});

// Function to get theme design tokens
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
          background: {
            default: grey[100], // Lighter background for content
            paper: grey[50],    // Slightly darker for paper elements like AppBar/Drawer
          },
        }
      : {
          // Palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: grey[900], // Darker background for content
            paper: grey[800],    // Slightly lighter for paper elements
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
  // You can add other theme customizations here (spacing, breakpoints, components overrides etc.)
});

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const themeColorMode = useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkMode((prevMode) => !prevMode);
      },
      isDarkMode,
    }),
    [isDarkMode]
  );

  const muiTheme = useMemo(() => createTheme(getDesignTokens(isDarkMode ? 'dark' : 'light')), [isDarkMode]);

  return (
    <ThemeContext.Provider value={themeColorMode}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() { // This is the hook MainLayout calls (aliased as useCustomTheme)
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}