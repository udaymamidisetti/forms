import React from "react";
import { useSelector } from "react-redux";
const CustomTextForm = () => {
  const customText = useSelector((state) => state.CustomText.customText);

  return <div>{customText}</div>;
};

export default CustomTextForm;
