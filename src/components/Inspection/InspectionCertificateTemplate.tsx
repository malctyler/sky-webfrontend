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
}

const InspectionCertificateTemplate: React.FC<InspectionCertificateTemplateProps> = ({ inspection }) => {    
    const currentDate = new Date();
    const recordNumber = `${format(currentDate, 'yyyy/M')}/${inspection.custID || 0}/${inspection.uniqueRef}`;    
    const [signaturePath, setSignaturePath] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        const loadSignature = async () => {
            const inspectorName = inspection.inspectorsName?.trim();
            if (!inspectorName) {
                console.warn('No inspector name provided for signature');
                return;
            }
            // Convert spaces to underscores and lowercase to match backend convention
            const formattedName = inspectorName.toLowerCase().replace(/\s+/g, '_');
            const path = `${baseUrl}/Signature/${encodeURIComponent(formattedName)}`;
            
            try {
                // Test if the image exists
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
        
        loadSignature();
    }, [inspection.inspectorsName]);

    const formatDate = (date: string | undefined | null): string => {
        if (!date) return 'N/A';
        try {
            return format(new Date(date), 'dd MMM yyyy');
        } catch {
            return 'Invalid Date';
        }
    };    const renderText = (text: string | undefined | null): string => {
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
    };    return (
        <Document
            creator="Sky Technical Services"
            producer="Sky Technical Services"
            title={`Inspection Certificate - ${inspection.companyName || ''}`}
        >
            <Page 
                size="A4" 
                style={styles.page}
                orientation="portrait">
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
                    </View>                    <View style={styles.table}>
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
                            <View style={styles.rightColumn}>                                <Text>{inspection.plantDescription || '\u00A0'}</Text>
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
                            </View>                            <View style={styles.rightColumn}>
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
                            <View style={styles.rightColumn}>                                <Text style={styles.bold}>{inspection.previousCheck || '\u00A0'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Safe working load or loads and (where relevant) corresponding radii</Text>
                            </View>                            <View style={styles.rightColumn}>
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
                                <Text>{inspection.rectified || '\u00A0'}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>What parts if any were inaccessible?{'\n'}(TO BE COMPLETED ONLY AFTER A THOROUGH EXAMINATION OF A HOIST OR LIFT)</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>Enclosed Parts of Hydraulic System</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.bold}>Latest date by which the next thorough examination must be carried out</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text style={styles.bold}>{inspection.recentCheck || ''}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Examined at</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text>{inspection.location || ''}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text>Other notes</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text style={styles.bold}>Always ensure that the correct operators instructions are with the machine and that the correct SWL is clearly visible. Where a quickhitch is fitted ensure that the operator understands the procedures and is competent to operate the hitch safely. For full SWL specifications always refer to manufacturers lifting/radii tables.</Text>
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
                    </View>                    <View style={styles.inspectorDetails}>
                        {signaturePath && (
                            <Image
                                src={signaturePath}
                                style={styles.signature}
                            />
                        )}
                        <Text>Engineering Surveyor:{' '}
                            <Text style={styles.bold}>{renderText(inspection.inspectorsName)}</Text>
                        </Text>
                    </View>

                    <Text style={[styles.bold, styles.addressText]}>
                        Name and address of person authenticating the record and responsible for the thorough examination.
                    </Text>

                    <Text style={styles.addressTextIndent}>
                        Sky Technical Services Ltd{'\n'}
                        4 Victoria Cottages{'\n'}
                        Love Lane, Mayfield, E.Sussex. TN20 6EN.        Tel 01435 873355 / 07703 292932.       Email{' '}
                        <Text style={styles.mailto}>info@skytechnical.co.uk</Text>
                    </Text>

                    <Text style={styles.dateRecord}>
                        Date the record is made{' '}
                        <Text style={styles.bold}>
                            {formatDate(inspection.inspectionDate)}
                        </Text>
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export const generatePdfBlob = async (inspection: InspectionCertificate): Promise<Blob> => {
    const doc = <InspectionCertificateTemplate inspection={inspection} />;
    const blob = await pdf(doc).toBlob();
    return blob;
};

export const getPdfFileName = (inspection: InspectionCertificate): string => {
    const dateStr = inspection.inspectionDate ? format(new Date(inspection.inspectionDate), 'dd-MM-yyyy') : '';
    const safeName = (str: string | undefined): string => str?.replace(/[^a-z0-9-]/gi, '-').toLowerCase() || '';
    
    return `${safeName(inspection.companyName)}-${safeName(inspection.plantDescription)}-${safeName(inspection.serialNumber)}-${dateStr}.pdf`;
};

export default InspectionCertificateTemplate;
