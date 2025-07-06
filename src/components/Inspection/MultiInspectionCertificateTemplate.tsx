import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { MultiInspectionCertificate } from '../../types/inspectionTypes';
import apiClient from '../../services/apiClient';

Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4TYFv.ttf' },
        { 
            src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4QYFv.ttf',
            fontWeight: 'bold' 
        }
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 9,
        width: '210mm',
        height: '297mm',
        backgroundColor: 'white'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'flex-start',
        borderBottom: '1 solid black',
        paddingBottom: 2
    },
    skyText: {
        fontSize: 45,
        fontWeight: 'bold',
        lineHeight: 1
    },
    technicalServicesText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        lineHeight: 1
    },
    recordBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 10
    },
    recordBox: {
        border: '1 solid black',
        padding: '5 10',
        alignSelf: 'flex-start'
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 2
    },
    mainTitle: {
        fontWeight: 'bold',
        fontSize: 11,
        textAlign: 'center',
        marginBottom: 2
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center'
    },
    table: {
        marginVertical: 20
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderTop: '1 solid black',
        borderLeft: '1 solid black',
        borderRight: '1 solid black'
    },
    tableHeaderCell: {
        padding: 6,
        fontSize: 8,
        fontWeight: 'bold',
        borderRight: '1 solid black',
        textAlign: 'center'
    },
    tableRow: {
        flexDirection: 'row',
        borderLeft: '1 solid black',
        borderRight: '1 solid black',
        borderBottom: '1 solid black'
    },
    tableCell: {
        padding: 6,
        fontSize: 8,
        borderRight: '1 solid black',
        textAlign: 'left'
    },
    col1: { width: '25%' }, // Plant Description
    col2: { width: '20%' }, // Serial Number
    col3: { width: '15%' }, // Location
    col4: { width: '15%' }, // Safe Working Load
    col5: { width: '25%' }, // Defects
    bold: {
        fontWeight: 'bold'
    },
    declaration: {
        marginTop: 10,
        marginBottom: 10
    },
    footer: {
        marginTop: 10
    },
    addressText: {
        marginTop: 2
    },
    addressTextIndent: {
        marginTop: 2,
        marginLeft: 20
    },
    dateRecord: {
        marginTop: 10,
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    inspectorDetails: {
        marginTop: 5,
        marginBottom: 5
    },
    signature: {
        marginTop: 5,
        marginBottom: 5,
        width: 150,
        height: 60,
        alignSelf: 'flex-start'
    },
    mailto: {
        color: 'blue',
        textDecoration: 'underline'
    }
});

interface Props {
    data: MultiInspectionCertificate;
    preloadedSignaturePath?: string;
}

