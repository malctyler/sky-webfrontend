import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import apiClient from '../services/apiClient';

const ClaimManagement = ({ user }) => {
  const [claims, setClaims] = useState([]);
  const [newClaim, setNewClaim] = useState({ type: '', value: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [claimToDelete, setClaimToDelete] = useState(null);

  useEffect(() => {
    if (user) {
      fetchClaims();
    }
  }, [user]);

  const fetchClaims = async () => {
    try {
      const response = await apiClient.get(`/Claims/${user.id}`);
      setClaims(response.data);
    } catch (err) {
      console.error('Error fetching claims:', err);
    }
  };

  const openDeleteDialog = (claim) => {
    setClaimToDelete(claim);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClaim = async () => {
    try {
      await apiClient.delete(`/Claims/${user.id}/claims/${claimToDelete.type}`);
      setClaims(claims.filter(c => 
        !(c.type === claimToDelete.type && c.value === claimToDelete.value)
      ));
      setDeleteDialogOpen(false);
      setClaimToDelete(null);
    } catch (err) {
      console.error('Error removing claim:', err);
    }
  };

  const handleAddClaim = async () => {
    if (newClaim.type && newClaim.value) {
      try {
        await apiClient.post(`/Claims/${user.id}/claims`, newClaim);
        setNewClaim({ type: '', value: '' });
        fetchClaims();
      } catch (err) {
        console.error('Error adding claim:', err);
      }
    }
  };

  return (
    <div>
      <List>
        {claims.map((claim, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => openDeleteDialog(claim)}>
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

      <div style={{ marginTop: '1rem' }}>
        <TextField
          label="Claim Type"
          value={newClaim.type}
          onChange={(e) => setNewClaim({ ...newClaim, type: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Claim Value"
          value={newClaim.value}
          onChange={(e) => setNewClaim({ ...newClaim, value: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleAddClaim}
          disabled={!newClaim.type || !newClaim.value}
          style={{ marginTop: '1rem' }}
        >
          Add Claim
        </Button>
      </div>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-claim-dialog-title"
      >
        <DialogTitle id="delete-claim-dialog-title">
          Confirm Claim Removal
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Are you sure you want to remove this claim from the user?</p>
            {claimToDelete && (
              <>
                <p><strong>Type:</strong> {claimToDelete.type}</p>
                <p><strong>Value:</strong> {claimToDelete.value}</p>
              </>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action will remove this permission claim from the user.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteClaim}
            color="error"
            variant="contained"
          >
            Remove Claim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClaimManagement;
