import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, refreshEmailConfirmation } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // Try logging in
            await login(email, password);
            navigate('/');
        } catch (err) {
            // If the error is about unconfirmed email, try refreshing the confirmation status
            if (err?.response?.data?.message?.includes('confirm your email')) {
                try {
                    const confirmed = await refreshEmailConfirmation();
                    if (confirmed) {
                        // If email is now confirmed, try logging in again
                        await login(email, password);
                        navigate('/');
                        return;
                    }
                } catch (refreshError) {
                    console.error('Error refreshing email confirmation:', refreshError);
                }
            }
            // Show backend error message if present
            const backendMsg = err?.response?.data?.message;
            setError(backendMsg || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="login-container">
            <Paper elevation={3} className="login-paper">
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
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;