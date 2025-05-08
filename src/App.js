import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './App.css';
import AllCustomers from './components/AllCustomers';
import CustomerNotes from './components/CustomerNotes';
import CustomerSummary from './components/CustomerSummary';
import PlantCategories from './components/PlantCategories';
import ManagePlant from './components/ManagePlant';
import CertificatePage from './components/CertificatePage';
import Login from './components/Login';
import Register from './components/Register';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import CustomerPlantHolding from './components/CustomerPlantHolding';
import UserManagement from './components/UserManagement';
import Home from './components/Home';
import Weather from './components/Weather';
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';

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

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            } />
            <Route path="/register" element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            } />
            <Route path="/" element={
              <MainLayout>
                <Home />
              </MainLayout>
            } />
            <Route path="/weather" element={
              <MainLayout>
                <Weather />
              </MainLayout>
            } />
            <Route path="/customers" element={
              <ProtectedRoute>
                <MainLayout>
                  <AllCustomers />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/customers/:custId" element={
              <ProtectedRoute>
                <MainLayout>
                  <CustomerSummary />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/customers/:custId/notes" element={
              <ProtectedRoute>
                <MainLayout>
                  <CustomerNotes />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/plant-categories" element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout>
                  <PlantCategories />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/manage-plant" element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout>
                  <ManagePlant />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/certificate/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <CertificatePage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/plant-holding" element={
              <ProtectedRoute>
                <MainLayout>
                  <CustomerPlantHolding />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/user-management" element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout>
                  <UserManagement />
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
