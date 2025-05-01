import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField, Alert, Typography } from '@mui/material';
import roleService from '../services/roleService';
import { useAuth } from '../contexts/AuthContext';

const RoleAdmin = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { hasRole } = useAuth();

  const fetchRoles = async () => {
    try {
      setError('');
      const data = await roleService.getRoles();
      setRoles(data);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError(err.response?.data || 'Failed to fetch roles');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    if (!hasRole('Staff')) {
      setError('You must be a Staff member to manage roles');
      return;
    }

    if (!newRole?.trim()) {
      setError('Role name cannot be empty');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await roleService.createRole(newRole.trim());
      setNewRole('');
      await fetchRoles();
    } catch (err) {
      console.error('Error adding role:', err);
      setError(err.response?.data || 'Failed to add role');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (role) => {
    if (!hasRole('Staff')) {
      setError('You must be a Staff member to manage roles');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      await roleService.deleteRole(role.id);
      await fetchRoles();
    } catch (err) {
      console.error('Error deleting role:', err);
      setError(err.response?.data || 'Failed to delete role');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newRole.trim()) {
      handleAddRole();
    }
  };

  if (!hasRole('Staff')) {
    return (
      <Alert severity="error">
        You must be a Staff member to access this page.
      </Alert>
    );
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Manage Roles
      </Typography>
      
      <div style={{ marginBottom: 16 }}>
        <TextField 
          label="New Role" 
          value={newRole} 
          onChange={e => setNewRole(e.target.value)}
          onKeyPress={handleKeyPress}
          error={!!error && error.includes('empty')}
          helperText={error && error.includes('empty') ? error : ''}
          disabled={loading}
          fullWidth
        />
        <Button 
          onClick={handleAddRole} 
          disabled={loading || !newRole.trim()} 
          variant="contained" 
          sx={{ mt: 1 }}
          fullWidth
        >
          {loading ? 'Adding...' : 'Add Role'}
        </Button>
      </div>
      
      {error && !error.includes('empty') && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      <List>
        {roles.map(role => (
          <ListItem 
            key={role.id} 
            secondaryAction={
              <Button 
                color="error" 
                onClick={() => handleDeleteRole(role)} 
                disabled={loading}
              >
                Delete
              </Button>
            }
          >
            <ListItemText primary={role.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoleAdmin;
