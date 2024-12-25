import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    setApplication: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setApplication } = applicationSlice.actions;

export default applicationSlice.reducer;





