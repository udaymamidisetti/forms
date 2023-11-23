import React, { useState, useCallback, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  handleInputChange,
  handleHideNumber,
  handleRequiredOption,
  handleAgreeOptions,
  handleNaCondition,
  handleDisplayMode,
  addRatingScaleInstance,
  handleImages,
  handleChoiceLayout,
  handleScoreDirection,
  toggleMinimize,
} from "../redux/slices/RatingScaleSlice";
import { Box, Modal } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { setAllStateValues, setTokenId } from "../redux/slices/FormSlice";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";

const RatingScale = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const tokenId = useSelector((state) => state.formData.tokenId);
  const ratingScaleStates = useSelector(
    (state) => state.RatingScale.byId[componentId]
  );
  const question = useSelector((state) => {
    const instance = state.RatingScale.byId[componentId];
    if (!instance) {
      return "What question would you like to ask?";
    }
    return instance.question;
  });
  const minimize = useSelector((state) => {
    const instance = state.RatingScale.byId[componentId];
    if (!instance) {
      return false;
    }
    return instance.minimize;
  });
  const agreedOption = useSelector((state) => {
    const instance = state.RatingScale.byId[componentId];
    if (!instance) {
      return "agree2";
    }
    return instance.agreeOptions;
  });

  const displayMode = useSelector((state) => {
    const instance = state.RatingScale.byId[componentId];
    if (!instance) {
      return "Radio";
    }
    return instance.displayMode;
  });
  const naCondition = useSelector((state) => state.RatingScale.naCondition);

  const [showFull, setShowFull] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (componentId) => (content) => {
    dispatch(handleInputChange({ componentId, value: content }));
  };

  const handleSave = async () => {
    const values = {
      form_data: ratingScaleStates,
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
        overallStates: ratingScaleStates,
      })
    );
    dispatch(toggleMinimize({ componentId }));
  };
  const handledeleteToken = () => {
    onDelete();
    dispatch(deleteToken());
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
  const agreedOptionContent = () => {
    switch (agreedOption) {
      case "agree2":
        return (
          <div>
            {displayMode === "Radio" ? (
              <div className="ml-[10px] mt-[10px] text-[14px]">
                <div>
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <select className="border w-[90%] focus:outline-none p-[5px]">
                  <option></option>
                  <option>Agree</option>
                  <option>Disagree</option>
                </select>
              </div>
            )}
          </div>
        );
      case "agree3":
        return (
          <div>
            {displayMode === "Radio" ? (
              <div className="ml-[10px] mt-[10px] text-[14px]">
                <div>
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree Strongly
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree Strongly
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <select className="border w-[90%] focus:outline-none p-[5px]">
                  <option></option>
                  <option>Agree Strongly</option>
                  <option> Agree</option>
                  <option>Disagree Strongly</option>
                </select>
              </div>
            )}
          </div>
        );
      case "agree4":
        return (
          <div>
            {displayMode === "Radio" ? (
              <div className="ml-[10px] mt-[10px] text-[14px]">
                <div>
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree Strongly
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree Strongly
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <select className="border w-[90%] focus:outline-none p-[5px]">
                  <option></option>
                  <option>Agree Strongly</option>
                  <option>Agree</option>
                  <option>Disagree</option>
                  <option> Disagree Strongly</option>
                </select>
              </div>
            )}
          </div>
        );
      case "agree5":
        return (
          <div>
            {displayMode === "Radio" ? (
              <div className="ml-[10px] mt-[10px] text-[14px]">
                <div>
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree Strongly
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Neither Agree nor Disagree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree Strongly
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <select className="border w-[90%] focus:outline-none p-[5px]">
                  <option></option>
                  <option>Agree Strongly</option>
                  <option>Agree</option>
                  <option>Neither Agree nor Disagree</option>
                  <option>Disagree</option>
                  <option> Disagree Strongly</option>
                </select>
              </div>
            )}
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div>
      {minimize ? (
        <div className="w-[750px] flex transition-opacity duration-200 ease-in-expo mt-[15px] bg-white">
          <div className="w-[40px] bg-[#43AED8]"></div>
          <div className="flex-1 p-[20px] transition-all duration-200 ease-in-expo ">
            <div className="flex justify-between flex-1">
              <h1 className="text-[22px] text-[#333]">Rating Scale</h1>
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
              <div className="transition-opacity duration-200 ease-in-expo">
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
                          handleChoiceLayout({
                            componentId,
                            value: e.target.value,
                          })
                        )
                      }
                    >
                      <option className="text-[12px]" value="vertical">
                        Vertical
                      </option>
                      <option
                        value="horizontal"
                        selected=""
                        className="text-[12px]"
                      >
                        Horizontal with choice text on the same line
                      </option>
                      <option value="horizontal-above" className="text-[12px]">
                        Horizontal with choice text above
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex mt-[15px] items-center">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">
                    Identifier
                  </p>
                  <div className="flex items-center gap-[5px]">
                    <input
                      className="border w-[490px] focus:outline-none h-[30px] pl-[5px]"
                      // onChange={() => dispatch(handleHideNumber())}
                    />
                  </div>
                </div>
                <div className="flex mt-[15px]">
                  <p className="text-[#7D848C] text-[13px] w-[180px]">Media</p>
                  <div className="flex items-center gap-[5px]">
                    <input
                      type="file"
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
              </div>
            ) : (
              ""
            )}

            <h1 className="mt-[30px] text-[22px] mb-[10px]">Scale</h1>
            <div className="flex items-center mt-[30px]">
              <p className="w-[180px] text-[#7D848C] text-[13px]">Scale type</p>
              <div className="flex gap-[10px]">
                <div>
                  <select
                    className="h-[34px] border w-[190px] text-[13px] pl-[6px] focus:outline-none"
                    onChange={(e) =>
                      dispatch(
                        handleAgreeOptions({
                          componentId,
                          value: e.target.value,
                        })
                      )
                    }
                    value={agreedOption}
                  >
                    <option value="agree2">Agree-Disagree(2 levels)</option>
                    <option value="agree3">Agree-Disagree(3 levels)</option>
                    <option value="agree4">Agree-Disagree(4 levels)</option>
                    <option value="agree5">Agree-Disagree(5 levels)</option>
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
                value={displayMode}
              >
                <option value="Radio">Radio list</option>
                <option value="Drop">Dropdown</option>
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
                value={naCondition}
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
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
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
                    dispatch(addRatingScaleInstance({ componentId }));
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
            <div className="mt-[10px] pb-[10px] pointer-events-none">
              {agreedOptionContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingScale;
