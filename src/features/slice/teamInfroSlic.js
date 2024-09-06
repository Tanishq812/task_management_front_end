// teamSlice.js (Redux Slice)
import { createSlice } from '@reduxjs/toolkit';

const teamTeamSlice = createSlice({
  name: 'teaminfo',
  initialState: {
    selectedTeam: '',
    selectedEmployee: '',
  },
  reducers: {
    setSelectedTeam(state, action) {
      state.selectedTeam = action.payload;
    },
    setSelectedEmployee(state, action) {
      state.selectedEmployee = action.payload;
    },
  },
});

export const { setSelectedTeam, setSelectedEmployee } = teamTeamSlice.actions;
export default teamTeamSlice.reducer;
