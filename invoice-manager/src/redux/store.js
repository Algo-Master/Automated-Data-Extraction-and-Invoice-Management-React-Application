import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './slices/invoicesSlice';
import productsSlice from './slices/productsSlice';
import customersSlice from './slices/customersSlice';

const store = configureStore({
  reducer: {
    invoices: invoicesSlice,
    products: productsSlice,
    customers: customersSlice,
  },
});

export default store;