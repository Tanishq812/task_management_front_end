// tasksSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from './axiosInstance';
import { getAuthTokenFromCookie } from '../auth';

const token =getAuthTokenFromCookie()
// Define the async thunk
export const fetchTasksReport = createAsyncThunk(
  'tasks/fetchTasksReport',
  async ({ fromDate, toDate, employeeId, teamId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://api.manageyourteam.in/tasks/tasks_report_list',
        {
          from_date: fromDate,
          to_date: toDate,
          employee_id: employeeId,
          team_id: teamId,
          status: status,
        },
        {
          headers: {
            token: 'your-token', 
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Define the initial state
const initialState = {
  tasksReport: null,
  status: 'idle',
  error: null,
};

// Create the slice
const tasksReportSlice = createSlice({
  name: 'tasksreport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasksReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasksReport = action.payload; // Update state with the fetched data
      })
      .addCase(fetchTasksReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default tasksReportSlice.reducer;
