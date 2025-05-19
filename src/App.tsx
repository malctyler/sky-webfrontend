import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './components/Login';
import Home from './components/Home';
import AllCustomers from './components/AllCustomers';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {  
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/customers" element={
              <ProtectedRoute>
                <AllCustomers />
              </ProtectedRoute>
            } />
            {/* Add other protected routes similarly */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;