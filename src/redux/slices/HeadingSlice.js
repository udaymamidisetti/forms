import { createSlice } from "@reduxjs/toolkit";

const headingSlice = createSlice({
  name: "headingSlice",
  initialState: {
    heading: "",
  },
  reducers: {
    handleHeading: (state, action) => {
      state.heading = action.payload;
    },
  },
});

export const { handleHeading } = headingSlice.actions;

export default headingSlice.reducer;
