import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import roleService from '../services/roleService';

const RoleAdmin = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRoles = async () => {
    try {
      setError('');
      const data = await roleService.getRoles();
      setRoles(data);
    } catch (err) {
      setError('Failed to fetch roles');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    if (newRole) {
      setLoading(true);
      setError('');
      try {
        await roleService.createRole({ name: newRole });
        setNewRole('');
        fetchRoles();
      } catch (err) {
        setError('Failed to add role');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteRole = async (role) => {
    setLoading(true);
    setError('');
    try {
      await roleService.deleteRole(role.id);
      fetchRoles();
    } catch (err) {
      setError('Failed to delete role');
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for editing roles (if needed in future)

  return (
    <div>
      <TextField label="New Role" value={newRole} onChange={e => setNewRole(e.target.value)} />
      <Button onClick={handleAddRole} disabled={loading}>{loading ? 'Adding...' : 'Add Role'}</Button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      <List>
        {roles.map(role => (
          <ListItem key={role.id} secondaryAction={<Button color="error" onClick={() => handleDeleteRole(role)} disabled={loading}>Delete</Button>}>
            <ListItemText primary={role.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoleAdmin;
