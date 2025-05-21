import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../config';
import { PlantHolding } from '../types/plantholdingTypes';
import './ManagePlant.css';

interface LocationState {
  from?: string;
}

const CustomerPlantHolding: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const [holdings, setHoldings] = useState<PlantHolding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
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
      const customerId = user.customerId || user.customerID;
      if (customerId) {
        fetchHoldings(customerId);
      } else if (mounted) {
        setError('No customer ID found for this user.');
        setLoading(false);
      }
    }
    return () => setMounted(false);
  }, [user, fetchHoldings]);

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const loadingContent = (
    <div className="loading-state" style={{ minHeight: '200px' }}>
      <div className="spinner"></div>
      <p>Loading plant holdings...</p>
    </div>
  );

  // Show a consistent loading state when component is mounting or user data is loading
  if (!mounted || !user) {
    return (
      <div className={`plants-container ${isDarkMode ? 'dark' : 'light'}`}>
        {loadingContent}
      </div>
    );
  }

  return (
    <div className={`plants-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h2>My Plant Holdings</h2>
      {locationState?.from && (
        <p className="redirect-message">
          Redirected from {locationState.from}
        </p>
      )}
      {loading ? (
        loadingContent
      ) : error ? (
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={() => {
            const customerId = user.customerId || user.customerID;
            if (customerId) fetchHoldings(customerId);
          }}>
            Try Again
          </button>
        </div>
      ) : holdings.length === 0 ? (
        <p>No plant holdings found.</p>
      ) : (
        <div className="plants-grid">
          {holdings.map(holding => (
            <div key={holding.holdingID} className="plant-card">
              <h3>{holding.plantDescription}</h3>
              <p><strong>Serial Number:</strong> {holding.serialNumber}</p>
              <p><strong>Status:</strong> {holding.statusDescription}</p>
              <p><strong>SWL:</strong> {holding.swl}</p>
              {/* Additional holding details can be shown when expanded */}
              {expanded === holding.holdingID && (
                <div className="expanded-details">
                  {/* Add any additional details you want to show when expanded */}
                </div>
              )}
              <button 
                className="expand-button"
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
