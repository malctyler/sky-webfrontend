import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';

// Critical components that should load immediately
import LoginForm from './components/Auth/LoginForm';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import Home from './components/Common/Home';
import CustomerHome from './components/Customer/CustomerHome';

// Lazy load components that aren't needed immediately
const AllCustomers = React.lazy(() => import('./components/Customer/AllCustomers'));
const CustomerNotes = React.lazy(() => import('./components/Customer/CustomerNotes'));
const CustomerSummary = React.lazy(() => import('./components/Customer/CustomerSummary'));
const PlantCategories = React.lazy(() => import('./components/Plant/PlantCategories'));
const ManagePlant = React.lazy(() => import('./components/Plant/ManagePlant'));
const CertificatePage = React.lazy(() => import('./components/Inspection/CertificatePage'));
const CustomerPlantHolding = React.lazy(() => import('./components/Customer/CustomerPlantHolding'));
const UserManagement = React.lazy(() => import('./components/UserManagement/UserManagement'));
const Weather = React.lazy(() => import('./components/Weather/Weather'));
const SchedulingList = React.lazy(() => import('./components/Scheduling/SchedulingList'));
const MultiInspectionPage = React.lazy(() => import('./components/Inspection/MultiInspectionPage'));
const ViewMultiCertificate = React.lazy(() => import('./components/Inspection/ViewMultiCertificate'));
const SendMultiCertificate = React.lazy(() => import('./components/Inspection/SendMultiCertificate'));
const GenerateInvoice = React.lazy(() => import('./components/Invoicing/GenerateInvoice'));
const LedgerList = React.lazy(() => import('./components/Invoicing/Ledger/LedgerList'));

// Loading component for lazy-loaded routes
const LoadingFallback: React.FC = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px' 
  }}>
    <CircularProgress />
  </Box>
);

// Helper component to wrap lazy-loaded components with Suspense
const LazyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

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
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
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
                <Route path="/forgot-password" element={
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
                        Forgot Password
                      </Typography>
                      <ForgotPassword />
                    </Paper>
                  </Box>
                } />
                <Route path="/reset-password" element={
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
                        Reset Password
                      </Typography>
                      <ResetPassword />
                    </Paper>
                  </Box>
                } />
                <Route
                  path="/certificate/:id"
                  element={
                    <ProtectedRoute requireStaffOrAdmin>
                      <LazyWrapper>
                        <CertificatePage />
                      </LazyWrapper>
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
                  <Route path="/weather" element={
                    <LazyWrapper>
                      <Weather />
                    </LazyWrapper>
                  } />
                  <Route path="/plant-holding" element={
                    <LazyWrapper>
                      <CustomerPlantHolding />
                    </LazyWrapper>
                  } />
                  <Route
                    path="/customers"
                    element={
                      <ProtectedRoute requireStaffOrAdmin>
                        <LazyWrapper>
                          <AllCustomers />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customers/:custId"
                    element={
                      <ProtectedRoute requireStaffOrAdmin>
                        <LazyWrapper>
                          <CustomerSummary />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customers/:custId/notes"
                    element={
                      <ProtectedRoute requireStaffOrAdmin>
                        <LazyWrapper>
                          <CustomerNotes />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/scheduling"
                    element={
                      <ProtectedRoute requireStaffOrAdmin>
                        <LazyWrapper>
                          <SchedulingList />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/multi-inspection"
                    element={
                      <ProtectedRoute requireStaffOrAdmin>
                        <LazyWrapper>
                          <MultiInspectionPage />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/multi-inspection/enter"
                    element={
                      <ProtectedRoute requireStaffOrAdmin>
                        <LazyWrapper>
                          <MultiInspectionPage />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/multi-inspection/view-certificate"
                    element={
                      <ProtectedRoute requireStaffOrAdmin>
                        <LazyWrapper>
                          <ViewMultiCertificate />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/multi-inspection/send-certificate"
                    element={
                      <ProtectedRoute requireStaffOrAdmin>
                        <LazyWrapper>
                          <SendMultiCertificate />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/plant-categories"
                    element={
                      <ProtectedRoute requireAdmin>
                        <LazyWrapper>
                          <PlantCategories />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manage-plant"
                    element={
                      <ProtectedRoute requireAdmin>
                        <LazyWrapper>
                          <ManagePlant />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-management"
                    element={
                      <ProtectedRoute requireAdmin>
                        <LazyWrapper>
                          <UserManagement />
                        </LazyWrapper>
                      </ProtectedRoute>
                    }
                  />                <Route path="/invoicing">
                    <Route path="generate" element={
                      <ProtectedRoute requireAdmin>
                        <LazyWrapper>
                          <GenerateInvoice />
                        </LazyWrapper>
                      </ProtectedRoute>
                    } />
                    <Route path="ledger" element={
                      <ProtectedRoute requireAdmin>
                        <LazyWrapper>
                          <LedgerList />
                        </LazyWrapper>
                      </ProtectedRoute>
                    } />
                  </Route>
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Route>
              </Routes>
            </LocalizationProvider>
          </Router>
        </AuthProvider>
      </CustomThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
