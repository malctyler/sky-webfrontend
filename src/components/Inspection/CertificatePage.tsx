import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlobProvider } from '@react-pdf/renderer';
import InspectionCertificateTemplate from './InspectionCertificateTemplate';
import inspectionService from '../../services/inspectionService';
import { InspectionCertificate } from '../../types/inspectionTypes';
import { Box, CircularProgress, Typography } from '@mui/material';

const CertificatePage: React.FC = () => {
    const params = useParams();
    const id = params.id;
    const [inspection, setInspection] = useState<InspectionCertificate | null>(null);
    const [error, setError] = useState<string | null>(null);    useEffect(() => {
        // Set window size to A4 dimensions (converting mm to pixels at 96 DPI)
        const mmToPx = (mm: number) => Math.round(mm * 3.7795275591);  // 1mm = 3.7795275591 pixels at 96 DPI
        const a4Width = mmToPx(210);
        const a4Height = mmToPx(297);
        
        // Add some padding for browser chrome
        const chromeHeight = 100; // Approximate height of browser UI
        const padding = 40; // 20px padding on each side
        
        window.resizeTo(
            a4Width + padding,
            a4Height + chromeHeight + padding
        );
        
        // Center the window on screen
        const left = (window.screen.width - (a4Width + padding)) / 2;
        const top = (window.screen.height - (a4Height + chromeHeight + padding)) / 2;
        window.moveTo(left, top);
    }, []);

    useEffect(() => {
        const loadInspection = async () => {
            if (!id) {
                setError('No inspection ID provided');
                return;
            }

            try {
                const data = await inspectionService.getById(id);
                setInspection(data);
                document.title = `Certificate - ${data.inspectorName || 'Inspection'}`;
            } catch (err) {
                console.error('Error loading inspection:', err);
                setError('Failed to load inspection');
            }
        };

        loadInspection();
    }, [id]);

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="white">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!inspection) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="white">
                <CircularProgress />
            </Box>
        );
    }    return (
        <BlobProvider document={<InspectionCertificateTemplate inspection={inspection} />}>
            {({ url, loading, error: pdfError }) => {
                if (loading) {
                    return (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="white">
                            <CircularProgress />
                        </Box>
                    );
                }

                if (pdfError) {
                    return (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="white">
                            <Typography color="error">Error generating PDF</Typography>
                        </Box>
                    );
                }

                if (!url) {
                    return (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="white">
                            <Typography color="error">PDF URL not available</Typography>
                        </Box>
                    );
                }                return (
                    <Box sx={{ 
                        width: '100%', 
                        height: '100vh', 
                        bgcolor: '#f0f0f0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        padding: 2,
                        overflow: 'auto'
                    }}>
                        <Box sx={{
                            width: '210mm',
                            minHeight: '297mm',
                            bgcolor: 'white',
                            boxShadow: 3,
                            '& iframe': {
                                width: '210mm',
                                height: '297mm',
                                border: 'none',
                                display: 'block'
                            }
                        }}>
                            <iframe
                                src={url}
                                title="Inspection Certificate"
                            />
                        </Box>
                    </Box>
                );
            }}
        </BlobProvider>
    );
};

export default CertificatePage;
