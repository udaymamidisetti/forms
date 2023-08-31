import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";
const initialState = {
  initialData: {
    question: "<p>What question would you like to ask?</p>",
    textLabels: false,
    leftLabel: "Not at all likely",
    rightLabel: "Extremely likely",
    requiredOption: false,
    hideNumber: true,
    image: null,
  },
  byId: {},
};
const NetPromoterSlice = createSlice({
  name: "NetPromoter",
  initialState,
  reducers: {
    addNetPromoterInstance: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId] = {
        ...state.initialData,
      };
    },
    handleInputChange: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);

      // // Initialize the string value if not present
      // if (!state.question.hasOwnProperty(componentId)) {
      //   state.question[componentId] = "What question would you like to ask?";
      // }
      // if (!state.byId[componentId]) {
      //   state.byId[componentId] = {
      //     question: "What question would you like to ask?",
      //   };
      // }
      // state.byId[componentId].question = {
      //   ...state.byId[componentId].question,
      //   question: value,
      // };

      // state.question[componentId] = { value };
      state.byId[componentId].question = value;
    },
    setDisplayTextFields: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].textLabels = !state.byId[componentId].textLabels;
    },
    setLeftLabel: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].leftLabel = value;
    },
    setRightLabel: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].rightLabel = value;
    },
    setHideNumber: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].hideNumber = !state.byId[componentId].hideNumber;
    },
    setRequired: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].requiredOption =
        !state.byId[componentId].requiredOption;
    },
    handleImages: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].image = URL.createObjectURL(value);
    },
  },
});

export const {
  addNetPromoterInstance,
  setDisplayTextFields,
  setLeftLabel,
  setRightLabel,
  handleImages,
  setRequired,
  setHideNumber,
  handleInputChange,
} = NetPromoterSlice.actions;
export default NetPromoterSlice.reducer;
