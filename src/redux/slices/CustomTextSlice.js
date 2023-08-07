import { createSlice } from "@reduxjs/toolkit";

const CustomTextSlice = createSlice({
  name: "CustomTextSlice",
  initialState: {
    customText: "",
  },
  reducers: {
    handleCustomText: (state, action) => {
      state.customText = action.payload;
    },
  },
});

export const { handleCustomText } = CustomTextSlice.actions;

export default CustomTextSlice.reducer;
