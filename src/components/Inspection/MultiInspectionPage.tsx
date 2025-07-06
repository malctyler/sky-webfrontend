import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import MultiInspectionForm from './MultiInspectionForm';
import MultiInspectionService from '../../services/multiInspectionService';
import { CreateMultiInspection } from '../../types/inspectionTypes';
import apiClient from '../../services/apiClient';
import './MultiInspectionForm.css';

interface Customer {
    custID: number;
    companyName: string;
    contactFirstNames: string;
    contactSurname: string;
}

const MultiInspectionPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await apiClient.get('/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleCustomerSelect = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsFormVisible(true);
        setMessage(null);
    };

    const handleSubmitMultiInspection = async (inspection: CreateMultiInspection) => {
        if (!selectedCustomer) return;
        
        setIsSubmitting(true);
        setMessage(null);

        try {
            const createdInspections = await MultiInspectionService.createMultiInspection(inspection);
            
            setMessage({
                type: 'success',
                text: `Successfully created ${createdInspections.length} inspections for ${selectedCustomer.companyName}`
            });
            
            setIsFormVisible(false);
            setSelectedCustomer(null);
            
        } catch (error) {
            console.error('Failed to create multi-inspection:', error);
            setMessage({
                type: 'error',
                text: `Failed to create multi-inspection: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setSelectedCustomer(null);
        setMessage(null);
    };

    return (
        <div className="multi-inspection-page">
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {!isFormVisible ? (
                <div className="customer-selection">
                    <h1>Multi-Inspection Setup</h1>
                    <p>Select a customer to create multi-inspections for multiple plant items:</p>
                    
                    <Box sx={{ maxWidth: 500, margin: '20px auto' }}>
                        <Autocomplete
                            options={customers}
                            getOptionLabel={(customer) => customer.companyName}
                            renderOption={(props, customer) => (
                                <Box component="li" {...props}>
                                    <div>
                                        <strong>{customer.companyName}</strong>
                                        <br />
                                        <small style={{ color: '#666' }}>
                                            {customer.contactFirstNames} {customer.contactSurname}
                                        </small>
                                    </div>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search and select customer"
                                    placeholder="Type company name..."
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                            onChange={(_, customer) => {
                                if (customer) {
                                    handleCustomerSelect(customer);
                                }
                            }}
                            filterOptions={(options, { inputValue }) => 
                                options.filter(customer =>
                                    customer.companyName.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    `${customer.contactFirstNames} ${customer.contactSurname}`.toLowerCase().includes(inputValue.toLowerCase())
                                )
                            }
                            noOptionsText="No customers found"
                            clearOnBlur={false}
                            clearOnEscape
                        />
                    </Box>
                </div>
            ) : (
                <div className="multi-inspection-form-container">
                    <h1>Multi-Inspection for {selectedCustomer?.companyName}</h1>
                    
                    <div className="instructions">
                        <h3>How to use Multi-Inspection:</h3>
                        <ol>
                            <li>Select one or more plant categories (e.g., Chains, Shackles, Slings)</li>
                            <li>Review the list of plant items for this customer</li>
                            <li>Set a common location for all items in this inspection</li>
                            <li>For each item, edit defects if needed and check "Include" to add to inspection</li>
                            <li>Click "Create Multi-Inspection" to generate individual inspection records</li>
                        </ol>
                    </div>

                    <MultiInspectionForm
                        customerId={selectedCustomer?.custID || 0}
                        onSubmit={handleSubmitMultiInspection}
                        onCancel={handleCancel}
                    />
                </div>
            )}
        </div>
    );
};

export default MultiInspectionPage;
