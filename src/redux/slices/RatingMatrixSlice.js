import { createSlice } from "@reduxjs/toolkit";
import fieldData from "../../fieldData";

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
    randomFields: false,
    randomChoice: false,
    columnWidth: null,
    fieldsData: [...fieldData],
    scaleType: null,
  },
  byId: {},
};

const RatingMatrixSlice = createSlice({
  name: "RatingMatrix",
  initialState,
  reducers: {
    addRatingMatrixInstance: (state, action) => {
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
      const { componentId, value } = action.payload;
      state.byId[componentId].requiredOption = value;
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
    handleRandomFields: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].randomFields =
        !state.byId[componentId].randomFields;
    },
    handleRandomChoice: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].randomChoice =
        !state.byId[componentId].randomChoice;
    },
    handleColumnWidth: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].columnWidth = value;
    },
    handleAddField: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      // return [...state.options, action.payload];
      state.byId[componentId].fieldsData.push(value);
    },
    handleDeleteField: (state, action) => {
      const { componentId, i } = action.payload;
      console.log(componentId, i);
      const updated = [...state.byId[componentId].fieldsData];
      state.byId[componentId].fieldsData = updated.filter(
        (_, index) => index !== i
      );
    },
    handleFieldChange: (state, action) => {
      const { index, componentId, value } = action.payload;
      state.byId[index].fieldsData[componentId] = {
        ...state.byId[index].fieldsData[componentId],
        title: value,
      };
    },
    handleScaleType: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].scaleType = value;
    },
  },
});

export const {
  addRatingMatrixInstance,
  handleAgreeOptions,
  handleChoiceLayout,
  handleDisplayMode,
  handleHideNumber,
  handleImages,
  handleInputChange,
  handleNaCondition,
  handleRequiredOption,
  handleScoreDirection,
  handleRandomFields,
  handleRandomChoice,
  handleColumnWidth,
  handleAddField,
  handleDeleteField,
  handleFieldChange,
  handleScaleType,
} = RatingMatrixSlice.actions;
export default RatingMatrixSlice.reducer;
