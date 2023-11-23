import React, { useState, useCallback, useEffect } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { CgMenu } from "react-icons/cg";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { RiDragMove2Fill } from "react-icons/ri";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import data from "../data";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  handleInputChange,
  handleHideNumber,
  handleRequiredOption,
  toggleExpansion,
  handleOptionChange,
  addNewOption,
  addOtherChoice,
  deleteOptionContent,
  handleChoiceLayout,
  handleImages,
  handleRandomChoice,
  handleMultipleAnswers,
  handleBulkAdd,
  reorderOptions,
  setOrder,
  setOtherTextField,
  setIncludeImage,
  handleSetImage,
  addMultipleChoiceInstance,
  deleteMultipleChoiceInstance,
  setOptionPositionImage,
  toggleMinimize,
  handleRemoveImage,
  handleRemoveOptionImage,
} from "../redux/slices/MultipleChoiceSlice";
import { deleteToken } from "../redux/slices/FormSlice";
import {
  addPreviewArray,
  setTokenId,
  setOption,
  setAllStateValues,
} from "../redux/slices/FormSlice";
import { Box, Modal } from "@mui/material";
import Cookies from "js-cookie";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { FiMove } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
// import { v4 as uuidv4 } from "uuid";
import { v4 as uuid } from "uuid";
import { Tooltip as ReactTooltip } from "react-tooltip";

