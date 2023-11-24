import React, { useCallback, useEffect, useState } from "react";
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
  addDropdownInstance,
  handleRandomChoices,
  handleImages,
  handleBulkAdd,
  setOrder,
  toggleMinimize,
  handleRemoveImage,
} from "../redux/slices/DropDownSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import data from "../data";
import {
  deleteToken,
  setAllStateValues,
  setTokenId,
} from "../redux/slices/FormSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiMove } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";

const DropDown = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const dropDownState = useSelector(
    (state) => state.DropDown.byId[componentId]
  );
  const applicationState = useSelector(
    (state) => state.formData.allStateValues
  );
  const question = useSelector((state) => {
    const instance = state.DropDown.byId[componentId];
    if (!instance) {
      return "What question would you like to ask?";
    }
    return instance.question;
  });
  console.log(question);
  const optionData = useSelector((state) => {
    const instance = state.DropDown.byId[componentId];
    if (!instance) {
      return data;
    }
    return instance.options;
  });
  const minimize = useSelector((state) => {
    const instance = state.DropDown.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.minimize;
  });
  const image = useSelector((state) => {
    const instance = state.DropDown.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.image;
  });

  const tokenId = useSelector((state) => state.formData.tokenId);
  const [showAll, setShowAll] = useState(false);
  const [bulkInputText, setBulkInputText] = useState("");
  const [bulkArray, setBulkArray] = useState([]);
  // const [minimize, setMinimize] = useState(true);
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

  const addOptionsHandler = () => {
    const newOption = { title: `Option ${optionData.length + 1}` };
    // setJdata(() => [...jData, ...newOption]);
    dispatch(addNewOption({ componentId, value: { ...newOption } }));
  };
  const handleChange = (componentId) => (content) => {
    dispatch(handleInputChange({ componentId, value: content }));
  };
  const handleEditorOptionChange = (componentId, index) => (content) => {
    dispatch(handleOptionChange({ componentId, index, value: content }));
  };
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
  useEffect(() => {
    // dispatch(addDropdownInstance({ componentId }));
  }, []);
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
  const saveOverallState = () => {
    // handleSave();
    dispatch(
      setAllStateValues({
        componentId,
        overallStates: dropDownState,
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
          <div className="w-[42px] bg-[#000]">
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
                  <label className="cursor-pointer text-[13px] flex items-center gap-[5px]">
                    <input
                      type="checkbox"
                      onChange={() =>
                        dispatch(handleRequiredOption({ componentId }))
                      }
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
                      onChange={() =>
                        dispatch(handleHideNumber({ componentId }))
                      }
                    />
                    Hide the question number
                  </label>
                </div>
              </div>
              {showAll ? (
                <p
                  className="text-[#2366a2] text-[12px] mt-[20px] cursor-pointer"
                  onClick={() => setShowAll(!showAll)}
                >
                  Hide all Options
                </p>
              ) : (
                <p
                  className="text-[#2366a2] text-[12px] mt-[20px] cursor-pointer"
                  onClick={() => setShowAll(!showAll)}
                >
                  Show all Options
                </p>
              )}
              {showAll ? (
                <>
                  <div className="flex mt-[30px]">
                    <p className="text-[#7D848C] text-[13px] w-[180px]">
                      Display Order
                    </p>
                    <div className="flex items-center gap-[5px]">
                      <label className="cursor-pointer text-[13px] flex items-center gap-[5px]">
                        <input
                          type="checkbox"
                          id="required"
                          onChange={() =>
                            dispatch(handleRandomChoices({ componentId }))
                          }
                        />
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
                    <p className="text-[#7D848C] text-[13px] w-[180px]">
                      Media
                    </p>
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
                </>
              ) : (
                ""
              )}
              <h1 className="mt-[30px] text-[22px] mb-[10px]">Choices</h1>
              <p className="pl-[30px] text-[#777] text-[13px]">Label</p>
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
                                  // {...dragHandleProps}
                                />
                                {/* <input
                       className="text-[12px] h-[34px] border focus:outline-none pt-[6px] pr-[12px] pl-[12px] pb-[6px] flex-1"
                       placeholder={e.title}
                       // onChange={(e) => optionsChange(index, e.target.value)}
                       onChange={(event) => handleTitleInput(index, event)}
                       // value={e.title}
                     /> */}
                                <Editor
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
                          // onClick={handleSaveBulkChoices}
                          onClick={handleSaveBulkChoices}
                        >
                          Save choices
                        </button>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </DragDropContext>
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
          ) : (
            <div
              className="w-full transition-opacity flex duration-200 ease-in-expo pl-[10px]"
              // onClick={setMinimize(() => !minimize)}
            >
              {" "}
              <div className="flex-1 pointer-events-none pt-[10px]">
                <div
                  dangerouslySetInnerHTML={{ __html: question }}
                  className="text-[13px] font-bold mt-[10px] transition-opacity duration-200 ease-in-expo"
                />
                <select className="border w-[114%] rounded-sm focus:outline-none text-[14px] mt-[20px] mb-[10px] p-[5px]">
                  {optionData.map((e, index) => (
                    <option
                      dangerouslySetInnerHTML={{ __html: e.title }}
                      key={index}
                    />
                  ))}
                </select>
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
                    dispatch(addDropdownInstance({ componentId }));
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
