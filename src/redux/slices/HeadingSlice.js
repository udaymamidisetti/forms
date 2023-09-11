import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: {
    heading: "Enter your heading here",
  },
  byId: {},
};

const headingSlice = createSlice({
  name: "headingSlice",
  initialState,
  reducers: {
    addHeadingInstance: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId] = {
        ...state.initialData,
      };
    },
    handleHeading: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].heading = value;
      // state.heading.push({ componentId, value });
      // state.heading = action.payload;
    },
  },
});

export const { addHeadingInstance, handleHeading } = headingSlice.actions;

export default headingSlice.reducer;
