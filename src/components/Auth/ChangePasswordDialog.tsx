import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
    CircularProgress
} from '@mui/material';
import { changePassword } from '../../services/authService';
import { ChangePasswordData } from '../../types/authTypes';

interface ChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ open, onClose }) => {
    const [formData, setFormData] = useState<ChangePasswordData>({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (field: keyof ChangePasswordData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
        // Clear error when user starts typing
        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.currentPassword) {
            setError('Current password is required');
            return;
        }

        if (!formData.newPassword) {
            setError('New password is required');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('New password must be at least 6 characters long');
            return;
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            setError('New password and confirmation do not match');
            return;
        }

        if (formData.currentPassword === formData.newPassword) {
            setError('New password must be different from current password');
            return;
        }

        setLoading(true);
        try {
            await changePassword(formData);
            setSuccess('Password changed successfully!');
            setTimeout(() => {
                onClose();
                handleReset();
            }, 1500);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 
                                err.response?.data?.Errors?.[0] ||
                                'Failed to change password. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
        setError('');
        setSuccess('');
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Change Password</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Current Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={formData.currentPassword}
                        onChange={handleChange('currentPassword')}
                        disabled={loading}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={formData.newPassword}
                        onChange={handleChange('newPassword')}
                        disabled={loading}
                        required
                        helperText="Password must be at least 6 characters long"
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        margin="dense"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={formData.confirmNewPassword}
                        onChange={handleChange('confirmNewPassword')}
                        disabled={loading}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={loading || success !== ''}
                        startIcon={loading ? <CircularProgress size={20} /> : undefined}
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ChangePasswordDialog;
