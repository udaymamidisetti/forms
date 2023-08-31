import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
const formSlice = createSlice({
  name: "formData",
  initialState: {
    selectedOptions: [],
    [uuid()]: [],
    options: [{ id: "textField" }],
    previewArray: [],
    tokenId: 0,
    allStateValues: [],
  },
  reducers: {
    addOption: (state, action) => {
      const optionId = action.payload;
      console.log(optionId);
      // state.selectedOptions.push(optionId);
      state.selectedOptions = [...state.selectedOptions, optionId];
      console.log(state.selectedOptions.length);
      localStorage.setItem(
        "selectedOptions",
        JSON.stringify(state.selectedOptions)
      );
    },
    deleteOptionByIndex: (state, action) => {
      const indexToDelete = action.payload;
      if (indexToDelete >= 0 && indexToDelete < state.selectedOptions.length) {
        state.selectedOptions.splice(indexToDelete, 1);
      }
    },
    addPreviewArray: (state) => {
      state.previewArray.push(1);
      console.log("clicked");
      console.log(state.previewArray.length);
    },
    setTokenId: (state, action) => {
      state.tokenId = action.payload;
    },
    deleteToken: (state, action) => {
      alert("Are you sure you want to delete ?");
      // Cookies.remove("tokenId");
      state.tokenId = null;
    },
    setOption: (state, action) => {
      state.options = state.options;
    },
    setChoicesOrder: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removedOption] = state.selectedOptions.splice(sourceIndex, 1);
      state.selectedOptions.splice(destinationIndex, 0, removedOption);
    },
    reorderItems: (state, action) => {
      const { droppableId, sourceIndex, destinationIndex } = action.payload;
      const list = state[droppableId];
      const result = Array.from(list);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      state[droppableId] = result;
    },
    copyItems: (state, action) => {
      const { source, destination, droppableSource, droppableDestination } =
        action.payload;
      const sourceClone = Array.from(state[source.droppableId]);
      const destClone = Array.from(state[destination.droppableId]);
      const item = sourceClone[droppableSource.index];
      destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
      state[source.droppableId] = sourceClone;
      state[destination.droppableId] = destClone;
    },
    moveItems: (state, action) => {
      const {
        sourceDroppableId,
        destinationDroppableId,
        sourceIndex,
        destinationIndex,
      } = action.payload;
      const sourceClone = Array.from(state[sourceDroppableId]);
      const destClone = Array.from(state[destinationDroppableId]);
      const [removed] = sourceClone.splice(sourceIndex, 1);
      destClone.splice(destinationIndex, 0, removed);
      state[sourceDroppableId] = sourceClone;
      state[destinationDroppableId] = destClone;
    },
    setAllStateValues: (state, action) => {
      const { overallStates, componentId } = action.payload;
      console.log(componentId);
      const key = Object.keys(overallStates)[0];
      const index = state.allStateValues.findIndex((obj) => key in obj);
      // console.log(
      //   Object.keys(state.allStateValues).includes(Object.keys(overallStates))
      // );
      // if (
      //   Object.keys(state.allStateValues).includes(Object.keys(overallStates))
      // ) {
      //   return;
      // } else {
      //   state.allStateValues = [...state.allStateValues, overallStates];
      // }
      // const index = state.allStateValues.findIndex(
      //   (obj) => obj.key === componentId
      // );
      console.log(index);
      if (index !== -1) {
        state.allStateValues[index] = overallStates;
      } else {
        state.allStateValues.push(overallStates);
      }
      // const doesObjExist = overallStates.some((obj) => {
      //   for (const prop in state.allStateValues) {
      //     if (obj[prop] !== state.allStateValues[prop]) {
      //       return false;
      //     }
      //   }
      //   return true;
      // });
      // console.log(doesObjExist);
      // if (doesObjExist) {
      //   state.allStateValues = [...state.allStateValues, overallStates];
      // } else {
      //   return;
      // }
      // console.log(state.allStateValues);
    },
  },
});

export const {
  addOption,
  addPreviewArray,
  deleteOptionByIndex,
  setTokenId,
  deleteToken,
  setOption,
  setChoicesOrder,
  reorderItems,
  moveItems,
  copyItems,
  setAllStateValues,
} = formSlice.actions;
export default formSlice.reducer;
