import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthTokenFromCookie } from '../auth';
import axiosInstance from './axiosInstance';

const token= getAuthTokenFromCookie()


const initialState = {
  teams: [],
  status: 'idle',
  error: null,
};


export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('https://api.manageyourteam.in/teams/list_teams', {
        headers: {
            token: `${token}`,
        },
      });
      return response.data.teamData;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default teamsSlice.reducer;
