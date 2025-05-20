import React, { useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
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
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import roleService from '../services/roleService';
import { Role } from '../types/roleTypes';

interface RoleManagementProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ open, onClose, userId, userName }) => {
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open, userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [roles, userRolesData] = await Promise.all([
        roleService.getRoles(),
        roleService.getUserRoles(userId)
      ]);
      setAvailableRoles(roles);
      setUserRoles(userRolesData);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to load roles');
      console.error('Error loading roles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = async () => {
    if (!selectedRole) return;

    try {
      setError(null);
      await roleService.assignRole(userId, selectedRole.name);
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
      await roleService.removeRole(userId, roleName);
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
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Manage Roles for {userName}</DialogTitle>
      <DialogContent>
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
            startIcon={<AddIcon />}
            sx={{ mt: 1 }}
          >
            Add Role
          </Button>
        </div>

        <List>
          {userRoles.map((roleName) => (
            <ListItem key={roleName}>
              <ListItemText primary={roleName} />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  color="error"
                  onClick={() => handleRemoveRole(roleName)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {loading && <p>Loading...</p>}
        {!loading && userRoles.length === 0 && (
          <p>This user has no roles assigned.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleManagement;
