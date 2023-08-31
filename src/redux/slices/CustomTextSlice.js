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
    addustomTextInstance: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId] = {
        ...state.initialData,
      };
    },
    handleCustomText: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].customText = value;
    },
  },
});

export const { handleCustomText } = CustomTextSlice.actions;

export default CustomTextSlice.reducer;
