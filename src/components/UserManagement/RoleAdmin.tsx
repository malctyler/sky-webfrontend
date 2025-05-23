import React, { useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';
import { Button, List, ListItem, ListItemText, TextField, Alert, Typography } from '@mui/material';
import roleService from '../../services/roleService';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types/roleTypes';

const RoleAdmin: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { hasRole } = useAuth();

  const fetchRoles = async (): Promise<void> => {
    try {
      setError('');
      const data = await roleService.getRoles();
      setRoles(data);
    } catch (err: any) {
      console.error('Error fetching roles:', err);
      setError(err.response?.data || 'Failed to fetch roles');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async (): Promise<void> => {
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
    } catch (err: any) {
      console.error('Error adding role:', err);
      setError(err.response?.data || 'Failed to add role');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (role: Role): Promise<void> => {
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
    } catch (err: any) {
      console.error('Error deleting role:', err);
      setError(err.response?.data || 'Failed to delete role');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>): void => {
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewRole(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <Button 
          variant="contained" 
          onClick={handleAddRole} 
          disabled={loading || !newRole.trim()}
          sx={{ mt: 1 }}
        >
          Add Role
        </Button>
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <List>
        {roles.map((role) => (
          <ListItem 
            key={role.id}
            secondaryAction={
              <Button 
                onClick={() => handleDeleteRole(role)}
                disabled={loading}
                color="error"
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
