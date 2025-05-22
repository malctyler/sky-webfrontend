import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { customerService } from '../services/customerService';
import { 
  Customer, 
  CustomerFormData, 
  CustomerNotes, 
  SnackbarState 
} from '../types/customerTypes';
import './AllCustomers.css';

const AllCustomers: React.FC = () => {
  const { isDarkMode } = useCustomTheme();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [customerNotes, setCustomerNotes] = useState<CustomerNotes>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<CustomerFormData>({
    companyName: '',
    contactTitle: '',
    contactFirstNames: '',
    contactSurname: '',
    line1: '',
    line2: '',
    line3: '',
    line4: '',
    postcode: '',
    telephone: '',
    fax: '',
    email: ''
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomersAndNotes();
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      const filtered = customers.filter(customer => {
        const searchString = searchTerm.toLowerCase();
        return (
          customer.companyName?.toLowerCase().includes(searchString) ||
          customer.contactFirstNames?.toLowerCase().includes(searchString) ||
          customer.contactSurname?.toLowerCase().includes(searchString) ||
          customer.email?.toLowerCase().includes(searchString) ||
          customer.telephone?.includes(searchString) ||
          customer.line1?.toLowerCase().includes(searchString) ||
          customer.postcode?.toLowerCase().includes(searchString)
        );
      });
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);  const fetchCustomersAndNotes = async (): Promise<void> => {
    try {
      const customersData = await customerService.getAll();
      // TODO: Replace with noteService once it's implemented
      const notesResponse = await fetch('/api/Notes');
      const notesData = await notesResponse.json();
      
      const notesMap: CustomerNotes = {};
      if (Array.isArray(notesData)) {
        notesData.forEach(note => {
          if (note && typeof note === 'object' && 'custID' in note) {
            const custID = note.custID;
            notesMap[custID] = (notesMap[custID] || 0) + 1;
          }
        });
      }

      setCustomers(customersData);
      setCustomerNotes(notesMap);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const newCustomer = await customerService.create(formData);
      setCustomers(prev => [...prev, newCustomer]);
      setShowForm(false);
      setFormData({
        companyName: '',
        contactTitle: '',
        contactFirstNames: '',
        contactSurname: '',
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        postcode: '',
        telephone: '',
        fax: '',
        email: ''
      });
      setSnackbar({
        open: true,
        message: 'Customer added successfully!',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to add customer',
        severity: 'error'
      });
    }
  };

  const handleDeleteClick = (customer: Customer): void => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };  const handleConfirmDelete = async (): Promise<void> => {
    if (!customerToDelete) return;

    try {
      await customerService.delete(customerToDelete.custID);
      setCustomers(prev => prev.filter(c => c.custID !== customerToDelete.custID));
      setSnackbar({
        open: true,
        message: 'Customer deleted successfully!',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to delete customer',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
    }
  };

  const handleCloseSnackbar = (_?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <div className={`customers-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`customers-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={fetchCustomersAndNotes}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`customers-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="customers-header">
        <h1>Customers</h1>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setShowForm(true)}
        >
          Add New Customer
        </Button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="customers-grid">
        {filteredCustomers.map(customer => (
          <div key={customer.custID} className="customer-card">
            <div className="customer-header">
              <h3>{customer.companyName}</h3>
              <IconButton
                onClick={() => handleDeleteClick(customer)}
                size="small"
                className="delete-button"
              >
                <DeleteIcon />
              </IconButton>
            </div>
            <p>
              {[
                customer.contactFirstNames,
                customer.contactSurname
              ].filter(Boolean).join(' ')}
            </p>
            <p>{customer.email}</p>
            <p>{customer.telephone}</p>
            <div className="customer-actions">              <Button
                variant="outlined"
                onClick={() => navigate(`/customers/${customer.custID}/notes`)}
              >
                Notes ({customerNotes[customer.custID] || 0})
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/customers/${customer.custID}`)}
              >
                Summary
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogContent>
            <div className="form-grid">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name *"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="contactTitle"
                placeholder="Contact Title"
                value={formData.contactTitle}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="contactFirstNames"
                placeholder="First Names"
                value={formData.contactFirstNames}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="contactSurname"
                placeholder="Surname"
                value={formData.contactSurname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="line1"
                placeholder="Address Line 1"
                value={formData.line1}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="line2"
                placeholder="Address Line 2"
                value={formData.line2}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="line3"
                placeholder="Address Line 3"
                value={formData.line3}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="line4"
                placeholder="Address Line 4"
                value={formData.line4}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="postcode"
                placeholder="Postcode"
                value={formData.postcode}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="telephone"
                placeholder="Telephone"
                value={formData.telephone}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="fax"
                placeholder="Fax"
                value={formData.fax}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Add Customer
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {customerToDelete?.companyName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AllCustomers;
