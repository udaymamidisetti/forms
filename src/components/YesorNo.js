import { useEffect } from "react";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  addYesorNoInstance,
  handleHideNumber,
  handleQuestionInput,
  handleRequiredOption,
} from "../redux/slices/YesorNoslice";
import { setAllStateValues, setTokenId } from "../redux/slices/FormSlice";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const YesorNo = ({ onDelete, componentId }) => {
  const dispatch = useDispatch();
  const question = useSelector((state) => {
    const instance = state.YesorNO.byId[componentId];
    if (!instance) {
      return;
    }
    return instance.yesorNoQuestion;
  });
  console.log(question);
  const yesornoStates = useSelector((state) => state.YesorNO.byId[componentId]);
  const tokenId = useSelector((state) => state.formData.tokenId);
  // const handleChange = useCallback(
  //   (e) => {
  //     const { value } = e.target;
  //     dispatch(handleQuestionInput(value));
  //   },
  //   [dispatch]
  // );
  const handleChange = (componentId) => (content) => {
    dispatch(handleQuestionInput({ componentId, value: content }));
  };
  const handleEditorOptionChange = (componentId, index) => (content) => {
    // dispatch(handleOptionChange({ componentId, index, value: content }));
  };
  const handleSave = async () => {
    const values = {
      form_data: yesornoStates,
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
        overallStates: yesornoStates,
      })
    );
  };
  useEffect(() => {
    dispatch(addYesorNoInstance({ componentId }));
  }, []);

  return (
    <div>
      <div>
        <div>
          <div className="flex mt-[15px] bg-white w-[750px]">
            <div className="w-[40px] bg-[#43AED8] h-[450px]"></div>
            <div className="flex-1 p-[20px]">
              <div className="flex justify-between flex-1">
                <h1 className="text-[22px] text-[#333]">Yes/No</h1>
                <div className="flex">
                  <div className="mr-[5px]">
                    <button
                      style={{
                        boxShadow: "0 1px 3px 0 rgba(40,60,70,0.2)",
                      }}
                      //   onClick={() => handleDeleteContent(uuidv4())}
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
              {/* <input
                className="border w-[95%] focus:outline-none p-[10px] pt-[5px] pb-[5px] mt-[7px] text-[13px]"
                placeholder="What question would you like to ask?"
                onChange={handleChange}
                value={question}
              /> */}
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
        </div>
      </div>
    </div>
  );
};

export default YesorNo;
