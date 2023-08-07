import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  id: uuidv4(),
  questionInput: "What question would you like to ask?",
  answerText: null,
  requiredOption: false,
  hideNumber: true,
  options: [...data],
  isExpanded: false,
  randomChoice: false,
  choiceLayout: "Vertical",
  images: null,
  multipleAnswers: false,
  bulkOptions: [],
};

export const MultipleChoiceSlice = createSlice({
  name: "multipleChoice",
  initialState,
  reducers: {
    handleInputChange: (state, action) => {
      state.questionInput = action.payload;
    },
    handleOptionChange: (state, action) => {
      const updated = [...state.options];
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
    deleteOptionContent: (state, action) => {
      const updated = [...state.options];
      state.options = updated.filter((_, index) => index !== action.payload);
    },
    handleRandomChoice: (state) => {
      state.randomChoice = !state.randomChoice;
    },
    handleChoiceLayout: (state, action) => {
      state.choiceLayout = action.payload;
    },
    handleImages: (state, action) => {
      state.images = URL.createObjectURL(action.payload);
    },
    handleMultipleAnswers: (state) => {
      state.multipleAnswers = !state.multipleAnswers;
    },
    handleBulkAdd: (state, action) => {
      state.options.splice(0);
      state.options = action.payload;
    },
    setOrder: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removedOption] = state.options.splice(sourceIndex, 1);
      state.options.splice(destinationIndex, 0, removedOption);
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
  handleChoiceLayout,
  handleImages,
  handleRandomChoice,
  handleMultipleAnswers,
  handleBulkAdd,
  reorderOptions,
  setOrder,
} = MultipleChoiceSlice.actions;

export default MultipleChoiceSlice.reducer;
