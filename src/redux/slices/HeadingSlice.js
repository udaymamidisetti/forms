import { createSlice } from "@reduxjs/toolkit";

const headingSlice = createSlice({
  name: "headingSlice",
  initialState: {
    heading: {},
  },
  reducers: {
    handleHeading: (state, action) => {
      const { componentId, value } = action.payload;
      state.heading[componentId] = { value };
      // state.heading.push({ componentId, value });
      // state.heading = action.payload;
    },
  },
});

export const { handleHeading } = headingSlice.actions;

export default headingSlice.reducer;
