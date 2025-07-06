import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import { Customer } from '../../types/customerTypes';
import { MultiInspectionCertificate } from '../../types/inspectionTypes';
import customerService from '../../services/customerService';
import MultiInspectionService from '../../services/multiInspectionService';
import { generateMultiInspectionPdfBlob } from './MultiInspectionCertificateTemplate';
import { toLocalISOString, datePickerConfig } from '../../utils/dateUtils';

const ViewMultiCertificate: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<number | ''>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [certificateData, setCertificateData] = useState<MultiInspectionCertificate | null>(null);
    const [pdfGenerating, setPdfGenerating] = useState(false);
    const [pdfError, setPdfError] = useState<string | null>(null);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const customerData = await customerService.getAll();
            setCustomers(customerData);
        } catch (err) {
            console.error('Error loading customers:', err);
            setError('Failed to load customers');
        }
    };

    const generateCertificate = async () => {
        if (!selectedCustomer || !selectedDate) {
            setError('Please select both a customer and inspection date');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const dateString = toLocalISOString(selectedDate).split('T')[0]; // Get just the date part
            
            // Get the multi-inspection data for the selected customer and date
            const inspectionData = await MultiInspectionService.getMultiInspectionsByCustomerAndDate(
                selectedCustomer as number, 
                dateString
            );

            if (!inspectionData || inspectionData.length === 0) {
                setError('No multi-inspection found for the selected customer and date');
                return;
            }

            // Find the selected customer details
            const customer = customers.find(c => c.custID === selectedCustomer);
            
            // Transform the data into certificate format
            const certificateInfo: MultiInspectionCertificate = {
                inspectionDate: dateString,
                location: inspectionData[0]?.location || '',
                inspectorName: inspectionData[0]?.inspectorName || inspectionData[0]?.inspectorsName || '',
                inspectorSignature: inspectionData[0]?.inspectorSignature || '',
                testDetails: inspectionData[0]?.testDetails || '',
                miscNotes: inspectionData[0]?.miscNotes || '',
                items: inspectionData.map(item => ({
                    plantDescription: item.plantDescription || '',
                    serialNumber: item.serialNumber || '',
                    location: item.location || inspectionData[0]?.location || '',
                    safeWorking: item.safeWorking || item.swl || '',
                    defects: item.defects || 'No defects found'
                })),
                companyName: customer?.companyName || '',
                contactTitle: customer?.contactTitle || '',
                contactFirstNames: customer?.contactFirstNames || '',
                contactSurname: customer?.contactSurname || '',
                addressLine1: customer?.line1 || '',
                addressLine2: customer?.line2 || '',
                city: customer?.line3 || '',
                county: customer?.line4 || '',
                postcode: customer?.postcode || ''
            };

            setCertificateData(certificateInfo);
        } catch (err) {
            console.error('Error generating certificate:', err);
            setError('Failed to generate certificate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle PDF generation and opening
    const handleGenerateAndOpenPdf = async () => {
        if (!certificateData) return;

        setPdfGenerating(true);
        setPdfError(null);

        try {
            const blob = await generateMultiInspectionPdfBlob(certificateData);
            openPdfInNewTab(blob);
        } catch (error) {
            console.error('Error generating PDF:', error);
            setPdfError(error instanceof Error ? error.message : 'Unknown error generating PDF');
        } finally {
            setPdfGenerating(false);
        }
    };

    const openPdfInNewTab = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            newWindow.document.title = `Multi-Inspection Certificate - ${customers.find(c => c.custID === selectedCustomer)?.companyName || 'Certificate'}`;
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
            <Box sx={{ p: 3 }}>
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        View Multi-Inspection Certificate
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Select a customer and inspection date to generate and view a multi-inspection certificate.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                        {/* Customer Selection */}
                        <FormControl sx={{ minWidth: 300 }}>
                            <InputLabel>Select Customer</InputLabel>                        <Select
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value as number | '')}
                            label="Select Customer"
                        >
                                <MenuItem value="">
                                    <em>Choose a customer...</em>
                                </MenuItem>
                                {customers.map((customer) => (
                                    <MenuItem key={customer.custID} value={customer.custID}>
                                        {customer.companyName || `${customer.contactFirstNames} ${customer.contactSurname}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Date Selection */}
                        <DatePicker
                            label="Inspection Date"
                            value={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            format={datePickerConfig.format}
                            slotProps={{
                                textField: {
                                    sx: { minWidth: 200 }
                                }
                            }}
                        />

                        {/* Generate Button */}
                        <Button
                            variant="contained"
                            onClick={generateCertificate}
                            disabled={!selectedCustomer || !selectedDate || loading}
                            sx={{ height: 56 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Generate Certificate'}
                        </Button>
                    </Box>

                    {/* PDF Generation */}
                    {certificateData && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Certificate Ready
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Found {certificateData.items.length} items for the selected inspection.
                            </Typography>
                            
                            {pdfGenerating ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <CircularProgress size={20} />
                                    <Typography>Generating PDF...</Typography>
                                </Box>
                            ) : pdfError ? (
                                <Alert severity="error">
                                    Error generating PDF: {pdfError}
                                </Alert>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleGenerateAndOpenPdf}
                                >
                                    Open Certificate in New Tab
                                </Button>
                            )}
                        </Box>
                    )}
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default ViewMultiCertificate;
