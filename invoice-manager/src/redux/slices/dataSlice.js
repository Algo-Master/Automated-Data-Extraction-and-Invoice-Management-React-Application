import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Action to update a single record using email as the unique identifier
    updateRecord: (state, action) => {
      const { email, updatedFields } = action.payload;
      const recordIndex = state.findIndex((record) => record.email === email);
      if (recordIndex !== -1) {
        state[recordIndex] = { ...state[recordIndex], ...updatedFields };
      }
    },
    // Action to merge new data with the existing state
    setUploadedData: (state, action) => {
      const newData = action.payload;

      newData.forEach((newRecord) => {
        const existingIndex = state.findIndex(
          (record) => record.email === newRecord.email
        );

        state.push(newRecord);
      });
    },
  },
});

// Export the actions
export const { updateRecord, setUploadedData } = dataSlice.actions;
export default dataSlice.reducer;
