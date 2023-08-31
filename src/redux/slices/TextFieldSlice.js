import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: {
    question: "What question would you like to ask?",
    answerText: null,
    requiredOption: false,
    hideNumber: true,
    initialValue: "",
  },
  byId: {},
};
export const TextFieldSlice = createSlice({
  name: "textField",
  initialState,
  reducers: {
    addTextFieldInstance: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId] = {
        ...state.initialData,
      };
    },
    handleInputChange: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].question = value;
    },
    handleAnswerText1: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].answerText = "single";
    },
    handleAnswerText2: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].answerText = "multiple";
    },
    handleRequiredOption: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].requiredOption =
        !state.byId[componentId].requiredOption;
    },
    handleHideNumber: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].hideNumber = !state.byId[componentId].hideNumber;
    },
  },
});
export const {
  addTextFieldInstance,
  handleInputChange,
  handleAnswerText1,
  handleAnswerText2,
  handleRequiredOption,
  handleHideNumber,
} = TextFieldSlice.actions;

export default TextFieldSlice.reducer;
