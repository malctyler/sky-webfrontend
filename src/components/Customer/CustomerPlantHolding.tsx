import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { Button, Typography, Box, Chip } from '@mui/material';
import { PlantHolding } from '../../types/plantholdingTypes';
import { InspectionItem } from '../../types/inspectionTypes';
import plantHoldingService from '../../services/plantHoldingService';
import inspectionService from '../../services/inspectionService';
import { getAuthToken } from '../../utils/authUtils';
import styles from './CustomerPlantHolding.module.css';

interface LocationState {
  from?: string;
}

// Enhanced plant holding interface with inspection data
interface PlantHoldingWithInspection extends PlantHolding {
  lastInspectionDate?: string;
  formattedLastInspection?: string;
  nextDueDate?: string;
  formattedNextDue?: string;
  inspectionStatus?: 'Up to Date' | 'Due Soon' | 'Overdue';
  latestInspection?: InspectionItem;
}

const CustomerPlantHolding: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useCustomTheme();
  const location = useLocation();
  const [holdings, setHoldings] = useState<PlantHoldingWithInspection[]>([]);
  const [filteredHoldings, setFilteredHoldings] = useState<PlantHoldingWithInspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const locationState = location.state as LocationState;

  // Helper function to get customer ID directly from JWT token
  const getCustomerIdFromToken = (): string | number | null => {
    try {
      const token = getAuthToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Debug: JWT payload full:', payload);
        return payload.CustomerId ? parseInt(payload.CustomerId) : null;
      }
    } catch (e) {
      console.error('Could not extract customer ID from token:', e);
    }
    return null;
  };

  // Utility function to calculate inspection status (RAG)
  const getInspectionStatus = (lastInspectionDate: string | undefined, inspectionFrequency: number | undefined): 'Up to Date' | 'Due Soon' | 'Overdue' => {
    if (!lastInspectionDate || !inspectionFrequency) return 'Overdue';
    
    const lastInspection = new Date(lastInspectionDate);
    const today = new Date();
    const monthsAgo = (today.getTime() - lastInspection.getTime()) / (1000 * 60 * 60 * 24 * 30.44); // Average days per month
    
    if (monthsAgo > inspectionFrequency) return 'Overdue';
    if (monthsAgo > inspectionFrequency - 1) return 'Due Soon'; // Due within 1 month
    return 'Up to Date';
  };

  // Utility function to get status color for Chip component
  const getStatusColor = (status: 'Up to Date' | 'Due Soon' | 'Overdue'): "error" | "warning" | "success" => {
    switch (status) {
      case 'Overdue': return 'error';
      case 'Due Soon': return 'warning';
      case 'Up to Date': return 'success';
    }
  };

  // Calculate next due date
  const calculateNextDueDate = (lastInspectionDate: string | undefined, inspectionFrequency: number | undefined): string | undefined => {
    if (!lastInspectionDate || !inspectionFrequency) return undefined;
    
    const lastInspection = new Date(lastInspectionDate);
    const nextDue = new Date(lastInspection);
    nextDue.setMonth(nextDue.getMonth() + inspectionFrequency);
    
    return nextDue.toISOString();
  };

  // Format date for display
  const formatDisplayDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const fetchHoldings = useCallback(async (customerId: string | number) => {
    console.log('=== FETCH HOLDINGS DEBUG ===');
    console.log('Debug: fetchHoldings called with customerId:', customerId);
    console.log('Debug: fetchHoldings customerId type:', typeof customerId);
    console.log('=== END FETCH HOLDINGS DEBUG ===');
    
    if (!customerId) return;
    
    setLoading(true);
    setError(null);
    try {
      console.log('Debug: About to call plantHoldingService.getByCustomerId with:', customerId);
      const holdingsData = await plantHoldingService.getByCustomerId(customerId);
      console.log('Debug: plantHoldingService returned:', holdingsData);
      
      // Fetch inspection data for each holding
      const holdingsWithInspections = await Promise.all(
        holdingsData.map(async (holding): Promise<PlantHoldingWithInspection> => {
          try {
            const inspections = await inspectionService.getByPlantHolding(holding.holdingID);
            
            // Find the most recent inspection
            const sortedInspections = inspections.sort((a, b) => {
              const dateA = new Date(a.inspectionDate || '').getTime();
              const dateB = new Date(b.inspectionDate || '').getTime();
              return dateB - dateA; // Most recent first
            });
            
            const latestInspection = sortedInspections[0];
            const lastInspectionDate = latestInspection?.inspectionDate;
            const nextDueDate = calculateNextDueDate(lastInspectionDate, holding.inspectionFrequency);
            const inspectionStatus = getInspectionStatus(lastInspectionDate, holding.inspectionFrequency);
            
            return {
              ...holding,
              lastInspectionDate,
              formattedLastInspection: formatDisplayDate(lastInspectionDate),
              nextDueDate,
              formattedNextDue: formatDisplayDate(nextDueDate),
              inspectionStatus,
              latestInspection
            };
          } catch (inspectionError) {
            console.warn(`Failed to fetch inspections for holding ${holding.holdingID}:`, inspectionError);
            // Return holding without inspection data
            return {
              ...holding,
              formattedLastInspection: 'Never',
              formattedNextDue: 'Unknown',
              inspectionStatus: 'Overdue' as const
            };
          }
        })
      );
      
      if (mounted) {
        setHoldings(holdingsWithInspections);
        setLoading(false);
      }
    } catch (err) {
      if (mounted) {
        console.error('Error fetching plant holdings:', err);
        console.error('Error details - customerId used:', customerId);
        console.error('Error details - full error object:', err);
        
        // Check if it's a specific HTTP error
        if (err && typeof err === 'object' && 'response' in err) {
          const axiosError = err as any;
          console.error('HTTP Status:', axiosError.response?.status);
          console.error('HTTP Data:', axiosError.response?.data);
          console.error('Request URL:', axiosError.config?.url);
        }
        
        setError('Unable to load your plant holdings. Please try again later.');
        setLoading(false);
      }
    }
  }, [mounted, calculateNextDueDate, getInspectionStatus, formatDisplayDate]);
  
  useEffect(() => {
    setMounted(true);
    if (user) {
      console.log('=== CUSTOMER ID DEBUG SESSION ===');
      console.log('Debug: CustomerPlantHolding - Full user object:', user);
      console.log('Debug: CustomerPlantHolding - Customer ID:', user.customerId);
      console.log('Debug: CustomerPlantHolding - Customer ID type:', typeof user.customerId);
      console.log('Debug: CustomerPlantHolding - Is Customer:', user.isCustomer);
      console.log('Debug: CustomerPlantHolding - User roles:', user.roles);
      console.log('Debug: CustomerPlantHolding - User email:', user.email);
      
      // Check the raw token to see what it contains
      try {
        const token = getAuthToken();
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('Debug: JWT payload full:', payload);
          console.log('Debug: JWT CustomerId claim:', payload.CustomerId);
          console.log('Debug: JWT CustomerId type:', typeof payload.CustomerId);
          
          // Check if there's a mismatch between JWT and user object
          const jwtCustomerId = payload.CustomerId;
          const userCustomerId = user.customerId;
          if (jwtCustomerId && userCustomerId && jwtCustomerId.toString() !== userCustomerId.toString()) {
            console.error('🚨 MISMATCH DETECTED! 🚨');
            console.error('JWT CustomerId:', jwtCustomerId, '(type:', typeof jwtCustomerId, ')');
            console.error('User CustomerId:', userCustomerId, '(type:', typeof userCustomerId, ')');
            console.error('This explains why you see both customer IDs in the logs!');
          } else {
            console.log('✅ JWT and User customer IDs match');
          }
          
          // Also check what getCustomerIdFromToken returns
          const tokenCustomerId = getCustomerIdFromToken();
          console.log('Debug: getCustomerIdFromToken returns:', tokenCustomerId, '(type:', typeof tokenCustomerId, ')');
        } else {
          console.error('Debug: No token found!');
        }
      } catch (e) {
        console.error('Debug: Could not decode token:', e);
      }
      
      console.log('=== END DEBUG SESSION ===');
      
      const customerId = user.customerId;
      console.log('Debug: About to call fetchHoldings with customerId from user object:', customerId);
      
      if (customerId) {
        fetchHoldings(customerId);
      } else if (mounted) {
        console.error('Debug: CustomerPlantHolding - No customer ID found for user:', user.email);
        setError('No customer ID found for this user.');
        setLoading(false);
      }
    }
    return () => setMounted(false);
  }, [user, fetchHoldings, getCustomerIdFromToken]);

  // Update filtered holdings when search term or holdings change
  useEffect(() => {
    const filtered = holdings.filter(holding =>
      holding.plantDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.statusDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.inspectionStatus?.toLowerCase().includes(searchTerm.toLowerCase())
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
              console.log('Debug: Try Again button clicked');
              const customerId = user.customerId;
              const tokenCustomerId = getCustomerIdFromToken();
              console.log('Debug: Try Again - user.customerId:', customerId);
              console.log('Debug: Try Again - getCustomerIdFromToken():', tokenCustomerId);
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
              <p><strong>Inspection Frequency:</strong> {holding.inspectionFrequency} months</p>
              
              {/* Inspection Information */}
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Inspection Status:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Last Inspected:</Typography>
                    <Typography variant="body2">{holding.formattedLastInspection}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Next Due:</Typography>
                    <Typography variant="body2">{holding.formattedNextDue}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Status:</Typography>
                    <Chip
                      label={holding.inspectionStatus || 'Unknown'}
                      color={holding.inspectionStatus ? getStatusColor(holding.inspectionStatus) : 'default'}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
              
              {expanded === holding.holdingID && (
                <div className={styles.expandedDetails}>
                  {holding.latestInspection && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Latest Inspection Details:
                      </Typography>
                      <Typography variant="body2">
                        <strong>Location:</strong> {holding.latestInspection.location || 'Not specified'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Inspector:</strong> {holding.latestInspection.inspectorName || 'Unknown'}
                      </Typography>
                      {holding.latestInspection.miscNotes && (
                        <Typography variant="body2">
                          <strong>Notes:</strong> {holding.latestInspection.miscNotes}
                        </Typography>
                      )}
                    </Box>
                  )}
                </div>
              )}
              
              <Button 
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
