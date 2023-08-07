import React from "react";
import { useSelector } from "react-redux";
const ScoreDisplayForm = () => {
  const scoreText = useSelector((state) => state.ScoreDisplay.score);
  return <div>{scoreText}</div>;
};

export default ScoreDisplayForm;
