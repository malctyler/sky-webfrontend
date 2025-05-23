import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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
  
    if (loading) {
        return <div>Loading...</div>;
    }
  
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If user is a customer, they can only access their own plant holdings and weather
    if (user.isCustomer) {
        const allowedPaths = ['/plant-holding', '/weather'];
        const currentPath = window.location.pathname;
    
        if (!allowedPaths.includes(currentPath)) {
            return <Navigate to="/plant-holding" />;
        }
    }

    // Check if admin role is required and user doesn't have it
    if (requireAdmin && !user.roles?.includes('Admin')) {
        return <Navigate to={user.isCustomer ? '/plant-holding' : '/'} />;
    }

    // Check if staff/admin role is required and user doesn't have either
    if (requireStaffOrAdmin && !(user.roles?.includes('Staff') || user.roles?.includes('Admin'))) {
        return <Navigate to={user.isCustomer ? '/plant-holding' : '/'} />;
    }
  
    return <>{children}</>;
}

export default ProtectedRoute;
