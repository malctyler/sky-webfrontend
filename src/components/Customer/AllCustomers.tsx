import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styles from './AllCustomers.module.css';
import apiClient from '../../services/apiClient';
import { Customer } from '../../types/customerTypes';

interface FormData {
  companyName: string;
  contactTitle: string;
  contactFirstNames: string;
  contactSurname: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  postcode: string;
  telephone: string;
  fax: string;
  email: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

function AllCustomers() {
  const { isDarkMode } = useTheme();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [customerNotes, setCustomerNotes] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<FormData>({
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
  }, [searchTerm, customers]);

  const fetchCustomersAndNotes = async () => {
    try {
      const [customersResponse, notesResponse] = await Promise.all([
        apiClient.get('/Customers'),
        apiClient.get('/Notes')
      ]);
      const customersData = customersResponse.data;
      const notesData = notesResponse.data;

      // Create a map of customer IDs to their note counts
      const notesMap = notesData.reduce((acc: Record<number, number>, note: any) => {
        acc[note.custID] = (acc[note.custID] || 0) + 1;
        return acc;
      }, {});

      setCustomers(customersData);
      setCustomerNotes(notesMap);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success'
    });
  };

  const showError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
  };

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/Customers', formData);
      const newCustomer = response.data;
      setCustomers(prev => [...prev, newCustomer]);
      setShowForm(false);
      resetForm();
      showSuccess('Customer created successfully');
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleCustomerClick = (custId: number) => {
    navigate(`/customers/${custId}`);
  };

  const openDeleteDialog = (custId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent customer card click
    const customer = customers.find(c => c.custID === custId);
    if (customer) {
      setCustomerToDelete(customer);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteCustomer = async () => {
    if (!customerToDelete) return;
    try {
      await apiClient.delete(`/Customers/${customerToDelete.custID}`);
      setCustomers(prev => prev.filter(c => c.custID !== customerToDelete.custID));
      showSuccess('Customer deleted successfully');
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
    } catch (err: any) {
      showError(err.message);
    }
  };

  const resetForm = () => {
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
  };

  const containerClassName = `${styles['customers-container']} ${isDarkMode ? styles.dark : styles.light}`;

  return (
    <div className={containerClassName}>
      <div className={styles['header-actions']}>
        <h1>All Customers</h1>        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setShowForm(!showForm)} 
        >
          {showForm ? 'Cancel' : 'Add New Customer'}
        </Button>
      </div>

      <div className={styles['search-container']}>
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles['search-input']}
        />
      </div>

      {showForm && (
        <form onSubmit={handleCreateCustomer} className={styles['customer-form']}>
          <div className={styles['form-row']}>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              required
            />
            <input
              type="text"
              name="contactTitle"
              value={formData.contactTitle}
              onChange={handleInputChange}
              placeholder="Contact Title"
            />
          </div>
          <div className={styles['form-row']}>
            <input
              type="text"
              name="contactFirstNames"
              value={formData.contactFirstNames}
              onChange={handleInputChange}
              placeholder="First Names"
            />
            <input
              type="text"
              name="contactSurname"
              value={formData.contactSurname}
              onChange={handleInputChange}
              placeholder="Surname"
            />
          </div>
          <div className={styles['form-row']}>
            <input
              type="text"
              name="line1"
              value={formData.line1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
            />
            <input
              type="text"
              name="line2"
              value={formData.line2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
            />
          </div>
          <div className={styles['form-row']}>
            <input
              type="text"
              name="line3"
              value={formData.line3}
              onChange={handleInputChange}
              placeholder="Address Line 3"
            />
            <input
              type="text"
              name="line4"
              value={formData.line4}
              onChange={handleInputChange}
              placeholder="Address Line 4"
            />
          </div>
          <div className={styles['form-row']}>
            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              placeholder="Postcode"
            />
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              placeholder="Telephone"
            />
          </div>
          <div className={styles['form-row']}>
            <input
              type="tel"
              name="fax"
              value={formData.fax}
              onChange={handleInputChange}
              placeholder="Fax"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
          <Button type="submit" variant="contained" color="primary">Create Customer</Button>
        </form>
      )}

      {loading && <p>Loading customers...</p>}
      {error && <p>Error: {error}</p>}
      {filteredCustomers.length > 0 ? (
        <div className={styles['customers-grid']}>
          {filteredCustomers.map(customer => (
            <div 
              key={customer.custID} 
              className={styles['customer-card']}
              onClick={() => handleCustomerClick(customer.custID)}
            >
              <div className={styles['card-actions']}>
                <IconButton 
                  onClick={(e) => openDeleteDialog(customer.custID, e)} 
                  size="small"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <h3>{customer.companyName}</h3>
              <p>Contact: {customer.contactTitle} {customer.contactFirstNames} {customer.contactSurname}</p>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.telephone}</p>
              <div className={styles.address}>
                <p>{customer.line1}</p>
                {customer.line2 && <p>{customer.line2}</p>}
                {customer.line3 && <p>{customer.line3}</p>}
                {customer.line4 && <p>{customer.line4}</p>}
                <p>{customer.postcode}</p>              </div>
              <Button 
                variant="contained" 
                color="primary" 
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/customers/${customer.custID}/notes`);
                }}
              >
                Notes: {customerNotes[customer.custID] || 0}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles['no-results']}>No customers found matching your search.</p>
      )}
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Customer Deletion
        </DialogTitle>
        <DialogContent>
          <div id="delete-dialog-description">
            <p>Are you sure you want to delete this customer?</p>
            {customerToDelete && (
              <>
                <p><strong>Company:</strong> {customerToDelete.companyName}</p>
                <p><strong>Contact:</strong> {customerToDelete.contactTitle} {customerToDelete.contactFirstNames} {customerToDelete.contactSurname}</p>
              </>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action cannot be undone. All associated notes and plant holdings will also be deleted.
            </p>
          </div>
        </DialogContent>
        <DialogActions>          <Button 
            color="inherit" 
            onClick={() => setDeleteDialogOpen(false)}
          >
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
    </div>
  );
}

export default AllCustomers;
