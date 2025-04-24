import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import InspectionCertificateTemplate from './InspectionCertificateTemplate';

const CertificateViewer = ({ inspection }) => {
    return (
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
            <InspectionCertificateTemplate inspection={inspection} />
        </PDFViewer>
    );
};

export default CertificateViewer;