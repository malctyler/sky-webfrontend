import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Snackbar
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import './CustomerSummary.css';
import InspectionList from './InspectionList';
import MuiAlert from '@mui/material/Alert';

const baseUrl = process.env.REACT_APP_VITEAPIURL || 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api';

function CustomerSummary() {
  const { custId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [notes, setNotes] = useState([]);
  const [plantHoldings, setPlantHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [plantHoldingDialogOpen, setPlantHoldingDialogOpen] = useState(false);
  const [editingPlantHolding, setEditingPlantHolding] = useState(null);
  const [expandedHolding, setExpandedHolding] = useState(null);
  const [allPlants, setAllPlants] = useState([]);
  const [allStatuses, setAllStatuses] = useState([]);
  const [newPlantHolding, setNewPlantHolding] = useState({
    custID: null,
    plantNameID: '',
    serialNumber: '',
    statusID: '',
    swl: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false);
  const [deleteNoteDialog, setDeleteNoteDialog] = useState(false);
  const [deleteHoldingDialog, setDeleteHoldingDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [holdingToDelete, setHoldingToDelete] = useState(null);

  const toggleHoldingExpand = (holdingId) => {
    setExpandedHolding(expandedHolding === holdingId ? null : holdingId);
  };

  const fetchCustomerAndNotes = useCallback(async () => {
    try {
      const [customerResponse, notesResponse] = await Promise.all([
        fetch(`${baseUrl}/Customers/${custId}`),
        fetch(`${baseUrl}/Notes`)
      ]);

      if (!customerResponse.ok || !notesResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [customerData, notesData] = await Promise.all([
        customerResponse.json(),
        notesResponse.json()
      ]);

      setCustomer(customerData);
      setEditingCustomer(customerData);
      const customerNotes = notesData
        .filter(note => note.custID === parseInt(custId))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotes(customerNotes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [custId]);

  const fetchPlantHoldings = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/PlantHolding/customer/${custId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch plant holdings');
      }
      const data = await response.json();
      setPlantHoldings(data);
    } catch (err) {
      setError(err.message);
    }
  }, [custId]);

  const fetchPlantAndStatusOptions = useCallback(async () => {
    try {
      const [plantsResponse, statusesResponse] = await Promise.all([
        fetch(`${baseUrl}/AllPlant`),
        fetch(`${baseUrl}/Status`)
      ]);

      if (!plantsResponse.ok || !statusesResponse.ok) {
        throw new Error('Failed to fetch options');
      }

      const [plantsData, statusesData] = await Promise.all([
        plantsResponse.json(),
        statusesResponse.json()
      ]);

      setAllPlants(plantsData);
      setAllStatuses(statusesData);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchCustomerAndNotes();
    fetchPlantHoldings();
    fetchPlantAndStatusOptions();
  }, [fetchCustomerAndNotes, fetchPlantHoldings, fetchPlantAndStatusOptions]);

  const handleBack = () => {
    navigate('/customers');
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showError = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
  };

  const showSuccess = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success'
    });
  };

  const handleEditCustomer = async () => {
    try {
      const response = await fetch(`${baseUrl}/Customers/${custId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCustomer),
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      setCustomer(editingCustomer);
      setEditDialogOpen(false);
      showSuccess('Customer updated successfully');
    } catch (err) {
      showError(err.message);
    }
  };

  const openDeleteCustomerDialog = () => {
    setDeleteCustomerDialog(true);
  };

  const handleDeleteCustomer = async () => {
    try {
      const response = await fetch(`${baseUrl}/Customers/${custId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      showSuccess('Customer deleted successfully');
      setDeleteCustomerDialog(false);
      setTimeout(() => {
        navigate('/customers');
      }, 1000);

    } catch (err) {
      showError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingCustomer(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateNote = async () => {
    try {
      const response = await fetch(`${baseUrl}/Notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          custID: parseInt(custId),
          date: new Date(),
          notes: newNoteText
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const newNote = await response.json();
      setNotes(prev => [newNote, ...prev]);
      setNoteDialogOpen(false);
      setNewNoteText('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateNote = async () => {
    try {
      const response = await fetch(`${baseUrl}/Notes/${editingNote.noteID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editingNote,
          notes: newNoteText
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      setNotes(prev => prev.map(note => 
        note.noteID === editingNote.noteID 
          ? { ...note, notes: newNoteText }
          : note
      ));
      setNoteDialogOpen(false);
      setEditingNote(null);
      setNewNoteText('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    openDeleteNoteDialog(noteId);
  };

  const openDeleteNoteDialog = (note) => {
    setNoteToDelete(note);
    setDeleteNoteDialog(true);
  };

  const handleConfirmDeleteNote = async () => {
    try {
      const response = await fetch(`${baseUrl}/Notes/${noteToDelete.noteID}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes(prev => prev.filter(n => n.noteID !== noteToDelete.noteID));
      setDeleteNoteDialog(false);
      setNoteToDelete(null);
      showSuccess('Note deleted successfully');
    } catch (err) {
      showError(err.message);
    }
  };

  const handlePlantHoldingChange = (e) => {
    const { name, value } = e.target;
    setNewPlantHolding(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreatePlantHolding = async () => {
    try {
      const response = await fetch(`${baseUrl}/PlantHolding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newPlantHolding,
          custID: parseInt(custId),
          plantNameID: parseInt(newPlantHolding.plantNameID),
          statusID: parseInt(newPlantHolding.statusID)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create plant holding');
      }

      const createdHolding = await response.json();
      setPlantHoldings(prev => [...prev, createdHolding]);
      setPlantHoldingDialogOpen(false);
      resetPlantHoldingForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdatePlantHolding = async () => {
    try {
      const response = await fetch(`${baseUrl}/PlantHolding/${editingPlantHolding.holdingID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newPlantHolding,
          holdingID: editingPlantHolding.holdingID,
          custID: parseInt(custId),
          plantNameID: parseInt(newPlantHolding.plantNameID),
          statusID: parseInt(newPlantHolding.statusID)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update plant holding');
      }

      const updatedHolding = await response.json();
      setPlantHoldings(prev => prev.map(holding => 
        holding.holdingID === editingPlantHolding.holdingID
          ? updatedHolding
          : holding
      ));
      setPlantHoldingDialogOpen(false);
      resetPlantHoldingForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const openDeleteHoldingDialog = (holding) => {
    setHoldingToDelete(holding);
    setDeleteHoldingDialog(true);
  };

  const handleDeletePlantHolding = async () => {
    try {
      const response = await fetch(`${baseUrl}/PlantHolding/${holdingToDelete.holdingID}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete plant holding');
      }

      setPlantHoldings(prev => prev.filter(ph => ph.holdingID !== holdingToDelete.holdingID));
      setDeleteHoldingDialog(false);
      setHoldingToDelete(null);
      showSuccess('Plant holding deleted successfully');
    } catch (err) {
      showError(err.message);
    }
  };

  const openCreateNoteDialog = () => {
    setEditingNote(null);
    setNewNoteText('');
    setNoteDialogOpen(true);
  };

  const openEditNoteDialog = (note) => {
    setEditingNote(note);
    setNewNoteText(note.notes);
    setNoteDialogOpen(true);
  };

  const openCreatePlantHoldingDialog = () => {
    setEditingPlantHolding(null);
    resetPlantHoldingForm();
    setPlantHoldingDialogOpen(true);
  };

  const openEditPlantHoldingDialog = (holding) => {
    setEditingPlantHolding(holding);
    setNewPlantHolding({
      plantNameID: holding.plantNameID?.toString() || '',
      serialNumber: holding.serialNumber || '',
      statusID: holding.statusID?.toString() || '',
      swl: holding.swl || ''
    });
    setPlantHoldingDialogOpen(true);
  };

  const resetPlantHoldingForm = () => {
    setNewPlantHolding({
      custID: null,
      plantNameID: '',
      serialNumber: '',
      statusID: '',
      swl: ''
    });
  };

  if (loading) return (
    <div className={`summary-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading customer details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={`summary-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="error-state">
        <p>⚠️ {error}</p>
        <Button variant="contained" onClick={handleBack}>Return to Customers</Button>
      </div>
    </div>
  );

  return (
    <div className={`summary-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="summary-header">
        <Button variant="contained" onClick={handleBack}>← Back</Button>
        <h2>{customer?.companyName}</h2>
        <div className="header-actions">
          <IconButton onClick={() => setEditDialogOpen(true)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={openDeleteCustomerDialog} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        className="summary-tabs"
      >
        <Tab label="Customer Details" />
        <Tab label={`Notes (${notes.length})`} />
        <Tab label={`Plant Holdings (${plantHoldings.length})`} />
      </Tabs>

      <div className="tab-content">
        {activeTab === 0 ? (
          <div className="customer-details">
            <div className="detail-section">
              <h3>Contact Information</h3>
              <p><strong>Name:</strong> {customer?.contactTitle} {customer?.contactFirstNames} {customer?.contactSurname}</p>
              <p><strong>Email:</strong> {customer?.email}</p>
              <p><strong>Phone:</strong> {customer?.telephone}</p>
              <p><strong>Fax:</strong> {customer?.fax}</p>
            </div>
            
            <div className="detail-section">
              <h3>Address</h3>
              <p>{customer?.line1}</p>
              {customer?.line2 && <p>{customer.line2}</p>}
              {customer?.line3 && <p>{customer.line3}</p>}
              {customer?.line4 && <p>{customer.line4}</p>}
              <p>{customer?.postcode}</p>
            </div>

            </div>
        ) : activeTab === 1 ? (
          <div className="notes-section">
            <div className="notes-header">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={openCreateNoteDialog}
              >
                Add Note
              </Button>
            </div>
            {notes.length > 0 ? (
              <div className="notes-grid">
                {notes.map(note => (
                  <div key={note.noteID} className="note-card">
                    <div className="note-actions">
                      <IconButton onClick={() => openEditNoteDialog(note)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteNote(note.noteID)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    <div className="note-date">
                      {new Date(note.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="note-content">
                      {note.notes}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-notes">No notes available for this customer.</p>
            )}
          </div>
        ) : (
          <div className="plant-holdings-section">
            <div className="section-header">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={openCreatePlantHoldingDialog}
              >
                Add Plant Holding
              </Button>
            </div>
            <TableContainer component={Paper} className="holdings-table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Plant Name</TableCell>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>SWL</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plantHoldings.map(holding => (
                    <React.Fragment key={holding.holdingID}>
                      <TableRow>
                        <TableCell>{holding.plantDescription || 'N/A'}</TableCell>
                        <TableCell>{holding.serialNumber}</TableCell>
                        <TableCell>{holding.statusDescription || 'N/A'}</TableCell>
                        <TableCell>{holding.swl}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => toggleHoldingExpand(holding.holdingID)}>
                            {expandedHolding === holding.holdingID ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <IconButton size="small" onClick={() => openEditPlantHoldingDialog(holding)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => openDeleteHoldingDialog(holding)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
                          <Collapse in={expandedHolding === holding.holdingID} timeout="auto" unmountOnExit>
                            <div className="p-4 w-full">
                              <InspectionList holdingId={holding.holdingID} />
                            </div>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {plantHoldings.length === 0 && (
              <p className="no-holdings">No plant holdings found for this customer.</p>
            )}
          </div>
        )}
      </div>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <div className="dialog-form">
            <TextField
              label="Company Name"
              name="companyName"
              value={editingCustomer?.companyName || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contact Title"
              name="contactTitle"
              value={editingCustomer?.contactTitle || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="First Names"
              name="contactFirstNames"
              value={editingCustomer?.contactFirstNames || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Surname"
              name="contactSurname"
              value={editingCustomer?.contactSurname || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address Line 1"
              name="line1"
              value={editingCustomer?.line1 || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address Line 2"
              name="line2"
              value={editingCustomer?.line2 || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address Line 3"
              name="line3"
              value={editingCustomer?.line3 || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address Line 4"
              name="line4"
              value={editingCustomer?.line4 || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Postcode"
              name="postcode"
              value={editingCustomer?.postcode || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Telephone"
              name="telephone"
              value={editingCustomer?.telephone || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fax"
              name="fax"
              value={editingCustomer?.fax || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={editingCustomer?.email || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditCustomer} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)}>
        <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={editingNote ? handleUpdateNote : handleCreateNote}
            variant="contained" 
            color="primary"
            disabled={!newNoteText.trim()}
          >
            {editingNote ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={plantHoldingDialogOpen} onClose={() => setPlantHoldingDialogOpen(false)}>
        <DialogTitle>{editingPlantHolding ? 'Edit Plant Holding' : 'Create New Plant Holding'}</DialogTitle>
        <DialogContent>
          <div className="dialog-form">
            <FormControl fullWidth margin="normal">
              <InputLabel>Plant Name</InputLabel>
              <Select
                name="plantNameID"
                value={newPlantHolding.plantNameID}
                onChange={handlePlantHoldingChange}
              >
                {allPlants.map(plant => (
                  <MenuItem key={plant.plantNameID} value={plant.plantNameID}>
                    {plant.plantDescription}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Serial Number"
              name="serialNumber"
              value={newPlantHolding.serialNumber}
              onChange={handlePlantHoldingChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="statusID"
                value={newPlantHolding.statusID}
                onChange={handlePlantHoldingChange}
              >
                {allStatuses.map(status => (
                  <MenuItem key={status.statusID} value={status.statusID}>
                    {status.statusDescription}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="SWL"
              name="swl"
              value={newPlantHolding.swl}
              onChange={handlePlantHoldingChange}
              fullWidth
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPlantHoldingDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={editingPlantHolding ? handleUpdatePlantHolding : handleCreatePlantHolding}
            variant="contained" 
            color="primary"
          >
            {editingPlantHolding ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteCustomerDialog}
        onClose={() => setDeleteCustomerDialog(false)}
        aria-labelledby="delete-customer-dialog-title"
      >
        <DialogTitle id="delete-customer-dialog-title">
          Confirm Customer Deletion
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Are you sure you want to delete this customer?</p>
            {customer && (
              <>
                <p><strong>Company:</strong> {customer.companyName}</p>
                <p><strong>Contact:</strong> {customer.contactTitle} {customer.contactFirstNames} {customer.contactSurname}</p>
              </>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action cannot be undone. All associated notes and plant holdings will also be deleted.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCustomerDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteCustomer}
            color="error"
            variant="contained"
          >
            Delete Customer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteNoteDialog}
        onClose={() => setDeleteNoteDialog(false)}
        aria-labelledby="delete-note-dialog-title"
      >
        <DialogTitle id="delete-note-dialog-title">
          Confirm Note Deletion
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Are you sure you want to delete this note?</p>
            {noteToDelete && (
              <p><strong>Note:</strong> {noteToDelete.noteText}</p>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action cannot be undone.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteNoteDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDeleteNote}
            color="error"
            variant="contained"
          >
            Delete Note
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteHoldingDialog}
        onClose={() => setDeleteHoldingDialog(false)}
        aria-labelledby="delete-holding-dialog-title"
      >
        <DialogTitle id="delete-holding-dialog-title">
          Confirm Plant Holding Deletion
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Are you sure you want to delete this plant holding?</p>
            {holdingToDelete && (
              <>
                <p><strong>Plant:</strong> {holdingToDelete.plantDescription}</p>
                <p><strong>Serial Number:</strong> {holdingToDelete.serialNumber}</p>
                <p><strong>Status:</strong> {holdingToDelete.status}</p>
              </>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action cannot be undone. All associated inspections will also be deleted.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteHoldingDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeletePlantHolding}
            color="error"
            variant="contained"
          >
            Delete Plant Holding
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default CustomerSummary;