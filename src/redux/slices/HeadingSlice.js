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
      const componentExists = Object.keys(state.byId).includes(componentId);
      if (!componentExists) {
        // If it doesn't exist, add a new instance
        // state.allIds.push(componentId);
        state.byId[componentId] = {
          ...state.initialData,
        };
      }
    },
    handleHeading: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].heading = value;
      // state.heading.push({ componentId, value });
      // state.heading = action.payload;
    },
    toggleMinimize: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].minimize = !state.byId[componentId].minimize;
    },
  },
});

export const { addHeadingInstance, handleHeading, toggleMinimize } =
  headingSlice.actions;

export default headingSlice.reducer;
