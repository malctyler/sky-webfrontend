import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions 
} from '@mui/material';
import UserForm from './UserForm';
import RoleManagement from './RoleManagement';
import ClaimManagement from './ClaimManagement';
import userService from '../../services/userService';
import RoleAdmin from './RoleAdmin';

import type { User } from '../../types/userTypes';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);
  const [openClaims, setOpenClaims] = useState(false);
  const [openRoleAdmin, setOpenRoleAdmin] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchUsers = async () => {
    const data = await userService.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await userService.deleteUser(userToDelete.id);
      await fetchUsers();
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleRoles = (user: User) => {
    setSelectedUser(user);
    setOpenRoles(true);
  };

  const handleClaims = (user: User) => {
    setSelectedUser(user);
    setOpenClaims(true);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>Add User</Button>
      <Button variant="outlined" onClick={() => setOpenRoleAdmin(true)} sx={{ mb: 2, ml: 2 }}>Manage All Roles</Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Is Customer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.isCustomer ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button onClick={() => openDeleteDialog(user)} color="error">Delete</Button>
                  <Button onClick={() => handleRoles(user)}>Roles</Button>
                  <Button onClick={() => handleClaims(user)}>Claims</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <UserForm
            user={selectedUser}
            onSuccess={() => { setOpenForm(false); fetchUsers(); }}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openRoles} onClose={() => setOpenRoles(false)}>
        <DialogTitle>Manage Roles</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          {selectedUser && <RoleManagement user={selectedUser} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoles(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openClaims} onClose={() => setOpenClaims(false)}>
        <DialogTitle>Manage Claims</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          {selectedUser && <ClaimManagement user={selectedUser} onClose={() => setOpenClaims(false)} open={openClaims} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClaims(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRoleAdmin} onClose={() => setOpenRoleAdmin(false)}>
        <DialogTitle>Manage Roles</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <RoleAdmin />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleAdmin(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserManagement;
