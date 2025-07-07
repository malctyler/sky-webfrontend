import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Snackbar,
  Alert,
  TableSortLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import inspectionService from '../../services/inspectionService';
import ScheduleEditDialog from './ScheduleEditDialog';
import { ScheduledInspection } from '../../types/scheduledInspectionTypes';
import { formatDate } from '../../utils/dateUtils';

type InspectionStatus = 'all' | 'complete' | 'incomplete';
type SortField = 'customerCompanyName' | 'plantDescription' | 'serialNumber' | 'inspectorName' | 'scheduledDate' | 'isCompleted';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

const ScheduledList: React.FC = () => {
  const [inspections, setInspections] = useState<ScheduledInspection[]>([]);
  const [statusFilter, setStatusFilter] = useState<InspectionStatus>('all');
  const [loading, setLoading] = useState(true);
  const [selectedInspection, setSelectedInspection] = useState<ScheduledInspection | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'scheduledDate', order: 'asc' });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchInspections = async () => {
    try {
      setLoading(true);
      const inspectionsData = await inspectionService.getScheduledInspections();
      setInspections(inspectionsData);
    } catch (error) {
      console.error('Failed to fetch scheduled inspections:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load scheduled inspections',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as InspectionStatus);
  };

  const handleEdit = (inspection: ScheduledInspection) => {
    setSelectedInspection(inspection);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedInspection: ScheduledInspection) => {
    try {
      await inspectionService.updateScheduledInspection(updatedInspection.id.toString(), updatedInspection);
      await fetchInspections();
      setSnackbar({
        open: true,
        message: 'Inspection updated successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to update inspection:', error);
      setSnackbar({
        open: true,
        message: 'Failed to update inspection',
        severity: 'error'
      });
      throw error; // Re-throw to be handled by the dialog
    }
  };

  const handleDelete = async (inspection: ScheduledInspection) => {
    if (window.confirm('Are you sure you want to delete this scheduled inspection?')) {
      try {
        await inspectionService.deleteScheduledInspection(inspection.id.toString());
        await fetchInspections();
        setSnackbar({
          open: true,
          message: 'Inspection deleted successfully',
          severity: 'success'
        });
      } catch (error) {
        console.error('Failed to delete inspection:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete inspection',
          severity: 'error'
        });
      }
    }
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedInspection(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSort = (field: SortField) => {
    setSortConfig(current => ({
      field,
      order: current.field === field && current.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortInspections = (a: ScheduledInspection, b: ScheduledInspection) => {
    const { field, order } = sortConfig;
    let comparison = 0;

    switch (field) {
      case 'customerCompanyName':
        comparison = (a.customerCompanyName || '').localeCompare(b.customerCompanyName || '');
        break;
      case 'plantDescription':
        comparison = (a.plantDescription || '').localeCompare(b.plantDescription || '');
        break;
      case 'serialNumber':
        comparison = (a.serialNumber || '').localeCompare(b.serialNumber || '');
        break;
      case 'inspectorName':
        comparison = (a.inspectorName || '').localeCompare(b.inspectorName || '');
        break;
      case 'scheduledDate':
        comparison = new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
        break;
      case 'isCompleted':
        comparison = Number(a.isCompleted) - Number(b.isCompleted);
        break;
      default:
        comparison = 0;
    }

    return order === 'asc' ? comparison : -comparison;
  };

  const filteredInspections = inspections
    .filter(inspection => {
      if (statusFilter === 'all') return true;
      return statusFilter === 'complete' 
        ? inspection.isCompleted
        : !inspection.isCompleted;
    })
    .sort(sortInspections);

  const SortableTableCell: React.FC<{
    field: SortField;
    children: React.ReactNode;
  }> = ({ field, children }) => (
    <TableCell>
      <TableSortLabel
        active={sortConfig.field === field}
        direction={sortConfig.field === field ? sortConfig.order : 'asc'}
        onClick={() => handleSort(field)}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Scheduled Inspections</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            displayEmpty
          >
            <MenuItem value="all">All Inspections</MenuItem>
            <MenuItem value="complete">Completed</MenuItem>
            <MenuItem value="incomplete">Incomplete</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <SortableTableCell field="customerCompanyName">Customer</SortableTableCell>
              <SortableTableCell field="plantDescription">Plant</SortableTableCell>
              <SortableTableCell field="serialNumber">Serial Number</SortableTableCell>
              <SortableTableCell field="inspectorName">Inspector</SortableTableCell>
              <SortableTableCell field="scheduledDate">Scheduled Date</SortableTableCell>
              <SortableTableCell field="isCompleted">Status</SortableTableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : filteredInspections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No scheduled inspections found</TableCell>
              </TableRow>
            ) : (
              filteredInspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell>{inspection.customerCompanyName}</TableCell>
                  <TableCell>{inspection.plantDescription}</TableCell>
                  <TableCell>{inspection.serialNumber}</TableCell>
                  <TableCell>{inspection.inspectorName}</TableCell>
                  <TableCell>{formatDate(inspection.scheduledDate)}</TableCell>
                  <TableCell>{inspection.isCompleted ? 'Completed' : 'Incomplete'}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(inspection)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(inspection)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ScheduleEditDialog
        open={isEditDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveEdit}
        inspection={selectedInspection}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ScheduledList;
