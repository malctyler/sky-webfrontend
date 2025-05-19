import { useState, useEffect } from 'react';
import { Box, IconButton, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Paper, Typography, CircularProgress } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import './PlantCategories.css';
import { baseUrl } from '../config';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

function PlantCategories() {
  const { user } = useAuth(); // Get user from AuthContext, which includes the token
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

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user?.token}`,
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/PlantCategories`, {
        headers: getAuthHeaders(), // Add Authorization header
      });
      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized: Please check login and permissions.');
        throw new Error(`Failed to fetch categories (status: ${response.status})`);
      }
      const data = await response.json();
      setCategories(data);
      setError(null); // Clear previous errors
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) { // Only fetch if token is available
      fetchCategories();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]); // Re-fetch if token changes (e.g., after login)

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
    if (!categoryDescription.trim()) {
      showError('Category description cannot be empty.');
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/PlantCategories`, {
        method: 'POST',
        headers: getAuthHeaders(), // Add Authorization header
        body: JSON.stringify({
          categoryDescription: categoryDescription
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(response.status === 401 ? 'Unauthorized' : errorData || 'Failed to create category');
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
    if (!categoryDescription.trim()) {
      showError('Category description cannot be empty.');
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/PlantCategories/${editingCategory.categoryID}`, {
        method: 'PUT',
        headers: getAuthHeaders(), // Add Authorization header
        body: JSON.stringify({
          ...editingCategory,
          categoryDescription
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(response.status === 401 ? 'Unauthorized' : errorData || 'Failed to update category');
      }
      // No content expected for PUT, so no need to await response.json() unless API returns updated obj
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
    if (!categoryToDelete) return;
    try {
      const response = await fetch(`${baseUrl}/PlantCategories/${categoryToDelete.categoryID}`, {
        method: 'DELETE',
        headers: getAuthHeaders(), // Add Authorization header
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(response.status === 401 ? 'Unauthorized' : errorData || 'Failed to delete category');
      }
      // No content expected for DELETE
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, height: 'calc(100vh - 128px)' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading categories...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography color="error" paragraph>⚠️ {error}</Typography>
        <Button variant="contained" onClick={fetchCategories}>Try Again</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2">Plant Categories</Typography>
          <Button variant="contained" color="primary" onClick={openCreateDialog}>
            Add Category
          </Button>
        </Box>
      </Paper>

      <div className="categories-grid">
        {categories.map(category => (
          <Paper key={category.categoryID} elevation={3} className="category-card" sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h3" sx={{ mb: 1, flexGrow: 1 }}>{category.categoryDescription}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <IconButton onClick={() => openEditDialog(category)} size="small" aria-label="edit category">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => openDeleteDialog(category.categoryID)} size="small" aria-label="delete category">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
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
    </Box>
  );
}

export default PlantCategories;