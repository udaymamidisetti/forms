import React from "react";
import { useSelector } from "react-redux";
import { shuffle } from "fast-shuffle";

const MultipleChoiceForm = (props) => {
  const id = "multipleChoice1";
  const { questionData } = props;
  const {
    question,
    hideNumber,
    requiredOption,
    choiceLayout,
    randomChoice,
    options,
    multipleAnswers,
    image,
  } = questionData;
  console.log(question, hideNumber);
  const multipleChoiceformData = useSelector(
    (state) => state.MultipleChoice.byId
  );
  console.log(multipleChoiceformData);
  // console.log()
  // [multipleChoiceformData].map((e) => console.log(e));
  // Object.values(multipleChoiceformData).map((e) => console.log(e.question));
  // const question = useSelector(
  //   (state) => state.MultipleChoice.byId.Multiplechoice1.question
  // );
  // console.log(question);
  // const hideNumber = useSelector((state) => state.MultipleChoice.hideNumber);
  // const requiredOption = useSelector(
  //   (state) => state.MultipleChoice.requiredOption
  // );
  // const choiceLayout = useSelector(
  //   (state) => state.MultipleChoice.choiceLayout
  // );
  // const randomChoice = useSelector(
  //   (state) => state.MultipleChoice.randomChoice
  // );
  // const options = useSelector((state) => state.MultipleChoice.options);
  // const image = useSelector((state) => state.MultipleChoice.images);
  // const multipleAnswers = useSelector(
  //   (state) => state.MultipleChoice.multipleAnswers
  // );
  return (
    <>
      {/* {Object.values(multipleChoiceformData).map((e, index) => ( */}
      <div>
        <div className="max-w-[900px] m-auto pt-[30px]">
          <div className="flex items-center gap-[10px]">
            {hideNumber ? (
              <p className="bg-[#3A9CEA] pl-[8px] pr-[8px] pt-[4px] pb-[4px] text-[12px] rounded-md text-white font-semibold">
                {/* {index + 1} */}
              </p>
            ) : (
              ""
            )}
            {requiredOption ? <span className="text-[red]">*</span> : ""}
            <div
              className="text-[13px]"
              dangerouslySetInnerHTML={{ __html: question }}
            />
            {/* {question} */}
          </div>
          {image === null ? "" : <img src={image} alt="image" />}
          <div className={choiceLayout === "horizontal" ? "flex" : ""}>
            {randomChoice
              ? shuffle(options).map((k, index) => (
                  <>
                    <div
                      className="flex gap-[5px] ml-[40px] mt-[10px] cursor-pointer hover:bg-[#3a9cea80] hover:border-[1px] hover:border-[#3a9cea80] h-[30px] p-[5px] items-center"
                      key={index}
                    >
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
                  </>
                ))
              : options.map((j, index) => (
                  <div>
                    <div
                      className="flex gap-[5px] ml-[40px] mt-[10px] cursor-pointer hover:bg-[#3a9cea80] hover:border-[1px] hover:border-[#3a9cea80] h-[30px] p-[5px] items-center"
                      key={index}
                    >
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
          </div>
        </div>
      </div>
      {/* // ))} */}
      <div>
        {/* {Object.entries(question).map(([componentId, componentData]) => (
        <div key={componentId}>
          <div dangerouslySetInnerHTML={{ __html: componentData.value }} />
        </div>
      ))} */}
      </div>
    </>
    // <div dangerouslySetInnerHTML={{ __html: question.value }} />
  );
};

export default MultipleChoiceForm;
