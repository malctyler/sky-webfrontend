import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './AllForecasts.css';

const baseUrl = process.env.REACT_APP_VITEAPIURL || 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net';

function AllForecasts() {
  const { isDarkMode } = useTheme();
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForecasts();
  }, []);

  const fetchForecasts = async () => {
    try {
      const response = await fetch(`${baseUrl}/Summaries`);
      if (!response.ok) {
        throw new Error('Failed to fetch forecasts');
      }
      const data = await response.json();
      setForecasts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={`forecasts-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>All Weather Forecasts</h1>
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading forecasts...</p>
        </div>
      )}
      {error && (
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={fetchForecasts}>Try Again</button>
        </div>
      )}
      {forecasts.length > 0 && (
        <div className="forecasts-grid">
          {forecasts.map(forecast => (
            <div key={forecast.id} className="forecast-card">
              <h3>Weather Type</h3>
              <p className="description">{forecast.description}</p>
              {forecast.title && <p className="title">{forecast.title}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllForecasts;