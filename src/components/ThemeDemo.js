import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  TextField,
  Switch,
  Divider,
  Grid
} from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

function ThemeDemo() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom>Theme Showcase</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Typography</Typography>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="body1" gutterBottom>
                This is body text. The quick brown fox jumps over the lazy dog.
              </Typography>
              <Typography variant="body2">
                This is smaller body text.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Buttons & Inputs</Typography>
              <Box sx={{ '& > *': { m: 1 } }}>
                <Button variant="contained" color="primary">Primary</Button>
                <Button variant="contained" color="secondary">Secondary</Button>
                <Button variant="contained" color="error">Error</Button>
                <Button variant="outlined" color="primary">Outlined</Button>
              </Box>
              <Box sx={{ '& > *': { m: 1, width: '100%' } }}>
                <TextField label="Standard Input" />
                <TextField label="Outlined Input" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Colors & Theme</Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: 2 
            }}>
              {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map((color) => (
                <Box
                  key={color}
                  sx={{
                    bgcolor: `${color}.main`,
                    color: `${color}.contrastText`,
                    p: 2,
                    borderRadius: 1,
                    textAlign: 'center'
                  }}
                >
                  {color}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ThemeDemo;