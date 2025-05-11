import React from 'react';
import { Container, Box } from '@mui/material';

const AuthLayout = ({ children }) => (
  <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  </Container>
);

export default AuthLayout;