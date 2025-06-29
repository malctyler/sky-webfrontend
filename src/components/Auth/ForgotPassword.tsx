import React, { useState, FormEvent } from 'react';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box, 
  CircularProgress,
  Alert
} from '@mui/material';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await apiClient.post('/Auth/forgot-password', { email });
      setMessage('If the email exists in our system, a password reset link has been sent.');
    } catch (err: any) {
      console.error('Forgot password error:', err);
      
      if (err.response?.status === 503) {
        // Handle service unavailable (email not configured)
        const errorData = err.response?.data;
        if (errorData?.Error === 'EMAIL_SERVICE_UNAVAILABLE') {
          setError('Email service is currently unavailable. Please contact an administrator to reset your password.');
        } else if (errorData?.Error === 'EMAIL_DELIVERY_FAILED') {
          setError('Email service is experiencing technical difficulties. Please try again later or contact an administrator.');
        } else {
          setError('Email service is temporarily unavailable. Please try again later.');
        }
      } else {
        setError(err.response?.data?.message || 'An error occurred while sending the reset email.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          maxWidth: 400, 
          width: '100%' 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Forgot Password
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Back to Login
              </Typography>
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
