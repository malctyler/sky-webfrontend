import React, { useState, FormEvent } from 'react';
import { TextField, Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AxiosError } from 'axios';

interface LoginFormProps {
  redirectTo?: string;
}

interface ErrorResponse {
  message?: string;
}

class LoginFormErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('LoginForm Error:', error);
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">Error loading login form:</Typography>
          <pre style={{ color: 'red' }}>{this.state.error?.message}</pre>
        </Box>
      );
    }
    return this.props.children;
  }
}

const InnerLoginForm: React.FC<LoginFormProps> = ({ redirectTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, refreshEmailConfirmation } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login(email, password);
      
      if (redirectTo) {
        navigate(redirectTo);
      } else if (userData.isCustomer) {
        navigate('/plant-holding');
      } else {
        navigate('/');
      }
    } catch (err) {
      // If the error is about unconfirmed email, try refreshing the confirmation status
      const axiosError = err as AxiosError<ErrorResponse>;
      if (axiosError.response?.data?.message?.includes('confirm your email')) {
        try {
          const confirmed = await refreshEmailConfirmation();
          if (confirmed) {
            // If email is now confirmed, try logging in again with same user type check
            const userData = await login(email, password);
            if (redirectTo) {
              navigate(redirectTo);
            } else if (userData.isCustomer) {
              navigate('/plant-holding');
            } else {
              navigate('/');
            }
            return;
          }
        } catch (refreshError) {
          console.error('Error refreshing email confirmation:', refreshError);
        }
      }
      // Show backend error message if present
      const backendMsg = axiosError.response?.data?.message;
      setError(backendMsg || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    }}>
      <Paper 
        elevation={3} 
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            disabled={loading}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Don't have an account?
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Create Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  return (
    <LoginFormErrorBoundary>
      <InnerLoginForm {...props} />
    </LoginFormErrorBoundary>
  );
};

export default LoginForm;
