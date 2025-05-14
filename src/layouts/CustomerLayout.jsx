import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import CustomerPlantHolding from '../components/CustomerPlantHolding';

const CustomerLayout = () => {
  const { user } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // If not a customer, redirect to home
  if (!user.isCustomer) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="customer-layout">
      <div className="container">
        <CustomerPlantHolding />
      </div>
    </div>
  );
};

export default CustomerLayout;