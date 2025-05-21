import React, { useState, useEffect } from 'react';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import { baseUrl } from '../config';
import { WeatherForecast } from '../types/forecastTypes';
import './AllForecasts.css';

const AllForecasts: React.FC = () => {
  const { isDarkMode } = useCustomTheme();
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchForecasts();
  }, []);

  const fetchForecasts = async (): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/Summaries`);
      if (!response.ok) {
        throw new Error('Failed to fetch forecasts');
      }
      const data = await response.json();
      setForecasts(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
};

export default AllForecasts;
