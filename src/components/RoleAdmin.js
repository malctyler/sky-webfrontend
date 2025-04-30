import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import roleService from '../services/roleService';

const RoleAdmin = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');

  const fetchRoles = async () => {
    const data = await roleService.getRoles();
    setRoles(data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    if (newRole) {
      await roleService.createRole({ name: newRole });
      setNewRole('');
      fetchRoles();
    }
  };

  const handleDeleteRole = async (role) => {
    await roleService.deleteRole(role.id);
    fetchRoles();
  };

  // Placeholder for editing roles (if needed in future)

  return (
    <div>
      <TextField label="New Role" value={newRole} onChange={e => setNewRole(e.target.value)} />
      <Button onClick={handleAddRole}>Add Role</Button>
      <List>
        {roles.map(role => (
          <ListItem key={role.id} secondaryAction={<Button color="error" onClick={() => handleDeleteRole(role)}>Delete</Button>}>
            <ListItemText primary={role.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoleAdmin;
