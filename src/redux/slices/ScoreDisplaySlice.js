import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: { name: "ScoreDisplay", score: "Your score is :", hide: true },
  byId: {},
};

const ScoreDisplaySlice = createSlice({
  name: "scoreDisplay",
  initialState,
  reducers: {
    addScoreDisplayInstance: (state, action) => {
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
    handleScore: (state, action) => {
      const { componentId, value } = action.payload;
      state.byId[componentId].score = value;
    },
    handleHide: (state, action) => {
      const { componentId } = action.payload;
      state.byId[componentId].hide = !state.byId[componentId].hide;
    },
  },
});

export const { addScoreDisplayInstance, handleScore, handleHide } =
  ScoreDisplaySlice.actions;

export default ScoreDisplaySlice.reducer;
