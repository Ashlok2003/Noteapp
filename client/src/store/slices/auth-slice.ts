/* eslint-disable @typescript-eslint/no-explicit-any */
import * as api from '@/api/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  name?: string;
  dob?: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error?: string;
  step: 'idle' | 'otp_pending' | 'verified';
  mode: 'signup' | 'signin';
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: undefined,
  step: 'idle',
  mode: 'signup',
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { name, dob, email }: { name: string; dob: string; email: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await api.Signup({ email, name, dob });
      return { email, name, dob, userId: data.userId };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const data = await api.OTPVerify({ email, otp });
      return { user: { email, name: data.name, dob: data.dob }, token: data.token };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'OTP verification failed');
    }
  },
);

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      await api.Login({ email });
      return { email };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Signin failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = undefined;
      state.step = 'idle';
    },
    setMode: (state, action) => {
      state.mode = action.payload;
      state.step = 'idle';
      state.user = null;
      state.token = null;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
          name: action.payload.name,
          dob: action.payload.dob,
        };
        state.step = 'otp_pending';
        state.mode = 'signup';
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
        };
        state.step = 'otp_pending';
        state.mode = 'signin';
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.step = 'verified';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setMode } = authSlice.actions;
export default authSlice.reducer;
