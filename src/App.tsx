import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import AllCustomers from './components/Customer/AllCustomers';
import CustomerNotes from './components/Customer/CustomerNotes';
import CustomerSummary from './components/Customer/CustomerSummary';
import PlantCategories from './components/Plant/PlantCategories';
import ManagePlant from './components/Plant/ManagePlant';
import CertificatePage from './components/Inspection/CertificatePage';
import LoginForm from './components/Auth/LoginForm';
import Register from './components/Auth/Register';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CustomerPlantHolding from './components/Customer/CustomerPlantHolding';
import UserManagement from './components/UserManagement/UserManagement';
import Home from './components/Common/Home';
import CustomerHome from './components/Customer/CustomerHome';
import Weather from './components/Weather/Weather';
import MainLayout from './components/Layout/MainLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireStaffOrAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false, 
  requireStaffOrAdmin = false 
}) => {
  const { user, loading } = useAuth();
  const currentPath = window.location.pathname;
  
  // If we're loading, show nothing - the AuthProvider will show its own loading state
  if (loading) {
    return null;
  }
  
  // No user means redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: currentPath }} />;
  }

  // If the user is a customer, only allow access to specific routes
  if (user.isCustomer) {
    const allowedCustomerPaths = ['/plant-holding', '/home'];
    if (!allowedCustomerPaths.includes(currentPath)) {
      return <Navigate to="/plant-holding" replace state={{ from: currentPath }} />;
    }
  }

  // Check if admin role is required
  if (requireAdmin && !user.roles?.includes('Admin')) {
    return <Navigate to={user.isCustomer ? '/plant-holding' : '/'} replace state={{ from: currentPath }} />;
  }

  // Check if staff/admin role is required
  if (requireStaffOrAdmin && !(user.roles?.includes('Staff') || user.roles?.includes('Admin'))) {
    return <Navigate to={user.isCustomer ? '/plant-holding' : '/'} replace state={{ from: currentPath }} />;
  }
  
  return <>{children}</>;
};

// Authentication check component
const AuthCheck: React.FC<{ children: React.ReactNode | ((props: { user: any }) => React.ReactNode) }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Loading...
      </Box>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (typeof children === 'function') {
    return <>{children({ user })}</>;
  }
  
  return <>{children}</>;
};

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} />;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <CustomThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={
                <Box
                  component="main"
                  sx={{
                    minHeight: '100vh',
                    width: '100%',
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      width: '100%',
                      maxWidth: 400,
                      bgcolor: 'background.paper'
                    }}
                  >                  <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                    Login
                  </Typography>
                  <LoginForm redirectTo="/home" />
                  </Paper>
                </Box>
              } />
              <Route path="/register" element={
                <Box
                  component="main"
                  sx={{
                    minHeight: '100vh',
                    width: '100%',
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      width: '100%',
                      maxWidth: 400,
                      bgcolor: 'background.paper'
                    }}
                  >
                    <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                      Register
                    </Typography>
                    <Register />
                  </Paper>
                </Box>
              } />
              <Route
                path="/certificate/:id"
                element={
                  <ProtectedRoute requireStaffOrAdmin>
                    <CertificatePage />
                  </ProtectedRoute>
                }
              />
              <Route element={<AuthCheck><MainLayout /></AuthCheck>}>
                <Route path="/" element={
                  <Navigate to="/home" replace />
                } />
                <Route path="/home" element={
                  <AuthCheck>
                    {({ user }: { user: any }) => (
                      user?.isCustomer ? <CustomerHome /> : <Home />
                    )}
                  </AuthCheck>
                } />
                <Route path="/weather" element={<Weather />} />
                <Route path="/plant-holding" element={<CustomerPlantHolding />} />
                <Route
                  path="/customers"
                  element={
                    <ProtectedRoute requireStaffOrAdmin>
                      <AllCustomers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customers/:custId"
                  element={
                    <ProtectedRoute requireStaffOrAdmin>
                      <CustomerSummary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customers/:custId/notes"
                  element={
                    <ProtectedRoute requireStaffOrAdmin>
                      <CustomerNotes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/plant-categories"
                  element={
                    <ProtectedRoute requireAdmin>
                      <PlantCategories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-plant"
                  element={
                    <ProtectedRoute requireAdmin>
                      <ManagePlant />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user-management"
                  element={
                    <ProtectedRoute requireAdmin>
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </CustomThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
