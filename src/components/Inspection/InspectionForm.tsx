import React, { useState, useEffect, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from "./InspectionForm.module.css";
import inspectorService from '../../services/inspectorService';
import { InspectionItem, InspectionFormData } from '../../types/inspectionTypes';
import { Inspector } from '../../types/inspectorTypes';
import { Button } from '@mui/material';

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
    const [inspectors, setInspectors] = useState<Inspector[]>([]);    // Track if component is mounted
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const fetchInspectors = async () => {
            try {
                const inspectors = await inspectorService.getAll();
                if (mounted) {
                    setInspectors(inspectors);
                    setError(null);
                }
            } catch (err) {
                if (mounted) {
                    console.error('Failed to fetch inspectors:', err);
                    setError('Failed to load inspectors. Please try again later.');
                    setInspectors([]);
                }
            }
        };

        fetchInspectors();if (inspection) {
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
    };    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data being submitted:', formData);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {error && <div className={styles.error}>{error}</div>}
            <label className={styles.label} htmlFor="inspectionDate">Inspection Date:</label>
            <DatePicker
                id="inspectionDate"
                selected={formData.inspectionDate}
                onChange={(date: Date | null) => handleDateChange(date, 'inspectionDate')}
                dateFormat="yyyy-MM-dd"
                required
                className={styles.input}
            />

            <label className={styles.label} htmlFor="location">Location:</label>
            <input
                className={styles.input}
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                required
            />

            <label className={styles.label} htmlFor="recentCheck">Recent Check:</label>
            <input
                className={styles.input}
                id="recentCheck"
                name="recentCheck"
                type="text"
                value={formData.recentCheck}
                onChange={handleChange}
            />

            <label className={styles.label} htmlFor="previousCheck">Previous Check:</label>
            <input
                className={styles.input}
                id="previousCheck"
                name="previousCheck"
                type="text"
                value={formData.previousCheck}
                onChange={handleChange}
            />

            <label className={styles.label} htmlFor="safeWorking">Safe Working:</label>
            <input
                className={styles.input}
                id="safeWorking"
                name="safeWorking"
                type="text"
                value={formData.safeWorking}
                onChange={handleChange}
            />

            <label className={styles.label} htmlFor="defects">Defects:</label>
            <textarea
                className={styles.textarea}
                id="defects"
                name="defects"
                value={formData.defects}
                onChange={handleChange}
            />

            <label className={styles.label} htmlFor="rectified">Rectified:</label>
            <textarea
                className={styles.textarea}
                id="rectified"
                name="rectified"
                value={formData.rectified}
                onChange={handleChange}
            />

            <label className={styles.label} htmlFor="testDetails">Test Details:</label>
            <textarea
                className={styles.textarea}
                id="testDetails"
                name="testDetails"
                value={formData.testDetails}
                onChange={handleChange}
            />

            <label className={styles.label} htmlFor="miscNotes">Misc Notes:</label>
            <textarea
                className={styles.textarea}
                id="miscNotes"
                name="miscNotes"
                value={formData.miscNotes}
                onChange={handleChange}
            />

            <label className={styles.label} htmlFor="inspectorID">Inspector:</label>              
            <select
                className={styles.select}
                id="inspectorID"
                name="inspectorID"
                value={formData.inspectorID !== null ? formData.inspectorID.toString() : ""}
                onChange={handleChange}
                required
            >
                <option className={styles.option} value="">Select an inspector</option>                
                {inspectors.map((inspector) => (
                    <option 
                        className={styles.option}
                        key={inspector.inspectorID} 
                        value={inspector.inspectorID.toString()}>
                        {inspector.inspectorsName || 'Unknown Inspector'}
                    </option>
                ))}
                {inspectors.length === 0 && (
                    <option className={styles.option} value="" disabled>No inspectors available</option>
                )}
            </select>            <div className={styles.buttonGroup}>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
                <Button variant="outlined" color="inherit" type="button" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    );
};

export default InspectionForm;
