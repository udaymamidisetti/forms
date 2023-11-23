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
    minimize: false,
  },
  byId: {},
};

export const RatingScaleSlice = createSlice({
  name: "ratingScale",
  initialState,
  reducers: {
    addRatingScaleInstance: (state, action) => {
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
    toggleMinimize: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].minimize = !state.byId[componentId].minimize;
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
  toggleMinimize,
} = RatingScaleSlice.actions;
export default RatingScaleSlice.reducer;
