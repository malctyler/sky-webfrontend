import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import roleService from '../services/roleService';

const RoleManagement = ({ user }) => {
  const [userRoles, setUserRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  const fetchUserRoles = async () => {
    if (user) {
      const data = await roleService.getUserRoles(user.id);
      setUserRoles(data);
    }
  };

  const fetchAllRoles = async () => {
    const data = await roleService.getRoles();
    setAllRoles(data);
  };

  useEffect(() => {
    fetchAllRoles();
    fetchUserRoles();
    // eslint-disable-next-line
  }, [user]);

  const handleAddRole = async () => {
    if (selectedRole) {
      await roleService.assignRoleToUser(user.id, selectedRole);
      setSelectedRole('');
      fetchUserRoles();
    }
  };

  const handleRemoveRole = async (roleName) => {
    await roleService.removeRoleFromUser(user.id, roleName);
    fetchUserRoles();
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
      <Button onClick={handleAddRole} disabled={!selectedRole}>Add Role</Button>
      <List>
        {userRoles.map(roleName => (
          <ListItem key={roleName} secondaryAction={<Button color="error" onClick={() => handleRemoveRole(roleName)}>Remove</Button>}>
            <ListItemText primary={roleName} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoleManagement;
