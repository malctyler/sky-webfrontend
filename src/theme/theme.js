import { createTheme } from '@mui/material/styles';

// Light theme colors from Minton
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0056c1',
      light: '#4f82d1',
      dark: '#003b85',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d',
      light: '#868e96',
      dark: '#495057',
      contrastText: '#ffffff',
    },
    success: {
      main: '#1abc9c',
      light: '#4fd2b3',
      dark: '#128269',
      contrastText: '#ffffff',
    },
    info: {
      main: '#00bcd4',
      light: '#33c9dc',
      dark: '#008394',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffc107',
      light: '#ffcd39',
      dark: '#b28704',
      contrastText: '#000000',
    },
    error: {
      main: '#e74856',
      light: '#eb6b77',
      dark: '#a1323c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#323a46',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.25rem',
      fontWeight: 500,
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 500,
      lineHeight: 1.1,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.1,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.1,
    },
    h5: {
      fontSize: '0.9375rem',
      fontWeight: 500,
      lineHeight: 1.1,
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.1,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '0.45rem 0.9rem',
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.5,
          borderRadius: '0.25rem',
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.25rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.25rem',
          },
        },
      },
    },
  },
});

// Dark theme colors from Minton
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66b3ff',
      light: '#99cbff',
      dark: '#4f82d1',
      contrastText: '#000000',
    },
    secondary: {
      main: '#6c757d',
      light: '#868e96',
      dark: '#495057',
      contrastText: '#ffffff',
    },
    background: {
      default: '#282c34',
      paper: '#1a1e24',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '0.45rem 0.9rem',
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.5,
          borderRadius: '0.25rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export { lightTheme, darkTheme };