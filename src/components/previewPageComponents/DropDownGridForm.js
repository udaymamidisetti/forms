import { shuffle } from "fast-shuffle";
import React from "react";

const DropDownGridForm = (props) => {
  const { index, questionData } = props;
  const {
    question,
    requiredOption,
    hideNumber,
    image,
    rows,
    columns,
    randomChoice,
    randomFields,
    columnWidth,
    optionsData,
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
          {requiredOption === "Yes" ? (
            <span className="text-[red]">*</span>
          ) : null}
          <div
            className="text-[13px]"
            dangerouslySetInnerHTML={{ __html: question }}
          />
        </div>
        {image === null ? "" : <img src={image} alt="image" />}
        <div class="fields" className="w-[850px] m-auto">
          {" "}
          <table>
            <thead>
              <tr>
                <th style={{ width: `${columnWidth}` }}>&nbsp;</th>
                {randomChoice
                  ? shuffle(columns).map((e, i) => (
                      <th
                        className="font-normal"
                        style={{ width: "5%" }}
                        key={i}
                      >
                        <div
                          className="text-[13px]"
                          dangerouslySetInnerHTML={{ __html: e }}
                        />
                      </th>
                    ))
                  : columns.map((e, i) => (
                      <th
                        className="font-normal"
                        style={{ width: "5%" }}
                        key={i}
                      >
                        <div
                          className="text-[13px]"
                          dangerouslySetInnerHTML={{ __html: e }}
                        />
                      </th>
                    ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ width: `${columnWidth}` }}>
                  {randomFields
                    ? rows.map((e, i) => (
                        <div
                          key={i}
                          className="pt-[10px] text-[16px]"
                          dangerouslySetInnerHTML={{ __html: e }}
                        />
                      ))
                    : rows.map((e, i) => (
                        <div
                          key={i}
                          className="pt-[10px] text-[16px]"
                          dangerouslySetInnerHTML={{ __html: e }}
                        />
                      ))}
                </td>
                {rows.map((j, l) => (
                  <td key={l}>
                    {columns.map((e, i) => (
                      <div className="text-center pt-[10px]" key={i}>
                        <select className="border focus:outline-none w-[100%]">
                          <option></option>
                          {optionsData.map((m, n) => (
                            <option
                              key={n}
                              dangerouslySetInnerHTML={{ __html: m.title }}
                            />
                          ))}
                        </select>
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

export default DropDownGridForm;
