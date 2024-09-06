import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {getAuthTokenFromCookie,getAuthUserFromCookie} from '../auth'

const token = getAuthTokenFromCookie()
const userData = getAuthUserFromCookie();
const user = userData ? JSON.parse(userData) : null;



// Define the async thunk
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.manageyourteam.in/users/user_details', {
        headers: {
          token: `${token}`, // Replace `token` with your actual token variable or state
        },
        params: { id }, // Pass id as query parameter
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Define the initial state
const initialState = {
  userDetails: null,
  status: 'idle',
  error: null,
};

// Create the slice
const userSlice = createSlice({
  name: 'userdetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload.userDetails;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

  