import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialState: {
    yesorNoQuestion: "What question would you like to ask?",
    requiredOption: false,
    hideNumber: true,
  },
  byId: {},
};
export const YesorNoslice = createSlice({
  name: "YesorNO",
  initialState,
  reducers: {
    addYesorNoInstance: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId] = {
        ...state.initialState,
      };
    },
    handleQuestionInput: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      state.byId[componentId].yesorNoQuestion = value;
    },
    handleRequiredOption: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].requiredOption =
        !state.byId[componentId].requiredOption;
      console.log(state.requiredOption);
    },
    handleHideNumber: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].hideNumber = !state.byId[componentId].hideNumber;
    },
  },
});
export const {
  handleQuestionInput,
  handleRequiredOption,
  handleHideNumber,
  addYesorNoInstance,
} = YesorNoslice.actions;
export default YesorNoslice.reducer;
