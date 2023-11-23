import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  initialData: {
    customText: "",
  },
  byId: {},
};
const CustomTextSlice = createSlice({
  name: "CustomTextSlice",
  initialState,
  reducers: {
    addcustomTextInstance: (state, action) => {
      const { componentId } = action.payload;
      // state.byId[componentId] = {
      //   ...state.initialData,
      // };
      const componentExists = Object.keys(state.byId).includes(componentId);
      if (!componentExists) {
        // If it doesn't exist, add a new instance
        // state.allIds.push(componentId);
        state.byId[componentId] = {
          ...state.initialData,
        };
      }
    },
    handleCustomText: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      state.byId[componentId].customText = value;
    },
  },
});

export const { addcustomTextInstance, handleCustomText } =
  CustomTextSlice.actions;

export default CustomTextSlice.reducer;
