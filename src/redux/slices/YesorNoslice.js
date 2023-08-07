import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  yesorNoQuestion: "What question would you like to ask?",
  requiredOption: false,
  hideNumber: true,
};
export const YesorNoslice = createSlice({
  name: "YesorNO",
  initialState,
  reducers: {
    handleQuestionInput: (state, action) => {
      state.yesorNoQuestion = action.payload;
    },
    handleRequiredOption: (state) => {
      state.requiredOption = !state.requiredOption;
      console.log(state.requiredOption);
    },
    handleHideNumber: (state) => {
      state.hideNumber = !state.hideNumber;
    },
  },
});
export const { handleQuestionInput, handleRequiredOption, handleHideNumber } =
  YesorNoslice.actions;
export default YesorNoslice.reducer;
