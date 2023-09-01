import { createSlice } from "@reduxjs/toolkit";
import fieldData from "../../fieldData";

const initialState = {
  initialData: {
    question: "<p>What question would you like to ask?</p>",
    requiredOption: false,
    hideNumber: true,
    fields: [...fieldData],
    isExpanded: false,
    randomChoice: false,
    choiceLayout: "Vertical",
    image: null,
  },
  byId: {},
};

const RankingSlice = createSlice({
  name: "RankingSlice",
  initialState,
  reducers: {
    addRankingInstance: (state, action) => {
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
    handleRandomChoice: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].randomChoice =
        !state.byId[componentId].randomChoice;
    },
    handleImages: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].image = URL.createObjectURL(value);
    },
    handleFieldChange: (state, action) => {
      const { index, componentId, value } = action.payload;
      state.byId[index].fields[componentId] = {
        ...state.byId[index].fields[componentId],
        title: value,
      };
    },
    handleDeleteField: (state, action) => {
      const { componentId, i } = action.payload;
      console.log(componentId, i);
      const updated = [...state.byId[componentId].fields];
      state.byId[componentId].fields = updated.filter(
        (_, index) => index !== i
      );
    },
    handleAddField: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      // return [...state.options, action.payload];
      state.byId[componentId].fields.push(value);
    },
  },
});

export const {
  addRankingInstance,
  handleInputChange,
  handleHideNumber,
  handleImages,
  handleRandomChoice,
  handleRequiredOption,
  handleFieldChange,
  handleDeleteField,
  handleAddField,
} = RankingSlice.actions;
export default RankingSlice.reducer;
