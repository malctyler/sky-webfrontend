import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import InspectionDueDates from '../Inspection/InspectionDueDates';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <Paper sx={{ 
        p: 4,
        mb: 3,
        backgroundColor: theme => isDarkMode ? theme.palette.grey[900] : theme.palette.background.paper
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Sky Application
          </Typography>
          <Typography variant="body1">
            Below you can find an overview of upcoming inspections and their status.
          </Typography>
        </Box>
      </Paper>
      <InspectionDueDates />
    </>
  );
};

export default Home;