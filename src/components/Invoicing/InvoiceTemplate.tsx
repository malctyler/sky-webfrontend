import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { CustomerInvoiceDto } from '../../types/invoiceTypes';

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
        paddingBottom: 2,
        marginBottom: 20
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
    companyInfo: {
        fontSize: 9,
        marginTop: 10
    },
    customerDetails: {
        marginTop: 20,
        marginBottom: 20
    },
    invoiceHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    table: {
        width: '100%',
        marginTop: 15,
        marginBottom: 20
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        borderTop: '1 solid black',
        borderBottom: '1 solid black',
        fontWeight: 'bold'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1 solid #ddd',
        minHeight: 24,
        padding: '4 0'
    },
    dateCol: {
        width: '15%',
        padding: '4 8'
    },
    serialCol: {
        width: '20%',
        padding: '4 8'
    },
    descriptionCol: {
        width: '45%',
        padding: '4 8'
    },
    amountCol: {
        width: '20%',
        padding: '4 8',
        textAlign: 'right'
    },
    totalsSection: {
        marginTop: 20,
        alignSelf: 'flex-end',
        width: '200px'
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    bold: {
        fontWeight: 'bold'
    }
});

interface InvoiceTemplateProps {
    invoice: CustomerInvoiceDto;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ invoice }) => {
    const formatDate = (date: Date | string): string => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const formatCurrency = (amount: number): string => {
        return `£${amount.toFixed(2)}`;
    };

    const subtotal = invoice.totalAmount;
    const vat = subtotal * 0.2; // 20% VAT
    const total = subtotal + vat;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.skyText}>SKY</Text>
                    <Text style={styles.technicalServicesText}>Technical Services Ltd</Text>
                </View>

                {/* Company Details */}
                <View style={styles.companyInfo}>
                    <Text>Sky Technical Services Ltd</Text>
                    <Text>4 Victoria Cottages</Text>
                    <Text>Love Lane, Mayfield, E.Sussex. TN20 6EN</Text>
                    <Text>Tel: 01435 873355 / 07703 292932</Text>
                    <Text>Email: info@skytechnical.co.uk</Text>
                </View>

                {/* Customer Details */}
                <View style={styles.customerDetails}>
                    <Text style={styles.bold}>{invoice.customerName}</Text>
                    {invoice.address && <Text>{invoice.address}</Text>}
                    {invoice.city && <Text>{invoice.city}</Text>}
                    {invoice.postCode && <Text>{invoice.postCode}</Text>}
                </View>

                {/* Invoice Header */}
                <View>
                    <Text style={styles.invoiceHeader}>INVOICE</Text>
                    <Text>Date: {formatDate(new Date())}</Text>
                    <Text>Period: {formatDate(invoice.startDate)} - {formatDate(invoice.endDate)}</Text>
                </View>

                {/* Table Header */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.dateCol}>Date</Text>
                        <Text style={styles.serialCol}>Serial Number</Text>
                        <Text style={styles.descriptionCol}>Description</Text>
                        <Text style={styles.amountCol}>Amount</Text>
                    </View>

                    {/* Table Rows */}
                    {invoice.lineItems.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.dateCol}>{formatDate(item.inspectionDate)}</Text>
                            <Text style={styles.serialCol}>{item.serialNumber}</Text>
                            <Text style={styles.descriptionCol}>{item.plantDescription}</Text>
                            <Text style={styles.amountCol}>{formatCurrency(item.inspectionFee)}</Text>
                        </View>
                    ))}
                </View>

                {/* Totals Section */}
                <View style={styles.totalsSection}>
                    <View style={styles.totalRow}>
                        <Text>Subtotal:</Text>
                        <Text>{formatCurrency(subtotal)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text>VAT (20%):</Text>
                        <Text>{formatCurrency(vat)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.bold}>Total:</Text>
                        <Text style={styles.bold}>{formatCurrency(total)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export const generateInvoicePdf = async (invoice: CustomerInvoiceDto): Promise<Blob> => {
    try {
        const doc = <InvoiceTemplate invoice={invoice} />;
        const blob = await pdf(doc).toBlob();
        return blob;
    } catch (error) {
        console.error('Error generating invoice PDF:', error);
        throw error;
    }
};

export default InvoiceTemplate;
