import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import InspectionCertificateTemplate from './InspectionCertificateTemplate';
import { InspectionItem } from '../types/inspectionTypes';

interface CertificateViewerProps {
    inspection: InspectionItem;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ inspection }) => {    const viewerStyle = {
        width: '100%',
        height: '80vh',
        border: 'none'
    } as const;

    return (
        <PDFViewer style={viewerStyle}>
            <InspectionCertificateTemplate inspection={inspection} />
        </PDFViewer>
    );
};

export default CertificateViewer;
