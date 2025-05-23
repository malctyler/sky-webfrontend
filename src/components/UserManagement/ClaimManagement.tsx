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
import claimService from '../../services/claimService';
import { User } from '../../types/userTypes';
import { Claim, AddClaimDto, ClaimType } from '../../types/claimTypes';

interface ClaimManagementProps {
  user: User;
  onClose: () => void;
  open: boolean;
}

const ClaimManagement: React.FC<ClaimManagementProps> = ({ user, onClose, open }) => {  const [claims, setClaims] = useState<Claim[]>([]);
  const [newClaim, setNewClaim] = useState<{ type: string; value: string }>({ type: '', value: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [claimToDelete, setClaimToDelete] = useState<{ type: string; value: string } | null>(null);

  useEffect(() => {
    if (user) {
      fetchClaims();
    }
  }, [user]);  const fetchClaims = async (): Promise<void> => {
    try {
      const claims = await claimService.getClaims(user.id);
      setClaims(claims);
    } catch (err) {
      console.error('Error fetching claims:', err);
    }
  };

  const handleAddClaim = async (): Promise<void> => {
    try {
      const addClaimDto: AddClaimDto = {
        type: newClaim.type,
        value: newClaim.value
      };
      await claimService.addClaim(user.id, addClaimDto);
      await fetchClaims();
      setNewClaim({ type: '', value: '' });
    } catch (err) {
      console.error('Error adding claim:', err);
    }
  };

  const handleDeleteClaim = async (): Promise<void> => {
    if (!claimToDelete) return;

    try {
      await claimService.deleteClaim(user.id, claimToDelete.type as ClaimType);
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
