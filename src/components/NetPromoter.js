import React, { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import {
  addNetPromoterInstance,
  setHideNumber,
  setRequired,
  setLeftLabel,
  setRightLabel,
  setDisplayTextFields,
  handleImages,
  handleInputChange,
  toggleMinimize,
  handleRemoveImage,
} from "../redux/slices/NetPromoterSlice";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteToken,
  setAllStateValues,
  setTokenId,
} from "../redux/slices/FormSlice";
import { Tooltip as ReactTooltip } from "react-tooltip";

const NetPromoter = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const NetPromoterStates = useSelector(
    (state) => state.NetPromoter.byId[componentId]
  );
  const tokenId = useSelector((state) => state.formData.tokenId);
  const question = useSelector((state) => {
    const instance = state.NetPromoter.byId[componentId];
    if (!instance) {
      return "What question would you like to ask?";
    }
    return instance.question;
  });
  const image = useSelector((state) => {
    const instance = state.NetPromoter.byId[componentId];
    if (!instance) {
      return null;
    }
    return instance.image;
  });
  console.log(question);
  const displayText = useSelector((state) => {
    const instance = state.NetPromoter.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.textLabels;
  });
  const leftLabel = useSelector((state) => {
    const instance = state.NetPromoter.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.leftLabel;
  });
  const rightLabel = useSelector((state) => {
    const instance = state.NetPromoter.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.rightLabel;
  });
  const minimize = useSelector((state) => {
    const instance = state.NetPromoter.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.minimize;
  });
  const [showFull, setShowFull] = useState(false);
  const handleChange = (componentId) => (content) => {
    dispatch(handleInputChange({ componentId, value: content }));
  };
  // const handleSave = async () => {
  //   const values = {
  //     form_data: NetPromoterStates,
  //     tokenId: tokenId,
  //   };

  //   await axios
  //     .post("https://demo.sending.app/react-api", values)
  //     .then((response) => {
  //       console.log("Response:", response.data);
  //       dispatch(setTokenId(response.data.tokenId));
  //       Cookies.set("tokenId", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting form:", error);
  //     });
  // };

  const saveOverallState = () => {
    // handleSave();
    dispatch(
      setAllStateValues({
        componentId,
        overallStates: NetPromoterStates,
      })
    );
    dispatch(toggleMinimize({ componentId }));
  };
  const handledeleteToken = () => {
    onDelete();
    dispatch(deleteToken());
  };
  return (
    <div className="mt-[20px] bg-white">
      {minimize ? (
        <div className="flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
          <div className="w-[40px] bg-[#000]"></div>
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
            <p className="text-[#7D848C] pt-[7px] text-[14px]">Question</p>
            <Editor
              inline={true}
              value={question}
              init={{
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                toolbar_mode: "wrap",
                ui_mode: "split",
                directionality: "ltr",
              }}
              onEditorChange={handleChange(componentId)}
            />
            <div className="flex mt-[30px]">
              <p className="text-[#7D848C] text-[13px] w-[180px]">Labels</p>
              <div className="flex items-center gap-[5px]">
                <label className="cursor-pointer text-[13px] flex items-center gap-[5px]">
                  <input
                    type="checkbox"
                    onChange={() =>
                      dispatch(setDisplayTextFields({ componentId }))
                    }
                  />
                  Display text labels
                </label>
              </div>
            </div>
            {displayText && (
              <>
                <div className="flex mt-[30px] items-center">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">
                    Left label
                  </p>
                  <div className="flex items-center gap-[5px]">
                    <input
                      type="text"
                      id="required"
                      className="border focus:outline-none text-[12px] pl-[6px] pt-[3px] pb-[3px] w-[480px]"
                      value={leftLabel}
                      onChange={(e) =>
                        dispatch(
                          setLeftLabel({
                            componentId: componentId,
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex mt-[30px] items-center">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">
                    Right label
                  </p>
                  <div className="flex items-center gap-[5px]">
                    <input
                      type="text"
                      id="required"
                      className="border focus:outline-none text-[12px] pl-[6px] pt-[3px] pb-[3px] w-[480px]"
                      value={rightLabel}
                      onChange={(e) =>
                        dispatch(
                          setRightLabel({
                            componentId: componentId,
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </>
            )}
            <h1 className="mt-[30px] text-[22px] mb-[10px]">Options</h1>
            <div className="flex">
              <p className="text-[#7D848C] text-[13px] w-[180px]">Required</p>
              <div className="flex items-center gap-[5px]">
                <label className="cursor-pointer text-[13px] flex items-center gap-[5px]">
                  <input
                    type="checkbox"
                    onChange={() => dispatch(setRequired({ componentId }))}
                  />
                  Respondents must answer this question
                </label>
              </div>
            </div>
            <div className="flex mt-[30px]">
              <p className="text-[#7D848C] text-[13px] w-[180px]">
                Hide number
              </p>
              <div className="flex items-center gap-[5px]">
                <label className="cursor-pointer text-[13px] flex items-center gap-[5px]">
                  <input
                    type="checkbox"
                    onChange={() => dispatch(setHideNumber({ componentId }))}
                  />
                  Hide the question number
                </label>
              </div>
            </div>
            {showFull ? (
              <p
                className="text-[#2366a2] text-[12px] mt-[20px] cursor-pointer"
                onClick={() => setShowFull(!showFull)}
              >
                Hide all Options
              </p>
            ) : (
              <p
                className="text-[#2366a2] text-[12px] mt-[20px] cursor-pointer"
                onClick={() => setShowFull(!showFull)}
              >
                Show all Options
              </p>
            )}
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
                  <div className="flex items-center gap-[5px]">
                    {image === null ? (
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) =>
                          dispatch(
                            handleImages({
                              componentId,
                              value: e.target.files[0],
                            })
                          )
                        }
                      />
                    ) : (
                      <div>
                        <img
                          src={image}
                          alt="image"
                          className="h-[150px] w-[150px] "
                        />
                        <button
                          className="p-[5px] border-[1px] border-solid rounded-md mt-[5px] text-[14px]"
                          onClick={() =>
                            dispatch(handleRemoveImage({ componentId }))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    )}
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
      ) : (
        <>
          <div className="flex gap-[10px]">
            <div className="w-[40px] bg-[#000]"></div>
            <div className="flex-1">
              <div className="flex items-center">
                <div
                  dangerouslySetInnerHTML={{ __html: question }}
                  className="text-[13px] font-bold mt-[5px] transition-opacity duration-200 ease-in-expo"
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
                      dispatch(addNetPromoterInstance({ componentId }));
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
              <div className="mt-[20px] pointer-events-none pb-[10px]">
                <div className="w-[97%] flex justify-between text-[#616060]">
                  <p>{leftLabel}</p>
                  <p>{rightLabel}</p>
                </div>
                <div className="flex gap-[10px] justify-evenly items-center pointer-events-none text-[#616060]">
                  {[...Array(10)].map((e, index) => (
                    <label className="flex flex-col items-center">
                      <p>{index}</p>
                      <input key={index} type="radio" />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NetPromoter;
