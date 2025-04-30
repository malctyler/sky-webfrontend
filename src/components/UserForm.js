import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import userService from '../services/userService';

const UserForm = ({ user, onSuccess }) => {
  const [form, setForm] = useState({
    email: user?.email || '',
    password: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    isCustomer: user?.isCustomer || false,
    customerId: user?.customerId || '',
    emailConfirmed: user?.emailConfirmed || false,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        ...user,
        password: '',
        emailConfirmed: user.emailConfirmed !== undefined ? user.emailConfirmed : false
      }));
    }
  }, [user]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (user) {
        await userService.updateUser(user.id, form);
      } else {
        await userService.createUser(form);
      }
      onSuccess();
    } catch (err) {
      setError('Failed to save user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required disabled={!!user} />
      {!user && <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />}
      <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} fullWidth margin="normal" required />
      <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} fullWidth margin="normal" required />
      <FormControlLabel control={<Checkbox checked={form.isCustomer} onChange={handleChange} name="isCustomer" />} label="Is Customer" />
      <TextField label="Customer ID" name="customerId" value={form.customerId} onChange={handleChange} fullWidth margin="normal" />
      <FormControlLabel control={<Checkbox checked={!!form.emailConfirmed} onChange={handleChange} name="emailConfirmed" />} label="Email Confirmed" />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button type="submit" variant="contained" color="primary">Save</Button>
    </form>
  );
};

export default UserForm;
