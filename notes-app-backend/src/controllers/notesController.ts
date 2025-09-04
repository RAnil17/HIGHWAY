import { Request, Response } from 'express';
import Note from '../models/Note';

interface AuthRequest extends Request {
  user?: any;
}

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    const note = new Note({
      userId,
      content
    });

    await note.save();

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating note',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    if (note.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own notes'
      });
    }

    await Note.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting note',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;

    const notes = await Note.find({ userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      message: 'Notes fetched successfully',
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notes',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
