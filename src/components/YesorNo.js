import { useCallback } from "react";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  handleHideNumber,
  handleQuestionInput,
  handleRequiredOption,
} from "../redux/slices/YesorNoslice";

const YesorNo = ({ onDelete }) => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.YesorNO.yesorNoQuestion);
  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      dispatch(handleQuestionInput(value));
    },
    [dispatch]
  );

  return (
    <div>
      <div>
        <div>
          <div className="flex mt-[15px] bg-white w-[750px]">
            <div className="w-[40px] bg-[#43AED8] h-[450px]"></div>
            <div className="flex-1 p-[20px]">
              <div className="flex justify-between flex-1">
                <h1 className="text-[22px] text-[#333]">Yes/No</h1>
                <div className="flex">
                  <div className="mr-[5px]">
                    <button
                      style={{
                        boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                      }}
                      //   onClick={() => handleDeleteContent(uuidv4())}
                      onClick={onDelete}
                      className="h-[36px] leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[10px] pr-[10px] text-[#3c8dd5]"
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                      }}
                      className="h-[36px] leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[10px] pr-[10px] bg-[#5cb85c] text-[white]"
                    >
                      Save
                    </button>
                  </div>
                  <div
                    className="h-[36px] flex items-center w-[65px] justify-around"
                    style={{
                      boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                    }}
                  >
                    <HiOutlineClipboardDocument className=" text-[16px] text-[#eee]" />
                    <FaTrashCan size={16} className="text-[16px] text-[#eee]" />
                  </div>
                </div>
              </div>
              <p className="text-[#7D848C] pt-[7px] text-[14px]">Question</p>
              <input
                className="border w-[95%] focus:outline-none p-[10px] pt-[5px] pb-[5px] mt-[7px] text-[13px]"
                placeholder="What question would you like to ask?"
                onChange={handleChange}
                value={question}
              />
              <h1 className="mt-[30px] text-[22px] mb-[10px]">Options</h1>
              <div className="flex">
                <p className="text-[#7D848C] text-[13px] w-[180px]">Required</p>
                <div className="flex items-center gap-[5px]">
                  <input
                    type="checkbox"
                    id="required"
                    onChange={() => dispatch(handleRequiredOption())}
                  />
                  <label
                    htmlFor="required"
                    className="cursor-pointer text-[13px]"
                  >
                    Respondents must answer this question
                  </label>
                </div>
              </div>
              <div className="flex mt-[30px]">
                <p className="text-[#7D848C] text-[13px] w-[180px]">
                  Hide number
                </p>
                <div className="flex items-center gap-[5px]">
                  <input
                    type="checkbox"
                    id="required"
                    onChange={() => dispatch(handleHideNumber())}
                  />
                  <label
                    htmlFor="required"
                    className="cursor-pointer text-[13px]"
                  >
                    Hide the question number
                  </label>
                </div>
              </div>
              <section className="mt-[30px] flex justify-end">
                <button
                  className="leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[18px] pr-[18px] text-[#3c8dd5]"
                  onClick={onDelete}
                >
                  Cancel
                </button>
                <button className="leading-[20px] text-[12px] pt-[6px] pb-[6px] pl-[18px] pr-[18px] bg-[#5cb85c] text-[white]">
                  Save
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YesorNo;
