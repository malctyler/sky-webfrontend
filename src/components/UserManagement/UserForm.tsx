import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import userService from '../../services/userService';
import { User, CreateUserDto, UpdateUserDto } from '../../types/userTypes';

interface UserFormProps {
  user: User | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface UserFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isCustomer: boolean;
  customerId: string;
  emailConfirmed: boolean;
}

const convertFormToDto = (form: UserFormData): CreateUserDto | UpdateUserDto => {
  return {
    ...form,
    customerId: form.customerId ? parseInt(form.customerId, 10) : null
  };
};

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess, onCancel }) => {  const [form, setForm] = useState<UserFormData>({
    email: user?.email || '',
    password: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    isCustomer: user?.isCustomer || false,
    customerId: user?.customerId?.toString() || '',
    emailConfirmed: user?.emailConfirmed || false,
  });
  const [error, setError] = useState<any>(null);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('Password must be at least 8 characters long');
    if (!/\d/.test(password)) errors.push('Password must contain at least one digit');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
    if (!/[!@#$%^&*]/.test(password)) errors.push('Password must contain at least one special character (!@#$%^&*)');
    return errors;
  };
  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        ...user,
        password: '', // Don't populate password field for existing users
        customerId: user.customerId?.toString() || '' // Convert number to string for form
      }));
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate password for new users
    if (!user && form.password) {
      const passwordErrors = validatePassword(form.password);
      if (passwordErrors.length > 0) {
        setError(passwordErrors);
        return;
      }
    }

    try {
      const dto = convertFormToDto(form);
      if (user) {
        await userService.updateUser(user.id, dto);
      } else {
        await userService.createUser(dto as CreateUserDto);
      }
      onSuccess();
    } catch (err: any) {
      if (err.response?.data) {
        // Handle array of validation errors from the server
        if (Array.isArray(err.response.data)) {
          setError(err.response.data);
        } else {
          // Handle single error message
          setError([{ description: err.response.data.message || 'Failed to save user' }]);
        }
      } else {
        setError([{ description: err.message || 'Failed to save user' }]);
      }
      console.error('Error saving user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      {!user && (
        <>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            helperText="Password must contain at least 8 characters, one digit, one uppercase letter, one lowercase letter, and one special character (!@#$%^&*)"
          />
        </>
      )}
      <TextField
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            name="isCustomer"
            checked={form.isCustomer}
            onChange={handleChange}
          />
        }
        label="Is Customer"
      />
      {form.isCustomer && (
        <TextField
          label="Customer ID"
          name="customerId"
          value={form.customerId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      )}
      <FormControlLabel
        control={
          <Checkbox
            name="emailConfirmed"
            checked={form.emailConfirmed}
            onChange={handleChange}
          />
        }
        label="Email Confirmed"
      />

      {error && (
        <div style={{ color: 'red', marginTop: '16px' }}>
          {Array.isArray(error) ? (
            error.map((err, index) => (
              <p key={index} style={{ margin: '4px 0' }}>
                {typeof err === 'string' ? err : err.description}
              </p>
            ))
          ) : (
            <p>{error.toString()}</p>
          )}
        </div>
      )}

      <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {user ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
