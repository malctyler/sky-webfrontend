import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ScheduleInspectionRequest } from '../../types/inspectionTypes';
import inspectionService from '../../services/inspectorService';

interface Inspector {
    inspectorID: number;
    name: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ScheduleInspectionRequest) => Promise<void>;
    serialNumber: string;
    equipmentType: string;
    customer: string;
}

export const ScheduleInspectionDialog: React.FC<Props> = ({
    open,
    onClose,
    onSubmit,
    serialNumber,
    equipmentType,
    customer
}) => {
    const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
    const [inspectorID, setInspectorID] = useState<number | ''>('');
    const [notes, setNotes] = useState('');
    const [inspectors, setInspectors] = useState<Inspector[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInspectors = async () => {
            try {
                const response = await inspectionService.getAllInspectors();
                setInspectors(response);
            } catch (err) {
                console.error('Failed to fetch inspectors:', err);
                setError('Failed to load inspectors');
            }
        };

        if (open) {
            fetchInspectors();
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!scheduledDate || !inspectorID) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await onSubmit({
                serialNumber,
                scheduledDate: scheduledDate.toISOString(),
                inspectorID: inspectorID as number,
                notes: notes.trim() || undefined
            });
            handleClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to schedule inspection');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setScheduledDate(null);
        setInspectorID('');
        setNotes('');
        setError(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Schedule Inspection</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Equipment: {equipmentType}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Customer: {customer}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Serial Number: {serialNumber}
                    </Typography>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Scheduled Date *"
                        value={scheduledDate}
                        onChange={(newDate) => setScheduledDate(newDate)}
                        sx={{ mb: 2, width: '100%' }}
                    />
                </LocalizationProvider>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Inspector *</InputLabel>
                    <Select
                        value={inspectorID}
                        onChange={(e) => setInspectorID(e.target.value as number)}
                        label="Inspector *"
                    >
                        {inspectors.map((inspector) => (
                            <MenuItem key={inspector.inspectorID} value={inspector.inspectorID}>
                                {inspector.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Notes"
                    multiline
                    rows={4}
                    fullWidth
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button 
                    onClick={handleSubmit}
                    variant="contained" 
                    color="primary"
                    disabled={loading || !scheduledDate || !inspectorID}
                >
                    Schedule
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleInspectionDialog;
