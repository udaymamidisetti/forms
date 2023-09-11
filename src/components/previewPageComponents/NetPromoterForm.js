import React from "react";

const NetPromoterForm = (props) => {
  const numbers = Array.from({ length: 11 }, (_, index) => index);
  const { index, questionData } = props;
  const {
    question,
    textLabels,
    leftLabel,
    rightLabel,
    requiredOption,
    hideNumber,
    image,
  } = questionData;
  //   const renderRadio = () => {
  //     // const loop = [];
  //     // for (let i = 0; i < 10; i++) {
  //     //   loop.push(
  //     //     <div>
  //     //       <p>{loop[i]}</p>
  //     //     </div>
  //     //   );
  //     // }
  //     for (let i = 0; i < 10; i++) {
  //       listItems.push(<li>{i}</li>);
  //     }
  //   };
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
      </div>
      <div className="max-w-[800px] m-auto flex justify-between">
        <p className="text-[13px]">{leftLabel}</p>
        <p className="text-[13px]">{rightLabel}</p>
      </div>
      <div className="flex max-w-[800px] m-auto justify-evenly">
        {numbers.map((number) => (
          <div>
            <div className="flex flex-col items-center justify-center h-[75px] w-[50px] gap-[5px]">
              <p>{number}</p>
              <input type="radio" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetPromoterForm;
