import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, pdf } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { baseUrl } from '../../config';
import { InspectionCertificate } from '../../types/inspectionTypes';

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
        width: '100%',
        marginTop: 15,
        border: '1 solid black',
        borderBottom: 'none'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1 solid black',
        minHeight: 20
    },
    headerRow: {
        backgroundColor: '#f0f0f0'
    },
    leftColumn: {
        width: '40%',
        paddingRight: 5,
        padding: 5,
        borderRight: '1 solid black'
    },
    rightColumn: {
        width: '60%',
        paddingLeft: 5,
        padding: 5
    },
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

interface InspectionCertificateTemplateProps {
    inspection: InspectionCertificate;
    preloadedSignaturePath?: string;
}

const InspectionCertificateTemplate: React.FC<InspectionCertificateTemplateProps> = ({ inspection, preloadedSignaturePath }) => {    
    const currentDate = new Date();
    const recordNumber = `${format(currentDate, 'yyyy/M')}/${inspection.custID || 0}/${inspection.uniqueRef}`;    
    const [signaturePath, setSignaturePath] = React.useState<string | undefined>(preloadedSignaturePath);

    React.useEffect(() => {
        const loadSignature = async () => {
            const inspectorName = inspection.inspectorsName?.trim();
            if (!inspectorName) {
                console.warn('No inspector name provided for signature');
                return;
            }
            const formattedName = inspectorName.toLowerCase().replace(/\s+/g, '_');
            const path = `${baseUrl}/Signature/${encodeURIComponent(formattedName)}`;
            
            try {
                const response = await fetch(path);
                if (response.ok) {
                    setSignaturePath(path);
                } else {
                    console.warn('Signature image not found:', path);
                }
            } catch (error) {
                console.error('Error loading signature:', error);
            }
        };
        
        if (!preloadedSignaturePath) {
            loadSignature();
        }
    }, [inspection.inspectorsName, preloadedSignaturePath]);

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
    
    const formatAddress = (): string[] => {
        return [
            inspection.companyName,
            inspection.line1,
            inspection.line2,
            inspection.line3,
            inspection.line4,
            inspection.postcode
        ].filter((line): line is string => Boolean(line)) || ['\u00A0'];
    };

    return (
        <Document
            creator="Sky Technical Services"
            producer="Sky Technical Services"
            title={`Inspection Certificate - ${inspection.companyName || ''}`}
        >
            <Page size="A4" style={styles.page}>
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.skyText}>SKY</Text>
                        <Text style={styles.technicalServicesText}>Technical Services</Text>
                    </View>

                    <View style={styles.recordBoxContainer}>
                        <View style={styles.recordBox}>
                            <Text>Record No: {recordNumber}</Text>
                        </View>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.mainTitle}>
                            RECORD OF THOROUGH EXAMINATION OF LIFTING PLANT AND EQUIPMENT
                        </Text>
                        <Text style={styles.subTitle}>
                            IN ACCORDANCE WITH THE LIFTING OPERATIONS AND LIFTING EQUIPMENT REGULATIONS 1998 (LOLER)
                        </Text>
                    </View>

                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.headerRow]}>
                            <View style={styles.leftColumn}>
                                <Text>{'\u00A0'}</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{renderText(inspection.categoryDescription)}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Description of equipment</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{inspection.plantDescription || '\u00A0'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Identification mark of equipment</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{inspection.serialNumber || '\u00A0'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Identification mark of Quick Hitch</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{'\u00A0'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Name and address of owner of equipment</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                {formatAddress().map((line, index) => (
                                    <Text key={index}>{line}</Text>
                                ))}
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.bold}>Date of the last thorough examination and identification of the record issued on that occasion</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text style={styles.bold}>{inspection.previousCheck || '\u00A0'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Safe working load or loads and (where relevant) corresponding radii</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{inspection.safeWorking || '\u00A0'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Details of any defects found (if none state NONE)</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{inspection.defects || 'NONE'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Date(s) by which defects described above must be rectified</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{inspection.rectifyDate || '\u00A0'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Latest date by which the next thorough examination must be carried out</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{formatDate(inspection.latestDate)}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Name and address of inspection company</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>Sky Technical Services Ltd</Text>
                                <Text>4 Victoria Cottages</Text>
                                <Text>Love Lane</Text>
                                <Text>Mayfield</Text>
                                <Text>E.Sussex</Text>
                                <Text>TN20 6EN</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.declaration}>
                        <Text style={styles.bold}>Declaration</Text>
                        <Text>
                            I hereby declare that the equipment described in this record was thoroughly examined in accordance with the appropriate provisions and found free from any defect likely to affect safety other than those listed above on{' '}
                            <Text style={styles.bold}>{formatDate(inspection.inspectionDate)}</Text> and that the above particulars are correct.
                        </Text>
                    </View>

                    <View style={styles.declaration}>
                        <Text style={styles.bold}>Signature or other identification</Text>
                    </View>

                    <View style={styles.inspectorDetails}>
                        {signaturePath && (
                            <Image src={signaturePath} style={styles.signature} />
                        )}
                        <Text>Engineering Surveyor: {renderText(inspection.inspectorsName)}</Text>
                    </View>

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

                    <View style={styles.dateRecord}>
                        <Text style={styles.bold}>Date the record is made: {formatDate(inspection.inspectionDate)}</Text>
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
    const path = `${baseUrl}/Signature/${encodeURIComponent(formattedName)}`;
    
    try {
        const response = await fetch(path);
        if (response.ok) {
            return path;
        } else {
            console.warn('Signature image not found:', path);
            return undefined;
        }
    } catch (error) {
        console.error('Error loading signature:', error);
        return undefined;
    }
};

export const generatePdfBlob = async (inspection: InspectionCertificate): Promise<Blob> => {
    try {
        // First load the signature
        const signaturePath = await loadSignatureUrl(inspection.inspectorsName);
        
        // Create the document with the preloaded signature path
        const doc = <InspectionCertificateTemplate inspection={inspection} preloadedSignaturePath={signaturePath} />;
        
        // Create PDF
        const blob = await pdf(doc).toBlob();
        return blob;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

export const getPdfFileName = (inspection: InspectionCertificate): string => {
    const dateStr = inspection.inspectionDate ? format(new Date(inspection.inspectionDate), 'dd-MM-yyyy') : '';
    const safeName = (str: string | undefined): string => str?.replace(/[^a-z0-9-]/gi, '-').toLowerCase() || '';
    
    return `${safeName(inspection.companyName)}-${safeName(inspection.plantDescription)}-${safeName(inspection.serialNumber)}-${dateStr}.pdf`;
};

export default InspectionCertificateTemplate;
