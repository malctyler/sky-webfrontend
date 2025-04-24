import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "./InspectionForm.css";
import inspectorService from '../services/inspectorService';

const InspectionForm = ({ inspection, onSubmit, onCancel, holdingId }) => {
    const [formData, setFormData] = useState({
        holdingID: holdingId || '',
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

    const [inspectors, setInspectors] = useState([]);

    useEffect(() => {
        const fetchInspectors = async () => {
            try {
                const data = await inspectorService.getAll();
                console.log('Fetched inspectors:', data); // Debugging log
                setInspectors(data);
            } catch (error) {
                console.error('Failed to fetch inspectors:', error);
            }
        };

        fetchInspectors();

        if (inspection) {            setFormData({
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
    }, [inspection, holdingId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date, fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: date
        }));
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
        }}>
            <label htmlFor="inspectionDate">Inspection Date:</label>
            <DatePicker
                id="inspectionDate"
                selected={formData.inspectionDate}
                onChange={(date) => handleDateChange(date, 'inspectionDate')}
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
            />            <label htmlFor="inspectorID">Inspector:</label>            
            <select
                id="inspectorID"
                name="inspectorID"
                value={formData.inspectorID || ""}
                onChange={handleChange}
                required
            >
                <option value="">Select an inspector</option>
                {inspectors.length > 0 ? (
                    inspectors.map((inspector) => (
                        <option key={inspector.inspectorID} value={inspector.inspectorID}>
                            {inspector.inspectorsName}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>No inspectors available</option>
                )}
            </select>

            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default InspectionForm;