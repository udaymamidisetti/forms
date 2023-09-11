import React from "react";
import { useSelector } from "react-redux";

const YesorNoForm = (props) => {
  const { index, questionData } = props;
  const { yesorNoQuestion, requiredOption, hideNumber } = questionData;

  // const question = useSelector((state) => state.YesorNO.yesorNoQuestion);
  // const requiredOption = useSelector((state) => state.YesorNO.requiredOption);
  // const hideNumber = useSelector((state) => state.YesorNO.hideNumber);
  // console.log(question, requiredOption, hideNumber);
  return (
    <div>
      <div>
        <div className="max-w-[900px] m-auto pt-[30px]">
          <div className="flex items-center gap-[10px]">
            {hideNumber ? (
              <p className="bg-[#3A9CEA] pl-[8px] pr-[8px] pt-[4px] pb-[4px] text-[12px] rounded-md text-white font-semibold">
                {index + 1}
              </p>
            ) : (
              ""
            )}
            {requiredOption ? <span className="text-[red]">*</span> : null}
            <div
              className="text-[13px]"
              dangerouslySetInnerHTML={{ __html: yesorNoQuestion }}
            />
          </div>
          <div className="ml-[50px] mt-[15px]">
            <label className="flex gap-[5px]">
              <input type="radio" />
              Yes
            </label>
            <label className="pt-[5px] flex gap-[5px]">
              <input type="radio" />
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YesorNoForm;
