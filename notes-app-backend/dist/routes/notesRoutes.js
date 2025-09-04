"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesController_1 = require("../controllers/notesController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// All notes routes are protected with JWT authentication
router.use(authMiddleware_1.authenticateToken);
// Create a new note
router.post('/', notesController_1.createNote);
// Get all notes for the authenticated user
router.get('/', notesController_1.getNotes);
// Delete a note by ID
router.delete('/:id', notesController_1.deleteNote);
exports.default = router;
//# sourceMappingURL=notesRoutes.js.map