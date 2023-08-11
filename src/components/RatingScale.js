import React, { useState, useCallback } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  handleInputChange,
  handleHideNumber,
  handleRequiredOption,
  handleAgreeOptions,
  handleNaCondition,
  handleDisplayMode,
} from "../redux/slices/RatingScaleSlice";
import { Box, Modal } from "@mui/material";

const RatingScale = ({ onDelete }) => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.RatingScale.questionInput);
  const agreedOption = useSelector((state) => state.RatingScale.agreeOptions);
  const naCondition = useSelector((state) => state.RatingScale.naCondition);
  const displayMode = useSelector((state) => state.RatingScale.displayMode);
  const [showFull, setShowFull] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      dispatch(handleInputChange(value));
    },
    [dispatch]
  );

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
      <div className="w-[750px] flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
        <div className="w-[40px] bg-[#43AED8]"></div>
        <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo ">
          <div className="flex justify-between flex-1">
            <h1 className="text-[22px] text-[#333]">Rating Scale</h1>
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
              <label htmlFor="required" className="cursor-pointer text-[13px]">
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
            <div className="transition-opacity duration-200 ease-in-expo">
              <div className="flex mt-[15px] items-center">
                <p className="text-[#7D848C] text-[13px] w-[180px]">
                  Choice layout
                </p>
                <div className="flex items-center gap-[5px]">
                  {/* <input
                  type="checkbox"
                  id="random"
                  onChange={() => dispatch(handleHideNumber())}
                />
                <label htmlFor="random" className="cursor-pointer text-[13px]">
                  Randomize choices
                </label> */}
                  <select className="border w-[250px] focus:outline-none h-[30px] text-[12px]">
                    <option className="text-[12px]">Vertical</option>
                    <option
                      value="horizontal"
                      selected=""
                      className="text-[12px]"
                    >
                      Horizontal with choice text on the same line
                    </option>
                    <option value="horizontal-above" className="text-[12px]">
                      Horizontal with choice text above
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex mt-[15px] items-center">
                <p className="text-[#7D848C] text-[13px] w-[180px]">
                  Identifier
                </p>
                <div className="flex items-center gap-[5px]">
                  <input
                    className="border w-[490px] focus:outline-none h-[30px] pl-[5px]"
                    // onChange={() => dispatch(handleHideNumber())}
                  />
                </div>
              </div>
              <div className="flex mt-[15px]">
                <p className="text-[#7D848C] text-[13px] w-[180px]">Media</p>
                <div className="flex items-center gap-[5px]">
                  <input type="file" />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <h1 className="mt-[30px] text-[22px] mb-[10px]">Scale</h1>
          <div className="flex items-center mt-[30px]">
            <p className="w-[180px] text-[#7D848C] text-[13px]">Scale type</p>
            <div className="flex gap-[10px]">
              <div>
                <select
                  className="h-[34px] border w-[190px] text-[13px] pl-[6px] focus:outline-none"
                  onChange={(e) => dispatch(handleAgreeOptions(e.target.value))}
                  value={agreedOption}
                >
                  <option value="agree2">Agree-Disagree(2 levels)</option>
                  <option value="agree3">Agree-Disagree(3 levels)</option>
                  <option value="agree4">Agree-Disagree(4 levels)</option>
                  <option value="agree5">Agree-Disagree(5 levels)</option>
                </select>
              </div>
              <button
                className="h-[34px] border w-[70px] placeholder:text-[black] text-[13px] text-center"
                onClick={() => setModalShow(true)}
              >
                Preview
              </button>
              <Modal
                open={modalShow}
                onClose={() => setModalShow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                  animation: "slideInFromTop 0.05s ease-in-out",
                }}
              >
                <Box sx={style}>
                  <h1 className="font-bold">Preview Rating Scale</h1>
                  <div>
                    <p className="text-[13px]">Scale Name</p>
                    <p>{}</p>
                  </div>
                  <div>
                    <p className="text-[13px]">Choices</p>
                    <p>{}</p>
                  </div>
                  <button
                    className="bg-transparent text-[12px] text-[#2366a2] cursor-pointer ml-auto block"
                    onClick={() => setModalShow(false)}
                  >
                    Close
                  </button>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="flex items-center mt-[20px]">
            <p className="w-[180px] text-[#7D848C] text-[13px]">Display mode</p>
            <select
              className="border text-[13px] h-[34px] w-[100px] focus:outline-none"
              onChange={(e) => dispatch(handleDisplayMode(e.target.value))}
              value={displayMode}
            >
              <option value="Radio">Radio list</option>
              <option value="Drop">Dropdown</option>
            </select>
          </div>

          <div className="flex items-center mt-[20px]">
            <p className="w-[180px] text-[#7D848C] text-[13px]">
              Show N/A option
            </p>
            <select
              className="border text-[13px] h-[34px] w-[100px] focus:outline-none"
              onChange={(e) => dispatch(handleNaCondition(e.target.value))}
              value={naCondition}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="flex items-center mt-[20px]">
            <p className="w-[180px] text-[#7D848C] text-[13px]">
              Scoring direction
            </p>
            <select className="border text-[13px] h-[34px] w-[100px] focus:outline-none">
              <option>Ascending</option>
              <option>Descending</option>
            </select>
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
  );
};

export default RatingScale;
