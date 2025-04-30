import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import claimService from '../services/claimService';

const ClaimManagement = ({ user }) => {
  const [claims, setClaims] = useState([]);
  const [newClaim, setNewClaim] = useState({ type: '', value: '' });

  const fetchClaims = async () => {
    if (user) {
      const data = await claimService.getClaims(user.id);
      setClaims(data);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [user]);

  const handleAddClaim = async () => {
    if (newClaim.type && newClaim.value) {
      await claimService.addClaim(user.id, newClaim);
      setNewClaim({ type: '', value: '' });
      fetchClaims();
    }
  };

  const handleDeleteClaim = async (type) => {
    await claimService.deleteClaim(user.id, type);
    fetchClaims();
  };

  return (
    <div>
      <TextField label="Type" value={newClaim.type} onChange={e => setNewClaim(c => ({ ...c, type: e.target.value }))} />
      <TextField label="Value" value={newClaim.value} onChange={e => setNewClaim(c => ({ ...c, value: e.target.value }))} />
      <Button onClick={handleAddClaim}>Add Claim</Button>
      <List>
        {claims.map(claim => (
          <ListItem key={claim.type} secondaryAction={<Button color="error" onClick={() => handleDeleteClaim(claim.type)}>Delete</Button>}>
            <ListItemText primary={`${claim.type}: ${claim.value}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ClaimManagement;