const MultiInspectionCertificateTemplate: React.FC<Props> = ({ data, preloadedSignaturePath }) => {
    const currentDate = new Date();
    const recordNumber = `${format(currentDate, 'yyyy/M')}/MULTI/${Math.floor(Math.random() * 1000)}`;
    const [signaturePath, setSignaturePath] = React.useState<string | undefined>(preloadedSignaturePath);

    React.useEffect(() => {
        const loadSignature = async () => {
            const inspectorName = data.inspectorName?.trim();
            if (!inspectorName) {
                console.warn('No inspector name provided for signature');
                return;
            }
            
            if (signaturePath && !preloadedSignaturePath) {
                return;
            }
            
            const formattedName = inspectorName.toLowerCase().replace(/\s+/g, '_');
            
            try {
                const response = await apiClient.get(`/Signature/${encodeURIComponent(formattedName)}`, {
                    responseType: 'blob'
                });
                
                if (response.status === 200) {
                    if (signaturePath && signaturePath.startsWith('blob:')) {
                        URL.revokeObjectURL(signaturePath);
                    }
                    
                    const blob = response.data;
                    const imageUrl = URL.createObjectURL(blob);
                    setSignaturePath(imageUrl);
                } else {
                    console.warn('Signature image not found for inspector:', inspectorName);
                }
            } catch (error: any) {
                if (error.response?.status === 401) {
                    console.error('Authentication required for signature access:', error);
                } else if (error.response?.status === 404) {
                    console.warn('Signature image not found for inspector:', inspectorName);
                } else {
                    console.error('Error loading signature:', error);
                }
            }
        };
        
        if (!preloadedSignaturePath) {
            loadSignature();
        }

        return () => {
            if (signaturePath && signaturePath.startsWith('blob:')) {
                URL.revokeObjectURL(signaturePath);
            }
        };
    }, [data.inspectorName, preloadedSignaturePath]);

    const formatDate = (date: string | undefined | null): string => {
        if (!date) return 'N/A';
        try {
            return format(new Date(date), 'dd MMM yyyy');
        } catch {
            return 'Invalid Date';
        }
    };

    const renderText = (text: string | undefined | null): string => {
        if (!text) return '\u00A0';
        return text.trim() || '\u00A0';
    };

    return (
        <Document
            creator="Sky Technical Services"
            producer="Sky Technical Services"
            title={`Multi-Inspection Certificate - ${data.companyName || ''}`}
        >
            <Page size="A4" style={styles.page}>
                <View>
                    {/* Header - exactly like normal certificate */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.skyText}>SKY</Text>
                        <Text style={styles.technicalServicesText}>Technical Services</Text>
                    </View>

                    {/* Record Number - exactly like normal certificate */}
                    <View style={styles.recordBoxContainer}>
                        <View style={styles.recordBox}>
                            <Text>Record No: {recordNumber}</Text>
                        </View>
                    </View>

                    {/* Title - exactly like normal certificate */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.mainTitle}>
                            RECORD OF THOROUGH EXAMINATION OF LIFTING PLANT AND EQUIPMENT
                        </Text>
                        <Text style={styles.subTitle}>
                            IN ACCORDANCE WITH THE LIFTING OPERATIONS AND LIFTING EQUIPMENT REGULATIONS 1998 (LOLER)
                        </Text>
                    </View>

                    {/* Multi-Equipment Table */}
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderCell, styles.col1]}>
                                Plant Description
                            </Text>
                            <Text style={[styles.tableHeaderCell, styles.col2]}>
                                Serial Number
                            </Text>
                            <Text style={[styles.tableHeaderCell, styles.col3]}>
                                Location
                            </Text>
                            <Text style={[styles.tableHeaderCell, styles.col4]}>
                                Safe Working Load
                            </Text>
                            <Text style={[styles.tableHeaderCell, styles.col5, { borderRight: 'none' }]}>
                                Defects
                            </Text>
                        </View>

                        {/* Table Rows */}
                        {data.items.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.col1]}>
                                    {item.plantDescription || '\u00A0'}
                                </Text>
                                <Text style={[styles.tableCell, styles.col2]}>
                                    {item.serialNumber || '\u00A0'}
                                </Text>
                                <Text style={[styles.tableCell, styles.col3]}>
                                    {item.location || data.location || '\u00A0'}
                                </Text>
                                <Text style={[styles.tableCell, styles.col4]}>
                                    {item.safeWorking || '\u00A0'}
                                </Text>
                                <Text style={[styles.tableCell, styles.col5, { borderRight: 'none' }]}>
                                    {item.defects || 'NONE'}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Declaration - exactly like normal certificate */}
                    <View style={styles.declaration}>
                        <Text style={styles.bold}>Declaration</Text>
                        <Text>
                            I hereby declare that the equipment described in this record was thoroughly examined in accordance with the appropriate provisions and found free from any defect likely to affect safety other than those listed above on{' '}
                            <Text style={styles.bold}>{formatDate(data.inspectionDate)}</Text> and that the above particulars are correct.
                        </Text>
                    </View>

                    <View style={styles.declaration}>
                        <Text style={styles.bold}>Signature or other identification</Text>
                    </View>

                    {/* Inspector Details - exactly like normal certificate */}
                    <View style={styles.inspectorDetails}>
                        {signaturePath && (
                            <Image src={signaturePath} style={styles.signature} />
                        )}
                        <Text>Engineering Surveyor: {renderText(data.inspectorName)}</Text>
                    </View>

                    {/* Footer Address - exactly like normal certificate */}
                    <Text style={[styles.bold, styles.addressText]}>
                        Name and address of person authenticating the record and responsible for the thorough examination.
                    </Text>

                    <View style={styles.addressTextIndent}>
                        <Text>Sky Technical Services Ltd</Text>
                        <Text>4 Victoria Cottages</Text>
                        <Text>Love Lane, Mayfield, E.Sussex. TN20 6EN</Text>
                        <Text>Tel: 01435 873355 / 07703 292932</Text>
                        <Text>Email: info@skytechnical.co.uk</Text>
                    </View>

                    {/* Date Record - exactly like normal certificate */}
                    <View style={styles.dateRecord}>
                        <Text style={styles.bold}>Date the record is made: {formatDate(data.inspectionDate)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export const loadSignatureUrl = async (inspectorName: string | undefined): Promise<string | undefined> => {
    if (!inspectorName?.trim()) {
        console.warn('No inspector name provided for signature');
        return undefined;
    }
    
    const formattedName = inspectorName.trim().toLowerCase().replace(/\s+/g, '_');
    
    try {
        const response = await apiClient.get(`/Signature/${encodeURIComponent(formattedName)}`, {
            responseType: 'blob'
        });
        
        if (response.status === 200) {
            const blob = response.data;
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
        } else {
            console.warn('Signature image not found for inspector:', inspectorName);
            return undefined;
        }
    } catch (error: any) {
        if (error.response?.status === 401) {
            console.error('Authentication required for signature access:', error);
        } else if (error.response?.status === 404) {
            console.warn('Signature image not found for inspector:', inspectorName);
        } else {
            console.error('Error loading signature:', error);
        }
        return undefined;
    }
};

export const generateMultiInspectionPdfBlob = async (data: MultiInspectionCertificate): Promise<Blob> => {
    try {
        const { pdf } = await import('@react-pdf/renderer');
        
        // First load the signature
        const signaturePath = await loadSignatureUrl(data.inspectorName);
        
        // Create the document with the preloaded signature path
        const doc = <MultiInspectionCertificateTemplate data={data} preloadedSignaturePath={signaturePath} />;
        
        // Create PDF
        const blob = await pdf(doc).toBlob();
        return blob;
    } catch (error) {
        console.error('Error generating multi-inspection PDF:', error);
        throw error;
    }
};

export const getMultiInspectionPdfFileName = (data: MultiInspectionCertificate): string => {
    const dateStr = data.inspectionDate ? format(new Date(data.inspectionDate), 'dd-MM-yyyy') : '';
    const safeName = (str: string | undefined): string => str?.replace(/[^a-z0-9-]/gi, '-').toLowerCase() || '';
    
    return `${safeName(data.companyName)}-multi-inspection-${dateStr}.pdf`;
};

export default MultiInspectionCertificateTemplate;
