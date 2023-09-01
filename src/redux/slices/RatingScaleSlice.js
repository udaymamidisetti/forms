import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: {
    question: "What question would you like to ask?",
    requiredOption: false,
    hideNumber: true,
    image: null,
    choiceLayout: "",
    agreeOptions: "agree2",
    naCondition: false,
    displayMode: "Radio",
    scoreDirection: "Ascending",
  },
  byId: {},
};

export const RatingScaleSlice = createSlice({
  name: "ratingScale",
  initialState,
  reducers: {
    addRatingScaleInstance: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId] = {
        ...state.initialData,
      };
    },
    handleInputChange: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].question = value;
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
    handleImages: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].image = URL.createObjectURL(value);
    },
    handleChoiceLayout: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].choiceLayout = value;
    },
    handleAgreeOptions: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].agreeOptions = value;
    },
    handleNaCondition: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].naCondition =
        !state.byId[componentId].naCondition;
    },
    handleDisplayMode: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].displayMode = value;
    },
    handleScoreDirection: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].scoreDirection = value;
    },
  },
});

export const {
  addRatingScaleInstance,
  handleInputChange,
  handleRequiredOption,
  handleHideNumber,
  handleAgreeOptions,
  handleNaCondition,
  handleDisplayMode,
  handleImages,
  handleChoiceLayout,
  handleScoreDirection,
} = RatingScaleSlice.actions;
export default RatingScaleSlice.reducer;
