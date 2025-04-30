import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import roleService from '../services/roleService';

const RoleManagement = ({ user }) => {
  const [userRoles, setUserRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUserRoles = async () => {
    if (user) {
      try {
        setError('');
        const data = await roleService.getUserRoles(user.id);
        setUserRoles(data);
      } catch (err) {
        setError('Failed to fetch user roles');
      }
    }
  };

  const fetchAllRoles = async () => {
    try {
      setError('');
      const data = await roleService.getRoles();
      setAllRoles(data);
    } catch (err) {
      setError('Failed to fetch all roles');
    }
  };

  useEffect(() => {
    fetchAllRoles();
    fetchUserRoles();
    // eslint-disable-next-line
  }, [user]);

  const handleAddRole = async () => {
    if (selectedRole) {
      setLoading(true);
      setError('');
      try {
        await roleService.assignRoleToUser(user.id, selectedRole);
        setSelectedRole('');
        fetchUserRoles();
      } catch (err) {
        setError('Failed to add role to user');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveRole = async (roleName) => {
    setLoading(true);
    setError('');
    try {
      await roleService.removeRoleFromUser(user.id, roleName);
      fetchUserRoles();
    } catch (err) {
      setError('Failed to remove role from user');
    } finally {
      setLoading(false);
    }
  };

  // Only show roles that the user does not already have
  const availableRoles = allRoles.filter(r => !userRoles.includes(r.name));

  return (
    <div>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Add Role</InputLabel>
        <Select
          value={selectedRole}
          label="Add Role"
          onChange={e => setSelectedRole(e.target.value)}
        >
          {availableRoles.map(role => (
            <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleAddRole} disabled={!selectedRole || loading}>{loading ? 'Adding...' : 'Add Role'}</Button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      <List>
        {userRoles.map(roleName => (
          <ListItem key={roleName} secondaryAction={<Button color="error" onClick={() => handleRemoveRole(roleName)} disabled={loading}>Remove</Button>}>
            <ListItemText primary={roleName} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoleManagement;
