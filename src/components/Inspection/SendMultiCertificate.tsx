import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SendMultiCertificate: React.FC = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Send Multi-Inspection Certificates
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This feature is coming soon. Here you will be able to email 
                    multi-inspection certificates to customers and other stakeholders.
                </Typography>
            </Paper>
        </Box>
    );
};

export default SendMultiCertificate;
