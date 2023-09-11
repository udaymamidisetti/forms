import React from "react";
import { useSelector } from "react-redux";
const ScoreDisplayForm = (props) => {
  const { index, questionData } = props;
  const { score, hide } = questionData;
  // const scoreText = useSelector((state) => state.ScoreDisplay.score);
  return <>{hide && <div>{score}</div>}</>;
};

export default ScoreDisplayForm;
