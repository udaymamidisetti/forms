import React from "react";
import hand from "../assets/hand-drawn-arrow.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TemplatePreview = () => {
  const tokenId = useSelector((state) => state.formData.tokenId);
  const selectedOptions = useSelector(
    (state) => state.formData.selectedOptions
  );
  return (
    <>
      {tokenId === 0 ? (
        <div className="flex justify-center items-center pt-[20px]">
          <h1 className="text-[24px] pt-[20px] pb-[30px] text-white">
            Choose a{" "}
            <span className="text-[#0c9ec7] cursor-pointer hover:drop-shadow-lg hover:underline">
              template
            </span>{" "}
            or drag and drop a question to get started
          </h1>
          <img src={hand} alt="" className="h-[42px]" />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-[35px] pt-[50px] transition-all duration-200 ease-in-expo">
          <h1 className="text-[24px] pt-[20px] pb-[30px] text-white">
            Hey, that's looking pretty good!
          </h1>
          <Link to="/uday/preview" target="_blank">
            <button className="bg-[#0c9ec7] text-[white] pt-[7px] pb-[7px] pl-[20px] pr-[20px] rounded-[3px]">
              Preview your work so far?
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default TemplatePreview;
