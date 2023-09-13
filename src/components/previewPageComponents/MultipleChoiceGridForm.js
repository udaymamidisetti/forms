import { shuffle } from "fast-shuffle";
import React from "react";

const MultipleChoiceGridForm = (props) => {
  const { index, questionData } = props;
  const {
    question,
    HideNumber,
    requiredOption,
    choiceLayout,
    RandomChoices,
    options,
    image,
    AnswerRequired,
    RandomFields,
    labelColumnWidth,
    AllowMultipleResponce,
    fieldsData,
    multipleAnswers,
  } = questionData;
  console.log(
    question,
    HideNumber,
    requiredOption,
    choiceLayout,
    RandomChoices,
    options,
    image,
    AnswerRequired,
    RandomFields,
    labelColumnWidth,
    AllowMultipleResponce,
    fieldsData,
    multipleAnswers
  );
  return (
    <div>
      <div className="max-w-[900px] m-auto pt-[30px]">
        <div className="flex items-center gap-[10px]">
          {HideNumber ? (
            <p className="bg-[#3A9CEA] pl-[8px] pr-[8px] pt-[4px] pb-[4px] text-[12px] rounded-md text-white font-semibold">
              {index + 1}
            </p>
          ) : (
            ""
          )}
          {AnswerRequired ? <span className="text-[red]">*</span> : null}
          <div
            className="text-[13px]"
            dangerouslySetInnerHTML={{ __html: question }}
          />
          {/* {question} */}
        </div>
        {image === null ? "" : <img src={image} alt="image" />}
        {/* <div className={choiceLayout === "horizontal" ? "flex" : ""}>
          {RandomChoices
            ? shuffle(options).map((k, index) => (
                <div key={index}>
                  <div className="flex gap-[5px] ml-[40px] mt-[10px] cursor-pointer hover:bg-[#3a9cea80] hover:border-[1px] hover:border-[#3a9cea80] h-[30px] p-[5px] items-center">
                    <input
                      type={k.multipleAnswers ? "checkbox" : "radio"}
                      id={index}
                    />
                    <div
                      className="text-[16px]"
                      htmlFor={index}
                      dangerouslySetInnerHTML={{ __html: k.title }}
                    />
                  </div>
                  {k.includeOtherTextField && <input />}
                </div>
              ))
            : options.map((j, index) => (
                <div key={index}>
                  <div className="flex gap-[5px] ml-[40px] mt-[10px] cursor-pointer hover:bg-[#3a9cea80] hover:border-[1px] hover:border-[#3a9cea80] h-[30px] p-[5px] items-center">
                    {j.image === null ? "" : <img src={j.image} />}
                    <input
                      type={j.multipleAnswers ? "checkbox" : "radio"}
                      id={index}
                    />
                    <div
                      className="text-[16px]"
                      htmlFor={index}
                      dangerouslySetInnerHTML={{ __html: j.title }}
                    />
                  </div>
                  {j.includeOtherTextField && (
                    <input
                      className="border focus:outline-none ml-[60px] text-[14px] p-[5px] focus:w-[840px]"
                      placeholder="Text goes here"
                    />
                  )}
                </div>
              ))}
        </div> */}
        <div class="fields" className="w-[850px] m-auto">
          {" "}
          <table>
            <thead>
              <tr>
                <th style={{ width: `${labelColumnWidth}` }}>&nbsp;</th>
                {RandomChoices
                  ? shuffle(options).map((e, i) => (
                      <th
                        className="font-normal"
                        style={{ width: "5%" }}
                        key={i}
                      >
                        <div
                          className="text-[13px]"
                          dangerouslySetInnerHTML={{ __html: e.title }}
                        />
                      </th>
                    ))
                  : options.map((e, i) => (
                      <th
                        className="font-normal"
                        style={{ width: "5%" }}
                        key={i}
                      >
                        <div
                          className="text-[13px]"
                          dangerouslySetInnerHTML={{ __html: e.title }}
                        />
                      </th>
                    ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ width: `${labelColumnWidth}` }}>
                  {RandomFields
                    ? fieldsData.map((e, i) => (
                        <div
                          key={i}
                          className="pt-[10px] text-[16px]"
                          dangerouslySetInnerHTML={{ __html: e.title }}
                        />
                      ))
                    : fieldsData.map((e, i) => (
                        <div
                          key={i}
                          className="pt-[10px] text-[16px]"
                          dangerouslySetInnerHTML={{ __html: e.title }}
                        />
                      ))}
                </td>
                {options.map((j, l) => (
                  <td style={{ width: "5%" }} key={l}>
                    {fieldsData.map((e, i) => (
                      <div className="text-center pt-[10px]">
                        <div className="text-center">
                          {multipleAnswers ? (
                            <input type="checkbox" />
                          ) : (
                            <input type="radio" />
                          )}
                        </div>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceGridForm;
