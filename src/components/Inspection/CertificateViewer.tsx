import React from 'react';
import { InspectionCertificate } from '../../types/inspectionTypes';
import InspectionCertificateTemplate from './InspectionCertificateTemplate';

interface CertificateViewerProps {
    inspection: InspectionCertificate;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ inspection }) => {    
    return (
        <InspectionCertificateTemplate inspection={inspection} />
    );
}

export default CertificateViewer;
