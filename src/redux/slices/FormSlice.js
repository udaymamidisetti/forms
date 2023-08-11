import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "formData",
  initialState: {
    selectedOptions: [],
    options: [{ id: "textField" }],
    previewArray: [],
    tokenId: null,
  },
  reducers: {
    addOption: (state, action) => {
      const optionId = action.payload;
      console.log(optionId);
      state.selectedOptions.push(optionId);
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
} = formSlice.actions;
export default formSlice.reducer;
