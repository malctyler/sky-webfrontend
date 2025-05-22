import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import { TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Pagination } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import "react-datepicker/dist/react-datepicker.css";
import './CustomerNotes.css';
import axios from 'axios';
import { baseUrl } from '../config';
import { Note, Customer } from '../types/notes';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const userStr = localStorage.getItem('user');
  const token = userStr ? JSON.parse(userStr)?.token : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const CustomerNotes: React.FC = () => {
  const params = useParams();
  const custId = params.custId;
  const navigate = useNavigate();
  const { isDarkMode } = useCustomTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState<number>(1);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const notesPerPage = 6;

  useEffect(() => {
    fetchCustomerAndNotes();
  }, [custId]);

  useEffect(() => {
    filterNotes();
  }, [notes, searchText, startDate, endDate]);

  const fetchCustomerAndNotes = async (): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      const [customerResponse, notesResponse] = await Promise.all([
        axios.get<Customer>(`${baseUrl}/Customers/${custId}`, { headers }),
        axios.get<Note[]>(`${baseUrl}/Notes`, { headers })
      ]);
      const customerData = customerResponse.data;
      const notesData = notesResponse.data;
      setCustomer(customerData);
      const customerNotes = notesData
        .filter((note: Note) => note.custID === parseInt(custId as string))
        .sort((a: Note, b: Note) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setNotes(customerNotes);
      setFilteredNotes(customerNotes);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const filterNotes = (): void => {
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

  const handleCreateNote = async (): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post<Note>(`${baseUrl}/Notes`, {
        custID: parseInt(custId as string),
        date: new Date().toISOString(),
        notes: newNoteText
      }, { headers });
      const newNote = response.data;
      setNotes(prev => [newNote, ...prev]);
      setDialogOpen(false);
      setNewNoteText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleUpdateNote = async (): Promise<void> => {
    if (!editingNote) return;
    
    try {
      const headers = getAuthHeaders();
      await axios.put<Note>(`${baseUrl}/Notes/${editingNote.noteID}`, {
        ...editingNote,
        notes: newNoteText
      }, { headers });
      setNotes(prev => prev.map(note => 
        note.noteID === editingNote.noteID 
          ? { ...note, notes: newNoteText }
          : note
      ));
      setDialogOpen(false);
      setEditingNote(null);
      setNewNoteText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDeleteNote = async (noteId: number): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${baseUrl}/Notes/${noteId}`, { headers });
      setNotes(prev => prev.filter(note => note.noteID !== noteId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleBack = (): void => {
    navigate('/customers');
  };

  const openCreateDialog = (): void => {
    setEditingNote(null);
    setNewNoteText('');
    setDialogOpen(true);
  };

  const openEditDialog = (note: Note): void => {
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
          <div className="date-filters">            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              placeholderText="Start Date"
              maxDate={endDate || new Date()}
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              placeholderText="End Date"
              minDate={startDate || undefined}
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