import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
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
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import './ManagePlant.css';

const baseUrl = process.env.REACT_APP_VITEAPIURL || 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api';

function ManagePlant() {
  const { isDarkMode } = useTheme();
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);
  const [plantData, setPlantData] = useState({
    plantDescription: '',
    plantCategory: '',
    normalPrice: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);

  useEffect(() => {
    Promise.all([fetchPlants(), fetchCategories()]);
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch(`${baseUrl}/AllPlant`);
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      const data = await response.json();
      setPlants(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/PlantCategories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlantData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add snackbar handlers
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showSuccess = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success'
    });
  };

  const showError = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
  };

  const handleCreatePlant = async () => {
    try {
      const response = await fetch(`${baseUrl}/AllPlant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantData),
      });

      if (!response.ok) {
        throw new Error('Failed to create plant');
      }

      const newPlant = await response.json();
      setPlants(prev => [...prev, newPlant]);
      setPlantData({
        plantDescription: '',
        plantCategory: '',
        normalPrice: ''
      });
      setDialogOpen(false);
      showSuccess('Plant created successfully');
    } catch (err) {
      showError(err.message);
    }
  };

  const handleUpdatePlant = async () => {
    try {
      const response = await fetch(`${baseUrl}/AllPlant/${editingPlant.plantNameID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editingPlant,
          ...plantData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update plant');
      }

      setPlants(prev => prev.map(plant => 
        plant.plantNameID === editingPlant.plantNameID 
          ? { ...plant, ...plantData }
          : plant
      ));
      
      setEditingPlant(null);
      setPlantData({
        plantDescription: '',
        plantCategory: '',
        normalPrice: ''
      });
      setDialogOpen(false);
      showSuccess('Plant updated successfully');
    } catch (err) {
      showError(err.message);
    }
  };

  const openDeleteDialog = (plantId) => {
    const plant = plants.find(p => p.plantNameID === plantId);
    setPlantToDelete(plant);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/AllPlant/${plantToDelete.plantNameID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // Try to get the error message from the response
        const errorData = await response.text();
        if (response.status === 500 && errorData.includes("DELETE statement conflicted with the REFERENCE constraint")) {
          throw new Error('This plant cannot be deleted because it is currently in use');
        }
        throw new Error('Failed to delete plant');
      }

      setPlants(prev => prev.filter(plant => plant.plantNameID !== plantToDelete.plantNameID));
      showSuccess('Plant deleted successfully');
      setDeleteDialogOpen(false);
      setPlantToDelete(null);
    } catch (err) {
      showError(err.message);
    }
  };

  const openCreateDialog = () => {
    setEditingPlant(null);
    setPlantData({
      plantDescription: '',
      plantCategory: '',
      normalPrice: ''
    });
    setDialogOpen(true);
  };

  const openEditDialog = (plant) => {
    setEditingPlant(plant);
    setPlantData({
      plantDescription: plant.plantDescription,
      plantCategory: plant.plantCategory,
      normalPrice: plant.normalPrice
    });
    setDialogOpen(true);
  };

  const getCategoryDescription = (categoryId) => {
    const category = categories.find(cat => cat.categoryID === categoryId);
    return category ? category.categoryDescription : 'Unknown Category';
  };

  if (loading) {
    return (
      <div className={`plants-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading plants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`plants-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="error-state">
          <p>⚠️ {error}</p>
          <Button variant="contained" onClick={() => Promise.all([fetchPlants(), fetchCategories()])}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`plants-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="plants-header">
        <h2>Manage Plants</h2>
        <Button variant="contained" color="primary" onClick={openCreateDialog}>
          Add Plant
        </Button>
      </div>

      <div className="plants-grid">
        {plants.map(plant => (
          <div key={plant.plantNameID} className="plant-card">
            <div className="plant-actions">
              <IconButton onClick={() => openEditDialog(plant)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => openDeleteDialog(plant.plantNameID)} size="small">
                <DeleteIcon />
              </IconButton>
            </div>
            <h3>{plant.plantDescription}</h3>
            <p><strong>Category:</strong> {getCategoryDescription(plant.plantCategory)}</p>
            <p><strong>Price:</strong> £{plant.normalPrice}</p>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {editingPlant ? 'Edit Plant' : 'New Plant'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="plantDescription"
            label="Plant Description"
            type="text"
            fullWidth
            value={plantData.plantDescription}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="plantCategory"
              value={plantData.plantCategory}
              onChange={handleInputChange}
              label="Category"
            >
              {categories.map(category => (
                <MenuItem key={category.categoryID} value={category.categoryID}>
                  {category.categoryDescription}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="normalPrice"
            label="Price"
            type="text"
            fullWidth
            value={plantData.normalPrice}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={editingPlant ? handleUpdatePlant : handleCreatePlant}>
            {editingPlant ? 'Update' : 'Create'}
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Plant Deletion
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Are you sure you want to delete this plant?</p>
            {plantToDelete && (
              <>
                <p><strong>Description:</strong> {plantToDelete.plantDescription}</p>
                <p><strong>Category:</strong> {plantToDelete.plantCategory}</p>
              </>
            )}
            <p style={{ color: '#d32f2f', marginTop: '1rem' }}>
              This action cannot be undone.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
            Delete Plant
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManagePlant;