import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";
import fieldData from "../../fieldData";

const initialState = {
  initialData: {
    question: "What question would you like to ask?",
    AnswerRequired: false,
    HideNumber: true,
    RandomFields: false,
    RandomChoices: false,
    labelColumnWidth: "40%",
    AllowMultipleResponce: false,
    options: [...data],
    image: null,
    fieldsData: [...fieldData],
    multipleAnswers: false,
  },
  byId: {},
};

const MultipleChoiceGridSlice = createSlice({
  name: "MultiplechoiceGrid",
  initialState,
  reducers: {
    addMultipleChoiceGridInstance: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId] = {
        ...state.initialData,
      };
    },
    handleQuestionChange: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].question = value;
    },
    handleHideNumber: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].HideNumber = !state.byId[componentId].HideNumber;
    },
    handleRandomfields: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].RandomFields =
        !state.byId[componentId].RandomFields;
    },
    handleRandomChoices: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].RandomChoices =
        !state.byId[componentId].RandomChoices;
    },
    handleAnswerRequired: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].AnswerRequired = value;
    },
    handleColumnWidth: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].labelColumnWidth = value;
    },
    handleMultipleResponce: (state) => {
      state.AllowMultipleResponce = !state.AllowMultipleResponce;
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
    handleAddOption: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      // return [...state.options, action.payload];
      state.byId[componentId].options.push(value);
    },
    handleDeleteOption: (state, action) => {
      const { componentId, i } = action.payload;
      console.log(componentId, i);
      const updated = [...state.byId[componentId].options];
      state.byId[componentId].options = updated.filter(
        (_, index) => index !== i
      );
    },
    handleSetImage: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].image = URL.createObjectURL(value);
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
    handleFieldChange: (state, action) => {
      const { index, componentId, value } = action.payload;
      state.byId[index].fieldsData[componentId] = {
        ...state.byId[index].fieldsData[componentId],
        title: value,
      };
    },
    addNewOption: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      // return [...state.options, action.payload];
      state.byId[componentId].options.push(value);
    },
    toggleExpansion: (state, action) => {
      const { componentId, index } = action.payload;
      state.byId[componentId].options[index].expanded =
        !state.byId[componentId].options[index].expanded;
    },
    handleMultipleAnswers: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].multipleAnswers =
        !state.byId[componentId].multipleAnswers;
    },
    setIncludeImage: (state, action) => {
      const { componentId, index } = action.payload;
      state.byId[componentId].options[index].includeImage =
        !state.byId[componentId].options[index].includeImage;
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
  },
});
export const {
  handleQuestionChange,
  handleHideNumber,
  handleRandomfields,
  handleRandomChoices,
  handleAnswerRequired,
  handleColumnWidth,
  handleMultipleResponce,
  handleAddField,
  handleDeleteField,
  handleAddOption,
  handleDeleteOption,
  addMultipleChoiceGridInstance,
  handleSetImage,
  handleOptionChange,
  handleFieldChange,
  toggleExpansion,
  handleMultipleAnswers,
  setIncludeImage,
  handleBulkAdd,
  setOrder,
} = MultipleChoiceGridSlice.actions;
export default MultipleChoiceGridSlice.reducer;
