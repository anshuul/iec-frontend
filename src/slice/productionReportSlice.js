// productionReportSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const productionReportSlice = createSlice({
  name: "productionReport",
  initialState: {
    data: [],
  },
  reducers: {
    setProductionReportData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProductionReportData } = productionReportSlice.actions;
export default productionReportSlice.reducer;
