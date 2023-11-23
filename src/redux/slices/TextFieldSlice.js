import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: {
    question: "What question would you like to ask?",
    answerText: "single",
    requiredOption: false,
    hideNumber: true,
    initialValue: "",
    image: null,
    minimize: false,
  },
  byId: {},
};
export const TextFieldSlice = createSlice({
  name: "textField",
  initialState,
  reducers: {
    addTextFieldInstance: (state, action) => {
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
    handleInitialValue: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].initialValue = value;
    },
    handleImages: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].image = URL.createObjectURL(value);
    },
    toggleMinimize: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].minimize = !state.byId[componentId].minimize;
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
  handleInitialValue,
  handleImages,
  toggleMinimize,
} = TextFieldSlice.actions;

export default TextFieldSlice.reducer;
