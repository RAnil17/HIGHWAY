import express from 'express';
import { createNote, deleteNote, getNotes } from '../controllers/notesController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// All notes routes are protected with JWT authentication
router.use(authenticateToken);

// Create a new note
router.post('/', createNote);

// Get all notes for the authenticated user
router.get('/', getNotes);

// Delete a note by ID
router.delete('/:id', deleteNote);

export default router;


