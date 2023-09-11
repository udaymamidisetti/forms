import React from "react";
import { shuffle } from "fast-shuffle";
const PercentageSumForm = (props) => {
  const { index, questionData } = props;
  const {
    question,
    requiredOption,
    hideNumber,
    randomChoice,
    image,
    fields,
    sumofFields,
    sumInput,
    NumericType,
  } = questionData;
  console.log(questionData);
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
        {randomChoice === "true"
          ? shuffle(fields).map((e, i) => (
              <div
                className="max-w-[800px] m-auto flex justify-between mt-[5px]"
                key={i}
              >
                <p dangerouslySetInnerHTML={{ __html: e.title }} />
                <div className="flex items-center">
                  <input className="border focus:outline-none rounded-md p-[7px] text-right" />
                  {NumericType === "Dollar" && <p>$</p>}
                  {NumericType === "Percentage" && <p>%</p>}
                </div>
              </div>
            ))
          : fields.map((e, i) => (
              <div
                className="max-w-[800px] m-auto flex justify-between mt-[5px]"
                key={i}
              >
                <p dangerouslySetInnerHTML={{ __html: e.title }} />
                <div className="flex items-center">
                  <input className="border focus:outline-none rounded-md p-[7px] text-right" />
                  {NumericType === "Dollar" && <p>$</p>}
                  {NumericType === "Percentage" && <p>%</p>}
                </div>
              </div>
            ))}
        <div className="flex justify-between mt-[5px]">
          <p>Total</p>
          <p>
            {sumofFields === "Equal" && (
              <p className="flex">
                0{NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}&nbsp; = {sumInput}
                {NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}
              </p>
            )}
            {sumofFields === "Greater" && (
              <p className="flex">
                0{NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}&nbsp; &lt; {sumInput}
                {NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}
              </p>
            )}
            {sumofFields === "Less" && (
              <p className="flex">
                0{NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}&nbsp; &gt; {sumInput}
                {NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}
              </p>
            )}
            {sumofFields === "LessEqual" && (
              <p className="flex">
                0{NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}&nbsp; &ge; {sumInput}
                {NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}
              </p>
            )}
            {sumofFields === "GreaterEqual" && (
              <p className="flex">
                0{NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}&nbsp; &le; {sumInput}
                {NumericType === "Dollar" && <p>$</p>}
                {NumericType === "Percentage" && <p>%</p>}
              </p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PercentageSumForm;
