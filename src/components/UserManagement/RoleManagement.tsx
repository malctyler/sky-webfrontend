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
import { Role, AssignRoleDto } from '../../types/roleTypes';
import { User } from '../../types/userTypes';

interface RoleManagementProps {
  user: User;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ user }) => {
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<Role[]>([]);
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
        roleService.getAll(),
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
      const assignRoleDto: AssignRoleDto = {
        userId: user.id,
        roleId: selectedRole.id
      };
      await roleService.assignRole(assignRoleDto);
      setUserRoles([...userRoles, selectedRole]);
      setSelectedRole(null);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to assign role');
      console.error('Error assigning role:', err);
    }
  };

  const handleRemoveRole = async (role: Role) => {
    try {
      setError(null);
      const assignRoleDto: AssignRoleDto = {
        userId: user.id,
        roleId: role.id
      };
      await roleService.removeRole(assignRoleDto);
      setUserRoles(userRoles.filter(r => r.id !== role.id));
    } catch (err: any) {
      setError(err.response?.data || 'Failed to remove role');
      console.error('Error removing role:', err);
    }
  };

  const getAvailableRolesForAdd = () => {
    return availableRoles.filter(role => !userRoles.some(userRole => userRole.id === role.id));
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
          isOptionEqualToValue={(option, value) => option.id === value.id}
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
          onClick={handleAddRole}
          disabled={!selectedRole}
          style={{ marginTop: '0.5rem' }}
        >
          Add Role
        </Button>
      </div>

      <List>
        {userRoles.map((role) => (
          <ListItem key={role.id}>
            <ListItemText primary={role.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleRemoveRole(role)}>
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
