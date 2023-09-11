import React from "react";
import { shuffle } from "fast-shuffle";
const RankingForm = (props) => {
  const { index, questionData } = props;
  const { question, hideNumber, requiredOption, image, randomChoice, fields } =
    questionData;
  return (
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
      <div className="max-w-[800px] m-auto">
        {randomChoice
          ? shuffle(fields).map((e, i) => (
              <div
                className="max-w-[800px] m-auto flex mt-[5px] gap-[20px] border p-[5px] hover:bg-[#3a9cea80]"
                key={i}
              >
                <div>
                  <select className="w-[100px] border">
                    {fields.map((j, l) => (
                      <>
                        <option></option>
                        <option key={l}>{l}</option>
                      </>
                    ))}
                  </select>
                </div>
                <p dangerouslySetInnerHTML={{ __html: e.title }} />
              </div>
            ))
          : fields.map((e, i) => (
              <div
                className="max-w-[800px] m-auto flex mt-[5px] gap-[20px] border p-[5px] hover:bg-[#3a9cea80]"
                key={i}
              >
                <div>
                  <select className="w-[100px] border">
                    {fields.map((j, l) => (
                      <>
                        <option></option>
                        <option key={l}>{l}</option>
                      </>
                    ))}
                  </select>
                </div>
                <p dangerouslySetInnerHTML={{ __html: e.title }} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default RankingForm;
