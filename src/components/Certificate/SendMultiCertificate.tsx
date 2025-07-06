import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Container
} from '@mui/material';

const SendMultiCertificate: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Send Multi-Inspection Certificate
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This feature will allow you to send multi-inspection certificates via email.
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
                        The Send Multi-Inspection Certificate functionality is currently under development.
                        This page will allow you to select multi-inspection certificates and send them
                        to customers via email with customizable templates and attachments.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default SendMultiCertificate;
