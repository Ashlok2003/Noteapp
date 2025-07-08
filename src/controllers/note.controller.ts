import { Request, Response } from 'express';
import Note, { INote } from '../models/note';
import User from '../models/user';

interface CreateNoteRequest extends Request {
  body: {
    title: string;
    content: string;
  };
}

interface UpdateNoteRequest extends Request {
  body: {
    title?: string;
    content?: string;
  };
  params: {
    id: string;
  };
}

export const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const notes = await Note.find({ userId });

    const formattedNotes = notes.map((note) => ({
      id: note._id!.toString(),
      content: note.content,
    }));

    res.status(200).json({ notes: formattedNotes });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: (error as Error).message,
    });
  }
};

export const createNote = async (
  req: CreateNoteRequest & { user?: { id: string } },
  res: Response,
): Promise<void> => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({
      message: 'Content is required',
    } as const);
    return;
  }

  try {
    const note = await Note.create({
      content,
      userId: req.user!.id,
    });
    await User.findByIdAndUpdate(req.user!.id, {
      $push: { notes: note._id },
    });
    res.status(201).json({
      message: 'Note created',
      note: { id: note._id, content },
    } as const);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: (error as Error).message,
    } as const);
  }
};

export const updateNote = async (
  req: UpdateNoteRequest & { user?: { id: string } },
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    res.status(400).json({
      message: 'Content is required for update',
    } as const);
    return;
  }

  try {
    const note = await Note.findOne({
      _id: id,
      userId: req.user!.id,
    });
    if (!note) {
      res.status(404).json({ message: 'Note not found' } as const);
      return;
    }

    const updateData: Partial<INote> = {};
    updateData.content = content;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );
    res.status(200).json({
      message: 'Note updated',
      note: {
        id: updatedNote!._id,
        content: updatedNote!.content,
      },
    } as const);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: (error as Error).message,
    } as const);
  }
};

export const deleteNote = async (
  req: Request & { user?: { id: string } },
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const note = await Note.findOne({
      _id: id,
      userId: req.user!.id,
    });
    if (!note) {
      res.status(404).json({ message: 'Note not found' } as const);
      return;
    }

    await Note.findByIdAndDelete(id);
    await User.findByIdAndUpdate(req.user!.id, {
      $pull: { notes: id },
    });
    res.status(200).json({ message: 'Note deleted' } as const);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: (error as Error).message,
    } as const);
  }
};
