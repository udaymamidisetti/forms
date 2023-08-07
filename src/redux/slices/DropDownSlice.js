import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";

const initialState = {
  questionInput: "What question would you like to ask?",
  answerText: null,
  requiredOption: false,
  hideNumber: true,
  options: data,
  isExpanded: false,
};

export const DropDownSlice = createSlice({
  name: "dropDown",
  initialState,
  reducers: {
    handleInputChange: (state, action) => {
      state.questionInput = action.payload;
      console.log(state.questionInput);
    },
    handleOptionChange: (state, action) => {
      const { index, value } = action.payload;
      state.options[index] = { ...state.options[index], title: value };
      console.log(value);
    },
    handleRequiredOption: (state) => {
      state.requiredOption = !state.requiredOption;
      console.log(state.requiredOption);
    },
    handleHideNumber: (state) => {
      state.hideNumber = !state.hideNumber;
    },
    toggleExpansion: (state, action) => {
      const index = action.payload;
      state.options[index].expanded = !state.options[index].expanded;
    },
    addNewOption: (state, action) => {
      console.log(state.options);
      // return [...state.options, action.payload];
      state.options.push(action.payload);
    },
    addOtherChoice: (state, action) => {
      state.options.push(action.payload);
    },
  },
});
export const {
  handleInputChange,
  handleRequiredOption,
  handleHideNumber,
  handleOptionChange,
  toggleExpansion,
  addNewOption,
  addOtherChoice,
  deleteOptionContent,
} = DropDownSlice.actions;

export default DropDownSlice.reducer;
