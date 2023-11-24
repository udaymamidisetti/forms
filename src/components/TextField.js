import React, { useState, useCallback, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import {
  addTextFieldInstance,
  handleInputChange,
  handleAnswerText1,
  handleAnswerText2,
  handleRequiredOption,
  handleHideNumber,
  handleInitialValue,
  handleImages,
  toggleMinimize,
  handleRemoveImage,
} from "../redux/slices/TextFieldSlice";
import { Editor } from "@tinymce/tinymce-react";
import {
  deleteToken,
  setAllStateValues,
  setTokenId,
} from "../redux/slices/FormSlice";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TextField = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const questionInput = useSelector((state) => state.textField.questionInput);
  const tokenId = useSelector((state) => state.formData.tokenId);
  const textFieldStates = useSelector(
    (state) => state.textField.byId[componentId]
  );
  const question = useSelector((state) => {
    const instance = state.textField.byId[componentId];
    if (!instance) {
      return "What question would you like to ask?";
    }
    return instance.question;
  });
  const image = useSelector((state) => {
    const instance = state.textField.byId[componentId];
    if (!instance) {
      return null;
    }
    return instance.image;
  });
  const radioValue = useSelector((state) => {
    const instance = state.textField.byId[componentId];
    if (!instance) {
      return "single";
    }
    return instance.answerText;
  });
  const minimize = useSelector((state) => {
    const instance = state.textField.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.minimize;
  });
  const [showFull, setShowFull] = useState(false);
  const handleChange = (componentId) => (content) => {
    dispatch(handleInputChange({ componentId, value: content }));
  };

  const handleSingleChange = () => {
    dispatch(handleAnswerText1());
  };

  const handleMultipleChange = () => {
    dispatch(handleAnswerText2());
  };
  const handleSave = async () => {
    const values = {
      form_data: textFieldStates,
      tokenId: tokenId,
    };

    await axios
      .post("https://demo.sending.app/react-api", values)
      .then((response) => {
        console.log("Response:", response.data);
        dispatch(setTokenId(response.data.tokenId));
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
        overallStates: textFieldStates,
      })
    );
    dispatch(toggleMinimize({ componentId }));
  };
  const handledeleteToken = () => {
    onDelete();
    dispatch(deleteToken());
  };

  // useEffect(() => {
  //   dispatch(addTextFieldInstance({ componentId }));
  // }, []);

  return (
    <div>
      {minimize ? (
        <div className="flex mt-[15px] bg-white w-[750px]">
          <div className="w-[40px] bg-[#000]"></div>
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
            <p className="text-[#7D848C] pt-[7px] text-[12px]">Question</p>
            <Editor
              // onInit={(evt, editor) => (editorRef.current = editor)}
              inline={true}
              value={`${question}`}
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
              // value={question}
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
                  onChange={() => dispatch(handleAnswerText1({ componentId }))}
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
                  onChange={() => dispatch(handleAnswerText2({ componentId }))}
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
                  onChange={() =>
                    dispatch(handleRequiredOption({ componentId }))
                  }
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
              <p className="text-[#7D848C] text-[13px] w-[180px]">
                Hide number
              </p>
              <div className="flex items-center gap-[5px]">
                <input
                  type="checkbox"
                  id="required"
                  onChange={() => dispatch(handleHideNumber({ componentId }))}
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
                    {image === null ? (
                      <input
                        type="file"
                        className=""
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
                <div className="flex mt-[20px] items-center">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">
                    Initial value
                  </p>
                  <div>
                    <div className="flex items-center gap-[5px]">
                      <input
                        className="w-[450px] border focus:outline-none p-[5px]  placeholder:text-[13px]"
                        placeholder="Optional- a prefilled text value"
                        onChange={(e) =>
                          dispatch(
                            handleInitialValue({
                              componentId: componentId,
                              value: e.target.value,
                            })
                          )
                        }
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
      ) : (
        <div className="flex gap-[10px] bg-white mt-[15px]">
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
                    dispatch(addTextFieldInstance({ componentId }));
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
            {radioValue === "single" && (
              <input className="mb-[20px] border-[1px] border-solid w-[99%] mt-[10px] focus:outline-none h-[35px] rounded-md pointer-events-none" />
            )}
            {radioValue === "multiple" && (
              <textarea
                className="mb-[20px] border-[1px] border-solid w-[99%] mt-[10px] h-[70px] rounded-md focus:outline-none pointer-events-none"
                cols={15}
              ></textarea>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextField;
