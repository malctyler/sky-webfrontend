import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import { InspectionDueDate } from '../../types/inspectionTypes';

interface Props {
    dueDates: InspectionDueDate[];
    onScheduleClick: (item: InspectionDueDate) => void;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Overdue':
            return 'error';
        case 'Due Soon':
            return 'warning';
        case 'Up to Date':
            return 'success';
        default:
            return 'default';
    }
};

export const InspectionDueDatesTable: React.FC<Props> = ({ dueDates, onScheduleClick }) => {
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Equipment Type</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Last Inspection</TableCell>
                        <TableCell>Next Due</TableCell>
                        <TableCell>Inspection Frequency</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dueDates.map((item) => {
                        const today = new Date();
                        const dueDate = new Date(item.dueDate);
                        const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                        let status = 'Up to Date';
                        if (daysUntilDue < 0) {
                            status = 'Overdue';
                        } else if (daysUntilDue <= 30) {
                            status = 'Due Soon';
                        }
                        return (
                            <TableRow key={item.serialNumber}>
                                <TableCell>{item.categoryDescription}</TableCell>
                                <TableCell>{item.companyName}</TableCell>
                                <TableCell>{item.serialNumber}</TableCell>
                                <TableCell>{item.formattedLastInspection}</TableCell>
                                <TableCell>{item.formattedDueDate}</TableCell>
                                <TableCell>{item.inspectionFrequency} months</TableCell>
                                <TableCell>
                                    <Chip
                                        label={status}
                                        color={getStatusColor(status) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => onScheduleClick(item)}
                                    >
                                        Schedule
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default InspectionDueDatesTable;
