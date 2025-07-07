import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: string;
  text: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ id: string; text: string; shared?: boolean; access?: 'private' | 'public' }>) => {
      state.notes.push({
        id: action.payload.id,
        text: action.payload.text,
      });
    },
    updateNote: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index].text = action.payload.text;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
