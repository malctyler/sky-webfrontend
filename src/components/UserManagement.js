import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
  const handleDelete = async (user) => {
    if (window.confirm('Delete this user?')) {
      await userService.deleteUser(user.id);
      fetchUsers();
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
                  <Button onClick={() => handleDelete(user)} color="error">Delete</Button>
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
        <DialogContent>
          <RoleManagement user={selectedUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoles(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openClaims} onClose={() => setOpenClaims(false)}>
        <DialogTitle>Manage Claims</DialogTitle>
        <DialogContent>
          <ClaimManagement user={selectedUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClaims(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openRoleAdmin} onClose={() => setOpenRoleAdmin(false)}>
        <DialogTitle>All Roles</DialogTitle>
        <DialogContent>
          <RoleAdmin />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleAdmin(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserManagement;
