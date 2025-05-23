import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import { TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Pagination } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import "react-datepicker/dist/react-datepicker.css";
import styles from './CustomerNotes.module.css';
import { customerService } from '../../services/customerService';
import { customerNotesService } from '../../services/customerNotesService';
import { Customer, Note } from '../../types/customerTypes';

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
    if (!custId) return;
    try {
      const [customerData, notesData] = await Promise.all([
        customerService.getById(parseInt(custId)),
        customerNotesService.getAllNotes(parseInt(custId))
      ]);
      
      setCustomer(customerData);
      const sortedNotes = notesData.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setNotes(sortedNotes);
      setFilteredNotes(sortedNotes);
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
    if (!custId) return;
    try {
      const newNote = await customerNotesService.createNote(parseInt(custId), {
        custID: parseInt(custId),
        date: new Date().toISOString(),
        notes: newNoteText
      });
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
      const updatedNote = await customerNotesService.updateNote(editingNote.noteID, {
        ...editingNote,
        notes: newNoteText
      });
      setNotes(prev => prev.map(note => 
        note.noteID === editingNote.noteID ? updatedNote : note
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
      await customerNotesService.deleteNote(noteId);
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
    <div className={`${styles['notes-container']} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles['loading-state']}>
        <div className={styles.spinner}></div>
        <p>Loading notes...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={`${styles['notes-container']} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles['error-state']}>
        <p>⚠️ {error}</p>
        <Button variant="contained" color="primary" onClick={handleBack}>Return to Customers</Button>
      </div>
    </div>
  );

  return (    <div className={`${styles['notes-container']} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles['notes-header']}>
        <Button variant="contained" color="primary" onClick={handleBack}>← Back</Button>
        <h2>Notes for {customer?.companyName}</h2>
      </div>

      <div className={styles['notes-controls']}>
        <div className={styles['search-filter']}>
          <TextField
            placeholder="Search notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <div className={styles['date-filters']}><DatePicker
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
      </div>      <div className={styles['notes-grid']}>
        {displayedNotes.map(note => (
          <div key={note.noteID} className={styles['note-card']}>
            <div className={styles['note-actions']}>              <IconButton onClick={() => openEditDialog(note)} size="small" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteNote(note.noteID)} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </div>
            <div className={styles['note-date']}>
              {new Date(note.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className={styles['note-content']}>
              {note.notes}
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className={styles.pagination}>
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
          <Button color="inherit" onClick={() => setDialogOpen(false)}>Cancel</Button>
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