import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';
import InspectionCertificateTemplate from './InspectionCertificateTemplate';
import inspectionService from '../services/inspectionService';
import { InspectionItem } from '../types/inspectionTypes';

interface RouteParams {
    id: string;
}

interface PDFViewerStyles extends React.CSSProperties {
    position: 'fixed';
    top: 0;
    left: 0;
    width: '100%';
    height: '100%';
    border: 'none';
}

const CertificatePage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [inspection, setInspection] = useState<InspectionItem | null>(null);
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
                // Set page title to help identify the window
                document.title = `Certificate - ${data.inspectorName || 'Inspection'}`;
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

    const pdfViewerStyles: PDFViewerStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none'
    };

    return (
        <PDFViewer style={pdfViewerStyles}>
            <InspectionCertificateTemplate inspection={inspection} />
        </PDFViewer>
    );
};

export default CertificatePage;
