import React from 'react';
import { Box, Container, IconButton, useTheme as useMuiTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

function AuthLayout({ children }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #282c34 0%, #1a1e24 100%)'
          : 'linear-gradient(180deg, #f8f9fa 0%, #f0f0f0 100%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: theme => theme.palette.mode === 'dark' ? 'white' : 'inherit',
          }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 8,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}

export default AuthLayout;