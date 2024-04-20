// productionReportSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const productionReprtSlice = createSlice({
  name: "productionReprtSlice",
  initialState: {
    data: null,
  },
  reducers: {
    setProductionReportData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProductionReportData } = productionReprtSlice.actions;
export default productionReprtSlice.reducer;
