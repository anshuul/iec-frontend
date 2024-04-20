// routingSheetSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const routingSheetSlice = createSlice({
  name: "routingSheetSlice",
  initialState: {
    data: null,
  },
  reducers: {
    setRoutingSheetData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRoutingSheetData } = routingSheetSlice.actions;

export default routingSheetSlice.reducer;
