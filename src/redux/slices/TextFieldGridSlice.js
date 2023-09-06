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
    validation: "",
    answerTextarea: "",
  },
  byId: {},
};
const TextFieldGridSlice = createSlice({
  name: "TextFielGrid",
  initialState,
  reducers: {
    addTextfieldGridInstance: (state, action) => {
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
    handleRandomFields: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].randomFields =
        !state.byId[componentId].randomFields;
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
    toggleExpansion: (state, action) => {
      const { componentId, index } = action.payload;
      state.byId[componentId].fieldsData[index].expanded =
        !state.byId[componentId].fieldsData[index].expanded;
    },
    handleValidation: (state, action) => {
      const { index, componentId, value } = action.payload;
      state.byId[componentId].fieldsData[index].validation = value;
    },
    handleFieldChange: (state, action) => {
      const { index, componentId, value } = action.payload;
      state.byId[index].fieldsData[componentId] = {
        ...state.byId[index].fieldsData[componentId],
        title: value,
      };
    },
    handleAnswerTextarea: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].answerTextarea = value;
    },
  },
});

export const {
  addTextfieldGridInstance,
  handleHideNumber,
  handleImages,
  handleInputChange,
  handleRequiredOption,
  handleRandomFields,
  handleColumnWidth,
  handleAddField,
  handleDeleteField,
  toggleExpansion,
  handleValidation,
  handleFieldChange,
  handleAnswerTextarea,
} = TextFieldGridSlice.actions;
export default TextFieldGridSlice.reducer;
