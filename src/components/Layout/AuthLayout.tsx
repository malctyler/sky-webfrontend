import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

// This component is kept for backward compatibility but shouldn't be used anymore
const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  console.log('AuthLayout is deprecated and should not be used');
  
  // Just render children or Outlet without any layout
  return (
    <Box sx={{ display: 'none' }}>
      {/* This component is deprecated */}
      {children || <Outlet />}
    </Box>
  );
};

export default AuthLayout;
