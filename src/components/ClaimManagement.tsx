import React, { useEffect, useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { baseUrl } from '../config';
import { User } from '../types/userTypes';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const userStr = localStorage.getItem('user');
  const token = userStr ? JSON.parse(userStr)?.token : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

interface Claim {
  type: string;
  value: string;
}

interface ClaimManagementProps {
  user: User;
  onClose: () => void;
  open: boolean;
}

const ClaimManagement: React.FC<ClaimManagementProps> = ({ user, onClose, open }) => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [newClaim, setNewClaim] = useState<Claim>({ type: '', value: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [claimToDelete, setClaimToDelete] = useState<Claim | null>(null);

  useEffect(() => {
    if (user) {
      fetchClaims();
    }
  }, [user]);
  const fetchClaims = async (): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${baseUrl}/Claims/${user.id}`, { headers });
      setClaims(response.data);
    } catch (err) {
      console.error('Error fetching claims:', err);
    }
  };
  const handleAddClaim = async (): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      await axios.post(`${baseUrl}/Claims/${user.id}`, newClaim, { headers });
      await fetchClaims();
      setNewClaim({ type: '', value: '' });
    } catch (err) {
      console.error('Error adding claim:', err);
    }
  };
  const handleDeleteClaim = async (): Promise<void> => {
    if (!claimToDelete) return;

    try {
      const headers = getAuthHeaders();
      await axios.delete(`${baseUrl}/Claims/${user.id}/${claimToDelete.type}`, { headers });
      await fetchClaims();
      setDeleteDialogOpen(false);
      setClaimToDelete(null);
    } catch (err) {
      console.error('Error deleting claim:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Manage Claims for {user.firstName} {user.lastName}
      </DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Claim Type"
            value={newClaim.type}
            onChange={e => setNewClaim(prev => ({ ...prev, type: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Claim Value"
            value={newClaim.value}
            onChange={e => setNewClaim(prev => ({ ...prev, value: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <Button 
            onClick={handleAddClaim}
            variant="contained"
            disabled={!newClaim.type || !newClaim.value}
            sx={{ mt: 1 }}
          >
            Add Claim
          </Button>
        </div>

        <List>
          {claims.map((claim) => (
            <ListItem
              key={claim.type}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => {
                    setClaimToDelete(claim);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText 
                primary={claim.type}
                secondary={claim.value}
              />
            </ListItem>
          ))}
        </List>

        {claims.length === 0 && (
          <Typography color="textSecondary" align="center">
            No claims found for this user.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Claim</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the claim "{claimToDelete?.type}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteClaim} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ClaimManagement;
