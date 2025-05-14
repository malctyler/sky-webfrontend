import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { baseUrl } from '../config';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import './ManagePlant.css';

function CustomerPlantHolding() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.isCustomer) {
      const customerId = user.customerId || user.customerID;
      if (!customerId) {
        setError('No customer ID found for this user.');
        setLoading(false);
        return;
      }
      fetchHoldings(customerId);
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

  if (loading) return (
    <Box sx={{ padding: 3, textAlign: 'center' }}>
      <Typography>Loading your plant holdings...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ padding: 3, textAlign: 'center' }}>
      <Typography color="error">Error: {error}</Typography>
      <Button 
        variant="contained" 
        onClick={() => fetchHoldings(user.customerId || user.customerID)}
        sx={{ mt: 2 }}
      >
        Try Again
      </Button>
    </Box>
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.email}
      </Typography>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Your Plant Holdings
      </Typography>
      
      {holdings.length === 0 ? (
        <Typography>You currently have no plant holdings.</Typography>
      ) : (
        <Grid container spacing={3}>
          {holdings.map((holding) => (
            <Grid item xs={12} md={6} lg={4} key={holding.holdingID}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
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
    </Box>
  );
}

export default CustomerPlantHolding;
