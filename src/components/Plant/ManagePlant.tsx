import React, { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import { 
  Box,
  IconButton, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
  Snackbar,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Search as SearchIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Plant, PlantCategory, PlantFormData, SnackbarState } from '../../types/plantTypes';
import styles from './ManagePlant.module.css';
import axios from 'axios';
import { baseUrl } from '../../config';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const userStr = localStorage.getItem('user');
  const token = userStr ? JSON.parse(userStr)?.token : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ManagePlant: React.FC = () => {  
  const { isDarkMode } = useCustomTheme();
  const [plant, setplant] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [plantData, setPlantData] = useState<PlantFormData>({
    plantDescription: '',
    plantCategory: '',
    normalPrice: ''
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [plantToDelete, setPlantToDelete] = useState<Plant | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchplant(), fetchCategories()]);
      } catch (error) {
        handleError(error);
      }
    };
    loadData();
  }, []);

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred');
    }
    setLoading(false);
  };    

  const fetchplant = async (): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${baseUrl}/AllPlant`, { headers });
      console.log('Fetched plant:', response.data); // Debug log
      setplant(response.data);
      setLoading(false);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const fetchCategories = async (): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${baseUrl}/PlantCategories`, { headers });
      console.log('Fetched categories:', response.data);  // Debug log
      setCategories(response.data);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    console.log(`Input change - ${name}:`, value); // Debug log
    setPlantData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      console.log('Updated plant data:', newData); // Debug log
      return newData;
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success'
    });
  };

  const showError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
  };

  const handleCreatePlant = async (): Promise<void> => {
    // Validate required fields
    if (!plantData.plantCategory) {
      showError('Please select a category');
      return;
    }
    if (!plantData.plantDescription) {
      showError('Please enter a description');
      return;
    }
    if (!plantData.normalPrice) {
      showError('Please enter a price');
      return;
    }    

    try {
      const headers = getAuthHeaders();
      const response = await axios.post<Plant>(
        `${baseUrl}/AllPlant`,
        {
          plantNameID: 0, // API will assign the real ID
          plantDescription: plantData.plantDescription,
          plantCategory: parseInt(plantData.plantCategory),
          normalPrice: parseFloat(plantData.normalPrice).toFixed(2)
        },
        { headers }
      );
      
      const newPlant = response.data;
      setplant(prev => [...prev, newPlant]);
      setDialogOpen(false);
      resetForm();
      showSuccess('Plant created successfully');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        showError(error.response.data.error);
      } else if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Failed to create plant');
      }
      console.error('Create plant error:', error);
    }
  };  

  const handleUpdatePlant = async (): Promise<void> => {
    if (!editingPlant) return;

    // Validate required fields
    if (!plantData.plantCategory) {
      showError('Please select a category');
      return;
    }
    if (!plantData.plantDescription) {
      showError('Please enter a description');
      return;
    }
    if (!plantData.normalPrice) {
      showError('Please enter a price');
      return;
    }    
    try {
      console.log('Updating plant with data:', plantData); // Debug log
      const headers = getAuthHeaders();
      const updatePayload = {
        plantNameID: editingPlant.plantNameID,
        plantDescription: plantData.plantDescription.trim(),
        plantCategory: parseInt(plantData.plantCategory),
        normalPrice: parseFloat(plantData.normalPrice).toFixed(2)
      };
      
      await axios.put(`${baseUrl}/AllPlant/${editingPlant.plantNameID}`, updatePayload, { headers });
      
      // Fetch fresh data to ensure we have the correct state
      await fetchplant();
      setDialogOpen(false);
      resetForm();
      showSuccess('Plant updated successfully');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        showError(error.response.data.error);
      } else if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Failed to update plant');
      }
      console.error('Update plant error:', error);
    }
  };

  const handleDeletePlant = async (): Promise<void> => {
    if (!plantToDelete) return;

    try {
      const headers = getAuthHeaders();
      await axios.delete(`${baseUrl}/AllPlant/${plantToDelete.plantNameID}`, { headers });
      setplant(prev => prev.filter(plant => plant.plantNameID !== plantToDelete.plantNameID));
      setDeleteDialogOpen(false);
      setPlantToDelete(null);
      showSuccess('Plant deleted successfully');
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const openEditDialog = (plant: Plant) => {
    console.log('Opening edit dialog for plant:', plant); // Debug log
    setEditingPlant(plant);
    setPlantData({
      plantDescription: plant.plantDescription || '',
      plantCategory: (plant.plantCategory || '').toString(),
      normalPrice: (plant.normalPrice || '').toString()
    });
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingPlant(null);
    resetForm();
    setDialogOpen(true);
  };

  const openDeleteDialog = (plant: Plant) => {
    setPlantToDelete(plant);
    setDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setPlantData({
      plantDescription: '',
      plantCategory: '',
      normalPrice: ''
    });
  };

  // Sort plants alphabetically and filter based on search
  const filteredAndSortedPlants = useMemo(() => {
    return [...plant]
      .sort((a, b) => 
        (a.plantDescription || '').localeCompare(b.plantDescription || '')
      )
      .filter(p => 
        p.plantDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categories.find(c => c.categoryID === p.plantCategory)?.categoryDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.normalPrice?.toString().includes(searchTerm)
      );
  }, [plant, categories, searchTerm]);
  if (loading) {
    return (      
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (      
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="error">⚠️ {error}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={fetchplant}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Paper>
      </Box>
    );
  }
  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="h5" component="h2">Manage Plant</Typography>
          </Box>
          <Box sx={{ flex: 2, maxWidth: 400 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={openCreateDialog}>
            Add New Plant
          </Button>
        </Box>
      </Paper>

      <div className={styles.plantGrid}>
        {filteredAndSortedPlants.map((plant) => (
          <Paper
            key={plant.plantNameID}
            elevation={3}
            sx={{ 
              p: 1.5, 
              mb: 2, 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: '60px',
              cursor: 'pointer'
            }}
            onClick={() => openEditDialog(plant)}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {plant.plantDescription}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {categories.find(c => c.categoryID === plant.plantCategory)?.categoryDescription} - £{Number(plant.normalPrice).toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  openEditDialog(plant);
                }} 
                size="small"
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteDialog(plant);
                }} 
                size="small"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editingPlant ? 'Edit Plant' : 'Create New Plant'}</DialogTitle>
        <DialogContent>          
          <TextField
            label="Description"
            name="plantDescription"
            value={plantData.plantDescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={plantData.plantDescription === ''}
            helperText={plantData.plantDescription === '' ? 'Description is required' : ''}
          />
          <FormControl fullWidth margin="normal" required error={!plantData.plantCategory}>
            <InputLabel>Category</InputLabel>
            <Select
              name="plantCategory"
              value={plantData.plantCategory}
              onChange={handleInputChange}
              label="Category"
              sx={{
                color: 'text.primary',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'text.secondary',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'text.primary',
                },
                '& .MuiSelect-select': {
                  color: 'text.primary',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'background.paper',
                    '& .MuiMenuItem-root': {
                      color: 'text.primary'
                    }
                  }
                }
              }}
            >              
              {categories.map((category) => (
                <MenuItem 
                  key={category.categoryID} 
                  value={category.categoryID.toString()}
                >
                  {category.categoryDescription}
                </MenuItem>
              ))}
            </Select>
          </FormControl>          
          <TextField
            label="Normal Price"
            name="normalPrice"
            value={plantData.normalPrice}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            type="number"
            error={plantData.normalPrice === ''}
            helperText={plantData.normalPrice === '' ? 'Price is required' : ''}
            InputProps={{
              startAdornment: <span style={{ marginRight: '8px' }}>£</span>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={editingPlant ? handleUpdatePlant : handleCreatePlant}
            variant="contained" 
            color="primary"
          >
            {editingPlant ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Plant Deletion</DialogTitle>        
        <DialogContent>
          <div className={styles.dialogContent}>
            <p>Are you sure you want to delete this plant?</p>              
            {plantToDelete && (
              <div key="delete-info" className={styles.deleteInfo}>
                <p key="desc"><strong>Description:</strong> {plantToDelete.plantDescription}</p>
                <p key="cat"><strong>Category:</strong> {categories.find(c => c.categoryID === plantToDelete.plantCategory)?.categoryDescription}</p>
                <p key="price"><strong>Normal Price:</strong> £{Number(plantToDelete.normalPrice).toFixed(2)}</p>
              </div>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action cannot be undone.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDeletePlant}
            color="error"
            variant="contained"
          >
            Delete Plant
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ManagePlant;
