import React, { useEffect, useRef, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { CgMenu } from "react-icons/cg";
import { FaTrashCan } from "react-icons/fa6";
import {
  HiArrowsPointingOut,
  HiMiniArrowsPointingIn,
  HiOutlineClipboardDocument,
} from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { RiDragMove2Fill } from "react-icons/ri";
import data from "../data";
import fieldData from "../fieldData";
import { Box, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import {
  handleQuestionChange,
  handleHideNumber,
  handleAnswerRequired,
  handleRandomChoices,
  handleRandomfields,
  handleColumnWidth,
  handleMultipleResponce,
  handleAddField,
  handleDeleteField,
  handleAddOption,
  handleDeleteOption,
  addMultipleChoiceGridInstance,
  handleSetImage,
  handleOptionChange,
  handleFieldChange,
  toggleExpansion,
  handleMultipleAnswers,
  setIncludeImage,
  handleBulkAdd,
  setOrder,
  toggleMinimize,
  handleRemoveImage,
} from "../redux/slices/MultipleChoiceGridSlice";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { deleteOptionContent } from "../redux/slices/MultipleChoiceSlice";
import {
  deleteToken,
  setAllStateValues,
  setTokenId,
} from "../redux/slices/FormSlice";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";
const MultipleChoiceGrid = ({ onDelete, componentId }) => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const tokenId = useSelector((state) => state.formData.tokenId);
  const applicationState = useSelector(
    (state) => state.formData.allStateValues
  );
  const multipleChoiceGridState = useSelector(
    (state) => state.MultipleChoiceGrid.byId[componentId]
  );
  const question = useSelector((state) => {
    const instance = state.MultipleChoiceGrid.byId[componentId];
    if (!instance) {
      return "What question would you like to ask?";
    }
    return instance.question;
  });
  const image = useSelector((state) => {
    const instance = state.MultipleChoiceGrid.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.image;
  });
  const minimize = useSelector((state) => {
    const instance = state.MultipleChoiceGrid.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.minimize;
  });
  const fieldsData = useSelector((state) => {
    const instance = state.MultipleChoiceGrid.byId[componentId];
    if (!instance) {
      return fieldData;
    }
    return instance.fieldsData;
  });
  console.log(fieldsData);
  const optionsData = useSelector((state) => {
    const instance = state.MultipleChoiceGrid.byId[componentId];
    if (!instance) {
      return data;
    }
    return instance.options;
  });
  const [bulkInputText, setBulkInputText] = useState("");
  const [bulkArray, setBulkArray] = useState([]);
  const [showFull, setShowFull] = useState(false);
  const [open, setOpen] = useState(false);
  const [jData, setJdata] = useState([...data]);
  const [fData, setfData] = useState([...fieldData]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addOptionsHandler = () => {
    const newOption = { title: `Option ${optionsData.length + 1}` };
    // setJdata(() => [...jData, ...newOption]);
    dispatch(
      handleAddOption({
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
  const deleteOption = (index) => {
    dispatch(handleDeleteOption(index));
  };
  const deleteFieldOption = (index) => {
    dispatch(handleDeleteField(index));
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
  // const addOptionsHandler = () => {
  //   const newOption = { title: `Option ${optionData.length + 1}` };
  //   // setJdata(() => [...jData, ...newOption]);
  //   dispatch(
  //     addNewOption({
  //       componentId,
  //       value: {
  //         ...newOption,
  //         expanded: false,
  //         includeImage: false,
  //         includeOtherTextField: false,
  //         image: "",
  //       },
  //     })
  //   );
  // };
  const handleChange = (componentId) => (content) => {
    dispatch(handleQuestionChange({ componentId, value: content }));
  };
  const handleEditorOptionChange = (componentId, index) => (content) => {
    dispatch(handleOptionChange({ componentId, index, value: content }));
  };
  const handleEditorFieldChange = (componentId, index) => (content) => {
    dispatch(handleFieldChange({ componentId, index, value: content }));
  };
  const handleToggleExpansion = (index) => {
    dispatch(toggleExpansion({ componentId, index }));
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
        overallStates: multipleChoiceGridState,
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
      <div>
        <div className="w-[750px] flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
          <div className="w-[40px] bg-[#000]"></div>
          {minimize ? (
            <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo ">
              <div className="flex justify-between flex-1">
                <h1 className="text-[22px] text-[#333]">
                  Multiple Choice Grid
                </h1>
                <div className="flex">
                  <div className="mr-[5px]">
                    <button
                      style={{
                        boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                      }}
                      // onClick={() => handleDeleteContent(uuidv4())}
                      onClick={onDelete}
                      className="h-[36px] leading-[20px] text-[12px] pt-[8px] pb-[8px] pl-[10px] pr-[10px] text-[#3c8dd5]"
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
                onInit={(evt, editor) => (editorRef.current = editor)}
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
              <div className="flex">
                <p className="text-[#7D848C] text-[13px] w-[180px]">
                  Answer Required
                </p>
                <div className="flex items-center gap-[5px]">
                  <select
                    className="w-[140px] border h-[30px] text-[12px] focus:outline-none"
                    onChange={(e) =>
                      dispatch(
                        handleAnswerRequired({
                          componentId: componentId,
                          value: e.target.value,
                        })
                      )
                    }
                  >
                    <option className="text-[12px]" value={true}>
                      Yes(atleast 1 field)
                    </option>
                    <option value={true}>Yes(all fields)</option>
                    <option value={false}>No</option>
                  </select>
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
                      onChange={() =>
                        dispatch(handleHideNumber({ componentId }))
                      }
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
                  <div className="flex mt-[20px]">
                    <p className="text-[#7D848C] text-[13px] w-[180px]">
                      Display order
                    </p>
                    <div>
                      <div className="flex items-center gap-[5px]">
                        <label className="cursor-pointer text-[13px] flex items-center gap-[5px]">
                          <input
                            type="checkbox"
                            onChange={() =>
                              dispatch(handleRandomfields({ componentId }))
                            }
                          />
                          Randomize Fields
                        </label>
                      </div>
                      <div className="flex items-center gap-[5px] mt-[10px]">
                        <label
                          htmlFor="required"
                          className="cursor-pointer text-[13px] flex items-center gap-[5px]"
                        >
                          {" "}
                          <input
                            type="checkbox"
                            id="required"
                            onChange={() =>
                              dispatch(handleRandomChoices({ componentId }))
                            }
                          />
                          Randomize Choices
                        </label>
                      </div>
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
                                componentId: componentId,
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
                    <p className="text-[#7D848C] text-[13px] w-[180px]">
                      Media
                    </p>
                    <div className="flex items-center gap-[5px]">
                      {image === null ? (
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={(e) =>
                            dispatch(
                              handleSetImage({
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
              <h1 className="mt-[30px] text-[22px] mb-[10px]">Fields</h1>
              <p className="pl-[30px] text-[#777] text-[13px]">Label</p>
              <div>
                {fieldsData.map((e, index) => (
                  <>
                    <div
                      className="flex items-center gap-[5px] mt-[5px] w-[670px]"
                      key={index}
                    >
                      <RiDragMove2Fill color="#777" size={19} />
                      <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
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
                    {/* {isExpanded ? <div>Set</div> : null} */}
                  </>
                ))}
                <button
                  className="ml-[24px] mt-[5px] border text-[14px] flex items-center gap-[5px] pl-[12px] pr-[12px] pt-[6px] pb-[6px] hover:bg-[#e6e6e6]"
                  onClick={addFieldsHandler}
                >
                  <LuPlus size={18} />
                  <p className="text-[12px]">Add Field</p>
                </button>
              </div>
              <h1 className="mt-[30px] text-[22px] mb-[10px]">Choices</h1>
              <p className="pl-[30px] text-[#777] text-[13px]">Label</p>
              <DragDropContext onDragEnd={onDndEnd}>
                <Droppable droppableId="ChoiceDrops">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {optionsData.map((e, index) => (
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
                                  // {...dragHandleProps}
                                />

                                <Editor
                                  onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                  }
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
                                  onEditorChange={handleEditorOptionChange(
                                    index,
                                    componentId
                                  )}
                                />
                                <button
                                  className="border p-[8px] text-[#777] h-[34px] w-[34px]"
                                  onClick={() => handleToggleExpansion(index)}
                                >
                                  <BiSolidChevronDown />
                                </button>
                                <button
                                  className="border p-[8px] text-[#777] flex items-center h-[34px] w-[34px]"
                                  onClick={() =>
                                    dispatch(
                                      handleDeleteOption({
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
                                  {/* <div className="flex gap-[30px] justify-around items-center pt-[7px]">
                                  <p className="text-[#7D848C] text-[13px]">
                                    Score
                                  </p>
                                  <input
                                    className="border w-[440px] p-[3px] text-[13px] focus:outline-none"
                                    placeholder="Optional"
                                  />
                                </div> */}
                                  <div className="flex items-center gap-[5px] ml-[17px] mt-[14px]">
                                    {/* <label className="text-[13px] text-[#333] flex items-center gap-[5px]">
                                    <input
                                      type="checkbox"
                                      // onChange={() =>
                                      //   dispatch(setOtherTextField(index))
                                      // }
                                      checked={e.includeOtherTextField}
                                    />
                                    Include an "Other" text field{" "}
                                  </label> */}
                                  </div>
                                  {/* {e.includeOtherTextField && (
                                  <div className="ml-[17px] mt-[10px] flex gap-[39px] items-center">
                                    <p className="text-[#333] text-[13px]">
                                      Identifier
                                    </p>
                                    <input
                                      className="border text-[13px] focus:outline-none w-[440px] p-[3px]"
                                      placeholder="Optional, used in reporting"
                                    />
                                  </div>
                                )} */}
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
                                        <input
                                          type="file"
                                          // onChange={(e) =>
                                          //   dispatch(
                                          //     handleSetImage({
                                          //       url: e.target.files[0],
                                          //       index: index,
                                          //     })
                                          //   )
                                          // }
                                        />
                                      </div>
                                      <div className="flex items-center gap-[47px] ml-[17px] mt-[10px] pb-[15px]">
                                        <p className="text-[13px] text-[#333]">
                                          Position
                                        </p>
                                        <select className="border focus:outline-none text-[13px] p-[5px]">
                                          <option></option>
                                          <option>Above choice text</option>
                                          <option>Below choice text</option>
                                          <option>Left of choice text</option>
                                          <option>Right of choice text</option>
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
                  {/* <button
                  className="border text-[14px] flex items-center gap-[5px] pl-[12px] pr-[12px] pt-[6px] pb-[6px] hover:bg-[#e6e6e6]"
                  // onClick={addOtherChoices}
                >
                  <LuPlus size={18} />
                  <p className="text-[12px]">Add 'Other' Choice</p>
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
                        // onChange={handleBulkInputChange}
                        // onKeyDown={handleKeyDown}
                        // onKeyPress={handleKeyDown}
                        onChange={handleBulkInputChange}
                        onKeyDown={handleKeyDown}
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
                  <label className="text-[12px] cursor-pointer flex items-center gap-[5px]">
                    <input
                      type="checkbox"
                      onChange={() =>
                        dispatch(
                          handleMultipleAnswers({ componentId: componentId })
                        )
                      }
                    />
                    Allow more than one answer to this question
                    <span className="font-bold"> (use checkboxes)</span>
                  </label>
                </div>
              </DragDropContext>
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
          ) : (
            <div className="flex-1 ml-[10px]">
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
                      dispatch(addMultipleChoiceGridInstance({ componentId }));
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
              <table className="pointer-events-none mt-[10px]">
                <thead>
                  <tr>
                    <th style={{ width: `40%` }}>&nbsp;</th>
                    {optionsData.map((e, i) => (
                      <th
                        className="font-normal"
                        style={{ width: "7%" }}
                        key={i}
                      >
                        <div
                          className="text-[13px] text-[#555]"
                          dangerouslySetInnerHTML={{ __html: e.title }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td style={{ width: `40%` }}>
                      {fieldsData.map((e, i) => (
                        <div
                          key={i}
                          className="pt-[10px] text-[14px] text-[#555]"
                          dangerouslySetInnerHTML={{ __html: e.title }}
                        />
                      ))}
                    </td>
                    {optionsData.map((j, l) => (
                      <td style={{ width: "7%" }} key={l}>
                        {fieldsData.map((e, i) => (
                          <div className="text-center pt-[10px]">
                            <div className="text-center">
                              <input type="radio" />
                            </div>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceGrid;
