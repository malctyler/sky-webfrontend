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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './components/AllCustomers.css';
import './components/CustomerNotes.css';
import './components/PlantCategories.css';
import './components/ManagePlant.css';
import CustomerPlantHolding from './components/CustomerPlantHolding';
import UserManagement from './components/UserManagement';
import Home from './components/Home';
import Weather from './components/Weather';
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';




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
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: 'var(--background-default)'
      }}>
        <div>Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is a customer, only allow access to specific routes
  if (user.isCustomer) {
    const allowedCustomerPaths = ['/plant-holding', '/weather'];
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

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <Router>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
              {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute requireAdmin={false} requireStaffOrAdmin={false}><MainLayout><Home /></MainLayout></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute requireAdmin={false} requireStaffOrAdmin={false}><MainLayout><Home /></MainLayout></ProtectedRoute>} />
            <Route path="/weather" element={<ProtectedRoute requireAdmin={false} requireStaffOrAdmin={false}><MainLayout><Weather /></MainLayout></ProtectedRoute>} />
            <Route path="/plant-holding" element={<ProtectedRoute requireAdmin={false} requireStaffOrAdmin={false}><MainLayout><CustomerPlantHolding /></MainLayout></ProtectedRoute>} />
              {/* Admin/Staff Only Routes */}
            <Route path="/customers" element={<ProtectedRoute requireAdmin={false} requireStaffOrAdmin={true}><MainLayout><AllCustomers /></MainLayout></ProtectedRoute>} />
            <Route path="/customers/:custId" element={<ProtectedRoute requireAdmin={false} requireStaffOrAdmin={true}><MainLayout><CustomerSummary /></MainLayout></ProtectedRoute>} />
            <Route path="/customers/:custId/notes" element={<ProtectedRoute requireAdmin={false} requireStaffOrAdmin={true}><MainLayout><CustomerNotes /></MainLayout></ProtectedRoute>} />
            <Route path="/plant-categories" element={<ProtectedRoute requireAdmin={true} requireStaffOrAdmin={false}><MainLayout><PlantCategories /></MainLayout></ProtectedRoute>} />
            <Route path="/manage-plant" element={<ProtectedRoute requireAdmin={true} requireStaffOrAdmin={false}><MainLayout><ManagePlant /></MainLayout></ProtectedRoute>} />
            <Route path="/user-management" element={<ProtectedRoute requireAdmin={true} requireStaffOrAdmin={false}><MainLayout><UserManagement /></MainLayout></ProtectedRoute>} />
            <Route path="/certificate/:id" element={<CertificatePage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
