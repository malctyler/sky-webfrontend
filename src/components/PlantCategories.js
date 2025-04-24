import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { IconButton, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import './PlantCategories.css';

function PlantCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api/PlantCategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

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

  const handleCreateCategory = async () => {
    try {
      const response = await fetch('https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api/PlantCategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryDescription: categoryDescription
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const newCategory = await response.json();
      setCategories(prev => [...prev, newCategory]);
      setCategoryDescription('');
      setDialogOpen(false);
      showSuccess('Category created successfully');
    } catch (err) {
      showError(err.message);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await fetch(`https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api/PlantCategories/${editingCategory.categoryID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editingCategory,
          categoryDescription
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      setCategories(prev => prev.map(cat => 
        cat.categoryID === editingCategory.categoryID 
          ? { ...cat, categoryDescription: categoryDescription }
          : cat
      ));
      setEditingCategory(null);
      setCategoryDescription('');
      setDialogOpen(false);
      showSuccess('Category updated successfully');
    } catch (err) {
      showError(err.message);
    }
  };

  const openDeleteDialog = (categoryId) => {
    const category = categories.find(cat => cat.categoryID === categoryId);
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(`https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net/api/PlantCategories/${categoryToDelete.categoryID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories(prev => prev.filter(cat => cat.categoryID !== categoryToDelete.categoryID));
      showSuccess('Category deleted successfully');
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      showError(err.message);
    }
  };

  const openCreateDialog = () => {
    setEditingCategory(null);
    setCategoryDescription('');
    setDialogOpen(true);
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setCategoryDescription(category.categoryDescription);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className={`categories-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`categories-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="error-state">
          <p>⚠️ {error}</p>
          <Button variant="contained" onClick={fetchCategories}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`categories-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="categories-header">
        <h2>Plant Categories</h2>
        <Button variant="contained" color="primary" onClick={openCreateDialog}>
          Add Category
        </Button>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.categoryID} className="category-card">
            <div className="category-actions">
              <IconButton onClick={() => openEditDialog(category)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => openDeleteDialog(category.categoryID)} size="small">
                <DeleteIcon />
              </IconButton>
            </div>
            <h3>{category.categoryDescription}</h3>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {editingCategory ? 'Edit Category' : 'New Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Description"
            type="text"
            fullWidth
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}>
            {editingCategory ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Category Deletion
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Are you sure you want to delete this category?</p>
            {categoryToDelete && (
              <p><strong>Category:</strong> {categoryToDelete.categoryDescription}</p>
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
            onClick={handleDeleteCategory}
            color="error"
            variant="contained"
          >
            Delete Category
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
}

export default PlantCategories;