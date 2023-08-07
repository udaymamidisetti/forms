import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionInput: "What question would you like to ask?",
  answerText: null,
  requiredOption: false,
  hideNumber: true,
};
export const TextFieldSlice = createSlice({
  name: "textField",
  initialState,
  reducers: {
    handleInputChange: (state, action) => {
      state.questionInput = action.payload;
      console.log(state.questionInput);
    },
    handleAnswerText1: (state) => {
      state.answerText = "single";
    },
    handleAnswerText2: (state) => {
      state.answerText = "multiple";
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
export const {
  handleInputChange,
  handleAnswerText1,
  handleAnswerText2,
  handleRequiredOption,
  handleHideNumber,
} = TextFieldSlice.actions;

export default TextFieldSlice.reducer;
