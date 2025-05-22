import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./InspectionForm.css";
import inspectorService from '../services/inspectorService';
import { InspectionItem, InspectionFormData } from '../types/inspectionTypes';
import { Inspector } from '../types/inspectorTypes';

interface InspectionFormProps {
    inspection: InspectionItem | null;
    onSubmit: (data: InspectionFormData) => void;
    onCancel: () => void;
    holdingId: number;
}

const InspectionForm: React.FC<InspectionFormProps> = ({ inspection, onSubmit, onCancel, holdingId }) => {
    const [formData, setFormData] = useState<InspectionFormData>({
        holdingID: Number(holdingId) || 0,
        inspectionDate: null,
        location: '',
        recentCheck: '',
        previousCheck: '',
        safeWorking: '',
        defects: '',
        rectified: '',
        latestDate: null,
        testDetails: '',
        miscNotes: '',
        inspectorID: null
    });
    const [inspectors, setInspectors] = useState<Inspector[]>([]);    useEffect(() => {
        const fetchInspectors = async () => {
            try {
                const inspectors = await inspectorService.getAll();
                setInspectors(inspectors);
            } catch (error) {
                console.error('Failed to fetch inspectors:', error);
                setInspectors([]);
            }
        };

        fetchInspectors();        if (inspection) {
            // Map inspection fields to form data structure
            setFormData({
                holdingID: Number(holdingId),
                inspectionDate: inspection.inspectionDate ? new Date(inspection.inspectionDate) : null,
                latestDate: inspection.latestDate ? new Date(inspection.latestDate) : null,
                location: inspection.location || '',
                recentCheck: inspection.recentCheck || '',
                previousCheck: inspection.previousCheck || '',
                safeWorking: inspection.safeWorking || '',
                defects: inspection.defects || '',
                rectified: inspection.rectified || '',
                testDetails: inspection.testDetails || '',
                miscNotes: inspection.miscNotes || '',
                inspectorID: inspection.inspectorID || null
            });
        } else {
            setFormData(prev => ({
                ...prev,
                holdingID: Number(holdingId)
            }));
        }
    }, [inspection, holdingId]);    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: name === 'inspectorID' ? (value ? parseInt(value, 10) : null) : value
        }));
    };const handleDateChange = (date: Date | null, fieldName: keyof Pick<InspectionFormData, 'inspectionDate' | 'latestDate'>) => {
        setFormData((prev: InspectionFormData) => ({
            ...prev,
            [fieldName]: date
        }));
    };

    return (
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit(formData);
        }}>
            <label htmlFor="inspectionDate">Inspection Date:</label>
            <DatePicker
                id="inspectionDate"
                selected={formData.inspectionDate}
                onChange={(date: Date | null) => handleDateChange(date, 'inspectionDate')}
                dateFormat="yyyy-MM-dd"
                required
            />

            <label htmlFor="location">Location:</label>
            <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                required
            />

            <label htmlFor="recentCheck">Recent Check:</label>
            <input
                id="recentCheck"
                name="recentCheck"
                type="text"
                value={formData.recentCheck}
                onChange={handleChange}
            />

            <label htmlFor="previousCheck">Previous Check:</label>
            <input
                id="previousCheck"
                name="previousCheck"
                type="text"
                value={formData.previousCheck}
                onChange={handleChange}
            />

            <label htmlFor="safeWorking">Safe Working:</label>
            <input
                id="safeWorking"
                name="safeWorking"
                type="text"
                value={formData.safeWorking}
                onChange={handleChange}
            />

            <label htmlFor="defects">Defects:</label>
            <textarea
                id="defects"
                name="defects"
                value={formData.defects}
                onChange={handleChange}
            />

            <label htmlFor="rectified">Rectified:</label>
            <textarea
                id="rectified"
                name="rectified"
                value={formData.rectified}
                onChange={handleChange}
            />

            <label htmlFor="testDetails">Test Details:</label>
            <textarea
                id="testDetails"
                name="testDetails"
                value={formData.testDetails}
                onChange={handleChange}
            />

            <label htmlFor="miscNotes">Misc Notes:</label>
            <textarea
                id="miscNotes"
                name="miscNotes"
                value={formData.miscNotes}
                onChange={handleChange}
            />

            <label htmlFor="inspectorID">Inspector:</label>              <select
                id="inspectorID"
                name="inspectorID"
                value={formData.inspectorID !== null ? formData.inspectorID.toString() : ""}
                onChange={handleChange}
                required
            >
                <option value="">Select an inspector</option>                {inspectors.map((inspector) => (
                    <option 
                        key={inspector.inspectorID} 
                        value={inspector.inspectorID.toString()}>
                        {inspector.inspectorsName || 'Unknown Inspector'}
                    </option>
                ))}
                {inspectors.length === 0 && (
                    <option value="" disabled>No inspectors available</option>
                )}
            </select>

            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default InspectionForm;
