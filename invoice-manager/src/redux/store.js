import { configureStore } from '@reduxjs/toolkit';
import uploadedDataSlice from './slices/uploadedDataSlice';

const store = configureStore({
  reducer: {
    uploadedData: uploadedDataSlice,
  },
});

export default store;