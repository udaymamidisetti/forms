import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: {
    yesorNoQuestion: "What question would you like to ask?",
    requiredOption: false,
    hideNumber: true,
    minimize: false,
  },
  byId: {},
};
export const YesorNoslice = createSlice({
  name: "YesorNO",
  initialState,
  reducers: {
    addYesorNoInstance: (state, action) => {
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
    toggleMinimize: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].minimize = !state.byId[componentId].minimize;
    },
  },
});
export const {
  handleQuestionInput,
  handleRequiredOption,
  handleHideNumber,
  addYesorNoInstance,
  toggleMinimize,
} = YesorNoslice.actions;
export default YesorNoslice.reducer;
