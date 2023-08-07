import React from "react";
import { useSelector } from "react-redux";
const HeadingForm = () => {
  const heading = useSelector((state) => state.Heading.heading);
  return (
    <div>
      <h1 className="text-[24px] font-bold text-[#333333] h-[100px]">
        {heading}
      </h1>
    </div>
  );
};

export default HeadingForm;
