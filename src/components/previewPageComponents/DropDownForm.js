import React from "react";
import { useSelector } from "react-redux";

const DropDownForm = (props) => {
  const { index, questionData } = props;
  const { question, hideNumber, requiredOption, options } = questionData;
  // const question = useSelector((state) => state.DropDown.questionInput);
  // const hideNumber = useSelector((state) => state.DropDown.hideNumber);
  // const requiredOption = useSelector((state) => state.DropDown.requiredOption);
  // const options = useSelector((state) => state.DropDown.options);
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
              dangerouslySetInnerHTML={{ __html: question }}
            />
          </div>
          {/* {options.map((e, index) => ( */}
          <div className="flex gap-[5px] ml-[40px] mt-[10px] cursor-pointer h-[30px] p-[5px] items-center">
            {/* <input type="radio" id={index} />
              <label className="text-[16px]" htmlFor={index}>
                {e.title}
              </label> */}
            <select className="w-full border focus:outline-none text-[14px] p-[5px]">
              {options.map((e, index) => (
                // <option key={index}>{e.title}</option>
                <option
                  dangerouslySetInnerHTML={{ __html: e.title }}
                  key={index}
                />
              ))}
            </select>
          </div>
          {/* //   ))} */}
        </div>
      </div>
    </div>
  );
};

export default DropDownForm;
