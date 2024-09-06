import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthTokenFromCookie } from '../auth';
import axiosInstance from './axiosInstance';


const storedToken = getAuthTokenFromCookie();

// export const fetchDashboardTasks = createAsyncThunk(
//   'tasks/fetchDashboardTasks',
//   async (_, { rejectWithValue }) => {
//     try {
//       if (!storedToken) throw new Error('Token not found');

//       const response = await axios.get('https://api.manageyourteam.in/tasks/dashboard_tasks', {
//         headers: {
//           token: `${storedToken}`,
//         },
//       });

//       return response.data.taskData;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


export const fetchDashboardTasks = createAsyncThunk(
  'tasks/fetchDashboardTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/tasks/dashboard_tasks');
      return response.data.taskData;
    } catch (error) {
      // Check if it's an Axios error and return a custom message
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;

      })
      .addCase(fetchDashboardTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
