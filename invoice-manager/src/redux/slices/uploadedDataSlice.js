import { createSlice } from '@reduxjs/toolkit';

const uploadedDataSlice = createSlice({
  name: 'uploadedData',
  initialState: {
    invoices: [],
    products: [],
    customers: [],
  },
  reducers: {
    setUploadedData: (state, action) => {
      // Update state with the parsed JSON data
      state.invoices = action.payload.invoices || [];
      state.products = action.payload.products || [];
      state.customers = action.payload.customers || [];
    },
  },
});

export const { setUploadedData } = uploadedDataSlice.actions;
export default uploadedDataSlice.reducer;
