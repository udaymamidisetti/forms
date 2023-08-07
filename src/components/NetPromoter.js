import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

const NetPromoter = ({ onDelete }) => {
  const [showFull, setShowFull] = useState(false);
  return (
    <div>
      <div className="flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
        <div className="w-[40px] bg-[#43AED8]"></div>
        <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo ">
          <div className="flex justify-between flex-1">
            <h1 className="text-[22px] text-[#333]">Net Promoter® Score</h1>
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
          <p className="text-[#7D848C] pt-[7px] text-[14px]">Question</p>
          <input
            className="border w-[95%] focus:outline-none p-[10px] pt-[5px] pb-[5px] mt-[7px] text-[12px]"
            placeholder="What question would you like to ask?"
          />
          <div className="flex mt-[30px]">
            <p className="text-[#7D848C] text-[13px] w-[180px]">Labels</p>
            <div className="flex items-center gap-[5px]">
              <input type="checkbox" id="required" />
              <label htmlFor="required" className="cursor-pointer text-[13px]">
                Display text labels
              </label>
            </div>
          </div>
          <div className="flex mt-[30px] items-center">
            <p className="text-[#7D848C] text-[13px] w-[180px]">Left label</p>
            <div className="flex items-center gap-[5px]">
              <input
                type="text"
                id="required"
                className="border focus:outline-none text-[12px] pl-[6px] pt-[3px] pb-[3px] w-[480px]"
                value="Not at all likely"
              />
            </div>
          </div>
          <div className="flex mt-[30px] items-center">
            <p className="text-[#7D848C] text-[13px] w-[180px]">Right label</p>
            <div className="flex items-center gap-[5px]">
              <input
                type="text"
                id="required"
                className="border focus:outline-none text-[12px] pl-[6px] pt-[3px] pb-[3px] w-[480px]"
                value="Extremely likely"
              />
            </div>
          </div>
          <h1 className="mt-[30px] text-[22px] mb-[10px]">Options</h1>
          <div className="flex">
            <p className="text-[#7D848C] text-[13px] w-[180px]">Required</p>
            <div className="flex items-center gap-[5px]">
              <input type="checkbox" id="required" />
              <label htmlFor="required" className="cursor-pointer text-[13px]">
                Respondents must answer this question
              </label>
            </div>
          </div>
          <div className="flex mt-[30px]">
            <p className="text-[#7D848C] text-[13px] w-[180px]">Hide number</p>
            <div className="flex items-center gap-[5px]">
              <input type="checkbox" id="required" />
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
            </>
          ) : (
            ""
          )}
          <section className="mt-[40px] flex justify-end">
            <button
              className="leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[18px] pr-[18px] text-[#3c8dd5]"
              //   onClick={() => handleDeleteContent(uuidv4())}
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

export default NetPromoter;
