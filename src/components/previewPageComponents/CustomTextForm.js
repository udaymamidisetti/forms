import React from "react";
import { useSelector } from "react-redux";
const CustomTextForm = (props) => {
  const { index, questionData } = props;
  const { customText } = questionData;
  // const customText = useSelector((state) => state.CustomText.customText);

  return <div>{customText}</div>;
};

export default CustomTextForm;
