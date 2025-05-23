import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../config';
import { PlantHolding } from '../types/plantholdingTypes';
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
    if (!user?.token || !customerId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/PlantHolding/customer/${customerId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch plant holdings');
      const data = await response.json();
      if (mounted) {
        setHoldings(data);
        setLoading(false);
      }
    } catch (err) {
      if (mounted) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    }
  }, [user, mounted]);

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

  // Show a consistent loading state when component is mounting or user data is loading
  if (!mounted || !user) {
    return (
      <div className={`${styles.plantsContainer} ${isDarkMode ? styles.dark : styles.light}`}>
        {loadingContent}
      </div>
    );
  }

  return (
    <div className={`${styles.plantsContainer} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles.headerActions}>
        <h2>My Plant Holdings</h2>
        <input
          type="text"
          placeholder="Search plants by description, serial number, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      {locationState?.from && (
        <p className={styles.redirectMessage}>
          Redirected from {locationState.from}
        </p>
      )}

      {loading ? (
        loadingContent
      ) : error ? (
        <div className={styles.errorState}>
          <p>⚠️ {error}</p>
          <button 
            className={styles.expandButton}
            onClick={() => {
              const customerId = user.customerId;
              if (customerId) fetchHoldings(customerId);
            }}
          >
            Try Again
          </button>
        </div>
      ) : filteredHoldings.length === 0 ? (
        <p>{holdings.length === 0 ? "No plant holdings found." : "No matching plants found."}</p>
      ) : (
        <div className={styles.plantsGrid}>
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
              )}
              <button 
                className={styles.expandButton}
                onClick={() => toggleExpand(holding.holdingID)}
              >
                {expanded === holding.holdingID ? 'Show Less' : 'Show More'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerPlantHolding;
