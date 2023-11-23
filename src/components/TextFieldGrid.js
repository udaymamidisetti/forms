import React, { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { RiDragMove2Fill } from "react-icons/ri";
import fieldData from "../fieldData";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTextfieldGridInstance,
  handleColumnWidth,
  handleHideNumber,
  handleImages,
  handleInputChange,
  handleRequiredOption,
  handleRandomFields,
  handleAddField,
  handleDeleteField,
  toggleExpansion,
  handleValidation,
  handleFieldChange,
  handleAnswerTextarea,
  toggleMinimize,
} from "../redux/slices/TextFieldGridSlice";
import {
  deleteToken,
  setAllStateValues,
  setTokenId,
} from "../redux/slices/FormSlice";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TextFieldGrid = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const [showFull, setShowFull] = useState(false);
  const [fData, setfData] = useState([...fieldData]);
  const tokenId = useSelector((state) => state.formData.tokenId);
  const textFieldGridStates = useSelector(
    (state) => state.TextFieldGrid.byId[componentId]
  );
  const question = useSelector((state) => {
    const instance = state.TextFieldGrid.byId[componentId];
    if (!instance) {
      return "What question would you like to ask?";
    }
    return instance.question;
  });
  const minimize = useSelector((state) => {
    const instance = state.TextFieldGrid.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.minimize;
  });
  const fieldsData = useSelector((state) => {
    const instance = state.TextFieldGrid.byId[componentId];
    if (!instance) {
      return fieldData;
    }
    return instance.fieldsData;
  });
  const validation = useSelector((state) => {
    const instance = state.TextFieldGrid.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.validation;
  });
  const answerTextarea = useSelector((state) => {
    const instance = state.TextFieldGrid.byId[componentId];
    if (!instance) {
      return "single";
    }
    return instance.answerTextarea;
  });
  const handleChange = (componentId) => (content) => {
    dispatch(handleInputChange({ componentId, value: content }));
  };
  const deleteFieldOption = (index) => {
    setfData((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });
  };
  const addFieldsHandler = () => {
    const newOption = { title: `Field ${fieldsData.length + 1}` };
    console.log(newOption);
    dispatch(
      handleAddField({
        componentId,
        value: {
          ...newOption,
          expanded: false,
          includeImage: false,
          includeOtherTextField: false,
          image: "",
        },
      })
    );
  };
  const handleToggleExpansion = (index) => {
    dispatch(toggleExpansion({ componentId, index }));
  };
  const handleEditorFieldChange = (componentId, index) => (content) => {
    dispatch(handleFieldChange({ componentId, index, value: content }));
  };
  const handleSave = async () => {
    const values = {
      form_data: textFieldGridStates,
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
        overallStates: textFieldGridStates,
      })
    );
    dispatch(toggleMinimize({ componentId }));
  };
  const handledeleteToken = () => {
    onDelete();
    dispatch(deleteToken());
  };
  return (
    <div>
      {minimize ? (
        <div className="w-[750px] flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
          <div className="w-[40px] bg-[#43AED8]"></div>
          <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo ">
            <div className="flex justify-between flex-1">
              <h1 className="text-[22px] text-[#333]">Text Field Grid</h1>
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
            <h1 className="mt-[30px] text-[22px] mb-[10px]">Options</h1>
            <div className="flex items-center">
              <p className="text-[#7D848C] text-[13px] w-[180px]">
                Answer Required
              </p>
              <div className="flex items-center gap-[5px]">
                <select
                  className="border text-[13px] h-[34px] w-[180px] focus:outline-none"
                  onChange={(e) =>
                    dispatch(
                      handleRequiredOption({
                        componentId,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
            <div className="flex mt-[30px]">
              <p className="text-[#7D848C] text-[13px] w-[180px]">
                Hide number
              </p>
              <div className="flex items-center gap-[5px]">
                <input
                  type="checkbox"
                  onChange={() => dispatch(handleHideNumber({ componentId }))}
                />
                <label className="cursor-pointer text-[13px]">
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
                <div className="flex mt-[30px]">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">
                    Display Order
                  </p>
                  <div className="flex items-center gap-[5px]">
                    <label className="cursor-pointer text-[13px] flex items-center gap-[5px]">
                      <input
                        type="checkbox"
                        onChange={() =>
                          dispatch(handleRandomFields({ componentId }))
                        }
                      />
                      Randomize Fields
                    </label>
                  </div>
                </div>
                <div className="flex mt-[20px] items-center">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">
                    Label column width
                  </p>
                  <div>
                    <div className="flex items-center gap-[5px]">
                      <select
                        className="border focus:outline-none text-[12px] p-[5px]"
                        onChange={(e) =>
                          dispatch(
                            handleColumnWidth({
                              componentId,
                              value: e.target.value,
                            })
                          )
                        }
                      >
                        <option value="10%">10%</option>
                        <option value="20%">20%</option>
                        <option value="30%">30%</option>
                        <option value="40%">40%</option>
                        <option value="50%">50%</option>
                        <option value="60%">60%</option>
                        <option value="70%">70%</option>
                        <option value="80%">80%</option>
                        <option value="90%">90%</option>
                      </select>
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
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <h1 className="mt-[30px] text-[22px] mb-[10px]">Fields</h1>
            <p className="pl-[30px] text-[#777] text-[13px]">Label</p>
            <div>
              {fieldsData.map((e, index) => (
                <div key={index}>
                  <div className="flex items-center gap-[5px] mt-[5px] w-[670px]">
                    <RiDragMove2Fill color="#777" size={19} />
                    <Editor
                      // onInit={(evt, editor) => (editorRef.current = editor)}
                      // initialValue={`<p class='tinymce-heading'>${e.title}</p>`}
                      value={`${e.title}`}
                      inline={true}
                      init={{
                        menubar: false,
                        plugins: "lists help",
                        toolbar:
                          "bold italic forecolor underline link removeformat",
                        toolbar_mode: "wrap",
                        ui_mode: "split",
                      }}
                      onEditorChange={handleEditorFieldChange(
                        index,
                        componentId
                      )}
                    />
                    <button
                      className="border p-[8px] text-[#777] h-[34px] w-[34px]"
                      // onClick={handleToggleExpansion(index)}
                      // onClick={() => dispatch(toggleExpansion(index))}
                      onClick={() => handleToggleExpansion(index)}
                    >
                      <BiSolidChevronDown />
                    </button>
                    <button
                      className="border p-[8px] text-[#777] flex items-center h-[34px] w-[34px]"
                      onClick={() =>
                        dispatch(
                          handleDeleteField({
                            componentId,
                            i: index,
                          })
                        )
                      }
                    >
                      <BsTrashFill />
                    </button>
                  </div>
                  {e.expanded && (
                    <div className="bg-[#F3F3F3] w-[568px] ml-[24px] mt-[5px] pb-[15px]">
                      <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                        <p className="text-[#7D848C] text-[13px] w-[100px]">
                          Initial answer
                        </p>
                        <input
                          className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                          placeholder="Optional-a pre-filled text value"
                        />
                      </div>
                      <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                        <p className="text-[#7D848C] text-[13px] w-[100px]">
                          Validation
                        </p>
                        <select
                          className="text-[13px] w-[150px] h-[30px] focus:outline-none"
                          onChange={(e) =>
                            dispatch(
                              handleValidation({
                                index,
                                componentId,
                                value: e.target.value,
                              })
                            )
                          }
                        >
                          <option value="none">None</option>
                          <option value="email">Email</option>
                          <option value="url">URL</option>
                          <option value="alpha">Letters</option>
                          <option value="alphanum">Letters & Numbers</option>
                          <option value="all">All characters</option>
                          <option value="wordCount">Word limit</option>
                          <option value="dateYear">Date(YYYY/MM/DD)</option>
                          <option value="dateMonth">Date(MM/DD/YYYY)</option>
                          <option value="dateDay">Date(DD/MM/YYYY)</option>
                          <option value="num">Number (integer)</option>
                          <option value="float">Floating point</option>
                          <option value="regex">Regular expression</option>
                        </select>
                      </div>
                      {e.validation === "email" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                              placeholder="This field can only consist of a valid email address."
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "url" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                              placeholder="This field can only consist of a valid URL (website)."
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "alpha" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[59px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Limit length
                            </p>
                            <div className="flex items-center">
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Min"
                              />
                              <p className="text-[13px]">to</p>
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Max"
                              />
                              <p className="text-[13px]">characters</p>
                            </div>
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none placeholder:text-[13px]"
                              placeholder="This field can only consist of letters."
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "alphanum" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[59px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Limit length
                            </p>
                            <div className="flex items-center">
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Min"
                              />
                              <p className="text-[13px]">to</p>
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Max"
                              />
                              <p className="text-[13px]">characters</p>
                            </div>
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none placeholder:text-[13px]"
                              placeholder="This field can only consist of letters or numbers."
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "all" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[59px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Limit length
                            </p>
                            <div className="flex items-center">
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Min"
                              />
                              <p className="text-[13px]">to</p>
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Max"
                              />
                              <p className="text-[13px]">characters</p>
                            </div>
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none placeholder:text-[13px]"
                              placeholder="This field must consist of between %MIN% and %MAX% characters."
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "wordCount" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[59px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Limit length
                            </p>
                            <div className="flex items-center">
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Min"
                              />
                              <p className="text-[13px]">to</p>
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Max"
                              />
                              <p className="text-[13px]">characters</p>
                            </div>
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none placeholder:text-[13px]"
                              placeholder="This field must consist of between %MIN% and %MAX% words."
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "dateYear" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                              placeholder="This field must have a date in the form YYYY/MM/DD"
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "dateMonth" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                              placeholder="This field must have a date in the form MM/DD/YYYY"
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "dateDay" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                              placeholder="This field must have a date in the form DD/MM/YYYY"
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "num" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[62px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Limit value
                            </p>
                            <div className="flex items-center">
                              <p className="text-[13px]">Between</p>
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Min"
                              />
                              <p className="text-[13px]">and</p>
                              <input
                                className="w-[50px] focus:outline-none text-[13px] text-center"
                                placeholder="Max"
                              />
                              <p className="text-[13px]">characters</p>
                            </div>
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none placeholder:text-[13px]"
                              placeholder="This field can only consist of numbers."
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "float" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[59px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Limit length
                            </p>
                            <div className="flex items-center">
                              <input
                                className="w-[50px] h-[25px] focus:outline-none text-[13px] text-center"
                                placeholder="Min"
                              />
                              <p className="text-[13px]">to</p>
                              <input
                                className="w-[50px] h-[25px] focus:outline-none text-[13px] text-center"
                                placeholder="Max"
                              />
                              <p className="text-[13px]">characters</p>
                            </div>
                          </div>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input
                              className="w-[50px] h-[25px] focus:outline-none text-[13px] text-center"
                              placeholder="#"
                            />
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none placeholder:text-[13px]"
                              placeholder="This field can only consist of numbers and decimals."
                            />
                          </div>
                        </>
                      )}
                      {e.validation === "regex" && (
                        <>
                          <div className="flex gap-[29px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] text-[#7D848C]">
                              Answer required
                            </p>
                            <input type="checkbox" />
                          </div>
                          <div className="flex gap-[59px] mt-[10px]">
                            <p className="text-[13px] ml-[10px] mt-[5px] text-[#7D848C]">
                              Regix value
                            </p>
                            <input
                              className="text-[13px] focus:outline-none p-[3px]"
                              placeholder="Enter a value"
                            />
                          </div>
                          <div className="flex gap-[30px] items-center pt-[7px] ml-[10px]">
                            <p className="text-[#7D848C] text-[13px] w-[100px]">
                              Error message
                            </p>
                            <input
                              className="border w-[440px] p-[3px] text-[13px] focus:outline-none placeholder:text-[13px]"
                              placeholder="Invalid field input."
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
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
            </div>
            <div class="flex mt-[30px]">
              <p class="text-[#7D848C] text-[13px] w-[180px]">
                Answer text area
              </p>
              <div class="flex items-center gap-[5px]">
                <label class="text-[13px] flex gap-[5px]">
                  <input
                    name="multiple"
                    type="radio"
                    value="single"
                    onChange={(e) =>
                      dispatch(
                        handleAnswerTextarea({
                          componentId: componentId,
                          value: e.target.value,
                        })
                      )
                    }
                  />
                  Single line
                </label>
                <label class="text-[13px] flex gap-[5px]">
                  <input
                    type="radio"
                    className="ml-[10px]"
                    value="multiple"
                    name="multiple"
                    onChange={(e) =>
                      dispatch(
                        handleAnswerTextarea({
                          componentId: componentId,
                          value: e.target.value,
                        })
                      )
                    }
                  />
                  Multiple line
                </label>
              </div>
            </div>

            <section className="mt-[40px] flex justify-end">
              <button
                className="leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[18px] pr-[18px] text-[#3c8dd5]"
                // onClick={() => handleDeleteContent(uuidv4())}
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
          <div className="w-[40px] bg-[#43AED8]"></div>
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
                    dispatch(addTextfieldGridInstance({ componentId }));
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
            <div className="mt-[20px] pb-[10px] pointer-events-none">
              {fieldsData.map((e, i) => (
                <div className="flex w-[95%] justify-between mt-[10px]" key={i}>
                  <div
                    dangerouslySetInnerHTML={{ __html: e.title }}
                    className="w-[40%]"
                  />
                  {answerTextarea === "single" && (
                    <input className="h-[34px] w-[100%] pt-[6px] pr-[12px] pl-[12px] pb-[6px] border-[1px] border-solid focus:outline-none" />
                  )}
                  {answerTextarea === "multiple" && (
                    <textarea className="h-[100px] w-[100%] border-[1px] border-solid focus:outline-none"></textarea>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextFieldGrid;
