import { createSlice } from "@reduxjs/toolkit";

const ScoreDisplaySlice = createSlice({
  name: "scoreDisplay",
  initialState: {
    score: "Your score is :",
    hide: false,
  },
  reducers: {
    handleScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { handleScore } = ScoreDisplaySlice.actions;

export default ScoreDisplaySlice.reducer;
