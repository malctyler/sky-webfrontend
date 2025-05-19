import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import roleService from '../services/roleService';

const RoleManagement = ({ user }) => {
  const [userRoles, setUserRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

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

  const openDeleteDialog = (role) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteRole = async () => {
    setLoading(true);
    setError('');
    try {
      await roleService.removeRoleFromUser(user.id, roleToDelete);
      fetchUserRoles();
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
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
          <ListItem key={roleName} secondaryAction={<IconButton edge="end" aria-label="delete" onClick={() => openDeleteDialog(roleName)} disabled={loading}><DeleteIcon /></IconButton>}>
            <ListItemText primary={roleName} />
          </ListItem>
        ))}
      </List>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-role-dialog-title"
      >
        <DialogTitle id="delete-role-dialog-title">
          Confirm Role Removal
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Are you sure you want to remove this role from the user?</p>
            {roleToDelete && (
              <p><strong>Role:</strong> {roleToDelete}</p>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action will remove all permissions associated with this role from the user.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteRole}
            color="error"
            variant="contained"
          >
            Remove Role
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
