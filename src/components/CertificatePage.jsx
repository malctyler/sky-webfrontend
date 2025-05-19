import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';
import InspectionCertificateTemplate from './InspectionCertificateTemplate';
import inspectionService from '../services/inspectionService';

const CertificatePage = () => {
    const { id } = useParams();
    const [inspection, setInspection] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadInspection = async () => {
            try {
                const data = await inspectionService.getById(id);
                setInspection(data);
                // Set page title to help identify the window
                document.title = `Certificate - ${data.companyName || 'Inspection'}`;
            } catch (err) {
                console.error('Error loading inspection:', err);
                setError('Failed to load inspection');
            }
        };

        loadInspection();
    }, [id]);

    // Show errors and loading states without any app chrome
    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
    }

    if (!inspection) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }

    return (
        <PDFViewer style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}>
            <InspectionCertificateTemplate inspection={inspection} />
        </PDFViewer>
    );
};

export default CertificatePage;