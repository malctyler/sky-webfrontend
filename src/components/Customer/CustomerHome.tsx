import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <Paper sx={{ 
      p: 4,
      minHeight: '200px',
      backgroundColor: theme => isDarkMode ? theme.palette.grey[900] : theme.palette.background.paper
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Sky Application
        </Typography>
        <Typography variant="body1">
          Please use the navigation menu on the left to access different sections of the application.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Home;