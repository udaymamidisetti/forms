import { shuffle } from "fast-shuffle";
import React from "react";

const RatingScaleMatrixForm = (props) => {
  const { index, questionData } = props;
  const {
    question,
    requiredOption,
    hideNumber,
    image,
    agreeOptions,
    naCondition,
    displayMode,
    scoreDirection,
    randomFields,
    randomChoice,
    columnWidth,
    fieldsData,
    options,
  } = questionData;
  return (
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
          {/* {question} */}
        </div>
        {image === null ? "" : <img src={image} alt="image" />}
        <div class="fields" className="w-[850px] m-auto">
          {" "}
          <table>
            <thead>
              <tr>
                <th style={{ width: `${columnWidth}` }}>&nbsp;</th>

                {options.map((e, i) => (
                  <th
                    className="font-normal text-[14px] p-[10px]"
                    style={{ width: "100px" }}
                    key={i}
                  >
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ width: `${columnWidth}` }}>
                  {randomFields
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
                  <td style={{ width: "100px" }} key={l}>
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
      </div>
    </div>
  );
};

export default RatingScaleMatrixForm;
