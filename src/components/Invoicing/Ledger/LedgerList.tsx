import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { 
    Box, 
    Card, 
    CardContent, 
    CardHeader, 
    Chip, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography,
    Grid,
    TextField,
    IconButton,
    Tooltip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import debounce from 'lodash/debounce';
import ledgerService, { LedgerDto, LedgerFilters } from '@/services/ledgerService';
import { formatCurrency } from '@/utils/formatters';

const DEBOUNCE_DELAY = 500;

const LedgerList: React.FC = () => {    
    const [ledgerEntries, setLedgerEntries] = useState<LedgerDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [customerSearch, setCustomerSearch] = useState('');
    const [filters, setFilters] = useState<LedgerFilters>({
        startDate: undefined,
        endDate: undefined,
        customerName: '',
    });

    const fetchLedgerEntries = useCallback(async (currentFilters: LedgerFilters) => {
        if (!isDateRangeValid()) return;
        
        try {
            setLoading(true);
            setError(null);
            const entries = await ledgerService.getLedgerEntries(currentFilters);
            setLedgerEntries(entries);
        } catch (err) {
            console.error('Error loading ledger entries:', err);
            setError('Failed to load ledger entries. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    const isDateRangeValid = useCallback(() => {
        if (!filters.startDate || !filters.endDate) return true;
        return new Date(filters.startDate) <= new Date(filters.endDate);
    }, [filters.startDate, filters.endDate]);

    const debouncedFetch = useMemo(
        () => debounce((newFilters: LedgerFilters) => {
            fetchLedgerEntries(newFilters);
        }, DEBOUNCE_DELAY),
        [fetchLedgerEntries]
    );

    useEffect(() => {
        debouncedFetch(filters);
        return () => {
            debouncedFetch.cancel();
        };
    }, [filters, debouncedFetch]);

    const handleDateChange = (field: 'startDate' | 'endDate') => (date: Date | null) => {
        setFilters(prev => ({
            ...prev,
            [field]: date ? date.toISOString() : undefined
        }));
    };

    const handleCustomerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCustomerSearch(value);
        setFilters(prev => ({
            ...prev,
            customerName: value.trim()
        }));
    };

    const clearFilters = () => {
        setCustomerSearch('');
        setFilters({
            startDate: undefined,
            endDate: undefined,
            customerName: '',
        });
    };

    const getDateError = (field: 'startDate' | 'endDate'): boolean => {
        if (!filters.startDate || !filters.endDate) return false;
        if (field === 'startDate') {
            return new Date(filters.startDate) > new Date(filters.endDate);
        }
        return new Date(filters.endDate) < new Date(filters.startDate);
    };

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Card>
                <CardHeader 
                    title="Ledger Entries" 
                    sx={{ 
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText'
                    }}
                />
                <CardContent>
                    <Box sx={{ mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={3}>
                                <DatePicker
                                    label="Start Date"
                                    value={filters.startDate ? new Date(filters.startDate) : null}
                                    onChange={handleDateChange('startDate')}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: { 
                                            fullWidth: true, 
                                            size: 'small',
                                            error: getDateError('startDate'),
                                            helperText: getDateError('startDate') ? 'Start date must be before end date' : undefined
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <DatePicker
                                    label="End Date"
                                    value={filters.endDate ? new Date(filters.endDate) : null}
                                    onChange={handleDateChange('endDate')}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: { 
                                            fullWidth: true, 
                                            size: 'small',
                                            error: getDateError('endDate'),
                                            helperText: getDateError('endDate') ? 'End date must be after start date' : undefined
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Search by Customer"
                                    value={customerSearch}
                                    onChange={handleCustomerSearch}
                                    InputProps={{
                                        endAdornment: (
                                            <SearchIcon color="action" />
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Tooltip title="Clear Filters">
                                    <IconButton onClick={clearFilters} size="small">
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Box>
                    
                    {loading ? (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography>Loading...</Typography>
                        </Box>
                    ) : (
                        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 350px)', overflow: 'auto' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Invoice Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Invoice Ref</TableCell>
                                        <TableCell align="right">Sub Total</TableCell>
                                        <TableCell align="right">VAT</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ledgerEntries.map((entry) => (
                                        <TableRow key={entry.id} hover>
                                            <TableCell>
                                                {new Date(entry.invoiceDate).toLocaleDateString('en-GB')}
                                            </TableCell>
                                            <TableCell>{entry.customerName}</TableCell>
                                            <TableCell>{entry.invoiceRef}</TableCell>
                                            <TableCell align="right">{formatCurrency(entry.subTotal)}</TableCell>
                                            <TableCell align="right">{formatCurrency(entry.vat)}</TableCell>
                                            <TableCell align="right">{formatCurrency(entry.total)}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={entry.settled ? "Settled" : "Pending"}
                                                    color={entry.settled ? "success" : "warning"}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {ledgerEntries.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <Typography variant="body2" color="textSecondary">
                                                    No ledger entries found
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default LedgerList;
