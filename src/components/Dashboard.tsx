import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit, Trash2, LogOut, User, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import './Dashboard.css';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [newNote, setNewNote] = useState({
    title: '',
    content: ''
  });

  const [editNote, setEditNote] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    // Load mock notes for demo
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'Welcome to Note Taking App!',
        content: 'This is a demo note. You can create, edit, and delete notes. Try creating your own note!',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Features Available',
        content: '✅ Create notes\n✅ Edit notes\n✅ Delete notes\n✅ Search notes\n✅ Responsive design\n✅ Beautiful UI',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    setNotes(mockNotes);
  }, []);

  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newNoteObj: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setNotes([newNoteObj, ...notes]);
      setNewNote({ title: '', content: '' });
      setIsCreatingNote(false);
      toast.success('Note created successfully!');
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateNote = async () => {
    if (!editingNote || (!editNote.title.trim() && !editNote.content.trim())) return;

    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedNote: Note = {
        ...editingNote,
        title: editNote.title || editingNote.title,
        content: editNote.content || editingNote.content,
        updatedAt: new Date().toISOString()
      };
      
      setNotes(notes.map(note => 
        note.id === editingNote.id ? updatedNote : note
      ));
      setEditingNote(null);
      setEditNote({ title: '', content: '' });
      toast.success('Note updated successfully!');
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotes(notes.filter(note => note.id !== noteId));
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (note: Note) => {
    setEditingNote(note);
    setEditNote({
      title: note.title,
      content: note.content
    });
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setEditNote({ title: '', content: '' });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="user-info">
              <div className="user-avatar">
                <User size={24} />
              </div>
              <div className="user-details">
                <h2>Welcome, {user?.name}!</h2>
                <p>{user?.email}</p>
              </div>
            </div>
            <button onClick={logout} className="btn btn-secondary logout-btn">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-content">
            <div className="search-section">
              <div className="search-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <button
                onClick={() => setIsCreatingNote(true)}
                className="btn btn-primary create-note-btn"
                disabled={isLoading}
              >
                <Plus size={20} />
                New Note
              </button>
            </div>

            {isCreatingNote && (
              <div className="note-form">
                <h3>Create New Note</h3>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="form-input"
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Note content..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className="form-input note-textarea"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>
                <div className="note-form-actions">
                  <button
                    onClick={createNote}
                    className="btn btn-primary"
                    disabled={isLoading || !newNote.title.trim() || !newNote.content.trim()}
                  >
                    {isLoading ? 'Creating...' : 'Create Note'}
                  </button>
                  <button
                    onClick={() => {
                      setIsCreatingNote(false);
                      setNewNote({ title: '', content: '' });
                    }}
                    className="btn btn-secondary"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="notes-section">
              <h3>Your Notes ({filteredNotes.length})</h3>
              {isLoading && <p className="loading">Loading notes...</p>}
              
              {!isLoading && filteredNotes.length === 0 && (
                <div className="empty-state">
                  <p>No notes found. Create your first note to get started!</p>
                </div>
              )}

              <div className="notes-grid">
                {filteredNotes.map(note => (
                  <div key={note.id} className="note-card">
                    {editingNote?.id === note.id ? (
                      <div className="note-edit-form">
                        <input
                          type="text"
                          value={editNote.title}
                          onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                          className="form-input"
                          disabled={isLoading}
                        />
                        <textarea
                          value={editNote.content}
                          onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                          className="form-input note-textarea"
                          rows={3}
                          disabled={isLoading}
                        />
                        <div className="note-edit-actions">
                          <button
                            onClick={updateNote}
                            className="btn btn-primary btn-sm"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Updating...' : 'Update'}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="btn btn-secondary btn-sm"
                            disabled={isLoading}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="note-header">
                          <h4>{note.title}</h4>
                          <div className="note-actions">
                            <button
                              onClick={() => startEditing(note)}
                              className="btn-icon"
                              title="Edit note"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="btn-icon btn-icon-danger"
                              title="Delete note"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="note-content">{note.content}</p>
                        <div className="note-footer">
                          <small>Created: {formatDate(note.createdAt)}</small>
                          {note.updatedAt !== note.createdAt && (
                            <small>Updated: {formatDate(note.updatedAt)}</small>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
