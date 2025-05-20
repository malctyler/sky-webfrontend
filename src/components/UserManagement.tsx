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
import userService from '../services/userService';
import RoleAdmin from './RoleAdmin';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isCustomer: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openRoles, setOpenRoles] = useState<boolean>(false);
  const [openClaims, setOpenClaims] = useState<boolean>(false);
  const [openRoleAdmin, setOpenRoleAdmin] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchUsers = async (): Promise<void> => {
    const data = await userService.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = (): void => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleEdit = (user: User): void => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const openDeleteDialog = (user: User): void => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async (): Promise<void> => {
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

  const handleRoles = (user: User): void => {
    setSelectedUser(user);
    setOpenRoles(true);
  };

  const handleClaims = (user: User): void => {
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
        <DialogContent>          <UserForm
            user={selectedUser}
            onSuccess={async () => {
              await fetchUsers();
              setOpenForm(false);
            }}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      {selectedUser && (
        <RoleManagement
          open={openRoles}
          onClose={() => setOpenRoles(false)}
          userId={selectedUser.id}
          userName={`${selectedUser.firstName} ${selectedUser.lastName}`}
        />
      )}      {selectedUser && (
        <ClaimManagement
          user={selectedUser}
          open={openClaims}
          onClose={() => setOpenClaims(false)}
        />
      )}

      <Dialog open={openRoleAdmin} onClose={() => setOpenRoleAdmin(false)}>
        <DialogTitle>Manage System Roles</DialogTitle>
        <DialogContent>
          <RoleAdmin />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleAdmin(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {userToDelete?.email}?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserManagement;
