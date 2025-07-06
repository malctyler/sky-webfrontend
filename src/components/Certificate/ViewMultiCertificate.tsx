import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Container
} from '@mui/material';

const ViewMultiCertificate: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        View Multi-Inspection Certificate
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This feature will allow you to view existing multi-inspection certificates.
                    </Typography>
                </Box>
                
                <Box sx={{ 
                    backgroundColor: 'info.light', 
                    color: 'info.contrastText',
                    p: 3, 
                    borderRadius: 1,
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" gutterBottom>
                        Coming Soon
                    </Typography>
                    <Typography variant="body2">
                        The View Multi-Inspection Certificate functionality is currently under development.
                        This page will allow you to search, filter, and view multi-inspection certificates
                        that have been generated from multi-inspection processes.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default ViewMultiCertificate;
