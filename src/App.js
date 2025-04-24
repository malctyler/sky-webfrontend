import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, CssBaseline } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import './App.css';
import AllForecasts from './components/AllForecasts';
import AllCustomers from './components/AllCustomers';
import CustomerNotes from './components/CustomerNotes';
import CustomerSummary from './components/CustomerSummary';
import PlantCategories from './components/PlantCategories';
import ManagePlant from './components/ManagePlant';
import CertificatePage from './components/CertificatePage';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import './components/AllForecasts.css';
import './components/AllCustomers.css';
import './components/CustomerNotes.css';
import './components/PlantCategories.css';
import './components/ManagePlant.css';

function RandomForecast() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/Summaries');
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setWeatherData(data[randomIndex]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="random-forecast">
      <h1>Today's Weather</h1>
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
      {!loading && !error && weatherData && (
        <div className="forecast-card">
          <h3>Weather Type</h3>
          <p className="description">{weatherData.description}</p>
          {weatherData.title && <p className="title">{weatherData.title}</p>}
          <button onClick={fetchWeatherData}>Get New Forecast</button>
        </div>
      )}
    </div>
  );
}

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [plantMenuAnchor, setPlantMenuAnchor] = useState(null);
  
  const handlePlantMenuOpen = (event) => {
    setPlantMenuAnchor(event.currentTarget);
  };

  const handlePlantMenuClose = () => {
    setPlantMenuAnchor(null);
  };
  
  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="App-header">
        <nav>
          <div className="nav-links">
            <Link to="/" className="nav-link home-link">🏠 Home</Link>
            <Link to="/all" className="nav-link">All Forecasts</Link>
            <Link to="/customers" className="nav-link">All Customers</Link>
            <div>
              <button className="nav-link plant-menu-button" onClick={handlePlantMenuOpen}>
                Plant
              </button>
              <Menu
                anchorEl={plantMenuAnchor}
                open={Boolean(plantMenuAnchor)}
                onClose={handlePlantMenuClose}
              >
                <MenuItem onClick={handlePlantMenuClose} component={Link} to="/plant-categories">
                  Plant Categories
                </MenuItem>
                <MenuItem onClick={handlePlantMenuClose} component={Link} to="/manage-plant">
                  Manage Plant
                </MenuItem>
              </Menu>
            </div>
          </div>
          <IconButton onClick={toggleTheme} color="inherit" className="theme-toggle">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </nav>
        
        <Routes>
          <Route path="/" element={<RandomForecast />} />
          <Route path="/all" element={<AllForecasts />} />
          <Route path="/customers" element={<AllCustomers />} />
          <Route path="/customers/:custId" element={<CustomerSummary />} />
          <Route path="/customers/:custId/notes" element={<CustomerNotes />} />
          <Route path="/plant-categories" element={<PlantCategories />} />
          <Route path="/manage-plant" element={<ManagePlant />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
        </Routes>
      </header>
    </div>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
