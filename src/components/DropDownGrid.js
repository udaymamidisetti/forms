import React, { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { CgMenu } from "react-icons/cg";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { RiDragMove2Fill } from "react-icons/ri";
import data from "../data";
import { Box, Modal } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDropdownGridInstance,
  handleAddOption,
  handleBulkAdd,
  handleColumnWidth,
  handleDeleteOption,
  handleHideNumber,
  handleImages,
  handleInputChange,
  handleOptionChange,
  handleRandomChoices,
  handleRandomFields,
  handleRequiredOption,
  addColumnWords,
  addRowWords,
} from "../redux/slices/DropdownGridSlice";
import { setAllStateValues } from "../redux/slices/FormSlice";

const DropDownGrid = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const [showFull, setShowFull] = useState(false);
  const [bulkInputText, setBulkInputText] = useState("");
  const [bulkArray, setBulkArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowText, setRowText] = useState(["Row 1\nRow 2"]);
  const [rowArray, setRowArray] = useState([]);
  const [columnText, setColumnText] = useState(["Column 1\nColumn 2"]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const question = useSelector((state) => {
    const instance = state.DropDownGrid.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.question;
  });
  const optionsData = useSelector((state) => {
    const instance = state.DropDownGrid.byId[componentId];
    if (!instance) {
      return data;
    }
    return instance.optionsData;
  });
  const dropDownGridState = useSelector(
    (state) => state.DropDownGrid.byId[componentId]
  );
  const rows = useSelector((state) => {
    const instance = state.DropDownGrid.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.rows;
  });
  const columns = useSelector((state) => {
    const instance = state.DropDownGrid.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.columns;
  });
  const handleChange = (componentId) => (content) => {
    dispatch(handleInputChange({ componentId, value: content }));
  };
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
  const handleBulkInputChange = (event) => {
    setBulkInputText(event.target.value);
  };
  const handleEditorOptionChange = (componentId, index) => (content) => {
    dispatch(handleOptionChange({ componentId, index, value: content }));
  };
  const handleRowText = (event) => {
    setRowText(event.target.value);
    dispatch(addRowWords({ componentId: componentId, value: rowText }));
  };
  const handleColumnText = (e) => {
    setColumnText(e.target.value);
    dispatch(addColumnWords({ componentId: componentId, value: columnText }));
  };
  // const handleRowArray = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     setRowText(rowText + "\n");
  //     console.log(rowText);
  //     // setRowArray((p) => [...p, rowText]);
  //     // setRowText("");
  //     dispatch(addRowWords({ componentId: componentId, value: rowText }));
  //   }
  // };
  // const handleColumnArray = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     // setColumnText((p) => [...p, columnText]);
  //     // setColumnText("");
  //     dispatch(addColumnWords({ componentId: componentId, value: columnText }));
  //   }
  // };

  const saveOverallState = () => {
    // handleSave();
    dispatch(
      setAllStateValues({
        componentId,
        overallStates: dropDownGridState,
      })
    );
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

  useEffect(() => {
    dispatch(addDropdownGridInstance({ componentId }));
  }, []);

  return (
    <div>
      <div>
        <div className="w-[750px] flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
          <div className="w-[40px] bg-[#43AED8]"></div>
          <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo ">
            <div className="flex justify-between flex-1">
              <h1 className="text-[22px] text-[#333]">Dropdown Grid</h1>
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
            <h1 className="mt-[30px] text-[22px] mb-[10px]">Options</h1>
            <div className="flex">
              <p className="text-[#7D848C] text-[13px] w-[180px]">
                Answer Required
              </p>
              <div className="flex items-center gap-[5px]">
                <select
                  className="w-[140px] border h-[30px] text-[13px] focus:outline-none"
                  onChange={(e) =>
                    dispatch(
                      handleRequiredOption({
                        componentId,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
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
                    onChange={() => dispatch(handleHideNumber({ componentId }))}
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
                            dispatch(handleRandomFields({ componentId }))
                          }
                        />
                        Randomize Fields
                      </label>
                    </div>
                    <div className="flex items-center gap-[5px] mt-[10px]">
                      <label className="cursor-pointer text-[13px] flex items-center gap-[5px]">
                        <input
                          type="checkbox"
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
            <div className="flex">
              <p className="text-[13px] w-[180px] text-[#737373]">Row labels</p>
              <div className="w-[100%]">
                <textarea
                  wrap="off"
                  className="h-[150px] border w-[100%] focus:outline-none p-[5px] text-[13px]"
                  value={rowText}
                  onChange={handleRowText}
                  // onKeyDown={handleRowArray}
                >
                  {rows}
                </textarea>
                {/* <input
                  type="text"
                  value={rowText}
                  onChange={handleRowText}
                  onKeyDown={handleRowArray}
                /> */}
                <p className="mt-[5px] text-[13px] text-[#737373]">
                  Each line represents a row, HTML is OK.
                </p>
              </div>
            </div>
            <div className="flex mt-[10px]">
              <p className="text-[13px] w-[180px] text-[#737373]">
                Column labels
              </p>
              <div className="w-[100%]">
                <textarea
                  className="h-[150px] border w-[100%] focus:outline-none p-[5px] text-[13px]"
                  onChange={handleColumnText}
                  // onKeyDown={handleColumnArray}
                  value={columnText}
                >
                  {columns}
                </textarea>
                <p className="mt-[5px] text-[13px] text-[#737373]">
                  Each line represents a column, HTML is OK.
                </p>
              </div>
            </div>

            <h1 className="mt-[30px] text-[22px] mb-[10px]">Choices</h1>
            <p className="pl-[30px] text-[#777] text-[13px]">Label</p>
            <div>
              {optionsData.map((e, index) => (
                <div key={index}>
                  <div className="flex items-center gap-[5px] mt-[5px] w-[670px]">
                    <RiDragMove2Fill color="#777" size={19} />
                    <Editor
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
                  {/* {isExpanded ? <div>Set</div> : null} */}
                </div>
              ))}
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
                >
                  <Box sx={style}>
                    <h4 className="font-[500]">Quick Entry</h4>
                    <p className="text-[12px] mt-[10px]">
                      Enter one choice per line
                    </p>
                    <textarea
                      className=" focus:outline-none w-full border h-[200px] mt-[5px] p-[10px] placeholder:text-[12px]"
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
                        onClick={handleClose}
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
      </div>
    </div>
  );
};

export default DropDownGrid;
