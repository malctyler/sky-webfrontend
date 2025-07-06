import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import {
    MultiInspectionItem,
    MultiInspectionRequest,
    CreateMultiInspection
} from '../../types/inspectionTypes';
import { PlantCategory } from '../../types/plantTypes';
import MultiInspectionService from '../../services/multiInspectionService';
import { datePickerConfig, toLocalISOString } from '../../utils/dateUtils';

// Inspector interface
interface Inspector {
    inspectorID: number;
    inspectorsName: string;
}

interface MultiInspectionFormProps {
    customerId: number;
    onSubmit: (inspection: CreateMultiInspection) => void;
    onCancel: () => void;
}

const MultiInspectionForm: React.FC<MultiInspectionFormProps> = ({
    customerId,
    onSubmit,
    onCancel
}) => {
    const [categories, setCategories] = useState<PlantCategory[]>([]);
    const [inspectors, setInspectors] = useState<Inspector[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [items, setItems] = useState<MultiInspectionItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingInspectors, setLoadingInspectors] = useState(false);
    const [inspectionDate, setInspectionDate] = useState<Date | null>(null);
    const [formData, setFormData] = useState({
        inspectorID: 0,
        location: '',
        testDetails: '',
        miscNotes: ''
    });

    // Load available inspectors
    useEffect(() => {
        const loadInspectors = async () => {
            setLoadingInspectors(true);
            try {
                const inspectors = await MultiInspectionService.getInspectors();
                setInspectors(inspectors);
            } catch (error) {
                console.error('Failed to load inspectors:', error);
                setInspectors([]);
            } finally {
                setLoadingInspectors(false);
            }
        };
        loadInspectors();
    }, []);

    // Load available plant categories for the selected customer
    useEffect(() => {
        const loadCategories = async () => {
            if (customerId <= 0) return;
            
            // Clear previous selections when customer changes
            setSelectedCategories([]);
            setItems([]);
            setLoadingCategories(true);
            
            try {
                const categories = await MultiInspectionService.getCategoriesWithHoldingsByCustomer(customerId);
                setCategories(categories);
            } catch (error) {
                console.error('Failed to load categories for customer:', error);
                setCategories([]);
            } finally {
                setLoadingCategories(false);
            }
        };
        loadCategories();
    }, [customerId]);

    // Load items when categories are selected
    const handleCategoryChange = async (categoryIds: number[]) => {
        setSelectedCategories(categoryIds);
        if (categoryIds.length === 0) {
            setItems([]);
            return;
        }

        setLoading(true);
        try {
            const request: MultiInspectionRequest = {
                customerId,
                categoryIds
            };

            const data = await MultiInspectionService.getMultiInspectionItems(request);
            setItems(data.map((item: MultiInspectionItem) => ({
                ...item,
                defects: '',
                included: false
            })));
        } catch (error) {
            console.error('Failed to load items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemChange = (index: number, field: keyof MultiInspectionItem, value: string | boolean) => {
        setItems(prev => prev.map((item, i) => 
            i === index ? { ...item, [field]: value } : item
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const includedItems = items.filter(item => item.included);
        if (includedItems.length === 0) {
            alert('Please select at least one item to inspect');
            return;
        }

        if (!inspectionDate) {
            alert('Please select an inspection date');
            return;
        }

        const multiInspection: CreateMultiInspection = {
            customerId,
            inspectorID: formData.inspectorID,
            inspectionDate: toLocalISOString(inspectionDate),
            location: formData.location,
            // latestDate removed - now optional
            testDetails: formData.testDetails,
            miscNotes: formData.miscNotes,
            items: includedItems.map(item => ({
                holdingID: item.holdingID,
                defects: item.defects,
                recentCheck: '', // These would come from additional form fields
                previousCheck: '',
                safeWorking: '',
                rectified: '',
                included: true
            }))
        };

        onSubmit(multiInspection);
    };

    return (
        <div className="multi-inspection-form">
            <h2>Multi-Inspection Form</h2>
            
            <form onSubmit={handleSubmit}>
                {/* Category Selection */}
                <div className="form-group">
                    <label>Select Plant Categories:</label>
                    {loadingCategories ? (
                        <div>Loading available categories...</div>
                    ) : categories.length === 0 ? (
                        <div>No plant categories with holdings found for this customer.</div>
                    ) : (
                        <div className="category-checkboxes">
                            {categories.map(category => (
                                <label key={category.categoryID} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.categoryID)}
                                        onChange={(e) => {
                                            const newCategories = e.target.checked
                                                ? [...selectedCategories, category.categoryID]
                                                : selectedCategories.filter(id => id !== category.categoryID);
                                            handleCategoryChange(newCategories);
                                        }}
                                    />
                                    {category.categoryDescription}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Form Fields */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="inspectorID">Inspector:</label>
                        {loadingInspectors ? (
                            <div>Loading inspectors...</div>
                        ) : (
                            <select
                                id="inspectorID"
                                value={formData.inspectorID}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    inspectorID: parseInt(e.target.value) || 0
                                }))}
                                required
                            >
                                <option value={0}>Select an inspector...</option>
                                {inspectors.map(inspector => (
                                    <option key={inspector.inspectorID} value={inspector.inspectorID}>
                                        {inspector.inspectorsName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>Inspection Date:</label>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                            <DatePicker
                                value={inspectionDate}
                                onChange={(newDate) => setInspectionDate(newDate)}
                                format={datePickerConfig.format}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                        error: !inspectionDate,
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location (common for all items):</label>
                    <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            location: e.target.value
                        }))}
                        placeholder="e.g., Main Warehouse, Site A"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="testDetails">Test Details:</label>
                    <textarea
                        id="testDetails"
                        value={formData.testDetails}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            testDetails: e.target.value
                        }))}
                        placeholder="Enter test details and procedures"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="miscNotes">Miscellaneous Notes:</label>
                    <textarea
                        id="miscNotes"
                        value={formData.miscNotes}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            miscNotes: e.target.value
                        }))}
                        placeholder="Enter any additional notes or observations"
                    />
                </div>

                {/* Items Table */}
                {loading && <div>Loading items...</div>}
                
                {items.length > 0 && (
                    <div className="items-table">
                        <h3>Available Items for Inspection</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Include</th>
                                    <th>Plant Description</th>
                                    <th>Serial Number</th>
                                    <th>Safe Working Load</th>
                                    <th>Status</th>
                                    <th>Category</th>
                                    <th>Defects</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item.holdingID}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={item.included}
                                                onChange={(e) => handleItemChange(index, 'included', e.target.checked)}
                                            />
                                        </td>
                                        <td>{item.plantDescription}</td>
                                        <td>{item.serialNumber}</td>
                                        <td>{item.swl}</td>
                                        <td>{item.statusDescription}</td>
                                        <td>{item.categoryDescription}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={item.defects || ''}
                                                onChange={(e) => handleItemChange(index, 'defects', e.target.value)}
                                                placeholder="Enter any defects found"
                                                className="defects-input"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="form-actions">
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button 
                        type="submit" 
                        disabled={items.filter(item => item.included).length === 0}
                    >
                        Create Multi-Inspection
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MultiInspectionForm;
