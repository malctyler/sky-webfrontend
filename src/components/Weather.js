import React, { useState, useEffect } from 'react';
import { baseUrl } from '../config';
import styles from './Weather.module.css';

function Weather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${baseUrl}/Weather`),
        fetch(`${baseUrl}/Weather/forecast`)
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const [current, forecast] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json()
      ]);

      setCurrentWeather(current);
      setForecastData(forecast);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr, format = 'short') => {
    const date = new Date(dateStr);
    if (format === 'short') {
      return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupForecastByDay = (items) => {
    const grouped = {};
    
    items?.forEach(item => {
      const date = new Date(item.dtTxt);
      const dayKey = date.toISOString().split('T')[0];
      
      if (!grouped[dayKey]) {
        grouped[dayKey] = {
          date: date,
          items: [],
          summary: {
            maxTemp: -Infinity,
            minTemp: Infinity,
            icons: new Set(),
            descriptions: new Set(),
            maxWind: 0
          }
        };
      }
      
      grouped[dayKey].items.push(item);
      grouped[dayKey].summary.maxTemp = Math.max(grouped[dayKey].summary.maxTemp, item.main.temp);
      grouped[dayKey].summary.minTemp = Math.min(grouped[dayKey].summary.minTemp, item.main.temp);
      grouped[dayKey].summary.icons.add(item.weather[0].icon);
      grouped[dayKey].summary.descriptions.add(item.weather[0].description);
      grouped[dayKey].summary.maxWind = Math.max(grouped[dayKey].summary.maxWind, item.wind.speed);
    });

    return grouped;
  };

  const toggleDayExpansion = (dayKey) => {
    setExpandedDay(expandedDay === dayKey ? null : dayKey);
  };

  const getMostCommonIcon = (icons) => {
    return Array.from(icons)[0];
  };

  const dailyForecasts = groupForecastByDay(forecastData?.items);

  return (
    <div className={styles['weather-page']}>
      <h1>Weather in Mayfield</h1>
      {loading && (
        <div className={styles['loading-state']}>
          <div className={styles.spinner}></div>
          <p>Loading weather data...</p>
        </div>
      )}
      {error && (
        <div className={styles['error-state']}>
          <p>⚠️ {error}</p>
          <button onClick={fetchWeatherData}>Try Again</button>
        </div>
      )}
      {!loading && !error && currentWeather && (
        <>
          <div className={`${styles['forecast-card']} ${styles['current-weather']}`}>
            <h3>Current Weather</h3>
            <p className={styles['daily-description']}>{currentWeather.description}</p>
            <div className={styles['weather-details']}>
              <p>Temperature: {Math.round(currentWeather.temperature)}°C</p>
              <p>Feels like: {Math.round(currentWeather.feelsLike)}°C</p>
              <p>Humidity: {currentWeather.humidity}%</p>
              <p>Wind Speed: {Math.round(currentWeather.windSpeed * 2.237)}mph</p>
            </div>
            {currentWeather.icon && (
              <img 
                src={`https://openweathermap.org/img/w/${currentWeather.icon}.png`}
                alt="Weather icon"
                className={styles['weather-icon']}
              />
            )}
          </div>

          {forecastData && (
            <div className={styles['forecast-section']}>
              <h3>5-Day Forecast</h3>
              <div className={styles['daily-forecast-grid']}>
                {Object.entries(dailyForecasts).map(([dayKey, forecast]) => (
                  <div key={dayKey} className={styles['daily-forecast-card']} onClick={() => toggleDayExpansion(dayKey)}>
                    <div className={styles['daily-summary']}>
                      <h4>{formatDate(forecast.date)}</h4>
                      <img 
                        src={`https://openweathermap.org/img/w/${getMostCommonIcon(forecast.summary.icons)}.png`}
                        alt="Weather icon"
                        className={styles['weather-icon-medium']}
                      />
                      <div className={styles['temp-range']}>
                        <span className={styles['max-temp']}>{Math.round(forecast.summary.maxTemp)}°</span>
                        <span className={styles['temp-separator']}>/</span>
                        <span className={styles['min-temp']}>{Math.round(forecast.summary.minTemp)}°</span>
                      </div>
                      <p className={styles['daily-description']}>
                        {Array.from(forecast.summary.descriptions)[0]}
                      </p>
                      <p className={styles['daily-wind']}>
                        Max wind: {Math.round(forecast.summary.maxWind * 2.237)}mph
                      </p>
                    </div>

                    {expandedDay === dayKey && (
                      <div className={styles['hourly-breakdown']}>
                        <div className={styles['hourly-grid']}>
                          {forecast.items.map((item, index) => (
                            <div key={index} className={styles['hourly-item']}>
                              <p className={styles['hourly-time']}>{formatDate(item.dtTxt, 'time')}</p>
                              <img 
                                src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                                className={styles['weather-icon-small']}
                              />
                              <p className={styles['hourly-temp']}>{Math.round(item.main.temp)}°C</p>
                              <p className={styles['hourly-desc']}>{item.weather[0].description}</p>
                              <p className={styles['hourly-wind']}>Wind: {Math.round(item.wind.speed * 2.237)}mph</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button onClick={fetchWeatherData} className={styles['refresh-button']}>Refresh</button>
        </>
      )}
    </div>
  );
}

export default Weather;