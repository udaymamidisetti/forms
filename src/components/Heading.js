import React, { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  addHeadingInstance,
  handleHeading,
  toggleMinimize,
} from "../redux/slices/HeadingSlice";
import axios from "axios";
import {
  deleteToken,
  setAllStateValues,
  setTokenId,
} from "../redux/slices/FormSlice";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Heading = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const headingState = useSelector((state) => state.Heading.byId[componentId]);
  const tokenId = useSelector((state) => state.formData.tokenId);
  const applicationState = useSelector(
    (state) => state.formData.allStateValues
  );
  // const heading = useSelector((state) => state.Heading.heading.componentId);
  const heading = useSelector((state) => {
    const instance = state.Heading.byId[componentId];
    if (!instance) {
      return "Enter your heading here";
    }
    return instance.heading;
  });
  const minimize = useSelector((state) => {
    const instance = state.Heading.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.minimize;
  });
  const [headingText, setHeadingText] = useState("");

  const onChangeHeading = (event) => {
    dispatch(handleHeading({ componentId, value: event.target.value }));
  };
  const handleSave = async () => {
    const values = {
      form_data: applicationState,
      tokenId: tokenId,
    };

    await axios
      .post("https://demo.sending.app/react-api", values)
      .then((response) => {
        console.log("Response:", response.data);
        dispatch(setTokenId(response.data.tokenId));
        // Cookies.set("tokenId", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const saveOverallState = () => {
    // handleSave();
    dispatch(
      setAllStateValues({
        componentId,
        overallStates: headingState,
      })
    );
  };
  const handledeleteToken = () => {
    onDelete();
    dispatch(deleteToken());
  };

  return (
    <div>
      {minimize ? (
        <div className="flex mt-[15px] bg-white w-[750px]">
          <div className="w-[40px] bg-[#000] h-[420px]"></div>
          <div className="flex-1 p-[20px]">
            <div className="flex justify-between flex-1">
              <h1 className="text-[22px] text-[#333]">Edit Heading</h1>
              <div className="flex">
                <div className="mr-[5px]">
                  <button
                    style={{
                      boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                    }}
                    // onClick={() => handleDeleteContent(uuidv4())}
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
                    //   onClick={saveFields}
                    onClick={saveOverallState}
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
            {/* <ReactQuill
                          theme="snow"
                          value={value}
                          onChange={handleChange}
                          className="mt-[20px]"
                        /> */}
            <textarea
              placeholder="Enter you heading here"
              className="border w-[100%] h-[80px] placeholder:text-[13px] p-[10px] focus:outline-none text-[13px]"
              value={heading}
              //   onChange={handleChange}
              onChange={onChangeHeading}
              // onChange={(e) => setHeadingText(e.target.value)}
            ></textarea>
            <div className="border mt-[20px]"></div>
            <section className="mt-[30px] flex justify-end">
              <button
                className="leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[18px] pr-[18px] text-[#3c8dd5]"
                onClick={onDelete}
              >
                Cancel
              </button>
              <button className="leading-[20px] text-[12px] pt-[6px] pb-[6px] pl-[18px] pr-[18px] bg-[#5cb85c] text-[white]">
                Save Heading
              </button>
            </section>
          </div>
        </div>
      ) : (
        <div className="flex gap-[10px] bg-white mt-[15px]">
          <div className="w-[40px] bg-[#000]"></div>
          <div className="flex-1">
            <div className="flex items-center">
              <div
                dangerouslySetInnerHTML={{ __html: heading }}
                className="text-[13px] font-bold mt-[5px] transition-opacity duration-200 ease-in-expo pb-[10px]"
              />
              <div
                className="ml-auto h-[35px] mt-[10px] mr-[10px] bottom-[90px] right-[20px] flex items-center gap-[11px] p-[10px] justify-around"
                style={{
                  boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                }}
              >
                <button
                  className="p-[5px] text-[14px] font-bold"
                  onClick={() => {
                    dispatch(addHeadingInstance({ componentId }));
                    dispatch(toggleMinimize({ componentId }));
                  }}
                  data-tooltip-id="Edit"
                >
                  Edit
                </button>
                <ReactTooltip
                  id="Edit"
                  place="top"
                  content="Edit Your Choice"
                />

                <FaTrashCan
                  data-tooltip-id="Delete"
                  size={16}
                  className="text-[20px] text-[#eee] cursor-pointer hover:text-[black]"
                  onClick={handledeleteToken}
                />
                <ReactTooltip id="Delete" place="top" content="Delete" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heading;
