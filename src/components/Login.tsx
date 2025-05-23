import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { AxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

interface ErrorResponse {
    message?: string;
}

interface LoginProps {
    redirectTo?: string;
}

const Login: React.FC<LoginProps> = ({ redirectTo }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { login, refreshEmailConfirmation } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Try logging in
            const userData = await login(email, password);
            // Navigate based on user type after successful login
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
    };    return (
        <Box className={styles['login-container']}>
            <Paper elevation={3} className={styles['login-paper']}>
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
                    />                    <Button
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

export default Login;
