import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { Button, Typography, Box, Chip } from '@mui/material';
import { PlantHolding } from '../../types/plantholdingTypes';
import { InspectionItem } from '../../types/inspectionTypes';
import { Customer } from '../../types/customerTypes';
import inspectionService from '../../services/inspectionService';
import customerService from '../../services/customerService';
import plantHoldingService from '../../services/plantHoldingService';
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

// Utility functions moved outside component to prevent recreation on every render
const getInspectionStatus = (lastInspectionDate: string | undefined, inspectionFrequency: number | undefined): 'Up to Date' | 'Due Soon' | 'Overdue' => {
  if (!lastInspectionDate || !inspectionFrequency) return 'Overdue';
  
  const lastInspection = new Date(lastInspectionDate);
  const today = new Date();
  const monthsAgo = (today.getTime() - lastInspection.getTime()) / (1000 * 60 * 60 * 24 * 30.44); // Average days per month
  
  if (monthsAgo > inspectionFrequency) return 'Overdue';
  if (monthsAgo > inspectionFrequency - 1) return 'Due Soon'; // Due within 1 month
  return 'Up to Date';
};

const getStatusColor = (status: 'Up to Date' | 'Due Soon' | 'Overdue'): "error" | "warning" | "success" => {
  switch (status) {
    case 'Overdue': return 'error';
    case 'Due Soon': return 'warning';
    case 'Up to Date': return 'success';
  }
};

const calculateNextDueDate = (lastInspectionDate: string | undefined, inspectionFrequency: number | undefined): string | undefined => {
  if (!lastInspectionDate || !inspectionFrequency) return undefined;
  
  const lastInspection = new Date(lastInspectionDate);
  const nextDue = new Date(lastInspection);
  nextDue.setMonth(nextDue.getMonth() + inspectionFrequency);
  
  return nextDue.toISOString();
};

const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return 'Never';
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return 'Invalid Date';
  }
};

const CustomerAuxiliaryHolding: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useCustomTheme();
  const location = useLocation();
  const [holdings, setHoldings] = useState<PlantHoldingWithInspection[]>([]);
  const [filteredHoldings, setFilteredHoldings] = useState<PlantHoldingWithInspection[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inspectionErrors, setInspectionErrors] = useState<Set<number>>(new Set());
  const locationState = location.state as LocationState;

  const fetchCustomer = useCallback(async (customerId: string | number) => {
    if (!customerId) return;
    
    try {
      const customerData = await customerService.getById(Number(customerId));
      if (mounted) {
        setCustomer(customerData);
      }
    } catch (err) {
      console.error('Error fetching customer:', err);
    }
  }, [mounted]);

  const fetchHoldings = useCallback(async (customerId: string | number) => {
    if (!customerId || !mounted) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('CustomerAuxiliaryHolding: Starting to fetch auxiliary holdings for customer:', customerId);
      
      // Get all holdings for this customer and filter for auxiliary ones
      const holdingsData = await plantHoldingService.getByCustomerId(customerId);
      
      // Filter to only show auxiliary holdings (those with multiInspect = true)
      const filteredHoldings = holdingsData.filter(holding => holding.multiInspect);
      console.log('CustomerAuxiliaryHolding: Filtered from', holdingsData.length, 'to', filteredHoldings.length, 'auxiliary holdings');
      
      if (!mounted) return;
      
      console.log('CustomerAuxiliaryHolding: Processing', filteredHoldings.length, 'auxiliary holdings');
      
      const enhancedHoldings: PlantHoldingWithInspection[] = await Promise.all(
        filteredHoldings.map(async (holding: PlantHolding) => {
            try {
              const inspections = await inspectionService.getByPlantHolding(holding.holdingID);
              
              if (inspections.length === 0) {
                return {
                  ...holding,
                  inspectionStatus: 'Overdue' as const,
                  formattedLastInspection: 'Never',
                  formattedNextDue: 'Overdue'
                };
              }
              
              // Sort inspections by date (most recent first)
              const sortedInspections = inspections.sort((a, b) => {
                const dateA = a.inspectionDate ? new Date(a.inspectionDate).getTime() : 0;
                const dateB = b.inspectionDate ? new Date(b.inspectionDate).getTime() : 0;
                return dateB - dateA;
              });
              
              const latestInspection = sortedInspections[0];
              const lastInspectionDate = latestInspection?.inspectionDate;
              const inspectionStatus = getInspectionStatus(lastInspectionDate, holding.inspectionFrequency);
              const nextDueDate = calculateNextDueDate(lastInspectionDate, holding.inspectionFrequency);
              
              return {
                ...holding,
                lastInspectionDate,
                formattedLastInspection: formatDate(lastInspectionDate),
                nextDueDate,
                formattedNextDue: formatDate(nextDueDate),
                inspectionStatus,
                latestInspection
              };
            } catch (inspectionError) {
              console.error(`Error fetching inspections for holding ${holding.holdingID}:`, inspectionError);
              setInspectionErrors(prev => new Set(prev).add(holding.holdingID));
              
              return {
                ...holding,
                inspectionStatus: 'Overdue' as const,
                formattedLastInspection: 'Error loading',
                formattedNextDue: 'Error loading'
              };
            }
          })
        );
        
        if (mounted) {
          console.log('CustomerAuxiliaryHolding: Setting', enhancedHoldings.length, 'auxiliary holdings');
          setHoldings(enhancedHoldings);
          setLoading(false);
        }
        
    } catch (err) {
      console.error('CustomerAuxiliaryHolding: Error fetching auxiliary holdings:', err);
      if (mounted) {
        setError('Unable to load your auxiliary holdings. Please try again later.');
        setLoading(false);
      }
    }
  }, [mounted, inspectionErrors]);
  
  useEffect(() => {
    setMounted(true);
    if (user) {
      console.log('Debug: CustomerAuxiliaryHolding - Customer ID:', user.customerId);
      const customerId = user.customerId;
      
      if (customerId) {
        fetchCustomer(customerId);
        fetchHoldings(customerId);
      } else if (mounted) {
        console.error('Debug: CustomerAuxiliaryHolding - No customer ID found for user:', user.email);
        setError('No customer ID found for this user.');
        setLoading(false);
      }
    }
    return () => setMounted(false);
  }, [user, fetchCustomer, fetchHoldings]);

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
      <p>Loading auxiliary holdings...</p>
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
        No Auxiliary Holdings Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        You currently don't have any auxiliary plants registered in the system.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Auxiliary holdings are plants that are available for multi-inspection processes. If you believe this is an error, please contact our support team.
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
        <h2>Auxiliary Holdings - {customer?.companyName || 'Loading...'}</h2>
        {holdings.length > 0 && (
          <input
            type="text"
            placeholder="Search auxiliary holdings..."
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
      )}

      {loading ? (
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
              <p><strong>Serial:</strong> {holding.serialNumber}</p>
              <p><strong>SWL:</strong> {holding.swl}</p>
              <p><strong>Status:</strong> {holding.statusDescription}</p>
              <p><strong>Inspection Frequency:</strong> {holding.inspectionFrequency} months</p>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Last Inspection:</Typography>
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
              
              {expanded === holding.holdingID && (
                <div className={styles.expandedDetails}>
                  {holding.latestInspection && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Latest Inspection Details:
                      </Typography>
                      <Typography variant="body2">
                        <strong>Date:</strong> {formatDate(holding.latestInspection.inspectionDate)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Location:</strong> {holding.latestInspection.location || 'Not specified'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Inspector:</strong> {holding.latestInspection.inspectorsName || 'Unknown'}
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

export default CustomerAuxiliaryHolding;
