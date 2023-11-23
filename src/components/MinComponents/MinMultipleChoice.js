import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMinimize } from "../../redux/slices/MultipleChoiceSlice";
import data from "../../data";
import { FiMove } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { deleteToken } from "../../redux/slices/FormSlice";

const MinMultipleChoice = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const question = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return "What question would you like to ask?";
    }
    return instance.question;
  });
  const optionData = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return data;
    }
    return instance.options;
  });
  const handledeleteToken = () => {
    onDelete();
    dispatch(deleteToken());
  };
  return (
    <>
      <div
        className="transition-opacity duration-200 ease-in-expo ml-[10px] pointer-events-none"
        // onClick={setMinimize(() => !minimize)}
      >
        {" "}
        <div className="p-[15px]">
          <div
            dangerouslySetInnerHTML={{ __html: question }}
            className="text-[13px] font-bold mt-[5px] transition-opacity duration-200 ease-in-expo"
          />
          {optionData.map((e, index) => (
            <div
              key={index}
              className="flex gap-[5px] items-center mt-[10px] ml-[10px] mb-[10px]"
            >
              <input type="radio" />
              <div
                dangerouslySetInnerHTML={{ __html: e.title }}
                className="text-[12px] text-[#555]"
              />
            </div>
          ))}
        </div>
        {/* <div>
    <RiDragMove2Fill {...dragHandleProps} />
  </div> */}
      </div>
      <div
        className="ml-auto h-[45px] mt-[10px] mr-[10px] bottom-[90px] right-[20px] flex items-center gap-[11px] p-[10px] justify-around"
        style={{
          boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
        }}
      >
        <FiMove className="text-[20px] text-[#eee] cursor-all-scroll hover:text-[black] hidden" />
        <MdOutlineModeEdit
          className="text-[20px] text-[#eee] hover:text-[black]"
          onClick={() => dispatch(toggleMinimize({ componentId }))}
        />
        {/* <HiOutlineClipboardDocument className=" text-[16px] text-[#eee] cursor-pointer" /> */}
        <FaTrashCan
          size={16}
          className="text-[20px] text-[#eee] cursor-pointer hover:text-[black]"
          onClick={handledeleteToken}
        />
      </div>
    </>
  );
};

export default MinMultipleChoice;