const MultipleChoice = ({ onDelete, dragHandleProps, componentId }) => {
  console.log(componentId);
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const applicationState = useSelector(
    (state) => state.formData.allStateValues
  );
  const tokenId = useSelector((state) => state.formData.tokenId);
  console.log(applicationState);
  const question = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return "What question would you like to ask?";
    }
    return instance.question;
  });
  const requiredOption = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.requiredOption;
  });
  const hideNumber = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.hideNumber;
  });
  const randomChoice = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.randomChoice;
  });
  const minimize = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.minimize;
  });
  console.log(minimize);
  const image = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return null;
    }
    return instance.image;
  });
  console.log(image);
  const multipleAnswers = useSelector(
    (state) => state.MultipleChoice.multipleAnswers
  );
  const optionData = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return data;
    }
    return instance.options;
  });
  const multipleChoiceState = useSelector(
    (state) => state.MultipleChoice.byId[componentId]
  );
  const choiceLayout = useSelector((state) => {
    const instance = state.MultipleChoice.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.choiceLayout;
  });
  const includeImage = useSelector(
    (state) => state.MultipleChoice.byId[componentId]
  );
  console.log(choiceLayout);
  const [jData, setJdata] = useState([...data]);
  const [bulkInputText, setBulkInputText] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [open, setOpen] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [bulkArray, setBulkArray] = useState([]);
  // const [minimize, setMinimize] = useState(true);
  const [quillText, setQuillText] = useState("");
  const [newData, setNewData] = useState([]);
  // const [includeImage, setIncludeImage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBulkInputChange = (event) => {
    setBulkInputText(event.target.value);
  };
  const handleSaveBulkChoices = () => {
    dispatch(handleBulkAdd({ componentId, bulkArray }));
    handleClose();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const words = bulkInputText.trim(" ");
      setBulkArray((p) => [...p, { title: bulkInputText }]);
    }
  };
  const handleQuillChange = (content, delta, source, editor) => {
    setQuillText(content);
    dispatch(handleInputChange(quillText));
  };
  const handleChange = (componentId) => (content) => {
    dispatch(handleInputChange({ componentId, value: content }));
  };
  const addOptionsHandler = () => {
    const newOption = { title: `Option ${optionData.length + 1}` };
    // setJdata(() => [...jData, ...newOption]);
    dispatch(
      addNewOption({
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
  const addOtherChoices = () => {
    const newChoice = { title: `Other(Please Specify)` };
    dispatch(
      addOtherChoice({
        componentId,
        value: {
          ...newChoice,
          expanded: false,
        },
      })
    );
  };
  const renderFullOptions = () => {
    return (
      <div>
        {showFull ? (
          <div className="w-[750px] transition-opacity duration-200 ease-in-expo">
            <div className="flex mt-[15px]">
              <p className="text-[#7D848C] text-[13px] w-[180px]">
                Display order
              </p>
              <div className="flex items-center gap-[5px]">
                <input
                  type="checkbox"
                  id="random"
                  onChange={() => dispatch(handleRandomChoice({ componentId }))}
                  checked={randomChoice}
                />
                <label htmlFor="random" className="cursor-pointer text-[13px]">
                  Randomize choices
                </label>
              </div>
            </div>
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
                <select
                  className="border w-[250px] focus:outline-none h-[30px] text-[12px]"
                  onChange={(e) =>
                    dispatch(
                      handleChoiceLayout({ componentId, value: e.target.value })
                    )
                  }
                >
                  <option className="text-[12px]" value="Vertical">
                    Vertical
                  </option>
                  <option
                    value="horizontal"
                    selected=""
                    className="text-[12px]"
                  >
                    Horizontal with choice text on the same line
                  </option>
                  <option value="horizontalAbove" className="text-[12px]">
                    Horizontal with choice text above
                  </option>
                </select>
              </div>
            </div>
            <div className="flex mt-[15px] items-center">
              <p className="text-[#7D848C] text-[13px] w-[180px]">Identifier</p>
              <div className="flex items-center gap-[5px]">
                <input
                  className="border w-[490px] focus:outline-none h-[30px] pl-[5px] text-[13px]"
                  placeholder="Optional-question text is used if not specified"
                />
              </div>
            </div>
            <div className="flex mt-[15px]">
              <p className="text-[#7D848C] text-[13px] w-[180px]">Media</p>
              <div className="flex items-center gap-[5px]">
                {image === null ? (
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) =>
                      dispatch(
                        handleImages({ componentId, value: e.target.files[0] })
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
          </div>
        ) : null}
      </div>
    );
  };
  const handleToggleExpansion = (index) => {
    dispatch(toggleExpansion({ componentId, index }));
  };
  const handleTitleInput = (index, event) => {
    const value = event.target.value;
    console.log(value);
    dispatch(handleOptionChange({ index, value: value }));
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
        Cookies.set("tokenId", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handledeleteToken = () => {
    onDelete();
    dispatch(deleteToken());
  };

  // const handleDrop = (e, targetOptionId) => {
  //   const optionId = e.dataTransfer.getData("text/plain");
  //   console.log(optionId);
  //   const sourceIndex = optionData.findIndex(
  //     (option) => option.id === parseInt(optionId)
  //   );
  //   const targetIndex = optionData.findIndex(
  //     (option) => option.id === parseInt(targetOptionId)
  //   );

  //   if (sourceIndex !== -1 && targetIndex !== -1) {
  //     const reorderedOptions = [...options];
  //     const [draggedOption] = reorderedOptions.splice(sourceIndex, 1);
  //     reorderedOptions.splice(targetIndex, 0, draggedOption);
  //     dispatch(reorderOptions(reorderedOptions));
  //   }
  // };

  const handleEditorOptionChange = (componentId, index) => (content) => {
    dispatch(handleOptionChange({ componentId, index, value: content }));
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
  const gettingContent = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent;
  };
  const onDndEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    dispatch(
      setOrder({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        componentId: componentId,
      })
    );
  };
  const deleteByid = () => {
    onDelete();
    dispatch(deleteMultipleChoiceInstance({ componentId }));
  };

  const saveOverallState = () => {
    // handleSave();
    console.log(multipleChoiceState);
    dispatch(
      setAllStateValues({
        componentId,
        overallStates: multipleChoiceState,
      })
    );
    dispatch(toggleMinimize({ componentId }));
  };

  useEffect(() => {
    // dispatch(addMultipleChoiceInstance({ componentId }));
    // getAllOptionValues();
  }, [componentId]);
  const getAllOptionValues = async () => {
    const values = {
      tokenId: id,
    };
    axios
      .post("https://demo.sending.app/react-api", values)
      .then((response) => {
        console.log(response.data.form_data);
        setNewData(JSON.parse(response.data.form_data));
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div>
        <div className="w-[750px] flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white relative">
          <div className="w-[40px] bg-[#43AED8] ">
            {/* {minimize ? (
              <HiMiniArrowsPointingIn
                className="text-[white] ml-[10px] mt-[10px] mr-[10px] text-[19px] cursor-pointer"
                onClick={() => dispatch(toggleMinimize({ componentId }))}
              />
            ) : (
              <HiArrowsPointingOut
                className="text-[white] ml-[10px] mt-[10px] mr-[10px] text-[19px] cursor-pointer"
                onClick={() => dispatch(toggleMinimize({ componentId }))}
              />
            )} */}
          </div>
          {minimize ? (
            <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo w-[1px]">
              <div className="flex justify-between flex-1 w-[670px]">
                <h1 className="text-[22px] text-[#333]">Multiple Choice</h1>
                <div className="flex">
                  <div className="mr-[5px]">
                    <button
                      style={{
                        boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                      }}
                      // onClick={() => handleDeleteContent(uuidv4())}
                      onClick={deleteByid}
                      className="h-[36px] leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[10px] pr-[10px] text-[#3c8dd5]"
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                      }}
                      className="h-[36px] leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[10px] pr-[10px] bg-[#5cb85c] text-[white]"
                      // onClick={handleSave}
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
                    <HiOutlineClipboardDocument className=" text-[16px] text-[#eee] cursor-pointer" />
                    <FaTrashCan
                      size={16}
                      className="text-[16px] text-[#eee] cursor-pointer"
                      onClick={handledeleteToken}
                    />
                  </div>
                </div>
              </div>
              <p className="text-[#7D848C] pt-[7px] text-[14px]">Question</p>
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
              <h1 className="mt-[30px] text-[22px] mb-[10px]">Options</h1>
              <div className="flex">
                <p className="text-[#7D848C] text-[13px] w-[180px]">Required</p>
                <div className="flex items-center gap-[5px]">
                  <input
                    type="checkbox"
                    id="required"
                    onChange={() =>
                      dispatch(handleRequiredOption({ componentId }))
                    }
                    checked={requiredOption}
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
                    id="hide"
                    onChange={() => dispatch(handleHideNumber({ componentId }))}
                    checked={hideNumber}
                  />
                  <label htmlFor="hide" className="cursor-pointer text-[13px]">
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
              {renderFullOptions()}
              <div>
                <h1 className="mt-[30px] text-[22px] mb-[10px]">Choices</h1>
                <p className="pl-[30px] text-[#777] text-[13px]">Label</p>
              </div>
              <DragDropContext onDragEnd={onDndEnd}>
                <Droppable droppableId="ChoiceDrops">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {optionData.map((e, index) => (
                        <Draggable
                          draggableId={String(index)}
                          key={index}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <div
                                className="flex items-center gap-[5px] mt-[5px] w-[670px]"
                                key={index}
                                draggable
                              >
                                <RiDragMove2Fill
                                  color="#777"
                                  size={19}
                                  className="cursor-all-scroll"
                                  {...dragHandleProps}
                                />
                                {/* <input
                       className="text-[12px] h-[34px] border focus:outline-none pt-[6px] pr-[12px] pl-[12px] pb-[6px] flex-1"
                       placeholder={e.title}
                       // onChange={(e) => optionsChange(index, e.target.value)}
                       onChange={(event) => handleTitleInput(index, event)}
                       // value={e.title}
                     /> */}
                                <Editor
                                  onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                  }
                                  // initialValue={`<p>${e.title}</p>`}
                                  value={`${e.title}`}
                                  inline={true}
                                  init={{
                                    // placeholder: `${e.title}`,
                                    menubar: false,
                                    plugins: "lists help",
                                    toolbar:
                                      "bold italic forecolor underline link removeformat",
                                    toolbar_mode: "wrap",
                                    ui_mode: "split",
                                  }}
                                  onEditorChange={handleEditorOptionChange(
                                    index,
                                    componentId
                                  )}
                                />
                                <button
                                  className="border p-[8px] text-[#777] h-[34px] w-[34px]"
                                  onClick={() => handleToggleExpansion(index)}
                                  // {...provided.dragHandleProps}
                                  // onClick={() => dispatch(toggleExpansion(index))}
                                >
                                  <BiSolidChevronDown />
                                </button>
                                <button
                                  className="border p-[8px] text-[#777] flex items-center h-[34px] w-[34px]"
                                  onClick={() =>
                                    dispatch(
                                      deleteOptionContent({
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
                                <div className="bg-[#F3F3F3] w-[568px] ml-[24px] mt-[5px]">
                                  <div className="flex gap-[30px] justify-around items-center pt-[7px]">
                                    <p className="text-[#7D848C] text-[13px]">
                                      Value
                                    </p>
                                    <input
                                      className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                                      value={index + 1}
                                    />
                                  </div>
                                  <div className="flex gap-[30px] justify-around items-center pt-[7px]">
                                    <p className="text-[#7D848C] text-[13px]">
                                      Score
                                    </p>
                                    <input
                                      className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                                      placeholder="Optional"
                                    />
                                  </div>
                                  <div className="flex items-center gap-[5px] ml-[17px] mt-[14px]">
                                    <label className="text-[13px] text-[#333] flex items-center gap-[5px]">
                                      <input
                                        type="checkbox"
                                        onChange={() =>
                                          dispatch(
                                            setOtherTextField({
                                              componentId,
                                              index,
                                            })
                                          )
                                        }
                                        checked={e.includeOtherTextField}
                                      />
                                      Include an "Other" text field{" "}
                                    </label>
                                  </div>
                                  {e.includeOtherTextField && (
                                    <div className="ml-[17px] mt-[10px] flex gap-[39px] items-center">
                                      <p className="text-[#333] text-[13px]">
                                        Identifier
                                      </p>
                                      <input
                                        className="border text-[13px] focus:outline-none w-[440px] p-[3px]"
                                        placeholder="Optional, used in reporting"
                                      />
                                    </div>
                                  )}
                                  <div className="flex items-center gap-[5px] ml-[17px] mt-[10px] pb-[15px]">
                                    <label className="text-[13px] text-[#333] flex items-center gap-[5px]">
                                      <input
                                        type="checkbox"
                                        onChange={() =>
                                          dispatch(
                                            setIncludeImage({
                                              componentId,
                                              index,
                                            })
                                          )
                                        }
                                      />
                                      Include an image
                                    </label>
                                  </div>
                                  {e.includeImage && (
                                    <div>
                                      <div className="flex items-center gap-[58px] ml-[17px] mt-[10px] pb-[15px]">
                                        <p className="text-[13px] text-[#333]">
                                          Image
                                        </p>
                                        {e.image === null ? (
                                          <input
                                            type="file"
                                            // value={e.includeImage}
                                            onChange={(e) =>
                                              dispatch(
                                                handleSetImage({
                                                  url: e.target.files[0],
                                                  index: index,
                                                  componentId: componentId,
                                                })
                                              )
                                            }
                                          />
                                        ) : (
                                          <div>
                                            <img
                                              src={e.image}
                                              alt="n"
                                              className="h-[100px] w-[100px]"
                                            />
                                            <button
                                              className="p-[5px] border-[1px] text-[14px] border-solid rounded-md mt-[10px]"
                                              onClick={() =>
                                                dispatch(
                                                  handleRemoveOptionImage({
                                                    index: index,
                                                    componentId: componentId,
                                                  })
                                                )
                                              }
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-[47px] ml-[17px] mt-[10px] pb-[15px]">
                                        <p className="text-[13px] text-[#333]">
                                          Position
                                        </p>
                                        <select
                                          className="border focus:outline-none text-[13px] p-[5px]"
                                          onChange={(e) =>
                                            dispatch(
                                              setOptionPositionImage({
                                                index: index,
                                                componentId: componentId,
                                                value: e.target.value,
                                              })
                                            )
                                          }
                                        >
                                          <option></option>
                                          <option value="Top">
                                            Above choice text
                                          </option>
                                          <option value="Below">
                                            Below choice text
                                          </option>
                                          <option value="Left">
                                            Left of choice text
                                          </option>
                                          <option value="Right">
                                            Right of choice text
                                          </option>
                                        </select>
                                      </div>
                                      <div className="flex items-center gap-[39px] ml-[17px] mt-[10px] pb-[15px]">
                                        <p className="text-[13px] text-[#333]">
                                          Choice text
                                        </p>
                                        <label className="text-[13px] flex items-center gap-[5px]">
                                          <input type="checkbox" />
                                          Display Choice text
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div className="pl-[24px] flex gap-[3px] mt-[5px]">
                  <button
                    className="border text-[14px] flex items-center gap-[5px] pl-[12px] pr-[12px] pt-[6px] pb-[6px] hover:bg-[#e6e6e6]"
                    onClick={addOptionsHandler}
                  >
                    <LuPlus size={18} />
                    <p className="text-[12px]">Add Choice</p>
                  </button>
                  <button
                    className="border text-[14px] flex items-center gap-[5px] pl-[12px] pr-[12px] pt-[6px] pb-[6px] hover:bg-[#e6e6e6]"
                    onClick={addOtherChoices}
                  >
                    <LuPlus size={18} />
                    <p className="text-[12px]">Add 'Other' Choice</p>
                  </button>
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
                      animation: "slideInFromTop 0.05s ease-in-out",
                    }}
                    className="w-[600px] m-auto"
                  >
                    <Box sx={style}>
                      <h4 className="font-[500]">Quick Entry</h4>
                      <p className="text-[12px] mt-[10px]">
                        Enter one choice per line
                      </p>
                      <textarea
                        wrap="soft"
                        className=" focus:outline-none w-full border h-[200px] mt-[5px] p-[10px] placeholder:text-[12px] text-[12px]"
                        onChange={handleBulkInputChange}
                        onKeyDown={handleKeyDown}
                        // onKeyPress={handleKeyDown}
                      ></textarea>
                      <p className="text-[#737373] text-[12px]">
                        Adding in bulk will replace your existing choices with
                        those entered.
                      </p>
                      <div>
                        <button
                          className="bg-transparent text-[#2366a2] text-[12px] pt-[6px] pb-[6px] pr-[12px] pl-[12px]"
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-[#2773b7] text-white text-[12px] pt-[6px] pb-[6px] pr-[12px] pl-[12px]"
                          onClick={handleSaveBulkChoices}
                        >
                          Save choices
                        </button>
                      </div>
                    </Box>
                  </Modal>
                </div>
                <div className="flex items-center gap-[5px] pl-[24px] mt-[20px] pt-[7px]">
                  <input
                    type="checkbox"
                    id="check"
                    onChange={() => dispatch(handleMultipleAnswers())}
                  />
                  <label htmlFor="check" className="text-[12px] cursor-pointer">
                    Allow more than one answer to this question
                    <span className="font-bold"> (use checkboxes)</span>
                  </label>
                </div>
              </DragDropContext>
              <section className="mt-[40px] flex justify-end w-[670px]">
                <button
                  className="leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[18px] pr-[18px] text-[#3c8dd5]"
                  // onClick={() => handleDeleteContent()}
                  onClick={onDelete}
                >
                  Cancel
                </button>
                <button className="leading-[20px] text-[12px] pt-[6px] pb-[6px] pl-[18px] pr-[18px] bg-[#5cb85c] text-[white]">
                  Save
                </button>
              </section>
            </div>
          ) : (
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
                className="ml-auto h-[35px] mt-[10px] mr-[10px] bottom-[90px] right-[20px] flex items-center gap-[11px] p-[10px] justify-around"
                style={{
                  boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                }}
              >
                <button
                  className="p-[5px] text-[14px] font-bold"
                  onClick={() => {
                    dispatch(addMultipleChoiceInstance({ componentId }));
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
                <FiMove className="text-[20px] text-[#eee] cursor-all-scroll hover:text-[black] hidden" />
                {/* <MdOutlineModeEdit
                  className="text-[20px] cursor-pointer text-[#eee] hover:text-[black]"
                  onClick={() => {
                    dispatch(addMultipleChoiceInstance({ componentId }));
                    dispatch(toggleMinimize({ componentId }));
                  }}
                /> */}

                {/* <HiOutlineClipboardDocument className=" text-[16px] text-[#eee] cursor-pointer" /> */}
                <FaTrashCan
                  data-tooltip-id="Delete"
                  size={16}
                  className="text-[20px] text-[#eee] cursor-pointer hover:text-[black]"
                  onClick={handledeleteToken}
                />
                <ReactTooltip id="Delete" place="top" content="Delete" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
