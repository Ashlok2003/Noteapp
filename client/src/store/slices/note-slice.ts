/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/api/note';

export interface Note {
  id: string;
  content: string;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error?: string;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: undefined,
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (token: string, thunkAPI) => {
  try {
    return await api.fetchNotes(token);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch notes');
  }
});

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (
    {
      token,
      note,
    }: {
      token: string;
      note: { content: string };
    },
    thunkAPI,
  ) => {
    try {
      return await api.createNote(token, note);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create note');
    }
  },
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (
    {
      token,
      id,
      data,
    }: {
      token: string;
      id: string;
      data: { content?: string };
    },
    thunkAPI,
  ) => {
    try {
      console.log(data);
      return await api.updateNote(token, id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update note');
    }
  },
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async ({ token, id }: { token: string; id: string }, thunkAPI) => {
    try {
      await api.deleteNote(token, id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete note');
    }
  },
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) state.notes[index] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
