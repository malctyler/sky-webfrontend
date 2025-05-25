import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { PlantHolding } from '../../types/plantholdingTypes';
import plantHoldingService from '../../services/plantHoldingService';
import styles from './CustomerPlantHolding.module.css';

interface LocationState {
  from?: string;
}

const CustomerPlantHolding: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useCustomTheme();
  const location = useLocation();
  const [holdings, setHoldings] = useState<PlantHolding[]>([]);
  const [filteredHoldings, setFilteredHoldings] = useState<PlantHolding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const locationState = location.state as LocationState;

  const fetchHoldings = useCallback(async (customerId: string | number) => {
    if (!customerId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await plantHoldingService.getByCustomerId(customerId);
      if (mounted) {
        setHoldings(data);
        setLoading(false);
      }
    } catch (err) {
      if (mounted) {
        console.error('Error fetching plant holdings:', err);
        setError('Unable to load your plant holdings. Please try again later.');
        setLoading(false);
      }
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    if (user) {
      const customerId = user.customerId;
      if (customerId) {
        fetchHoldings(customerId);
      } else if (mounted) {
        setError('No customer ID found for this user.');
        setLoading(false);
      }
    }
    return () => setMounted(false);
  }, [user, fetchHoldings]);

  // Update filtered holdings when search term or holdings change
  useEffect(() => {
    const filtered = holdings.filter(holding =>
      holding.plantDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.statusDescription?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHoldings(filtered);
  }, [holdings, searchTerm]);

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const loadingContent = (
    <div className={styles.loadingState} style={{ minHeight: '200px' }}>
      <div className={styles.spinner}></div>
      <p>Loading plant holdings...</p>
    </div>
  );

  const EmptyState = () => (
    <Box sx={{ 
      textAlign: 'center', 
      p: 4, 
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
      borderRadius: 2,
      my: 2
    }}>
      <Typography variant="h6" gutterBottom>
        No Plant Holdings Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        You currently don't have any plants registered in the system.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        If you believe this is an error, please contact our support team.
      </Typography>
    </Box>
  );

  // Show a consistent loading state when component is mounting or user data is loading
  if (!mounted || !user) {
    return (
      <div className={`${styles.plantContainer} ${isDarkMode ? styles.dark : styles.light}`}>
        {loadingContent}
      </div>
    );
  }

  return (
    <div className={`${styles.plantContainer} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles.headerActions}>
        <h2>My Plant Holdings</h2>
        {holdings.length > 0 && (
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        )}
      </div>
      
      {locationState?.from && (
        <p className={styles.redirectMessage}>
          Redirected from {locationState.from}
        </p>
      )}      {loading ? (
        loadingContent
      ) : error ? (
        <div className={styles.emptyState}>
          <p>{error}</p>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => {
              const customerId = user.customerId;
              if (customerId) fetchHoldings(customerId);
            }}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </div>
      ) : holdings.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.plantGrid}>
          {filteredHoldings.map(holding => (
            <div key={holding.holdingID} className={styles.plantCard}>
              <h3>{holding.plantDescription}</h3>
              <p><strong>Serial Number:</strong> {holding.serialNumber}</p>
              <p><strong>Status:</strong> {holding.statusDescription}</p>
              <p><strong>SWL:</strong> {holding.swl}</p>
              {expanded === holding.holdingID && (
                <div className={styles.expandedDetails}>
                  {/* Add any additional details you want to show when expanded */}
                </div>
              )}              <Button 
                variant="text"
                color="primary"
                onClick={() => toggleExpand(holding.holdingID)}
              >
                {expanded === holding.holdingID ? 'Show Less' : 'Show More'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerPlantHolding;
