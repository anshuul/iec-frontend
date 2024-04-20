import { configureStore } from "@reduxjs/toolkit";
import customerPOReducer from "@/slice/customerPOSlice";
import routingSheetReducer from "@/slice/routingSheetSlice";
import productionReportReducer from "@/slice/productionReportSlice";

const store = configureStore({
  reducer: {
    customerPO: customerPOReducer,
    routingSheetData: routingSheetReducer,
    productionReport: productionReportReducer, 
  },
});

export default store;
