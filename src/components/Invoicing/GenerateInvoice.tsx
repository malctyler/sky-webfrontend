import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  FormControl,
  TextField,
  Button,
  Typography,
  Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Customer } from '../../types/customerTypes';
import { baseUrl } from '../../config';
import { useAuth } from '../../contexts/AuthContext';

import { generateInvoicePdf } from './InvoiceTemplate';
import { CustomerInvoiceDto } from '../../types/invoiceTypes';
const GenerateInvoice: React.FC = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const headers = {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        };
        const response = await fetch(`${baseUrl}/Customers`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        // Sort customers alphabetically by company name
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
  }, [user?.token]);

  const handleSubmit = async () => {
    if (!selectedCustomer?.custID || !startDate || !endDate) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const headers = {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      };

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
      const pdfBlob = await generateInvoicePdf(invoiceData);
      
      // Create a URL for the blob and open it in a new tab
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      
      // Clean up the URL after a delay
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate invoice');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedCustomer(null);
    setStartDate(null);
    setEndDate(null);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

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
        
        <FormControl fullWidth sx={{ mb: 2 }}>          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.companyName || 'Unnamed Customer'}
            value={selectedCustomer}
            onChange={(_event, newValue) => setSelectedCustomer(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer"                placeholder="Start typing to filter customers..."
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

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!selectedCustomer || !startDate || !endDate}
          >
            Generate Invoice
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default GenerateInvoice;
