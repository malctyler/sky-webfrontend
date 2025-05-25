import React, { useState, useEffect, useCallback, ChangeEvent, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
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
  Collapse,
  Snackbar,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import styles from './CustomerSummary.module.css';
import InspectionList from '../Inspection/InspectionList';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { baseUrl } from '../../config';
import { Customer, SnackbarState, Note } from '../../types/customerTypes';
import { PlantHolding, NewPlantHolding, NewPlantHoldingForm, Plant, Status } from '../../types/plantholdingTypes';

type RouterParams = {
  [key: string]: string | undefined;
  custId?: string;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const userStr = localStorage.getItem('user');
  const token = userStr ? JSON.parse(userStr)?.token : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const CustomerSummary: React.FC = () => {
  const { custId } = useParams<RouterParams>();
  const navigate = useNavigate();
  const { isDarkMode } = useCustomTheme();
  
  // State management
  const [activeTab, setActiveTab] = useState<number>(0);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [plantHoldings, setPlantHoldings] = useState<PlantHolding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [noteDialogOpen, setNoteDialogOpen] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [plantHoldingDialogOpen, setPlantHoldingDialogOpen] = useState<boolean>(false);
  const [editingPlantHolding, setEditingPlantHolding] = useState<PlantHolding | null>(null);
  const [expandedHolding, setExpandedHolding] = useState<number | null>(null);

  // Options state
  const [allplant, setAllplant] = useState<Plant[]>([]);
  const [allStatuses, setAllStatuses] = useState<Status[]>([]);  const [newPlantHolding, setNewPlantHolding] = useState<NewPlantHoldingForm>({
    custID: custId ? parseInt(custId) : null,
    plantNameID: '',
    serialNumber: '',
    statusID: '',
    swl: ''
  });

  // Dialog states
  const [deleteCustomerDialog, setDeleteCustomerDialog] = useState<boolean>(false);
  const [deleteNoteDialog, setDeleteNoteDialog] = useState<boolean>(false);
  const [deleteHoldingDialog, setDeleteHoldingDialog] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [holdingToDelete, setHoldingToDelete] = useState<PlantHolding | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const toggleHoldingExpand = (holdingId: number) => {
    setExpandedHolding(expandedHolding === holdingId ? null : holdingId);
  };
  const fetchCustomerAndNotes = useCallback(async () => {
    try {
      const headers = getAuthHeaders();
      const [customerResponse, notesResponse] = await Promise.all([
        axios.get(`${baseUrl}/Customers/${custId}`, { headers }),
        axios.get(`${baseUrl}/Notes`, { headers })
      ]);
      const customerData = customerResponse.data;
      const notesData = notesResponse.data;
      setCustomer(customerData);
      setEditingCustomer(customerData);
      const filteredNotes = notesData
        .filter((note: Note) => note.custID === parseInt(custId || '0'))
        .sort((a: Note, b: Note) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setNotes(filteredNotes);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  }, [custId]);
    const fetchPlantHoldings = useCallback(async () => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${baseUrl}/PlantHolding/customer/${custId}`, { headers });
      setPlantHoldings(response.data);
    } catch (err: unknown) {
      handleError(err);
    }
  }, [custId]);
    const fetchPlantAndStatusOptions = useCallback(async () => {
    try {
      const headers = getAuthHeaders();
      const [plantResponse, statusesResponse] = await Promise.all([
        axios.get(`${baseUrl}/AllPlant`, { headers }),
        axios.get(`${baseUrl}/Status`, { headers })
      ]);
      setAllplant(plantResponse.data);
      setAllStatuses(statusesResponse.data);
    } catch (err: unknown) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    if (!custId) {
      setError('Customer ID is required');
      return;
    }    Promise.all([
      fetchCustomerAndNotes(),
      fetchPlantHoldings(),
      fetchPlantAndStatusOptions()
    ]);
  }, [custId]);
  // Removed redundant useEffect since fetchPlantAndStatusOptions is called in the initial load

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Type-safe error handling
  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred');
    }
    setLoading(false);
  };

  // Type-safe date comparison

  const showSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success'
    });
  };

  const resetPlantHoldingForm = () => {
    if (!custId) return;
    setNewPlantHolding({
      custID: parseInt(custId),
      plantNameID: '',
      serialNumber: '',
      statusID: '',
      swl: ''
    });
  };
  // Customer actions
  const handleDeleteCustomer = () => {
    if (!custId) return;
    
    const headers = getAuthHeaders();
    axios.delete(`${baseUrl}/Customers/${custId}`, { headers })
      .then(() => {
        showSuccess('Customer deleted successfully');
        setDeleteCustomerDialog(false);
        setTimeout(() => {
          navigate('/customers');
        }, 1000);
      })
      .catch((error: unknown) => {
        handleError(error);
      });
  };
  // Note actions
  const handleCreateNote = async () => {
    if (!custId) return;    try {
      const headers = getAuthHeaders();
      const response = await axios.post(`${baseUrl}/Notes`, {
        custID: parseInt(custId),
        date: new Date().toISOString(),
        notes: newNoteText
      }, { headers });
      const newNote = response.data;
      setNotes(prev => [newNote, ...prev]);
      setNoteDialogOpen(false);
      setNewNoteText('');
      showSuccess('Note created successfully');
    } catch (error: unknown) {
      handleError(error);
    }
  };
  const handleUpdateNote = async () => {
    if (!editingNote) return;
    try {
      const headers = getAuthHeaders();
      await axios.put(`${baseUrl}/Notes/${editingNote.noteID}`, {
        ...editingNote,
        notes: newNoteText
      }, { headers });
      setNotes(prev => prev.map(note => 
        note.noteID === editingNote.noteID 
          ? { ...note, notes: newNoteText }
          : note
      ));
      setNoteDialogOpen(false);
      setEditingNote(null);
      setNewNoteText('');
      showSuccess('Note updated successfully');
    } catch (error) {
      handleError(error);
    }  };

  // Plant holding management
  const handleCreatePlantHolding = async () => {
    if (!custId) return;
    try {
      const headers = getAuthHeaders();      const apiPayload: NewPlantHolding = {
        custID: parseInt(custId),
        plantNameID: newPlantHolding.plantNameID ? parseInt(newPlantHolding.plantNameID) : null,
        serialNumber: newPlantHolding.serialNumber,
        statusID: newPlantHolding.statusID ? parseInt(newPlantHolding.statusID) : null,
        swl: newPlantHolding.swl
      };
      const response = await axios.post(`${baseUrl}/PlantHolding`, apiPayload, { headers });
      const newHolding = response.data;
      setPlantHoldings(prev => [...prev, newHolding]);
      setPlantHoldingDialogOpen(false);
      resetPlantHoldingForm();
      showSuccess('Plant holding created successfully');
    } catch (error: unknown) {
      handleError(error);
    }  };

  const handleUpdatePlantHolding = async () => {
    if (!editingPlantHolding || !custId) return;
    try {
      const headers = getAuthHeaders();      const apiPayload: NewPlantHolding = {
        custID: parseInt(custId),
        plantNameID: newPlantHolding.plantNameID ? parseInt(newPlantHolding.plantNameID) : null,
        serialNumber: newPlantHolding.serialNumber,
        statusID: newPlantHolding.statusID ? parseInt(newPlantHolding.statusID) : null,
        swl: newPlantHolding.swl
      };
      const response = await axios.put(`${baseUrl}/PlantHolding/${editingPlantHolding.holdingID}`, apiPayload, { headers });
      const updatedHolding = response.data;
      setPlantHoldings(prev => prev.map(holding => 
        holding.holdingID === editingPlantHolding.holdingID ? updatedHolding : holding
      ));
      setPlantHoldingDialogOpen(false);
      resetPlantHoldingForm();
      showSuccess('Plant holding updated successfully');
    } catch (error: unknown) {
      handleError(error);
    }
  };

  // Utility functions
  const getStatusDescription = (holding: PlantHolding): string => {
    const status = allStatuses.find(s => (s.statusID || s.id) === (holding.statusID));
    return status?.statusDescription || 'Unknown';
  };

  // Sort plants alphabetically by description
  const sortedPlants = useMemo(() => {
    return [...allplant].sort((a, b) => 
      (a.plantDescription || '').localeCompare(b.plantDescription || '')
    );
  }, [allplant]);

  // Event handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingCustomer) return;
    const { name, value } = e.target;
    setEditingCustomer({
      ...editingCustomer,
      [name]: value
    });
  };  const handlePlantHoldingChange = (e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPlantHolding((prev: NewPlantHoldingForm) => ({
      ...prev,
      [name]: value || ''
    }));
  };  const handleCustomerUpdate = () => {
    if (!custId || !editingCustomer) return;
    
    const headers = getAuthHeaders();
    axios.put(`${baseUrl}/Customers/${custId}`, editingCustomer, { headers })
      .then(() => {
        setCustomer(editingCustomer);
        setEditDialogOpen(false);
        showSuccess('Customer updated successfully');
      })
      .catch((error: unknown) => {
        handleError(error);
      });
  };
  const handleDeleteNote = async () => {
    if (!noteToDelete) return;
    try {
      await axios.delete(`${baseUrl}/Notes/${noteToDelete.noteID}`);
      setNotes(prev => prev.filter(n => n.noteID !== noteToDelete.noteID));
      setDeleteNoteDialog(false);
      setNoteToDelete(null);
      showSuccess('Note deleted successfully');
    } catch (error) {
      handleError(error);
    }
  };
  const openDeleteHoldingDialog = (holding: PlantHolding) => {
    setHoldingToDelete(holding);
    setDeleteHoldingDialog(true);
  };

  const handleDeletePlantHolding = async () => {
    if (!holdingToDelete) return;
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${baseUrl}/PlantHolding/${holdingToDelete.holdingID}`, { headers });
      setPlantHoldings(prev => prev.filter(ph => ph.holdingID !== holdingToDelete.holdingID));
      setDeleteHoldingDialog(false);
      setHoldingToDelete(null);
      showSuccess('Plant holding deleted successfully');
    } catch (error) {
      handleError(error);
    }
  };

  const handleDialogClose = () => {
    setNoteDialogOpen(false);
    setPlantHoldingDialogOpen(false);
    setDeleteNoteDialog(false);
    setDeleteHoldingDialog(false);
    setEditingNote(null);
    setEditingPlantHolding(null);
    setNewNoteText('');
    resetPlantHoldingForm();
  };

  // Type-safe dialog open handlers
  const handleEditClick = (note: Note) => {
    setEditingNote(note);
    setNewNoteText(note.notes);
    setNoteDialogOpen(true);
  };

  const openCreatePlantHoldingDialog = () => {
    setEditingPlantHolding(null);
    resetPlantHoldingForm();
    setPlantHoldingDialogOpen(true);
  };

  const openEditPlantHoldingDialog = (holding: PlantHolding) => {
    if (!custId) return;
    
    setEditingPlantHolding(holding);    setNewPlantHolding({
      custID: parseInt(custId),
      plantNameID: holding.plantNameID?.toString() || '',
      serialNumber: holding.serialNumber || '',
      statusID: holding.statusID?.toString() || '',
      swl: holding.swl || ''
    });
    setPlantHoldingDialogOpen(true);
  };

  const renderNoteDialog = () => (      <Dialog open={noteDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            value={newNoteText}
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewNoteText(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
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
  );

  const renderNotes = () => (    <div className={styles['notes-section']}>
      <div className={styles['notes-header']}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingNote(null);
            setNewNoteText('');
            setNoteDialogOpen(true);
          }}
        >
          Add Note
        </Button>
      </div>
      {notes.length > 0 ? (
        <div className={styles['notes-grid']}>
          {notes.map(note => (
            <div key={note.noteID} className={styles['note-card']}>
              <div className={styles['note-actions']}>
                <IconButton onClick={() => handleEditClick(note)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => {
                    setNoteToDelete(note);
                    setDeleteNoteDialog(true);
                  }} 
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <div className={styles['note-date']}>
                {new Date(note.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className={styles['note-content']}>{note.notes}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles['no-notes']}>No notes available for this customer.</p>
      )}
      {renderNoteDialog()}
    </div>
  );

  const renderDeleteNoteDialog = () => (
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
            <p><strong>Note:</strong> {noteToDelete.notes}</p>
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
          onClick={handleDeleteNote}
          color="error"
          variant="contained"
        >
          Delete Note
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderDeleteHoldingDialog = () => (
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
              <p><strong>Status:</strong> {getStatusDescription(holdingToDelete)}</p>
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
  );

  const renderPlantHoldingDialog = () => (
    <Dialog open={plantHoldingDialogOpen} onClose={handleDialogClose}>
      <DialogTitle>
        {editingPlantHolding ? 'Edit Plant Holding' : 'Create New Plant Holding'}
      </DialogTitle>      <DialogContent>
          <div className={styles['dialog-form']}>
            <FormControl fullWidth margin="normal">
            <InputLabel>Plant Name</InputLabel>
            <Select
              name="plantNameID"
              value={newPlantHolding.plantNameID}
              onChange={handlePlantHoldingChange}
            >
              {sortedPlants.map((plant: Plant) => (
                <MenuItem key={plant.plantNameID} value={plant.plantNameID.toString()}>
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
              {allStatuses.map((status: Status) => (
                <MenuItem key={status.statusID} value={status.statusID.toString()}>
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
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button 
          onClick={editingPlantHolding ? handleUpdatePlantHolding : handleCreatePlantHolding}
          variant="contained" 
          color="primary"
        >
          {editingPlantHolding ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (loading) {
    return (      <div className={`${styles['summary-container']} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles['loading-state']}>
          <div className={styles.spinner}></div>
          <p>Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles['summary-container']} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles['error-state']}>
          <p>⚠️ {error}</p>
          <Button variant="contained" onClick={() => navigate('/customers')}>
            Return to Customers
          </Button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className={`${styles['summary-container']} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles['error-state']}>
          <p>⚠️ Customer not found</p>
          <Button variant="contained" onClick={() => navigate('/customers')}>
            Return to Customers
          </Button>
        </div>
      </div>
    );
  }
  return (    <div className={`${styles['summary-container']} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles['summary-header']}>
        <Button variant="contained" onClick={() => navigate('/customers')}>← Back</Button>
        <h2>{customer.companyName}</h2>
        <div className={styles['header-actions']}>
          <IconButton onClick={() => setEditDialogOpen(true)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setDeleteCustomerDialog(true)} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        className={styles['summary-tabs']}
      >
        <Tab label="Customer Details" />
        <Tab label={`Notes (${notes.length})`} />
        <Tab label={`Plant Holdings (${plantHoldings.length})`} />
      </Tabs>

      <div className={styles['tab-content']}>
        {activeTab === 0 ? (
          <div className={styles['customer-details']}>
            <div className={styles['detail-section']}>
              <h3>Contact Information</h3>
              <p><strong>Name:</strong> {customer?.contactTitle} {customer?.contactFirstNames} {customer?.contactSurname}</p>
              <p><strong>Email:</strong> {customer?.email}</p>
              <p><strong>Phone:</strong> {customer?.telephone}</p>
              <p><strong>Fax:</strong> {customer?.fax}</p>
            </div>
            
            <div className={styles['detail-section']}>
              <h3>Address</h3>
              <p>{customer?.line1}</p>
              {customer?.line2 && <p>{customer.line2}</p>}
              {customer?.line3 && <p>{customer.line3}</p>}
              {customer?.line4 && <p>{customer.line4}</p>}
              <p>{customer?.postcode}</p>
            </div>

            </div>
        ) : activeTab === 1 ? (
          renderNotes()
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
                          <IconButton size="small" onClick={() => toggleHoldingExpand(holding.holdingID)} color="primary">
                            {expandedHolding === holding.holdingID ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <IconButton size="small" onClick={() => openEditPlantHoldingDialog(holding)} color="primary">
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

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>      <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <div className={styles['dialog-form']}>
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
          <Button onClick={handleCustomerUpdate} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {renderDeleteNoteDialog()}

      {renderDeleteHoldingDialog()}

      {renderPlantHoldingDialog()}

      <Dialog
        open={deleteCustomerDialog}
        onClose={handleDialogClose}
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
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleDeleteCustomer}
            color="error"
            variant="contained"
          >
            Delete Customer
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