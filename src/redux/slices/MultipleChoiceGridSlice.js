import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";
import fieldData from "../../fieldData";

const MultipleChoiceGridSlice = createSlice({
  name: "MultiplechoiceGrid",
  initialState: {
    question: "What question would you like to ask?",
    AnswerRequired: false,
    HideNumber: false,
    RandomFields: false,
    RandomChoices: false,
    labelColumnWidth: 40,
    AllowMultipleResponce: false,
    optionsData: data,
    fieldsData: fieldData,
  },
  reducers: {
    handleQuestionChange: (state, action) => {
      state.question = action.payload;
    },
    handleHideNumber: (state) => {
      state.HideNumber = !state.HideNumber;
    },
    handleRandomfields: (state) => {
      state.RandomFields = !state.RandomFields;
    },
    handleRandomChoices: (state) => {
      state.RandomChoices = !state.RandomChoices;
    },
    handleAnswerRequired: (state) => {
      state.AnswerRequired = !state.AnswerRequired;
    },
    handleColumnWidth: (state, action) => {
      state.labelColumnWidth = action.payload;
    },
    handleMultipleResponce: (state) => {
      state.AllowMultipleResponce = !state.AllowMultipleResponce;
    },
    handleAddField: (state, action) => {
      state.fieldsData.push(action.payload);
    },
    handleDeleteField: (state, action) => {
      const updated = [...state.fieldsData];
      state.fieldsData = updated.filter((_, index) => index !== action.payload);
    },
    handleAddOption: (state, action) => {
      state.optionsData.push(action.payload);
    },
    handleDeleteOption: (state, action) => {
      const updated = [...state.optionsData];
      state.optionsData = updated.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});
export const {
  handleQuestionChange,
  handleHideNumber,
  handleRandomfields,
  handleRandomChoices,
  handleAnswerRequired,
  handleColumnWidth,
  handleMultipleResponce,
  handleAddField,
  handleDeleteField,
  handleAddOption,
  handleDeleteOption,
} = MultipleChoiceGridSlice.actions;
export default MultipleChoiceGridSlice.reducer;
