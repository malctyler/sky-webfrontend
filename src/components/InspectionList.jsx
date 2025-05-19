import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert
} from '@mui/material';
import { Delete as DeleteIcon, Assignment as CertificateIcon, Email as EmailIcon, Edit as EditIcon } from '@mui/icons-material';
import { baseUrl } from '../config';
import inspectionService from '../services/inspectionService';
import InspectionForm from './InspectionForm';
import { format } from 'date-fns';
import './InspectionList.css';  // Import the CSS file

const InspectionList = ({ holdingId }) => {
    const { isDarkMode } = useTheme();
    const [inspections, setInspections] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [error, setError] = useState(null);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [emailingInspection, setEmailingInspection] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [inspectionToDelete, setInspectionToDelete] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const loadInspections = useCallback(async () => {
        try {
            const data = await inspectionService.getByPlantHolding(holdingId);
            setInspections(data);
            setError(null);
        } catch (error) {
            console.error('Error loading inspections:', error);
            setError('Failed to load inspections');
        }
    }, [holdingId]);

    useEffect(() => {
        if (holdingId) {
            loadInspections();
        }
    }, [holdingId, loadInspections]);

    const handleAdd = () => {
        setSelectedInspection(null);
        setShowForm(true);
        setError(null);
    };

    const handleEdit = (inspection) => {
        setSelectedInspection(inspection);
        setShowForm(true);
        setError(null);
    };

    const openDeleteDialog = (inspection) => {
        setInspectionToDelete(inspection);
        setDeleteDialogOpen(true);
    };

    const handleDeleteInspection = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/Inspection/${inspectionToDelete.uniqueRef}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete inspection');
            }

            setInspections(prevInspections => 
                prevInspections.filter(insp => insp.uniqueRef !== inspectionToDelete.uniqueRef)
            );
            
            setDeleteDialogOpen(false);
            setInspectionToDelete(null);
            setSnackbar({
                open: true,
                message: 'Inspection deleted successfully',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error deleting inspection:', error);
            setSnackbar({
                open: true,
                message: `Error deleting inspection: ${error.message}`,
                severity: 'error'
            });
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const submissionData = {
                ...formData,
                holdingID: holdingId
            };
            
            if (selectedInspection) {
                await inspectionService.update(selectedInspection.uniqueRef, submissionData);
            } else {
                await inspectionService.create(submissionData);
            }
            setShowForm(false);
            await loadInspections();
            setError(null);
        } catch (error) {
            console.error('Error saving inspection:', error);
            setError('Failed to save inspection');
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const handleShowCertificate = (inspection) => {
        // Open in a new window, using 'popup' to ensure it opens as a separate window
        window.open(`/certificate/${inspection.uniqueRef}`, 'certificate', 'popup,width=800,height=600');
    };

    const handleEmailClick = (inspection) => {
        setEmailingInspection(inspection);
        setEmailDialogOpen(true);
    };

    const handleEmailConfirm = async () => {
        try {
            await inspectionService.emailCertificate(emailingInspection.uniqueRef);
            setEmailDialogOpen(false);
            setEmailingInspection(null);
            setError(null);
            setSnackbar({
                open: true,
                message: 'Certificate sent successfully',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error emailing certificate:', error);
            setError('Failed to email certificate');
            setEmailDialogOpen(false);
        }
    };

    const handleEmailCancel = () => {
        setEmailDialogOpen(false);
        setEmailingInspection(null);
    };

    return (
        <div className={`inspections-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Inspections</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                >
                    Add Inspection
                </Button>
            </div>

            {error && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="25%">Inspection Date</TableCell>
                            <TableCell width="40%">Location</TableCell>
                            <TableCell width="25%">Latest Date</TableCell>
                            <TableCell width="10%" align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inspections.map((inspection) => (
                            <TableRow key={inspection.uniqueRef} hover>
                                <TableCell>{formatDate(inspection.inspectionDate)}</TableCell>
                                <TableCell>{inspection.location}</TableCell>
                                <TableCell>{formatDate(inspection.latestDate)}</TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center space-x-2">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEdit(inspection)}
                                            color="primary"
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => openDeleteDialog(inspection)}
                                            color="error"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleShowCertificate(inspection)}
                                            color="secondary"
                                        >
                                            <CertificateIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEmailClick(inspection)}
                                            color="info"
                                        >
                                            <EmailIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {inspections.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No inspections found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Email confirmation dialog */}
            <Dialog
                open={emailDialogOpen}
                onClose={handleEmailCancel}
            >
                <DialogTitle>Send Certificate</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will send the certificate to the customer. Are you sure you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEmailCancel}>Cancel</Button>
                    <Button onClick={handleEmailConfirm} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success message */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {showForm && (
                <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"></div>
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-4">
                                {selectedInspection ? 'Edit Inspection' : 'New Inspection'}
                            </h3>
                            <InspectionForm
                                inspection={selectedInspection}
                                onSubmit={handleSubmit}
                                onCancel={() => setShowForm(false)}
                                holdingId={holdingId}
                            />
                        </div>
                    </div>
                </div>
            )}

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Confirm Inspection Deletion
                </DialogTitle>
                <DialogContent>
                    <div id="delete-dialog-description">
                        <p>Are you sure you want to delete this inspection?</p>
                        {inspectionToDelete && (
                            <>
                                <p><strong>Serial Number:</strong> {inspectionToDelete.serialNumber}</p>
                                <p><strong>Date:</strong> {new Date(inspectionToDelete.inspDate).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {inspectionToDelete.status}</p>
                            </>
                        )}
                        <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
                            This action cannot be undone.
                        </p>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDeleteInspection}
                        color="error"
                        variant="contained"
                    >
                        Delete Inspection
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default InspectionList;