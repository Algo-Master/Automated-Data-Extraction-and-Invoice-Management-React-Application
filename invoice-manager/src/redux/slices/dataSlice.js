import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs

const initialState = [];

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Action to update a single record using id as the unique identifier
    updateRecord: (state, action) => {
      const { id, updatedFields } = action.payload;
      const recordIndex = state.findIndex((record) => record.id === id);
      console.log(recordIndex, updatedFields);
      if (recordIndex >= 0) {
        state[recordIndex] = { ...state[recordIndex], ...updatedFields };
        console.log({ ...state[recordIndex], ...updatedFields });
      } else {
        console.error("Failed to update record: Record not found for id", id);
      }
    },
    // Action to merge new data with the existing state
    setUploadedData: (state, action) => {
      const newData = action.payload.map((record) => ({
        ...record,
        id: uuidv4(), // Assign unique ID
      }));
      state.push(...newData);
    },
  },
});

// Export the actions
export const { updateRecord, setUploadedData } = dataSlice.actions;
export default dataSlice.reducer;
