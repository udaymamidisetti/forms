import { createSlice } from "@reduxjs/toolkit";
import fieldData from "../../fieldData";
import data from "../../data";
const initialState = {
  initialData: {
    question: "What question would you like to ask?",
    requiredOption: "No",
    hideNumber: true,
    image: null,
    choiceLayout: "",
    agreeOptions: "agree2",
    naCondition: false,
    displayMode: "Radio",
    scoreDirection: "Ascending",
    randomFields: false,
    randomChoice: false,
    columnWidth: "40%",
    optionsData: [...data],
    scaleType: null,
    validation: "",
    answerTextarea: "",
    rows: ["Row 1\nRow 2"],
    columns: ["Column 1\nColumn 2"],
  },
  byId: {},
};

const DropDownGridSlice = createSlice({
  name: "DropDownGrid",
  initialState,
  reducers: {
    addDropdownGridInstance: (state, action) => {
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
    handleRandomChoices: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].randomChoice =
        !state.byId[componentId].randomChoice;
    },
    handleColumnWidth: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].columnWidth = value;
    },
    handleAddOption: (state, action) => {
      const { componentId, value } = action.payload;
      console.log(componentId, value);
      // return [...state.options, action.payload];
      state.byId[componentId].optionsData.push(value);
    },
    handleDeleteOption: (state, action) => {
      const { componentId, i } = action.payload;
      console.log(componentId, i);
      const updated = [...state.byId[componentId].optionsData];
      state.byId[componentId].optionsData = updated.filter(
        (_, index) => index !== i
      );
    },
    handleOptionChange: (state, action) => {
      const { index, componentId, value } = action.payload;
      console.log("c ", componentId, "i", index, "v", value);
      state.byId[index].optionsData[componentId] = {
        ...state.byId[index].optionsData[componentId],
        title: value,
      };
    },
    handleBulkAdd: (state, action) => {
      const { componentId, bulkArray } = action.payload;
      state.byId[componentId].optionsData.splice(0);
      state.byId[componentId].optionsData = bulkArray;
    },
    addRowWords: (state, action) => {
      const { componentId, value } = action.payload;
      const rowValue = value.toString();
      // console.log(value.split("\n"));
      const rowArray = rowValue.split("\n");
      // state.byId[componentId].rows.splice(0);
      state.byId[componentId].rows = rowArray;
    },
    addColumnWords: (state, action) => {
      const { componentId, value } = action.payload;
      const columnValue = value.toString();
      const columnArray = columnValue.split("\n");
      // state.byId[componentId].columns.splice(0);
      state.byId[componentId].columns = columnArray;
    },
  },
});

export const {
  addDropdownGridInstance,
  handleHideNumber,
  handleImages,
  handleInputChange,
  handleRequiredOption,
  handleRandomFields,
  handleColumnWidth,
  handleAddField,
  handleDeleteField,
  toggleExpansion,
  handleFieldChange,
  handleRandomChoices,
  handleAddOption,
  handleDeleteOption,
  handleOptionChange,
  handleBulkAdd,
  addColumnWords,
  addRowWords,
} = DropDownGridSlice.actions;
export default DropDownGridSlice.reducer;
