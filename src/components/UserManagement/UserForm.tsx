import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import * as userService from '../../services/userService';
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
  const dto = {
    ...form,
    customerId: form.customerId ? parseInt(form.customerId, 10) : null
  };
  
  // Debug: Log the conversion
  console.log('Converting form to DTO:', form, '->', dto);
  
  return dto;
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
  const [error, setError] = useState<string>('');
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

    // Basic client-side validation
    if (!user && !form.password) {
      setError('Password is required for new users');
      return;
    }

    // Validate password requirements for new users
    if (!user && form.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
      if (!passwordRegex.test(form.password)) {
        setError('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
        return;
      }
    }

    // Validate name patterns
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
    if (!nameRegex.test(form.firstName)) {
      setError('First name can only contain letters, spaces, hyphens, apostrophes, and periods');
      return;
    }
    if (!nameRegex.test(form.lastName)) {
      setError('Last name can only contain letters, spaces, hyphens, apostrophes, and periods');
      return;
    }

    // Validate customer ID if provided
    if (form.isCustomer && form.customerId && isNaN(parseInt(form.customerId))) {
      setError('Customer ID must be a valid number');
      return;
    }

    try {
      const dto = convertFormToDto(form);
      
      // Debug: Log the DTO being sent
      console.log('Sending user data:', dto);
      
      if (user) {
        await userService.update(user.id, dto);
      } else {
        await userService.create(dto as CreateUserDto);
      }
      onSuccess();
    } catch (err: any) {
      // Better error handling for server responses
      let errorMessage = 'Failed to save user';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.errors) {
          // Handle validation errors from backend
          const errors = err.response.data.errors;
          const errorMessages = [];
          for (const field in errors) {
            errorMessages.push(...errors[field]);
          }
          errorMessage = errorMessages.join('. ');
        } else if (err.response.data.title) {
          errorMessage = err.response.data.title;
        } else if (Array.isArray(err.response.data)) {
          // Handle Identity errors
          errorMessage = err.response.data.map((e: any) => e.description || e.message || e).join('. ');
        }
      }
      
      setError(errorMessage);
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
            helperText="Password must contain at least 8 characters: one lowercase, one uppercase, one digit, and one special character"
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
        helperText="Letters, spaces, hyphens, apostrophes, and periods only"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        helperText="Letters, spaces, hyphens, apostrophes, and periods only"
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
          type="number"
          value={form.customerId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          helperText="Must be a positive number"
          inputProps={{ min: 1 }}
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
        <p style={{ color: 'red' }}>{error}</p>
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
