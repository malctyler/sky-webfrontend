import React, { useEffect, useState } from 'react';
import { 
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Autocomplete,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import roleService from '../../services/roleService';
import { Role } from '../../types/roleTypes';
import { User } from '../../types/userTypes';

interface RoleManagementProps {
  user: User;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ user }) => {
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user?.id]);
  const loadData = async () => {
    try {
      setError(null);
      const [roles, userRolesData] = await Promise.all([
        roleService.getRoles(),
        roleService.getUserRoles(user.id)
      ]);
      setAvailableRoles(roles);
      setUserRoles(userRolesData);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to load roles');
      console.error('Error loading roles:', err);
    }
  };
  const handleAddRole = async () => {
    if (!selectedRole) return;

    try {
      setError(null);
      await roleService.assignRoleToUser(user.id, selectedRole.name);
      setUserRoles([...userRoles, selectedRole.name]);
      setSelectedRole(null);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to assign role');
      console.error('Error assigning role:', err);
    }
  };

  const handleRemoveRole = async (roleName: string) => {
    try {
      setError(null);
      await roleService.removeRoleFromUser(user.id, roleName);
      setUserRoles(userRoles.filter(role => role !== roleName));
    } catch (err: any) {
      setError(err.response?.data || 'Failed to remove role');
      console.error('Error removing role:', err);
    }
  };

  const getAvailableRolesForAdd = () => {
    return availableRoles.filter(role => !userRoles.includes(role.name));
  };

  return (
    <div>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <Autocomplete
          value={selectedRole}
          onChange={(_, newValue) => setSelectedRole(newValue)}
          options={getAvailableRolesForAdd()}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add Role"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRole}
          disabled={!selectedRole}
          sx={{ mt: 1 }}
          fullWidth
        >
          Add Role
        </Button>
      </div>

      <List>
        {userRoles.map((roleName) => (
          <ListItem key={roleName}>
            <ListItemText primary={roleName} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleRemoveRole(roleName)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoleManagement;
