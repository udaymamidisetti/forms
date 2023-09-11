import React, { useState } from "react";
import { useSelector } from "react-redux";
const TextFieldForm = (props) => {
  const { index, questionData } = props;
  console.log(questionData);
  const { question, answerText, requiredOption, hideNumber } = questionData;
  // const question = useSelector((state) => state.textField.questionInput);
  // const answerText = useSelector((state) => state.textField.answerText);
  // const requiredOption = useSelector((state) => state.textField.requiredOption);
  // const hideNumber = useSelector((state) => state.textField.hideNumber);
  const [input, setInput] = useState("");
  const [textArea, setTextArea] = useState("");
  return (
    <div>
      <div>
        <div className="max-w-[900px] m-auto pt-[30px]">
          <div className="flex items-center gap-[10px]">
            {hideNumber ? (
              <p className="bg-[#3A9CEA] pl-[8px] pr-[8px] pt-[4px] pb-[4px] text-[12px] rounded-md text-white font-semibold">
                {index + 1}
              </p>
            ) : (
              ""
            )}
            {requiredOption ? <span className="text-[red]">*</span> : null}
            <div
              className="text-[13px]"
              dangerouslySetInnerHTML={{ __html: question }}
            />
          </div>
          {answerText === "single" ? (
            <input
              className="border w-[100%] focus:outline-none p-[5px] mt-[15px]"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          ) : (
            <textarea
              className="border h-[100px] w-[100%] focus:outline-none p-[5px] mt-[15px]"
              onChange={(e) => setTextArea(e.target.value)}
              value={textArea}
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextFieldForm;
