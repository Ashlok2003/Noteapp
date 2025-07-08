import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/note-slice';
import authReducer from './slices/auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
