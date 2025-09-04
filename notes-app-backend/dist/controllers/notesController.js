"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotes = exports.deleteNote = exports.createNote = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const createNote = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user._id;
        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Content is required'
            });
        }
        const note = new Note_1.default({
            userId,
            content
        });
        await note.save();
        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: note
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating note',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.createNote = createNote;
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const note = await Note_1.default.findById(id);
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
        await Note_1.default.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Note deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting note',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteNote = deleteNote;
const getNotes = async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await Note_1.default.find({ userId })
            .sort({ createdAt: -1 })
            .select('-__v');
        res.json({
            success: true,
            message: 'Notes fetched successfully',
            data: notes
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching notes',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getNotes = getNotes;
//# sourceMappingURL=notesController.js.map