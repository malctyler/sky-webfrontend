import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { startOfDay } from 'date-fns';
import {
    Paper,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import inspectionService from '../../services/inspectionService';
import inspectorService from '../../services/inspectorService';

type PlantFilter = 'all' | 'main' | 'auxiliary';
import { toLocalISOString } from '../../utils/dateUtils';
import { InspectionDueDate, ScheduleInspectionRequest } from '../../types/inspectionTypes';
import { Inspector } from '../../types/inspectorTypes';
import type { SelectChangeEvent } from '@mui/material/Select';
import { datePickerConfig } from '../../utils/dateUtils';
import styles from './InspectionForm.module.css';
import InspectionMap from './InspectionMap';

const getStatusColor = (status: string): "error" | "warning" | "success" | "default" => {
    switch (status) {
        case 'Overdue':
            return 'error';
        case 'Due Soon':
            return 'warning';
        case 'Up to Date':
            return 'success';
        default:
            return 'default';
    }
};

const InspectionDueDates: React.FC = () => {
    const [dueDates, setDueDates] = useState<InspectionDueDate[]>([]);
    const [filteredDueDates, setFilteredDueDates] = useState<InspectionDueDate[]>([]);
    const [plantFilter, setPlantFilter] = useState<PlantFilter>('all');
    const [error, setError] = useState<string | null>(null);
    const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
    const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InspectionDueDate | null>(null);
    const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
    const [selectedInspector, setSelectedInspector] = useState<string>('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [inspectors, setInspectors] = useState<Inspector[]>([]);

    useEffect(() => {
        const fetchInspectors = async () => {
            try {
                const response = await inspectorService.getAll();
                setInspectors(response);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch inspectors:', err);
                setError('Failed to load inspectors. Please try again later.');
                setInspectors([]);
            }
        };

        if (isScheduleDialogOpen) {
            void fetchInspectors();
        }
    }, [isScheduleDialogOpen]);

    const handleScheduleClick = (item: InspectionDueDate) => {
        console.log('Selected item for scheduled:', item);
        setSelectedItem(item);
        setIsScheduleDialogOpen(true);
        // Set initial date to start of next day to avoid timezone issues
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setScheduledDate(startOfDay(tomorrow));
    };

    const handleCloseDialog = () => {
        setIsScheduleDialogOpen(false);
        setSelectedItem(null);
        setScheduledDate(null);
        setSelectedInspector('');
        setLocation('');
        setNotes('');
    };

    useEffect(() => {
        const fetchDueDates = async () => {
            try {
                setError(null);
                setDueDates([]);
                const response = await inspectionService.getInspectionDueDates();
                console.log('Inspection due dates response:', response);
                // Log postcodes for debugging
                console.log('Postcodes available:', response.map(i => i.postcode).filter(Boolean));
                setDueDates(response);
            } catch (err) {
                console.error('Error fetching inspection due dates:', err);
                setError('The inspection due dates service is currently unavailable. Please try again later.');
            }
        };

        void fetchDueDates();
    }, []);

    // Filter due dates based on plant filter selection
    useEffect(() => {
        if (plantFilter === 'all') {
            setFilteredDueDates(dueDates);
        } else if (plantFilter === 'main') {
            setFilteredDueDates(dueDates.filter(item => !item.multiInspect));
        } else if (plantFilter === 'auxiliary') {
            setFilteredDueDates(dueDates.filter(item => item.multiInspect));
        }
    }, [dueDates, plantFilter]);    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [conflictData, setConflictData] = useState<{ message: string; existingDates: string[]; serialNumber: string } | null>(null);    const handleScheduleInspection = async () => {
        if (!selectedItem || !scheduledDate || !selectedInspector) {
            setError('Please select an inspector and schedule date');
            return;
        }

        try {
            setError(null);
            console.log('Selected item before scheduled:', selectedItem);
            
            // Ensure we're using the start of the selected day
            const normalizedDate = startOfDay(scheduledDate);
            
            const request: ScheduleInspectionRequest = {
                holdingID: selectedItem.holdingID,
                serialNumber: selectedItem.serialNumber,
                scheduledDate: toLocalISOString(normalizedDate),
                inspectorID: Number(selectedInspector),
                location: location || undefined,
                notes: notes || undefined,
                force: false
            };
            
            console.log('Sending schedule request:', request);

            try {
                await inspectionService.scheduleInspection(request);
                // If we get here, the schedule was successful
                const response = await inspectionService.getInspectionDueDates();
                if (Array.isArray(response)) {
                    setDueDates(response);
                }
                handleCloseDialog();
            } catch (err: unknown) {
                if (axios.isAxiosError(err) && err.response?.status === 409) {
                    // Handle duplicate inspection conflict
                    console.log('Duplicate inspection detected:', err.response.data);
                    setConflictData(err.response.data);
                    setShowConfirmDialog(true);
                } else {
                    throw err; // Re-throw non-409 errors
                }
            }
        } catch (err) {
            console.error('Error in handleScheduleInspection:', err);
            const errorMessage = err instanceof Error 
                ? err.message 
                : 'An error occurred while scheduled the inspection. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <Box>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Upcoming Inspections</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsMapDialogOpen(true)}
                    >
                        View on Map
                    </Button>
                </Box>
                
                {/* Plant Filter Controls */}
                <Box mb={2}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ mb: 1 }}>Filter by Plant Type:</FormLabel>
                        <RadioGroup
                            row
                            value={plantFilter}
                            onChange={(e) => setPlantFilter(e.target.value as PlantFilter)}
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All Plant" />
                            <FormControlLabel value="main" control={<Radio />} label="Main Plant" />
                            <FormControlLabel value="auxiliary" control={<Radio />} label="Auxiliary Plant" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : filteredDueDates.length === 0 ? (
                    <Typography>No inspections due for the selected filter.</Typography>
                ) : (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Equipment Type</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Serial Number</TableCell>
                                    <TableCell>Last Inspection</TableCell>
                                    <TableCell>Next Due</TableCell>
                                    <TableCell>Inspection Frequency</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredDueDates.map((item) => {
                                    const today = new Date();
                                    const dueDate = new Date(item.dueDate);
                                    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                                    
                                    let status = 'Up to Date';
                                    if (daysUntilDue < 0) {
                                        status = 'Overdue';
                                    } else if (daysUntilDue <= 30) {
                                        status = 'Due Soon';
                                    }

                                    return (
                                        <TableRow key={item.serialNumber}>
                                            <TableCell>{item.categoryDescription}</TableCell>
                                            <TableCell>{item.companyName}</TableCell>
                                            <TableCell>{item.serialNumber}</TableCell>
                                            <TableCell>{item.formattedLastInspection}</TableCell>
                                            <TableCell>{item.formattedDueDate}</TableCell>
                                            <TableCell>{item.inspectionFrequency} months</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={status} 
                                                    color={getStatusColor(status)} 
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button 
                                                    variant="contained" 
                                                    size="small" 
                                                    onClick={() => handleScheduleClick(item)} 
                                                    color={item.scheduledInspectionCount > 0 ? "warning" : "primary"}
                                                    startIcon={item.scheduledInspectionCount > 0 ? (
                                                        <Typography 
                                                            variant="caption" 
                                                            sx={{ 
                                                                backgroundColor: 'warning.dark', 
                                                                color: 'warning.contrastText', 
                                                                borderRadius: '50%', 
                                                                width: '20px', 
                                                                height: '20px', 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                justifyContent: 'center', 
                                                                minWidth: '20px' 
                                                            }}
                                                        >
                                                            {item.scheduledInspectionCount}
                                                        </Typography>
                                                    ) : null}
                                                >
                                                    {item.scheduledInspectionCount > 0 ? 'Schedule Another' : 'Schedule'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            <Dialog open={isScheduleDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Schedule Inspector</DialogTitle>
                <DialogContent>
                    {selectedItem && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Equipment Type: {selectedItem.categoryDescription}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Serial Number: {selectedItem.serialNumber}
                            </Typography>
                            <div className={styles.datePickerContainer}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Schedule Date:
                                </Typography>                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                                    <DatePicker
                                        value={scheduledDate}
                                        onChange={(date: Date | null) => setScheduledDate(date)}
                                        format={datePickerConfig.format}
                                        minDate={new Date()}
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
                            </div>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="inspector-select-label">Inspector</InputLabel>
                                <Select
                                    labelId="inspector-select-label"
                                    value={selectedInspector}
                                    onChange={(e: SelectChangeEvent) => setSelectedInspector(e.target.value)}
                                    label="Inspector"
                                >
                                    {inspectors.map((inspector) => (
                                        <MenuItem 
                                            key={inspector.inspectorID} 
                                            value={inspector.inspectorID}
                                        >
                                            {inspector.inspectorsName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter inspection location"
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter any additional notes"
                                sx={{ mt: 2 }}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={handleScheduleInspection}
                        variant="contained"
                        disabled={!scheduledDate || !selectedInspector}
                    >
                        Schedule
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Duplicate Inspection Confirmation Dialog */}
            <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Duplicate Inspection Found</DialogTitle>
                <DialogContent>
                    {conflictData && (
                        <>
                            <Typography color="warning.main" sx={{ mb: 2 }}>
                                {conflictData.message}
                            </Typography>
                            <Typography>
                                Equipment: {conflictData.serialNumber}
                            </Typography>
                            {conflictData.existingDates && conflictData.existingDates.length > 0 && (
                                <>
                                    <Typography sx={{ mt: 1, mb: 1 }}>Existing Scheduled Dates:</Typography>
                                    {conflictData.existingDates.map((date, index) => (
                                        <Typography key={index} sx={{ ml: 2 }}>• {date}</Typography>
                                    ))}
                                </>
                            )}
                            <Typography sx={{ mt: 2, fontWeight: 'bold', color: 'warning.dark' }}>
                                Would you like to schedule another inspection anyway?
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
                    <Button
                        onClick={async () => {
                            if (!selectedItem || !scheduledDate || !selectedInspector) return;

                            try {
                                const request: ScheduleInspectionRequest = {
                                    holdingID: selectedItem.holdingID,
                                    serialNumber: selectedItem.serialNumber,
                                    scheduledDate: toLocalISOString(scheduledDate),
                                    inspectorID: Number(selectedInspector),
                                    location: location || undefined,
                                    notes: notes || undefined,
                                    force: true // Add flag to force creation despite duplicate
                                };

                                await inspectionService.scheduleInspection(request);
                                const response = await inspectionService.getInspectionDueDates();
                                if (Array.isArray(response)) {
                                    setDueDates(response);
                                }
                                setShowConfirmDialog(false);
                                handleCloseDialog();
                            } catch (err) {
                                console.error('Error in force schedule inspection:', err);
                                const errorMessage = err instanceof Error 
                                    ? err.message 
                                    : 'An error occurred while scheduled the inspection.';
                                setError(errorMessage);
                            }
                        }}
                        variant="contained"
                        color="warning"
                    >
                        Schedule Anyway
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Map Dialog */}
            <Dialog
                open={isMapDialogOpen}
                onClose={() => setIsMapDialogOpen(false)}
                maxWidth="xl"
                fullWidth
                PaperProps={{
                    sx: {
                        minHeight: '90vh',
                        maxHeight: '90vh',
                        m: 1
                    }
                }}
            >
                <DialogTitle>Inspection Locations</DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <InspectionMap
                        inspections={filteredDueDates.filter(date => {
                            const dueDate = new Date(date.dueDate);
                            const thirtyDaysFromNow = new Date();
                            thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
                            return dueDate <= thirtyDaysFromNow;
                        })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsMapDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InspectionDueDates;
