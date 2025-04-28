import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { baseUrl } from '../config';
import './ManagePlant.css';

function CustomerPlantHolding() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (user && user.isCustomer) {
      fetchHoldings();
    }
    // eslint-disable-next-line
  }, [user]);

  const fetchHoldings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/PlantHolding/customer/${user.customerId || user.customerID || ''}`, {
        headers: { Authorization: `Bearer ${user.token}` }
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

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className={`plants-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h2>My Plant Holdings</h2>
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading plant holdings...</p>
        </div>
      )}
      {error && (
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={fetchHoldings}>Try Again</button>
        </div>
      )}
      {!loading && !error && holdings.length === 0 && (
        <p>No plant holdings found.</p>
      )}
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
    </div>
  );
}

function ReadOnlyInspectionList({ holdingId }) {
  const { user } = useAuth();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInspections();
    // eslint-disable-next-line
  }, [holdingId]);

  const fetchInspections = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/inspection/plantholding/${holdingId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch inspections');
      const data = await response.json();
      setInspections(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            {/* Add more fields as needed, but no edit/delete */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerPlantHolding;
