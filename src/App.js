import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, CssBaseline, Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import './App.css';
import AllForecasts from './components/AllForecasts';
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
import './components/AllForecasts.css';
import './components/AllCustomers.css';
import './components/CustomerNotes.css';
import './components/PlantCategories.css';
import './components/ManagePlant.css';
import { baseUrl } from './config';
import CustomerPlantHolding from './components/CustomerPlantHolding';
import UserManagement from './components/UserManagement';

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
      const response = await fetch(`${baseUrl}/Summaries`);
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

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [plantMenuAnchor, setPlantMenuAnchor] = useState(null);
  
  const handlePlantMenuOpen = (event) => {
    setPlantMenuAnchor(event.currentTarget);
  };

  const handlePlantMenuClose = () => {
    setPlantMenuAnchor(null);
  };

  const handleLogout = async () => {
    await logout();
  };
  
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
                  <Link to="/user-management" className="nav-link">User Management</Link>
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
          <Route path="/" element={<RandomForecast />} />
          <Route path="/all" element={
            <ProtectedRoute>
              <AllForecasts />
            </ProtectedRoute>
          } />
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
            <ProtectedRoute>
              <PlantCategories />
            </ProtectedRoute>
          } />
          <Route path="/manage-plant" element={
            <ProtectedRoute>
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
            <ProtectedRoute>
              {user && !user.isCustomer ? <UserManagement /> : <Navigate to="/" />}
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
