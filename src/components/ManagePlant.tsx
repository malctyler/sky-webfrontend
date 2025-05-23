import React, { useState, useEffect, ChangeEvent } from 'react';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import { 
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
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Plant, PlantCategory, PlantFormData, SnackbarState } from '../types/plantTypes';
import styles from './ManagePlant.module.css';
import axios from 'axios';
import { baseUrl } from '../config';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const userStr = localStorage.getItem('user');
  const token = userStr ? JSON.parse(userStr)?.token : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ManagePlant: React.FC = () => {
  const { isDarkMode } = useCustomTheme();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
        await Promise.all([fetchPlants(), fetchCategories()]);
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
  };    const fetchPlants = async (): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${baseUrl}/AllPlant`, { headers });
      console.log('Fetched plants:', response.data); // Debug log
      setPlants(response.data);
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
      const headers = getAuthHeaders();      const response = await axios.post(`${baseUrl}/AllPlant`, {
        plantNameID: 0, // API will assign the real ID
        plantDescription: plantData.plantDescription,
        plantCategory: parseInt(plantData.plantCategory),
        normalPrice: parseFloat(plantData.normalPrice).toFixed(2)
      }, { headers });
      
      const newPlant = response.data;
      setPlants(prev => [...prev, newPlant]);
      setDialogOpen(false);
      resetForm();
      showSuccess('Plant created successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
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
      await fetchPlants();
      setDialogOpen(false);
      resetForm();
      showSuccess('Plant updated successfully');
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const handleDeletePlant = async (): Promise<void> => {
    if (!plantToDelete) return;

    try {
      const headers = getAuthHeaders();
      await axios.delete(`${baseUrl}/AllPlant/${plantToDelete.plantNameID}`, { headers });
      setPlants(prev => prev.filter(plant => plant.plantNameID !== plantToDelete.plantNameID));
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

  if (loading) {
    return (      <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading plant...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (      <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
        <div className={styles.errorState}>
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
      <div className={styles.header}>
        <h2>Manage Plant</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={openCreateDialog}
        >
          Add New Plant
        </Button>
      </div>
      <div className={styles.plantsGrid}>
        {plants.map((plant) => (
          <div 
            key={`plant-${plant.plantNameID}`} 
            className={styles.plantCard}
            onClick={() => openEditDialog(plant)}
          >
            <div className={styles.cardActions}>
              <IconButton 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openEditDialog(plant);
                }} 
                size="small"
                key={`edit-${plant.plantNameID}`}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openDeleteDialog(plant);
                }} 
                size="small" 
                color="error"
                key={`delete-${plant.plantNameID}`}
              >
                <DeleteIcon />
              </IconButton>            </div>            
            <div className={styles.plantInfo}>
              <h3 key={`desc-${plant.plantNameID}`}>
                {plant.plantDescription}
              </h3>
              <p key={`cat-${plant.plantNameID}`}>
                Category: {categories.find(c => c.categoryID === plant.plantCategory)?.categoryDescription}
              </p>
              <p key={`price-${plant.plantNameID}`}>
                Normal Price: £{Number(plant.normalPrice).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editingPlant ? 'Edit Plant' : 'Create New Plant'}</DialogTitle>
        <DialogContent>          <TextField
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
            >              {categories.map((category) => (
                <MenuItem 
                  key={category.categoryID} 
                  value={category.categoryID.toString()}
                >
                  {category.categoryDescription}
                </MenuItem>
              ))}
            </Select>
          </FormControl>          <TextField
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
        <DialogTitle>Confirm Plant Deletion</DialogTitle>        <DialogContent>
          <div className={styles.dialogContent}>
            <p>Are you sure you want to delete this plant?</p>              {plantToDelete && (
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
    </div>
  );
};

export default ManagePlant;
