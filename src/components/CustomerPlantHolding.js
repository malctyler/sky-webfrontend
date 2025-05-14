import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { baseUrl } from '../config';
import { Box, Card, CardContent, Typography, Grid, Container } from '@mui/material';

function CustomerPlantHolding() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.customerId) {
      fetchHoldings(user.customerId);
    }
  }, [user]);

  const fetchHoldings = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/PlantHolding/customer/${customerId}`, {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch plant holdings');
      
      const data = await response.json();
      setHoldings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>Loading your plant holdings...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome Back{user.email ? `, ${user.email}` : ''}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here are your current plant holdings
        </Typography>
      </Box>
      
      {holdings.length === 0 ? (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6">You currently have no plant holdings.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {holdings.map((holding) => (
            <Grid item xs={12} md={6} lg={4} key={holding.holdingID}>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: isDarkMode ? 'grey.800' : 'background.paper'
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {holding.plantDescription || 'Unnamed Plant'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Serial Number: {holding.serialNumber || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {holding.statusDescription || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    SWL: {holding.swl || 'N/A'}
                  </Typography>
                  {holding.inspectionFrequency && (
                    <Typography variant="body2" color="textSecondary">
                      Inspection Frequency: {holding.inspectionFrequency}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default CustomerPlantHolding;
