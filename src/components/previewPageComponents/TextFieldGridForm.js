import { shuffle } from "fast-shuffle";
import React from "react";

const TextFieldGridForm = (props) => {
  const { index, questionData } = props;
  const {
    question,
    requiredOption,
    hideNumber,
    image,
    choiceLayout,
    agreeOptions,
    naCondition,
    displayMode,
    scoreDirection,
    randomFields,
    randomChoice,
    columnWidth,
    scaleType,
    validation,
    answerTextarea,
    fieldsData,
  } = questionData;
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
          {image === null ? "" : <img src={image} alt="image" />}
          <div className="w-[800px] m-auto">
            {randomFields
              ? shuffle(fieldsData).map((e, i) => (
                  <div className="flex justify-between items-center mt-[10px]">
                    <p
                      dangerouslySetInnerHTML={{ __html: e.title }}
                      className="text-[14px]"
                    />
                    {answerTextarea === "single" && (
                      <input className="border focus:outline-none h-[30px] w-[500px] pl-[5px]" />
                    )}
                    {answerTextarea === "multiple" && (
                      <textarea className="border focus:outline-none h-[90px] w-[500px] pl-[5px]"></textarea>
                    )}
                  </div>
                ))
              : fieldsData.map((e, i) => (
                  <div className="flex justify-between items-center mt-[10px]">
                    <p
                      dangerouslySetInnerHTML={{ __html: e.title }}
                      className="text-[14px]"
                    />
                    {answerTextarea === "single" && (
                      <input className="border focus:outline-none h-[30px] w-[500px] pl-[5px]" />
                    )}
                    {answerTextarea === "multiple" && (
                      <textarea className="border focus:outline-none h-[90px] w-[500px] pl-[5px]"></textarea>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextFieldGridForm;
