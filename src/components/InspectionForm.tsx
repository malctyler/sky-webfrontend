import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "./InspectionForm.css";
import inspectorService from '../services/inspectorService';
import { Inspection, InspectionFormData } from '../types/inspectionTypes';
import { Inspector } from '../types/inspectorTypes';

interface InspectionFormProps {
    inspection: Inspection | null;
    onSubmit: (data: InspectionFormData) => void;
    onCancel: () => void;
    holdingId: number;
}

const InspectionForm: React.FC<InspectionFormProps> = ({ inspection, onSubmit, onCancel, holdingId }) => {
    const [formData, setFormData] = useState<InspectionFormData>({
        holdingID: holdingId || 0,
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
    });    const [inspectors, setInspectors] = useState<Inspector[]>([]);
      useEffect(() => {
        const fetchInspectors = async () => {
            try {
                const data = await inspectorService.getAll();
                console.log('Fetched inspectors:', data);
                if (Array.isArray(data)) {
                    setInspectors(data.filter(inspector => 
                        inspector?.inspectorID && inspector?.inspectorsName
                    ));
                } else {
                    console.error('Invalid inspector data format received:', data);
                    setInspectors([]);
                }
            } catch (error) {
                console.error('Failed to fetch inspectors:', error);
                setInspectors([]);
            }
        };

        fetchInspectors();

        if (inspection) {
            setFormData({
                ...inspection,
                inspectionDate: inspection.inspectionDate ? new Date(inspection.inspectionDate) : null,
                latestDate: inspection.latestDate ? new Date(inspection.latestDate) : null,
                inspectorID: inspection.inspectorID || null
            });
        } else {
            setFormData(prev => ({
                ...prev,
                holdingID: holdingId
            }));
        }
    }, [inspection, holdingId]);    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const inputElement = e.target as HTMLInputElement;
        
        setFormData(prev => ({
            ...prev,
            [name]: name === 'inspectorID' ? (value ? parseInt(value, 10) : null) : 
                    type === 'checkbox' ? inputElement.checked : value
        }));
    };

    const handleDateChange = (date: Date | null, fieldName: keyof Pick<InspectionFormData, 'inspectionDate' | 'latestDate'>) => {
        setFormData(prev => ({
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
                value={formData.inspectorID?.toString() || ""}
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
