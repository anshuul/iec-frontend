// customerPOSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const customerPOSlice = createSlice({
  name: "customerPO",
  initialState: {
    data: null,
  },
  reducers: {
    setCustomerPOData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCustomerPOData } = customerPOSlice.actions;

export default customerPOSlice.reducer;
