import express from 'express';
import {
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/note.controller';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.post('/', protect, createNote);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

export default router;
