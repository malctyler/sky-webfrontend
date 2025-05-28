import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { AxiosError } from 'axios';
import { register } from '../../services/authService';
import styles from './Register.module.css';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    isCustomer: boolean;
    customerId: string;
    role?: string;
}

interface ErrorResponse {
    message?: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        isCustomer: false,
        customerId: '',
        role: ''
    });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Only send fields expected by backend
            const registerData = {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                isCustomer: formData.isCustomer,
                customerId: formData.customerId ? parseInt(formData.customerId, 10) : null,
                emailConfirmed: false // or true if you want to default to confirmed
            };
            await register(registerData);
            navigate('/login');
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.message || 'Failed to register';
            setError(errorMsg);
        }
    };

    return (
        <Box className={styles.registerContainer}>
            <Paper elevation={3} className={styles.registerPaper}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Register
                </Typography>
                {error && (
                    <Typography color="error" gutterBottom>
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isCustomer"
                                checked={formData.isCustomer}
                                onChange={handleChange}
                            />
                        }
                        label="Register as Customer"
                    />
                    {formData.isCustomer && (
                        <TextField
                            fullWidth
                            label="Customer ID"
                            name="customerId"
                            type="number"
                            value={formData.customerId}
                            onChange={handleChange}
                            margin="normal"
                            required
                            inputProps={{ min: 0 }}
                        />
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Register
                    </Button>
                </form>
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Already have an account?
                    </Typography>
                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        color="primary"
                        fullWidth
                    >
                        Back to Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
export default Register;
