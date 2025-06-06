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
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import inspectorService from '../../services/inspectorService';
import { ScheduledInspection } from '../../types/scheduledInspectionTypes';
import { Inspector } from '../../types/inspectorTypes';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (inspection: ScheduledInspection) => Promise<void>;
  inspection: ScheduledInspection | null;
}

const ScheduleEditDialog: React.FC<Props> = ({ open, onClose, onSave, inspection }) => {
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [selectedInspector, setSelectedInspector] = useState<string>('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [inspectors, setInspectors] = useState<Inspector[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inspection) {
      setScheduledDate(new Date(inspection.scheduledDate));
      setSelectedInspector(inspection.inspectorID?.toString() || '');
      setLocation(inspection.location || '');
      setNotes(inspection.notes || '');
      setIsCompleted(inspection.isCompleted);
    }
  }, [inspection]);

  useEffect(() => {
    const fetchInspectors = async () => {
      try {
        const response = await inspectorService.getAll();
        setInspectors(response);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch inspectors:', err);
        setError('Failed to load inspectors');
      }
    };

    if (open) {
      void fetchInspectors();
    }
  }, [open]);

  const handleSave = async () => {
    if (!inspection || !scheduledDate || !selectedInspector) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSave({
        ...inspection,
        scheduledDate: scheduledDate.toISOString(),
        inspectorID: Number(selectedInspector),
        location,
        notes,
        isCompleted
      });
      handleClose();
    } catch (err) {
      console.error('Error saving scheduled inspection:', err);
      setError(err instanceof Error ? err.message : 'Failed to save scheduled inspection');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setScheduledDate(null);
    setSelectedInspector('');
    setLocation('');
    setNotes('');
    setIsCompleted(false);
    setError(null);
    onClose();
  };

  if (!inspection) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Scheduled Inspection</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Equipment: {inspection.plantDescription}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Customer: {inspection.customerCompanyName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Serial Number: {inspection.serialNumber}
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Scheduled Date *"
                value={scheduledDate}
                onChange={(newDate) => setScheduledDate(newDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !scheduledDate && !!error,
                  },
                }}
              />
            </LocalizationProvider>

            <FormControl fullWidth error={!selectedInspector && !!error}>
              <InputLabel id="inspector-select-label">Inspector *</InputLabel>
              <Select
                labelId="inspector-select-label"
                value={selectedInspector}
                onChange={(e: SelectChangeEvent) => setSelectedInspector(e.target.value)}
                label="Inspector *"
              >
                {inspectors.map((inspector) => (
                  <MenuItem key={inspector.inspectorID} value={inspector.inspectorID}>
                    {inspector.inspectorsName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />

            <TextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />

            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={isCompleted ? 'completed' : 'incomplete'}
                onChange={(e: SelectChangeEvent) => setIsCompleted(e.target.value === 'completed')}
                label="Status"
              >
                <MenuItem value="incomplete">Incomplete</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleEditDialog;
