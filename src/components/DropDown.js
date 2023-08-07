import React, { useCallback, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { CgMenu } from "react-icons/cg";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { RiDragMove2Fill } from "react-icons/ri";
import { Box, Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// import data from "../data";
import {
  handleInputChange,
  handleHideNumber,
  handleRequiredOption,
  toggleExpansion,
  handleOptionChange,
  addNewOption,
  addOtherChoice,
  deleteOptionContent,
} from "../redux/slices/DropDownSlice";

const DropDown = ({ onDelete }) => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.DropDown.questionInput);
  const optionData = useSelector((state) => state.DropDown.options);
  const [showAll, setShowAll] = useState(false);
  // const [jData, setjData] = useState([...data]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const addOptionsHandler = () => {
  //   const newOption = [{ title: `Option ${jData.length + 1}` }];
  //   setjData(() => [...jData, ...newOption]);
  // };
  // const deleteOption = (index) => {
  //   setjData((prevData) => {
  //     const updatedData = [...prevData];
  //     updatedData.splice(index, 1);
  //     return updatedData;
  //   });
  // };
  const addOptionsHandler = () => {
    const newOption = { title: `Option ${optionData.length + 1}` };
    // setJdata(() => [...jData, ...newOption]);
    dispatch(
      addNewOption({
        ...newOption,
        expanded: false,
      })
    );
  };
  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      dispatch(handleInputChange(value));
    },
    [dispatch]
  );
  const handleTitleInput = (index, event) => {
    const value = event.target.value;
    console.log(value);
    dispatch(handleOptionChange({ index, value: value }));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <div>
        <div className="flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
          <div className="w-[40px] bg-[#43AED8]"></div>
          <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo ">
            <div className="flex justify-between flex-1">
              <h1 className="text-[22px] text-[#333]">Dropdown</h1>
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
            <p
              className="text-[#2366a2] text-[12px] mt-[20px] cursor-pointer"
              onClick={() => setShowAll(!showAll)}
            >
              Show all Options
            </p>
            {showAll ? (
              <>
                <div className="flex mt-[30px]">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">
                    Display Order
                  </p>
                  <div className="flex items-center gap-[5px]">
                    <input type="checkbox" id="required" />
                    <label
                      htmlFor="required"
                      className="cursor-pointer text-[13px]"
                    >
                      Randomize choices
                    </label>
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
            <h1 className="mt-[30px] text-[22px] mb-[10px]">Choices</h1>
            <p className="pl-[30px] text-[#777] text-[13px]">Label</p>
            <div>
              {optionData.map((e, index) => (
                <>
                  <div
                    className="flex items-center gap-[5px] mt-[5px]"
                    key={index}
                  >
                    <RiDragMove2Fill color="#777" size={19} />
                    <input
                      className="text-[12px] h-[34px] border focus:outline-none pt-[6px] pr-[12px] pl-[12px] pb-[6px] flex-1"
                      placeholder={e.title}
                      onChange={(event) => handleTitleInput(index, event)}
                      // value={e.title}
                    />
                    <button
                      className="border p-[8px] text-[#777] flex items-center h-[34px] w-[34px]"
                      // onClick={() => deleteOption(index)}
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
                  // onClick={addOptionsHandler}
                  onClick={addOptionsHandler}
                >
                  <LuPlus size={18} />
                  <p className="text-[12px]">Add Choice</p>
                </button>
                {/* <button className="border text-[14px] flex items-center gap-[5px] pl-[12px] pr-[12px] pt-[6px] pb-[6px] hover:bg-[#e6e6e6]">
                                <LuPlus size={18} />
                                <p className="text-[12px]">
                                  Add 'Other' Choice
                                </p>
                              </button> */}
                <button
                  className="border text-[14px] flex items-center gap-[5px] pl-[12px] pr-[12px] pt-[6px] pb-[6px] hover:bg-[#e6e6e6]"
                  onClick={handleOpen}
                >
                  <CgMenu size={18} />
                  <p className="text-[12px]">Bulk Add</p>
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{
                    animation: "slideInFromTop 0.3s ease-in-out",
                  }}
                >
                  <Box sx={style}>
                    <h4 className="font-[500]">Quick Entry</h4>
                    <p className="text-[12px] mt-[10px]">
                      Enter one choice per line
                    </p>
                    <textarea className=" focus:outline-none w-full border h-[200px] mt-[5px] p-[10px] placeholder:text-[12px]"></textarea>
                    <p className="text-[#737373] text-[12px]">
                      Adding in bulk will replace your existing choices with
                      those entered.
                    </p>
                    <div>
                      <button className="bg-transparent text-[#2366a2] text-[12px] pt-[6px] pb-[6px] pr-[12px] pl-[12px]">
                        Close
                      </button>
                      <button className="bg-[#2773b7] text-white text-[12px] pt-[6px] pb-[6px] pr-[12px] pl-[12px]">
                        Save choices
                      </button>
                    </div>
                  </Box>
                </Modal>
              </div>
              {/* <div className="flex items-center gap-[5px] pl-[24px] mt-[20px] pt-[7px]">
                              <input type="checkbox" id="check" />
                              <label htmlFor="check" className="text-[12px]">
                                Allow more than one answer to this question
                                <span className="font-bold">
                                  {" "}
                                  (use checkboxes)
                                </span>
                              </label>
                            </div> */}
            </div>
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
    </div>
  );
};

export default DropDown;
