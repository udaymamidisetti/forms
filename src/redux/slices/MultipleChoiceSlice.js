import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";

const initialState = {
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
      // const { componentId, value } = action.payload;
      // state.questionInput[componentId] = value;
      state.questionInput = action.payload;
    },
    handleOptionChange: (state, action) => {
      const { index, value } = action.payload;
      state.options[index] = { ...state.options[index], title: value };
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
    setOtherTextField: (state, action) => {
      const index = action.payload;
      state.options[index].includeOtherTextField =
        !state.options[index].includeOtherTextField;
    },
    setIncludeImage: (state, action) => {
      const index = action.payload;
      state.options[index].includeImage = !state.options[index].includeImage;
    },
    handleSetImage: (state, action) => {
      const { url, index } = action.payload;
      state.options[index].image = URL.createObjectURL(url);
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
  setOtherTextField,
  setIncludeImage,
  handleSetImage,
} = MultipleChoiceSlice.actions;

export default MultipleChoiceSlice.reducer;
