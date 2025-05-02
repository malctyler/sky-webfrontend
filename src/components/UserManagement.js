import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import UserForm from './UserForm';
import RoleManagement from './RoleManagement';
import ClaimManagement from './ClaimManagement';
import userService from '../services/userService';
import RoleAdmin from './RoleAdmin';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);
  const [openClaims, setOpenClaims] = useState(false);
  const [openRoleAdmin, setOpenRoleAdmin] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await userService.deleteUser(userToDelete.id);
      await fetchUsers();
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleRoles = (user) => {
    setSelectedUser(user);
    setOpenRoles(true);
  };

  const handleClaims = (user) => {
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
          <UserForm user={selectedUser} onSuccess={() => { setOpenForm(false); fetchUsers(); }} />
        </DialogContent>
      </Dialog>

      <Dialog open={openRoles} onClose={() => setOpenRoles(false)}>
        <DialogTitle>Manage Roles</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <RoleManagement user={selectedUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoles(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openClaims} onClose={() => setOpenClaims(false)}>
        <DialogTitle>Manage Claims</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <ClaimManagement user={selectedUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClaims(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRoleAdmin} onClose={() => setOpenRoleAdmin(false)}>
        <DialogTitle>All Roles</DialogTitle>
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
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm User Deletion
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Are you sure you want to delete this user?</p>
            {userToDelete && (
              <>
                <p><strong>Email:</strong> {userToDelete.email}</p>
                <p><strong>Name:</strong> {userToDelete.firstName} {userToDelete.lastName}</p>
                <p><strong>Customer:</strong> {userToDelete.isCustomer ? 'Yes' : 'No'}</p>
              </>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action cannot be undone. All associated roles and claims will also be deleted.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserManagement;
