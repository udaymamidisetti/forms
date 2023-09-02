import React, { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { RiDragMove2Fill } from "react-icons/ri";
import { Box, Modal } from "@mui/material";
import fieldData from "../fieldData";
import { useDispatch, useSelector } from "react-redux";
import {
  addRatingMatrixInstance,
  handleAddField,
  handleChoiceLayout,
  handleColumnWidth,
  handleDeleteField,
  handleDisplayMode,
  handleFieldChange,
  handleHideNumber,
  handleImages,
  handleInputChange,
  handleNaCondition,
  handleRandomChoice,
  handleRandomFields,
  handleRequiredOption,
  handleScaleType,
  handleScoreDirection,
} from "../redux/slices/RatingMatrixSlice";
import { Editor } from "@tinymce/tinymce-react";

const RatingScaleMatrix = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const [showFull, setShowFull] = useState(false);
  const [fData, setfData] = useState([...fieldData]);
  const [modalShow, setModalShow] = useState(false);
  const [newmodel, setNewmodel] = useState(false);
  const question = useSelector((state) => {
    const instance = state.RatingMatrix.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.question;
  });
  const fieldsData = useSelector((state) => {
    const instance = state.RatingMatrix.byId[componentId];
    if (!instance) {
      return fieldData;
    }
    return instance.fieldsData;
  });
  const handleChange = (componentId) => (content) => {
    dispatch(handleInputChange({ componentId, value: content }));
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
  const handleEditorFieldChange = (componentId, index) => (content) => {
    dispatch(handleFieldChange({ componentId, index, value: content }));
  };
  const deleteFieldOption = (index) => {
    setfData((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });
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
    dispatch(addRatingMatrixInstance({ componentId }));
  }, []);
  return (
    <div>
      <div>
        <div className="w-[750px] flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
          <div className="w-[40px] bg-[#43AED8]"></div>
          <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo ">
            <div className="flex justify-between flex-1">
              <h1 className="text-[22px] text-[#333]">Rating Scale Matrix</h1>
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
            <Editor
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
                  <option value={true}>Yes(at least 1 field )</option>
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
                            dispatch(handleRandomChoice({ componentId }))
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
                        <option value={10}>10%</option>
                        <option value={20}>20%</option>
                        <option value={30}>30%</option>
                        <option value={40}>40%</option>
                        <option value={50}>50%</option>
                        <option value={60}>60%</option>
                        <option value={70}>70%</option>
                        <option value={80}>80%</option>
                        <option value={90}>90%</option>
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
                <>
                  <div
                    className="flex items-center gap-[5px] mt-[5px] w-[670px]"
                    key={index}
                  >
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
                      className="border p-[8px] text-[#777] flex items-center h-[34px] w-[34px]"
                      // onClick={() => deleteFieldOption(index)}
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
            <h1 className="mt-[30px] text-[22px] mb-[10px]">Scale</h1>
            <div className="flex items-center mt-[30px]">
              <p className="w-[180px] text-[#7D848C] text-[13px]">Scale type</p>
              <div className="flex gap-[10px]">
                <div>
                  <select
                    className="h-[34px] border w-[190px] text-[13px] pl-[6px] focus:outline-none"
                    onChange={(e) =>
                      dispatch(
                        handleScaleType({ componentId, value: e.target.value })
                      )
                    }
                  >
                    <option value={5}>Agree-Disagree(5levels)</option>
                    <option value={4}>Agree-Disagree(4levels)</option>
                    <option value={3}>Agree-Disagree(3levels)</option>
                    <option value={2}>Agree-Disagree(2levels)</option>
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
              <p className="w-[180px] text-[#7D848C] text-[13px]">
                Display mode
              </p>
              <select
                className="border text-[13px] h-[34px] w-[100px] focus:outline-none"
                onChange={(e) =>
                  dispatch(
                    handleDisplayMode({ componentId, value: e.target.value })
                  )
                }
              >
                <option value="radio">Radio list</option>
                <option value="drop">Dropdown</option>
              </select>
            </div>

            <div className="flex items-center mt-[20px]">
              <p className="w-[180px] text-[#7D848C] text-[13px]">
                Show N/A option
              </p>
              <select
                className="border text-[13px] h-[34px] w-[100px] focus:outline-none"
                onChange={(e) =>
                  dispatch(
                    handleNaCondition({ componentId, value: e.target.value })
                  )
                }
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="flex items-center mt-[20px]">
              <p className="w-[180px] text-[#7D848C] text-[13px]">
                Scoring direction
              </p>
              <select
                className="border text-[13px] h-[34px] w-[100px] focus:outline-none"
                onChange={(e) =>
                  dispatch(
                    handleScoreDirection({ componentId, value: e.target.value })
                  )
                }
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
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
    </div>
  );
};

export default RatingScaleMatrix;
