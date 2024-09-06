import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAuthTokenFromCookie } from '../auth';
import { removeAuthUserFromCookie } from '../auth';
import { removeAuthTokenFromCookie } from '../auth';


const storedToken =getAuthTokenFromCookie()


export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {



    const response = await axios.get('https://api.manageyourteam.in/users/log_out', {
        headers: {
          token: `${storedToken}`,
        },
      });
    
// console.log('login responce',response);

      if (response.status === 200 && !response.data.error) {
        removeAuthTokenFromCookie();
        removeAuthUserFromCookie();

        return response.data; 
      } else {
        return rejectWithValue(response.data.title || 'Logout failed');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Logout failed');
    }
  }
);

// Create a slice
const logoutSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: true, 
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = logoutSlice.actions;

export default logoutSlice.reducer;
