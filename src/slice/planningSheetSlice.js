// planningSheetSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const planningSheetSlice = createSlice({
  name: 'planningSheet',
  initialState: {
    rowData: [],
  },
  reducers: {
    setRowData: (state, action) => {
      state.rowData = action.payload;
    },
  },
});

export const { setRowData } = planningSheetSlice.actions;

export default planningSheetSlice.reducer;
