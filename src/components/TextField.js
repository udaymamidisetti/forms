import React, { useState, useCallback } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import {
  handleInputChange,
  handleAnswerText1,
  handleAnswerText2,
  handleRequiredOption,
  handleHideNumber,
} from "../redux/slices/TextFieldSlice";

const TextField = ({ onDelete }) => {
  const dispatch = useDispatch();
  const questionInput = useSelector((state) => state.textField.questionInput);
  const radioValue = useSelector((state) => state.textField.answerText);
  const [showFull, setShowFull] = useState(false);
  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      dispatch(handleInputChange(value));
    },
    [dispatch]
  );

  const handleSingleChange = () => {
    dispatch(handleAnswerText1());
  };

  const handleMultipleChange = () => {
    dispatch(handleAnswerText2());
  };

  return (
    <div>
      <div className="flex mt-[15px] bg-white w-[750px]">
        <div className="w-[40px] bg-[#43AED8]"></div>
        <div className="flex-1 p-[20px]">
          <div className="flex justify-between flex-1">
            <h1 className="text-[22px] text-[#333]">Text Field</h1>
            <div className="flex">
              <div className="mr-[5px]">
                <button
                  style={{
                    boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                  }}
                  //   onClick={() => handleDeleteContent(uuidv4())}
                  className="h-[36px] leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[10px] pr-[10px] text-[#3c8dd5]"
                  onClick={onDelete}
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
          <p className="text-[#7D848C] pt-[7px] text-[12px]">Question</p>
          <input
            className="text-[12px] border w-[95%] focus:outline-none p-[10px] pt-[5px] pb-[5px] mt-[7px]"
            placeholder="What question would you like to ask?"
            value={questionInput}
            onChange={handleChange}
          />
          <div className="flex mt-[30px]">
            <p className="text-[#7D848C] text-[13px] w-[180px]">
              Answer text area
            </p>
            <div className="flex items-center gap-[5px]">
              <input
                type="radio"
                id="single"
                value="single"
                onChange={handleSingleChange}
                checked={radioValue === "single"}
              />
              <label htmlFor="single" className="text-[13px]">
                Single line
              </label>
              <input
                type="radio"
                id="single"
                value="multiple"
                className="ml-[10px]"
                onChange={handleMultipleChange}
                checked={radioValue === "multiple"}
              />
              <label htmlFor="single" className="text-[13px]">
                Multiple line
              </label>
            </div>
          </div>
          <h1 className="mt-[30px] text-[22px] mb-[10px]">Options</h1>
          <div className="flex">
            <p className="text-[#7D848C] text-[13px] w-[180px]">Required</p>
            <div className="flex items-center gap-[5px]">
              <input
                type="checkbox"
                id="respondents"
                onChange={() => dispatch(handleRequiredOption())}
              />
              <label
                htmlFor="respondents"
                className="cursor-pointer text-[13px]"
              >
                Respondents must answer this question
              </label>
            </div>
          </div>
          <div className="flex mt-[30px]">
            <p className="text-[#7D848C] text-[13px] w-[180px]">Hide number</p>
            <div className="flex items-center gap-[5px]">
              <input
                type="checkbox"
                id="required"
                onChange={() => dispatch(handleHideNumber())}
              />
              <label htmlFor="required" className="cursor-pointer text-[13px]">
                Hide the question number
              </label>
            </div>
          </div>
          <p
            className="text-[#2366a2] text-[12px] mt-[20px] cursor-pointer"
            onClick={() => setShowFull(!showFull)}
          >
            Show all Options
          </p>
          {showFull ? (
            <>
              <div className="flex mt-[20px] items-center">
                <p className="text-[#7D848C] text-[13px] w-[180px]">
                  Identifier
                </p>
                <div>
                  <div className="flex items-center gap-[5px]">
                    <input
                      className="w-[450px] border focus:outline-none p-[5px]  placeholder:text-[13px]"
                      placeholder="Optional- question text is used if not specified"
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-[20px] items-center">
                <p className="text-[#7D848C] text-[13px] w-[180px]">Media</p>
                <div>
                  <input type="file" className="" />
                </div>
              </div>
              <div className="flex mt-[20px] items-center">
                <p className="text-[#7D848C] text-[13px] w-[180px]">
                  Initial value
                </p>
                <div>
                  <div className="flex items-center gap-[5px]">
                    <input
                      className="w-[450px] border focus:outline-none p-[5px]  placeholder:text-[13px]"
                      placeholder="Optional- a prefilled text value"
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-[20px] items-center">
                <p className="text-[#7D848C] text-[13px] w-[180px]">
                  Validation
                </p>
                <div>
                  <div className="flex items-center gap-[5px]">
                    <select className="border focus:outline-none text-[12px] pl-[6px] pt-[3px] pb-[3px] w-[150px]">
                      <option>None</option>
                      <option>Email</option>
                      <option>URL</option>
                      <option>Letters</option>
                      <option>Letters & numbers</option>
                      <option>All characters</option>
                      <option>Word limit</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
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
  );
};

export default TextField;
