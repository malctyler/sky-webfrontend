import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useTheme } from '../contexts/ThemeContext';
import { TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Pagination } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import "react-datepicker/dist/react-datepicker.css";
import './CustomerNotes.css';
import { baseUrl } from '../config';
import apiClient from '../services/apiClient';

function CustomerNotes() {
  const { custId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const notesPerPage = 6;

  useEffect(() => {
    fetchCustomerAndNotes();
  }, [custId]);

  useEffect(() => {
    filterNotes();
  }, [notes, searchText, startDate, endDate]);

  const fetchCustomerAndNotes = async () => {
    try {
      const [customerResponse, notesResponse] = await Promise.all([
        apiClient.get(`/Customers/${custId}`),
        apiClient.get('/Notes')
      ]);
      const customerData = customerResponse.data;
      const notesData = notesResponse.data;
      setCustomer(customerData);
      const customerNotes = notesData
        .filter(note => note.custID === parseInt(custId))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotes(customerNotes);
      setFilteredNotes(customerNotes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filterNotes = () => {
    let filtered = [...notes];

    if (searchText) {
      filtered = filtered.filter(note => 
        note.notes.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (startDate) {
      filtered = filtered.filter(note => 
        new Date(note.date) >= startDate
      );
    }

    if (endDate) {
      filtered = filtered.filter(note => 
        new Date(note.date) <= endDate
      );
    }

    setFilteredNotes(filtered);
    setPage(1);
  };

  const handleCreateNote = async () => {
    try {
      const response = await apiClient.post('/Notes', {
        custID: parseInt(custId),
        date: new Date(),
        notes: newNoteText
      });
      const newNote = response.data;
      setNotes(prev => [newNote, ...prev]);
      setDialogOpen(false);
      setNewNoteText('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateNote = async () => {
    try {
      await apiClient.put(`/Notes/${editingNote.noteID}`, {
        ...editingNote,
        notes: newNoteText
      });
      setNotes(prev => prev.map(note => 
        note.noteID === editingNote.noteID 
          ? { ...note, notes: newNoteText }
          : note
      ));
      setDialogOpen(false);
      setEditingNote(null);
      setNewNoteText('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    try {
      await apiClient.delete(`/Notes/${noteId}`);
      setNotes(prev => prev.filter(note => note.noteID !== noteId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    navigate('/customers');
  };

  const openCreateDialog = () => {
    setEditingNote(null);
    setNewNoteText('');
    setDialogOpen(true);
  };

  const openEditDialog = (note) => {
    setEditingNote(note);
    setNewNoteText(note.notes);
    setDialogOpen(true);
  };

  const startIndex = (page - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const displayedNotes = filteredNotes.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredNotes.length / notesPerPage);

  if (loading) return (
    <div className={`notes-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading notes...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={`notes-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="error-state">
        <p>⚠️ {error}</p>
        <Button variant="contained" onClick={handleBack}>Return to Customers</Button>
      </div>
    </div>
  );

  return (
    <div className={`notes-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="notes-header">
        <Button variant="contained" onClick={handleBack}>← Back</Button>
        <h2>Notes for {customer?.companyName}</h2>
      </div>

      <div className="notes-controls">
        <div className="search-filter">
          <TextField
            placeholder="Search notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <div className="date-filters">
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              placeholderText="Start Date"
              maxDate={endDate || new Date()}
            />
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              placeholderText="End Date"
              minDate={startDate}
              maxDate={new Date()}
            />
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openCreateDialog}
        >
          Add Note
        </Button>
      </div>

      <div className="notes-grid">
        {displayedNotes.map(note => (
          <div key={note.noteID} className="note-card">
            <div className="note-actions">
              <IconButton onClick={() => openEditDialog(note)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteNote(note.noteID)} size="small">
                <DeleteIcon />
              </IconButton>
            </div>
            <div className="note-date">
              {new Date(note.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className="note-content">
              {note.notes}
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="pagination">
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </div>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={editingNote ? handleUpdateNote : handleCreateNote}
            variant="contained" 
            color="primary"
            disabled={!newNoteText.trim()}
          >
            {editingNote ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerNotes;