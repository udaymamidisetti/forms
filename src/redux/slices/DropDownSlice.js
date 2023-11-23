import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";

const initialState = {
  initialData: {
    question: "What question would you like to ask?",
    answerText: null,
    requiredOption: false,
    hideNumber: true,
    randomchoices: false,
    options: data,
    isExpanded: false,
    image: null,
    minimize: false,
  },
  byId: {},
};

export const DropDownSlice = createSlice({
  name: "dropDown",
  initialState,
  reducers: {
    addDropdownInstance: (state, action) => {
      const { componentId } = action.payload;
      // const componentExists = Object.keys(state.byId).some(
      //   (instance) => instance.componentId === componentId
      // );

      // if (!componentExists) {
      //   state.byId[componentId] = {
      //     ...state.initialData,
      //   };
      // }
      const componentExists = Object.keys(state.byId).includes(componentId);
      if (!componentExists) {
        // If it doesn't exist, add a new instance
        // state.allIds.push(componentId);
        state.byId[componentId] = {
          ...state.initialData,
        };
      }
      // state.byId[componentId] = { ...state.initialData };
      console.log(Object.keys(state.byId));
    },

    handleInputChange: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].question = value;
    },
    handleOptionChange: (state, action) => {
      const { index, componentId, value } = action.payload;

      state.byId[index].options[componentId] = {
        ...state.byId[index].options[componentId],
        title: value,
      };
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
    handleRandomChoices: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].randomchoices =
        !state.byId[componentId].randomchoices;
    },
    toggleExpansion: (state, action) => {
      const index = action.payload;
      state.options[index].expanded = !state.options[index].expanded;
    },
    addNewOption: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      state.byId[componentId].options.push(value);
    },
    addOtherChoice: (state, action) => {
      state.options.push(action.payload);
    },
    handleImages: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].image = URL.createObjectURL(value);
    },
    handleRemoveImage: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].image = null;
    },
    deleteOptionContent: (state, action) => {
      const { componentId, i } = action.payload;
      console.log(componentId, i);
      const updated = [...state.byId[componentId].options];
      state.byId[componentId].options = updated.filter(
        (_, index) => index !== i
      );
    },
    handleBulkAdd: (state, action) => {
      const { componentId, bulkArray } = action.payload;
      state.byId[componentId].options.splice(0);
      state.byId[componentId].options = bulkArray;
    },
    setOrder: (state, action) => {
      const { sourceIndex, destinationIndex, componentId } = action.payload;
      const [removedOption] = state.byId[componentId].options.splice(
        sourceIndex,
        1
      );
      state.byId[componentId].options.splice(
        destinationIndex,
        0,
        removedOption
      );
    },
    toggleMinimize: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].minimize = !state.byId[componentId].minimize;
    },
  },
});
export const {
  addDropdownInstance,
  handleInputChange,
  handleRequiredOption,
  handleHideNumber,
  handleOptionChange,
  toggleExpansion,
  addNewOption,
  addOtherChoice,
  deleteOptionContent,
  handleRandomChoices,
  handleImages,
  handleBulkAdd,
  setOrder,
  toggleMinimize,
  handleRemoveImage,
} = DropDownSlice.actions;

export default DropDownSlice.reducer;
