import React from 'react';
import { Box, Paper, Container, Typography } from '@mui/material';
import MainLayout from './MainLayout';

interface CustomerLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, title }) => {
  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Paper elevation={1} sx={{ p: 3, mt: 2 }}>
          {title && (
            <Typography variant="h4" gutterBottom component="h1">
              {title}
            </Typography>
          )}
          <Box>{children}</Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default CustomerLayout;
