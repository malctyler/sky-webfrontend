import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Paper,
  Typography,
  CircularProgress 
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';
import styles from './PlantCategories.module.css';
import { baseUrl } from '../../config';
import { useAuth } from '../../contexts/AuthContext';

interface PlantCategory {
  categoryID: number;
  categoryDescription: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

const PlantCategories: React.FC = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<PlantCategory | null>(null);
  const [categoryDescription, setCategoryDescription] = useState<string>('');
  const [editingCategory, setEditingCategory] = useState<PlantCategory | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const getAuthHeaders = (): HeadersInit => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user?.token}`,
  });

  const fetchCategories = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/PlantCategories`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized: Please check login and permissions.');
        throw new Error(`Failed to fetch categories (status: ${response.status})`);
      }
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchCategories();
    }
  }, [user?.token]);

  const handleSnackbarClose = (): void => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showSuccess = (message: string): void => {
    setSnackbar({
      open: true,
      message,
      severity: 'success'
    });
  };

  const showError = (message: string): void => {
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
  };

  const isDuplicateCategory = (description: string, excludeCategoryId?: number): boolean => {
    const normalizedDescription = description.trim().toLowerCase();
    return categories.some(cat => 
      cat.categoryDescription.trim().toLowerCase() === normalizedDescription &&
      cat.categoryID !== excludeCategoryId
    );
  };

  const handleCreateCategory = async (): Promise<void> => {
    if (!categoryDescription.trim()) {
      showError('Category description cannot be empty.');
      return;
    }

    // Check for duplicates before making the API call
    if (isDuplicateCategory(categoryDescription)) {
      showError('A category with this description already exists.');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/PlantCategories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          categoryDescription: categoryDescription
        }),
      });

      const errorData = await response.text();
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please check login and permissions.');
        }
        if (errorData.includes('already exists')) {
          throw new Error('A category with this description already exists.');
        }
        throw new Error(errorData || 'Failed to create category');
      }

      const newCategory = JSON.parse(errorData);
      setCategories(prev => [...prev, newCategory]);
      setCategoryDescription('');
      setDialogOpen(false);
      showSuccess('Category created successfully');
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to create category');
    }
  };

  const handleUpdateCategory = async (): Promise<void> => {
    if (!categoryDescription.trim() || !editingCategory) {
      showError('Category description cannot be empty.');
      return;
    }

    // Check for duplicates before making the API call
    if (isDuplicateCategory(categoryDescription, editingCategory.categoryID)) {
      showError('A category with this description already exists.');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/PlantCategories/${editingCategory.categoryID}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...editingCategory,
          categoryDescription
        }),
      });

      const errorData = await response.text();
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please check login and permissions.');
        }
        if (errorData.includes('already exists')) {
          throw new Error('A category with this description already exists.');
        }
        throw new Error(errorData || 'Failed to update category');
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
      showError(err instanceof Error ? err.message : 'Failed to update category');
    }
  };

  const openDeleteDialog = (categoryId: number): void => {
    const category = categories.find(cat => cat.categoryID === categoryId);
    if (category) {
      setCategoryToDelete(category);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteCategory = async (): Promise<void> => {
    if (!categoryToDelete) return;
    try {
      const response = await fetch(`${baseUrl}/PlantCategories/${categoryToDelete.categoryID}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(response.status === 401 ? 'Unauthorized' : errorData || 'Failed to delete category');
      }
      setCategories(prev => prev.filter(cat => cat.categoryID !== categoryToDelete.categoryID));
      showSuccess('Category deleted successfully');
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to delete category');
    }
  };

  const openCreateDialog = (): void => {
    setEditingCategory(null);
    setCategoryDescription('');
    setDialogOpen(true);
  };

  const openEditDialog = (category: PlantCategory): void => {
    setEditingCategory(category);
    setCategoryDescription(category.categoryDescription);
    setDialogOpen(true);
  };
  // Create a memoized sorted list of categories
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => 
      a.categoryDescription.localeCompare(b.categoryDescription)
    );
  }, [categories]);

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
      </Paper>      <div className={styles.categoriesGrid}>
        {sortedCategories.map(category => (
          <Paper 
            key={category.categoryID} 
            elevation={3} 
            className={styles.categoryCard} 
            sx={{ 
              p: 1.5, 
              mb: 2, 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: '60px' // Reduced height (about 60% of original)
            }}
          >
            <Typography variant="body1" component="div" sx={{ fontWeight: 'medium' }}>
              {category.categoryDescription}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>              <IconButton onClick={() => openEditDialog(category)} size="small" aria-label="edit category" color="primary">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => openDeleteDialog(category.categoryID)} size="small" aria-label="delete category" color="error">
                <DeleteIcon fontSize="small" />
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
        <DialogActions>          <Button color="inherit" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
          >
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
        <DialogActions>          <Button 
            color="inherit"
            onClick={() => setDeleteDialogOpen(false)}
          >
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
};

export default PlantCategories;
