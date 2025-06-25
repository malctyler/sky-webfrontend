import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  FormControl,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Customer } from '../../types/customerTypes';
import { baseUrl } from '../../config';
import { useAuth } from '../../contexts/AuthContext';
import { CustomerInvoiceDto } from '../../types/invoiceTypes';
import { generateInvoicePdf } from './InvoiceTemplate';
import { getAuthToken } from '../../utils/authUtils';

const GenerateInvoice: React.FC = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addToLedger, setAddToLedger] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setSelectedCustomer(null);
    setStartDate(null);
    setEndDate(null);
    setAddToLedger(false);
    setError(null);
  };

  const getUserInitials = () => {
    if (!user?.firstName && !user?.lastName) {
      if (!user?.email) return 'XX';
      const parts = user.email.split('@')[0].split('.');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }

    if (!user.firstName && user.lastName) {
      return user.lastName.slice(0, 2).toUpperCase();
    }
    if (user.firstName && !user.lastName) {
      return user.firstName.slice(0, 2).toUpperCase();
    }

    if (user.firstName && user.lastName) {
      return (user.firstName[0] + user.lastName[0]).toUpperCase();
    }

    return 'XX';
  };

  const handleSubmit = async () => {
    if (!selectedCustomer?.custID || !startDate || !endDate) {
      return;
    }    try {
      const token = getAuthToken();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // First fetch the invoice data
      setLoading(true);
      setError(null);
      
      const startDateStr = format(startDate, 'yyyy-MM-dd');
      const endDateStr = format(endDate, 'yyyy-MM-dd');

      const response = await fetch(
        `${baseUrl}/Customers/${selectedCustomer.custID}/invoices?startDate=${startDateStr}&endDate=${endDateStr}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch invoice data');
      }

      const invoiceData: CustomerInvoiceDto = await response.json();
      setLoading(false);
      
      const startDateFormatted = format(startDate, 'ddMMyy');
      const endDateFormatted = format(endDate, 'ddMMyy');
      const reference = `${getUserInitials()}/${startDateFormatted}/${endDateFormatted}/${selectedCustomer.custID}`;
      
      const invoiceWithReference = {
        ...invoiceData,
        invoiceReference: reference
      };
      
      if (addToLedger) {
        const ledgerEntry = {
          invoiceDate: new Date().toISOString(),
          customerName: selectedCustomer.companyName,
          invoiceRef: reference,
          subTotal: invoiceWithReference.totalAmount * 0.8,
          vat: invoiceWithReference.totalAmount * 0.2,
          total: invoiceWithReference.totalAmount,
          settled: false
        };
        
        setLoading(true);
        const ledgerResponse = await fetch(`${baseUrl}/ledger`, {
          method: 'POST',
          headers,
          body: JSON.stringify(ledgerEntry)
        });

        if (!ledgerResponse.ok) {
          const errorData = await ledgerResponse.json();
          throw new Error(errorData.message || 'Failed to add invoice to ledger');
        }
        setLoading(false);

        setSnackbarMessage('Invoice added to ledger successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        // Wait a short moment for the snackbar to be visible
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Generate PDF after ledger entry (if any)
      setLoading(true);
      const pdfBlob = await generateInvoicePdf(invoiceWithReference);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process invoice';
      setError(errorMessage);
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = getAuthToken();
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        const response = await fetch(`${baseUrl}/Customers`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        const sortedCustomers = data.sort((a: Customer, b: Customer) => 
          (a.companyName || '').localeCompare(b.companyName || '')
        );
        setCustomers(sortedCustomers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [user]); // Depend on user object instead of token
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Generate Invoice
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.companyName || 'Unnamed Customer'}
            value={selectedCustomer}
            onChange={(_event, newValue) => setSelectedCustomer(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer"
                placeholder="Start typing to filter customers..."
              />
            )}
            isOptionEqualToValue={(option, value) => option.custID === value.custID}
            filterOptions={(options, { inputValue }) => {
              const searchText = inputValue.toLowerCase();
              return options.filter(option => 
                (option.companyName || '').toLowerCase().includes(searchText)
              );
            }}
          />
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <Box sx={{ mb: 2 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              format="dd/MM/yy"
              sx={{ width: '100%', mb: 2 }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              format="dd/MM/yy"
              sx={{ width: '100%' }}
            />
          </Box>
        </LocalizationProvider>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={addToLedger}
                onChange={(e) => setAddToLedger(e.target.checked)}
              />
            }
            label="Add to ledger"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!selectedCustomer || !startDate || !endDate || loading}
          >
            {loading ? 'Processing...' : 'Generate Invoice'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GenerateInvoice;
