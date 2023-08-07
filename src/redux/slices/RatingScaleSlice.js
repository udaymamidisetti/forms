import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionInput: "What question would you like to ask?",
  requiredOption: false,
  hideNumber: true,
  agreeOptions: "agree2",
  naCondition: false,
  displayMode: "Radio",
};

export const RatingScaleSlice = createSlice({
  name: "ratingScale",
  initialState,
  reducers: {
    handleInputChange: (state, action) => {
      state.questionInput = action.payload;
      console.log(state.questionInput);
    },
    handleRequiredOption: (state) => {
      state.requiredOption = !state.requiredOption;
      console.log(state.requiredOption);
    },
    handleHideNumber: (state) => {
      state.hideNumber = !state.hideNumber;
    },
    handleAgreeOptions: (state, action) => {
      state.agreeOptions = action.payload;
      console.log(state.agreeOptions);
    },
    handleNaCondition: (state, action) => {
      state.naCondition = !state.naCondition;
    },
    handleDisplayMode: (state, action) => {
      state.displayMode = action.payload;
    },
  },
});

export const {
  handleInputChange,
  handleRequiredOption,
  handleHideNumber,
  handleAgreeOptions,
  handleNaCondition,
  handleDisplayMode,
} = RatingScaleSlice.actions;
export default RatingScaleSlice.reducer;
