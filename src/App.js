import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, CssBaseline, Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import './App.css';
import AllCustomers from './components/AllCustomers';
import CustomerNotes from './components/CustomerNotes';
import CustomerSummary from './components/CustomerSummary';
import PlantCategories from './components/PlantCategories';
import ManagePlant from './components/ManagePlant';
import CertificatePage from './components/CertificatePage';
import Login from './components/Login';
import Register from './components/Register';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './components/AllCustomers.css';
import './components/CustomerNotes.css';
import './components/PlantCategories.css';
import './components/ManagePlant.css';
import { baseUrl } from './config';
import CustomerPlantHolding from './components/CustomerPlantHolding';
import UserManagement from './components/UserManagement';

function LocalForecast() {
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
    // Format for hourly display
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
    <div className="local-forecast">
      <h1>Weather in Mayfield</h1>
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}
      {error && (
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={fetchWeatherData}>Try Again</button>
        </div>
      )}
      {!loading && !error && currentWeather && (
        <>
          <div className="forecast-card current-weather">
            <h3>Current Weather</h3>
            <p className="description">{currentWeather.description}</p>
            <div className="weather-details">
              <p>Temperature: {Math.round(currentWeather.temperature)}°C</p>
              <p>Feels like: {Math.round(currentWeather.feelsLike)}°C</p>
              <p>Humidity: {currentWeather.humidity}%</p>
              <p>Wind Speed: {Math.round(currentWeather.windSpeed * 2.237)}mph</p>
            </div>
            {currentWeather.icon && (
              <img 
                src={`https://openweathermap.org/img/w/${currentWeather.icon}.png`}
                alt="Weather icon"
                className="weather-icon"
              />
            )}
          </div>

          {forecastData && (
            <div className="forecast-section">
              <h3>5-Day Forecast</h3>
              <div className="daily-forecast-grid">
                {Object.entries(dailyForecasts).map(([dayKey, forecast]) => (
                  <div key={dayKey} className="daily-forecast-card" onClick={() => toggleDayExpansion(dayKey)}>
                    <div className="daily-summary">
                      <h4>{formatDate(forecast.date)}</h4>
                      <img 
                        src={`https://openweathermap.org/img/w/${getMostCommonIcon(forecast.summary.icons)}.png`}
                        alt="Weather icon"
                        className="weather-icon-medium"
                      />
                      <div className="temp-range">
                        <span className="max-temp">{Math.round(forecast.summary.maxTemp)}°</span>
                        <span className="temp-separator">/</span>
                        <span className="min-temp">{Math.round(forecast.summary.minTemp)}°</span>
                      </div>
                      <p className="daily-description">
                        {Array.from(forecast.summary.descriptions)[0]}
                      </p>
                      <p className="daily-wind">
                        Max wind: {Math.round(forecast.summary.maxWind * 2.237)}mph
                      </p>
                    </div>

                    {expandedDay === dayKey && (
                      <div className="hourly-breakdown">
                        <div className="hourly-grid">
                          {forecast.items.map((item, index) => (
                            <div key={index} className="hourly-item">
                              <p className="hourly-time">{formatDate(item.dtTxt, 'time')}</p>
                              <img 
                                src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                                className="weather-icon-small"
                              />
                              <p className="hourly-temp">{Math.round(item.main.temp)}°C</p>
                              <p className="hourly-desc">{item.weather[0].description}</p>
                              <p className="hourly-wind">Wind: {Math.round(item.wind.speed * 2.237)}mph</p>
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
          
          <button onClick={fetchWeatherData} className="refresh-button">Refresh</button>
        </>
      )}
    </div>
  );
}

// Update the ProtectedRoute component
const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if admin role is required and user doesn't have it
  if (requireAdmin && !user.roles.includes('Admin')) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
  
  const handleAdminMenuOpen = (event) => {
    setAdminMenuAnchor(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminMenuAnchor(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  const isAdmin = user?.roles?.includes('Admin');
  
  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="App-header">
        <nav>
          <div className="nav-links">
            <Link to="/" className="nav-link home-link">🏠 Home</Link>
            {user ? (
              user.isCustomer ? (
                <>
                  <Link to="/plant-holding" className="nav-link">Plant Holding</Link>
                  <Button onClick={handleLogout} color="inherit" className="nav-link">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/customers" className="nav-link">All Customers</Link>
                  {isAdmin && (
                    <div>
                      <button className="nav-link admin-menu-button" onClick={handleAdminMenuOpen}>
                        Admin
                      </button>
                      <Menu
                        anchorEl={adminMenuAnchor}
                        open={Boolean(adminMenuAnchor)}
                        onClose={handleAdminMenuClose}
                      >
                        <MenuItem onClick={handleAdminMenuClose} component={Link} to="/user-management">
                          User Management
                        </MenuItem>
                        <MenuItem onClick={handleAdminMenuClose} component={Link} to="/plant-categories">
                          Plant Categories
                        </MenuItem>
                        <MenuItem onClick={handleAdminMenuClose} component={Link} to="/manage-plant">
                          Manage Plant
                        </MenuItem>
                      </Menu>
                    </div>
                  )}
                  <Button onClick={handleLogout} color="inherit" className="nav-link">
                    Logout
                  </Button>
                </>
              )
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </div>
          <IconButton onClick={toggleTheme} color="inherit" className="theme-toggle">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </nav>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LocalForecast />} />
          <Route path="/customers" element={
            <ProtectedRoute>
              <AllCustomers />
            </ProtectedRoute>
          } />
          <Route path="/customers/:custId" element={
            <ProtectedRoute>
              <CustomerSummary />
            </ProtectedRoute>
          } />
          <Route path="/customers/:custId/notes" element={
            <ProtectedRoute>
              <CustomerNotes />
            </ProtectedRoute>
          } />
          <Route path="/plant-categories" element={
            <ProtectedRoute requireAdmin={true}>
              <PlantCategories />
            </ProtectedRoute>
          } />
          <Route path="/manage-plant" element={
            <ProtectedRoute requireAdmin={true}>
              <ManagePlant />
            </ProtectedRoute>
          } />
          <Route path="/certificate/:id" element={
            <ProtectedRoute>
              <CertificatePage />
            </ProtectedRoute>
          } />
          <Route path="/plant-holding" element={
            <ProtectedRoute>
              <CustomerPlantHolding />
            </ProtectedRoute>
          } />
          <Route path="/user-management" element={
            <ProtectedRoute requireAdmin={true}>
              <UserManagement />
            </ProtectedRoute>
          } />
        </Routes>
      </header>
    </div>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
