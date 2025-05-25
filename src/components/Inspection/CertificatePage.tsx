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
    const [error, setError] = useState<string | null>(null);

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
                
                // Set CSS to prevent scrollbars on body
                document.body.style.margin = '0';
                document.body.style.overflow = 'hidden';
            } catch (err) {
                console.error('Error loading inspection:', err);
                setError('Failed to load inspection');
            }
        };

        loadInspection();

        // Cleanup
        return () => {
            document.body.style.margin = '';
            document.body.style.overflow = '';
        };
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
    }

    return (
        <BlobProvider document={<InspectionCertificateTemplate inspection={inspection} />}>
            {({ url, loading, error: pdfError }) => {
                if (loading || !url) {
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

                return (
                    <Box sx={{
                        width: '100vw',
                        height: '100vh',
                        bgcolor: '#f0f0f0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 0,
                        padding: 0,
                        overflow: 'hidden'
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            '& iframe': {
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                display: 'block'
                            }
                        }}>
                            <iframe
                                src={url}
                                title="Inspection Certificate"
                                style={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
                            />
                        </Box>
                    </Box>
                );
            }}
        </BlobProvider>
    );
};

export default CertificatePage;
