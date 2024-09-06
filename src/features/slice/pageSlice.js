import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    selectedPage: 'dashboard',
  },
  reducers: {
    setPage(state, action) {
      state.selectedPage = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export const selectPage = (state) => state.page.selectedPage;
export default pageSlice.reducer;
