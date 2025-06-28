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
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { 
    Search as SearchIcon, 
    Clear as ClearIcon,
    Delete as DeleteIcon,
    CheckCircle as SettleIcon,
    Cancel as UnsettleIcon
} from '@mui/icons-material';
import debounce from 'lodash/debounce';
import ledgerService, { LedgerDto, LedgerFilters } from '@/services/ledgerService';
import { formatCurrency } from '@/utils/formatters';
import { useAuth } from '@/contexts/AuthContext';

const DEBOUNCE_DELAY = 500;

const LedgerList: React.FC = () => {
    const { hasRole } = useAuth();
    
    // Admin role check
    if (!hasRole('Admin')) {
        return (
            <Box sx={{ p: 3 }}>
                <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        Access Denied
                    </Typography>
                    <Typography>
                        Only administrators can access the ledger.
                    </Typography>
                </Paper>
            </Box>
        );
    }
    
    const [ledgerEntries, setLedgerEntries] = useState<LedgerDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [customerSearch, setCustomerSearch] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [settleDialogOpen, setSettleDialogOpen] = useState(false);
    const [unsettleDialogOpen, setUnsettleDialogOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<LedgerDto | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
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

    const handleDeleteClick = (entry: LedgerDto) => {
        setSelectedEntry(entry);
        setDeleteDialogOpen(true);
    };

    const handleSettleClick = (entry: LedgerDto) => {
        setSelectedEntry(entry);
        setSettleDialogOpen(true);
    };

    const handleUnsettleClick = (entry: LedgerDto) => {
        setSelectedEntry(entry);
        setUnsettleDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedEntry) return;

        try {
            setActionLoading(true);
            await ledgerService.deleteLedgerEntry(selectedEntry.id);
            setLedgerEntries(prev => prev.filter(entry => entry.id !== selectedEntry.id));
            setDeleteDialogOpen(false);
            setSelectedEntry(null);
        } catch (err) {
            console.error('Error deleting ledger entry:', err);
            setError('Failed to delete ledger entry. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleSettleConfirm = async () => {
        if (!selectedEntry) return;

        try {
            setActionLoading(true);
            const updatedEntry = await ledgerService.settleLedgerEntry(selectedEntry.id);
            setLedgerEntries(prev => 
                prev.map(entry => 
                    entry.id === selectedEntry.id ? updatedEntry : entry
                )
            );
            setSettleDialogOpen(false);
            setSelectedEntry(null);
        } catch (err) {
            console.error('Error settling ledger entry:', err);
            setError('Failed to settle ledger entry. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleUnsettleConfirm = async () => {
        if (!selectedEntry) return;

        try {
            setActionLoading(true);
            const updatedEntry = await ledgerService.unsettleLedgerEntry(selectedEntry.id);
            setLedgerEntries(prev => 
                prev.map(entry => 
                    entry.id === selectedEntry.id ? updatedEntry : entry
                )
            );
            setUnsettleDialogOpen(false);
            setSelectedEntry(null);
        } catch (err) {
            console.error('Error unsettling ledger entry:', err);
            setError('Failed to unsettle ledger entry. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDialogClose = () => {
        setDeleteDialogOpen(false);
        setSettleDialogOpen(false);
        setUnsettleDialogOpen(false);
        setSelectedEntry(null);
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
                                        <TableCell align="center">Actions</TableCell>
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
                                            <TableCell align="center">
                                                <Tooltip title="Delete Entry">
                                                    <IconButton 
                                                        size="small" 
                                                        color="error" 
                                                        onClick={() => handleDeleteClick(entry)}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                {!entry.settled && (
                                                    <Tooltip title="Settle Entry">
                                                        <IconButton 
                                                            size="small" 
                                                            color="success" 
                                                            onClick={() => handleSettleClick(entry)}
                                                        >
                                                            <SettleIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                                {entry.settled && (
                                                    <Tooltip title="Unsettle Entry">
                                                        <IconButton 
                                                            size="small" 
                                                            color="warning" 
                                                            onClick={() => handleUnsettleClick(entry)}
                                                        >
                                                            <UnsettleIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {ledgerEntries.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center">
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this ledger entry for{' '}
                        <strong>{selectedEntry?.customerName}</strong> (Invoice: {selectedEntry?.invoiceRef})?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" disabled={actionLoading}>
                        {actionLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Settle Confirmation Dialog */}
            <Dialog
                open={settleDialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirm Settlement</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to mark this ledger entry for{' '}
                        <strong>{selectedEntry?.customerName}</strong> (Invoice: {selectedEntry?.invoiceRef}){' '}
                        as settled?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSettleConfirm} color="success" disabled={actionLoading}>
                        {actionLoading ? 'Settling...' : 'Mark as Settled'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Unsettle Confirmation Dialog */}
            <Dialog
                open={unsettleDialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirm Unsettlement</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to mark this ledger entry for{' '}
                        <strong>{selectedEntry?.customerName}</strong> (Invoice: {selectedEntry?.invoiceRef}){' '}
                        as unsettled?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUnsettleConfirm} color="warning" disabled={actionLoading}>
                        {actionLoading ? 'Unsettling...' : 'Mark as Unsettled'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LedgerList;
