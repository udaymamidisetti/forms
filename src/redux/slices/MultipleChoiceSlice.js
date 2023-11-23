import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";
import { useRef } from "react";

const initialState = {
  initialData: {
    question: "<p>What question would you like to ask?</p>",
    answerText: null,
    requiredOption: false,
    hideNumber: true,
    options: [...data],
    isExpanded: false,
    randomChoice: false,
    choiceLayout: "Vertical",
    image: null,
    multipleAnswers: false,
    bulkOptions: [],
    position: "",
    minimize: false,
  },
  byId: {},
};

export const MultipleChoiceSlice = createSlice({
  name: "multipleChoice",
  initialState,
  reducers: {
    addMultipleChoiceInstance: (state, action) => {
      const { componentId } = action.payload;
      // const componentExists = Object.keys(state.byId).some(
      //   (instance) => instance.componentId === componentId
      // );
      const componentExists = Object.keys(state.byId).includes(componentId);
      if (!componentExists) {
        // If it doesn't exist, add a new instance
        // state.allIds.push(componentId);
        state.byId[componentId] = {
          ...state.initialData,
        };
      }

      // if (!componentExists) {
      //   state.byId[componentId] = {
      //     ...state.initialData,
      //   };
      // }
      // state.byId[componentId] = { ...state.initialData };
      console.log(Object.keys(state.byId));
    },
    deleteMultipleChoiceInstance: (state, action) => {
      const { componentId } = action.payload;
      console.log(componentId);
      delete state.byId[componentId];
    },
    handleInputChange: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].question = value;
    },
    handleOptionChange: (state, action) => {
      const { index, componentId, value } = action.payload;
      console.log("c ", componentId, "i", index, "v", value);
      // if (!state.byId[componentId]) {
      //   state.byId[componentId] = {
      //     options: [],
      //   };
      // }
      // const instanceOptions = state.byId[componentId].options;
      // instanceOptions[index].title = value;
      // state.byId[index] = {
      //   ...state.byId[index],
      //   options: [...data],
      // };
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
    toggleExpansion: (state, action) => {
      const { componentId, index } = action.payload;
      state.byId[componentId].options[index].expanded =
        !state.byId[componentId].options[index].expanded;
    },
    addNewOption: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      // return [...state.options, action.payload];
      state.byId[componentId].options.push(value);
    },
    addOtherChoice: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].options.push(value);
      // state.options.push(action.payload);
    },
    deleteOptionContent: (state, action) => {
      const { componentId, i } = action.payload;
      console.log(componentId, i);
      const updated = [...state.byId[componentId].options];
      state.byId[componentId].options = updated.filter(
        (_, index) => index !== i
      );
    },
    handleRandomChoice: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].randomChoice =
        !state.byId[componentId].randomChoice;
    },
    handleChoiceLayout: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].choiceLayout = value;
    },
    handleImages: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].image = URL.createObjectURL(value);
    },
    handleRemoveImage: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].image = null;
    },
    handleMultipleAnswers: (state) => {
      state.multipleAnswers = !state.multipleAnswers;
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
    setOtherTextField: (state, action) => {
      const { componentId, index } = action.payload;
      console.log(componentId, index);
      state.byId[componentId].options[index].includeOtherTextField =
        !state.byId[componentId].options[index].includeOtherTextField;
    },
    setIncludeImage: (state, action) => {
      const { componentId, index } = action.payload;
      state.byId[componentId].options[index].includeImage =
        !state.byId[componentId].options[index].includeImage;
    },
    handleSetImage: (state, action) => {
      const { url, index, componentId } = action.payload;
      state.byId[componentId].options[index].image = URL.createObjectURL(url);
    },
    handleRemoveOptionImage: (state, action) => {
      const { index, componentId } = action.payload;
      state.byId[componentId].options[index].image = null;
    },
    setOptionPositionImage: (state, action) => {
      const { index, componentId, value } = action.payload;
      state.byId[componentId].options[index].position = value;
    },
    toggleMinimize: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].minimize = !state.byId[componentId].minimize;
    },
  },
});

export const {
  handleInputChange,
  handleRequiredOption,
  handleHideNumber,
  handleOptionChange,
  toggleExpansion,
  addNewOption,
  addOtherChoice,
  deleteOptionContent,
  handleChoiceLayout,
  handleImages,
  handleRandomChoice,
  handleMultipleAnswers,
  handleBulkAdd,
  reorderOptions,
  setOrder,
  setOtherTextField,
  setIncludeImage,
  handleSetImage,
  addMultipleChoiceInstance,
  deleteMultipleChoiceInstance,
  setOptionPositionImage,
  toggleMinimize,
  handleRemoveImage,
  handleRemoveOptionImage,
} = MultipleChoiceSlice.actions;

export default MultipleChoiceSlice.reducer;
