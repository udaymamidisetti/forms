import { createSlice } from "@reduxjs/toolkit";
import fieldData from "../../fieldData";

const initialState = {
  initialData: {
    question: "<p>What question would you like to ask?</p>",
    requiredOption: false,
    hideNumber: true,
    randomChoice: false,
    image: null,
    fields: [...fieldData],
    sumofFields: "Equal",
    sumInput: "100",
    NumericType: "",
  },
  byId: {},
};
const PercentageSumSlice = createSlice({
  name: "PercentageSum",
  initialState,
  reducers: {
    addPercentageInstance: (state, action) => {
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
    handleRandomChoice: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].randomChoice = value;
    },
    handleImages: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].image = URL.createObjectURL(value);
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
    handleFieldChange: (state, action) => {
      const { index, componentId, value } = action.payload;
      state.byId[index].fields[componentId] = {
        ...state.byId[index].fields[componentId],
        title: value,
      };
    },
    handleSumofFields: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].sumofFields = value;
    },
    handlesumInput: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].sumInput = value;
    },
    handleNumericType: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].NumericType = value;
    },
  },
});

export const {
  addPercentageInstance,
  handleInputChange,
  handleRequiredOption,
  handleHideNumber,
  handleRandomChoice,
  handleImages,
  handleDeleteField,
  handleAddField,
  handleFieldChange,
  handleSumofFields,
  handlesumInput,
  handleNumericType,
} = PercentageSumSlice.actions;
export default PercentageSumSlice.reducer;
