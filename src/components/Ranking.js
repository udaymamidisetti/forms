import React, { useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { RiDragMove2Fill } from "react-icons/ri";
import fieldData from "../fieldData";

const Ranking = ({ onDelete }) => {
  const [showFull, setShowFull] = useState(false);
  const [fData, setfData] = useState([...fieldData]);
  const addFieldsHandler = () => {
    console.log("Clicked");
    const newOption = [{ title: `Field ${fData.length + 1}` }];
    console.log(newOption);
    setfData(() => [...fData, ...newOption]);
  };
  const deleteFieldOption = (index) => {
    setfData((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });
  };
  return (
    <div>
      <div>
        <div className="flex mt-[15px] bg-white w-[750px]">
          <div className="w-[40px] bg-[#43AED8]"></div>
          <div className="flex-1 p-[20px]">
            <div className="flex justify-between flex-1">
              <h1 className="text-[22px] text-[#333]">Ranking</h1>
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
            <p className="text-[#7D848C] pt-[7px] text-[13px]">Question</p>
            <input
              className="border w-[95%] focus:outline-none p-[10px] pt-[5px] pb-[5px] mt-[7px] placeholder:text-[13px]"
              placeholder="What question would you like to ask?"
            />
            <h1 className="mt-[30px] text-[22px] mb-[10px]">Options</h1>
            <div className="flex">
              <p className="text-[#7D848C] text-[13px] w-[180px]">Required</p>
              <div className="flex items-center gap-[5px]">
                <input type="checkbox" id="required" />
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
                <input type="checkbox" id="required" />
                <label
                  htmlFor="required"
                  className="cursor-pointer text-[13px]"
                >
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
                <div className="flex mt-[20px]">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">
                    Display order
                  </p>
                  <div>
                    <div className="flex items-center gap-[5px]">
                      <input type="checkbox" id="required" />
                      <label
                        htmlFor="required"
                        className="cursor-pointer text-[13px]"
                      >
                        Randomize Fields
                      </label>
                    </div>
                  </div>
                </div>
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
            <h1 className="mt-[30px] text-[22px] mb-[10px]">Fields</h1>
            <p className="pl-[30px] text-[#777] text-[13px]">Label</p>

            {fData.map((e, index) => (
              <>
                <div
                  className="flex items-center gap-[5px] mt-[5px]"
                  key={index}
                >
                  <RiDragMove2Fill color="#777" size={19} />
                  <input
                    className="text-[12px] h-[34px] border focus:outline-none pt-[6px] pr-[12px] pl-[12px] pb-[6px] flex-1"
                    placeholder={e.title}
                    // onChange={(e) => optionsChange(index, e.target.value)}
                    value={e.title}
                  />
                  <button
                    className="border p-[8px] text-[#777] h-[34px] w-[34px]"
                    // onClick={handleToggleExpansion(index)}
                    // onClick={() => dispatch(toggleExpansion(index))}
                  >
                    <BiSolidChevronDown />
                  </button>
                  <button
                    className="border p-[8px] text-[#777] flex items-center h-[34px] w-[34px]"
                    onClick={() => deleteFieldOption(index)}
                  >
                    <BsTrashFill />
                  </button>
                </div>
                {/* {isExpanded ? <div>Set</div> : null} */}
              </>
            ))}
            <div className="pl-[24px] flex gap-[3px] mt-[5px]">
              <button
                className="border text-[14px] flex items-center gap-[5px] pl-[12px] pr-[12px] pt-[6px] pb-[6px] hover:bg-[#e6e6e6]"
                onClick={addFieldsHandler}
              >
                <LuPlus size={18} />
                <p className="text-[12px]">Add Field</p>
              </button>
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
  );
};

export default Ranking;
