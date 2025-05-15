import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../config';
import './ManagePlant.css';

function CustomerPlantHolding() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [mounted, setMounted] = useState(false);

  const fetchHoldings = useCallback(async (customerId) => {
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
        setError(err.message);
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

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Show a consistent loading state when component is mounting or user data is loading
  if (!mounted || !user) {
    return (
      <div className={`plants-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading-state" style={{ minHeight: '200px' }}>
          <div className="spinner"></div>
          <p>Loading your plant holdings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`plants-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h2>My Plant Holdings</h2>
      {location.state?.from && (
        <p className="redirect-message">
          Redirected from {location.state.from}
        </p>
      )}
      {loading ? (
        <div className="loading-state" style={{ minHeight: '200px' }}>
          <div className="spinner"></div>
          <p>Loading plant holdings...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={() => fetchHoldings(user.customerId || user.customerID)}>
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
              <button onClick={() => toggleExpand(holding.holdingID)} style={{marginTop:8}}>
                {expanded === holding.holdingID ? 'Hide Inspections' : 'Show Inspections'}
              </button>
              {expanded === holding.holdingID && <ReadOnlyInspectionList holdingId={holding.holdingID} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReadOnlyInspectionList({ holdingId }) {
  const { user } = useAuth();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  const fetchInspections = useCallback(async () => {
    if (!user?.token || !holdingId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/inspection/plantholding/${holdingId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch inspections');
      const data = await response.json();
      if (mounted) {
        setInspections(data);
        setLoading(false);
      }
    } catch (err) {
      if (mounted) {
        setError(err.message);
        setLoading(false);
      }
    }
  }, [user, holdingId, mounted]);

  useEffect(() => {
    setMounted(true);
    fetchInspections();
    return () => setMounted(false);
  }, [fetchInspections]);

  if (loading) return <div className="loading-state"><div className="spinner"></div><p>Loading inspections...</p></div>;
  if (error) return <div className="error-state"><p>⚠️ {error}</p><button onClick={fetchInspections}>Try Again</button></div>;
  if (inspections.length === 0) return <p>No inspections found for this holding.</p>;

  return (
    <div style={{marginTop:16}}>
      <h4>Inspections</h4>
      <ul>
        {inspections.map(insp => (
          <li key={insp.uniqueRef} style={{marginBottom:8}}>
            <strong>Date:</strong> {insp.inspectionDate ? new Date(insp.inspectionDate).toLocaleDateString() : 'N/A'}<br/>
            <strong>Location:</strong> {insp.location}<br/>
            <strong>Safe Working:</strong> {insp.safeWorking}<br/>
            <strong>Defects:</strong> {insp.defects || 'None'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerPlantHolding;
